// components/timer/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    start: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: 30 * 60,
    temp: null
  },
  observers: {
    'start': function (start) {
      if (!start) return;
      clearInterval(this.data.temp);
      this.data.temp = setInterval(_ => {
        this.setData({
          date: this.data.date - 1
        })
        if (this.data.date === 0) {
          clearInterval(this.data.temp);
          this.triggerEvent('onover')
        }
      }, 1000)
    }
  },
  lifetimes:{
    detached(){
      clearInterval(this.data.temp);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})