<template>
  <div v-if="eleValue&&eleValue.childConfigList.length>0">
    <div
        style="    display: flex;justify-content: center; width: 100%; margin-bottom: 20px"    v-if="eleValue.childConfigList.length==1"
        
      >
    

        <img v-for="item in eleValue.childConfigList" :key="item.id"
          style="width: 90%;height: 400px;   "
          :src="item.img"
           
        >
        </img>
   
       
          
    
    

      </div> <template  v-else>
      <el-carousel height="400px" arrow='never' indicator-position='none' style='width: 100%; '> 
      <el-carousel-item v-for="item in eleValue.childConfigList" :key="item.id">
        <img    
          style="width:90%;height: 400px;  margin-left:5% "
          :src="item.img"
          
        >
        </img>
      </el-carousel-item>
    </el-carousel>  </template>
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
      logoUrl: require("@/assets/imgs/img_home_yz.png"),
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
.header {
  width: 100%;

  // padding: 28rpx 30rpx;
  .advertisement {
    width: 100%;
    height: 287.5px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 0;
    z-index: 9;
    position: relative;
  }
  .serch-wrapper {
    align-items: center;

    padding-top: 10px;

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
  .advertisement-commodity {
    position: absolute;
    left: 105.5px;
    top: 152px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .advertisement-box {
      width: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .advertisement-box:nth-child(1) {
      margin-right: 22.5px;
    }
    .advertisement-text {
      font-size: 11px;
      margin-top: 2px;
      font-weight: 400;
      color: #ffffff;
      line-height: 15px;
    }
    .advertisement-url {
      width: 53px;
      height: 53px;
      margin-top: 2.5px;
    }
  }
  .tabNav {
    padding-top: 12px;
  }
}
</style>
