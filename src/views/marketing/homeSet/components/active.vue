<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-02-21 10:02:32
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-03-19 11:48:53
 * @FilePath: \cshy-admin\src\divs\marketing\homeSet\page\modules\components\activeGoods.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
     
      <div class="active-box" v-if="eleValue">
        <div class="active-box-tiitle">
          <div class="active-box-tiitle-left">
            <span class="" style="margin-right: 4.5px; margin-left:20px"
              >限时秒杀倒计时</span
            >
            <!-- <van-count-down :time="time">
              <template #default="timeData">
                <span class="skill-min">{{ timeData.hours }}</span
                ><span class="">:</span
                ><span class="skill-min">{{ timeData.minutes }}</span
                ><span class="">:</span
                ><span class="skill-min">{{ timeData.seconds }}</span>
              </template>
            </van-count-down> -->
          </div>
          <div class="active-box-tiitle-right">
            <img
              
              class="active-box-tiitle-right-img"
              src="https://www.bankservice.shop/file/slill-btn.png"
              mode="aspectFill"
            />
           
          </div>
        </div>
        <div
          v-if="
            eleValue && eleValue.childConfigList&&eleValue.childConfigList.length > 0
          "
          class="active-row"
          
        >
          <div
            class="active-grid"
            v-for="item in eleValue.childConfigList.slice(0, 3)"
            :key="item.id"
           
          >
            <img class="active-img" :src="item.img" mode="aspectFill" />
        

         
            <div class="active-price">
              <span>{{ item.title }}</span
              >
            </div>
            <div class="active-price-org"> {{ item.tip }} </div>
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
 .active-box {
    .active-box-tiitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .active-box-tiitle-left {
        width: 212px;
        height: 27px;
        background: rgba(255, 229, 222, 1);
        border-radius: 0px 100px 100px 0px;

        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 14px;
        color: #e91331;
        line-height: 27px;
        text-align: left;
        font-style: normal;
        display: flex;
        align-items: center;
        .skill-min {
          width: 21px;
          height: 17px;
          line-height: 17px;
          background: #e91331;
          border-radius: 4px;
          color: #fff;
          font-weight: 400;
          display: inline-block;
      
          text-align: center;
        }
        text {
          color: #e91331;
        }
      }
      .active-box-tiitle-right {
        margin-right: 15px;
        .active-box-tiitle-right-img {
          width: 103px;
          height: 26px;
        }
      }
    }
    .active-row {
      margin: 0 15px;
      width: 345px;
      padding-bottom: 15px;
      background-size: 100%;
      background-position: 0;
      padding-top: 11.5px;

      display: flex;
      justify-content: flex-start;
      .active-grid {
        display: flex;
        justify-content: flex-start;
        width: 108.5px;
        font-size:14px;
        margin-right: 10px;
        flex-direction: column;

        background: #f5f5f5;
        border-radius: 10px;
        .active-img {
          width:108.5px;
          height:99px;
          border-radius: 10px 10px 0 0;
   
          background-size: 100%;
          background-position: no-repeat;
          background-position: 0;
        }
        .active-text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2b2b2b;
          line-height: 20px;
          margin:5px 0 3px 0;
        }
        .active-price {
          background: linear-gradient(270deg, #ff7c5c 0%, #fe3b7f 100%);
          border-radius: 9px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #fff;
          line-height: 17.5px;
          text-align: center;

          width: 89px;
          height:17.5px;
          margin-left:10px;
          margin-top:7.5px;
          margin-bottom: 4.5px;
        }
        .font-34 {
          font-size:17px;
        }
        .active-price-org {
          text-align: center;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #9a9a9a;
          line-height: 20px;
          text-decoration: line-through;
        }
      }
      .active-grid:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
</style>