<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-01-23 10:07:49
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-02-22 14:49:21
 * @FilePath: \cshy-admin\src\views\marketing\homeSet\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="divBox">
    <el-card class="box-card">
       

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="是否启用该模块" prop="isEnabled">
          <el-switch v-model="ruleForm.isEnabled"  :active-value="0"
    :inactive-value="1"></el-switch>
        </el-form-item>

        <el-form-item label="背景图片" prop="mainBanner">
          <div class="upLoadPicBox" @click="modalPicTap(0, '1')">
            <div v-if="ruleForm.mainBanner" class="pictrue">
              <img :src="ruleForm.mainBanner" />
            </div>
            <div v-else class="upLoad">
              <i class="el-icon-camera cameraIconfont" />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="左1活动图片" prop="banner1">
          <div class="upLoadPicBox" @click="modalPicTap(1, '1')">
            <div v-if="ruleForm.banner1" class="pictrue">
              <img :src="ruleForm.banner1" />
            </div>
            <div v-else class="upLoad">
              <i class="el-icon-camera cameraIconfont" />
            </div>
          </div>
        </el-form-item>

        <el-form-item label="左边跳转链接1" prop="url1">
          <el-input v-model="ruleForm.url1"></el-input>
        </el-form-item>
        <el-form-item label="右1活动图片" prop="banner2">
          <div class="upLoadPicBox" @click="modalPicTap(2, '1')">
            <div v-if="ruleForm.banner2" class="pictrue">
              <img :src="ruleForm.banner2" />
            </div>
            <div v-else class="upLoad">
              <i class="el-icon-camera cameraIconfont" />
            </div>
          </div>
        </el-form-item>

        <el-form-item label="右边跳转链接1" prop="url2">
          <el-input v-model="ruleForm.url2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存配置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { bannerActivityConfigUpdate,bannerActivityConfigPage } from "@/api/marketing";
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        isEnabled: true,
        mainBanner: null,
        url1: null,
        url2: "",
        banner1: null,
        banner2: null,
      },
      rules: {
        mainBanner: [{ required: true, message: "请上传图片", trigger: "blur" }],
        banner1: [{ required: true, message: "请上传图片", trigger: "blur" }],
        banner2: [{ required: true, message: "请上传图片", trigger: "blur" }],
        url1: [{ required: true, message: "请填写链接", trigger: "blur" }],
        url2: [{ required: true, message: "请填写链接", trigger: "blur" }],
      },
    };
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
 
    async getConfig() {
      let data = await bannerActivityConfigPage({
        current: 1,
        size: 10,
      });

      this.ruleForm = data.list[0];
    },
    modalPicTap(position, tit, num, i) {
      const _this = this;
      const attr = [];
      this.$modalUpload(
        function (img) {
          if (tit === "1" && !num) {
            if (position == 0) {
              _this.ruleForm.mainBanner = img[0].sattDir;
              return;
            }
            if (position == 1) {
              _this.ruleForm.banner1 = img[0].sattDir;
              return;
            }
            if (position == 2) {
              _this.ruleForm.banner2 = img[0].sattDir;
              return;
            }
          }
        },
        tit,
        "store"
      );
    },

    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let params={...this.ruleForm}
          delete params.createTime
          delete params.updateTime
          try{
            let res=await bannerActivityConfigUpdate(params)
         this.$message.success('操作成功')
          } catch(e){
            this.$message.error(e) 
          }
      
        } else {
       
          return false;
        }
      });
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getConfig();
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
};
</script>
<style scoped lang="scss">
.box-bg {
  width: 300px;
  height: 100px;
  border: 1px solid #666666;
  display: flex;
  justify-content: space-between;
}
.box-left,
.box-right {
  width: 50px;
  height: 50px;
  border: 1px solid #666666;
}
</style>
