var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var apiService = require('../../services/apiService.js');

Page({
  data: {
    navList: [],
    categoryList: [],
    currentCategory: {
    },
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onLoad: function (options) {
    // this.getCatalog();
    console.log('------onLoad-------')
    this.firstLoadCategory();    
  },
  firstLoadCategory: function () {
    let self = this;
    apiService.getCategory(function(err, res) {
      self.setData({
        navList: res.data,
      });
    });
    self.getCurrentCategory(0);
    self.getTotalProduct();
  },

  getCurrentCategory: function(cate) {
    let self = this;
    apiService.itemsCategory({ category: cate }, (err, res) => {
      console.log('------data------', res);
      self.setData({
        currentCategory: res.data,
      });
    });
  },

  getTotalProduct: function() {
    let self = this;
    apiService.totalCategory((err, res) => {
      self.setData({
        goodsCount: res.data,
      })
    })
  },

  getCatalog: function () {
    //CatalogList
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.CatalogList).then(function (res) {
        that.setData({
          navList: res.data.categoryList,
          currentCategory: res.data.currentCategory
        });
        wx.hideLoading();
      });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });

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
  getList: function () {
    var that = this;
    util.request(api.ApiRootUrl + 'api/catalog/' + that.data.currentCategory.cat_id)
      .then(function (res) {
        that.setData({
          categoryList: res.data,
        });
      });
  },
  switchCate: function (event) {
    console.log('switchCate', event);
    var self = this;
    var currentTarget = event.currentTarget;
    if (self.data.currentCategory._id == event.currentTarget.dataset.id) {
      return false;
    }
    console.log('sos', event.currentTarget.dataset.id);
    self.getCurrentCategory(event.currentTarget.dataset.id);
  }
})