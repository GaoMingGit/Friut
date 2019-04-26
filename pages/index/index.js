// pages/index/index.js
//定义全局变量imgArray
const app = getApp()
Page({

        /**
         * 页面的初始数据
         */
        data: {
                imgUrls: [{
                        imgsrc: 'images/lizhi.jpg',
                        url: '../login/index'
                },
                {
                        imgsrc: 'images/chengzi.jpg',
                        url: ''
                },
                {
                        imgsrc: 'images/mangguo.jpg',
                        url: ''
                },
                {
                        imgsrc: 'images/lizi.jpg',
                        url: ''
                },
                ],
                content: "中医讲究阴阳调和，水果也有寒热之分，如果吃不对，就容易引发上火、发烧、牙痛等现象。所以，夏季吃水果要根据体质，吃对水果属性。",
                currentTabsIndex: 0
        },
        bindchange(e) {
                this.setData({
                        swiperIndex: e.detail.current
                })
        },
        onTabsItemTap: function (e) {
                this.setData({
                        currentTabsIndex: e.currentTarget.dataset.index
                })
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