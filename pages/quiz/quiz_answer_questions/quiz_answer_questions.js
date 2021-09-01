// pages/quiz/quiz_comments/quiz_comments.js
import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
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
    showAnswerSwitch: false,
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
    showAnswerPage: false,
    showQuesList: false,
    tmp_transition_index: 0,
    answer_book: false,
    settingTitle1: '显示答案',
    settingTitle2: '重新开始',
    itemTitle: '设置',
  },


  onshowAnswerSwitchChange: function (e) {
    this.setData({
      showAnswerSwitch: e.detail
    })
  },

  // 添加笔记相关
  // 编辑器初始化完成时触发，可以获取组件实例
  onEditorReady() {
    richText = this.selectComponent('#richText'); //获取组件实例
  },

  showInsertNewNotePopup: function () {
    this.setData({
      showAnswerPage: false,
      showInsertNewNotePopup: true
    })
  },

  handleInsertNoteSuccess: function () {
    wx.showToast({
      title: '保存成功',
      icon: 'none',
    })

    this.onHideInsertNewNotePopup();
  },

  handleInsertNoteFail: function () {
    wx.showToast({
      title: '保存失败',
      icon: 'error',
    })

    this.onHideInsertNewNotePopup();
  },


  saveNote: function (res) {
    let {
      value
    } = res.detail;

    let quizId = this.data.quizId;
    let quesId = this.data.ques_list[this.data.cur_ques_index].id;
    console.log(value)

    let data = {
      quizId: quizId,
      quesId: quesId,
      body: value.html,
      isPublic: false 
    }
    console.log(data)
    // [ todo ] 内容文本检测
    QuizService.InsertOrUpdateNote(this.handleInsertNoteSuccess, this.handleInsertNoteFail, data)
  },

  noop: function () {
    console.log("blur")
    this.onHideInsertNewNotePopup()
  },

  onHideInsertNewNotePopup: function () {
    this.setData({
      showAnswerPage: true,
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


  handleToggleStarSuccess: function () {

  },

  handleToggleStarFail: function () {
    wx.showToast({
      title: '收藏失败，请重试',
      duration: 800,
    })

    let index = this.data.cur_ques_index;
    let ques_list = this.data.ques_list;

    ques_list[index].hasStar = !ques_list[index].hasStar;

  },

  starQuestion(e) {
    let index = this.data.cur_ques_index;
    let ques_list = this.data.ques_list;
    let quizId = this.data.quizId;
    let quesId = ques_list[index].id;
    QuizService.ToggleStarQues(this.handleToggleStarSuccess, this.handleToggleStarFail, quizId, quesId);

    ques_list[index].hasStar = !ques_list[index].hasStar;
    this.setData({
      ques_list
    })
  },


  // 问题跳转
  jump2QuestionIndex(e) {
    this.setData({
      cur_ques_index: e.currentTarget.dataset.index,
      showQuesList: false
    })
  },

  previewImage(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    let imageUrlList = []
    this.data.ques_list[this.data.cur_ques_index].files.forEach(e => {
      if (e.mediaType == "img")
        imageUrlList.push(e.url)
    })
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: imageUrlList // 需要预览的图片http链接列表
    })
  },

  nextSwiperBtnClick() {
    let cur_ques_index = this.data.cur_ques_index;
    if (cur_ques_index == this.data.ques_list.length - 1) {
      cur_ques_index = 0
    } else {
      cur_ques_index++
    }
    this.setData({
      cur_ques_index
    })
  },

  prevSwiperBtnClick() {
    let cur_ques_index = this.data.cur_ques_index;
    if (cur_ques_index == 0) {
      cur_ques_index = this.data.ques_list.length - 1
    } else {
      cur_ques_index--
    }
    this.setData({
      cur_ques_index
    })
  },

  bindChangeSwiper(e) {
    console.log("bindChangeSwiper");
    this.setData({
      tmp_transition_index: e.detail.current,
      audio_progress: 0,
      total_audio_progress: 0,
      showAnswerPage: false,
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
    return arr1.length === arr2.length

      &&
      (arr1.every((ele) => arr2.includes(ele)) ||
        arr1.every((ele) => arr2.includes(parseInt(ele))))
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
      recorder[cur_ques_index].user_mark[index] = text
    }
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
    let clickOptionSeq = e.currentTarget.dataset.seq

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

  // 
  handleSubmitQuesRecorderSuccess: function (e) {
    console.log(e)
  },

  handleSubmitQuesRecorderFail: function (e) {
    Notify({
      message: '未能保存该答题记录',
      type: 'danger',
      duration: 700,
    });
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
    let recorder = this.data.recorder;
    let cur_ques_index = this.data.cur_ques_index;
    let clickOptionIndex = e.currentTarget.dataset.index;
    let clickOptionSeq = e.currentTarget.dataset.seq;

    let ques_list = this.data.ques_list;

    if (this.data.paper.type != 'test') {
      if (recorder[cur_ques_index].has_done) {
        return;
      }
      recorder[cur_ques_index].has_done = true;
      recorder[cur_ques_index].colors[clickOptionIndex] = 'blue'
      let rightAnswer = ques_list[cur_ques_index].answer.toString()
      recorder[cur_ques_index].user_mark = clickOptionSeq
      console.log("点击的次序是", clickOptionSeq)
      console.log("答案是", rightAnswer)
      if (clickOptionSeq == rightAnswer) {
        this.showNotify(true)
        recorder[cur_ques_index].correct = true;
      } else {
        this.showNotify(false)
        recorder[cur_ques_index].correct = false;
      }

      this.setData({
        recorder
      })

      // 添加答题记录
      let submitData = {
        "userInput": recorder[cur_ques_index].user_mark,
        "quizId": this.data.quizId,
        "quesId": ques_list[cur_ques_index].id,
        "isRight": clickOptionIndex == rightAnswer ? '1' : '0'
      }
      QuizService.SubmitQuesRecorder(this.handleSubmitQuesRecorderSuccess, this.handleSubmitQuesRecorderFail, submitData)

      console.log(recorder[cur_ques_index].user_mark, clickOptionIndex == rightAnswer, ques_list[cur_ques_index].id, this.data.quizId)
    }
  },

  // 点击确认答案
  tapConfirmAnswer: function () {
    let ques_list = this.data.ques_list;
    let cur_ques_index = this.data.cur_ques_index;
    let recorder = this.data.recorder;
    let transfer_user_mark = []

    if (recorder[this.data.cur_ques_index].has_done) {
      return;
    }

    // 这里要对用户的uaser_mark进行一个转换，将index => seq
    if (ques_list[cur_ques_index].type == "多选题") {
      // 
      recorder[cur_ques_index].user_mark.forEach(e => {
        transfer_user_mark.push(ques_list[cur_ques_index].options[e].seq)
      })
    } else {
      transfer_user_mark = recorder[cur_ques_index].user_mark
    }



    let isCorrect = this.isArrEqual(ques_list[cur_ques_index].answer, transfer_user_mark)
    console.log(ques_list[cur_ques_index].answer, transfer_user_mark)
    // 比较答案的正确性
    if (isCorrect) {
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

    // 添加答题记录
    // user_input is_correct,ques_id,quiz_id

    // 添加答题记录
    let submitData = {
      "userInput": ques_list[cur_ques_index].type = "多选题" ? recorder[cur_ques_index].user_mark.join("&#&") : transfer_user_mark.join("&#&"),
      "quizId": this.data.quizId,
      "quesId": ques_list[cur_ques_index].id,
      "isRight": isCorrect ? '1' : '0'
    }

    QuizService.SubmitQuesRecorder(this.handleSubmitQuesRecorderSuccess, this.handleSubmitQuesRecorderFail, submitData)

  },


  // 切换题目需要进行的事
  // 1. 暂停音频
  // 2. 将音频进度为0
  // 3. 结束音频的循环任务

  changeQuestion: function () {
    this.setData({
      audio_paused: true,
      current_audio_progress: 0
    })
    innerAudioContext.stop()
    clearInterval(progress_timer);
  },

  ////////////////////// 音频播放相关  ////////////////////////////
  ////////////////////////////////////////////////////////////////
  // 初始化音频
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
        that.setData({
          current_audio_progress: innerAudioContext.currentTime,
          audio_progress: innerAudioContext.currentTime / that.data.total_audio_progress * 100
        })
      }, 100)
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

  // 切换播放状态
  togglePlay(e) {
    console.log(innerAudioContext.paused)
    if (innerAudioContext.paused) {
      innerAudioContext.src = e.currentTarget.dataset.url
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



  /////////////////////////////////////////

  onShowQuestionList: function () {
    this.setData({
      showQuesList: true
    })
  },

  onCloseQuestionList: function () {
    this.setData({
      showQuesList: false
    })
  },
  showAnswer: function () {
    this.setData({
      showAnswerPage: true
    })
  },

  onCloseAnswer: function () {
    this.setData({
      showAnswerPage: false,
      answer_page_index: 0,
    })
  },
  // 打乱数组顺序

  shuffle: function (arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
      var index = parseInt(Math.random() * (len - i));
      var temp = arr[index];
      arr[index] = arr[len - i - 1];
      arr[len - i - 1] = temp;
    }
    return arr;
  },

  loadQuesSuccess: function (e) {
    // 在这要生成
    let recorder = [];
    let ques_list = e;
    let that = this;
    // 如果是 isShowAnswer = true，则全部为has_done
    // 把时间的格式调整为yyyy-mm-dd hh:mm:ss
    ques_list.forEach(ques => {
      // console.log(ques.defaultNote)
      if (ques.defaultNote != null) {
        ques.defaultNote.createTime = util.timeFormatSeconds(ques.defaultNote.createTime)
      }
      if(ques.userNote!=null){
        ques.userNote.createTime = util.timeFormatSeconds(ques.userNote.createTime)

      }
      ques.otherNote.forEach(note => {
        note.createTime = util.timeFormatSeconds(note.createTime)
      })
      let colors = []
      let user_mark = []

      // 如果是单选或多选题，则将选项打乱顺序,这里答案也需要跟着边
      if (ques.type == "多选题" || ques.type == "单选题") {
        // 现在要获取他现在的次序
        // 现在记录的是他的次序比如0,1,4
        ques.options = this.shuffle(ques.options)
        let transfer_answer = []
        ques.answer.forEach(e => {
          ques.options.forEach(option => {
            if (option.seq == e) {
              transfer_answer.push(ques.options.indexOf(option))
            }
          })
        })
        ques.transfer_answer = transfer_answer
      }

      if (ques.type == "单词默写题") {
        // 爬取
        wx.request({
          url: 'https://cdns.qdu.life/e/' + ques.title + '.json',
          success(e) {
            console.log(e)
            ques.answer = [ques.title];
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
        has_done: this.data.showAnswerSwitch,
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

    this.setData({
      quizId: data.id,
      showAnswerSwitch: data.isShowAnswer
    })
    console.log(data);
    this.initAudioPlayer()
    QuizService.StartAnswer(this.loadQuesSuccess, this.loadQuesFail, data);
  },
})