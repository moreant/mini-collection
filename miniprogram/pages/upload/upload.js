// pages/upload/upload.js

const db = wx.cloud.database()
const collections = db.collection('collections')
const _ = db.command


Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true
  },

  upload() {
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles
        console.log(tempFilePaths[0]);
        const id = this.data.collection._id
        wx.showLoading({ title: '文件上传中', })
        wx.cloud.uploadFile({
          cloudPath: id + '/upload/' + tempFilePaths[0].name,
          filePath: tempFilePaths[0].path, // 文件路径
        }).then(res => {
          collections.doc(id).update({
            data: {
              files: _.push({
                name: tempFilePaths[0].name,
                fileID: res.fileID
              })
            }
          }).then(() => {
            wx.showToast({ title: '上传成功', })
          })
        }).catch(error => {
          // handle error
        })
      }
    })
  },


  donwload() {
    const { files, _id } = this.data.collection
    wx.cloud.callFunction({
      name: 'createZip',
      data: {
        files,
        _id
      }
    }).then(res => {
      console.log(res);
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    console.log(id);
    collections.doc(id).get().then(res => {
      this.setData({ collection: res.data, loading: false })
    })

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