// import {
//     getNotDoneTopic,
//     getWrongTopic,
//     getRightWrongNotDoneTopicNumber,
//     getTestTopic,
//     getCollectionTopic,
//     getCollectionTopicIds,
//     getRandomTopic,
//     resetUserTopic,
//     getTextOrImageTopic,
//     getRightOrWrongTopic,
//     getTestTypeTopic,
//     getKnowledgeTypeTopic,
//     getChapterTypeTopoics
// } from "../../api/index.js"
import {
    removeDuplicateForObjArr
} from "../../../utils/util.js"

const app = getApp();
let tempTimer = null; // 倒计时的计时器
const util = require('../../../utils/util.js');

Page({
    data: {
        userId: null, // 用户id
        subject: null, // 当前科目
        practiceType: null, // 练习类型
        topicArr: [], // 题目对象集合
        sumObj: {
            yes: 0,
            no: 0,
            all: 0
        }, // 存放做对的题数量，做错的题的数量和题目总数
    },
    // 请求顺章练习的题目
    requestOrderTopics() {
        const _this = this;
        const subject = this.data.subject;
        const userId = this.data.userId;
        // 请求少量的题目，懒加载
        getNotDoneTopic(subject, userId, true).then(res => {
            const data = res.data.data;
            // 关闭加载框
            wx.hideLoading();
            // 先判断当前是否还有没做完的题
            if (data.length === 0) {
                // 全部按顺序做完了，直接弹框让用户退出当前页面或者重置所有选项（也就是把所有做过的题目清零）
                wx.showModal({
                    title: "当前没有未做的题哦！",
                    content: "请点击确定按钮返回上一页，或者，点击重置按钮重置所有题目",
                    cancelText: "重置",
                    success(res) {
                        if (res.cancel) { // 点击的重置
                            // 向服务器发送重置请求
                            wx.showLoading({
                                title: "重置中..."
                            });
                            resetUserTopic(subject, userId).then(_ => {
                                // 服务器重置成功，再次发送请求来获取题目数据
                                _this.setTopicArr();
                            })
                        } else { // 点击的确定
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    }
                })
                return;
            }
            this.setData({
                topicArr: data
            })
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        }).then(_ => {
            // 马上再请求所有题目，并且去掉重复的
            getNotDoneTopic(subject, userId, false).then(res => {
                // 先判断请求的数据和已有的数据是否都为数组
                const data = Array.isArray(res.data.data) ? res.data.data : [];
                const tempArr = Array.isArray(this.data.topicArr) ? this.data.topicArr : [];
                const newArr = tempArr.concat(data);
                this.setData({
                    topicArr: removeDuplicateForObjArr(newArr) // 调用一下去重函数
                })
            })
        })
        // 请求题目数量
        getRightWrongNotDoneTopicNumber(subject, userId).then(res => {
            const data = res.data.data;
            this.setData({
                sumObj: {
                    yes: data.rightNumber,
                    no: data.wrongNumber,
                    all: data.rightNumber + data.wrongNumber + data.notDoneNumber
                }
            })
        })
    },
    // 请求模拟考试的题目
    requestTestTopics() {
        const subject = this.data.subject;
        getTestTopic(subject).then(res => {
            this.setData({
                topicArr: res.data.data,
                'sumObj.all': 50
            })
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
            // 关闭加载框
            wx.hideLoading();
        })
    },
    // 请求错题
    requestWrongTopics() {
        const subject = this.data.subject;
        const userId = this.data.userId;
        getWrongTopic(subject, userId).then(res => {
            const data = res.data.data;
            // 关闭加载框
            wx.hideLoading();
            // 先判断当前是否错题
            if (data.length === 0) {
                this.myShowModal("错误")
                return;
            }
            this.setData({
                topicArr: data,
                "sumObj.all": data.length
            })
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        })
    },
    // 请求收藏
    requestCollectTopics() {
        const subject = this.data.subject;
        const userId = this.data.userId;
        getCollectionTopic(subject, userId).then(res => {
            const data = res.data.data;
            // 关闭加载框
            wx.hideLoading();
            // 先判断当前是否有收藏的题目
            if (data.length === 0) {
                this.myShowModal("收藏")
                return;
            }
            this.setData({
                topicArr: data,
                "sumObj.all": data.length
            })
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        })
    },
    // 请求随机练习
    requestRandomTopics() {
        const subject = this.data.subject;
        const userId = this.data.userId;
        getRandomTopic(subject, userId).then(res => {
            const data = res.data.data;
            // 关闭加载框
            wx.hideLoading();
            // 先判断当前是否还有没做完的题
            if (data.length === 0) {
                // 全部按顺序做完了，直接弹框让用户退出当前页面或者重置所有选项（也就是把所有做过的题目清零）
                wx.showModal({
                    title: "当前没有未做的题哦！",
                    content: "请点击确定按钮返回上一页，或者，点击重置按钮重置所有题目",
                    cancelText: "重置",
                    success(res) {
                        if (res.cancel) { // 点击的重置
                            // 向服务器发送重置请求
                            wx.showLoading({
                                title: "重置中..."
                            });
                            resetUserTopic(subject, userId).then(_ => {
                                // 服务器重置成功，再次发送请求来获取题目数据
                                this.setTopicArr();
                            })
                        } else { // 点击的确定
                            wx.navigateBack({
                                delta: 1
                            })
                        }
                    }
                })
                return;
            }
            this.setData({
                topicArr: data
            })
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        })
        // 请求题目数量
        getRightWrongNotDoneTopicNumber(subject, userId).then(res => {
            const data = res.data.data;
            this.setData({
                sumObj: {
                    yes: data.rightNumber,
                    no: data.wrongNumber,
                    all: data.rightNumber + data.wrongNumber + data.notDoneNumber
                }
            })
        })
    },
    // 请求按内容类型分类的题目
    requestContentTypeTopics(type) {
        const subject = this.data.subject;
        getTextOrImageTopic(subject, type).then(res => {
            this.setData({
                topicArr: res.data.data,
                'sumObj.all': res.data.data.length
            })
            // 关闭加载框
            wx.hideLoading();
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        })
    },
    // 请求按答案类型分类的题目
    requestAnswerTypeTopics(type) {
        const subject = this.data.subject;
        getRightOrWrongTopic(subject, type).then(res => {
            this.setData({
                topicArr: res.data.data,
                'sumObj.all': res.data.data.length
            })
            // 关闭加载框
            wx.hideLoading();
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        })
    },
    // 请求按试题类型分类的题目
    requestTestTypeTopics(type) {
        const subject = this.data.subject;
        getTestTypeTopic(subject, type).then(res => {
            const data = res.data.data;
            // 关闭加载框
            wx.hideLoading();
            // 先判断当前是否有题目
            if (data.length === 0) {
                this.myShowModal()
                return;
            }
            this.setData({
                topicArr: data,
                'sumObj.all': data.length
            })
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        })
    },
    // 请求按知识点类型分类的题目
    requestKnowledgeTypeTopics(type) {
        const subject = this.data.subject;
        getKnowledgeTypeTopic(subject, type).then(res => {
            const data = res.data.data;
            // 关闭加载框
            wx.hideLoading();
            // 先判断当前是否有题目
            if (data.length === 0) {
                this.myShowModal()
                return;
            }
            this.setData({
                topicArr: data,
                'sumObj.all': data.length
            })
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        })
    },
    // 请求某一章节的题目
    requestChapterTypeTopoics(type) {
        const subject = this.data.subject;
        getChapterTypeTopoics(subject, type).then(res => {
            const data = res.data.data;
            // 关闭加载框
            wx.hideLoading();
            // 先判断当前是否有题目
            if (data.length === 0) {
                this.myShowModal()
                return;
            }
            this.setData({
                topicArr: data,
                'sumObj.all': data.length
            })
            // 请求收藏的题目id数组
            this.getCollectionTopicIdsArr();
        })
    },
    // 请求本次考试的错题
    requestTestWrongTopics() {
        const topics = app.globalData.testWrongTopics;
        // 关闭加载框
        wx.hideLoading();
        // 先判断当前是否有题目
        if (topics.length === 0) {
            wx.showModal({
                title: `当前没有任何做错的题目哦！`,
                showCancel: false,
                success() {
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }
            })
            return;
        }
        this.setData({
            topicArr: topics,
            'sumObj.all': topics.length
        })
        // 请求收藏的题目id数组
        this.getCollectionTopicIdsArr();
    },
    // 如果没有请求到题目的弹窗
    myShowModal(text = "") {
        wx.showModal({
            title: `当前没有任何${text}题目哦！`,
            showCancel: false,
            success() {
                wx.navigateBack({
                    delta: 1
                })
            }
        })

    },
    // 根据练习的类型请求题目数据
    setTopicArr() {
        const type = app.globalData.typeValue;
        let title = type; // 用来动态设置页面标题的
        // 根据练习类型确定要请求的题目]
        switch (this.data.practiceType) {
            case 'order':
                title = '顺章练习';
                this.requestOrderTopics();
                break;
            case 'test':
                title = '模拟考试';
                // 先重置本次做错的题目数组
                app.globalData.testWrongTopics = [];
                this.requestTestTopics();
                break;
            case 'wrong':
                title = '错题回顾';
                this.requestWrongTopics();
                break;
            case 'collect':
                title = "我的收藏";
                this.requestCollectTopics();
                break;
            case 'random':
                title = "随机练习";
                this.requestRandomTopics();
                break;
            case 'contentType':
                this.requestContentTypeTopics(type);
                break;
            case 'answerType':
                this.requestAnswerTypeTopics(type);
                break;
            case 'testType':
                this.requestTestTypeTopics(type);
                break;
            case 'knowledgeType':
                this.requestKnowledgeTypeTopics(type);
                break;
            case 'chapterType':
                let num = type == 1 ? "一" : type == 2 ? "二" : "三";
                title = `第${num}章节`;
                this.requestChapterTypeTopoics(type);
                break;
            case 'testWrong':
                title = '考试错题回顾';
                this.requestTestWrongTopics();
        }
        // 设置标题为该练习类型
        wx.setNavigationBarTitle({
            title
        })
    },
    // 修改题目数据
    changeSumObj(e) {
        switch (e.detail) {
            case 'yes':
                this.setData({
                    'sumObj.yes': this.data.sumObj.yes + 1,
                })
                break;
            case 'no':
                this.setData({
                    'sumObj.no': this.data.sumObj.no + 1,
                })
        }
    },
    
    // 请求收藏的题目id数组
    getCollectionTopicIdsArr() {
        getCollectionTopicIds(this.data.subject, this.data.userId).then(res => {
            // 判断是否请求服务器错误,失败的话弹出按提示并且推出当前页面回到主页
            if (res.data.msg === "失败") {
                wx.showModal({
                    title: '请求失败',
                    content: '抱歉，服务器开小差了，请重新请求！',
                    showCancel: false,
                    success: (result) => {
                        wx.redirectTo({
                            url: '/pages/index/index'
                        });
                    }
                });
                return;
            }
            // 如果有收藏的题目就在题目数组的对应题目上添加一个 isCollection 属性，并且属性值设置为true
            const collectionIds = res.data.data;
            for (let i = 0; i < this.data.topicArr.length; i++) {
                const topic = this.data.topicArr[i];
                if (!Array.isArray(collectionIds) || collectionIds.length === 0) break;
                const isCollection = collectionIds.includes(topic.id.toString());
                topic.isCollection = isCollection;
            }
            this.setData({
                topicArr: this.data.topicArr
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
       
        // 页面初始化时给用户id、当前科目和练习类型赋值
        const userId = app.globalData.userInfo.userId;
        const subject = app.globalData.currentSubject;
        const practiceType = app.globalData.practiceType;
        this.setData({
            userId,
            subject: subject,
            practiceType
        })
        // 显示一个加载框
        // wx.showLoading({
        //     mask: true,
        //     title: '加载中...'
        // })
        // 判断是否获取到了userId，如果还没有获取到就把调用函数写到回调中
        if (app.globalData.userInfo.userId) {
            console.log(app.globalData.userInfo.userId)
            this.setTopicArr();
        } else {
            console.log(app.globalData.userInfo.userId)

            app.globalData.loginCallback = userId => {
                this.setData({
                    userId
                })
                this.setTopicArr();
            }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // 页面卸载一定要清除定时器
        clearInterval(tempTimer);
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
        return {
            title: '摩托车驾照理论题',
            path: '/pages/index/index'
        }
    }
})