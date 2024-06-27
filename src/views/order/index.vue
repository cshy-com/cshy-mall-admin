<template>
  <div class="divBox relative">
    <el-card class="box-card">
      <div class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px">
            <el-form-item
              label="订单状态："
              v-if="checkPermi(['admin:order:status:num'])"
            >
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
              
                <el-radio-button label="unPaid"
                  >未支付
                  {{
                    "(" + orderChartType.unPaid
                      ? orderChartType.unPaid
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="notShipped"
                  >未发货
                  {{
                    "(" + orderChartType.notShipped
                      ? orderChartType.notShipped
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="spike"
                  >待收货
                  {{
                    "(" + orderChartType.spike ? orderChartType.spike : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="bargain"
                  >待评价
                  {{
                    "(" + orderChartType.bargain
                      ? orderChartType.bargain
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="complete"
                  >交易完成
                  {{
                    "(" + orderChartType.complete
                      ? orderChartType.complete
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="toBeWrittenOff"
                  >待核销
                  {{
                    "(" + orderChartType.toBeWrittenOff
                      ? orderChartType.toBeWrittenOff
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="refunding"
                  >退款中
                  {{
                    "(" + orderChartType.refunding
                      ? orderChartType.refunding
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="refundNReturn"
                  >退货退款
                  {{
                    "(" + orderChartType.refundNReturn
                      ? orderChartType.refundNReturn
                      : 0 + ")"
                  }}</el-radio-button
                >

                <el-radio-button label="refunded"
                  >已退款
                  {{
                    "(" + orderChartType.refunded
                      ? orderChartType.refunded
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="deleted"
                  >已删除
                  {{
                    "(" + orderChartType.deleted
                      ? orderChartType.deleted
                      : 0 + ")"
                  }}</el-radio-button
                >
                <el-radio-button label="cancel"
                  >已取消
                  {{
                    "(" + orderChartType.cancel
                      ? orderChartType.cancel
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
                style="width: 220px"
                @change="onchangeTime"
              />
            </el-form-item>
            <!-- <el-form-item label="订单类型：" class="width100">
              <el-select v-model="tableFrom.type" clearable placeholder="请选择" class="selWidth" @change="seachList">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="关键字：" class="width100">
              <el-input
                v-model="tableFrom.keywords"
                placeholder="请输入姓名、电话、订单ID"
                class="selWidth"
                size="small"
                clearable @keyup.enter.native="seachList"
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
              <el-button
                size="small"
                @click="exports"
                v-hasPermi="['admin:export:excel:order']"
                >导出</el-button
              >
              <el-button size="small" @click="expressSync">同步物流</el-button>
              <el-button
                type="primary"
                size="small"
                @click="printJS('printJS-form', 'html')"
              >
                打印快递单
              </el-button>
              <el-button size="small" @click="seachList" type="primary"
                >刷新</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <div class="mt20">
      <!-- <cards-data :cardLists="cardLists" v-if="checkPermi(['admin:order:list:data'])"></cards-data> -->
    </div>
    <el-card class="box-card">
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        size="mini"
        class="table"
        highlight-current-row
        ref='multipleTable'
        @selection-change="handleSelectionChange"
        :header-cell-style="{ fontWeight: 'bold' }"
        :row-key="
          (row) => {
            return row.orderId;
          }
        "
      >
        <!-- @selection-change="handleSelectionChange" -->
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="55"
        />
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column prop="orderType" label="订单类型" min-width="110" />
        <el-table-column prop="realName" label="收货信息" min-width="100">
          <template slot-scope="scope">
            <div>{{ scope.row.realName }}</div>
            <div>{{ scope.row.address }}</div>
          </template>
        </el-table-column>
       
        <el-table-column label="商品信息" min-width="400">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right" :open-delay="800">
              <div
                v-if="scope.row.productList && scope.row.productList.length"
                slot="reference"
              >
                <div
                  v-for="(val, i) in scope.row.productList"
                  :key="i"
                  class="tabBox acea-row row-middle"
                  style="flex-wrap: inherit"
                >
                  <div class="demo-image__preview mr10">
                    <el-image
                      :src="val.info.mainImage"
                      :preview-src-list="[val.info.mainImage]"
                    />
                  </div>
                  <div class="text_overflow">
                    <span class="tabBox_tit mr10"
                      >{{ val.info.productName + " | "
                      }}{{ val.info.sku ? val.info.sku : "-" }}</span
                    >
                    <span class="tabBox_pice">{{
                      "￥" + val.info.price
                        ? val.info.price + " x " + val.info.payNum
                        : "-"
                    }}</span>
                  </div>
                </div>
              </div>
              <div
                class="pup_card"
                v-if="scope.row.productList && scope.row.productList.length"
              >
                <div
                  v-for="(val, i) in scope.row.productList"
                  :key="i"
                  class="tabBox acea-row row-middle"
                  style="flex-wrap: inherit"
                >
                  <div class="">
                    <span class="tabBox_tit mr10"
                      >{{ val.info.productName + " | "
                      }}{{ val.info.sku ? val.info.sku : "-" }}</span
                    >
                    <span class="tabBox_pice">{{
                      "￥" + val.info.price
                        ? val.info.price + " x " + val.info.payNum
                        : "-"
                    }}</span>
                  </div>
                </div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商品编号" min-width="100">
          <template slot-scope="scope">
           
              <div
                v-if="scope.row.productList && scope.row.productList.length"
                slot="reference"
              >
                <div
                  v-for="(val, i) in scope.row.productList"
                  :key="i"
                  class="tabBox acea-row row-middle"
                  style="flex-wrap: inherit"
                >
                  
                  <div class="text_overflow" style="height: 38px;display: flex;
    align-items: center;
    justify-content: center;">
                    <span class="tabBox_tit "
                      >{{ val.barCode?val.barCode:''}}</span
                    >
                     
                  </div>
                </div>
              </div>
             
            
          </template>
        </el-table-column>
        <el-table-column label="订单号" min-width="120">
          <template slot-scope="scope">
            <span style="display: block" v-text="scope.row.orderId" />
            <span
              v-show="scope.row.isDel"
              style="color: #ed4014; display: block"
              >用户已删除</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="payPrice" label="实际支付" min-width="80" />
        <el-table-column label="支付方式" min-width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.payTypeStr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="100">
          <template slot-scope="scope">
            <div>
              <div
                v-if="
                  scope.row.refundStatus === 1 || scope.row.refundStatus === 2
                "
                class="refunding"
              >
                <template>
                  <el-popover
                    trigger="hover"
                    placement="left"
                    :open-delay="800"
                  >
                    <b style="color: #f124c7" slot="reference">{{
                      scope.row.statusStr.value
                    }}</b>
                    <div class="pup_card flex-column">
                      <span>退款原因：{{ scope.row.refundReasonWap }}</span>
                      <span
                        >备注说明：{{ scope.row.refundReasonWapExplain }}</span
                      >
                      <span>退款时间：{{ scope.row.refundReasonTime }}</span>
                      <span class="acea-row">
                        退款凭证：
                        <template v-if="scope.row.refundReasonWapImg">
                          <div
                            v-for="(
                              item, index
                            ) in scope.row.refundReasonWapImg.split(',')"
                            :key="index"
                            class="demo-image__preview"
                            style="
                              width: 35px;
                              height: auto;
                              display: inline-block;
                            "
                          >
                            <el-image :src="item" :preview-src-list="[item]" />
                          </div>
                        </template>
                        <span v-else style="display: inline-block">无</span>
                      </span>
                    </div>
                  </el-popover>
                </template>
              </div>
              <span v-else>{{ scope.row | filterStatus }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="isShipped" label="发货状态" min-width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isShipped">已发货</el-tag>
            <el-tag type="success" v-else>{{ scope.row | filterShip }}</el-tag>
          </template>
        </el-table-column>
      
        <el-table-column prop="createTime" label="下单时间" min-width="80" />
        <el-table-column
          label="操作"
          min-width="150"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.paid === false"
              type="text"
              size="small"
              @click="edit(scope.row)"
              class="mr10"
              v-hasPermi="['admin:order:update:price']"
              >编辑</el-button
            >
         
            <el-button
              v-if="
                (scope.row.statusStr.key === 'notShipped' &&
                  scope.row.refundStatus === 0) ||
                (scope.row.sendPost == 1 &&
                  scope.row.shippingType == 1 &&
                  scope.row.refundStatus > 0)||(scope.row.shipNums<scope.row.payNums&&scope.row.shippingType == 1 )
              "
              type="text"
              size="small"
              class="mr10"
              @click="sendOrder(scope.row)"
              v-hasPermi="['admin:order:send']"
              >发送货</el-button
            >
            <el-button
              v-if="
                (scope.row.paid == true &&
                  scope.row.statusStr.key === 'toBeWrittenOff' &&
                  scope.row.refundStatus === 0) ||
                (scope.row.sendPost == 1 &&
                  scope.row.shippingType == 2 &&
                  scope.row.refundStatus > 0)
              "
              type="text"
              size="small"
              class="mr10"
              v-hasPermi="['admin:order:write:update']"
              @click="onWriteOff(scope.row)"
              >立即核销</el-button
            >
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="onOrderDetails(scope.row.orderId)"
                  v-if="checkPermi(['admin:order:info'])"
                  >订单详情</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="onOrderLog(scope.row.orderId)"
                  v-if="checkPermi(['admin:order:status:list'])"
                  >订单记录</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="onOrderMark(scope.row)"
                  v-if="checkPermi(['admin:order:mark'])"
                  >订单备注</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="
                    scope.row.refundStatus === 1 &&
                    checkPermi(['admin:order:refund:refuse'])
                  "
                  @click.native="onOrderRefuse(scope.row, 0)"
                  >拒绝退款</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="
                    scope.row.refundStatus === 1 &&
                    checkPermi(['admin:order:refund:refuse'])
                  "
                  @click.native="onOrderRefuse(scope.row, 1)"
                  >拒绝退货退款</el-dropdown-item
                >
                <!---->
                  <el-dropdown-item  v-if="scope.row.refundStatus < 2 &&checkPermi(['admin:order:refund'])" 
                 @click.native="onOrderRefund(scope.row)"
                  >立即退款</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="
                    scope.row.refundStatus === 1 &&
                    checkPermi(['admin:order:refund'])
                  "
                  @click.native="onOrderRefundCommodity(scope.row)"
                  >立即退货退款</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="
                    scope.row.statusStr.key === 'deleted' &&
                    checkPermi(['admin:order:delete'])
                  "
                  @click.native="handleDelete(scope.row, scope.$index)"
                  >删除订单</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="scope.row.statusStr.key !== 'unPaid'"
                  @click.native="onOrderPrint(scope.row)"
                  >打印小票</el-dropdown-item
                >
                <el-dropdown-item
                  v-if="scope.row.refundStatus == 5"
                  @click.native="onOrderRefundArrived(scope.row)"
                  >退货打款</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[10, 20, 40, 60, 80]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <!--编辑-->
    <el-dialog
      title="编辑订单"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <zb-parser
        v-if="dialogVisible"
        :form-id="104"
        :is-create="isCreate"
        :edit-data="editData"
        @submit="handlerSubmit"
        @resetForm="resetForm"
      />
    </el-dialog>

    <!--记录-->
    <el-dialog title="操作记录" :visible.sync="dialogVisibleJI" width="700px">
      <el-table
        v-loading="LogLoading"
        border
        :data="tableDataLog.data"
        style="width: 100%"
      >
        <el-table-column prop="oid" align="center" label="ID" min-width="80" />
        <el-table-column
          prop="changeType"
          label="操作类型"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="changeMessage"
          label="操作记录"
          align="center"
          min-width="280"
        />

        <el-table-column
          prop="createTime"
          label="操作时间"
          align="center"
          min-width="150"
        />
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableFromLog.limit"
          :current-page="tableFromLog.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDataLog.total"
          @size-change="handleSizeChangeLog"
          @current-change="pageChangeLog"
        />
      </div>
    </el-dialog>

    <!--详情-->
    <details-from ref="orderDetail" :orderId="orderId" />

    <!-- 发送货 -->
    <order-send
      orderType="0"
      ref="send"
      :orderId="orderId"
      @submitFail="getList"
    ></order-send>

    <!-- 发送货视频号商品 -->
    <order-video-send
      ref="videoSend"
      :orderId="orderId"
      @submitFail="getList"
    ></order-video-send>

    <!--拒绝退款-->
    <el-dialog
      title="拒绝退款原因"
      v-if="RefuseVisible"
      :visible.sync="RefuseVisible"
      width="500px"
      :before-close="RefusehandleClose"
    >
      <zb-parser
        :form-id="106"
        :is-create="1"
        :edit-data="RefuseData"
        @submit="RefusehandlerSubmit"
        @resetForm="resetFormRefusehand"
      />
    </el-dialog>

    <!--立即退款-->
    <el-dialog
      title="退款处理"
      :visible.sync="refundVisible"
      width="800px"
      :before-close="refundhandleClose"
    >
      <div>
        <el-form ref="form" :model="refundData" label-width="120px">
          <el-form-item label="订单号：">
            {{ orderids }}
          </el-form-item>
          <el-form-item label="退款理由：" v-if="refundData.refundReasonWap">
            {{ refundData.refundReasonWap }}
          </el-form-item>
          <el-form-item label="退款商品信息：">
            <el-table :data="refundData.productList" style="width: 100%" border>
              <el-table-column prop="row" label="商品信息">
                <template slot-scope="scope">
                  <div>
                    <img
                      :src="scope.row.info.attrValueImage"
                      style="width: 50px"
                    />
                    <span>{{ scope.row.info.productName }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="购买数量" width="80">
                <template slot-scope="scope">
                  {{ scope.row.info.payNum }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="已发货" width="80">
                <template slot-scope="scope">
                  {{ scope.row.info.shipNum }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="退款数量" width="120">
                <template slot-scope="scope">
              
                  <el-input-number
                  :disabled='isDisabled'
                    style="width: 80px"
                    @change="changePrice($event, refundData.productList)"
                    v-model="scope.row.refundNum"
                    :precision="0"
                    :controls="false"
                    :min="0"
                    :max="isDisabled?scope.row.info.payNum:scope.row.info.payNum - scope.row.info.shipNum"
                    label="描述文字"
                  ></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <el-form-item label="退款金额：">
            <!-- {{refundData.amount}} -->
            <el-input-number
              style="width: 80px"
              v-model="refundData.amount"
              :precision="2"
              :controls="false"
              :min="0"
              
              label="描述文字"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="refundhandlerSubmit">确 定</el-button>
      </span>
      <!-- <zb-parser
        :form-id="107"
        :is-create="1"
        :edit-data="refundData"
        @submit="refundhandlerSubmit"
        v-if="refundVisible"
        @resetForm="resetFormRefundhandler"
      /> -->
    </el-dialog>

    <!-- 同意退货 148 -->
    <el-dialog
      title="退货处理"
      :visible.sync="refundCommodityVisible"
      width="500px"
      :before-close="refundCommodityhandleClose"
    >
      <zb-parser
        :form-id="148"
        :is-create="1"
        :edit-data="refundCommodityData"
        @submit="refundCommodityhandlerSubmit"
        v-if="refundCommodityVisible"
        @resetForm="resetFormRefundCommodityhandler"
      />
    </el-dialog>
    <printModel ref="printModel"></printModel>
  </div>
</template>

<script>
import {
  expressSyncExpressStatus,
  orderRefundArrived,
  refundReturn,
  orderListDataApi,
  orderStatusNumApi,
  writeUpdateApi,
  orderListApi,
  updatePriceApi,
  orderLogApi,
  orderMarkApi,
  orderDeleteApi,
  orderRefuseApi,
  orderRefundApi,
  orderPrint,
  orderRefundCompute,
} from "@/api/order";
import cardsData from "@/components/cards/index";
import zbParser from "@/components/FormGenerator/components/parser/ZBParser";
import detailsFrom from "./orderDetail";
import orderSend from "./orderSend";
import orderVideoSend from "./orderVideoSend";
import { storeStaffListApi } from "@/api/storePoint";
import Cookies from "js-cookie";
import { isWriteOff } from "@/utils";
import { orderExcelApi } from "@/api/store";
import { checkPermi } from "@/utils/permission"; // 权限判断函数
import printModel from "./printModel";
export default {
  name: "orderlistDetails",
  components: {
    cardsData,
    zbParser,
    detailsFrom,
    orderSend,
    orderVideoSend,
    printModel,
  },
  data() {
    return {
      RefuseVisible: false,
      RefuseData: {},
      orderId: "",
      refundVisible: false,
      refundData: {},
      dialogVisibleJI: false,
      tableDataLog: {
        data: [],
        total: 0,
      },
      tableFromLog: {
        page: 1,
        limit: 10,
        orderNo: 0,
      },
      LogLoading: false,
      isCreate: 1,
      editData: null,
      dialogVisible: false,
      tableData: {
        data: [],
        total: 0,
      },
      listLoading: true,
      tableFrom: {
        status: "all",
        dateLimit: "",
        keywords: "",
        page: 1,
        limit: 10,
        type: 0,
      },
      orderChartType: {},
      timeVal: [],
      fromList: this.$constants.fromList,
      fromType: [
        { value: "all", text: "全部" },
        { value: "info", text: "普通" },
        { value: "pintuan", text: "拼团" },
        { value: "bragin", text: "砍价" },
        { value: "miaosha", text: "秒杀" },
      ],
      selectionList: [],
      ids: "",
      orderids: "",
      cardLists: [],
      isWriteOff: isWriteOff(),
      proType: 0,
      active: false,
      refundCommodityVisible: false,
      refuType: null,
      refundCommodityData: {},
      intervalId: null,
      multipleSelection: [],
      refundOrderInfoRequestList:[],
      returnId:null,
      isDisabled:false
    };
  },
  filters: {
    filterStatus(e) {
      let shipNums = e.productList.map((val) => val.shipNum);
      let payNums = e.productList.map((val) => val.info.payNum);
      const shipNumsTotal = shipNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const payNumsTotal = payNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      if (
        shipNumsTotal > 0 &&
        shipNumsTotal < payNumsTotal &&
        e.refundStatus == 0
      ) {
        return "部分发货";
      } else {
        return e.statusStr.value;
      }
    },
    filterShip(e) {
      let shipNums = e.productList.map((val) => val.info.shipNum);
      let payNums = e.productList.map((val) => val.info.payNum);
      const shipNumsTotal = shipNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const payNumsTotal = payNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      if (shipNumsTotal > 0 && shipNumsTotal < payNumsTotal) {
        return "部分发货";
      } else {
        return "未发货";
      }
    },
  },
  mounted() {
    this.getList();
    this.getOrderStatusNum();
    this.intervalId = setInterval(this.refreshData, 1000 * 60);
    // this.getOrderListData();
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    changePrice(number, row) {
      
      this.refundOrderInfoRequestList = row.map((val) => {
        return {
          orderInfoId: val.id,
          refundNum: val.refundNum,
        };
      });
     
      let params = {
        refundOrderInfoRequestList: this.refundOrderInfoRequestList,
        id: this.returnId,
      };
      orderRefundCompute(params).then((res) => {
       
        
        this.refundData.amount = res;
        this.$forceUpdate()
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    printJS() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择要打印的订单");
        return false;
      }
      this.$refs.printModel.init(this.multipleSelection);
    },
    refreshData() {
      console.log(this.multipleSelection+'multipleSelection')
      this.getList();
      this.getOrderStatusNum();
    },
    async expressSync() {
      await expressSyncExpressStatus({});
      this.$message.success("同步成功");
    },
    onOrderRefundArrived(row) {
      this.$modalSure("确认打款吗").then(() => {
        orderRefundArrived({ orderId: row.orderId }).then(() => {
          this.$message.success("操作成功");
          this.tableFrom.page = 1;
          this.getList();
        });
      });
    },
    checkPermi,
    resetFormRefundhandler() {
      this.refundVisible = false;
    },
    resetFormRefusehand() {
      this.RefuseVisible = false;
    },
    resetForm(formValue) {
      this.dialogVisible = false;
    },
    // 核销订单
    onWriteOff(row) {
      this.$modalSure("核销订单吗").then(() => {
        writeUpdateApi(row.verifyCode).then(() => {
          this.$message.success("核销成功");
          this.tableFrom.page = 1;
          this.getList();
        });
      });
    },
    seachList() {
      this.tableFrom.page = 1;
      this.getList();
      this.getOrderStatusNum();
    },
    // 拒绝退款
    RefusehandleClose() {
      this.RefuseVisible = false;
    },
    onKeyInput: function (event) {
      this.returnMoney = event.target.value;
    },
    onOrderRefuse(row, type) {
      this.refuType = type; //0 退款， 1退货退款
      this.orderids = row.orderId;
      this.RefuseData = {
        orderId: row.orderId,
        reason: "",
      };
      this.RefuseVisible = true;
    },
    RefusehandlerSubmit(formValue) {
      orderRefuseApi({
        orderNo: this.orderids,
        reason: formValue.reason,
        type: this.refuType,
      }).then((data) => {
        this.$message.success("操作成功");
        this.RefuseVisible = false;
        this.getList();
      });
    },
    // 立即退款
    refundhandleClose() {
      this.refundVisible = false;
    },
    onOrderRefund(row) {
      
      
      this.returnId=row.id
      this.orderids = row.orderId;
 
      let newArr
       if(row.productList.some(val=>val.refundNum>0)){
          newArr=JSON.parse( JSON.stringify( row.productList.filter(val=>val.refundNum>0)))
       }else{
          newArr=JSON.parse( JSON.stringify(row.productList))
       }
      
       this.isDisabled=row.productList.some(val=>val.refundNum>0)?true:false
      this.refundOrderInfoRequestList = newArr.map((val) => {
        return {
          orderInfoId: val.id,
          refundNum: val.refundNum,
 
        };
      });

      this.refundData = {
        orderId: row.orderId,
        amount: row.refundPrice,
        type: "",
        productList: newArr,
        refundStatus: row.refundStatus,
        refundReasonWap:row.refundReasonWap
      };

      this.refundVisible = true;



    },
    onOrderRefundCommodity(row) {
      this.refundCommodityData = {
        orderId: row.orderId,
        amount: row.refundPrice,
        type: "",
      };
      this.orderids = row.orderId;
      this.refundCommodityVisible = true;
    },
    refundCommodityhandlerSubmit(formValue) {
      refundReturn({
        orderNo: this.orderids,
        amount: formValue.amount,
        returnAddress: formValue.returnAddress,
        returnMobile: formValue.returnMobile,
        returnName: formValue.returnName,
      }).then((data) => {
        this.$message.success("操作成功");
        this.refundCommodityVisible = false;
        this.getList();
      });
    },
    resetFormRefundCommodityhandler() {
      this.refundCommodityVisible = false;
    },
    refundCommodityhandleClose() {
      this.refundCommodityVisible = false;
    },
    refundhandlerSubmit() {
      orderRefundApi({
        amount: this.refundData.amount,
        orderNo: this.orderids,
        refundOrderInfoRequestList:this.refundOrderInfoRequestList
      }).then((data) => {
        this.$message.success("操作成功");
        this.refundVisible = false;
        this.getList();
      });
    },
    // 发送
    sendOrder(row) {
      if (row.type === 0) {
        this.$refs.send.modals = true;
        this.$refs.send.getList();
        this.$refs.send.sheetInfo(row);
      } else {
        this.$refs.videoSend.modals = true;
        if (!JSON.parse(sessionStorage.getItem("videoExpress")))
          this.$refs.videoSend.companyGetList();
      }
      this.orderId = row.orderId;
    },
    // 订单删除
    handleDelete(row, idx) {
      if (row.isDel) {
        this.$modalSure().then(() => {
          orderDeleteApi({ orderNo: row.orderId }).then(() => {
            this.$message.success("删除成功");
            this.tableData.data.splice(idx, 1);
          });
        });
      } else {
        this.$confirm(
          "您选择的的订单存在用户未删除的订单，无法删除用户未删除的订单！",
          "提示",
          {
            confirmButtonText: "确定",
            type: "error",
          }
        );
      }
    },
    // 详情
    onOrderDetails(id) {
      this.orderId = id;
      this.$refs.orderDetail.getDetail(id);
      this.$refs.orderDetail.dialogVisible = true;
    },
    // 订单记录
    onOrderLog(id) {
      this.dialogVisibleJI = true;
      this.LogLoading = true;
      this.tableFromLog.orderNo = id;
      orderLogApi(this.tableFromLog)
        .then((res) => {
         
          this.tableDataLog.data = res.list;
          this.tableDataLog.total = res.total;
          this.LogLoading = false;
        })
        .catch(() => {
          this.LogLoading = false;
        });
    },
    pageChangeLog(page) {
      this.tableFromLog.page = page;
      this.onOrderLog();
    },
    handleSizeChangeLog(val) {
      this.tableFromLog.limit = val;
      this.onOrderLog();
    },
    handleClose() {
      this.dialogVisible = false;
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
        inputValidator: (value) => {
          if (!value) return "输入不能为空";
        },
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
    // handleSelectionChange(val) {
    //   this.selectionList = val
    //   const data = []
    //   this.selectionList.map((item) => {
    //     data.push(item.orderId)
    //   })
    //   this.ids = data.join(',')
    // },
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
    // 编辑
    edit(row) {
      this.orderId = row.orderId;
      this.editData = {
        orderId: row.orderId,
        totalPrice: row.totalPrice,
        totalPostage: row.totalPostage,
        payPrice: row.payPrice,
        payPostage: row.payPostage,
        gainIntegral: row.gainIntegral,
      };
      this.dialogVisible = true;
    },
    handlerSubmit(formValue) {
      let data = {
        orderNo: formValue.orderId,
        payPrice: formValue.payPrice,
      };
      updatePriceApi(data).then((data) => {
        this.$message.success("编辑数据成功");
        this.dialogVisible = false;
        this.getList();
      });
    },
    // 列表
    getList() {
      this.listLoading = true;
      orderListApi(this.tableFrom)
        .then((res) => {
          if (res.list && res.list.length > 0) {
            res.list.forEach((val, index) => {
              // val.productList.forEach(item=>{
              let returnNUms = val.productList.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.refundNum,
                0
              );
              let payNums = val.productList.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.info.payNum,
                0
              );
              let shipNums=val.productList.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue.shipNum,
                0
              );
              // console.log(payNums, returnNUms, index);
              if (returnNUms < payNums) {
                val["sendPost"] = 1;
              } else {
                val["sendPost"] = 0;
              }
              val['shipNums']=shipNums
              val['returnNUms']=returnNUms
              val['payNums']=payNums
              // })
            });
          }
          this.tableData.data = res.list || [];
          this.tableData.total = res.total;
          this.listLoading = false;
          this.checkedCities = this.$cache.local.has("order_stroge")
            ? this.$cache.local.getJSON("order_stroge")
            : this.checkedCities;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    // 数据统计
    getOrderListData() {
      orderListDataApi({ dateLimit: this.tableFrom.dateLimit }).then((res) => {
        this.cardLists = [
          {
            name: "订单数量",
            count: res.count,
            color: "#1890FF",
            class: "one",
            icon: "icondingdan",
          },
          {
            name: "订单金额",
            count: res.amount,
            color: "#A277FF",
            class: "two",
            icon: "icondingdanjine",
          },
          {
            name: "微信支付金额",
            count: res.weChatAmount,
            color: "#EF9C20",
            class: "three",
            icon: "iconweixinzhifujine",
          },
          // { name: '余额支付金额', count: res.yueAmount,color:'#1BBE6B',class:'four',icon:'iconyuezhifujine2' }
        ];
      });
    },
    // 获取各状态数量
    getOrderStatusNum() {
      orderStatusNumApi({
        dateLimit: this.tableFrom.dateLimit,
        type: this.tableFrom.type,
      }).then((res) => {
        this.orderChartType = res;
      });
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList();
    },
    exports() {
      let data = {
        dateLimit: this.tableFrom.dateLimit,
        orderNo: this.tableFrom.orderNo,
        status: this.tableFrom.status,
        type: this.tableFrom.type,
      };
      if(this.multipleSelection.length>0){
        data.idList=this.multipleSelection.map(val=>val.id)
      }
      orderExcelApi(data).then((res) => {
        if(this.multipleSelection.length>0){
          this.multipleSelection=[]
          this.$refs.multipleTable.clearSelection();
        }

        window.open('https://cshy.store/file/'+res.fileName);
      });
    },
    //打印小票
    onOrderPrint(data) {
      orderPrint(data.orderId)
        .then((res) => {
          this.$modal.msgSuccess("打印成功");
        })
        .catch((error) => {
          this.$modal.msgError(error.message);
        });
    },
  },
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
</style>
