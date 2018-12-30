var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
const apiService = require('../../../services/apiService.js');
Page({
  data: {
    addressList: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getAddressList();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.getAddressList();
  },
  getAddressList (){

    let that = this;
    apiService.getAddressList((err, res) => {
      console.log('address list', res.data);
      if (res.data) {
        that.setData({
          addressList: res.data
        });
      }
    });
  },
  addressAddOrUpdate (event) {
    console.log(event)
    // wx.navigateTo({
    //   url: '/pages/ucenter/addressAdd/addressAdd?id=' + event.currentTarget.dataset.addressId
    // })

    wx.chooseAddress({
      success: function(res) {
        console.log(res);
        wx.navigateTo({
          url: '/pages/ucenter/addressAdd/addressAdd?des=' + JSON.stringify(res)
    })
      }
    })
  },
  deleteAddress(event){
    console.log(event.target)
    let that = this;
    wx.showModal({
      title: '',
      content: '确定要删除地址？',
      success: function (res) {
        if (res.confirm) {
          let addressId = event.target.dataset.addressId;
          apiService.deleteAddress({addressId}, (err, res) => {
            if (res.data) {
              that.getAddressList();
            }
          })

          console.log('用户点击确定')
        }
      }
    })
    return false;
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})