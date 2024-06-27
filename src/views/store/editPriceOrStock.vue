<template>
  <div>
    <el-dialog
      title="修改价格、库存"
      :visible.sync="dialogVisible"
      width="800px"
       
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="suk" label="规格" width="50"> </el-table-column>
        <el-table-column prop="price" label="销售价" width="100"
          ><template slot-scope="scope">
            <el-input-number
              v-model="scope.row.price"
              :min="0"
              :max="999999999999"
              :controls="false"
              label="销售价"
              :precision="2"
              style="width: 80px"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="成本价"  width="100">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.cost"
              :precision="2"
              :min="0"
              :max="999999999999"
              :controls="false"
              label="成本价"
              style="width: 80px"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="otPrice" label="市场价"  width="100">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.otPrice"
              :controls="false"
              :precision="2"
              :min="0"
              :max="999999999999"
              style="width: 80px"
              label="市场价"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存"  width="100"> </el-table-column>
        <el-table-column prop="num" label="增加/删减"  width="100">
          <template slot-scope="scope">
            <el-input-number
              :controls="false"
              v-model="scope.row.num"
              style="width: 80px"
              :precision="0"
              label="库存"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStockOrPrice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { updateAttrValue } from "@/api/store.js";
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      prodInfo: null,
    };
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    open(row) {
      this.prodInfo = row;
      this.tableData = [];
      this.dialogVisible = true;

      this.prodInfo.attrValue.forEach((val) => {
        this.tableData.push({
          id: val.id,
          cost: val.cost,
          num: val.num||0,
          price: val.price,
          stock: val.stock,
          otPrice: val.otPrice,
          suk: val.suk,
        });
      });
    },
    saveStockOrPrice() {
      let paramsTable = this.tableData.map((val) => {
        return {
          id: val.id,
          cost: val.cost,
          num: val.num||0,
          price: val.price,

          otPrice: val.otPrice,
        };
      });
      let params = {
        id: this.prodInfo.id,
        attrValueUpdateRequestList: paramsTable,
      };

      updateAttrValue(params).then((res) => {
        this.$emit("updateList");
        this.dialogVisible = false;
        this.$message.success("修改成功");
      });
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
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
