<template>
  <div class="mod-config">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter="getDataList()"
      size="default"
      @submit.native.prevent
    >
      <el-form-item label="过期时间" prop="expireTime">
        <el-date-picker
          v-model="dataForm.expireTime"
          type="date"
          placeholder="请选择过期时间"
          format="yyyy-MM-dd"
          data-format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
      /></el-form-item>
      <el-form-item label="积分值" prop="integral">
        <el-input-number @keyup.enter.native="searchList"
          v-model="dataForm.integral"
          :min="1"
          :max="9999"
          :step-strictly="true"
          :controls="false"
          placeholder="1~9999"
        ></el-input-number
      ></el-form-item>
      <el-form-item label="导出状态" prop="isExported">
        <el-select v-model="dataForm.isExported" placeholder="请选择">
          <el-option label="全部" :value="undefined"> </el-option>
          <el-option label="已导出" :value="true"> </el-option>
          <el-option label="未导出" :value="false"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用状态" prop="isUsed">
        <el-select v-model="dataForm.isUsed" placeholder="请选择">
          <el-option label="全部" :value="undefined"> </el-option>
    
          <el-option label="已使用" :value="true"> </el-option>
          <el-option label="未使用" :value="false"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandleBatch()"
          >批量新增</el-button
        >
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="primary" @click="batchDownLoad()">批量下载</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      row-key="id"
      v-loading="dataListLoading"
      style="width: 100%"
      :row-key="getRowKey"
      @selection-change="handleSelectionChange"
    >
      <el-table-column :reserve-selection="true" type="selection" width="55">
      </el-table-column>

      <el-table-column prop="couponCode" label="积分券号"></el-table-column>
      <!-- <el-table-column
        prop="firstPartyName"
        label="所属银行"
        width="180"
      ></el-table-column> -->

      <el-table-column prop="integral" label="积分值" width="100">
      </el-table-column>
      <el-table-column prop="expireTime" label="失效日期" width="100">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180">
      </el-table-column>

      <el-table-column prop="isExported" label="导出状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.isExported">已导出</el-tag>
          <el-tag v-if="!scope.row.isExported">未导出</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="使用状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.isUsed">已使用</el-tag>
          <el-tag v-if="!scope.row.isUsed" type="success">未使用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="qrCode" label="二维码" width="100">
        <template #default="scope">
          <img
            @click.prevent="ticketQrCodeView(scope.row)"
            :src="scope.row.qrCode"
            style="width: 50px; cursor: pointer"
          />
          <!-- <el-tag v-if="scope.row.ifFailure == 1">已失效</el-tag>
          <el-tag v-if="scope.row.ifFailure == 0" type="success">未失效</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        label="操作"
      >
        <template #default="scope">
          <!-- <el-button
            link
            type="primary"
            @click.prevent="ticketQrCodeView(scope.row)"
            >查看二维码</el-button
          > -->
          <el-button
            link
            type="text"
            v-if="!scope.row.isExported && !scope.row.isUsed"
            @click="addOrUpdateHandle(scope.row)"
            >修改</el-button
          >

          <el-button
            link
            type="text"
            v-if="!scope.row.isExported && !scope.row.isUsed"
            @click.prevent="deleteHandle(scope.row.id)"
            >删除</el-button
          >
          <!-- <el-button
            link
            type="text"
            v-if="!scope.row.isExported"
            @click.prevent="ticketExportObj(scope.row.id)"
            >导出</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        :page-sizes="[20, 40, 60, 80]"
        :page-size="pageSize"
        :current-page="pageIndex"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>

    <!-- 弹窗, 新增 / 修改 -->
    <receiveAddOrUpdate
      v-if="addOrUpdateVisible"
      ref="addOrUpdateRef"
      :isBatch="isBatch"
      @refreshDataList="getDataList"
    >
    </receiveAddOrUpdate>
    <el-dialog :visible.sync="showDialog" title="查看" width="30%">
      <div class="show-dialog-center">
        <img :src="code" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { integralPage, integralDetete, ticketQrCode } from "@/api/store.js";
import { downloadZip } from "@/utils/request";

import receiveAddOrUpdate from "./receiveAddOrUpdate.vue";
import axios from "axios";
import { getToken } from "@/utils/auth";
export default {
  components: { receiveAddOrUpdate },
  data() {
    return {
      isBatch: false,
      code: "",
      showDialog: false,
      bankOptions: [],
      dataForm: {
        expireTime: null,
        integral: undefined,
        isUsed:undefined,
        isExported:undefined
      },
      dataList: [],
      totalPage: 0,
      dataListLoading: false,
      addOrUpdateVisible: false,
      pageSize: 10,
      pageIndex: 1,
      multipleSelection: [],
    };
  },

  methods: {
    getRowKey(row) {
      return row.id; // 假设每行数据都有唯一的id字段
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageChange(page) {
      this.pageIndex = page;
      this.getDataList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataList();
    },
    async getDataList() {
      this.dataListLoading = true;
      try {
        let res = await integralPage({
          current: this.pageIndex,
          size: this.pageSize,

          ...this.dataForm,
        });

        this.dataList = res.list;
        this.totalPage = res.total;
      } catch (e) {
        console.log(e);
      }

      // 调用接口赋值数据
      this.dataListLoading = false;
    },
    searchList() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 新增 / 修改
    addOrUpdateHandle(row) {
      this.isBatch = false;
      this.addOrUpdate(row);
    },
    addOrUpdate(row) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdateRef.init(row);
      });
    },
    // 批量新增
    addOrUpdateHandleBatch() {
      this.isBatch = true;
      this.addOrUpdate();
    },
    ticketQrCodeView(row) {
      this.code = row.qrCode;
      this.showDialog = true;
    },
    ticketExportObj(id) {
      downloadZip("get", `/integral/coupon/download/${id}`);
      setTimeout(() => {
        this.getDataList();
      }, 1000);
    },
    // 批量下载
    batchDownLoad() {
      let params;
      if (this.multipleSelection.length == 0) {
        params = {
          ...this.dataForm,
        };
      } else {
        params = {
          idList: this.multipleSelection.map((item) => item.id),
        };
      }
      downloadZip("post", `admin/integral/coupon/export`, params);
      setTimeout(() => {
        this.getDataList();
      }, 1000);
    },

    // 删除
    deleteHandle(id) {
      this.$modalSure().then(async () => {
        try {
          await integralDetete(id);
          this.$message.success("删除成功");

          this.getDataList();
        } catch (e) {}
      });
    },
  },

  mounted() {
    this.getDataList();
  },
};
</script>
<style lang="scss" scoped>
.mod-config {
  margin: 20px;
}

.show-dialog-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
