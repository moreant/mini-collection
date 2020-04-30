// pages/add/add.js

const db = wx.cloud.database()
const collections = db.collection('collections')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: ''
  },

  /**
   * 输入事件
   */
  onChange(e) {
    const input = e.detail
    console.log(e);
    this.setData({
      [e.target.dataset.name]: input
    })
    wx.ciac
  },

  /**
   * 表单提交（提交到云数据库）
   */
  submit(e) {
    const {
      title,
      content
    } = this.data
    console.log({
      title,
      content
    });
    collections.add({
      data: {
        title,
        content
      }
    }).then(() => {
      wx.showToast({
        title: '添加成功',
      })
      setTimeout(
        () => {
          wx.navigateBack()
        }, 1000
      )
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