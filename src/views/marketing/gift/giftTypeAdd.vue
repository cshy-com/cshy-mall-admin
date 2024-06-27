<template>
  <el-dialog
    :visible.sync="modals"
    title="新增/编辑"
    class="order_box"
    :before-close="handleClose"
    width="600px"
  >
    <el-form
      ref="formItem"
      :model="formItem"
      label-width="110px"
      @submit.native.prevent
      :rules="rules"
    >
      <el-form-item label="礼品卡类型：" prop="name">
        <el-input
          v-model="formItem.name"
          placeholder="请输入礼品卡类型"
          style="width:80%;"
        ></el-input>
      </el-form-item>
      <el-form-item label="礼品banner：" prop="banner">
        <div class="upLoadPicBox" @click="addBanner()">
          <div v-if="formItem.banner" class="pictrue">
            <img :src="formItem.banner" />
          </div>
          <div v-else class="upLoad">
            <i class="el-icon-camera cameraIconfont" />
          </div>
        </div>
      </el-form-item>

      <el-form-item label="卡状态：" prop="status">
        <el-switch
          v-model="formItem.status"
          active-text="启用"
          inactive-text="停用"
          active-value="0"
          inactive-value="1"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="cancel('formItem')">取消</el-button>
      <el-button type="primary" @click="putSend('formItem')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { giftCardTypeAdd, giftCardTypeUpdate } from "@/api/marketing";

import { Debounce } from "@/utils/validate";

export default {
  name: "giftTypeAdd",

  data() {
    return {
      formItem: {
        name: null,
        banner: null,
        status: "0"
      },
      modals: false,
      rules: {
        name: [
          { required: true, message: "请输入礼品卡类型：", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    addBanner() {
      const _this = this;

      this.$modalUpload(
        function(img) {
          _this.formItem.banner = img[0].sattDir;
        },
        "1",
        "store"
      );
    },
    init(row) {
      this.modals = true;
      if (row) {
        let { id, name, banner, stauts } = row;

        this.formItem.id = id;
        this.formItem.name = name;
        this.formItem.banner = banner;
        this.formItem.stauts = stauts;
      } else {
        this.formItem = {
          name: null,
          banner: null,
          stauts: "0"
        };
      }
    },

    // 提交
    putSend: Debounce(function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let http = this.formItem.id ? giftCardTypeUpdate : giftCardTypeAdd;
          http(this.formItem).then(async => {
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
    handleClose() {
      this.cancel("formItem");
    },
    cancel(name) {
      this.modals = false;
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
.width8 {
  width: 80%;
}

.width9 {
  width: 70%;
}

.tempImgList {
  // opacity: 1;
  width: 38px !important;
  height: 30px !important;
  // margin-top: -30px;
  cursor: pointer;
  position: absolute;
  z-index: 11;
  img {
    width: 38px !important;
    height: 30px !important;
  }
}
</style>
