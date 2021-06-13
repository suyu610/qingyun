var CosAuth = require('./lib/cos-auth');
var config = require('./config');
let app = getApp()
// 请求用到的参数
var prefix = 'https://cos.' + config.Region + '.myqcloud.com/' + config.Bucket ; // 这个是后缀式，签名也要指定 Pathname: '/' + config.Bucket + '/'
// var prefix = 'https://' + config.Bucket + '.cos.' + config.Region + '.myqcloud.com/';
// 对更多字符编码的 url encode 格式
var camSafeUrlEncode = function (str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
};

// 获取临时密钥
var stsCache;
var path;
var getCredentials = function (callback) {
  if (path && stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
    callback(stsCache.credentials, path);
    return;
  }

  // 向后端申请上传签名
  wx.request({
    method: 'GET',
    url: config.stsUrl, // 服务端签名
    header: {
      'Authorization': app.globalData.token
    },
    success: function (result) {
      var data = JSON.parse(result.data.data);
      var credentials = data.credentials;
      let path = data.path;
      if (credentials) {
        stsCache = data;
        path = path;
      } else {
        wx.showModal({
          title: '临时密钥获取失败',
          content: JSON.stringify(data),
          showCancel: false
        });
      }
      callback(stsCache && stsCache.credentials, path);
    },
    error: function (err) {
      wx.showModal({
        title: '临时密钥获取失败',
        content: JSON.stringify(err),
        showCancel: false
      });
    }
  });
};

// 计算签名
var getAuthorization = function (options, callback) {
  getCredentials(function (credentials, path) {
    console.log('/' + config.Bucket  + path)
    callback({
      XCosSecurityToken: credentials.sessionToken,
      Authorization: CosAuth({
        SecretId: credentials.tmpSecretId,
        SecretKey: credentials.tmpSecretKey,
        Method: options.Method,
        Pathname: '/' + config.Bucket  +  path,
      }),
    }, path);
  });
};

// 上传文件
var uploadFile = function (filePath, callback, uploadSuccess) {
  var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
  getAuthorization({
    Method: 'POST',
  }, function (AuthData, path) {
    console.log(path + Key)
    let requestTask = wx.uploadFile({
      url: prefix + path,
      name: 'file',
      filePath: filePath,
      formData: {
        'key': path + Key,
        'success_action_status': 200,
        'Signature': AuthData.Authorization,
        'x-cos-security-token': AuthData.XCosSecurityToken,
        'Content-Type': '',
      },
      success: function (res) {
        var url = prefix + path + camSafeUrlEncode(Key).replace(/%2F/g, '/');
        if (res.statusCode === 200) {
          uploadSuccess(url,path)
        } else {
          console.log(res)
          wx.showModal({
            title: '上传失败',
            content: JSON.stringify(res),
            showCancel: false
          });
        }
        console.log(res.statusCode);
        console.log(url);
      },
      fail: function (res) {
        console.log(res)
        wx.showModal({
          title: '上传失败',
          content: JSON.stringify(res),
          showCancel: false
        });
      },
    });
    requestTask.onProgressUpdate(function (res) {
      callback(res)
      console.log('正在进度:', res);
    });
  });
};

module.exports = {
  uploadFile: uploadFile
}