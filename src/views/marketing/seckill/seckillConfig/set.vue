<template>
  <div class="divBox">
   

    <el-card class="box-card" style="margin-top: 20px;">
      <el-form>
        <el-form-item label="活动名称：">
          {{ detailInfo.name }}
        </el-form-item>
        <el-form-item label="活动时间：">
          {{ detailInfo.time }}
        </el-form-item>
        <el-form-item label="状态：">
          {{ detailInfo.statusName }}
        </el-form-item>
        <el-form-item label="活动商品：">
          <div>
            <el-button
              size="small"
              type="primary"
              class="mr10"
              @click="addGoods"
            >
              添加商品</el-button
            >
            <el-table :data="tableData.data" stripe style="width: 80%">
              <el-table-column label="商品图片" min-width="80">
                <template slot-scope="scope">
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 36px; height: 36px"
                      :src="scope.row.image"
                      :preview-src-list="[scope.row.image]"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="商品标题"
                prop="title"
                min-width="300"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column label="原价" prop="otPrice" min-width="100" />
              <el-table-column label="秒杀价" min-width="100" prop="price">
               
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
      </el-form>
    
    </el-card>
   
    <TransferPage ref="transferPage"></TransferPage>
    
  </div>
</template>

<script>
import TransferPage from "@/components/TransferPage/index";
import {
  seckillStoreListApi,
  seckillStoreDeleteApi,
  seckillStoreUpdateApi,
  seckillStoreStatusApi
} from "@/api/marketing";
import { getSeckillList } from "@/libs/public";
import { checkPermi } from "@/utils/permission"; // 权限判断函数
export default {
 
  components: { TransferPage },
  data() {
    return {
    
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      tableFrom: {
        page: 1,
        limit: 20,
        timeId: "",
        status: "",
        keywords: ""
      },
      seckillTime: [],
      detailInfo: {}
    };
  },
  mounted() {
    getSeckillList().then(res => {
      this.seckillTime = res.list;
      this.detailInfo = res.list.filter(
        val => val.id == this.$route.params.timeId
      )[0];
    });
    this.tableFrom.timeId = Number(this.$route.params.timeId) || "";
    this.getList();
  },
  methods: {
    addGoods() {
      this.$refs.transferPage.dialogVisible=true
      this.$refs.transferPage.getStaffList();
    },
    checkPermi,
    // 订单删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        seckillStoreDeleteApi({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.tableData.data.splice(idx, 1);
        });
      });
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      this.tableFrom.type=1
      seckillStoreListApi(this.tableFrom)
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
    onchangeIsShow(row) {
      seckillStoreStatusApi({ id: row.id, status: row.status })
        .then(async () => {
          this.$message.success("修改成功");
          this.getList();
        })
        .catch(() => {
          row.status = !row.status;
        });
    }
  }
};
</script>

<style scoped>
.el-table__body {
  width: 100%;
  table-layout: fixed !important;
}
</style>
