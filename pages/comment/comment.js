var app = getApp();
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var apiService = require('../../services/apiService.js');

Page({
  data: {
    comments: [],
    allCommentList: [],
    picCommentList: [],
    typeId: 1,
    valueId: 1,
    showType: 1,
    allCount: 0,
    hasPicCount: 0,
    allPage: 1,
    picPage: 1,
    size: 20,
    all: 1,
    hasPic: 2,
  },

  getCommentCount: function () {
    let that = this;
    // that.setData({
    //   valueId: "5c0f81572b31e30f8c78ded6",
    //   typeId: 1

    // });
    apiService.getComment({ id: that.data.valueId, typeId: that.data.typeId }, function(error, res) {
      console.log(res.data.comms, res.data.pic_comment, res.data);
      that.setData({
        comments: res.data.comments,
        allCommentList: res.data.comments,
        picCommentList: res.data.pic_comment,
        allCount: res.data.comments.length,
        hasPicCount: res.data.pic_comment.length,
      })
    });
  },

  getCommentCountThroughType: function(type) {
    let that = this;
    apiService.getComment({ id: that.data.valueId, typeId: that.data.typeId }, function (error, res) {
      console.log(res.data.comms, res.data.pic_comment, res.data);
      that.setData({
        comments: res.data.comments,
        allCommentList: res.data.comments,
        picCommentList: res.data.pic_comment,
        allCount: res.data.comments.length,
        hasPicCount: res.data.pic_comment.length,
      })
    });
  },

  getCommentList: function(){
    let that = this;
    util.request(api.CommentList, { 
      valueId: that.data.valueId, 
      typeId: that.data.typeId, 
      size: that.data.size,
      page: (that.data.showType == 0 ? that.data.allPage : that.data.picPage),
      showType: that.data.showType 
      }).then(function (res) {
      if (res.errno === 0) {

        if (that.data.showType == 0) {
          that.setData({
            allCommentList: that.data.allCommentList.concat(res.data.data),
            allPage: res.data.currentPage,
            comments: that.data.allCommentList.concat(res.data.data)
          });
        } else {
          that.setData({
            picCommentList: that.data.picCommentList.concat(res.data.data),
            picPage: res.data.currentPage,
            comments: that.data.picCommentList.concat(res.data.data)
          });
        }
      }
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('options', options);
    this.setData({
      typeId: parseInt(options.typeId),
      valueId: options.valueId
    });
    this.getCommentCount();
    // this.getCommentList();
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
  switchTab: function (event) {
    const tag = event.currentTarget.dataset.index;
    console.log(event.currentTarget.dataset.index);
    if (tag === this.data.showType) return;
    this.setData({
      showType: this.data.showType == 1 ? 2 :1
    });
    let that = this;
    switch (that.data.showType) {
      case 1:
        this.setData({
          comments: that.data.picCommentList
        })
        break;
        case 2:
        this.setData({
          comments: that.data.allCommentList
        })
        break;
        default:
        break;
    } 
    // this.getCommentList();
  },

  changeToPicList: function() {
    this.setData({
      comments: this.data.picCommentList
    })
  },


  onReachBottom: function(){
    console.log('onPullDownRefresh');
    if ( this.data.showType == 0) {

      if (this.data.allCount / this.data.size < this.data.allPage) {
        return false;
      }

      this.setData({
        'allPage' : this.data.allPage + 1
      });
    } else {
      if (this.data.hasPicCount / this.data.size < this.data.picPage) {
        return false;
      }

      this.setData({
        'picPage': this.data.picPage + 1
      });
    }



    this.getCommentList();
  }
})