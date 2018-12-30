const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const apiService = require('../../services/apiService.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    newGoods: [],
    topics: [],
    // brand: [{
    //   id: 3,
    //   "name": "brand",
    //   "floor_price": 1.0001,
    //   "new_pic_url": "http://img3.imgtn.bdimg.com/it/u=1578502785,433240218&fm=26&gp=0.jpg"
    // },
    //   {
    //     id: 4,
    //     "name": "brand",
    //     "floor_price": 1.0001,
    //     "new_pic_url": "http://img3.imgtn.bdimg.com/it/u=1578502785,433240218&fm=26&gp=0.jpg"
    //   }],
    // floorGoods: [{
    //   id: 7,
    //   name: "floorGoods",
    //   goodsList: [{
    //     list_pic_url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png",
    //     name: "floor goods list pic url",
    //     retail_price: "7.002",
    //   }]
    // }, 
    // {
    //     id: 8,
    //     name: "floorGoods",
    //   goodsList: [{
    //     list_pic_url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png",
    //     name: "floor goods list pic url",
    //     retail_price: "7.002",
    //   },
    //     {
    //       list_pic_url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png",
    //       name: "floor goods list pic url",
    //       retail_price: "7.002",
    //     },
    //     {
    //       list_pic_url: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png",
    //       name: "floor goods list pic url",
    //       retail_price: "7.002",
    //     }]
    //   }],
    // banner: [{
    //   "id": 1,
    //   "link": "https://www.baidu.com",
    //   "image_url": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1598000148,3084276147&fm=58&s=36F6EC36C8A47E92227DC7C502007026",
    //   "name": "name",
    // },
    //   {
    //     "id": 2,
    //     "link": "https://www.baidu.com",
    //     "image_url": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1598000148,3084276147&fm=58&s=36F6EC36C8A47E92227DC7C502007026",
    //     "name": "name",
    //   }],
    channel: []
  },
  onShareAppMessage: function () {
    return {
      title: '海鲜急捷号',
      desc: '为你24小时提供新鲜价廉的海鲜',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let self = this;
    console.log('Come in test');
    apiService.getIndexInfo((error, res)  => {
      self.setData({
        newGoods: res.data.newGoods,
        banner: res.data.banner,
        hotGoods: res.data.hotGoods,
        brand: res.data.brand,
        channel: res.data.channel
      })
    })
  },
  onLoad: function (options) {
    
    this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
