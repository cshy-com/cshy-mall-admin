<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline size="small"> </el-form>

          <el-button type="primary" @click="handerAddorUpdate" size="small"
            >新增
          </el-button>
          <el-button slot="append" @click="handerSearch" size="small"
            >查询
          </el-button>
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="listData.list"
        size="mini"
        class="table"
        highlight-current-row
        :header-cell-style="{ fontWeight: 'bold' }"
      >
        <el-table-column prop="title" label="标题" min-width="120" />
        <el-table-column
          prop="questionType"
          label="问题类型"
          show-overflow-tooltip
          min-width="250"
        />

        <el-table-column prop="createTime" label="创建时间" min-width="100" />
        <el-table-column
          label="操作"
          min-width="100"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handerAddorUpdate(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handlerDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listPram.current"
        :page-size="listPram.size"
        :total="listData.total"
        :page-sizes="[20, 40, 60, 80]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog
      :title="title"
      :visible.sync="editDialogConfig.visible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <el-form
          ref="form"
          :model="formDialog"
          label-width="80px"
          :rules="rules"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="formDialog.title"></el-input>
          </el-form-item>
          <el-form-item label="问题类型" prop="questionType">
            <el-input
              :disabled="formDialog.id"
              v-model="formDialog.questionType"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number
              v-model="formDialog.sort"
              :min="0"
              :max="9999999"
            />
          </el-form-item>

          <el-form-item label="内容" prop="answer">
            <Tinymce v-model="formDialog.answer"></Tinymce>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogConfig.visible = false">取 消</el-button>
        <el-button type="primary" @click="replySave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getQuestionList,
  faqDel,
  replyAdvices,
  faqAdd,
  faqUpdate
} from "@/api/article.js";
import Tinymce from "@/components/Tinymce/index";

export default {
  components: { Tinymce },
  data() {
    return {
      constants: this.$constants,
      listPram: {
        current: 1,
        size: 20
      },
      listData: { list: [], total: 0 },

      listLoading: true,

      editDialogConfig: {
        visible: false,
        data: {}
      },
      replyTextarea: "",
      title: "",
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        questionType: [
          { required: true, message: "请输入类型", trigger: "blur" }
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        answer: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      formDialog: {
        title: null,
        questionType: null,
        answer: null,
        sort: 99
      }
    };
  },
  mounted() {
    this.handlerGetListData(this.listPram);
  },
  methods: {
    replySave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let http = this.formDialog.id ? faqUpdate : faqAdd;
          let params = {
            title: this.formDialog.title,
            questionType: this.formDialog.questionType,
            answer: this.formDialog.answer,
            sort: this.formDialog.sort
          };
          if (this.formDialog.id) {
            params.id = this.formDialog.id;
          }
          http(params).then(() => {
            this.editDialogConfig.visible = false;
            this.$message.success(this.formDialog.id ? "修改成功" : "新增成功");
            this.handlerGetListData(this.listPram);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      this.editDialogConfig.visible = false;
    },
    handerAddorUpdate(row) {
      this.editDialogConfig.visible = true;

      this.title = row.id ? "修改" : "新增";
      if (row.id) {
        this.formDialog = JSON.parse(JSON.stringify(row));
      } else {
        this.formDialog = {
          title: null,
          questionType: null,
          answer: "",
          sort: null
        };
      }
    },
    handerSearch() {
      this.listPram.page = 1;
      this.handlerGetListData(this.listPram);
    },
    handlerGetListData(pram) {
      this.listLoading = true;
      getQuestionList(pram).then(data => {
        this.listData = data;
        this.listLoading = false;
      });
    },

    handlerHideDialog() {
      this.handlerGetListData(this.listPram);
      this.editDialogConfig.visible = false;
    },
    handlerDelete(rowData) {
      this.$confirm("确定删除当前数据", "提示").then(result => {
        faqDel(rowData.id).then(data => {
          this.$message.success("删除数据成功");
          this.handlerGetListData(this.listPram);
        });
      });
    },
    handleSizeChange(val) {
      this.listPram.current = val;
      this.handlerGetListData(this.listPram);
    },
    handleCurrentChange(val) {
      this.listPram.size = val;
      this.handlerGetListData(this.listPram);
    }
  }
};
</script>

<style scoped lang="scss">
.articleModal {
  z-index: 333 !important;
}
.dialog-row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  line-height: 24px;
  margin-bottom: 20px;
  .dialog-lable {
    width: 120px;
    text-align: right;
    margin-right: 20px;
  }
  .dialog-value {
    flex: 1;
  }
}
</style>
