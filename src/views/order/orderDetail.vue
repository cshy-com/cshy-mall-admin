<template>
  <div>
    <el-dialog
      title="订单信息"
      :visible.sync="dialogVisible"
      width="800px"
      v-if="orderDatalist"
    >
      <div class="description" v-loading="loading">
        <div class="title">用户信息</div>
        <div class="acea-row">
          <div class="description-term">
            用户昵称：{{ orderDatalist.nikeName }}
          </div>
          <div class="description-term">
            绑定电话：{{ orderDatalist.phone ? orderDatalist.phone : "无" }}
          </div>
        </div>
        <el-divider></el-divider>
        <div class="title">
          {{
            orderDatalist.statusStr.key === "toBeWrittenOff"
              ? "提货信息"
              : "收货信息"
          }}
        </div>
        <div class="acea-row">
          <div class="description-term">
            {{
              orderDatalist.statusStr.key === "toBeWrittenOff"
                ? "提货人"
                : "收货人"
            }}：{{ orderDatalist.realName }}
          </div>
          <div class="description-term">
            {{
              orderDatalist.statusStr.key === "toBeWrittenOff"
                ? "提货电话"
                : "收货电话"
            }}：{{ orderDatalist.userMobile }}
          </div>
          <div
            class="description-term"
            v-if="orderDatalist.statusStr.key !== 'toBeWrittenOff'"
          >
            {{
              orderDatalist.statusStr.key === "toBeWrittenOff"
                ? "提货地址"
                : "收货地址"
            }}：{{ orderDatalist.address }}{{ orderDatalist.addressDetail }}
          </div>
        </div>
        <el-divider></el-divider>
        <div class="title">订单信息</div>
        <div class="acea-row">
          <div class="description-term">
            订单编号：{{ orderDatalist.orderId }}
          </div>
          <div class="description-term" style="color: red">
            订单状态：{{ orderDatalist | filterStatus }}
          </div>
          <!-- <div class="description-term">
            商品总数：{{ orderDatalist.totalNum }}
          </div> -->
          <!-- <div class="description-term">
            商品总价：{{ orderDatalist.proTotalPrice }}
          </div> -->
          <!-- <div class="description-term">
            支付邮费：{{ orderDatalist.payPostage }}
          </div> -->
          <!-- <div class="description-term">
            优惠券金额：{{ orderDatalist.couponPrice }}
          </div> -->
          <!-- <div class="description-term">
            实际支付：{{ orderDatalist.payPrice }}
          </div> -->
          <!-- <div class="description-term">
            抵扣金额：{{ orderDatalist.deductionPrice }}
          </div> -->
          <div
            class="description-term fontColor3"
            v-if="orderDatalist.refundPrice"
          >
            退款金额：{{ orderDatalist.refundPrice }}
          </div>
          <!-- <div class="description-term" v-if="orderDatalist.useIntegral">
            使用积分：{{ orderDatalist.useIntegral }}
          </div> -->
          <div class="description-term" v-if="orderDatalist.backIntegral">
            退回积分：{{ orderDatalist.backIntegral }}
          </div>
          <div class="description-term">
            创建时间：{{ orderDatalist.createTime }}
          </div>
          <div class="description-term" v-if="orderDatalist.refundReasonTime">
            退款时间：{{ orderDatalist.refundReasonTime }}
          </div>
          <div class="description-term">
            支付方式：{{ orderDatalist.payTypeStr }}
          </div>
          <!-- <div class="description-term">推广人：{{orderDatalist.spreadName | filterEmpty}}</div> -->
          <div
            class="description-term"
            v-if="
              orderDatalist.shippingType === 2 &&
              orderDatalist.statusStr.key === 'notShipped'
            "
          >
            门店名称：{{ orderDatalist.storeName }}
          </div>
          <div
            class="description-term"
            v-if="
              orderDatalist.shippingType === 2 &&
              orderDatalist.statusStr.key === 'notShipped'
            "
          >
            核销码：{{ orderDatalist.user_phone }}
          </div>
          <div class="description-term">
            商家备注：{{ orderDatalist.remark }}
          </div>
          <template
            v-if="
              orderDatalist.statusStr.key === 'toBeWrittenOff' &&
              orderDatalist.systemStore
            "
          >
            <div class="description-term">
              提货码：{{ orderDatalist.verifyCode }}
            </div>
            <div class="description-term">
              门店名称：{{ orderDatalist.systemStore.name }}
            </div>
            <div class="description-term">
              门店电话：{{ orderDatalist.systemStore.phone }}
            </div>
            <div class="description-term">
              门店地址：{{
                orderDatalist.systemStore.address +
                orderDatalist.systemStore.detailedAddress
              }}
            </div>
          </template>
          <table class="order-table">
            <thead >
              <tr class="table-header">
                <th style="width: 300px;">商品</th>
                <th>小计（元）</th>
                <th>优惠减免金额（元）</th>
                <th>应收金额（元）</th>
                <th>优惠抵扣（元）</th>
                <!-- <th>加价/减价（元）</th> -->
                <th>实收金额（元）</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orderDatalist.orderInfo" :key="item.id">
                <th>
                  <div class="prod-info">
                    <img :src="item.info.mainImage" style="width: 50px;" />
                    <div class="prod-info-desc">
                      <div class="font-w">{{ item.info.productName }}</div>
                      <div>购买信息：¥ {{ item.info.price }} x {{ item.info.payNum }}</div>
                      <div v-if="item.refundNum>0" style="color: red;"> 申请退款数量:{{item.refundNum}}</div>
                    </div>
                  </div>
                </th>
                <th>{{ item.info.payNum * Number(item.info.price) }}</th>
                <th>{{orderDatalist.couponPrice}}</th>
                <th>{{ item.info.payNum * Number(item.info.price) }}</th>
                <th>{{item.allPrice}}</th>
                <!-- <th>0</th> -->
                <th>{{item.allPrice<0?0:item.allPrice}}</th>
              </tr>
              <tr>
                <th>优惠信息</th>
                <th  >【积分抵扣】¥{{orderDatalist.useIntegral}}</th>
                <th></th>
                <th></th>
                <th></th>
                <!-- <th></th> -->
                <th></th>
              </tr>
              <tr>
                <th>运费</th>
                <th>{{orderDatalist.totalPostage}}</th>
                <th>{{orderDatalist.deductionPostage}}</th>
                <th>{{orderDatalist.payPostage}}</th>
                <th>0.00</th>
                <!-- <th>0.00</th> -->
                <th>0.00</th>
              </tr>
              <tr>
                <th>总计</th>
                <th>{{orderDatalist.totalPrice}}</th>
                <th>{{orderDatalist.couponPrice}}</th>
                <th>{{orderDatalist.payPrice}}</th>
                <th>{{orderDatalist.totalPrice-orderDatalist.payPrice }}</th>
                <!-- <th>0.00</th> -->
                <th>{{ orderDatalist.payPrice }}</th>
              </tr>
            </tbody>
          </table>
        </div>

        <template v-if="orderDatalist.deliveryType === 'express'">
          <el-divider></el-divider>
          <div class="title" style="margin-top:20px">物流信息</div>
          <div class="acea-row">
            <div v-if="orderDatalist.trackingNo == 'zp666'">商家配送</div>
            <div class="description-term" v-else>
              快递单号：{{ orderDatalist.trackingNo|filterTrackingNo }}
              <el-button
                type="primary"
                size="mini"
                @click="openLogistics(orderDatalist.trackingNo)"
                style="margin-left: 5px"
                v-hasPermi="['admin:order:logistics:info']"
                >物流查询</el-button
              >
            </div>
          </div>
        </template>
        <template v-if="[4, 5].includes(orderDatalist.refundStatus)">
          <el-divider></el-divider>
          <div class="title">退货物流信息</div>
          <div class="acea-row">
            <div class="description-term">
              快递单号：{{ orderDatalist.refundTrackingNo | filterTrackingNo}}
              <el-button
                type="primary"
                size="mini"
                @click="openLogistics(orderDatalist.refundTrackingNo)"
                style="margin-left: 5px"
                v-hasPermi="['admin:order:logistics:info']"
                >物流查询</el-button
              >
            </div>

            <div class="description-term">
              快递留言：{{ orderDatalist.returnRemark }}
            </div>
            <div class="description-term">
              快递凭证：
              <template v-if="orderDatalist.returnImg">
                <template v-for="item in orderDatalist.returnImg.split(',')">
                  <img :src="item" style="width: 100px" />
                </template>
              </template>
            </div>
          </div>
        </template>

        <template v-if="orderDatalist.mark">
          <el-divider></el-divider>
          <div class="title">用户备注</div>
          <div class="acea-row">
            <div class="description-term">{{ orderDatalist.mark }}</div>
          </div>
        </template>
      </div>
    </el-dialog>
    <el-dialog
      v-if="orderDatalist"
      title="提示"
      :close-on-click-modal="false"
      :visible.sync="modal2"
      width="800px"
    >
      <div
        class="logistics acea-row row-top"
        v-if="trackingNoList && trackingNoList.length > 0"
      >
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            accordion
            :title="'物流单号：' + item"
            :name="index"
            v-for="(item, index) in trackingNoList"
            :key="item.id"
          >
            <el-timeline :reverse="reverse">
              <el-timeline-item v-for="(item, i) in result" :key="i">
                <p class="time" v-text="item.time"></p>
                <p class="content" v-text="item.status"></p>
              </el-timeline-item>
            </el-timeline>
          </el-collapse-item>
        </el-collapse>
      </div>
      <template v-else>
        <div class="logistics acea-row row-top">
          <div class="logistics_img">
            <img src="@/assets/imgs/expressi.jpg" />
          </div>
          <div class="logistics_cent">
            <!-- <span class="mb10">物流公司：{{orderDatalist.deliveryName}}</span> -->
            <span>物流单号：{{ searchTrackingNo }}</span>
          </div>
        </div>
        <div class="acea-row row-column-around trees-coadd">
          <div class="scollhide">
            <el-timeline :reverse="reverse">
              <el-timeline-item v-for="(item, i) in result" :key="i">
                <p class="time" v-text="item.time"></p>
                <p class="content" v-text="item.status"></p>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modal2 = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
