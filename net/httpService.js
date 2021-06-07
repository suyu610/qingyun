import {
    Host
} from "./httpConstants.js";
const app = getApp()

function myrequest(url, method, param, successCallback, failCallback) {
    if (app.globalData.debug) console.log('准备发起请求 :>> ', url);
    var that = this;
    let token = app.globalData.token
    if (token == "") token = wx.getStorageSync('token')

    wx.request({
        url: url,
        data: param,
        dataType: 'json',
        method: method,
        header: {
            'Authorization':  app.globalData.token
        },
        success: (res) => {
            if (res.data['code'] == 200) {
                if (successCallback) {
                    successCallback(res);
                }
            }
            // 未授权
            if (res.data['code'] == 502) {
                wx.login({
                    success(res) {
                        //发起网络请求
                        wx.request({
                            url: Host + "user/login/" + res.code,
                            method: "POST",
                            success(res) {
                                if (res.data['code'] == 200) {
                                    wx.setStorageSync('token', res.data['data'])
                                    app.globalData.token = res.data['data']
                                    // 然后再发送重复的请求
                                    myrequest(url, method, param, successCallback, failCallback)
                                } else {
                                    console.log(res.data['msg'])
                                }
                            },
                            fail(res) {
                                console.log(res)
                            }
                        })
                    }
                })
            }
            // 来自服务器的错误
            if (failCallback) {
                // 如果不是未授权，也不是200
                if (res.data['code'] != 502 && res.data['code'] != 200) {
                    failCallback(res);
                }
            }
        },
        fail: (res) => {
            // 连接错误
            if (app.globalData.debug) console.log(res)
            if (failCallback) {
                failCallback(res);
            }
        }
    });
}

export default {
    get: function (url, param, success, fail) {
        return myrequest(Host + url, "GET", param, success, fail)
    },

    getSync: function (url, param) {
        return new Promise((resolve, reject) => {
            return myrequest(Host + url, "GET", param, resolve, reject)
        })
    },

    post: function (url, param, success, fail) {
        return myrequest(Host + url, "POST", param, success, fail)
    },

    postSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(Host + url, "POST", param, resolve, reject)
        })
    },

    put: function (url, param, success, fail) {
        return myrequest(Host + url, "PUT", param, success, fail)
    },

    putSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(Host + url, "PUT", param, resolve, reject)
        })
    },

    delete: function (url, param, success, fail) {
        return myrequest(Host + url, "DELETE", param, success, fail)
    },

    deleteSync: function (url, param, success, fail) {
        return new Promise((resolve, reject) => {
            return myrequest(Host + url, "DELETE", param, resolve, reject)
        })
    }
}