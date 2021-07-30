import {request} from "../../request/request.js";
import regeneratorRuntime from "../../lib/runtime/runtime";


Page({
  data: {
    tabs: [
      {
        id:0,
        value: "综合",
        isActive: true
      },
      {
        id:1,
        value: "销量",
        isActive: false
      },
      {
        id:2,
        value: "价格",
        isActive: false
      }
    ],
    goodList: []
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum:1,
    pagesize:10
  },

  // 获取商品列表数据
 async getGoodsList(){
   const res = await request({url:"/goods/search", data:this.QueryParams});
   this.setData({
    goodList: res.goods
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const {index} = e.detail;
    // 修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  }
})