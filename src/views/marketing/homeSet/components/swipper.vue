<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-02-21 10:04:02
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-03-19 11:48:20
 * @FilePath: \cshy-admin\src\divs\marketing\homeSet\components\quickLinks.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>

  <div class="swipper-active" v-if="eleValue&&eleValue.childConfigList&&eleValue.childConfigList.length>0">
    <div class="swipper-box">
      <el-carousel
        :autoplay="false"
        height="167.5"
        style="height: 167.5px; height: 210px"
        indicator-color="#FFFFFF"
        arrow="never"
      >
        <el-carousel-item v-for="(item,index) in eleValue.childConfigList.slice(0, eleValue.childConfigList.length-2)" :key="index">
          <img class="swipe-img" :src="item.img" mode="aspectFill" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="swipper-right">
      <img v-for="item in eleValue.childConfigList.slice( eleValue.childConfigList.length-2)"
        class="swipper-right-img"
        :src="item.img"
        mode="aspectFill"
      />

    
    </div>
  </div>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    eleValue: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      swipperList: [
        {
          img: "https://www.bankservice.shop/file/swipper1.png",
          url: "/pages/goods_list/active_index?title=新品推荐&feature=3",
        },
        {
          img: "https://www.bankservice.shop/file/swipper2.png",
          url: "/pages/activity/boutique/index",
        },
        {
          img: "https://www.bankservice.shop/file/swipper3.png",
          url: "/pages/activity/city/index",
        },
        {
          img: "https://www.bankservice.shop/file/swipper4.png",
          url: "/pages/activity/cake/index",
        },
        {
          img: "https://www.bankservice.shop/file/swipper5.png",
          url: "/pages/activity/flower/index",
        },
      ],
    };
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
};
</script>
<style scoped lang="scss">
::v-deep .el-carousel__container {
  width: 167px;
  height: 210px;
}
::v-deep .el-carousel__arrow--right,
.el-carousel__arrow--left {
  display: none;
}
::v-deep .el-carousel__button {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}
::v-deep .el-carousel__indicator.is-active button {
  width: 6px;
  height: 6px;
}
.swipper-active {
  display: flex;
  padding: 15px;
  .swipper-box {
    width: 167.5px;
    height: 210px;
    // /deep/ .van-swipe__indicator {
    //   width:4px;
    //   height: 4px;
    // }
    // /deep/ .van-swipe__indicator--active {
    //   width: 5px;
    //   height: 5px;
    // }
    .swipe-img {
      width: 167.5px;
      height: 210px;
    }
  }
  .swipper-right {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .swipper-right-img {
      width: 167.5px;
      height: 100px;
    }
    .swipper-right-img:first-child {
      margin-bottom: 10px;
    }
  }
}
</style>
