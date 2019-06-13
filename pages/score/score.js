// pages/score/score.js
import { Sheet } from '../../utils/sheet.js';

var sheet = new Sheet();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheetDetail: [],
    inputScore: '',       // 评委输入的分数
    inputStatus: false,   // 是否正在输入分数
    isCompleted: false,   // 评分表是否填写完整
    isValidScore: false,   // 分数是否有效

    currentWorkId: 0,     // 当前打分的作品
    currentItemId: 0,     // 当前打分的评分项
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

  /* 点击评分项 */
  onInput: function(event) {
    // 作品编号
    var workId = sheet.getDataSet(event, 'work');
    // 评分项编号
    var itemId = sheet.getDataSet(event, 'item');
    // 当前作品
    var work = this.data.sheetDetail.work[workId];
    // 评分项分数
    var score = work.hasOwnProperty('score') ? work.score[itemId] : '';
    // 分数是否合法
    var isValidScore = (score >= 0 && score <= 100 && score != '') ?
      true : false;

    this.setData({
      currentWorkId: workId,
      currentItemId: itemId,
      inputScore: score,
      inputStatus: true,
      isValidScore: isValidScore
    });
  },

  /* 绑定输入的分数 */
  bindScoreInput: function(event) {
    var score = event.detail.value;
    // 判断分数是否合法
    var isValidScore = (score >= 0 && score <= 100 && score != '') ?
      true : false;

    this.setData({
      inputScore: score,
      isValidScore: isValidScore
    });
  },

  /* 提交评分项分数 */
  submitScore: function(event) {
    var sheetDetail = this.data.sheetDetail;
    var mark;

    if (this.data.isValidScore) {
      // 关闭输入框
      this.setData({
        inputStatus: false
      });
      // 保存分数
      this._saveScore();
      // 计算总分
      this._calculateMark();
      // 存入缓存
      sheet.saveSheetDetailToCache(sheetDetail);
    }
  },

  /* 保存分数 */
  _saveScore: function() {
    var sheetDetail = this.data.sheetDetail;
    var workId = this.data.currentWorkId;
    var itemId = this.data.currentItemId;
    var work = sheetDetail.work[workId];

    // 初始化评分数组
    if (!work.hasOwnProperty('score')) {
      work.score = [];
      for (let i = 0; i < sheetDetail.rule.length; i++) 
        work.score.push('');
    }

    // 存入分数
    work.score[itemId] = this.data.inputScore;
    sheetDetail.work[workId] = work;
    this.setData({ sheetDetail: sheetDetail });
  },

  /* 计算作品的加权总分 */
  _calculateMark: function() {
    var sheetDetail = this.data.sheetDetail;
    var workId = this.data.currentWorkId;
    var work = sheetDetail.work[workId];
    var rule = sheetDetail.rule;
    var mark = 0;

    for (let i = 0; i < rule.length; i++) {
      if (work.score[i] == '') return;
      else mark += work.score[i] * rule[i].ratio;
    }
    sheetDetail.work[workId].mark = mark;
    this.setData({ sheetDetail: sheetDetail });
  },

  /* 展开/折叠评分项 */
  onOutlineTap: function(event) {
  },

  /* 取消输入分数 */
  onCancelTap: function() {
    // 关闭输入框
    this.setData({
      inputStatus: false
    });
  }
})