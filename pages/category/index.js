//引入 用来发送请求的方法
import {request} from "../../request/request.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMenuList: [],
    //右侧的商品数据
    rightContent: [],
    // 接口返回的数据
    Cates: [],
    //被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCates();

    // 获取本地存储中的数据
   const Cates = wx.getStorageSync("cates"); 
    if(!Cates){
      // 不存在就发送请求获取数据
      this.getCates();
    }else{
      // 有旧的数据 判断时间是否过期
      if(Date.now() - Cates.time > 1000*10){
        //过期就重新发送请求
        this.getCates();
      }else{
        // 没过期可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  async getCates() {
    // request({
    //   url: "/categories"
    // })
    // .then(res=>{
    //   this.Cates=res.data.message;

    //   // 把接口的数据存入到本地存储中
    //   wx.setStorageSync("cates", {time:Date.now(), data: this.Cates});

    //   //构造左侧的大菜单数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   //构造右侧的商品数据
    //   let rightContent=this.Cates[0].children;

    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    const res = await request({url: "/categories"});
      this.Cates=res;

      // 把接口的数据存入到本地存储中
      wx.setStorageSync("cates", {time:Date.now(), data: this.Cates});

      //构造左侧的大菜单数据
      let leftMenuList=this.Cates.map(v=>v.cat_name);
      //构造右侧的商品数据
      let rightContent=this.Cates[0].children;

      this.setData({
        leftMenuList,
        rightContent
      })

  },
  // 左侧菜单栏的点击事件 右侧商品数据内容跟随响应
  handleItemTap(e){
    const {index} = e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      //重新设置 右侧内容的scroll-view标签的顶部距离
      scrollTop: 0
    })
  }
})