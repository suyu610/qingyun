// components/numbox/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isCollection: Boolean,
        sumObj: Object,
        showTimer: Boolean,
        countdownTime: Number, // 倒计时时间
        topicArr: Array, // 题目数组
        currentIndex: Number, // 当前正在做第几题
    },

    /**
     * 组件的初始数据
     */
    data: {
        minutes: "",
        seconds: "",
        showTopicNumBox: false
    },
    observers: {
        "countdownTime": function (countdownTime) {
            const minutes = Math.floor(countdownTime / 60);
            const seconds = Math.floor(countdownTime % 60);
            this.setData({
                minutes: minutes < 10 ? "0" + minutes : minutes,
                seconds: seconds < 10 ? "0" + seconds : seconds
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCollectionClick(e) {
            this.triggerEvent('oncollectionclick')
        },
        // 背景层点击事件
        bgClick() {
            this.setData({
                showTopicNumBox: false
            })
            this.triggerEvent('onhandletopicnumbox', false)
        },
        // 点击题目列表按钮，控制题目集合的显示与隐藏
        handleShowTopicNumBox(){
            const showTopicNumBox = !this.data.showTopicNumBox;
            this.setData({
                showTopicNumBox
            })
            this.triggerEvent('onhandletopicnumbox', showTopicNumBox);
        },
        // 点击切换到某个题目
        topicNumTap(e){
            const index = e.currentTarget.dataset.index;
            this.triggerEvent('onswitchtopic', index)
            this.setData({
                showTopicNumBox: false
            })
        }
    }
})