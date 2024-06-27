<template>
  <div class="divBox relative">
    <el-card class="box-card">
      <div class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" :inline="true">
            <el-form-item>
              <el-button type="primary" size="small" @click="handSignSync"
                >同步短信签名</el-button
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
            return row.orderNo;
          }
        "
      >
        <el-table-column label="Id" min-width="110" prop="id">
        </el-table-column>
        <el-table-column label="模板名称" min-width="110" prop="tempName">
        </el-table-column>
        <el-table-column label="模板类型" min-width="110" prop="businessType">
        </el-table-column>

        <el-table-column label="审核状态" min-width="110" prop="status">
        </el-table-column>
        <el-table-column label="创建时间" min-width="110" prop="createTime">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80]"
          :page-size="tableFrom.size"
          :current-page="tableFrom.current"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { smsSignPage, smsSignSync } from "@/api/systemSetting";

export default {
  components: {},
  data() {
    return {
      tableFrom: {
        size: 20,
        current: 1
      },
      tableData: {
        data: [],
        total: 0
      },
      listLoading: true
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async handSignSync() {
      await smsSignSync({});
      this.$message.success("同步成功");
      this.getList();
    },
    // 列表
    getList() {
      this.listLoading = true;
      smsSignPage(this.tableFrom)
        .then(res => {
          this.tableData.data = res.list || [];
          this.tableData.total = res.total;
          this.listLoading = false;
        })
        .catch(() => {
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
