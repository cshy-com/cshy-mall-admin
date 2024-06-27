<template>
  <div>
    <el-dialog :title="dataForm.id == null ? '新增' : '修改'" :close-on-click-modal="false"  :visible.sync="isVisible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataFormRef" @submit.prevent label-width="auto">
        <el-form-item label="过期时间" prop="expireTime">
          <!-- :disabled-date="disabledDate"    format="yyyy-MM-DD"    -->
          <el-date-picker v-model="dataForm.expireTime"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd HH:mm:ss"  type="date" placeholder="请选择过期时间"
          />
          
     
          </el-form-item>
        <el-form-item label="积分值" prop="integral" v-if="!isBatch" :rules="[
          {
            required: true,
            message: '请输入积分值',
            trigger: 'blur',
          },
        ]">
        <!--  -->
          <el-input-number v-model="dataForm.integral"  :min="1" :max="9999" :step-strictly="true" :controls="false"
            placeholder="1~9999"></el-input-number>
        </el-form-item>
        <el-form-item label="" prop="couponList" v-else :rules="[
          {
            required: true,
            message: '最少输入一组数据',
            trigger: 'blur',
          },
        ]">
          <el-table :data="dataForm.couponList" style="width: 100%">
            <el-table-column prop="integral" label="积分值">
              <template #default="scope">
                <el-input-number @change="changeIntegralValue($event, scope.$index)" v-model="scope.row.integral"
                  :min="1" placeholder="1~9999" :max="9999" :step-strictly="true" :controls="false"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="数量">
              <template #default="scope">
                <el-input-number v-model="scope.row.number" :max="500" :controls="false" :min="1"
                  :step-strictly="true" placeholder="1~500"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="mt-4" style="width: 100%; margin-top: 30px" @click="onAddItem">添加</el-button>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isVisible = false">取消</el-button>
          <el-button type="primary" @click="dataFormSubmit()"
            v-loading.fullscreen.lock="fullscreenLoading">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  integralAdd,
  integralBatchAdd,
  integralDetail,
  integralUpdate,

} from '@/api/store.js'


export default {
  props: {
    isBatch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parentGoods: [],
      isVisible: false,
      fullscreenLoading: false,
      dataForm: {
        id: null,
        integral: undefined,
        // firstPartyId: null,
        couponList: [],
        expireTime: null,
      },
      bankOptions: [],
      tabIndex: -1,
      dataRule: {
      
        expireTime: [
          {
            required: true,
            message: '请选择过期时间',
            trigger: 'change',
          },
        ],
      }, isDisabled: false,
      uploadVisible: false,
    }
  },


  methods: {


    // disabledDate(time) {
    //   return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
    // },
    deleteRow(index) {
      this.dataForm.couponList.splice(index, 1)
    },
    changeIntegralValue(e, tabIndex) {
      let ootherLine = this.dataForm.couponList.filter(
        (val, index) => index != tabIndex
      )
      if (ootherLine.some((val) => val.integral == e)) {
        this.$message.warning('已经有相同的积分面值,请重新输入')

        this.dataForm.couponList[tabIndex].integral = ''
      }
    },
    onAddItem() {
      if(this.dataForm&&this.dataForm.couponList){
        if (this.dataForm.couponList.length >= 10) {
        this.$message.warning('最多新增10个')
        return
      }
      this.dataForm.couponList.push({
        integral: undefined,
        number: undefined,
      })
      }
      
    },

    init(row) {
      
      this.isVisible = true
      this.isDisabled = false
      this.uploadVisible = true
      this.$nextTick(async () => {
        // this.resetForm('dataFormRef')
        if (row) {
          try {
            let res = await integralDetail(row.id)
             
            //  编辑回显数据
            this.dataForm = { ...res }
            this.dataForm.couponList = []
          } catch (e) {
            console.log(e)
          }
        } else {
          this.dataForm.id = null
        }
      })

    },
  async  saveForm() {
      let http = this.isBatch
        ? integralBatchAdd
        : this.dataForm.id
          ? integralUpdate
          : integralAdd // data.dataForm.id ? integralUpdate :integralAdd //   :(isBatch? integralBatchAdd:integralAdd)
      try {
        let { id, integral, couponList, expireTime } = this.dataForm
        let params = {
          id,
          integral,
          
          couponList,
          expireTime,
        }
        if (!this.isBatch) {
          delete params.couponList
        }else{
          delete params.integral
          if(params.couponList.some(val=>["",null,undefined,'null','undefined',0].includes(val.number) ||["",null,undefined,'null','undefined',0].includes(val.integral))){
            this.$message.error('批量新增中有部分积分数量都为空，请检查后重试')
            return
          }
        
        }
        if(!this.dataForm.id){
          delete params.id
        }
          
        // params.expireTime=params.expireTime+' 23:59:59'
        await http({ ...params })
        this.isVisible = false
        this.$emit('refreshDataList')
        this.$message.success(data.dataForm.id ? '修改成功' : '新增成功')
      } catch (e) {
        console.log(e)
      }
      // 调用接口保存数据
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs.dataFormRef.validate((valid) => {
        if (valid) {
          this.saveForm()
        }
      })
    }
  },
  mounted() {

  }

}
</script>

<style lang="scss" scoped>
.cateClass {
  padding-left: 20px;
}
</style>
