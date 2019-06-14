// pages/search/search.js
import { Sheet } from '../../utils/sheet.js';

var sheet = new Sheet();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheets: [],
    keyword: '',
    noResult: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '搜索',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  bindKeywordInput: function(event) {
    var sheets = [];
    var keyword = event.detail.value;
    var that = this;

    this.setData({
      keyword: keyword,
      sheets: sheets,
      noResult: false
    });

    keyword = parseInt(keyword);
    if (keyword >= 1) {
      // 显示loading提示框
      wx.showLoading({
        title: '加载中',
      })
      sheet.getSheet(keyword, (data) => {
        // 关闭loading提示框
        setTimeout(function () {
          wx.hideLoading()
        }, 200);
        // 查询到结果
        if (data) {
          sheets.push(data);
          that.setData({
            sheets: sheets,
            noResult: false
          });
        }
        else {
          that.setData({ noResult: true });
        }

      });
    }
  },
  /* 跳转到评分页面 */
  onSheetTap: function (event) {
    wx.redirectTo({
      url: '../auth/auth?id=' + sheet.getDataSet(event, 'id'),
    });
  },
})