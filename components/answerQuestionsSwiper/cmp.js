// import {
//     addRightTopic,
//     addWrongTopic,
//     updateCollectionTopic,
//     addResult,
// } from "../../api/index.js"
const app = getApp();
// components/answerQuestionsSwiper/cmp.js
Component({
    options: {
        addGlobalClass: true,
      }
,    
    /**
     * 组件的属性列表
     */
    properties: {
        // 题目数组
        topicArr: {
            type: Array,
            value: []
        },
        // 存放做对的题数量，做错的题的数量和题目总数
        sumObj: {
            type: Object,
            value: {
                yes: 0,
                no: 0,
                all: 0
            }
        }
    },
    observers: {
        'topicArr': function (topicArr) {
            this.setData({
                dataList: topicArr
            })
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        current: 0, // 用来初始化轮播图应该显示第几个
        showIndex: 0, // 当前显示的的是第几个，初始化的时候一定要跟current的值保持一致
        dataList: [], // 数据
        minIndex: 0, // 当前轮播图显示最前边的一张应该是数组的第几项 
        showCount: 5, // 一共需要显示几页轮播图 
        topicBoxIsBg: false, // topicBox组件是否充当背景在使用
        countdownTime: 30 * 60, // 倒计时的秒数
        practiceType: '', // 练习类型
        userId: '', // 用户id 
        subject: '', // 科目
        imgBaseUrl: '', // 题目图片的baseUrl
        tempTimer: null, // 模拟测试的定时器
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 动画结束时触发
        onFinish(e) {
            // 将前一次dx的值初始化为空，缩放
            // prev = null;
            let {
                minIndex,
                showCount
            } = this.data;
            let current = e.detail.current;
            // 获取正常情况下应该显示在第几页
            const centerIndex = Math.ceil(showCount / 2) - 1;
            if (
                // 如果当前的页码大于了应该居中显示的页码，那么就让轮播图列表的最前边一张消失，在最后边添加一张
                // 还要判断是否已经显示到了最后一张了，如果显示到了最后一张了那就不用再调整显示数量以及当前显示的第几页了
                (current > centerIndex && minIndex + showCount < this.data.dataList.length) ||
                // 如果当前页码小于了应该居中显示的页码，那么就让轮播图最前边添加一张，最后边消失一张
                // 还要判断是否已近显示到第一张了，如果是则不用调整
                (current < centerIndex && minIndex > 0)
            ) {
                minIndex = minIndex + current - centerIndex;
                current = centerIndex;
                this.setData({
                    minIndex,
                    current
                })
            }
            // 将以下数值更新
            this.setData({
                showIndex: minIndex + current
            })
        },
        // 跳转到指定的某一项
        goItemByIndex(index) {
            const len = this.data.dataList.length;
            wx.hideLoading();
            // 计算如果是居中显示的话，那么curren的值是多少
            const centerIndex = Math.ceil(this.data.showCount / 2) - 1;
            // 计算minIndex的值
            let minIndex = index - centerIndex;
            if (minIndex < 0) {
                minIndex = 0;
            } else if (minIndex + this.data.showCount > len) {
                minIndex = len - this.data.showCount;
            }
            // 计算current的值
            let current = centerIndex;
            if (index <= centerIndex) {
                current = index;
            } else if (index >= len - centerIndex) {
                current = centerIndex - len + index + 1 + centerIndex;
            }
            this.setData({
                current,
                showIndex: current + minIndex,
                minIndex
            })
        },
        // 题目做错了的回调
        onwrong(e) {
            this.addClassList(e.detail);
            this.triggerEvent('onchangesumobj', 'no');
            // 去判断是否是最后一题了
            this.isLastTopic();
            if (this.data.practiceType === 'test') {
                // 如果是模拟考试中做错题目了，那么就把这个题目数据存到全局，后边可能有用
                const id = e.detail.id;
                const wrongTopic = this.properties.topicArr.find(topic => topic.id === id);
                app.globalData.testWrongTopics.push(wrongTopic);
                return;
            }
            addWrongTopic(this.data.subject, this.data.userId, e.detail.id);
        },
        // 题目做正确了的回调
        oncorrect(e) {
            this.addClassList(e.detail);
            this.triggerEvent('onchangesumobj', 'yes');
            this.toNext();
            if (this.data.practiceType === 'test') return;
            addRightTopic(this.data.subject, this.data.userId, e.detail.id);
        },
        // 点击收藏按钮的回调
        oncollectionclick() {
            const index = this.data.showIndex;
            const isCollection = !this.data.dataList[index].isCollection;
            this.data.dataList[index].isCollection = isCollection;
            this.setData({
                dataList: this.data.dataList
            })
            // 发送请求
            updateCollectionTopic(this.data.subject, this.data.userId, this.data.dataList[index].id)
        },
        // topic-num-box的显示与影藏的回调
        onhandletopicnumbox(e) {
            this.setData({
                topicBoxIsBg: e.detail
            })
        },
        // 点击了某个题目的回调
        onswitchtopic(e) {
            const index = e.detail;
            this.goItemByIndex(index);
            this.setData({
                topicBoxIsBg: false
            })
        },
        // 自动跳到下一题
        toNext() {
            if (this.isLastTopic()) return;
            this.setData({
                current: this.data.current + 1
            })
        },
        // 将做过的题目的信息存起来，主要目的是因为一面翻过去了这题再返回回来的时候知道刚刚做题目选的什么
        addClassList({ id, classList }) {
            const topic = this.data.dataList.find(topic => topic.id === id);
            topic && (topic.classList = classList);
            this.setData({
                dataList: this.data.dataList
            })
        },

        // 是否到达最后一题了
        isLastTopic() {
            if (this.data.showIndex < this.data.dataList.length - 1) return false;
            // 到了最后一题了
            if (this.data.practiceType === 'test') { // 做的模拟考试
                // 倒计时结束
                clearInterval(this.data.tempTimer);
                this.onOver();
                return true;
            }
            wx.showToast({
                title: '已经是最后一题',
                icon: 'success',
            })
            return true;
        },
        // 启动计时器
        startTimer() {
            clearInterval(this.data.tempTimer);
            const tempTimer = setInterval(() => {
                const currentTime = this.data.countdownTime - 1;
                this.setData({
                    countdownTime: currentTime
                })
                if (currentTime <= 0) {
                    // 倒计时结束
                    clearInterval(this.data.tempTimer);
                    this.onOver();
                }
            }, 1000);
            this.setData({
                tempTimer
            })
        },
        // 考试结束事件
        onOver() {
            const subject = this.data.subject;
            const userId = this.data.userId;
            const score = this.properties.sumObj.yes * 2;
            const timeConsuming = 30 * 60 - this.data.countdownTime;
            // 将本次考试成绩信息存到全局
            app.globalData.testResult = {
                score,
                timeConsuming
            }
            // 上传本次成绩
            addResult(subject, userId, score, timeConsuming);
            // 跳转到考试成绩显示页面
            wx.reLaunch({
                url: '/pages/testResult/testResult'
            })
        },
    },
    // 组件的生命周期
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            // 页面初始化时给用户id、当前科目和练习类型赋值
            const userId = app.globalData.userInfo.userId;
            const subject = app.globalData.currentSubject;
            const practiceType = app.globalData.practiceType;
            // const imgBaseUrl = `https://fqiang-1300549778.cos.ap-chongqing.myqcloud.com/jz/topic_${subject}/`;
            const imgBaseUrl = ``;

            if(practiceType === 'test') {
                // 启动计时器
                this.startTimer();
            }
            this.setData({
                userId,
                subject,
                practiceType,
                imgBaseUrl
            })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
            clearInterval(this.data.tempTimer);
        },
    },
})