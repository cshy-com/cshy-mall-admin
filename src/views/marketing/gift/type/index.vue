<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-10-13 16:27:33
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-10-18 11:02:58
 * @FilePath: \admin\src\views\marketing\gift\type\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="divBox">
    <el-card class="box-card">
      <div class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" :inline="true" >
            <el-form-item label="礼品卡类型："  >
              <el-input
                v-model="tableFrom.name"
                placeholder="请输入礼品卡类型"
                class="selWidth"
                size="small"
                clearable
              >
              </el-input>
            </el-form-item>
            <el-form-item label="状态：" >
              <el-select
                v-model="tableFrom.stauts"
                class="m-2"
                placeholder="请选择卡状态"
                size="small"
                clearable
              >
                <el-option :label="'启用'" :value="0" />
                <el-option :label="'停用'" :value="1" />
              </el-select>
            </el-form-item>

            <el-form-item  >
              <el-button type="primary" size="small" @click="getList"
                >查询</el-button
              ><el-button type="primary" size="small" @click="addHandle"
                >新增</el-button
              >
            
            </el-form-item>
            
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
        :header-cell-style="{ fontWeight: 'bold' }"
        :row-key="
          row => {
            return row.orderId;
          }
        "
      >
        <el-table-column prop="name" label="礼品卡类型" min-width="210">
        </el-table-column>
        <el-table-column prop="banner" label="banner" min-width="110">
          <template slot-scope="scope">
          
            <el-image
            v-if="scope.row.banner"
            preview-teleported
            style="width: 50px; height: 50px"
            :src="scope.row.banner"
            fit="contain"
            :preview-src-list="[scope.row.banner]"
          />
             </template
        ></el-table-column>

        <el-table-column prop="status" label="卡状态" min-width="110">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-text="启用"
              inactive-text="停用"
              :active-value="0"
              :inactive-value="1"
              @change="changeStatus(scope.row)"
            />
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" min-width="110" />

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
              @click="addHandle(scope.row)"
              >编辑</el-button
            >

            <el-button
              type="text"
              size="small"
              class="mr10"
              @click="associatedGoods(scope.row)"
              >关联商品</el-button
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
    <giftTypeAdd ref="giftTypeAdd" @submitFail="getList" />
  </div>
</template>

<script>
import giftTypeAdd from "./../giftTypeAdd.vue";
import {
  giftCardTypePage,
  giftCardTypeDelete,
  giftCardTypeUpdateStatus,
  giftCardProductBatchAdd
} from "@/api/marketing.js";
export default {
  name: "CouponList",
  components: { giftTypeAdd },
  data() {
    return {
      tableFrom: {
        name: null,
        stauts: null,

        current: 1,
        size: 20
      },
      listLoading: false,
      tableData: {
        data: [],

        total: 0
      },
      ruleForm: {
        checked: []
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      giftCardTypePage(this.tableFrom)
        .then(res => {
          this.tableData.data = res.list;

          this.tableData.total = res.total;
          this.listLoading = false;
        })
        .catch(res => {
          this.listLoading = false;
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
    handleDelete(row) {
      this.$modalSure(`删除 序列号 为 ${row.serialNo} 的数据`).then(() => {
        giftCardTypeDelete(row.id).then(() => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    // 停用启用
    changeStatus(row) {
      this.$modalSure(
        `${row.status == 1 ? "停用" : "启用"} 礼品卡类型 为 ${row.name} 的数据`
      )
        .then(() => {
          giftCardTypeUpdateStatus({
            id: row.id,
            status: row.status
          }).then(() => {
            this.$message.success("操作成功");
            this.getList();
          });
        })
        .catch(() => {
          row.status = row.status == 1 ? 0 : 1;
        });
    },
    associatedGoods(tabRow) {
      const _this = this;
      if (tabRow.productIdList) {
        _this.ruleForm.checked = tabRow.productIdList.map(val => {
          return {
            id: val
          };
        });
      }else{
        _this.ruleForm.checked =[] 
      }
      this.$modalGoodList(
        row => {
          _this.ruleForm.checked = row;
          giftCardProductBatchAdd(
            tabRow.id,
            _this.ruleForm.checked.map(val => val.id)
          ).then(res => {
            this.$message.success("操作成功");
            this.getList();
          });
        },
        "many",
        _this.ruleForm.checked
      );
    },
    addHandle(row) {
      this.$refs.giftTypeAdd.init(row);
    }
  }
};
</script>

<style scoped></style>
