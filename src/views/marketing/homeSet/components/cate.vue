<template>
   <div class="classification" v-if="eleValue&&eleValue.childConfigList">
     
        <div
          class="classification-grid"
          v-for="item in eleValue.childConfigList"
          :key="item.id"
          
        >
          <img class="classification-img" :src="item.img" />
          <div class="classification-text">
            {{ item.title }}
          </div>
          <div class="tip" v-if="item.tip">
            {{ item.tip }}
          </div>
        </div>
      </div>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: { eleValue:{
      type: Object,
      default: () => {}
    }},
  data() {
      return {
        productCategory:[]
      };
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {

  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { },//生命周期：创建之前
  beforeMount() { },//生命周期：挂载之前
  beforeUpdate() { },//生命周期：更新之前
  updated() { },//生命周期：更新之后
  beforeDestroy() { },//生命周期：销毁之前
  destroyed() { },//生命周期：销毁完成
  activated() { },//如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped lang="scss">
 .classification {
    display: flex;
    justify-content: flex-start;
    padding-top: 20px;
    margin-right: 15px;
    margin-left: 15px;
    flex-wrap: wrap;
    .classification-grid {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right:10px;
      width: 59px;
      position: relative;
      .tip {
        position: absolute;
        right: -16rpx;
        top: -9px;
        /* background-image: url('../../static/images/v2/tip.png'); */
        background-size: 100%;
        background-position: 0;
        width: 48.5px;
        height:18.5px;
        font-size: 9px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 18.5px;
        text-align: center;
      }
      .classification-img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      .classification-text {
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2b2b2b;
        line-height: 18.5px;
        margin: 4.5px 0 15px 0;
      }
    }
    .classification-grid:nth-child(5n) {
      margin-right: 0;
    }
  }
</style>