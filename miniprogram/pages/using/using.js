

const devicesId = "561894778" // 填写在OneNet上获得的devicesId 形式就是一串数字 例子:9939133
const api_key = "FuM9eOjE5VZo=LTPjsqtHI7Osvk=" // 填写在OneNet上的 api-key 例子: VeFI0HZ44Qn5dZO14AuLbWSlSlI=

Page({
  data: {
    temperature:"0",
    water:"0"
  },

  getdata:function () {
    wx.showLoading({
      title: "正在获取"
    })
    console.log(`your deviceId: ${devicesId}, apiKey: ${api_key}`)
    var _this = this;
    wx.request({
      url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Temperature,Water&limit=1`,/**设置API地址 */
      header: {
        'content-type': 'application/json',
        'api-key': api_key
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          temperature: res.data.data.datastreams[1].datapoints[0].value,
          water: res.data.data.datastreams[0].datapoints[0].value
        });
        wx.hideLoading();
      },
      fail: function () {
        wx.showToast({
          title: '与服务器通信失败',
          icon: 'fail',
          duration: 1000
        })
        wx.hideLoading();
      }
    })
  },

 

onLoad: function () {
  console.log(`your deviceId: ${devicesId}, apiKey: ${api_key}`)
  var _this = this;
  wx.request({
    url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Temperature,Water&limit=1`,/**设置API地址 */
    header: {
      'content-type': 'application/json',
      'api-key': api_key
    },
    success: function (res) {
      console.log(res.data);
      _this.setData({
        temperature: res.data.data.datastreams[1].datapoints[0].value,
        water: res.data.data.datastreams[0].datapoints[0].value
      });
    },
    fail: function () {
      wx.showToast({
        title: '与服务器通信失败',
        icon: 'fail',
        duration: 1000
      })
    }
  })
}
})