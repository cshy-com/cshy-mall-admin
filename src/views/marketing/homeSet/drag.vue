<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-01-23 10:07:49
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-06-12 15:55:13
 * @FilePath: \cshy-admin\src\views\marketing\homeSet\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="divBox">
    <el-card class="box-card">
      <template>
        <div class="home-row">
          <el-row>
            <el-col :span="10">
              <div class="col-5 m-r-30">
                <div class="phone">
                  <div class="serch-wrapper">
                    <div class="serch-box flex">
                      <div class="logo">
                        <img :src="logoUrl" mode="" />
                      </div>
                      <a
                        url="/pages/goods_search/index"
                        class="input"
                        hover-class="none"
                        >请输入关键字
                      </a>
                      <div class="search-text">搜索</div>
                    </div>
                  </div>
                  <draggable
                    v-model="list1"
                    chosen-class="chosen"
                    force-fallback="true"
                    group="people"
                    animation="1000"
                    @start="onStart"
                    @end="onEnd"
                    ><transition-group class="list-group">
                      <div
                        class="list-group-item"
                        v-for="(item, index) in list1"
                        :key="item.id"
                        @click.stop="tap(index, item)"
                        :class="{
                          'list-group-item-border': currentIndex == index,
                          'item-disable': !item.isEnabled,
                        }"
                      >
                    
                        <components
                          :is="item.type"
                          :eleValue="item"
                        ></components></div
                    ></transition-group>
                  </draggable>
                </div>

                <div>
                  <el-button type="primary" @click="saveDrag"
                    >保存配置</el-button
                  >
                </div>
              </div></el-col
            >
            <el-col :span="14">
              <div class="col-5 right-diy" v-if="diyInfo">
                <div>
                  是否启用:
                  <el-switch
                    v-model="diyInfo.isEnabled"
                    :active-value="true"
                    :inactive-value="false"
                  >
                  </el-switch>
                </div>
                <template v-if="diyInfo.childConfigList">

                
                <div
                  v-for="(item, diyInfoIndex) in diyInfo.childConfigList"
                  :key="item.id"
                  class="right-diy-row"
                >
                  <div class="right-diy-row-img">
                    <div
                      class="upLoadPicBox"
                      @click="modalPicTap(diyInfoIndex, 0, '1')"
                    >
                      <div v-if="item.img" class="pictrue">
                        <img :src="item.img" />
                      </div>
                      <div v-else class="upLoad">
                        <i class="el-icon-camera cameraIconfont" />
                      </div>
                    </div>
                  </div>
                  <div class="right-diy-row-box">
                    <div class="right-diy-row-grid">
                      <span class="label">标题</span>

                      <el-input
                        :disabled="!diyInfo.isEnabled"
                        v-model="item.title"
                        placeholder="请输入内容"
                      ></el-input>
                    </div>
                    <div class="right-diy-row-grid">
                      <span class="label">链接</span>

                      <el-input
                        v-model="item.link"
                        :disabled="!diyInfo.isEnabled"
                        placeholder="请输入内容"
                      ></el-input>
                    </div>
                    <div class="right-diy-row-grid">
                      <span class="label">提示</span>

                      <el-input
                        v-model="item.tip"
                        :disabled="!diyInfo.isEnabled"
                        placeholder="请输入内容"
                      ></el-input>
                    </div>
                  </div>
                  <i
                    class="el-icon-circle-close"
                    @click="delDiyInfo(diyInfoIndex)"
                  ></i>
                </div>
                <el-button type="primary" @click="addDiyRow"
                  >添加数据</el-button
                >
              </template>
              </div></el-col
            ></el-row
          >
        </div>
      </template>
    </el-card>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import swipper from "./components/swipper";
