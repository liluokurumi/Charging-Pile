// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Money:0
    },
    paying:function name(params) {
      var that = this;
      var  Overage = wx.getStorageSync("overage").overage;
      console.log(Overage)
      if(Overage >= that.data.Money)
      {
          wx.setStorageSync("overage", Overage - that.data.Money);
          wx.showToast({
            title: "支付成功",
            icon: "success",
            duration: 2000
          }, )
        setTimeout(function () {
            wx.switchTab({
                url: '/pages/home/home',
            })
            }, 1000)              
      }
      else{
        var newBill = [{
            Money: that.data.Money
        }]
        console.log("work")
        var Bill = wx.getStorageSync('bill')
        Bill = Bill.concat(newBill)
        wx.setStorageSync('bill', Bill);
        wx.showModal({
            title: "",
            content: "余额不足,请立即充值!",
            showCancle:false,
            confirmText: "前往充值",
            confirmColor: "#000",
            success: (res) => {
              if(res.confirm){
                wx.redirectTo({
                    url: '/pages/charge/charge',
                    success: (result)=>{
                        
                    },
                    fail: ()=>{},
                    complete: ()=>{}
                });
              }
            }
          })
      }
    },
    changePage:function name(params) {
        wx.switchTab({
            url: '/pages/home/home',
        },)
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
        const money=wx.getStorageSync("Money");
        this.setData({Money: money})
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