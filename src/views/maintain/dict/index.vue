<template>
  <div>
    <div class="app-container">
      <el-form
        :model="queryParams"
        ref="queryRef"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
      >
        <el-form-item label="字典名称" prop="dictName">
          <el-input
            v-model="queryParams.dictName"
            placeholder="请输入字典名称"
            clearable
            style="width: 240px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input
            v-model="queryParams.dictType"
            placeholder="请输入字典类型"
            clearable
            style="width: 240px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="queryParams.status"
            placeholder="字典状态"
            clearable
            style="width: 240px"
          >
            <el-option
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="创建时间" style="width:430px">
          <el-date-picker
            v-model="dateRange"
            value-format="YYYY-MM-DD"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['system:dict:add']"
            >新增</el-button
          >
        </el-col>

        <!-- <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['system:dict:export']"
            >导出</el-button
          >
        </el-col> -->
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="Refresh"
            @click="handleRefreshCache"
            v-hasPermi="['system:dict:remove']"
            >刷新缓存</el-button
          >
        </el-col>
        <!-- <right-toolbar
          v-model:showSearch="showSearch"
          @queryTable="getList"
        ></right-toolbar> -->
      </el-row>

      <el-table style="margin-top:20px"
        v-loading="loading"
        :data="typeList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="字典编号" align="center" prop="dictId" />
        <el-table-column
          label="字典名称"
          align="center"
          prop="dictName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="字典类型"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <router-link
              :to="'/maintain/dict/' + scope.row.dictId"
              class="link-type"
            >
              <span>{{ scope.row.dictType }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">


            <el-tag v-if="scope.row.status == 0"  >启用</el-tag>
            <el-tag v-if="scope.row.status == 1"  type="info">停用</el-tag>
             
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="备注"
          align="center"
          prop="remark"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="180"
        >
          <template #default="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <el-button
              
              type="text"
             
              @click="handleUpdate(scope.row)"
              v-hasPermi="['system:dict:edit']"
              >修改</el-button
            >
            <el-button
             
              type="text"
              
              @click="handleDelete(scope.row)"
              v-hasPermi="['system:dict:remove']"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      /> -->

      <!-- 添加或修改参数配置对话框 -->
      <el-dialog
        :title="title"
        :visible.sync="open"
        width="500px"
        append-to-body
      >
        <el-form ref="dictRef" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="字典名称" prop="dictName">
            <el-input v-model="form.dictName" placeholder="请输入字典名称" />
          </el-form-item>
          <el-form-item label="字典类型" prop="dictType">
            <el-input v-model="form.dictType" placeholder="请输入字典类型" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in sys_normal_disable"
                :key="dict.value"
                :label="dict.value"
                >{{ dict.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item> -->
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script name="Dict">
// import useDictStore from "@/store/modules/dict";
import {
  listType,
  dictTypeDetail,
  delType,
  addType,
  updateType,
  refreshCache,
  getDictSelect
} from "@/api/systemConfig";

// const { proxy } = getCurrentInstance();
// const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
export default {
  data() {
    return {
      typeList: [],
      open: false,
      loading: true,
      showSearch: true,
      ids: [],
      single: true,
      multiple: true,
      total: 0,
      title: "",
      dateRange: [],
      form: {},
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        dictName: undefined,
        dictType: undefined,
        status: undefined
      },
      rules: {
        dictName: [
          { required: true, message: "字典名称不能为空", trigger: "blur" }
        ],
        dictType: [
          { required: true, message: "字典类型不能为空", trigger: "blur" }
        ]
      },
      sys_normal_disable: [
        {
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "停用"
        }
      ]
    };
  },

  methods: {
    /** 查询字典类型列表 */
    getList() {
      this.loading = true;
      listType(this.queryParams).then(response => {
        this.typeList = response;
        // this.total = response.total;
        this.loading = false;
      });
    },
    getDictSelectList() {
      listType().then(res => {});
    },
    /** 取消按钮 */
    cancel() {
      this.open = false;
      reset();
    },
    /** 表单重置 */
    reset() {
      this.form = {
        dictId: undefined,
        dictName: undefined,
        dictType: undefined,
        status: 0
        // remark:undefined
      };
      this.resetForm("dictRef");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryRef");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加字典类型";
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = this.selection.map(item => item.dictId);
      this.single = this.selection.length != 1;
      this.multiple = !this.selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const dictId = row.dictId || this.ids;
      dictTypeDetail(dictId).then(response => {
        this.form = response;
        this.form.status = Number(response.status);
        this.open = true;
        this.title = "修改字典类型";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["dictRef"].validate(valid => {
        if (valid) {
          let params = {
            dictName: this.form.dictName,
            dictType: this.form.dictType,
            status: this.form.status
          };
          if (this.form.dictId != undefined) {
            params.dictId = this.form.dictId;
            updateType(params).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addType(params).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$modal
        .confirm('是否确认删除字典编号为"' + row.dictId + '"的数据项？')
        .then(function() {
          return delType(row.dictId);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      proxy.download(
        "system/dict/type/export",
        {
          ...this.queryParams.value
        },
        `dict_${new Date().getTime()}.xlsx`
      );
    },
    /** 刷新缓存按钮操作 */
    handleRefreshCache() {
      refreshCache().then(() => {
        this.$modal.msgSuccess("刷新成功");
        // useDictStore().cleanDict();
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>
