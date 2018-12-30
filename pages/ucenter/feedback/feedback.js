var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const apiService = require('../../../services/apiService.js');
const wxService = require('../../../services/wxService.js');

var app = getApp();

Page({
  data: {
    array: ['请选择反馈类型', '商品相关', '物流状况', '客户服务', '优惠活动', '功能异常', '产品建议', '其他'],
    index: 0,
    content: '',
    phoneNumber: '',
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  submitFeedback: function () {
    wxService.showToast('反馈中...', 'loading');
    const data = {
      description: this.data.content,
      feedType: this.data.index,
      phoneNumber: this.data.phoneNumber,
    }
    apiService.feedback(data, (err, res) => {
      console.log(res);
      wxService.showToast('提交成功', 'success');
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    })
  },

  bindTextAreaBlur: function (e) {
    this.setData({
      content: e.detail.value,
    })
  },

  bindPhoneNumberBlur: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  }
})