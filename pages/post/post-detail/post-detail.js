var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({
  data: {
    isPlayingMusic: false,
  },
  onLoad: function (options) {

    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    //如果在onload方法中，不是异步的去执行一个数据绑定，则不需要使用this.setData方法，只需要对this.data赋值即可实现数据绑定（涉及数据绑定建议用提示this.setData）
    //this.data.postData = postData;
    this.setData({
      postData: postData
    })

    //文章收藏操作开始
    //var postsCollected = {
    //1:"true",
    // 2:"false",
    // 3:"true"
    //}

    var postsCollected = wx.getStorageSync('posts_Collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      } else {
        postsCollected[postId] = false;
        wx.setStorageSync('posts_Collected', postsCollected);
        this.setData({
          collected: false
        })
      }
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_Collected', postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },

  setMusicMonitor: function () {
    //监听音乐播放以及暂停
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },

  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_Collected');
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },

  //showModal是有提示框弹出的，需要用户确认
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: "收藏",
      content: postCollected ? "收藏该文章？" : "取消收藏该文章",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          //更新文章是否的缓存值
          wx.setStorageSync('posts_Collected', postsCollected);
          //更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  //showToast是没有提示框弹出的，不需要用户确认
  showToast: function (postsCollected, postCollected) {
    //更新文章是否的缓存值
    wx.setStorageSync('posts_Collected', postsCollected);
    //更新数据绑定变量，从而实现切换图片
    console.log(postCollected)
    this.setData({
      collected: postCollected,

    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //res.cancel  用户是不是点击了取消按钮
        //res.tapIndex  数组元素的序号，从0开始
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能"
        })
      }
    })
  },

  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })

    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
    }

  }
})