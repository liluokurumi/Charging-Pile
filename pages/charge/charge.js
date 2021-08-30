// pages/charge/charge.js
Page({
    data:{
      inputValue: 0
    },
  // 页面加载
    onLoad:function(options){
      wx.setNavigationBarTitle({
        title: '充值'
      })
    },
  // 存储输入的充值金额
    bindInput: function(res){
      this.setData({
        inputValue: res.detail.value
      })  
    },
  // 充值
    charge: function(){
      // 必须输入大于0的数字
      if(parseInt(this.data.inputValue) <= 0 || isNaN(this.data.inputValue)){
        wx.showModal({
          title: "警告",
          content: "咱是不是还得给你钱？！！",
          showCancel: false,
          confirmText: "不不不不"
        })
      }else{
        wx.redirectTo({
          url: '../wallet/wallet',
          success: function(res){
            wx.showToast({
              title: "充值成功",
              icon: "success",
              duration: 2000
            })
          }
        })
      }
    },
  // 页面销毁，更新本地金额，（累加）
    onUnload:function(){
      var Bill = wx.getStorageSync("bill");
      if(Bill.length != 0)
      {
          this.setData({
              inputValue:parseInt(this.data.inputValue) - Bill[0].Money
          })
      }
      wx.getStorage({
        key: 'overage',
        success: (res) => {
          wx.setStorage({
            key: 'overage',
            data: {
              overage: parseInt(this.data.inputValue) + parseInt(res.data.overage)
            }
          })
        },
        // 如果没有本地金额，则设置本地金额
        fail: (res) => {
          wx.setStorage({
            key: 'overage',
            data: {
              overage: parseInt(this.data.inputValue)
            },
          })
        }
      }) 
    }
  })