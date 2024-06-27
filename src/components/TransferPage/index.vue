<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <el-form :inline="true" :model="staffTemp">
        <el-form-item label="商品分类：">
            <el-cascader v-model="staffTemp.cateId" :options="merCateList" :props="props" clearable class="selWidth mr20" @change="getStaffList(1)"/>
          </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="staffTemp.keywords"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getStaffList">查找</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-table
            ref="staffTable"
            v-loading="listLoading"
            :row-key="getRowKey"
            :data="staffList"
            border
            fit
            highlight-current-row
            @selection-change="handleStaffChange"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="55"
              :selectable="selectable"
            ></el-table-column>
            <el-table-column label="商品名称" align="center">
              <template slot-scope="{ row }">
                <span>{{ row.storeName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="商品主图" align="center">
              <template slot-scope="{ row }">
                <img :src="row.image" style="width:50px;height:50px;" />
              </template>
            </el-table-column>
            <el-table-column label="价格" align="center">
              <template slot-scope="{ row }">
                <span>
                  {{ row.price }}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              :page-sizes="[20, 40, 60, 80]"
              :page-size="staffTemp.limit"
              :current-page="staffTemp.page"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="pageChange"
            />
          </div>
        </el-col>
        <el-col :span="2" style="text-align:center;">
          <el-button
            @click="addStaff"
            type="primary"
            :disabled="!staffData.length"
            icon="el-icon-arrow-right"
            circle
          ></el-button>
          <el-button
            @click="removeStaff"
            type="primary"
            :disabled="!selectedStaffData.length"
            icon="el-icon-arrow-left"
            circle
            style="margin-left: 0;margin-top: 10px;"
          ></el-button>
        </el-col>
        <el-col :span="11">
          <el-table
            ref="selectedStaffTable"
            :row-key="getRowKey"
            :data="selectedStaffList"
            border
            fit
            highlight-current-row
            @selection-change="handleSelectedStaffChange"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="55"
            ></el-table-column>
            <el-table-column label="商品名称" align="center">
              <template slot-scope="{ row }">
                <span>{{ row.storeName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="商品主图" align="center">
              <template slot-scope="{ row }">
                <img :src="row.image" style="width:50px;height:50px;" />
              </template>
            </el-table-column>
            <el-table-column label="价格" align="center">
              <template slot-scope="{ row }">
                <span>
                  {{ row.price }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="秒杀价" align="center">
              <template slot-scope="{ row }">
                <el-input v-model="row.price"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col> </el-row
    >
  
  
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>

<script>
import {
  productLstApi,
  productDeleteApi,
  categoryApi,
  putOnShellApi,
  offShellApi,
  productHeadersApi
} from "@/api/store";

export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      merCateList: [],
      dialogVisible: false,
      listLoading: false,
      staffTemp: {
        cateId: "",
        keywords: "",
        type: "1",
        page: 1,
        limit: 20
      },
      props: {
        children: 'child',
        label: 'name',
        value: 'id',
        emitPath: false
      },
      total: 0,
      staffList: [], //左边数据
      selectedStaffList: [], // 右边的数据
      staffData: [], //左边选中的数据
      selectedStaffData: [], //右边选中的数据
      tableKey: 0
    };
  },
  methods: {
    getCategorySelect() {
      categoryApi({ status: -1, type: 1 }).then(res => {
        this.merCateList = res
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    selectable(row, index) {
      if (row.status == "CheckFail" || row.status == "CheckOk") {
        return false; // 禁用
      } else {
        return true; //不禁用
      }
    },

    getRowKey(row) {
      return row.id;
    },
    pageChange(page) {
      this.staffTemp.page = page;
      this.getStaffList();
    },
    handleSizeChange(val) {
      this.staffTemp.limit = val;
      this.getStaffList();
    },
    // 从后台获取左边表格的数据
    getStaffList() {
      this.listLoading = true;
      productLstApi(this.staffTemp).then(res => {
        if (res.list.length === 0) {
          this.$message.error("暂无数据");
        }
        this.listLoading = false;
        this.staffList = res.list;

        for (let i = 0; i < this.staffList.length; i++) {
          for (let j = 0; j < this.selectedStaffList.length; j++) {
            if (
              this.staffList[i] &&
              this.selectedStaffList[j] &&
              this.staffList[i].id === this.selectedStaffList[j].id
            ) {
              this.staffList.splice(i, 1);
            }
          }
        }
        this.total = res.total;
      });
    },
    // 将左边表格选择项存入staffData中
    handleStaffChange(rows) {
      this.staffData = [];
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.staffData.push(row);
          }
        });
      }
    },
    // 左边表格选择项移到右边
    addStaff() {
      setTimeout(() => {
        this.$refs["staffTable"].clearSelection();
        this.$refs["selectedStaffTable"].clearSelection();
      }, 0);
      let repeat = false;
      this.selectedStaffList.forEach(item => {
        if (this.staffData[0] && item.id === this.staffData[0].id) {
          repeat = true;
          this.$message.info("此员工已添加");
          return;
        }
      });
      if (repeat === false) {
        this.staffData.forEach(item => {
          this.selectedStaffList.push(item);
        });
        for (let i = 0; i < this.staffList.length; i++) {
          for (let j = 0; j < this.staffData.length; j++) {
            if (
              this.staffList[i] &&
              this.staffData[j] &&
              this.staffList[i].id === this.staffData[j].id
            ) {
              this.staffList.splice(i, 1);
            }
          }
        }
      }
    },
    // 右边表格选择项移到左边
    removeStaff() {
      setTimeout(() => {
        this.$refs["staffTable"].clearSelection();
        this.$refs["selectedStaffTable"].clearSelection();
      }, 0);
      this.selectedStaffData.forEach(item => {
        this.staffList.push(item);
      });
      for (let i = 0; i < this.selectedStaffList.length; i++) {
        for (let j = 0; j < this.selectedStaffData.length; j++) {
          if (
            this.selectedStaffList[i] &&
            this.selectedStaffData[j] &&
            this.selectedStaffList[i].id === this.selectedStaffData[j].id
          ) {
            this.selectedStaffList.splice(i, 1);
          }
        }
      }
    },
    // 将右边表格选择项存入selectedStaffData中
    handleSelectedStaffChange(rows) {
      this.selectedStaffData = [];
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.selectedStaffData.push(row);
          }
        });
      }
    },
    // 提交
    modifyStaff() {
      let isEmpty = false;
      this.selectedStaffList.forEach(item => {
        if (!item.staffTypeId) {
          this.$message.info("请选择类型");
          isEmpty = true;
          return;
        }
      });
      if (isEmpty === false) {
        editStaff(this.selectedStaffList, this.deviceQuery.id).then(res => {
          this.staffListVisible = false;
          this.$message.success("修改成功");
        });
      }
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},

  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {
    
    this.getCategorySelect()
  },
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发执行
};
</script>
<style scoped></style>
