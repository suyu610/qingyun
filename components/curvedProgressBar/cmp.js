// components/curvedProgressBar/cmp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        percentage: {
            type: Number,
            value: 0,
        }
    },
    observers: {
        'percentage': function (percentage) {
            this.drawProgress(percentage);
            // this.drawCanvas(percentage);
        }
    },
    /**
     * 组件的初始数据
     */
    data: {

    },


    /**
     * 组件的方法列表
     */
    methods: {
        // 绘制背景
        drawBg(ctx) {
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.arc(150, 85, 80, (Math.PI * 3 / 4), Math.PI / 4, 0);
            ctx.strokeStyle = "rgba(0,0,0,0.1)";
            ctx.stroke();
        },
        // 绘制某一帧进度条
        drawProgressByOne(ctx, currentAngle) {
            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.arc(150, 85, 80, (Math.PI * 3 / 4), currentAngle, 0);
            ctx.strokeStyle = "#fff";
            ctx.stroke();
        },
        // 绘制进度条，percentage为百分比[0,100]
        drawProgress(percentage) {
            const _this = this;
            const query = wx.createSelectorQuery().in(this);

            query.select('#curvedProgressBarCanvas')
                .fields({
                    node: true,
                    size: true
                })
                .exec((res) => {
                    if (!res || typeof res[0] !== 'object' || res[0] == null || !res[0].node) {
                        wx.showToast({
                            title: '发生了一些未知的错误，无法正常显示分数',
                            icon: 'none',
                            duration: 2000
                        })
                        return;
                    };
                    const canvas = res[0].node;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        wx.showToast({
                            title: '发生了一些未知的错误，无法正常显示分数',
                            icon: 'none',
                            duration: 2000
                        })
                        return;
                    }
                    // 设置线段样式为圆角
                    ctx.lineCap = "round";
                    // 先获取最终绘制完成对应的角度值
                    let angle = (percentage / 100) * (3 * Math.PI / 2) + (3 * Math.PI / 4);
                    // 当前角度值
                    let currentAngle = Math.PI * 3 / 4;
                    // 帧渲染函数
                    const renderLoop = () => {
                        ctx.clearRect(0, 0, 300, 150);
                        currentAngle += 0.05;
                        if (currentAngle >= angle) {
                            currentAngle = angle;
                            _this.drawBg(ctx);
                            _this.drawProgressByOne(ctx, currentAngle);
                            return;
                        }
                        _this.drawBg(ctx);
                        _this.drawProgressByOne(ctx, currentAngle);
                        canvas.requestAnimationFrame(renderLoop);
                    }
                    canvas.requestAnimationFrame(renderLoop);
                })
        },
        // 上边的方法低版本不兼容
        drawCanvas(percentage) {
            const ctx = wx.createCanvasContext('myCanvas');
            // 先获取当前最高成绩对应的角度值
            const angle = (percentage / 100) * (3 * Math.PI / 2) + (3 * Math.PI / 4);
            let currentAngle = Math.PI * 3 / 4;
            // 设置线段为圆角
            // ctx.lineCap = "round";

            // const timer = setInterval(() => {
            //     currentAngle += 0.05;
            //     if(currentAngle >= angle ){
            //         currentAngle = angle;
            //         clearInterval(timer);
            //     }
            //     // 绘制进度条背景
            //     ctx.beginPath();
            //     ctx.lineWidth = 10;
            //     ctx.arc(150, 85, 80, (Math.PI * 3 / 4), Math.PI / 4, 0);
            //     ctx.strokeStyle = "rgba(0,0,0,0.1)";
            //     ctx.stroke();
            //     // 绘制进度条
            //     ctx.beginPath();
            //     ctx.lineWidth = 6;
            //     ctx.arc(150, 85, 80, (Math.PI * 3 / 4), currentAngle, 0);
            //     ctx.strokeStyle = "#fff";
            //     ctx.stroke();
            //     ctx.draw();
            // }, 1000/60);

        },
    },
    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached: function () {
            this.drawProgress(this.properties.percentage);
            // this.drawCanvas(this.properties.percentage);
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
})