const word_audio = wx.createInnerAudioContext({});
const recorderManager = wx.getRecorderManager()
let playAnimationTimer;

Component({
  properties: {
    cValue: {
      type: String,
      value: ''
    },
    changeIndex: {
      type: Number,
      value: 0
    },
    valueLength: {
      type: Number,
      value: 0
    },
    showType: {
      type: Array,
      value: ['English', 'Numbers']
    },
    showKeyboard: {
      type: Boolean
    }
  },

  data: {
    isSpeaking: false,
    isSpeakEditing: false,
    audioRecordUrl: '',
    isPlaying: false,
    star: false,
    pressDelTime: 0,
    capital: true,
    openVibrate: true,
    longDelTimer: null,
    inputValue: [''],
    keybordIndex: 0,

    settingShow: false,
    keyboardHeight: 200, //键盘的高度
    recorder_img_index: 0,
    keyBoardObject: {
      English: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['voice', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'del'],
      ],
      Numbers: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['0']
      ],
      NumEn: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
      ]
    },
    currentType: 'English',
  },
  lifetimes: {
    ready: function () {
      this.queryMultipleNodes();
    },

    attached: function () {
      // 获取本地配置
      var kbdConf_capital = this.get('kbdConf_capital', false)
      var kbdConf_vibrate = this.get('kbdConf_vibrate', true)
      console.log(kbdConf_capital)
      this.setData({
        capital: kbdConf_capital,
        openVibrate: kbdConf_vibrate
      })
      let _this = this
      const {
        data: {
          cValue,
          valueLength,
          showType
        },
      } = _this
      if (typeof valueLength === 'number') {
        const inputValue = Array.from(Array(valueLength), (v, i) => {
          if (cValue == '') {
            return ''
          } else {
            let str = cValue.substring(0, valueLength)
            if (str.hasOwnProperty(i)) {
              return str[i]
            } else {
              return ''
            }
          }
        })
        const [currentType] = showType
        _this.setData({
          inputValue,
          currentType,
        })
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 播放录音
    playAudio: function () {
      let that = this;
      if (this.data.isPlaying) {
        word_audio.pause();
      } else {
        word_audio.src = this.data.audioRecordUrl;
        word_audio.play()
        word_audio.onEnded(_ => {
          that.setData({
            isPlaying: false
          })
        })
      }

      this.setData({
        isPlaying: !this.data.isPlaying
      })
    },


    // 播放录音动画
    animationSpeak: function () {
      var that = this;
      let recorder_img_index = that.data.recorder_img_index

      console.log(that.data.isSpeaking)

      // 停止动画
      if (!that.data.isSpeaking || this.data.isSpeakEditing) {
        recorder_img_index = 0
        clearTimeout(playAnimationTimer)
      } else {
        if (recorder_img_index == 3) {
          recorder_img_index = 0
        } else {
          recorder_img_index += 1
        }
        playAnimationTimer = setTimeout(function () {
          that.animationSpeak()
        }, 500)
      }

      this.setData({
        recorder_img_index
      })
    },

    queryMultipleNodes: function () {
      let that = this;
      const query = wx.createSelectorQuery().in(this)
      query.select('#keyboard_center').boundingClientRect(function (res) {
        if (res != null) {
          that.setData({
            keyboardHeight: res.height * 3
          })
        }
      }).exec()

    },

    // 获取本地存储,如果没写默认值，则返回空
    get: function (key, defautValue = '') {
      var value = wx.getStorageSync(key)
      if (value === '') {
        return defautValue;
      } else {
        return value
      }
    },

    leftdownButtonTap: function () {
      recorderManager.stop()
      if (this.data.isSpeaking && this.data.isSpeakEditing) {
        this.setData({
          isSpeaking: false,
          isSpeakEditing: false,
          isPlaying: false
        })

      } else {
        this.toggleCapital();
      }
    },


    toggleCapital: function () {
      wx.vibrateShort({
        type: 'light',
      })
      this.setData({
        capital: !this.data.capital
      })

      wx.setStorageSync('kbdConf_capital', this.data.capital)
    },

    toggleVibrate: function () {
      this.setData({
        openVibrate: !this.data.openVibrate
      })
      wx.vibrateShort({
        type: 'light',
      })
      wx.setStorageSync('kbdConf_vibrate', this.data.openVibrate)

    },

    //键盘按钮事件
    clickKeybord(e) {
      if (this.data.openVibrate) {
        wx.vibrateShort({
          type: "light"
        })
      }
      const _this = this
      const {
        currentTarget: {
          dataset: {
            key
          },
        },
      } = e
      const {
        data: {
          keybordIndex: index
        },
      } = _this
      let {
        data: {
          inputValue
        },
      } = _this
      // 转小写
      inputValue[index] = this.data.capital ? key : key.toLowerCase()
      _this.setData({
        inputValue,
      })

      _this.setData({
        keybordIndex: index + 1,
      })
      this.triggerEvent('inputValugeChanged', inputValue)
    },

    spaceKey() {

      if (this.data.isSpeakEditing) {
        wx.showLoading({
          title: '正在评测',
        })

        setTimeout(() => {
          wx.showToast({
            title: '成功',
            duration: 600,
          })
        }, 1000);

      } else {
        let index = this.data.keybordIndex;
        let inputValue = this.data.inputValue;
        inputValue[index] = "　"

        this.setData({
          inputValue,
        })

        this.setData({
          keybordIndex: index + 1,
        })
        this.triggerEvent('inputValugeChanged', this.data.inputValue)
      }
    },
    voiceKey: function () {
      this.triggerEvent('voice')
    },
    showAnswerKey: function () {
      this.triggerEvent('showAnswer')
    },
    starWord: function () {
      this.setData({
        star: !this.data.star
      })
      this.triggerEvent('star', this.data.star)
    },


    rightDownKeyTap: function () {
      wx.showToast({
        icon: 'none',
        title: '长按进行发音评测',
      })
    },


    startRecorder: function () {
      console.log("开始录音");
      recorderManager.start();

      wx.vibrateShort({
        type: 'light',
      })
      this.setData({
        isSpeaking: true,
        isSpeakEditing: false,
      })
      this.animationSpeak();
    },


    stopRecorder: function () {
      recorderManager.stop(); //先停止录音

      // 如果正处于编辑模式，就不要响应
      if (this.data.isSpeakEditing) return

      var that = this;
      wx.vibrateShort({
        type: 'light',
      })
      recorderManager.onStop((res) => { //监听录音停止的事件
        console.log("监听录音停止事件", res)
        if (res.duration < 1000) {
          wx.showToast({
            icon: 'error',
            title: '录音时间太短'
          })

          that.setData({
            isSpeaking: false
          })
          return;
        } else {
          this.setData({
            isSpeakEditing: true
          })

          var tempFilePath = res.tempFilePath; // 文件临时路径
          console.log("文件临时路径", tempFilePath)
          that.setData({
            audioRecordUrl: tempFilePath
          })

          // wx.uploadFile({
          //   url: '"https://book.qdu.life"', //上传服务器的地址
          //   filePath: tempFilePath, //临时路径
          //   name: 'file',
          //   header: {
          //     contentType: "multipart/form-data", //按需求增加
          //   },
          //   formData: null,
          //   success: function (res) {
          //     console.log("上传成功")
          //     wx.hideLoading();
          //     that.setData({
          //       bofangurl: tempFilePath
          //     })
          //   },
          //   fail: function (err) {
          //     wx.hideLoading();
          //     console.log(err.errMsg);//上传失败
          //   }
          // });
        }
      });
    },
    showKeyboard() {
      this.setData({
        showKeyboard: true,
        settingShow: false
      })
    },

    hideKeyBoard() {
      this.setData({
        settingShow: false,
        showKeyboard: false
      })

      this.triggerEvent('hideKeyboard', true)
    },

    deleteKey() {
      let _this = this
      if (this.data.pressDelTime >= 20) {
        _this.data.inputValue = []
        index = 0
        _this.setData({
          keybordIndex: index,
          inputValue: _this.data.inputValue,
        })
        this.triggerEvent('inputValugeChanged', this.data.inputValue)
        return
      }

      let {
        data: {
          keybordIndex: index
        },
      } = _this
      if (index == 0) {
        return
      }
      if (_this.data.inputValue[index] != '') {
        // _this.data.inputValue[index] = ''
        _this.data.inputValue.pop()
        index = index - 1
      } else {
        _this.data.inputValue.pop() //[index - 1]
        index = index - 1
      }
      _this.setData({
        keybordIndex: index,
        inputValue: _this.data.inputValue,
      })

      this.triggerEvent('inputValugeChanged', this.data.inputValue)
    },

    showSettingPopup() {
      this.setData({
        showKeyboard: false,
        settingShow: true,
      });
    },

    closeSettingPopup() {
      this.setData({
        showKeyboard: true,
        settingShow: false
      });
    },

    // 长按删除
    longDeleteKey() {
      if (this.data.openVibrate) {
        wx.vibrateShort({
          type: "heavy"
        })
      }
      console.log("长按开始")
      let that = this;
      this.data.longDelTimer = setInterval(function () {
        that.deleteKey()
        that.setData({
          pressDelTime: that.data.pressDelTime + 1
        })
      }, 50) //循环时间 这里是1秒  
    },

    // 松开长按
    longDeleteKeyDismiss() {
      if (this.data.openVibrate) {
        wx.vibrateShort({
          type: "heavy"
        })
      }
      this.setData({
        pressDelTime: 0
      })
      clearInterval(this.data.longDelTimer)
    },

  },
})