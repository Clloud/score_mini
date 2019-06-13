import { Base } from 'base.js';
import { Config } from 'config.js';

class Sheet extends Base {
  constructor() {
    super();
  }

  /* 获取评分表详情 */
  getSheetDetail(id, callback) {
    var that = this;
    var param = {
      url: 'scoresheet/detail/' + id,
      sCallback: function (res) {
        callback && callback(res);
        // 缓存
        that.saveSheetDetailToCache(res);
      }
    };
    this.request(param);
  }

  /* 获取评分表概要 */
  getSheet(id, callback) {
    var that = this;
    var param = {
      url: 'scoresheet/' + id,
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(param);
  }

  /* 将评分表概要存入缓存 */
  saveSheetToCache(sheet) {
    var sheets = this.loadSheetsFromCache();

    // 判断是否重复
    for (let i = 0; i < sheets.length; i++) {
      if (sheets[i].id == sheet.id) return sheets;
    }

    sheet.status = 0;
    sheets.push(sheet);
    wx.setStorageSync('sheets', sheets);
  }

  /* 从缓存中加载评分表概要 */
  loadSheetsFromCache() {
   return wx.getStorageSync('sheets') || [];
  }

  /* 将评分表详情存入缓存 */
  saveSheetDetailToCache(sheetDetail) {    
    var sheetDetails = wx.getStorageSync('sheetDetails') || [];    
    var index = this._getSheetDetailIndexById(sheetDetail.id);

    if (index != -1) sheetDetails[index] = sheetDetail;
    else sheetDetails.push(sheetDetail);

    wx.setStorageSync('sheetDetails', sheetDetails);
  }

  /* 从缓存中加载评分表详情 */
  loadSheetDetailFromCache(id) {
    var sheetDetails = wx.getStorageSync('sheetDetails') || [];
    var index = this._getSheetDetailIndexById(id);

    return index != -1 ? sheetDetails[index] : null;
  }

  /* 获取评分表详情在缓存中的索引 */
  _getSheetDetailIndexById(id) {
    var sheetDetails = wx.getStorageSync('sheetDetails') || [];

    for (let i = 0; i < sheetDetails.length; i++) {
      if (sheetDetails[i].id == id) return i;
    }
    return -1;
  }

}

export { Sheet }