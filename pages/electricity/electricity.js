// pages/electricity/electricity.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Money:app.globalData.Money,
        isConnected:app.globalData.isConnected,
        voltage:220,
        current:1,
        type: "锂电池"
    },
    chargeClick:function name(params) {
      wx.navigateTo({
          url: '/pages/wallet/wallet',
          success: (result)=>{
              
          },
          fail: ()=>{},
          complete: ()=>{}
      });
    },
    endClick:function name(params) {
        wx.switchTab({
            url: '/pages/home/home',
            success: (result)=>{
                
            },
            fail: ()=>{},
            complete: ()=>{}
        });
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
        var that = this
        that.setData({
            isConnected:app.globalData.isConnected
        })
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
        var that = this
        that.setData({
            Money:app.globalData.Money,
            isConnected:app.globalData.isConnected
        })
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