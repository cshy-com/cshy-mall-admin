<template>
  <el-dialog
    :visible.sync="modals"
    title="批量新增"
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
      <el-form-item label="生效时间：" prop="effectiveTime">
        <el-date-picker
          v-model="formItem.effectiveTime"
          type="date"
          placeholder="请选择生效时间"
          :size="'small'"
          format="yyyy-MM-dd"
          :picker-options="pickerOptions"

          value-format="yyyy-MM-dd"
        />
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

      <el-form-item label="生成张数：" prop="generateNumber">
        <el-input
          v-model="formItem.generateNumber"
          placeholder="请输入生成张数"
          style="width:80%;"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="cancel('formItem')">取消</el-button>
      <el-button type="primary" @click="putSend('formItem')">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { giftCardBatchAdd, giftCardTypeList } from "@/api/marketing";
import { checkPermi } from "@/utils/permission"; // 权限判断函数
import { Debounce } from "@/utils/validate";

export default {
  name: "couponAdd",

  data() {
    return {
      formItem: {
        giftCardTypeId: null,
        effectiveTime: null,
        status: "0",
        generateNumber: null
      },
      modals: false,

      rules: {
        expressNumber: [
          { required: true, message: "请选择礼品活动", trigger: "change" }
        ],
        effectiveTime: [
          { required: true, message: "请选择生效时间", trigger: "blur" }
        ],
        generateNumber: [
          { required: true, message: "请输入生成张数", trigger: "change" }
        ]
      },
      optionList: [],
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        }, 
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
          giftCardBatchAdd(this.formItem).then(async => {
            this.$message.success("添加成功");
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
      this.formItem.type = "1";
      this.formItem.expressRecordType = "1";
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
