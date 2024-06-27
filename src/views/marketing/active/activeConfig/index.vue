<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline>
            <el-form-item label="是否显示">
              <el-select
                v-model="tableFrom.status"
                placeholder="请选择"
                class="filter-item selWidth mr20"
                @change="getList(1)"
                clearable
              >
                <el-option label="关闭" :value="0" />
                <el-option label="开启" :value="1" />
              </el-select>
            </el-form-item>
            <el-form-item :label="routerType == 0 ? '活动名称' : '秒杀名称'">
              <el-input
                v-model="tableFrom.name"
                :placeholder="
                  routerType == 0 ? '请输入活动名称' : '请输入秒杀名称'
                "
                class="selWidth"
                clearable
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getList(1)"
                />
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button
          size="mini"
          type="primary"
          @click="add"
          v-hasPermi="['admin:seckill:manger:save']"
          >添加{{ routerType == 0 ? "活动" : "秒杀" }}配置</el-button
        >
      </div>

      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        style="width: 100%"
        size="mini"
        ref="multipleTable"
        :header-cell-style="{ fontWeight: 'bold' }"
      >
        <el-table-column prop="id" label="ID" min-width="50" />
        <el-table-column label="活动名称" min-width="100">
          <template slot-scope="scope">
            <router-link
              :to="{
                path:
                  '/marketing/active/activeList/' +
                  scope.row.id +
                  '?type=' +
                  routerType,
              }"
            >
              <el-button type="text" size="small">{{
                scope.row.name
              }}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="activityCat" label="活动分类" min-width="50">
          <template slot-scope="scope">
            {{ scope.row.type == 0 ? scope.row.activityCat : "秒杀活动" }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动时段" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.time.split(",").join(" - ") }}
          </template>
        </el-table-column>
        <el-table-column label="轮播图" min-width="200">
          <template slot-scope="scope">
            <div class="acea-row" v-if="scope.row.sliderImages">
              <div
                class="demo-image__preview mr5"
                v-for="item in JSON.parse(scope.row.sliderImages)"
                :key="item.attId"
              >
                <el-image
                  style="width: 36px; height: 36px"
                  :src="item.sattDir"
                  :preview-src-list="[item.sattDir]"
                />
              </div>
            </div>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="背景" min-width="200">
          <template slot-scope="scope">
            <div class="acea-row" v-if="scope.row.image">
              <div
                class="demo-image__preview mr5"
                v-for="item in JSON.parse(scope.row.image)"
                :key="item.attId"
              >
                <el-image
                  style="width: 36px; height: 36px"
                  :src="item.sattDir"
                  :preview-src-list="[item.sattDir]"
                />
              </div>
            </div>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="150">
          <template
            slot-scope="scope"
            v-if="checkPermi(['admin:seckill:manger:update:status'])"
          >
            <el-switch
              v-model="scope.row.status"
              active-text="启用"
              inactive-text="停用"
              :active-value="1"
              :inactive-value="0"
              @change="onchangeIsShow(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="130" />
        <el-table-column
          label="操作"
          min-width="150"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row.id)"
              v-hasPermi="[
                'admin:seckill:manger:info',
                'admin:seckill:manger:update',
              ]"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row.id, scope.$index)"
              class="mr10"
              v-hasPermi="['admin:seckill:manger:delete']"
              >删除</el-button
            >
            <router-link
              :to="{
                path:
                  '/marketing/active/creatActive/creat/' +
                  scope.row.id +
                  '?type=' +
                  routerType,
              }"
            >
              <el-button
                type="text"
                size="small"
                v-hasPermi="['admin:seckill:save']"
                >添加商品</el-button
              >
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="block mb20">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableFrom.limit"
          :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>

    <el-dialog
      :title="isCreate === 0 ? '添加数据' : '编辑数据'"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <div v-loading="loading">
        <el-form
          :rules="rules"
          ref="formItem"
          :model="editData"
          label-width="110px"
          @submit.native.prevent
        >
          <el-form-item label="名称：" prop="name">
            <el-input
              v-model="editData.name"
              placeholder="请输入名称"
              style="width: 80%"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动分类：" prop="activityCat">
            <el-select v-model="editData.activityCat" placeholder="请选择">
              <el-option
                v-for="item in optionsCates"
                :key="item.value"
                :label="item.catName"
                :value="item.catName"
              >
              </el-option>
              <el-option :label="'秒杀活动'" :value="-2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围：" prop="startTime">
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '24:00',
              }"
            >
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '24:00',
                minTime: startTime,
              }"
            ></el-time-select>
          </el-form-item>

          <el-form-item label="幻灯片：" prop="sliderImages">
            <div class="upLoadPicBox" @click="addBanner()">
              <div v-if="editData.sliderImages" class="pictrue">
                <img v-for="item in editData.sliderImages" :src="item.sattDir" />
              </div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="背景图：" prop="image">
            <div class="upLoadPicBox" @click="addBanner2()">
              <div v-if="editData.image" class="pictrue">
                <img v-for="item in editData.image" :src="item.sattDir" />
              </div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-switch
              v-model="editData.status"
              active-text="启用"
              inactive-text="停用"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="cancel('formItem')">取消</el-button>
          <el-button type="primary" @click="handlerSubmit">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import zbParser from "@/components/FormGenerator/components/parser/ZBParser";