0;
import { orderDetailApi, getLogisticsInfoApi } from "@/api/order";
import {
  giftCardOrderPage,
  findExpressDetail,
  giftCardOrderStatusNum,
} from "@/api/marketing";
export default {
  name: "OrderDetail",
  props: {
    orderId: {
      type: String,
      default: 0,
    },
  },
  data() {
    return {
      reverse: true,
      dialogVisible: false,
      orderDatalist: null,
      loading: false,
      modal2: false,
      result: [],
      searchTrackingNo: null,
      trackingNoList: [],
      activeNames: 0,
    };
  },
  filters: {
    filterStatus(e) {
      let shipNums = e.orderInfo.map((val) => val.shipNum);
      let payNums = e.orderInfo.map((val) => val.info.payNum);
      const shipNumsTotal = shipNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const payNumsTotal = payNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
 debugger
      if (shipNumsTotal>0&&(shipNumsTotal < payNumsTotal)&&e.refundStatus==0) {
        return "部分发货";
      } else {
        return e.statusStr.value;
      }


     
    },
    filterTrackingNo(e){
      if(e){

     
      let str = e;
let regex = /zp666/g; // 使用正则表达式并设置全局标志g
let newStr = str.replace(regex, "商家自配"); // 替换所有的"World"为"Earth"
const uniqueChars = [...new Set(newStr.split(","))] 
 
return uniqueChars.join(",")
}
    }
  },
  mounted() {},
  methods: {
    handleChange(e) {
      if (e.length > 0) {
        let trackingNo = this.trackingNoList[e[0]];
        this.getFindExpressDetail(trackingNo);
      }
    },
    openLogistics(trackingNo) {
      this.searchTrackingNo = trackingNo;
      this.getOrderData(trackingNo);
      this.modal2 = true;
    },
    // 获取订单物流信息
    getOrderData(trackingNo) {
     
      let trackingNoList = trackingNo.split(",").filter(val=>val!='zp666');
      if (trackingNoList && trackingNoList.length > 0) {
        this.trackingNoList = trackingNoList;
        trackingNo = trackingNoList[0];
      }
      this.getFindExpressDetail(trackingNo);
    },
    getFindExpressDetail(trackingNo) {
      findExpressDetail({
        trackingNo: trackingNo,
        userMobile: this.orderDatalist.userMobile,
        type: 0, // 1 礼品卡 0 商城
      }).then((res) => {
        this.result = res.list;
      });
    },
    getDetail(id) {
      this.loading = true;
      orderDetailApi({
        orderNo: id,
      })
        .then((res) => {
        
         debugger
        var allPrice = 0;
        var totalPrice = res.orderInfo.reduce((accumulator, currentValue) => {
          return (
            accumulator +
            Number(currentValue.info.price) * currentValue.info.payNum
          );
        }, 0);

        res.orderInfo.forEach((item, index) => {
          if (Number(res.payPrice) > 0) {
            let price = Number(item.info.price) * item.info.payNum;
            if (res.orderInfo.length == 1) {
              item["allPrice"] = res.payPrice;
            } else if (index == res.orderInfo.length - 1) {
              let arr = res.orderInfo.slice(0, res.orderInfo.length - 1);
              var prePrice = arr.reduce((accumulator, currentValue, index) => {
                return accumulator + Number(currentValue.allPrice);
              }, 0);

              item["allPrice"] = (res.payPrice - prePrice).toFixed(2);
            } else {
              item["allPrice"] = ((price / totalPrice) * res.payPrice).toFixed(
                2
              );
            }
          } else {
            item["allPrice"] = 0;
          }
        });
      
          this.orderDatalist = res;
          this.loading = false;
        })
        .catch(() => {
          this.orderDatalist = null;
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.logistics {
  align-items: center;
  padding: 10px 0px;

  .logistics_img {
    width: 45px;
    height: 45px;
    margin-right: 12px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .logistics_cent {
    span {
      display: block;
      font-size: 12px;
    }
  }
}

.trees-coadd {
  width: 100%;
  height: 400px;
  border-radius: 4px;
  overflow: hidden;

  .scollhide {
    width: 100%;
    height: 100%;
    overflow: auto;
    margin-left: 18px;
    padding: 10px 0 10px 0;
    box-sizing: border-box;

    .content {
      font-size: 12px;
    }

    .time {
      font-size: 12px;
      color: #2d8cf0;
    }
  }
}

.title {
  margin-bottom: 14px;
  color: #303133;
  font-weight: 500;
  font-size: 14px;
}

.description {
  &-term {
    display: table-cell;
    padding-bottom: 5px;
    line-height: 20px;
    width: 50%;
    font-size: 12px;
    color: #606266;
  }

  ::v-deep .el-divider--horizontal {
    margin: 12px 0 !important;
  }
}
::v-deep .el-collapse {
  width: 100%;
}
.order-table{ border-collapse: collapse;
  margin: 20px 0 20px 0;
  .font-w{
    font-weight: 700;
  }
  .table-header{
    th{
      
    font-weight: 700;
    }
  }
  th{
    padding: 5px;
  }
  // tr{
  //   border-top: 1px solid #666;
  // }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table,
  th {
    border-top: 1px solid   #e7e7e7;
    padding: 8px;
    line-height: 20px;
  }
.prod-info{
  display: flex;
  align-items: center;
    justify-content: center;
    text-align: left;
    .prod-info-desc{
      margin-left: 15px;
      text-align: left;
    }
}
}
</style>
