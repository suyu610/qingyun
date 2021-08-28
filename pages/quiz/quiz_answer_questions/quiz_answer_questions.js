// pages/quiz/quiz_comments/quiz_comments.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import router from '../../../utils/router/index.js';
import QuizService from '../../../net/service/quizService.js'
import util from '../../../utils/util.js'

let innerAudioContext = wx.createInnerAudioContext({});
let progress_timer = null;
let flag_play_status = false;
let flag_transition = false;
let richText = null; //富文本编辑器实例

const word_audio = wx.createInnerAudioContext({});
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */

  data: {

    // 新建笔记相关
    showInsertNewNotePopup: false,
    newNotePlaceholder: '开始编辑吧...',
    // 键盘相关

    keyboardShow: false,
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
    ques_list: [],

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


  // 键盘相关
  showKeyBoard: function () {
    this.data.customKeyBoard.showKeyBoard()
  },

  hideKeyboard: function () {
    this.data.customKeyBoard.hideKeyBoard()
  },

  inputValugeChanged: function (e) {
    this.setData({
      value: e.detail.join("")
    })
  },


  // 添加笔记相关
  // 编辑器初始化完成时触发，可以获取组件实例
  onEditorReady() {
    console.log('[onEditorReady callback]')
    richText = this.selectComponent('#richText'); //获取组件实例
  },

  showInsertNewNotPopup: function () {
    this.setData({
      show_answer_page: false,
      showInsertNewNotePopup: true
    })
  },
  saveNote: function (res) {
    this.onHideInsertNewNotePopup();
    let {
      value
    } = res.detail;
    wx.showToast({
      title: '保存成功',
      icon: 'none',
    })
    console.log('[getEditorContent callback]=>', value)
  },

  noop: function () {
    console.log("blur")
    this.onHideInsertNewNotePopup()
  },
  onHideInsertNewNotePopup: function () {
    this.setData({
      show_answer_page: true,
      showInsertNewNotePopup: false
    })
  },

  starDefaultNote() {
    let ques_list = this.data.ques_list;
    let cur_ques_index = this.data.cur_ques_index;
    ques_list[cur_ques_index].defaultNote.hasStar = !ques_list[cur_ques_index].defaultNote.hasStar;

    this.setData({
      ques_list
    })
  },


  starOthersExplain(e) {
    let index = e.currentTarget.dataset.index
    let ques_list = this.data.ques_list;
    let cur_ques_index = this.data.cur_ques_index;
    ques_list[cur_ques_index].otherNote[index].hasStar = !ques_list[cur_ques_index].otherNote[index].hasStar;

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
    this.setData({
      cur_ques_index: this.data.tmp_transition_index,
    })
    this.changeQuestion();
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

  // 判断顺序不敏感的两个数组是否相等?
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
    console.log(ques_list[cur_ques_index].answer)
    console.log(recorder[cur_ques_index].user_mark)

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
    console.log(e)
    let index = e.target.dataset.index;
    let text = e.detail
    let recorder = this.data.recorder;
    let cur_ques_index = this.data.cur_ques_index;

    if (index == null) {
      index = 0
      recorder[cur_ques_index].user_mark[index] = text.join('')
      this.setData({
        value: text.join('')
      })
    }

    recorder[cur_ques_index].user_mark[index] = text.join('')
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
    this.data.customKeyBoard.setValue(this.data.recorder[this.data.cur_ques_index].user_mark[0]);

    this.setData({
      audio_paused: true,
      current_audio_progress: 0
    })
    innerAudioContext.stop()
    clearInterval(progress_timer);
  },

  initAudioPlayer() {
    let that = this
    innerAudioContext = wx.createInnerAudioContext({});

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
  togglePlay(e) {
    innerAudioContext.src = e.currentTarget.dataset.url
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

  onReady: function () {
    this.data.customKeyBoard = this.selectComponent('#customKeyBoard')
  },

  loadQuesSuccess: function (e) {

    // 在这要生成
    let recorder = [];
    let ques_list = e;
    let that = this;

    // 把时间弄短
    ques_list.forEach(ques => {
      // console.log(ques.defaultNote)
      if (ques.defaultNote != null) {
        ques.defaultNote.createTime = util.timeFormatSeconds(ques.defaultNote.createTime)
      }
      ques.otherNote.forEach(note => {
        note.createTime = util.timeFormatSeconds(note.createTime)
      })
      let colors = []
      let user_mark = []

      if (ques.type == "单词默写题") {
        // 爬取
        wx.request({
          url: 'https://cdns.qdu.life/e/' + ques.answer[0] + '.json',
          success(e) {
            ques.title = e.data.mean_cn;
            ques.explain = {
              body: e.data.mean_cn + '\n\n' + e.data.mean_en,
              is_star: true,
              view_count: 14,
              create_time: "2021年8月14日23:12:38",
              user_name: '青云'
            }
            that.setData({
              recorder,
              ques_list
            })
          }
        })
      }

      if (ques.type == "填空题") {
        ques.options.forEach(e => {
          user_mark.push('')
        })
      }

      ques.options.forEach(e => {
        colors.push('white')
      })

      let tmp = {
        id: ques.id,
        has_done: false,
        correct: false,
        colors: colors,
        user_mark: user_mark,
        time_cost: 0,
      }
      recorder.push(tmp);
    })

    this.setData({
      recorder,
      ques_list
    })
  },
  loadQuesFail: function (e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const data = router.extract(options);
    this.initAudioPlayer()
    QuizService.StartAnswer(this.loadQuesSuccess, this.loadQuesFail, data);

  },

  kbd_showAnswer: function () {
    this.data.customKeyBoard.hideKeyBoard()
    this.showAnswer()
  },
  kbd_voice: function () {
    word_audio.src = "http://ali.bczcdn.com/r/" + this.data.ques_list[this.data.cur_ques_index].answer[0].toLowerCase() + ".mp3"
    word_audio.play()
    word_audio.onCanplay(_ => {})

    word_audio.onError(_ => {
      Toast.fail('暂无该单词发音');
    })
  },

})