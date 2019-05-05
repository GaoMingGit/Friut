// pages/post/post.js
var amapFile = require("../../libs/amap-wx.js");
var postsData = require('../../data/posts-data.js')
Page({
  data: {
    currentTab:0,
    tabName:[
      '水果简介',
      '果农故事',
      '产业文化'
    ],
    markers: [],
    latitude: '21.67',
    longitude: '110.92',
  },
  makertap: function(e) {
    var id = e.markerId;
    var that = this;
  },
  onLoad: function(options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: 'f11b3ee26a525d136051bccb0348548f'
    });
    that.setData({
      posts_key: postsData.postList
    });
  },
  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  onSwiperTap: function(event) {
    //target和currentTarget
    //target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    //target这里指的是image，currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})