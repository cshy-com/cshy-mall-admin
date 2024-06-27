<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-01-10 17:11:20
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-06-21 10:44:45
 * @FilePath: \cshy-wechatd:\work\cshy-admin\src\views\store\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="divBox relative">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs
          v-model="tableFrom.type"
          @tab-click="seachList"
          v-if="checkPermi(['admin:product:tabs:headers'])"
        >
          <el-tab-pane
            :label="item.name + '(' + item.count + ')'"
            :name="item.type.toString()"
            v-for="(item, index) in headeNum"
            :key="index"
          />
        </el-tabs>
        <div class="container mt-1">
          <el-form inline size="mini">
            <el-form-item label="商品分类：">
              <el-cascader
                v-model="tableFrom.cateId"
                :options="merCateList"
                :props="props"
                clearable
                class="selWidth mr20"
                @change="seachList"
                size="mini"
              />
            </el-form-item>
            <el-form-item label="商品搜索：">
              <el-input
                v-model="tableFrom.keywords"
                placeholder="请输入商品名称，关键字，商品ID"
                class="selWidth"
                size="mini"
                clearable @keyup.enter.native="seachList" 
              >
                <el-button 
                  slot="append"
                  icon="el-icon-search"
                  @click="seachList"
                  size="mini"
                  v-hasPermi="['admin:product:list']"
                />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <router-link :to="{ path: '/store/list/creatProduct' }">
          <el-button
            size="mini"
            type="primary"
            class="mr10"
            v-hasPermi="['admin:product:save']"
            >添加商品</el-button
          >
        </router-link>
        <!-- <el-button
          size="mini"
          type="success"
          class="mr10"
          @click="onCopy"
          v-hasPermi="['admin:product:save']"
          >商品采集</el-button
        > -->
        <el-button
          size="mini"
          icon="el-icon-upload2"
          @click="exports"
          v-hasPermi="['admin:export:excel:product']"
          >导出</el-button
        >
        <el-button size="mini" type="primary" @click="batchChangCate(0)"
          >批量修改分类</el-button
        >
        <el-button size="mini" type="primary" @click="batchChangCate(1)"
          >批量运费模板</el-button
        >

        <el-dropdown size="mini" @command="handleCommand">
          <span
            class="el-dropdown-link"
            style="cursor: pointer; color: #409eff; margin-left: 20px"
          >
            更多操作<i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">设为精选</el-dropdown-item>
            <el-dropdown-item command="1">设为新品</el-dropdown-item>
            <el-dropdown-item command="2">设为推荐</el-dropdown-item>
            <el-dropdown-item command="3">设为热卖</el-dropdown-item>
            <el-dropdown-item command="4">取消设为精选</el-dropdown-item>
            <el-dropdown-item command="5">取消设为新品</el-dropdown-item>
            <el-dropdown-item command="6">取消设为推荐</el-dropdown-item>
            <el-dropdown-item command="7">取消设为热卖</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        :highlight-current-row="true"
        :header-cell-style="{ fontWeight: 'bold' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="30"> </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品分类：">
                <span
                  v-for="(item, index) in props.row.cateValues.split(',')"
                  :key="index"
                  class="mr10"
                  >{{ item }}</span
                >
              </el-form-item>
              <el-form-item label="市场价：">
                <span>{{ props.row.otPrice }}</span>
              </el-form-item>
              <el-form-item label="成本价：">
                <span>{{ props.row.cost }}</span>
              </el-form-item>
              <el-form-item label="收藏：">
                <span>{{ props.row.collectCount }}</span>
              </el-form-item>
              <el-form-item label="虚拟销量：">
                <span>{{ props.row.ficti }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" min-width="50" />
        <el-table-column label="商品分类" props="cateValues">
          <template slot-scope="scope">
            <span
              v-for="(item, index) in scope.row.cateValues.split(',')"
              :key="index"
              class="mr10"
              >{{ item }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="商品编号" props="barCode" width="100">
        <template slot-scope="scope">
          {{ scope.row.attrValue&&scope.row.attrValue.length>0?scope.row.attrValue[0].barCode:'' }}
        </template>
      </el-table-column>
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
          prop="sales"
          label="销量"
          min-width="90"
          align="center"
        >
          <template slot="header" slot-scope="scope">
            <div class="header-title" @click="changeSale">
              <span>销量</span>
              <span class="header-icon">
                <i
                  class="el-icon-caret-top"
                  :class="{ active: tableFrom.salesOrder == 'asc' }"
                ></i>
                <i
                  class="el-icon-caret-bottom"
                  :class="{ active: tableFrom.salesOrder == 'desc' }"
                ></i>
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品售价"
          min-width="120"
          align="center"
        >
          <template slot="header" slot-scope="scope">
            <div class="header-title" @click="changePrice">
              <span>商品售价</span>
              <span class="header-icon">
                <i
                  class="el-icon-caret-top"
                  :class="{ active: tableFrom.priceOrder == 'asc' }"
                ></i>
                <i
                  class="el-icon-caret-bottom"
                  :class="{ active: tableFrom.priceOrder == 'desc' }"
                ></i>
              </span>
            </div>
          </template>
          <template slot-scope="scope">
            <span>
              {{ scope.row.price }}
              <i
                style="cursor: pointer"
                class="el-icon-edit"
                @click="aditStockOrPrice(scope.row)"
              ></i>
            </span>
          </template>
        </el-table-column>

        <!-- <el-table-column
          prop="cost"
          label="成本价"
          min-width="90"
          align="center"
        /> -->

        <el-table-column
          prop="stock"
          label="库存"
          min-width="90"
          align="center"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.stock }}
              <i
                style="cursor: pointer"
                class="el-icon-edit"
                @click="aditStockOrPrice(scope.row)"
              ></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          min-width="70"
          align="center"
        />

        <el-table-column label="添加时间" min-width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.addTime | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="80" fixed="right">
          <template
            slot-scope="scope"
            v-if="checkPermi(['admin:product:up', 'admin:product:down'])"
          >
            <el-switch
              :disabled="Number(tableFrom.type) > 2"
              v-model="scope.row.isShow"
              :active-value="true"
              :inactive-value="false"
              active-text="上架"
              inactive-text="下架"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <router-link
              :to="{ path: '/store/list/creatProduct/' + scope.row.id + '/1' }"
            >
              <el-button
                type="text"
                size="mini"
                class="mr10"
                v-hasPermi="['admin:product:info']"
                >详情</el-button
              >
            </router-link>
            <router-link
              :to="{ path: '/store/list/creatProduct/' + scope.row.id }"
            >
              <el-button
                type="text"
                size="mini"
                class="mr10"
                v-hasPermi="['admin:product:update']"
                >编辑</el-button
              >
            </router-link>
            <el-button
              v-if="tableFrom.type === '5'"
              type="text"
              size="mini"
              @click="handleRestore(scope.row.id, scope.$index)"
              v-hasPermi="['admin:product:restore']"
              >恢复商品</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="handleDelete(scope.row.id, tableFrom.type)"
              v-hasPermi="['admin:product:delete']"
              >{{ tableFrom.type === "5" ? "删除" : "加入回收站" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[20, 40, 60, 80, 100, 200, 300, 500, 1000, 2000]"
          :page-size="tableFrom.limit"
          :current-page="$store.state.settings.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <el-dialog
      :title="modelTitle"
      :visible.sync="dialogVisibleCate"
      :close-on-click-modal="false"
      width="800px"
      class="taoBaoModal"
      :before-close="handleCloseCate"
    >
      <div v-if="chanType == 0">
        <span>选择分类:</span>
        <el-cascader
          v-model="cateIds"
          :options="merCateList"
          :props="props2"
          clearable
          class="selWidth"
          :show-all-levels="false"
        />
      </div>
      <div v-if="chanType == 1">
        <span>选择运费模板:</span>
        <el-select v-model="freightId" placeholder="请选择">
          <el-option
            v-for="item in shippingList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseCate">取 消</el-button>
        <el-button type="primary" @click="batchUpdateSave">{{
          chanType == 0 ? "确认修改分类" : "确认修改运费模板"
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="复制淘宝、天猫、京东、苏宁"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="1200px"
      class="taoBaoModal"
      :before-close="handleClose"
    >
      <tao-bao v-if="dialogVisible" @handleCloseMod="handleCloseMod"></tao-bao>
    </el-dialog>
    <editPriceOrStock
      ref="editPriceOrStock"
      @updateList="getList"
    ></editPriceOrStock>
  </div>
</template>

<script>
import {
  productLstApi,
  productDeleteApi,
  categoryApi,
  putOnShellApi,
  offShellApi,
  productHeadersApi,
  productExportApi,
  restoreApi,
  productExcelApi,
  setHotSaleApi,
  batchUpdate,updateShippingTemplates
} from "@/api/store";
import { getToken } from "@/utils/auth";
import taoBao from "./taoBao";
import { shippingTemplatesList } from "@/api/logistics";
import { checkPermi } from "@/utils/permission"; // 权限判断函数
import editPriceOrStock from "./editPriceOrStock.vue";
export default {
  name: "ProductList",
  components: { taoBao, editPriceOrStock },
  computed: {},
  data() {
    return {
      props: {
        children: "child",
        label: "name",
        value: "id",
        emitPath: false,
      },
      // roterPre: roterPre,
      headeNum: [],
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: this.$store.state.settings.page,
        limit: 20,
        cateId: "",
        keywords: "",
        type: "1",
        priceOrder: "",
        salesOrder: "",
      },
      categoryList: [],
      merCateList: [],
      merCateListOptions: [],
      props2: {
        children: "child",
        label: "name",
        value: "id",
        multiple: true,
        emitPath: false,
      },
      cateIds: [],
      objectUrl: process.env.VUE_APP_BASE_API,
      dialogVisible: false,
      multipleSelection: [],
      dialogVisibleCate: false,
      sortRules: "",
      sortOptions: [
        {
          lable: "默认排序",
          value: "",
        },
        {
          lable: "销量升序",
          value: "1",
        },
        {
          lable: "销量降序",
          value: "2",
        },
        {
          lable: "价格升序",
          value: "3",
        },
        {
          lable: "价格降序",
          value: "4",
        },
      ],
      chanType: null,
      modelTitle: "",
      shippingList: [],
      freightId: null,
    };
  },
  mounted() {
    this.goodHeade();
    this.getList();
    this.getCategorySelect();
    this.getfreightOptions();
    this.checkedCities = this.$cache.local.has("goods_stroge")
      ? this.$cache.local.getJSON("goods_stroge")
      : this.checkedCities;
  },
  methods: {
    aditStockOrPrice(row) {
      this.$refs.editPriceOrStock.open(row);
    },
    checkPermi,
    handleRestore(id) {
      this.$modalSure("恢复商品").then(() => {
        restoreApi(id).then((res) => {
          this.$message.success("操作成功");
          this.goodHeade();
          this.getList();
        });
      });
    },
    getfreightOptions() {
      shippingTemplatesList(this.tempData).then((res) => {
        this.shippingList = res.list;
      });
    },
    changeSale() {
      this.tableFrom.salesOrder =
        this.tableFrom.salesOrder == "asc" ? "desc" : "asc";

      this.tableFrom.priceOrder = "";
      this.getList();
    },
    changePrice() {
      this.tableFrom.priceOrder =
        this.tableFrom.priceOrder == "asc" ? "desc" : "asc";

      (this.tableFrom.salesOrder = ""), this.getList();
    },

    batchChangCate(type) {
      this.chanType = type;
   
      // type 0 分类 1 运费模板
      this.modelTitle = `批量修改${type == 0 ? "分类" : "运费模板"}`;
      if (this.multipleSelection.length == 0) {
        return this.$message.error("请勾选要操作的数据");
      }
      this.dialogVisibleCate = true;
    },
    handleCloseCate() {
      this.dialogVisibleCate = false;
    },
    handleCommand(e) {
      debugger;
      switch (e) {
        case "0":
          this.setKeyword("isBest");
          break;
        case "1":
          this.setKeyword("isNew");
          break;
        case "2":
          this.setKeyword("isGood");

          break;
        case "3":
          this.setKeyword("isHot");

          break;
        case "4":
          this.celSetKeyword("isBest");

          break;
        case "5":
          this.celSetKeyword("isNew");

          break;
        case "6":
          this.celSetKeyword("isGood");

          break;
        case "7":
          this.celSetKeyword("isHot");

          break;

        default:
          this.setKeyword("isBest");
          break;
      }
    },
    async batchUpdateSave() {
      if (this.chanType == 0) {
        await batchUpdate({
          ids: this.multipleSelection.map((val) => val.id),
          categoryId: this.cateIds,
        });
      } else {

      await    updateShippingTemplates({ tempId:this.freightId, productIdList:this.multipleSelection.map((val) => val.id)})
      }

      this.$message.success("操作成功");
      this.handleCloseCate();
      this.getList();
    },
    async setKeyword(keyword) {
      if (this.multipleSelection.length == 0) {
        return this.$message.error("请勾选要操作的数据");
      }
      let data = await setHotSaleApi({
        flag: true,
        feature: keyword, // isHot等 直接传字符串
        idList: this.multipleSelection.map((val) => val.id),
      });
      this.$message.success("操作成功");
      this.getList();
    },
    async celSetKeyword(keyword) {
      if (this.multipleSelection.length == 0) {
        return this.$message.error("请勾选要操作的数据");
      }
      let data = await setHotSaleApi({
        flag: false,
        feature: keyword, // isHot等 直接传字符串
        idList: this.multipleSelection.map((val) => val.id),
      });
      this.$message.success("操作成功");
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    seachList() {
      this.$store.commit("settings/PAGE_SETTING", 1);

this.tableFrom.page = 1;
    

      this.getList();
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleCloseMod(item) {
      this.dialogVisible = item;
      this.goodHeade();
      this.getList();
    },
    // 复制
    onCopy() {
      this.dialogVisible = true;
    },
    // 导出
    exports() {
      productExcelApi({
        cateId: this.tableFrom.cateId,
        keywords: this.tableFrom.keywords,
        type: this.tableFrom.type,
      }).then((res) => {
        window.location.href = res.fileName;
      });
    },
    // 获取商品表单头数量
    goodHeade() {
      productHeadersApi()
        .then((res) => {
          this.headeNum = res;
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    // 商户分类；
    getCategorySelect() {
      categoryApi({ status: -1, type: 1 })
        .then((res) => {
          this.merCateList = res;
          this.merCateListOptions = this.filerMerCateList(res);
          let newArr = [];
          res.forEach((value, index) => {
            newArr[index] = value;
            if (value.child)
              newArr[index].child = value.child.filter(
                (item) => item.status === true
              );
          }); //过滤商品分类设置为隐藏的子分类不出现在树形列表里
          this.merCateListOptions = this.filerMerCateList(newArr);
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    filerMerCateList(treeData) {
      return treeData.map((item) => {
        if (!item.child) {
          item.disabled = true;
        }
        item.label = item.name;
        return item;
      });
    },
    // 列表
    getList() {
      this.listLoading = true;
      productLstApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.list;
          this.tableData.total = res.total;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    pageChange(page) {
      this.$store.commit("settings/PAGE_SETTING", page);

      this.tableFrom.page = page;
      this.getList();
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      this.getList();
    },
    // 删除
    handleDelete(id, type) {
      this.$modalSure(`删除 id 为 ${id} 的商品`).then(() => {
        const deleteFlag = type == 5 ? "delete" : "recycle";
        productDeleteApi(id, deleteFlag).then(() => {
          this.$message.success("删除成功");
          this.getList();
          this.goodHeade();
        });
      });
    },
    onchangeIsShow(row) {
      row.isShow
        ? putOnShellApi(row.id)
            .then(() => {
              this.$message.success("上架成功");
              this.getList();
              this.goodHeade();
            })
            .catch(() => {
              // row.isShow = !row.isShow;
            })
        : offShellApi(row.id)
            .then(() => {
              this.$message.success("下架成功");
              this.getList();
              this.goodHeade();
            })
            .catch(() => {
              // row.isShow = !row.isShow;
            });
    },
  },
};
</script>

<style scoped lang="scss">
.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  .header-icon {
    color: #cdc9c9;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    .el-icon-caret-top {
      position: relative;
      top: 2px;
    }
    .el-icon-caret-bottom {
      position: relative;
      top: -2px;
    }
  }
  .active {
    color: #2668ed;
  }
}
.el-table__body {
  width: 100%;
  table-layout: fixed !important;
}
.taoBaoModal {
  //  z-index: 3333 !important;
}
.demo-table-expand {
  ::v-deep label {
    width: 82px;
  }
}
.demo-table-expand {
  ::v-deep .el-form-item__content {
    width: 77%;
  }
}
.selWidth {
  width: 350px !important;
}
.seachTiele {
  line-height: 30px;
}
.relative {
  position: relative;
}
</style>
