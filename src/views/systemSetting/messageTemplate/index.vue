<template>
  <div class="divBox relative">
    <el-card class="box-card">
      <div class="clearfix">
        <div class="container">
          <el-form size="small" label-width="100px" :inline="true">
            <el-form-item>
              <el-button type="primary" size="small" @click="handTemplateSync"
                >同步短信模板</el-button
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
        <el-table-column label="模板内容" min-width="110" prop="content">
        </el-table-column
        ><el-table-column label="模板Code" min-width="110" prop="tempCode">
        </el-table-column
        ><el-table-column label="模板类型" min-width="110" prop="type">
        </el-table-column>
        <el-table-column label="签名" min-width="110" prop="signName">
        </el-table-column>
        <el-table-column
          label="触发位置"
          min-width="110"
          prop="triggerPosition"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.triggerPosition | triggerPositionFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否为内部短信"
          min-width="110"
          prop="isInternal"
          ><template slot-scope="scope">
            <el-switch
              v-model="scope.row.isInternal"
              :active-value="1"
              :inactive-value="0"
              @change="changeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="110" prop="status">
        </el-table-column>
        <el-table-column label="创建时间" min-width="110" prop="createTime">
        </el-table-column>
        <el-table-column
          prop="address"
          fixed="right"
          min-width="120"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="bindEdit(scope.row)"
              >编辑</el-button
            >
          </template>
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
    <el-dialog
      title="编辑模板"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="签名ID" prop="signId">
          <el-select v-model="formData.signId" placeholder="请选择">
            <el-option
              v-for="item in optionsSigns"
              :key="item.id"
              :label="item.tempName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="触发位置" prop="triggerPosition">
          <el-select v-model="formData.triggerPosition" placeholder="请选择">
            <el-option
              v-for="item in optionsTriggerPosition"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('formData')">确 定</el-button>
      </span>
      <!--<parser v-if="formShow" ref="formBox" class="formBox" :form-conf="formConf" :form-edit-data="formData" :is-edit="isCreate === 1" @submit="submit" />-->
    </el-dialog>
  </div>
</template>

<script>
import {
  smsTemplatePage,
  smsTemplateSync,
  smsTemplateDetail,
  smsSignList,
  templateUpdate,templateUpdateIsInner
} from "@/api/systemSetting";
let optionsTriggerPosition = [
  {
    id: 0,
    name: "发送验证码"
  },
  {
    id: 1,
    name: "下单成功通知客户"
  },
  {
    id: 2,
    name: "下单成功通知员工"
  },
  {
    id: 3,
    name: "发货后通知用户"
  },
  {
    id: 4,
    name: "退货到达通知"
  },
  {
    id: 5,
    name: "退款申请提交通知"
  },
  {
    id: 6,
    name: "退款申请通过通知"
  }
];
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
      listLoading: true,
      editId: null,
      dialogVisible: false,
      formData: {},
      optionsSigns: [],
      rules: {
        signId: [
          { required: true, message: "请选择签名ID", trigger: "chanege" }
        ],
        triggerPosition: [
          { required: true, message: "请选择触发位置", trigger: "chanege" }
        ]
      },
      optionsTriggerPosition: optionsTriggerPosition
    };
  },
  mounted() {
    this.getList();
  },
  filters: {
    triggerPositionFilter(e) {
      if (!["", null, undefined].includes(e)) {
        let name = optionsTriggerPosition.find(val => val.id == e).name;
        return name || "";
      }
    }
  },
  methods: {
    changeStatus(row){
      // 0 否 1 是
      this.$modalSure(
        `是否${row.isInternal == 1 ? "开启" : "关闭"} 模板名称为“ ${row.tempName}” 的内部短信`
      )
        .then(() => {
          templateUpdateIsInner({
            id: row.id,
            isInternal: row.isInternal
          }).then(() => {
            this.$message.success("操作成功");
            this.getList();
          });
        })
        .catch(() => {
          row.isInternal = row.isInternal == 1 ? 0 : 1;
        });
    },
    submit() {
      this.$refs["formData"].validate(async valid => {
        if (valid) {
          let res = await templateUpdate({
            id: this.editId,
            signId: this.formData.signId,
            triggerPosition: this.formData.triggerPosition
          });
          this.handleClose();
          this.$message.success("修改成功");
          this.getList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async bindEdit(item) {
      this.dialogVisible = true;
      this.editId = item.id;
      this.optionsSigns = await smsSignList({});

      smsTemplateDetail(item.id).then(res => {
        this.formData = res;
      });
    },
    async handTemplateSync() {
      await smsTemplateSync({});
      this.$message.success("同步成功");
      this.getList();
    },
    // 列表
    getList() {
      this.listLoading = true;
      smsTemplatePage(this.tableFrom)
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
