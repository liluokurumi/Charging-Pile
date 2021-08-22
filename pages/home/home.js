// pages/home/home.js
var init;
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isConnected: false,
        hour:0,
        minute:0,
        second:0,
        timecount:'00:00:00',
        cost:0,
        flag:1,
        endtime:"",
        carType:0,//0为200瓦以下,1为200-400瓦,2为400-600瓦,3为600瓦以上
        Money:app.globalData.Money
    },
    start:function(){
        clearInterval(init);
        var that=this;
        that.setData({
          hour:0,
          minute:0,
          second:0,
        })
        init=setInterval(function(){
          that.timer()
        },50);
      },
      stop:function(){
        clearInterval(init);
      },
      Reset:function(){
        var that=this;
        clearInterval(init);
        that.setData({
          hour:0,
          minute:0,
          second:0,
          timecount:'00:00:00'
        })
      },
      timer:function(){
        var that = this;
        that.setData({
          second:that.data.second+1
        })
        if(that.data.second >= 60){
          that.setData({
            second:0,
            minute:that.data.minute+1
          })
        }
        if(that.data.minute>=60){
          that.setData({
            minute:0,
            hour:that.data.hour+1
          })
        }
        that.setData({
          timecount:(that.data.hour > 9 ? that.data.hour: ("0" +  that.data.hour))+":"+(that.data.minute > 9 ? that.data.minute: ("0" +  that.data.minute))+":"
          +(that.data.second > 9 ? that.data.second: ("0" +  that.data.second))
        })
        that.calculateMoney()
      },
    scanCode: function () {
        var that = this;
        wx.scanCode({ //扫描API
          onlyFromCamera: true,
          scanType: ['barCode', 'qrCode'],
          success(res) { //扫描成功
            var scanCodeMsg = res.path; //获取二维码的路径信息
            that.setData({
                isConnected: true
            })
            app.globalData.isConnected = true
            that.start()
            console.log(that.data.isConnected)//输出二维码信息
            wx.redirectTo({ //调转到相应页面
              url: '/' + scanCodeMsg,
            });
            wx.showToast({
              title: '成功',
              duration: 1000
            })
          }
        })
     },
     cancleCharge: function(){
         var that = this
         that.setData({
             isConnected: false
         },
         app.globalData.isConnected = false,
         that.stop(),
         app.globalData.Money = 0
         )
     },
     calculateMoney: function name(params) {
         var that = this
         if(that.data.carType === 0)
         {
             console.log("work")
             app.globalData.Money = that.data.hour + 1
             console.log(app.globalData.Money)
         }
         else if(that.data.carType === 1)
         {
            app.globalData.Money = (that.data.hour + 1) * 2
         }
         else if(that.data.carType === 2)
         {
            app.globalData.Money = (that.data.hour + 1) * 3
         }
     },
     addTime: function name(params) {
         var that = this
         that.setData({
             hour: that.data.hour + 1
         })
     },
     changeType:function name(params) {
       var that = this
       if(that.data.carType === 3)
       {
           that.setData({
               carType: 0
           })
       }
       else
       {
           that.setData({
               carType:that.data.carType + 1
           })
       }  
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

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})