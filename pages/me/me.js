// pages/me/me.js
import { Me } from 'me-model.js';

var me = new Me();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  /**
   * 生命周期函数--监听页面加载完毕
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  _loadData() {
    //获取用户信息
    var that = this;
    me.getUserInfo((data) => {
      // console.log(data);
      this.setData({
        userInfo: data
      });
      me.saveUserInfo(data, (callback) => {
      });
    })
  },

  /*获取用户信息*/
  getUserInfo: function () {
    me.getUserInfo((data) => {
      this.setData({
        userInfo: data
      })
    })
  },

  /*用户授权后，获取用户信息 */
  bindGetUserInfo: function (e) {
    me.getUserInfo((data) => {
      this.setData({
        userInfo: data
      })
    })
  },
})