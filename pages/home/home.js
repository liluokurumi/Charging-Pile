// pages/home/home.js
var init;
const app = getApp();
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
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
        Money:app.globalData.Money,
        markers:[],
        controls:[]
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
         const moneyPaying = app.globalData.Money
         wx.setStorageSync(("Money"), moneyPaying);
         that.setData({
             isConnected: false
         },
         app.globalData.isConnected = false,
         that.stop(),
         app.globalData.Money = 0,
         wx.navigateTo({
           url: '/pages/pay/pay',
           success: (result)=>{
             
           },
           fail: ()=>{},
           complete: ()=>{}
         })
         )
     },
     calculateMoney: function name(params) {
         var that = this
         if(that.data.carType === 0)
         {
             app.globalData.Money = that.data.hour + 1
         }
         else if(that.data.carType === 1)
         {
            app.globalData.Money = (that.data.hour + 1) * 2
         }
         else if(that.data.carType === 2)
         {
            app.globalData.Money = (that.data.hour + 1) * 3
         }
         that.setData({
           Money:app.globalData.Money
         })
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
      var that = this
      wx.getLocation({
        success: (result)=>{
          that.setData({
            markers : [{
              latitude:result.latitude,
              longitude:result.longitude,
              iconPath: "../../icon/_mapSign.png",
              height:30,
              width: 30
            }]
          })
          console.log(that.data.markers[0])
        },
      });
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            controls: [{
              id: 1,
              iconPath: '../../icon/location.png',
              position: {
                left: 20,
                top: 20,
                width: 50,
                height: 50
              },
              clickable: true
            },
            {
              id: 2,
              iconPath: '../../icon/use.png',
              position: {
                left: res.windowWidth/2 - 45,
                top: res.windowHeight - 100,
                width: 90,
                height: 90
              },
              clickable: true
            },
            {
              id: 3,
              iconPath: '../../icon/warn.png',
              position: {
                left: res.windowWidth - 70,
                top: res.windowHeight - 80,
                width: 50,
                height: 50
              },
              clickable: true
            },
            {
              id: 4,
              iconPath: '../../icon/marker.png',
              position: {
                left: res.windowWidth/2 - 12,
                top: res.windowHeight/2 - 130,
                width: 25,
                height: 40
              },
              clickable: true
            },
            {
              id: 5,
              iconPath: '../../icon/avatar.png',
              position: {
                left: res.windowWidth - 68,
                top: res.windowHeight - 155,
                width: 45,
                height: 45
              },
              clickable: true
            }]
          })
          console.log(this.data.controls)
        }
      });
      for(let i = 1; i < 10; i ++){
      wx.request({
        url: 'https://easy-mock.bookset.io/mock/612a04a8e1a95120dc6f485a/myMap/myMap02',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: (res) => {
            that.setData({
              markers: that.data.markers.concat([{
                latitude:res.data.position.lat,
                longitude:res.data.position.lng,
                iconPath: "../../icon/_mapSign.png",
                height:30,
                width: 30
              }])
            })
          },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    }
    },
    movetoPosition: function(){
      this.mapCtx.moveToLocation();
      console.log("work")
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
      // 1.创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("ofoMap");
    this.movetoPosition()

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

    },
    bindcontroltap: function(e){
      // 判断点击的是哪个控件 e.controlId代表控件的id，在页面加载时的第3步设置的id
      switch(e.controlId){
        // 点击定位控件
        case 1: this.movetoPosition();
          break;
        // 点击立即用车，判断当前是否正在计费
        case 2: if(this.timer === "" || this.timer === undefined){
            // 没有在计费就扫码
            wx.scanCode({
              success: (res) => {
                // 正在获取密码通知
                wx.showLoading({
                  title: '正在获取密码',
                  mask: true
                })
                // 请求服务器获取密码和车号
                wx.request({
                  url: 'https://www.easy-mock.com/mock/59098d007a878d73716e966f/ofodata/password',
                  data: {},
                  method: 'GET', 
                  success: function(res){
                    // 请求密码成功隐藏等待框
                    wx.hideLoading();
                    // 携带密码和车号跳转到密码页
                    wx.redirectTo({
                      url: '../scanresult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,
                      success: function(res){
                        wx.showToast({
                          title: '获取密码成功',
                          duration: 1000
                        })
                      }
                    })           
                  }
                })
              }
            })
          // 当前已经在计费就回退到计费页
          }else{
            wx.navigateBack({
              delta: 1
            })
          }  
          break;
        // 点击保障控件，跳转到报障页
        case 3: wx.navigateTo({
            url: '../warn/index'
          });
          break;
        // 点击头像控件，跳转到个人中心
        case 5: wx.navigateTo({
            url: '../my/index'
          });
          break; 
        default: break;
      }
    },
})