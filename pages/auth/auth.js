// pages/auth.js
import { Sheet } from '../../utils/sheet.js';

var sheet = new Sheet();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sheet: null,
    inputCode: ''
    // code: [],
    // focus: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    sheet.getSheet(options.id, (data) => {
      that.setData({
        sheet: data
      });
    });

    // sheet.getSheet(options.id, (data) => {
    //   var code = [];
    //   var focus = [];
    //   for (let i = 0; i < data.auth_code.length; i++) {
    //     code.push('');
    //     focus.push(false);
    //   }
    //   focus[0] = true;
    //   that.setData({
    //     sheet: data,
    //     code: code,
    //     focus: focus
    //   });
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '',
    })
  },
  bindInput: function (event) {
    var authCode = this.data.sheet.auth_code;
    var inputCode = event.detail.value;

    if (inputCode == authCode) {
      // 缓存
      sheet.saveSheetToCache(this.data.sheet);
      // 跳转到评分页面
      wx.redirectTo({
        url: '/pages/score/score?id=' + this.data.sheet.id
      });
    } 
    // 授权码错误，自动清空
    else if (inputCode.length >= authCode.length) {
      this.setData({ 
        inputCode: ''
      });
      wx.showModal({
        content: '授权码错误'
      });
    
      return ;
    }
  }
  // bindInput: function(event) {
  //   var authCode = this.data.sheet.auth_code;
  //   var index = sheet.getDataSet(event, 'index');
  //   var code = this.data.code;
  //   var focus = this.data.focus;
  //   var inputCode = '';

  //   // 绑定数据
  //   code[index] = event.detail.value;
  //   this.setData({ code: code });

  //   // 自动移入下一个输入框
  //   console.log('index', index);
  //   console.log('currentCode', code[index]);
  //   if (index < authCode.length && code[index] != '') {
  //     focus[index] = false;
  //     focus[index + 1] = true;
  //     this.setData({ focus: focus });
  //   }

  //   // 拼接用户输入的授权码
  //   for (let i = 0; i < this.data.code.length; i++) {
  //     inputCode += this.data.code[i];
  //   }

  //   // 授权码正确
  //   if (inputCode == authCode) {
  //     // 缓存
  //     sheet.saveSheetToCache(this.data.sheet);
  //     // 跳转到评分页面
  //     wx.redirectTo({
  //       url: '/pages/score/score?id=' + this.data.sheet.id
  //     });
  //   } 
  //   // 授权码错误，自动清空
  //   else if (inputCode.length >= authCode.length) {
  //     for (let i = 0; i < this.data.code.length; i++) {
  //       code[i] = '';
  //       focus[i] = false;
  //     }
  //     focus[0] = true;
  //     this.setData({ 
  //       code: code,
  //       focus: focus
  //     });
  //     return ;
  //   }
  // }
})