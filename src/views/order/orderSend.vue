<template>
  <el-dialog :visible.sync="modals" title="发送货" class="order_box" :before-close="handleClose" width="800px">
    <el-form ref="formItem" :model="formItem" label-width="110px" @submit.native.prevent :rules="rules">
      <el-form-item label="选择类型：">
        <el-radio-group v-model="formItem.type" @change="changeRadioType(formItem.type)">
          <el-radio label="1">发货</el-radio>
         <el-radio label="2">送货</el-radio>
          <!--  <el-radio label="3">虚拟</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <div >
        <el-form-item label="发货类型：" prop="expressId" v-if="formItem.type==='1'">
          <el-radio-group v-model="formItem.expressRecordType" @change="changeRadio(formItem.expressRecordType)">
            <el-radio label="1">手动填写</el-radio>
            <!-- <el-radio label="2" v-if="checkPermi(['admin:order:sheet:info'])">电子面单打印</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="快递公司：" prop="expressCode">
          <el-select v-model="formItem.expressCode" filterable style="width:80%;"
                     @change="onChangeExport(formItem.expressCode)">
            <el-option v-for="(item,i) in express" :value="item.code" :key="i" :label="item.name"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item   label="商品信息：" prop="singleOrderRequestList">
         
          <el-table
            :data="orderInfo"
            style="width: 100%">
            <el-table-column
              prop="mainImage"
              label="图片"
             >   <template slot-scope="scope">
              <img :src="scope.row.mainImage" style="width: 50px;">
             </template>
            </el-table-column>
            <el-table-column
              prop="productName"
              label="名称"
             >
            </el-table-column>
            <el-table-column
              prop="sku"
              label="规格"
             ><template slot-scope="scope">
              {{scope.row.sku}} * {{ scope.row.payNum }}
             </template>
            </el-table-column>
            
            <el-table-column
              prop="shipNum"
              label="已发货"
             >
            </el-table-column>
            <el-table-column
              prop="num"
              label="发货数量"
             >
             <template slot-scope="scope">
              <el-input-number   style="width: 50px;" size="small" :controls="false" :step="1" :precision="0"  v-model="scope.row.num"  :min="0" :max="scope.row.payNum-scope.row.shipNum" label="发货数量"></el-input-number>

             
             </template
>            </el-table-column>
          </el-table>
          </el-form-item>
          
        <el-form-item v-if="formItem.type==='1'" label="快递单号：" prop="expressNumber">
          <el-input v-model="formItem.expressNumber" placeholder="请输入快递单号" style="width:80%;"></el-input>
 <!-- <div style="color:red">多个物流单号请以英文逗号分割</div> -->
        </el-form-item>
      
        <!-- <template v-if="formItem.expressRecordType === '2'">
          <el-form-item label="电子面单：" class="express_temp_id" prop="expressTempId">
            <div class="acea-row">
              <el-select v-model="formItem.expressTempId" placeholder="请选择电子面单"
                         :class="[formItem.expressTempId?'width9':'width8']" @change="onChangeImg">
                <el-option v-for="(item,i) in exportTempList" :value="item.temp_id" :key="i"
                           :label="item.title"></el-option>
              </el-select>
              <div v-if="formItem.expressTempId" style="position: relative;">
             
                <div class="tempImgList ml10">
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 36px; height: 36px"
                      :src="tempImg"
                      :preview-src-list="[tempImg]"
                    />
                  </div>
                </div>
              </div>
           </div>

          </el-form-item>
          <el-form-item label="寄件人姓名：" prop="toName">
            <el-input v-model="formItem.toName" placeholder="请输入寄件人姓名" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="寄件人电话：" prop="toTel">
            <el-input v-model="formItem.toTel" placeholder="请输入寄件人电话" style="width:80%;"></el-input>
          </el-form-item>
          <el-form-item label="寄件人地址：" prop="toAddr">
            <el-input v-model="formItem.toAddr" placeholder="请输入寄件人地址" style="width:80%;"></el-input>
          </el-form-item>
        </template> -->
      </div>
      <!-- <div v-if="formItem.type==='2'">
        <el-form-item label="送货人姓名：" prop="deliveryName">
          <el-input v-model="formItem.deliveryName" placeholder="请输入送货人姓名" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="送货人电话：" prop="deliveryTel">
          <el-input v-model="formItem.deliveryTel" placeholder="请输入送货人电话" style="width:80%;"></el-input>
        </el-form-item>
      </div> -->
      <div>
        <!-- <el-form-item label="" >
          <div style="color:#CECECE;">顺丰请输入单号：收件人或寄件人手机号后四位</div>
          <div style="color:#CECECE;">例如：SF000000000000:3941</div>
        </el-form-item> -->
      </div>
    </el-form>
    <div slot="footer">
      <el-button  type="primary" @click="putSend('formItem')">提交</el-button>
      <el-button  @click="cancel('formItem')">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {orderSendApi, sheetInfoApi,orderSendShip} from '@/api/order'
  
