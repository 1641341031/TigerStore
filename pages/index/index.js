//引入 用来发送请求的方法
import {request} from "../../request/request.js";

Page({
  data: {
    //轮播图数组
    swiperList:[],
    // 导航 数组
    catesList: [],
    //楼层 数组
    floorList: []
  },
  //页面开始加载 就会触发
  onLoad: function(option){
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取 轮播图数据
  getSwiperList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result => {
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  // 获取 分类导航数据
  getCateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result => {
      this.setData({
        catesList:result.data.message
      })
    })
  },
  // 获取 楼层数据
  getFloorList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result => {
      this.setData({
        floorList:result.data.message
      })
    })
  }
});