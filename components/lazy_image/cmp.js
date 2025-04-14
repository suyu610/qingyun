// components/lazyImage/cms.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src: String,
        lazySrc: { // 默认加载图片时显示的一张图片，这里用的是一张#eee背景的图片，大小1.4k左右
            type: String,
            value: "https://fqiang-1300549778.cos.ap-chongqing.myqcloud.com/jz/lazyImg.png"
        },
        mode: {
            type: String,
            value: "scaleToFill"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isLoad: false, // 是否加载完成
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad(){
            this.setData({
                isLoad: true
            })
        }
    }
})
