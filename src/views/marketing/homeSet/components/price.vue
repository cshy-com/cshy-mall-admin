<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-03-25 11:37:12
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-06-12 15:37:37
 * @FilePath: \cshy-h5\pages\index\priceGoods.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="price-box">
    <div class="price-title">
      <div class="line"></div>
      <span class="title-font">价格选区</span>
      <span class="title-more"  >查看更多></span>
    </div>
    <div class="price-select-all">
      <div
        class="price-select-item"
        :class="{ 'price-select-item-active': index == activeIndex }"
         
        v-for="(item, index) in tabPrices"
        :key="item.id"
        >{{ item.pricespan }}
      </div>
    </div>
 
    <div class="list-box animated">
      <div class="item"  v-for="(item, index) in tempArr"
      :key="index"
     >
        <div class="pictrue"> <img :src="item.image" mode=""></img></div>
        <div class="span-info">
          <div class="title van-multi-ellipsis--l2">{{ item.storeName }}</div>
          <div class="price-box">
            <div class="price">
              {{ item.price }}<span>元</span>
            
            </div>
     
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import {
  getCategoryList,
  getProductslist,
  getProductHot,
  getGroomList,
} from '@/api/store.js'
 
export default {
 
  props: {},
  data() {
    return {
      tempArr: [],
      activeIndex: 0,
      tabPrices: [
        {
          minPrice: 0,
          maxPrice: 50,
          pricespan: '¥0-¥50',
          type: 1,
        },
        {
          pricespan: '¥51-¥100',
          type: 2,
          minPrice: 51,
          maxPrice: 100,
        },
        {
          pricespan: '¥101-¥150',
          type: 3,
          minPrice: 101,
          maxPrice: 150,
        },
        {
          pricespan: '¥151-¥200',
          type: 4,
          minPrice: 151,
          maxPrice: 200,
        },
        {
          pricespan: '¥201-¥250',
          type: 5,
          minPrice: 201,
          maxPrice: 250,
        },
        {
          pricespan: '¥251-¥300',
          type: 6,
          minPrice: 251,
          maxPrice: 300,
        },
      ],
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    changePrice(index) {
      this.activeIndex = index
      this.getPriceRange()
    },

    
    // 价格区间筛选
    getPriceRange() {
      // getProductslist({
      //   minSalePrice: this.tabPrices[this.activeIndex].minPrice,
      //   maxSalePrice: this.tabPrices[this.activeIndex].maxPrice,
      //   page: 1,
      //   limit: 6,
      // }).then((res) => {
      //   this.tempArr = res.data.list
      // })
    },
    goMore(){
        uni.navigateTo({
        url: `/pages/goods/goods_list/index?minSalePrice=${this.tabPrices[this.activeIndex].minPrice}&maxSalePrice=${this.tabPrices[this.activeIndex].maxPrice}`,
      })
    },
    goDetail(item) {
      uni.navigateTo({
        url: `/pages/goods/goods_details/index?id=${item.id}`,
      })
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getPriceRange()
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped lang="scss">
.price-box {
  background: #fff;
}
.price-title {
  display: flex;
  align-items: center;
  .line {
    background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);
    width: 2px;
    height: 17px;
    border-radius: 7px;
    margin-right: 8px;
    margin-left: 10px;
  }
  .title-font {
    font-size: 15px;
    color: #2b2b2b;
    font-weight: 600;
  }
  .title-more {
    margin-left: auto;
    margin-right: 10px;
  }
}
.price-select-all {
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2b2b2b;
  line-height: 18px;
  margin: 4px 0 15px 0;
  display: flex;
  flex-wrap: wrap;
  .price-select-item {
    span-align: center;
    margin: 0 20px;
    margin-top: 5px;
    width: 80px;
    border-radius: 30px;
    padding: 2px 5px;
  }
  .price-select-item-active {
    background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);

    color: #fff;
  }
}

.list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
margin: 0 10px;
  .item {
    width: 220rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin-left: 10px;
    overflow: hidden;

    image {
      width: 100%;
      height: 220rpx;
      background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
      background-size: 100% 220rpx;
      background-position: no-repeat;
      background-position: 0;
    }
    .span-info {
      padding: 20rpx;

      .title {
        color: #2b2b2b;
        font-size: 30rpx;
      }
      .price-box {
        display: flex;
        justify-content: space-between;
        margin-top: 10rpx;
      }
      .old-price {
        font-size: 28rpx;
        color: #9a9a9a;
        span-decoration: line-through;

        span {
          margin-right: 2px;
          font-size: 20rpx;
        }
      }

      .price {
        display: flex;
        align-items: flex-end;
          color: #2b2b2b;
        font-size: 34rpx;
        font-weight: 400;

        span {
          padding-bottom: 4rpx;
          font-size: 24rpx;
          font-weight: 800;
        }

        .txt {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28rpx;
          height: 28rpx;
          margin-left: 15rpx;
          margin-bottom: 10rpx;
         
          border-radius: 4rpx;
          font-size: 22rpx;
          font-weight: normal;
        }
      }
    }
    &:nth-child(3n-2){
        margin-left: 0;
    }
  }
}
</style>
