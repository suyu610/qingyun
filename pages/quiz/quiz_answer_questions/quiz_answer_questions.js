// pages/quiz/quiz_comments/quiz_comments.js
let innerAudioContext = wx.createInnerAudioContext({});
let progress_timer = null;
let flag_play_status = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_answer: false,
    ques_list: [{
        type: "单选题",
        title: "企业取得收入的货币形式，包括现金、存款、（）等。",
        img: "https://cdns.qdu.life/logo.png"
      }, {
        type: "单选题",
        title: "听下面一段对话，回答第1至4题。",
        audio: "https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C"
      }, {
        type: "简答题",
        title: "请编写函数fun，其功能是：计算并输出3 到n 之间所有素数的平方根之和。 例如，若主函数从键盘给n 输入100 后，则输出为sum=148.874270。 注意：n 的值要大于2 但不大于100。",
        img: ""
      }, {
        type: "多选题",
        title: "企业取得收入的货币形式，包括现金、存款、（）等。",
      },
      {
        type: "填空题",
        title: "企业取得收入的货币形式，包括_____、_____、______等。"
      },

      {
        type: "单选题",
        title: "企业取得收入的货币形式，包括现金、存款、（）等。"
      }
    ],
    paper: {
      type: "order"
    },
    cur_ques_index: 0,
    audio_progress: 0,
    audio_paused: true,
    total_audio_progress: 0,
  },

  print: function (e) {
    console.log(e)
  },

  changeQuestion: function (e) {

    let that = this;
    this.setData({
      cur_ques_index: e.detail.current,
      audio_progress: 0,
      total_audio_progress: 0,
    })


    if (this.data.ques_list[this.data.cur_ques_index].audio != '' && this.data.ques_list[this.data.cur_ques_index].audio != null) {
      innerAudioContext = wx.createInnerAudioContext({});
      // 切歌  
      innerAudioContext.src = "https://api.uomg.com/api/rand.music?sort=热歌榜"
      innerAudioContext.onCanplay(function getDuration() {
        let intervalID = setInterval(function () {
          if (innerAudioContext.duration != 0 && !isNaN(innerAudioContext.duration)) {
            console.log(innerAudioContext.duration, '测试')

            that.setData({
              total_audio_progress: innerAudioContext.duration
            })

            clearInterval(intervalID);
          }
        }, 500);
      })

      innerAudioContext.onPlay(() => {
        if (progress_timer != null) {
          clearInterval(progress_timer) // 去除定时器
        }
        this.setData({
          audio_paused: innerAudioContext.paused
        })
        progress_timer = setInterval(function () {
          console.log("計時")
          that.setData({
            current_audio_progress: innerAudioContext.currentTime,
            audio_progress: innerAudioContext.currentTime / that.data.total_audio_progress * 100
          })
        }, 100)

        console.log("开始播放")
      })

      innerAudioContext.onPause(() => {
        this.setData({
          audio_paused: innerAudioContext.paused
        })
      })

      innerAudioContext.onEnded(() => {
        console.log("播放結束")
        that.setData({
          audio_paused: true,
          current_audio_progress: 0
        })
      })
    } else {
      this.setData({
        audio_paused: true,
        current_audio_progress: 0

      })
      innerAudioContext.stop()
      clearInterval(progress_timer);
    }
  },

  ondragAudioProgStart(e) {
    clearInterval(progress_timer)
    flag_play_status = !innerAudioContext.paused;
    innerAudioContext.pause();
  },

  ondragAudioProgEnd() {
    console.log(flag_play_status)
    if (flag_play_status) {
      innerAudioContext.play();
      progress_timer = setInterval(function () {
        console.log("計時")
        that.setData({
          current_audio_progress: innerAudioContext.currentTime,
          audio_progress: innerAudioContext.currentTime / that.data.total_audio_progress * 100
        })
      }, 100)
    }


  },

  stopPlay() {
    clearInterval(progress_timer)
    innerAudioContext.stop();
    innerAudioContext.seek(0);
    this.setData({
      audio_progress: 0,
      audio_paused: true,
      current_audio_progress: 0
    })
  },
  // 切換播放狀態
  togglePlay() {
    if (innerAudioContext.paused) {
      innerAudioContext.play();
    } else {
      innerAudioContext.pause();
    }
  },
  onChangeAudioProgress(e) {
    clearInterval(progress_timer)

    this.setData({
      audio_progress: e.detail,
      current_audio_progress: e.detail / 100 * this.data.total_audio_progress
    })

    innerAudioContext.seek(e.detail / 100 * this.data.total_audio_progress)

  },

  onShowQuestionList: function () {
    this.setData({
      show_ques_list: true
    })
  },

  onCloseQuestionList: function () {
    this.setData({
      show_ques_list: false
    })
  },
  showAnswer: function () {
    this.setData({
      show_answer: true
    })
  },

  onCloseAnswer: function () {
    this.setData({
      show_answer: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    innerAudioContext.destroy()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})