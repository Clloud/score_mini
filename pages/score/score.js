// pages/score/score.js
import { Sheet } from '../../utils/sheet.js';

var sheet = new Sheet();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheetDetail: [],
    inputStatus: true,
    isCompleted: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData(options.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '评分',
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /* 加载评分表详情数据 */
  _loadData: function (id) {
    var sheetDetail = sheet.loadSheetDetailFromCache(id);
    if (sheetDetail) {
      this.setData({
        sheetDetail: sheetDetail
      });
    }
    else {
      sheet.getSheetDetail(id, data => {
        this.setData({
          sheetDetail: data
        });
      });
    }
  },
  onInput: function(event) {
    var id = sheet.getDataSet(event, 'id');

    this.inputStatus = true;
  },
  calculateMark: function(event) {
    var id = sheet.getDataSet(event, 'id');
    console.log(id);
  },
})