import {
  seckillListApi,
  seckillUpdateApi,
  seckillInfoApi,
  seckillSaveApi,
  seckillDeleteApi,
  seckillConfigStatusApi,
  adminActivityCategoryList,
} from "@/api/marketing";
import { checkPermi } from "@/utils/permission"; // 权限判断函数
import { Debounce } from "@/utils/validate";
export default {
  name: "SeckillConfig",
  components: { zbParser },
  data() {
    return {
      dialogVisible: false,
      isShow: true,
      isCreate: 0,
      editData: {},
      formId: 123,
      listLoading: true,
      tableData: {
        data: [],
        total: 0,
      },
      startTime: "",
      endTime: "",
      tableFrom: {
        page: 1,
        limit: 20,
        name: "",
        isDel: false,
        status: "",
      },
      seckillId: "",
      loading: false,
      optionsCates: [],
      routerType: null,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        activityCat: [
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
        time: [{ required: true, message: "请选择时间范围", trigger: "blur" }],
        sliderImages: [
          { required: true, message: "请上传图片", trigger: "blur" },
        ],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getCastes();
  },
  watch: {
    $route: {
      handler(to, from) {
        this.routerType = to.query.type;
        this.getList();
      },
      immediate: true, //第一次就执行
    },
  },
  methods: {
    checkPermi,
    resetForm(formValue) {
      this.dialogVisible = false;
    },
    getCastes() {
      adminActivityCategoryList({}).then((res) => {
        this.optionsCates = res;
      });
    },
    addBanner() {
      const _this = this;

      this.$modalUpload(
        function (img) {
          debugger
          _this.editData.sliderImages = img;
        },
        "1",
        "store"
      );
    },
    addBanner2() {
      const _this = this;

      this.$modalUpload(
        function (img) {
          _this.editData.image = img;
        },
        "1",
        "store"
      );
    },
    // 删除
    handleDelete(id, idx) {
      this.$modalSure().then(() => {
        seckillDeleteApi({ id: id }).then(() => {
          this.$message.success("删除成功");
          this.tableData.data.splice(idx, 1);
        });
      });
    },
    onchangeIsShow(row) {
      seckillConfigStatusApi(row.id, { status: row.status })
        .then(async () => {
          this.$message.success("修改成功");
          this.getList();
        })
        .catch(() => {
          row.status = !row.status;
        });
    },
    onEditSort(row) {
      this.$set(row, "isEdit", true);
    },
    onBlur(row) {
      this.$set(row, "isEdit", false);
      this.onEdit(row.id, row);
    },
    handleClose() {
      this.cancel("formItem");
    },
    cancel(name) {
      this.modals = false;
      this.$refs[name].resetFields();
    },
    // 提交
    putSend: Debounce(function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let http = this.formItem.id ? giftCardTypeUpdate : giftCardTypeAdd;
          http(this.formItem).then((async) => {
            this.$message.success(this.formItem.id ? "编辑成功" : "新增成功");
            this.modals = false;
            this.$refs[name].resetFields();
            this.$emit("submitFail");
          });
        } else {
          this.$message.error("请填写信息");
        }
      });
    }),
    // 获取表单详情
    getFormInfo(id) {
      this.loading = true;
      seckillInfoApi({ id: id })
        .then((res) => {
   
          this.editData = res;
          if(res.sliderImages){
            this.editData.sliderImages = JSON.parse(res.sliderImages);
          }
          if(res.image){
            this.editData.image = JSON.parse(res.image);
          }
       
       if(res.time){
        this.startTime = res.time.split(",")[0];
          this.endTime = res.time.split(",")[1];
       }
 
          this.dialogVisible = true;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 编辑
    handleEdit(id) {
      this.seckillId = id;
      this.getFormInfo(id);
      this.isCreate = 1;
    },
    // 编辑
    onEdit(id, obj) {
      const data = obj ? obj : this.editData;
      seckillUpdateApi({ id }, data)
        .then((res) => {
          this.isSuccess();
        })
        .catch((res) => {
          this.listLoading = false;
        });
    },
    // 提交
    handlerSubmit: Debounce(function (formValue) {
      formValue = JSON.parse(JSON.stringify(this.editData));
      formValue.time = this.startTime + "," + this.endTime;
      formValue.sliderImages = JSON.stringify(this.editData.sliderImages);
      formValue.image = JSON.stringify(this.editData.image);
      let params = {
        activityCat: formValue.activityCat == -2 ? "" : formValue.activityCat,
        time: formValue.time,
        image: formValue.image,
        name: formValue.name,
        sliderImages: formValue.sliderImages,
        status: formValue.status,
        type: formValue.activityCat == -2 ? "1" : 0,
      };

      this.isCreate === 0
        ? seckillSaveApi(params).then((res) => {
            this.isSuccess();
          })
        : seckillUpdateApi({ id: this.seckillId }, params).then((res) => {
            this.isSuccess();
          });
    }),
    isSuccess() {
      this.$message.success("操作成功");
      this.dialogVisible = false;
      this.getList();
    },
    // 列表
    getList(num) {
      this.listLoading = true;
      this.tableFrom.page = num ? num : this.tableFrom.page;
      this.tableFrom.type = this.routerType;
      seckillListApi(this.tableFrom)
        .then((res) => {
          this.tableData.data = res.list;
          this.tableData.total = res.total;
          this.tableData.data.map((item) => this.$set(item, "isEdit", false));
          this.listLoading = false;
        })
        .catch((res) => {
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
    add() {
      this.isCreate = 0;
      this.dialogVisible = true;
      this.editData = {};
    },
    handleClose() {
      this.dialogVisible = false;
      this.editData = {};
    },
  },
};
</script>

<style scoped></style>
