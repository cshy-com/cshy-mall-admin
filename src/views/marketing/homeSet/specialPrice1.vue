<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-01-24 10:27:34
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-02-22 15:53:26
 * @FilePath: \cshy-admin\src\views\marketing\homeSet\specialPrice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-01-23 10:07:49
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-02-22 14:27:02
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
        <el-form-item label="是否启用该模块" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="名称" prop="url1">
          <el-input placeholder="特价专区" v-model="ruleForm.url1"></el-input>
        </el-form-item>
        <el-form-item label="tag" prop="url1">
          <el-input placeholder="金秋好礼" v-model="ruleForm.url1"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="bgIcon">
          <div class="upLoadPicBox" @click="modalPicTap(0, '1')">
            <div v-if="ruleForm.bgIcon" class="pictrue">
              <img :src="ruleForm.bgIcon" />
            </div>
            <div v-else class="upLoad">
              <i class="el-icon-camera cameraIconfont" />
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存配置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-button type="primary" @click="addGoodsModel">关联商品</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="date" label="商品图片" width="180">
        </el-table-column>
        <el-table-column prop="name" label="原价" width="180">
        </el-table-column>
        <el-table-column prop="address" label="特价"> </el-table-column>
      </el-table>
    </el-card>
    <pickerGoods ref="pickerGoodsRef" @nextStap='nextStap'></pickerGoods>
  </div>
</template>

<script>
import pickerGoods from "./components/pickerGoods";
export default {
  //import引入组件才能使用
  components: { pickerGoods },
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      ruleForm: {
        delivery: true,
        bgIcon: null,
        url1: null,
        url2: "",
        icon1: null,
        icon2: null,
      },
      rules: {
        bgIcon: [{ required: true, message: "请上传图片", trigger: "blur" }],
        icon1: [{ required: true, message: "请上传图片", trigger: "blur" }],
        icon2: [{ required: true, message: "请上传图片", trigger: "blur" }],
        url1: [{ required: true, message: "请填写链接", trigger: "blur" }],
        url2: [{ required: true, message: "请填写链接", trigger: "blur" }],
      },
      multipleSelection:[]
    };
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    nextStap(e){

    },
    addGoodsModel() {
      this.$refs.pickerGoodsRef.init();
    },
    modalPicTap(position, tit, num, i) {
      const _this = this;
      const attr = [];
      this.$modalUpload(
        function (img) {
          if (tit === "1" && !num) {
            if (position == 0) {
              _this.ruleForm.bgIcon = img[0].sattDir;
              return;
            }
            if (position == 1) {
              _this.ruleForm.icon1 = img[0].sattDir;
              return;
            }
            if (position == 2) {
              _this.ruleForm.icon2 = img[0].sattDir;
              return;
            }
          }
        },
        tit,
        "store"
      );
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
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
.box-card {
  margin-bottom: 20px;
}
</style>
