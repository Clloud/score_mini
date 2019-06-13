// pages/home/home.js
import { Sheet } from '../../utils/sheet.js';

var sheet = new Sheet();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheets: [],
    scanSheetId: -1
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
    wx.setNavigationBarTitle({
      title: '',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var sheets = sheet.loadSheetsFromCache();
    this.setData({
      sheets: sheets
    });
  },

  /* 跳转到评分页面 */
  onSheetTap: function (event) {
    wx.navigateTo({
      url: '../score/score?id=' + sheet.getDataSet(event, 'id'),
    })
  },

  /* 跳转到搜索页面 */
  toSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  /* 扫描二维码 */
  scan: function() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        that._setScanSheetId(res.result);
        if (that._hasParticipated()) {
          wx.navigateTo({
            url: '/pages/score/score?id=' + that.data.scanSheetId,
          });
        }
        else {
          wx.navigateTo({
            url: '/pages/auth/auth?id=' + that.data.scanSheetId,
          });
        }

      }
    });
  },

  /* 从二维码扫描结果中获取评分表id */
  _setScanSheetId: function(result) {
    var value = result.match(/[0-9]+/);
    this.setData({
      scanSheetId: parseInt(value[0])
    });
  },

  /* 判断是否参与过评分 */
  _hasParticipated: function() {
    var sheets = this.data.sheets;
    for (let i = 0; i < sheets.length; i++) 
      if (sheets[i].id == this.data.scanSheetId) return true;
    return false;
  }
})