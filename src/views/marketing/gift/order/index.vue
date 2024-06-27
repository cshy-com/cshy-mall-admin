<template>
  <div class="divBox relative">
    <el-card class="box-card">
      <div class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item label="订单状态：">
              <el-radio-group
                v-model="tableFrom.status"
                type="button"
                @change="seachList"
              >
                <el-radio-button label="all"
                  >全部
                  {{
                    "(" + orderChartType.all ? orderChartType.all : 0 + ")"
                  }}</el-radio-button
                >

                <el-radio-button label="unshipped"
                  >未发货
                  {{
                    "(" + orderChartType.unshipped
                      ? orderChartType.unshipped
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="delivering"
                  >待收货
                  {{
                    "(" + orderChartType.delivering
                      ? orderChartType.delivering
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="delivered"
                  >已收货
                  {{
                    "(" + orderChartType.delivered
                      ? orderChartType.delivered
                      : 0 + ")"
                  }}</el-radio-button
                >

                <el-radio-button label="completed"
                  >交易完成
                  {{
                    "(" + orderChartType.completed
                      ? orderChartType.completed
                      : 0 + ")"
                  }}</el-radio-button
                >
              </el-radio-group>
            </el-form-item>
            <el-form-item label="时间选择：" class="width100">
              <el-radio-group
                v-model="tableFrom.dateLimit"
                type="button"
                class="mr20"
                size="small"
                @change="selectChange(tableFrom.dateLimit)"
              >
                <el-radio-button
                  v-for="(item, i) in fromList.fromTxt"
                  :key="i"
                  :label="item.val"
                  >{{ item.text }}</el-radio-button
                >
              </el-radio-group>
              <el-date-picker
                v-model="timeVal"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                size="small"
                type="daterange"
                placement="bottom-end"
                placeholder="自定义时间"
                style="width: 220px;"
                @change="onchangeTime"
              />
            </el-form-item>

            <el-form-item label="订单号：" class="width100">
              <el-input
                v-model="tableFrom.orderNo"
                placeholder="请输入订单号"
                class="selWidth"
                size="small"
                clearable
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  size="small"
                  @click="seachList"
                />
              </el-input>
            </el-form-item>
            <el-form-item class="width100">
              <el-button type="primary" size="small" @click="seachList"
                >查询</el-button
              >
              <el-button type="primary" size="small" @click="expressSync"
                >同步物流</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <!-- {{ tableData.data }} -->
    <el-card class="box-card">
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        size="mini"
        class="table"
        highlight-current-row
        :header-cell-style="{ fontWeight: 'bold' }"
        :row-key="
          row => {
            return row.orderNo;
          }
        "
      >
        <el-table-column label="订单号" min-width="110" prop="orderNo">
       
        </el-table-column>
        <el-table-column prop="user" label="下单用户" min-width="110">
          <template slot-scope="scope">
            {{ scope.row.user.name }}
          </template>
        </el-table-column>
        <el-table-column prop="userAddress" label="收货人" min-width="110">
          <template slot-scope="scope">
            <span
              style="display: block;"
              v-text="scope.row.userAddress.realName"
            />
            <span
              style="display: block;"
              v-text="scope.row.userAddress.phone"
            />
          </template>
        </el-table-column>

        <el-table-column prop="userAddress" label="收货地址" min-width="150">
          <template slot-scope="scope">
            <span style="display: block;"
              >{{ scope.row.userAddress.province
              }}{{ scope.row.userAddress.city
              }}{{ scope.row.userAddress.district }}</span
            >
            <span
              style="display: block;"
              v-text="scope.row.userAddress.detail"
            />
          </template>
        </el-table-column>

        <el-table-column label="商品信息" min-width="400" prop="storeProduct">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right" :open-delay="800">
              <div v-if="scope.row.storeProduct" slot="reference">
                <div
                  class="tabBox acea-row row-middle"
                  style="flex-wrap: inherit;"
                >
                  <div class="demo-image__preview mr10">
                    <el-image
                      :src="scope.row.storeProduct.image"
                      :preview-src-list="[scope.row.storeProduct.image]"
                    />
                  </div>
                  <div class="text_overflow" style="    display: flex;flex-direction: column;">
                    <span class="tabBox_tit mr10"
                      >
                      {{ scope.row.storeProduct.storeName + " | "
                      }}
                    </span>

                    <span class="tabBox_tit mr10"
                      >     {{ scope.row.attrValue.suk ? scope.row.attrValue.suk : "-" }}</span
                 >
                  </div>
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="订单状态" min-width="100" prop="orderStatus">
          <template slot-scope="scope">
            <div>
              <el-tag v-if="scope.row.orderStatus == 0">待发货</el-tag>
              <el-tag type="success" v-if="scope.row.orderStatus == 1"
                >待收货</el-tag
              >
              <el-tag type="warning" v-if="scope.row.orderStatus == 2"
                >已收货</el-tag
              >
              <el-tag type="info" v-if="scope.row.orderStatus == 3"
                >已完结</el-tag
              >
            
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" min-width="150" />
        <el-table-column
          prop="giftCardTypeName"
          label="礼品类型"
          min-width="150"
        />
        <el-table-column prop="attrValue" label="兑换卡券信息" min-width="150" >
          <template slot-scope="scope">
        
            <span style="display: block;">序列号：{{ scope.row.giftCard.serialNo }}</span>
            <span style="display: block;">提货编码：{{ scope.row.giftCard.pickupCode }}</span>
          
          </template>
          </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="150" />
        <el-table-column
          label="操作"
          min-width="150"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.orderStatus == 0"
              type="text"
              size="small"
              class="mr10"
              @click="sendOrder(scope.row)"
              v-hasPermi="['admin:order:send']"
              >发货</el-button
            >
            <el-button
              v-if="scope.row.trackingNo"
              @click="logisticsOrder(scope.row)"
              type="text"
              size="small"
              class="mr10"
              >查看物流</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>

    <!--详情-->
    <details-from ref="orderDetail" :orderId="orderId" />

    <!-- 发送货 -->
    <order-send
      ref="send"
      orderType="1"
      :orderId="orderId"
      @submitFail="getList"
    ></order-send>

    <el-dialog
      v-if="orderDatalist"
      title="提示"
      :visible.sync="modal2"
      width="30%"
    >
      <div class="logistics acea-row row-top">
        <div class="logistics_img">
          <img src="@/assets/imgs/expressi.jpg" />
        </div>
        <div class="logistics_cent">
          <span class="mb10">物流公司：{{ orderDatalist.expName }}</span>
          <span>物流单号：{{ orderDatalist.number }}</span>
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modal2 = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  giftCardOrderPage,
  findExpressDetail,
  giftCardOrderStatusNum
} from "@/api/marketing";
import { orderStatusNumApi, orderMarkApi,expressSyncExpressStatus } from "@/api/order";
import cardsData from "@/components/cards/index";
import zbParser from "@/components/FormGenerator/components/parser/ZBParser";
import detailsFrom from "@/views/order/orderDetail";
import orderSend from "@/views/order/orderSend";
import orderVideoSend from "@/views/order/orderVideoSend";

export default {
  name: "orderlistDetails",
  components: {
    cardsData,
    zbParser,
    detailsFrom,
    orderSend,
    orderVideoSend
  },
  data() {
    return {
      reverse: true,

      orderId: "",

      tableData: {
        data: [],
        total: 0
      },
      listLoading: true,
      tableFrom: {
        status: "all",
        dateLimit: "",
        orderNo: "",
        current: 1,
        size: 20,
        type: 0
      },
      orderChartType: {},
      timeVal: [],
      fromList: this.$constants.fromList,

      modal2: false,
      orderDatalist: {},
      result: []
    };
  },
  mounted() {
    this.getList();
    this.getOrderStatusNum();
    // this.getOrderListData();
  },
  methods: {
    // 同步物流

   async expressSync(){
await expressSyncExpressStatus({})
 this.$message.success("同步成功");
     
    },
    // 查新物流
    logisticsOrder(row) {
      findExpressDetail({
        trackingNo: row.trackingNo,
        userMobile:row.userAddress.phone,
        type:1// 1 礼品卡 0 商城
      }).then(res => {
        this.orderDatalist = res;
        this.modal2 = true;
        this.result = res.list;
      });
    },

    seachList() {
      this.tableFrom.page = 1;
      this.getList();
      this.getOrderStatusNum();
    },

    // 发送
    sendOrder(row) {
      // if(row.type===0){

      this.orderId = row.id;
      this.$refs.send.modals = true;
      this.$refs.send.getList();
      this.$refs.send.sheetInfo();
      // }else{
      //   this.$refs.videoSend.modals = true;
      //   if(!JSON.parse(sessionStorage.getItem('videoExpress'))) this.$refs.videoSend.companyGetList();
      // }
    },

    // 备注
    onOrderMark(row) {
      this.$prompt("订单备注", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "请输入订单备注",
        inputType: "textarea",
        inputValue: row.remark,
        inputPlaceholder: "请输入订单备注",
        inputValidator: value => {
          if (!value) return "输入不能为空";
        }
      })
        .then(({ value }) => {
          orderMarkApi({ mark: value, orderNo: row.orderId }).then(() => {
            this.$message.success("操作成功");
            this.getList();
          });
        })
        .catch(() => {
          this.$message.info("取消输入");
        });
    },

    // 选择时间
    selectChange(tab) {
      this.timeVal = [];
      this.tableFrom.page = 1;
      this.getList();
      this.getOrderStatusNum();
      // this.getOrderListData();
    },
    // 具体日期
    onchangeTime(e) {
      this.timeVal = e;
      this.tableFrom.dateLimit = e ? this.timeVal.join(",") : "";
      this.tableFrom.page = 1;
      this.getList();
      this.getOrderStatusNum();
      // this.getOrderListData();
    },

    // 列表
    getList() {
      this.listLoading = true;
      giftCardOrderPage(this.tableFrom)
        .then(res => {
          this.tableData.data = res.list || [];
          this.tableData.total = res.total;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },

    // 获取各状态数量
    getOrderStatusNum() {
      giftCardOrderStatusNum({}).then(res => {
        this.orderChartType = res;
      });
    },
    pageChange(page) {
      this.tableFrom.current = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.size = val;
      this.getList();
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table__body {
  width: 100%;
  table-layout: fixed !important;
}
.demo-table-expand {
  ::v-deeplabel {
    width: 83px !important;
  }
}
.refunding {
  span {
    display: block;
  }
}
.selWidth {
  width: 300px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.tabBox_tit {
  font-size: 12px !important;
  /*margin: 0 2px 0 10px;*/
  letter-spacing: 1px;
  /*padding: 5px 0;*/
  box-sizing: border-box;
}
.text_overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
}
.pup_card {
  width: 200px;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 16px;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.mt20 {
  margin-top: 20px;
}
.relative {
  position: relative;
}
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
</style>