import {giftCardOrderPage,orderShip} from "@/api/marketing"
  import {expressAllApi, exportTempApi} from '@/api/sms'
  import { checkPermi } from "@/utils/permission"; // 权限判断函数
  import {Debounce} from '@/utils/validate'
  const validatePhone = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请填写手机号'));
    } else if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error('手机号格式不正确!'));
    } else {
      callback();
    }
  };
  const validateCode=(rule, value, callback) => {
      let httpReg = /^[a-zA-Z0-9]+$/
      // let httpReg2=/^[a-zA-Z0-9,]+$/
      if (value !== '') {
        
        if (!(httpReg.test(value))) {
          callback(new Error('请填写正确的快递单号'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请输入快递单号'))
      }
    }
  export default {
    name: 'orderSend',
    props: {
      orderId: String,
      orderType:{
        type:String,
      default:'0'

      }
    },
  

    data() {
    
      return {
        formItem: {
          type: '1',
          expressRecordType: '1',
          expressId: '',
          expressCode: '',
          deliveryName: '',
          deliveryTel: '',
          // expressName: '',
          expressNumber: '',
          expressTempId: '',
          toAddr: '',
          toName: '',
          toTel: '',
          orderNo: ''
        },
        modals: false,
        express: [],
        exportTempList: [],
        tempImg: '',
        rules: {
          // toName: [
          //   {required: true, message: '请输寄件人姓名', trigger: 'blur'}
          // ],
          // toTel: [
          //   {required: true, validator: validatePhone, trigger: 'blur'}
          // ],
          // toAddr: [
          //   {required: true, message: '请输入寄件人地址', trigger: 'blur'}
          // ],
          // expressCode: [
          //   {required: true, message: '请选择快递公司', trigger: 'change'}
          // ],
          expressNumber: [
            {required: true, message: '请输入快递单号', trigger: 'blur'},

            // { pattern: (/^[a-zA-Z0-9]+$/||/^[a-zA-Z0-9,]+$/), message: '只能输入数字+字母,并且以为,分割', trigger: 'blur' },
            { validator: validateCode, trigger: 'blur' }

          ],
          // expressTempId: [
          //   {required: true, message: '请选择电子面单', trigger: 'change'}
          // ],
          // deliveryName: [
          //   {required: true, message: '请输入送货人姓名', trigger: 'blur'}
          // ],
          // deliveryTel: [
          //   {required: true, validator: validatePhone, trigger: 'blur'}
          // ]
        },
        expressType: 'normal',
        orderInfo:[]
      }
    },
    mounted() {
    },
    methods: {
      checkPermi,
      // 默认信息
      sheetInfo(row) {
        this.orderInfo=[]
        row.productList.forEach(val=>{

          this.orderInfo.push({
    mainImage:val.info.mainImage,
    productName:val.info.productName,
    sku:val.info.sku,
    payNum:val.info.payNum,
    shipNum:val.info.shipNum,
    attrValueId:val.info.attrValueId,
    productId:val.productId,
    num:""
})
})
      
        sheetInfoApi().then(async res => {
          this.formItem.toAddr = res.exportToAddress || '';
          this.formItem.toName = res.exportToName || '';
          this.formItem.toTel = res.exportToTel || '';
        })
      },
      // 快递公司选择
      onChangeExport(val) {
        this.formItem.expressTempId = '';
        if (this.formItem.expressRecordType === '2') this.exportTemp(val);
      },
      // 电子面单模板
      exportTemp(val) {
        exportTempApi({com: val}).then(async res => {
          this.exportTempList = res.data.data || [];
        })
      },
      onChangeImg(item) {
        this.exportTempList.map(i => {
          if (i.temp_id === item) this.tempImg = i.pic
        })
      },
      changeRadioType() {
        this.formItem.expressId = ''
        this.formItem.expressCode = ''
      },
      changeRadio(o) {
        if (o == 2){
          this.expressType = 'elec'
        }else{
          this.expressType = 'normal'
        }
        this.formItem.expressId = ''
        this.formItem.expressCode = ''
        this.getList();
      },
      // 物流公司列表
      getList() {
        expressAllApi({type: this.expressType}).then(async res => {
          this.express = res
        })
      },
      // 提交
      putSend:Debounce(function(name) {
        this.formItem.orderNo = this.orderId;
        if( this.orderInfo.some(val=>val.num>val.payNum- val.shipNum)){
            this.$message.error('发货数量不能大于剩余订单数量')
            return
           }
           if( this.orderInfo.every(val=>["",null,undefined,"null",'undefined',0].includes( val.num))){

              this.$message.error('请输入发货数量')
            return
           }

 let singleOrderRequestList=[]
            this.orderInfo.forEach(val=>{
              singleOrderRequestList.push({
                attrValueId:val.attrValueId,
                num:val.num,
                productId:val.productId 
              })
            })
        if(this.formItem.type=='2'){
          let params={
            orderId:this.orderId,
                      trackingNo:'zp666',
                      type:this.orderType,
                      singleOrderRequestList:singleOrderRequestList
          }
          this.sendOrder(params)
          return 
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
         
           debugger
           

            
            // this.formItem
            let params={
              orderId:this.orderId,
              trackingNo:this.formItem.expressNumber,
              type:this.orderType,
              singleOrderRequestList:singleOrderRequestList
            }
        //  0普通订单 1 礼品卡订单
        // let http=this.orderType==1?orderSendShip:orderShip
          this.sendOrder(params)
       
          } else {
            this.$message.error('请填写信息');
          }
        })
      }),
      sendOrder(params){
        orderSendShip(params).then(async => {
       
              this.$message.success('发送货成功');
              this.modals = false;
              this.$refs['formItem'].resetFields();
              this.$emit('submitFail')
            })
      },
      handleClose() {
        this.cancel('formItem');
      },
      cancel(name) {
        this.modals = false;
        this.$refs[name].resetFields();
        this.formItem.type = '1';
        this.formItem.expressRecordType = '1';
      }
    }
  }
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
