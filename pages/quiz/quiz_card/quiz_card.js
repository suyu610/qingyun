Page({
  data: {
    cardCur: 0,
    option_subject: [{
        text: '所有科目',
        value: 0
      },
      {
        text: '固体物理',
        value: 1
      },
      {
        text: '信号与系统',
        value: 2
      },
    ],
    option1: [{
        text: '所有笔记',
        value: 0
      },
      {
        text: '自己的',
        value: 1
      },
      {
        text: '别人的',
        value: 2
      },
    ],
    option2: [{
        text: '默认排序',
        value: 'a'
      },
      {
        text: '时间先后',
        value: 'b'
      },
      {
        text: '收藏数排序',
        value: 'c'
      },
    ],
    value1: 0,
    value2: 'a',
    subject_value1: 0,
    swiperList: [{
      id: 0,
      quiz_title: '巴拉巴拉巴拉巴拉',
      options: ['1', '2', '3', '4'],
      note: 'sjdifjisodji',
      image_url: 'https://cdns.qdu.life/logo.png'
    }, {
      id: 1,
    }, {
      id: 2,
    }, {
      id: 3,
    }, {
      id: 4,
    }, {
      id: 5,
    }, {
      id: 6,
    }],
  },
  onLoad() {},
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
})