<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="字典名称" prop="dictType">
        <el-select v-model="queryParams.dictType" style="width: 200px">
          <el-option
            v-for="item in typeOptions"
            :key="item.dictId"
            :label="item.dictName"
            :value="item.dictType"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="字典标签" prop="dictLabel">
        <el-input
          v-model="queryParams.dictLabel"
          placeholder="请输入字典标签"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="数据状态"
          clearable
          style="width: 200px"
        >
          <el-option
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
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
        <el-button type="warning" plain icon="Close" @click="handleClose"
          >关闭</el-button
        >
      </el-col>
      <!-- <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="getList"
      ></right-toolbar> -->
    </el-row>

    <el-table style="margin-top: 20px;"
      v-loading="loading"
      :data="dataList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="字典编码" align="center" prop="dictCode" />
      <el-table-column label="字典标签" align="center" prop="dictLabel">
        <template #default="scope">
          <span
            v-if="scope.row.listClass == '' || scope.row.listClass == 'default'"
            >{{ scope.row.dictLabel }}</span
          >
          <el-tag
            v-else
            :type="scope.row.listClass == 'primary' ? '' : scope.row.listClass"
            >{{ scope.row.dictLabel }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="字典键值" align="center" prop="dictValue" />
      <el-table-column label="字典排序" align="center" prop="dictSort" />
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 0"  >启用</el-tag>
            <el-tag v-if="scope.row.status == 1"  type="info">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        :show-overflow-tooltip="true"
      />
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
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="dataRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典类型">
          <el-input v-model="form.dictType" :disabled="true" />
        </el-form-item>
        <el-form-item label="数据标签" prop="dictLabel">
          <el-input v-model="form.dictLabel" placeholder="请输入数据标签" />
        </el-form-item>
        <el-form-item label="数据键值" prop="dictValue">
          <el-input v-model="form.dictValue" placeholder="请输入数据键值" />
        </el-form-item>
        <el-form-item label="样式属性" prop="cssClass">
          <el-input v-model="form.cssClass" placeholder="请输入样式属性" />
        </el-form-item>
        <el-form-item label="显示排序" prop="dictSort">
          <el-input-number
            v-model="form.dictSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="回显样式" prop="listClass">
          <el-select v-model="form.listClass">
            <el-option
              v-for="item in listClassOptions"
              :key="item.value"
              :label="item.label + '(' + item.value + ')'"
              :value="item.value"
            ></el-option>
          </el-select>
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
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import useDictStore from "@/store/modules/dict";
import {
  getDictSelect,
  getType,
  listDictData,
  dictDataDetail,
  delDictData,
  addDictData,
  updateDictData,dictTypeDetail
} from "@/api/systemConfig";

export default {
  data() {
    return {
      sys_normal_disable: [
        {
          value: "0",
          label: "正常"
        },
        {
          value: "1",
          label: "停用"
        }
      ],
      dataList: [],
      open: false,
      loading: true,
      showSearch: true,
      ids: [],
      single: true,
      multiple: true,
      total: 0,
      title: "",
      defaultDictType: "",
      typeOptions: [],

      // 数据标签回显样式
      listClassOptions: [
        { value: "default", label: "默认" },
        { value: "primary", label: "主要" },
        { value: "success", label: "成功" },
        { value: "info", label: "信息" },
        { value: "warning", label: "警告" },
        { value: "danger", label: "危险" }
      ],

      form: {},
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictName: undefined,
        dictType: undefined,
        status: undefined
      },
      rules: {
        dictLabel: [
          { required: true, message: "数据标签不能为空", trigger: "blur" }
        ],
        dictValue: [
          { required: true, message: "数据键值不能为空", trigger: "blur" }
        ],
        dictSort: [
          { required: true, message: "数据顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    /** 查询字典类型详细 */
    getTypes(dictId) {
      dictTypeDetail(dictId).then(response => {
  
        this.queryParams.dictType = response.dictType;
        this.defaultDictType = response.dictType;
        this.getList();
      });
    },
    /** 查询字典类型列表 */
    getTypeList() {
      getDictSelect().then(response => {
        this.typeOptions = response;
      });
    },
    /** 查询字典数据列表 */
    getList() {
      this.loading = true;
      listDictData(this.queryParams).then(response => {
        this.dataList = response;

        this.loading = false;
      }).catch(() => { this.loading = false});
    },

    /** 取消按钮 */
    cancel() {
      this.open = false;
      this.reset();
    },

    /** 表单重置 */
    reset() {
      this.form = {
        dictCode: undefined,
        dictLabel: undefined,
        dictValue: undefined,
        cssClass: undefined,
        listClass: "default",
        dictSort: 0,
        status: "0",
        remark: undefined
      };
      this.resetForm("dataRef");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 返回按钮操作 */
    handleClose() {
      this.$router.go(-1) 
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryRef");
      this.queryParams.dictType = this.defaultDictType;
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加字典数据";
      this.form.dictType = this.queryParams.dictType;
    },
    /** 多选框选中数据 */
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.dictCode);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const dictCode = row.dictCode || this.ids;
      dictDataDetail(dictCode).then(response => {
        this.form = response;
        this.open = true;
        this.title = "修改字典数据";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["dataRef"].validate(valid => {
        if (valid) {
          let params={...this.form}
          if (this.form.dictCode != undefined) {
            delete params.createTime
            updateDictData(params).then(response => {
              // useDictStore().removeDict(this.queryParams.dictType);
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDictData(this.form).then(response => {
              // useDictStore().removeDict(this.queryParams.dictType);
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
      const dictCodes = row.dictCode || this.ids;
      this.$modal
        .confirm(`是否确认删除字典编码为${dictCodes}的数据项？`)
        .then(() => {
          return delDictData(dictCodes);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
          // useDictStore().removeDict(this.queryParams.dictType);
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/dict/data/export",
        {
          ...this.queryParams
        },
        `dict_data_${new Date().getTime()}.xlsx`
      );
    }
  },
  created() {
 
    this.getTypes(this.$route.params && this.$route.params.dictId);
    this.getTypeList();
  }
};
</script>
