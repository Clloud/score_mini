// pages/home/home.js
import { Sheet } from '../../utils/sheet.js';

var sheet = new Sheet();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheets: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sheets = sheet.loadSheetsFromCache();
    this.setData({
      sheets: sheets
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onSheetTap: function (event) {
    wx.navigateTo({
      url: '../score/score?id=' + sheet.getDataSet(event, 'id'),
    })
  }
})