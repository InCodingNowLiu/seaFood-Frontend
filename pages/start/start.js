//login.js
//获取应用实例
const apiService = require('../../services/apiService.js');
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    openid: '',
  },
  goToIndex:function(){
    wx.switchTab({
      url: '../index/index',
    });
  },
  onLoad:function(){
    var self = this;
    let userInfo = wx.getStorageSync('user')
    if (userInfo) {
      self.goTohomePage();
      return;
    }   
    wx.setNavigationBarTitle({
      title: "海鲜急捷号"
    });
    self.login();
  },
  goTohomePage: function () {
    wx.switchTab({
      url: '../index/index',
    })
  },
  onShow:function(){
    
  },
  onReady: function(){
    var that = this;
    setTimeout(function(){
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(that.data.angle !== angle){
        that.setData({
          angle: angle
        });
      }
    });
  },

  bindGetUserInfo: function (e) {
    let self = this;
    let userinfo = wx.getStorageSync('user');
    if (userinfo) {
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      if (!e.detail.userInfo) {
        return;
      }

      const userInfo = e.detail.userInfo;
      self.setData({
        userInfo: userInfo
      })
      console.log('userInfo', userInfo, self.data.openid);
      userInfo.openid = self.data.openid;
      apiService.registerUser(userInfo, (error, res) => {
        console.log('token', res);
        userInfo.token = res.data.token;
        wx.setStorageSync('user', userInfo);
        self.setData({
          userInfo: userInfo
        })
        setTimeout(() => {
          wx.switchTab({
            url: '../index/index',
          })
        }, 1000);
        
      })
    }
    

  },

  login: function () {
    let self = this;
    wx.login({
      success: function (data) {
        console.log('login data', data);
        apiService.getOpenid(data.code, (err, res) => {
          console.log('getOpenid', res);
          self.setData({
            openid: res.data.openid
          })
        })
      },
      fail: function (err) {
        console.log('wx login fail', err);
        callback(err);
      }
    })
  }


});