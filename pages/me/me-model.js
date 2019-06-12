import { Base } from '../../utils/base.js';

class Me extends Base {
  constructor() {
    super();
  }

  //获取用户微信信息
  getUserInfo(callback) {

    var that = this;
    wx.login({
      success: function () {

        wx.getUserInfo({

          success: function (res) {
            typeof callback == "function" && callback(res.userInfo);
          },

          fail: function (res) {
            typeof callback == "function" && callback({
              avatarUrl: '../../imgs/icon/user@default.png',
              nickName: ''
            });
          }

        });
      },

    })
  }

  /*保存用户信息*/
  saveUserInfo(data, callback) {
    var params = {
      type: 'post',
      url: 'user',
      data: data,
      sCallback: function (res) {
        callback && callback(res);
      }
    }
    this.request(params);
  }

};

export { Me }