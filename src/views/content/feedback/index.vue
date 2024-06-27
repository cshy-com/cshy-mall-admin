<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="container">
          <el-form inline size="small"> </el-form>
          <el-button
                  slot="append"
                 
                  @click="handerSearch"
                  size="small"
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
        <el-table-column prop="mobile" label="联系方式" min-width="120" />
        <el-table-column
          prop="content"
          label="内容"
          show-overflow-tooltip
          min-width="250"
        />
        <el-table-column label="图片" min-width="80">
          <template slot-scope="scope">
            <div class="demo-image__preview" v-if="scope.row.picture">
              <template v-for="item in scope.row.picture.split(',')">
                <el-image
                  style="width: 36px; height: 36px;margin-right: 10px;"
                  :src="item"
                  :preview-src-list="[scope.row.picture]"
                />
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="replied" label="是否回复" min-width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.replied == 0">未回复</el-tag>
            <el-tag type="success" v-if="scope.row.replied == 1">已回复</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reply" label="回复内容" min-width="180">
          </el-table-column>
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
              @click="handlerDelete(scope.row)"
              >删除</el-button
            >
            <el-button v-if="scope.row.replied == 0" type="text" size="small" @click="replyVisible(scope.row)"
              >回复</el-button
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
      title="回复"
      :visible.sync="editDialogConfig.visible"
      width="60%"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <div class="dialog-row">
          <div class="dialog-lable">
            建议内容
          </div>
          <div class="dialog-value">
            <span>{{ editDialogConfig.data.content }}</span>
            <div v-if="editDialogConfig.data.picture">
              <template
                v-for="item in editDialogConfig.data.picture.split(',')"
              >
                <el-image
                  style="width: 36px; height: 36px;margin-right: 10px;"
                  :src="item"
                  :preview-src-list="[editDialogConfig.data.picture]"
                />
              </template>
            </div>
          </div>
        </div>

        <div class="dialog-row">
          <div class="dialog-lable">
            回复内容
          </div>
          <div class="dialog-value">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="replyTextarea"
            >
            </el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogConfig.visible = false">取 消</el-button>
        <el-button type="primary" @click="replySave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { adviceList, DelAdvices, replyAdvices } from "@/api/article.js";

export default {
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
      replyTextarea: ""
    };
  },
  mounted() {
    this.handlerGetListData(this.listPram);
  },
  methods: {
    replySave() {
      if (!this.replyTextarea) {
        return this.$message.errir("请输入回复内容");
      }
      replyAdvices({
        content: this.replyTextarea,
        adviceId: this.editDialogConfig.data.id,
        picture: ""
      }).then(() => {
        this.editDialogConfig.visible = false;
        this.$message.success("回复成功");
        this.handlerGetListData(this.listPram);
      });
    },
    handleClose() {
      this.editDialogConfig.visible = false;
    },
    replyVisible(row) {
      this.editDialogConfig.visible = true;
      this.editDialogConfig.data = row;
      this.replyTextarea=null
    },
    handerSearch() {
      this.listPram.page = 1;
      this.handlerGetListData(this.listPram);
    },
    handlerGetListData(pram) {
      this.listLoading = true;
      adviceList(pram).then(data => {
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
        DelAdvices(rowData).then(data => {
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
  .dialog-value{
    flex: 1;
  }
}
</style>
