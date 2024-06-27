<template>
  <el-dialog
    :visible.sync="modals"
    title="批量修改"
    class="order_box"
    :before-close="handleClose"
    width="600px"
  >
    <el-form
      ref="formItem"
      :model="formItem"
      label-width="150px"
      @submit.native.prevent
      :rules="rules"
    >
      <el-form-item label="礼品活动：" prop="giftCardTypeId">
        <el-select
          v-model="formItem.giftCardTypeId"
          class="m-2"
          placeholder="请选择礼品活动"
          size="small"
        >
          <el-option
            v-for="item in optionList"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="礼品卡券序列号：" prop="serialNoList">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入礼品卡券序列号,以换行符分隔"
          v-model="formItem.serialNoList"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="cancel('formItem')">取消</el-button>
      <el-button type="primary" @click="putSend('formItem')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { giftCardUpdate, giftCardTypeList } from "@/api/marketing";
 
import { Debounce } from "@/utils/validate";

export default {
  name: "couponUpdate",

  data() {
    return {
      formItem: {
        giftCardTypeId: null,
        serialNoList: null
      },
      modals: false,

      rules: {
        giftCardTypeId: [
          { required: true, message: "请选择礼品活动", trigger: "change" }
        ],
        serialNoList: [
          { required: true, message: "请输入礼品卡券序列号", trigger: "blur" }
        ]
      },
      optionList: []
    };
  },
  mounted() {
    this.getSelectList();
  },
  methods: {
    async getSelectList() {
      let res = await giftCardTypeList({});

      this.optionList = res;
    },

    // 提交
    putSend: Debounce(function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.formItem)
      
          giftCardUpdate(this.formItem).then(async => {
          
            this.$message.success("修改成功");
            this.modals = false;
            this.$refs[name].resetFields();
            this.$emit("submitFail");
          }).catch(err => {
            this.$emit("submitFail");
        console.log(err)
      })

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
