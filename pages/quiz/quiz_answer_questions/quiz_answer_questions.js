// pages/quiz/quiz_comments/quiz_comments.js
let innerAudioContext = wx.createInnerAudioContext({});
let progress_timer = null;
let flag_play_status = false;
let flag_transition = false;
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper正在滑动
    istransition: false,
    // 用户的做题记录
    recorder: [{
      id: 0,
      time_cost: 0,
      correct: false,
      has_done: false,
      colors: [],
      user_mark: [],
    }],
    // 试卷本体
    ques_list: [{
        id: '5',
        value: 6,
        type: "填空题",
        title: "请在下方输入皇甫素素；猪；头",
        options: ["", "", ""],
        answer: ["皇甫素素", "猪", "头"],
        star_num: 10,
        has_star: false,
        explain: {
          source: "",
          body: "巴拉巴拉巴小魔仙",
          user_name: "黄鹏宇",
          user_id: "2019205913",
          create_time: "2021年8月14日23:12:38",
          view_count: 14,
          is_star: false,
        },
        other_explain: [{
          explain_id: 2,
          body: "巴拉巴拉巴小魔仙",
          user_name: "黄鹏宇",
          user_id: "2019205913",
          create_time: "2021年8月14日23:12:38",
          view_count: 14,
          is_star: false,
        }, {
          explain_id: 1,
          body: "巴拉巴拉巴小魔仙",
          user_name: "皇甫素素",
          user_id: "2019205913",
          create_time: "2021年8月14日23:12:38",
          view_count: 14,
          is_star: false,
        }],
        user_explain: {
          explain_id: 1,
          body: "巴拉巴拉巴小魔仙",
          create_time: "2021年8月14日23:12:38",
          view_count: 0,
          is_public: false,
        }
      },
      {
        id: 1,
        type: "单选题",
        value: 2,
        title: "请编写函数fun，其功能是：\n计算并输出下列多项式的值。\n例如在主函数中从键盘为n输入50后，\n输出为S=1.718282。\n注意：要求n的值大于1但不大于100之间。",
        img: ["https://cdns.qdu.life/img/sample.png", "https://cdns.qdu.life/banner.png"],
        options: ["应收账款", "应收票据", "准备持有至到期的债权投资", "债务的豁免"],
        answer: [1],
        star_num: 10,
        has_star: false,
      },
      {
        id: '2',
        type: "单选题",
        value: 2,
        title: "听下面一段对话，回答第1至4题。",
        audio: "https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C",
        options: ["应收账款", "应收票据", "准备持有至到期的债权投资", "债务的豁免"],
        answer: [2],
        star_num: 7,
        has_star: false,
      },
      {
        id: '3',
        type: "简答题",
        value: 8,
        title: "请编写函数fun，其功能是：计算并输出3 到n 之间所有素数的平方根之和。 例如，若主函数从键盘给n 输入100 后，则输出为sum=148.874270。 注意：n 的值要大于2 但不大于100。",
        img: "",
        options: ["", ""],
        answer: ["应收账款", "应收票据"],
        star_num: 1,
        has_star: false,
      },
      {
        id: '4',
        type: "多选题",
        value: 3,
        title: "企业取得收入的货币形式，包括现金、存款、（）等。",
        options: ["应收账款", "应收票据", "准备持有至到期的债权投资", "债务的豁免"],
        answer: [1, 2, 3],
        star_num: 3,
        has_star: false,
      },

      {
        id: '6',
        value: 2,
        type: "单选题",
        title: "企业取得收入的货币形式，包括现金、存款、（）等。",
        options: ["应收账款", "应收票据", "准备持有至到期的债权投资", "债务的豁免"],
        answer: [1],
        answer_detail: '',
        star_num: 6,
        has_star: false,
      }
    ],

    paper: {
      type: "order",
      //评判标准，优，良，及格
      scoreLine: {
        'A': 90,
        'B': 80,
        'C': 60
      }
    },
    answer_page_index: 0,
    cur_ques_index: 0,
    audio_progress: 0,
    audio_paused: true,
    total_audio_progress: 0,
    show_answer_page: false,
    show_ques_list: false,
    tmp_transition_index: 0,
    answer_book: false,
  },


  starExplain() {
    let ques_list = this.data.ques_list;
    let cur_ques_index = this.data.cur_ques_index;
    ques_list[cur_ques_index].explain.is_star = !ques_list[cur_ques_index].explain.is_star;

    this.setData({
      ques_list
    })
  },


  starOthersExplain(e) {
    let index = e.currentTarget.dataset.index
    let ques_list = this.data.ques_list;
    let cur_ques_index = this.data.cur_ques_index;
    ques_list[cur_ques_index].other_explain[index].is_star = !ques_list[cur_ques_index].other_explain[index].is_star;

    this.setData({
      ques_list
    })
  },

  answerPageChanged(e) {
    this.setData({
      answer_page_index: e.detail.name
    })
  },
  starQuestion(e) {
    let index = this.data.cur_ques_index;
    let ques_list = this.data.ques_list;

    if (!ques_list[index].has_star) {
      ques_list[index].star_num++;
    } else {
      ques_list[index].star_num--;
    }
    ques_list[index].has_star = !ques_list[index].has_star;
    this.setData({
      ques_list
    })
  },

  bindtransition(e) {
    if (!flag_transition) {
      flag_transition = true
      if ((e.detail.dx < 20 && e.detail.dx > 0) || (e.detail.dx < 0 && e.detail.dx > -20)) {
        console.log("正在滑动")
        this.setData({
          // cur_ques_index: -1,
          istransition: true
        })
      }
    }
  },

  // 问题跳转
  jump2QuestionIndex(e) {
    this.setData({
      cur_ques_index: e.currentTarget.dataset.index,
      show_ques_list: false
    })
  },

  previewImage(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.ques_list[this.data.cur_ques_index].img // 需要预览的图片http链接列表
    })
  },

  bindChangeSwiper(e) {
    console.log("bindChangeSwiper");
    this.setData({
      tmp_transition_index: e.detail.current,
      audio_progress: 0,
      total_audio_progress: 0,
      show_answer_page: false,
      show_answer_option: false,
    })
  },

  bindanimationfinish() {
    this.setData({
      istransition: false
    })
    
    flag_transition = false;

    // 如果实际发生了页面切换，才进行下面逻辑
    if (this.data.cur_ques_index != this.data.tmp_transition_index) {
      console.log("停止切换")
      this.setData({
        cur_ques_index: this.data.tmp_transition_index,
      })
      this.changeQuestion();
    }
  },

  showNotify(right) {
    if (right) {
      Notify({
        message: '正确',
        color: '#fff',
        background: '#6FCF97',
        duration: 700,
      });
    } else {
      Notify({
        type: 'danger',
        message: '错误',
        duration: 700,
      });
    }
  },

  // 判断顺序不敏感的两个数组是否相等
  isArrEqual: function (arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((ele) => arr2.includes(ele));
  },

  // 点击确认答案
  tapConfirmAnswer: function () {

    let ques_list = this.data.ques_list;
    let cur_ques_index = this.data.cur_ques_index;
    let recorder = this.data.recorder;

    if (recorder[this.data.cur_ques_index].has_done) {
      return;
    }

    // 比较答案的正确性
    if (this.isArrEqual(ques_list[cur_ques_index].answer, recorder[cur_ques_index].user_mark)) {
      this.showNotify(true)
      recorder[cur_ques_index].correct = true;
    } else {
      this.showNotify(false)
      recorder[cur_ques_index].correct = false;

    }

    recorder[cur_ques_index].has_done = true;
    this.setData({
      recorder
    })
  },

  // 填空题
  textInputChange(e) {
    let index = e.target.dataset.index;
    let text = e.detail
    let recorder = this.data.recorder;
    let cur_ques_index = this.data.cur_ques_index;
    recorder[cur_ques_index].user_mark[index] = text
    this.setData({
      recorder
    })

  },

  // 点击多选题 
  tapMultiOption: function (e) {
    let recorder = this.data.recorder;
    let cur_ques_index = this.data.cur_ques_index;
    let clickOptionIndex = e.currentTarget.dataset.index
    if (this.data.paper.type != 'test') {
      if (recorder[this.data.cur_ques_index].has_done) {
        return;
      }
      if (recorder[this.data.cur_ques_index].colors[clickOptionIndex] == 'blue') {
        recorder[cur_ques_index].user_mark.pop(clickOptionIndex)
        recorder[cur_ques_index].colors[clickOptionIndex] = 'white'
      } else {
        recorder[cur_ques_index].user_mark.push(clickOptionIndex)
        recorder[cur_ques_index].colors[clickOptionIndex] = 'blue'
      }

      this.setData({
        recorder
      })
    }
  },


  // 点击单选题的选项
  // 1. 获取点击的序号
  // =================
  // 1.1 如果是做题模式
  // 如果是已经做过的题，再点击就没反应
  // 1.2 判断正误
  // 1.3 如果正确，则提示正确，并跳转下一题
  // 1.4 如果错误，则弹出解析栏
  // 1.5 选项标红

  // =================
  // 2.1 如果是考试模式
  // 2.2 则记录下来，并跳转下一题

  tapSingleOption: function (e) {
    let that = this
    let recorder = this.data.recorder;
    let cur_ques_index = this.data.cur_ques_index;
    let clickOptionIndex = e.currentTarget.dataset.index;
    if (this.data.paper.type != 'test') {
      if (recorder[cur_ques_index].has_done) {
        return;
      }
      recorder[cur_ques_index].has_done = true;
      recorder[cur_ques_index].colors[clickOptionIndex] = 'blue'
      let rightAnswer = this.data.ques_list[cur_ques_index].answer.toString()
      if (clickOptionIndex == rightAnswer) {
        this.showNotify(true)
        recorder[cur_ques_index].correct = true;
      } else {
        this.showNotify(false)
        recorder[cur_ques_index].correct = false;
      }


      this.setData({
        recorder
      })
    }
  },

  /*
   * 根据用户点击arr,options,answer,返回颜色数组
   * 正确的返回green
   * 选中的返回blue
   * 漏选的返回yellow
   * 
   * 错选的返回red
   * 
   */
  changeColor() {
    let recorder = this.data.recorder;
    let ques_list = this.data.ques_list;
    let cur_ques_index = cur_ques_index;
  },

  changeQuestion: function () {
    let that = this;
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
      show_answer_page: true
    })
  },

  onCloseAnswer: function () {
    this.setData({
      show_answer_page: false,
      answer_page_index: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 在这要生成
    let recorder = [];
    this.data.ques_list.forEach(element => {
      let colors = []
      let user_mark = []
      if (element.type == "填空题") {
        element.options.forEach(e => {
          user_mark.push('')
        })
      }
      element.options.forEach(e => {
        colors.push('white')
      })

      let tmp = {
        id: element.id,
        has_done: false,
        correct: false,
        colors: colors,
        user_mark: user_mark,
        time_cost: 0,
      }
      recorder.push(tmp);
    })

    this.setData({
      recorder
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})