import active from "./components/active";
import cate from "./components/cate";
import banner from "./components/banner";
import adver from "./components/adver";
import price from "./components/price";

 
import { homeConfigList, sysHomeConfigAdd,sysHomeConfigUpdate  } from "@/api/store";
export default {
  name: "clone",
  display: "Clone",
  order: 2,
  components: {
    draggable,
    banner,
    cate,
    active,
    swipper,adver,price
  },
  data() {
    return {
      logoUrl: require("@/assets/imgs/img_home_yz.png"),
      // 分类数据
      categoryList: {
        type: "cate",
        isEnabled: 1,
        title: "",
        childConfigList: [
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
        ],
      },
      // 秒杀数据
      seckillList: { type: "seckill", isEnabled: 1, title: "", link: "" },
      // 轮播
      bannerSwipper: {
        type: "swipper",
        isEnabled: 1,
        title: "",
        childConfigList: [
          {
            title: "",
            tip: "",
            link: "",
            img: "",
          },
        ],
      },
      AdvertList: { type: "advert", isEnabled: 1, title: "", link: "" },
      // bakImg 备用图片
      // bakLink 备用跳转链接
      // childConfigList 子集
      // desc 描述
      // icon 图标
      // img 图片
      // infoText 提示文字
      // isEnabled 是否启用 1 启用 0 未启用
      // link 跳转链接
      // linkUrl 子级link
      // parentId 父级id
      // text 文字
      // tip 提示
      // title 标题
      // type 类型分类
      drag: false,
      myArray: [
        { people: "cn", id: 1, name: "www.itxst.com" },
        { people: "cn", id: 2, name: "www.baidu.com" },
        { people: "cn", id: 3, name: "www.taobao.com" },
        { people: "us", id: 4, name: "www.google.com" },
      ],
      list1: [
        {
          name: "category",
          desc: "分类",
          id: 1,
          type: "cate",
          people: "cn",
          background: "",
          isEnabled: 0,
          childConfigList: [
            {
              icon: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
              title: "特价专区",
              linkUrl: "/pages/activity/special_offer/index",
              componentId: "515",
              tip: "金秋好礼",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/file/crmebimage/public/maintain/2023/11/01/241a0a60c5914130acd1d8a5e41f0c18qtvz5y4rg1.png",
              title: "每日新品",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
          ],
        },
        {
          name: "swipper",
          desc: "广告位快捷跳转",
          id: 2,
          people: "cn",
          type: "swipper",
          childConfigList: [
            {
              icon: "https://cshy.store/front/static/img/active-icon1.c9ea9632.png",
              title: "金秋蟹礼",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/front/static/img/active-icon2.0182d4d6.png",
              title: "礼品卡券",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/front/static/img/active-icon3.edf3a6cf.png",
              title: "城市特色",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/front/static/img/active-icon4.97a7b6e8.png",
              title: "新品推荐",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/front/static/img/active-icon5.ffbb32bd.png",
              title: "热销榜单",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/front/static/img/active-icon6.e1ccde6e.png",
              title: "甜蜜蛋糕",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
            {
              icon: "https://cshy.store/front/static/img/active-icon7.7774ab12.png",
              title: "鲜花精选",
              linkUrl: "/pages/activity/classified_products/index?cid=515",
              componentId: "515",
            },
          ],
        },
        {
          name: "activeGoods",
          desc: "好货集结",
          id: 3,
          people: "us",
          type: "active",
          background: "https://cshy.store/front/static/img/haohuo.fbdf6237.png",

          childConfigList: [
            {
              pic: "https://cshy.store/file/crmebimage/public/content/2023/11/06/e9f5d0f0924e40ed90170a203f218eder2mbfz3e5j.jpg",
              storeName: "梅森马吉拉迷你香薰蜡烛礼盒香氛蜡烛礼物 ",
              price: "99",
              otPrice: "198",
            },
            {
              pic: "https://cshy.store/file/crmebimage/public/content/2023/11/06/e9f5d0f0924e40ed90170a203f218eder2mbfz3e5j.jpg",
              storeName: "梅森马吉拉迷你香薰蜡烛礼盒香氛蜡烛礼物 ",
              price: "99",
              otPrice: "198",
            },
            {
              pic: "https://cshy.store/file/crmebimage/public/content/2023/11/06/e9f5d0f0924e40ed90170a203f218eder2mbfz3e5j.jpg",
              storeName: "梅森马吉拉迷你香薰蜡烛礼盒香氛蜡烛礼物 ",
              price: "99",
              otPrice: "198",
            },
          ],
        },
      ],
      diyInfo: {},
      list2: [],
      activeNames: [],
      count: 0,
      currentIndex: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addDiyRow() {
      if (
        ["cate"].includes(this.diyInfo.type) &&
        this.diyInfo.childConfigList.length >= 10
      ) {
        return this.$message.error("最多10条数据");
      }
      if (
        ["active"].includes(this.diyInfo.type) &&
        this.diyInfo.childConfigList.length >= 3
      ) {
        return this.$message.error("最多3条数据");
      }
      this.diyInfo.childConfigList.push({
        title: "",
        tip: "",
        link: "",
        img: "",
      });
    },
    delDiyInfo(index) {
      if (
        ["active", "swipper"].includes(this.diyInfo.type) &&
        this.diyInfo.childConfigList.length <= 3
      ) {
        return this.$message.error("至少3条数据");
      }
      if (
        ["cate"].includes(this.diyInfo.type) &&
        this.diyInfo.childConfigList.length <= 5
      ) {
        return this.$message.error("至少5条数据");
      }
      this.$confirm("确实删除当前数据", "提示").then(() => {
        this.diyInfo.childConfigList.splice(index, 1);
      });
    },
    onStart() {
      this.drag = true;
    },
    onEnd() {
      this.drag = false;
    },
    async getList() {
      let res = await homeConfigList({});
      

      this.list1=res
    },
    modalPicTap(diyInfoIndex, tit, num, i) {
      if (this.diyInfo.isEnabled == 0) {
        return;
      }
      const _this = this;
      const attr = [];
      this.$modalUpload(
        function (img) {
          _this.diyInfo.childConfigList[diyInfoIndex].img = img[0].sattDir;
          return;
        },
        tit,
        "store"
      );
    },
    tap(index, item) {
      
      this.currentIndex = index;
      this.diyInfo = item;
      //
    },

    log() {},
    handleChange: function () {},
    deleteItem: function (index) {
      this.list2.splice(index, 1);
    },
    async saveDrag() {
      // let params = [
      //   {
      //     type: "cate",
      //     isEnabled: 1,
      //     title: "分类",
      //     childConfigList: [
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "特价专区",
      //         tip: "每日9.9",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "家用电器",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "运动",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "纺织家居",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       }, {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "饮品零食",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "生鲜水果",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "美妆护肤",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "烘焙蛋糕",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "母婴用品",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //       {
      //         type: "cate",
      //         isEnabled: 1,
      //         title: "日用百货",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },
      //     ],
      //   },
      //   {
      //     type: "swipper",
      //     isEnabled: 1,
      //     title: "轮播",
      //     childConfigList:[ {
      //         type: "swipper",
      //         isEnabled: 1,
      //         title: "",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },{
      //         type: "swipper",
      //         isEnabled: 1,
      //         title: "",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },{
      //         type: "swipper",
      //         isEnabled: 1,
      //         title: "",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       },{
      //         type: "swipper",
      //         isEnabled: 1,
      //         title: "",
      //         tip: "",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
      //       }]},{
      //     type: "active",
      //     isEnabled: 1,
      //     title: "秒杀",
      //     childConfigList:[{
      //       type: "active",
      //         isEnabled: 1,
      //         title: "398.00元",
      //         tip: "598.00元",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
           
      //     },{
      //       type: "active",
      //         isEnabled: 1,
      //         title: "398.00元",
      //         tip: "598.00元",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
           
      //     },{
      //       type: "active",
      //         isEnabled: 1,
      //         title: "398.00元",
      //         tip: "598.00元",
      //         link: "/pages/activity/special_offer/index",
      //         img: "https://cshy.store/front/static/img/icon1.6935ce1e.png",
           
      //     }]}
      // ];
     let list2=[
      {
      type: "adver",
      isEnabled: 1,
    childConfigList:[{
      link: "/pages/goods/goods_list/active_index?id=35&title=端午粽享",
     img: "https://cshy.store/file/crmebimage/public/maintain/2024/04/24/51356be983914225be8a2efaf4d48d28thyu0u3ps0.png",
   
     }]
    },
     {
      type: "banner",
      isEnabled: 1,
      childConfigList:[{
        link: "",
     img: "https://cshy.store/file/crmebimage/public/maintain/2024/06/07/3e53db968c714b7bae02b24663d7600dw6ds7yhcvg.jpg",
  
      }]
     },
    {
      type: "price",
        isEnabled: 1,
    }
    ]

    this.list1=this.list1
      let res=await sysHomeConfigUpdate(this.list1)
      this.$message.success("更新成功");
      this.getList()
    },
  },
};
</script>

<style scoped lang="scss">
.phone {
  background: #ededed;
  border-radius: 20px;
  padding: 10px 0;
  width: 375px;
}
.serch-wrapper {
  align-items: center;

  // padding-bottom: 22px;
  margin: 0 15px;
  .serch-box {
    border: 1.5px solid #ff879f;
    background: #ffffff;
    border-radius: 16.5px;
    width: 345px;
    height: 33px;
    position: relative;
    align-items: center;

    display: flex;
  }
  .logo {
    margin-top: 5px;
    margin-left: 12px;
    margin-right: 10px;
  }

  img {
    width: 28.5px;
    height: 23px;
  }

  .input {
    display: flex;
    align-items: center;
    width: 273px;
    height: 33px;
    padding: 0 0 0 15px;
    padding-left: 0;
    color: #9a9a9a;
    font-size: 14px;

    .iconfont {
      margin-right: 10px;
      font-size: 13px;
      color: #666666;
    }
  }
  .search-text {
    width: 54px;
    height: 31px;
    background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);
    border-radius: 15px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 30px;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0rpx;
  }
}
.home-row {
  width: 100%;
  .m-r-30 {
    margin-right: 30px;
  }
  .right-diy {
    height: 700px;
    overflow-y: scroll;
    .right-diy-row {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 20px;
      border: 1px dashed #ddd;
      padding: 10px;
      position: relative;
      .el-icon-circle-close {
        position: absolute;
        right: -10px;
        top: -11px;
        font-size: 21px;
        color: #c8c8c9;
        cursor: pointer;
      }
      .right-diy-row-img {
      }
      .right-diy-row-box {
        width: 100%;
      }
      .right-diy-row-grid {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 10px;
        .label {
          width: 50px;
          display: inline-block;
        }
      }
    }
  }
}
.list-group {
  cursor: pointer;
  border: 1px solid #666666;
  border-radius: 30px;
  width: 375px;
  height: 667px;
  overflow-y: scroll;
  overflow-x: hidden;
  .list-group-item {
    border: 1px dashed transparent;
  }
  .list-group-item-border {
    border: 1px dashed #666;
  }
  .item-disable {
    background: #cdcdcd;
    opacity: 0.5;
  }
}
.m-b-30 {
  margin-bottom: 30px;
}

div::-webkit-scrollbar {
  width: 1px;
}

div::-webkit-scrollbar-track {
  background-color: transparent;
}

div::-webkit-scrollbar-thumb {
  background-color: transparent;
}
</style>
