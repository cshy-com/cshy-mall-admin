<template>
  <div>
    <el-dialog title="选择商品" :visible.sync="dialogVisible" width="80%">
      <el-table
        :row-key="getRowId"
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        height="300"
        :highlight-current-row="true"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ fontWeight: 'bold' }"
      >
        <el-table-column :reserve-selection="true" type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="ID" min-width="50" />
        <el-table-column label="商品图" min-width="80">
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
          label="商品名称"
          prop="storeName"
          min-width="300"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品售价"
          min-width="90"
          align="center"
        />

        <el-table-column
          prop="stock"
          label="库存"
          min-width="90"
          align="center"
        />
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80, 100, 200, 300]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="nextStap">下一步</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { productLstApi } from "@/api/store";

export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      listLoading: false,
      dialogVisible: false,
      tableData: {
        data: [],
        total: 0,
      },
      multipleSelection: [],
      tableFrom: {
        page: 1,
        limit: 20,
        cateId: "",
        keywords: "",
        type: "1",
      },
    };
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    nextStap(){

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    init() {
      this.dialogVisible = true;
    },
    async getList() {
      this.listLoading = true;
      productLstApi(this.tableFrom)
        .then((res) => {
          this.listLoading = false;
          this.tableData.data = res.list;
          this.tableData.total = res.total;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
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
    getRowId(row) {
      return row.id; // row-key绑定的必须为唯一值
    },
  },

  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getList();
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
};
</script>
<style scoped></style>
