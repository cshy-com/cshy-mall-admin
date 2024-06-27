<template>
  <div>
    <el-dialog title="打印信息预览" :visible.sync="dialogVisible" width="800px">
      <div id="printJS-form" style="width: 100%;">
      
        <div
          v-for="item in printData"
          style=""
          :key="item.id"
          class="print-box"
          id="print-box"
        >   
       
          <div style="    width: 100%;">    
            <div class="print-title">
              <div class="print-title-item">微商城</div>
              <div class="print-title-item">订单编号:{{ item.orderId }}</div>
            </div>
            <div class="print-title">
              <div class="print-title-item">
                下单时间：{{ item.createTime }}
              </div>
              <div class="print-title-item">支付时间：{{ item.payTime }}</div>
            </div>
            <div class="print-title">
              <div class="print-title-item">
                支付方式：{{ item.payTypeStr }}
              </div>
              <div class="print-title-item">买家昵称：{{ item.realName }}</div>
            </div>
            <div class="print-title" v-if="item.shippingType == 2">
              <div class="print-title-item">
                提货人手机：{{ item.userMobile }}
              </div>
              <div class="print-title-item">
                自提点：{{ item.storeName || item.address }}
              </div>
            </div>
            <div class="print-title" v-if="item.shippingType == 1">
              <div class="print-title-item">
                收货人信息：{{ item.realName }},{{ item.userMobile }}
              </div>
              <div class="print-title-item">收货地址：{{ item.address }}</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th  >序号</th>
                  <th  >商家编码</th>
                  <th style="width: 50%;" >商品名称</th>
                  <th  >规格</th>
                  <th  >单价</th>
                  <th  >数量</th>

                  <th  >小计</th>
                  <th  >实收</th>
                  <th  >买家备注</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(prod, index) in item.productList">
                  <td  >{{ index + 1 }}</td>
                  <td  >{{ prod.shipNum }}</td>
                  <td  >{{ prod.info.productName }}</td>
                  <td  >{{ prod.info.sku }}</td>
                  <td  >{{ prod.info.price }}</td>
                  <td  >{{ prod.info.payNum }}</td>
                  <td  >
                    {{ prod.info.price * prod.info.payNum }}
                  </td>
                  <td  >
                    {{ prod.allPrice < 0 ? 0 : prod.allPrice }}
                  </td>
                  <td
                    v-if="index == 0"
                    :rowspan="item.productList.length + 1"
                     
                  >
                    {{ item.remark }}
                  </td>
                </tr>
                <tr>
                  <td :rowspan="1" colspan="3">
                    总金额：{{ item.totalPrice }} <br /><template
                      v-if="item.shippingType == 1"
                      >运费：{{ item.totalPostage }}</template
                    >
                  </td>
                  <td colspan="5">
                    优惠金额:{{ item.useIntegral }}(积分抵扣：{{
                      item.useIntegral
                    }}) <br />实付款：{{ item.payPrice }}
                  </td>
                </tr>
                <tr>
                  <td colspan="5">发货人：</td>
                  <td colspan="4">收货人：</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="PrintOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import print from "print-js";
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      printData: [],
      dialogVisible: false,
    };
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    init(multipleSelection) {
      this.dialogVisible = true;
      multipleSelection.forEach((val) => {
        var allPrice = 0;
        var totalPrice = val.productList.reduce((accumulator, currentValue) => {
          return (
            accumulator +
            Number(currentValue.info.price) * currentValue.info.payNum
          );
        }, 0);

        val.productList.forEach((item, index) => {
          if (Number(val.payPrice) > 0) {
            let price = Number(item.info.price) * item.info.payNum;
            if (val.productList.length == 1) {
              item["allPrice"] = val.payPrice;
            } else if (index == val.productList.length - 1) {
              let arr = val.productList.slice(0, val.productList.length - 1);
              var prePrice = arr.reduce((accumulator, currentValue, index) => {
                return accumulator + Number(currentValue.allPrice);
              }, 0);

              item["allPrice"] = (val.payPrice - prePrice).toFixed(2);
            } else {
              item["allPrice"] = ((price / totalPrice) * val.payPrice).toFixed(
                2
              );
            }
          } else {
            item["allPrice"] = 0;
          }
        });
      });
      this.printData = multipleSelection;
    },
    PrintOK() {
      this.$nextTick(() => {
        print({
          printable: "printJS-form", //打印区域
          type: "html", //打印类型html，还可以是json，image等，详细写法见官网
          targetStyles: ["*"], //css样式，写成*代表打印样式完全继承你页面的样式
          cssStyle: 'width: 100%;',
          style:
            "@page{size:190mm landscape; margin:15mm;  display: flex;justify-content: center;align-items: center;}  body{ zoom :105%;margin:0 auto;} ",
          maxWidth: "190mm", //打印界面最大宽度，适当调整可以解决打印页面过宽，显示不完整的问题
          font_size: "6pt",
          documentTitle: "融威商城",
          onEnd: () => {},
        });
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
#printJS-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.print-box {
  // background: #fff;
  width: 100%;
  padding-bottom: 20px;
  page-break-inside: avoid;
  page-break-after: avoid;
  page-break-before: avoid;
  page-break-before: always;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
 
 
  font-size: 12px;
  .print-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 20px;
    margin-left: 0px;
    .print-title-item {
      width: 40%;
    }
    .print-title-item:nth-child(2n) {
      width: 53%;
    }
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table,
  th,
  td {
    border: 1px solid #666;
    padding: 5px;
    line-height: 20px;
  }
}
</style>
