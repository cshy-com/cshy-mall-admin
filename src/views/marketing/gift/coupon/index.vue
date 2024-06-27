<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="clearfix">
        <div class="container">
          <el-form size="small" label-width="120px" :inline="true">
            <el-form-item label="提货编码：">
              <el-input
                v-model="tableFrom.pickupCode"
                placeholder="请输入提货编码"
                class="selWidth"
                size="small"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item label="序列号：">
              <el-input
                v-model="tableFrom.serialNo"
                placeholder="请输入序列号"
                class="selWidth"
                size="small"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item label="卡状态：">
              <el-select
                v-model="tableFrom.cardStatus"
                class="m-2"
                placeholder="请选择卡状态"
                size="small"
                clearable
              >
                <el-option :label="'启用'" :value="0" />
                <el-option :label="'停用'" :value="1" />
              </el-select>
            </el-form-item>
            <el-form-item label="使用状态：">
              <el-select
                v-model="tableFrom.usingStatus"
                class="m-2"
                placeholder="请选择卡状态"
                size="small"
                clearable
              >
                <el-option :label="'待导出'" :value="0" />
                <el-option :label="'已导出，待使用'" :value="1" />
                <el-option :label="'已使用'" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="search"
                >查询</el-button
              >
              <el-button type="primary" size="small" @click="batchAdd"
                >批量新增</el-button
              >
              <el-button type="primary" size="small" @click="exportCoupon">{{
                multipleSelection.length > 0 ? "批量导出所选项" : "批量导出"
              }}</el-button>
              <el-button type="primary" size="small" @click="batchUpdate"
                >批量修改礼品卡类型</el-button
              >   
            </el-form-item>
            <div v-if="multipleSelection.length > 0">
已选择：{{ multipleSelection.length }}条
            </div>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        size="mini"
        class="table"
        highlight-current-row
        height="600"
        :header-cell-style="{ fontWeight: 'bold' }"
        :row-key="
          row => {
            return row.id;
          }
        "
     
        reserve-selection="true"
        @selection-change="handleSelectionChange"
        ><el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="serialNo" label="序列号" min-width="100">
        </el-table-column>
        <el-table-column prop="pickupCode" label="提货编码" min-width="100" />
        <!-- <el-table-column prop="pickupSecret" label="提货密码" min-width="110" /> -->
        <el-table-column
          prop="giftCardTypeName"
          label="礼品卡类型"
          min-width="110"
        />

        <el-table-column prop="cardStatus" label="卡状态" min-width="110">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.cardStatus"
              active-text="启用"
              inactive-text="停用"
              :active-value="0"
              :inactive-value="1"
              @change="changeStatus(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column prop="usingStatus" label="使用状态" min-width="110">
          <template slot-scope="scope">
            <!-- <el-switch
              v-model="scope.row.usingStatus"
              active-text="待使用"
              inactive-text="已使用"
              :active-value="0"
              :inactive-value="1"
              :disabled="true"
              :width="80"
            /> -->

            <el-tag type="success" v-if="scope.row.usingStatus == 0"
              >待导出</el-tag
            >
            <el-tag type="success" v-if="scope.row.usingStatus == 1"
              >已导出，待使用</el-tag
            >
            <el-tag type="info" v-if="scope.row.usingStatus == 2"
              >已使用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="qrcode" label="券二维码预览" min-width="110">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.qrcode"
              preview-teleported
              style="width: 50px; height: 50px"
              :src="scope.row.qrcode"
              fit="contain"
              :preview-src-list="[scope.row.qrcode]"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="110" />
        <el-table-column prop="effectiveTime" label="生效时间" min-width="110" />

        <el-table-column
          prop="orderType"
          label="操作"
          min-width="110"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >

            <el-button
              type="text"
              size="small"
              class="mr10"
              @click="viewPassword(scope.row)"
            >
              查看密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80,100,200,300,400,500]"
          :page-size="tableFrom.size"
          :current-page="tableFrom.current"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <couponAdd ref="couponAddRef" @submitFail="getList" />
    <couponUpdate ref="couponUpdateRef" @submitFail="getList" />
  </div>
</template>

<script>
import couponAdd from "./../couponAdd.vue";
import couponUpdate from './../couponUpdate.vue'
import {
  giftCardPage,
  giftCardDelete,
  giftCardUpdateStatus,
  giftCardViewSecret
} from "@/api/marketing.js";
import modal from "@/plugins/modal";
import { exportFile } from "@/utils/newToExcel";
export default {
  name: "CouponList",
  components: { couponAdd,couponUpdate },
  data() {
    return {
      tableFrom: {
        pickupCode: null,
        cardStatus: null,
        usingStatus: null,
        current: 1,
        size: 20,
        serialNo:null
      },
      listLoading: false,
      tableData: {
        data: [],
        total: 0
      },
      passWordModel: false,
      passWordTitle: "",
      multipleSelection: [],
     
    };
  },
  mounted() {
    this.getList();
  },
  methods: { 

    search(){
     
      this.getList(1)
    },
    batchUpdate(){
this.$refs.couponUpdateRef.modals=true
    },
    handleUpdate(row){

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async exportCoupon() {
      let params;
      if (this.multipleSelection.length > 0) {
        params = { idList: this.multipleSelection.map(val => val.id) };
      } else {
        params = JSON.parse(JSON.stringify(this.tableFrom));
      }

      delete params.current, delete params.size;
      await exportFile("/api/export/giftCard", params);
      this.multipleSelection = [];

      this.$nextTick(() => {
        setTimeout(() => {
          this.getList();
        }, 3000);
      });
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.current = num ? num : this.tableFrom.current;
      giftCardPage(this.tableFrom)
        .then(res => {
          this.tableData.data = res.list;
          this.itemKey = Math.random();
          this.tableData.total = res.total;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
        });
    },
    pageChange(page) {
      this.tableFrom.current = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.size = val;
      this.getList();
    },

    batchAdd() {
      this.$refs.couponAddRef.modals = true;
    },
    handleDelete(row) {
      this.$modalSure(`删除 序列号 为 ${row.serialNo} 的数据`).then(() => {
        giftCardDelete(row.id).then(() => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    // 停用启用
    changeStatus(row) {
      this.$modalSure(
        `${row.cardStatus == 1 ? "停用" : "启用"} 序列号 为 ${
          row.serialNo
        } 的数据`
      ).then(() => {
        giftCardUpdateStatus({
          id: row.id,
          status: row.cardStatus
        })
          .then(() => {
            this.$message.success("操作成功");
            this.getList();
          })
          .catch(() => {
            row.cardStatus = row.cardStatus == 1 ? 0 : 1;
          });
      });
    },
    async viewPassword(row) {
      let res = await giftCardViewSecret({
        id: row.id
      });
      modal.alertSuccess(`序列号为${row.serialNo}的密码是:${res}`);
    }
  }
};
</script>

<style scoped></style>
