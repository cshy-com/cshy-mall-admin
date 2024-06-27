<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-27 16:49:13
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-04-08 11:41:11
 * @FilePath: \cshy-admin\src\views\dashboard\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-button style="margin-top: 30px;"ize="small"   type="primary"  @click="add()">一键同步</el-button>
    <!--头部-->
    <base-info ref="baseInfo" v-if="checkPermi(['admin:statistics:home:index'])" />
    <!--小方块-->
    <grid-menu class="mb20"/>
    <!--订单统计-->
    <visit-chart ref="visitChart"/>
    <!--用户-->
    <user-chart ref="userChart" class="mb20" v-if="checkPermi(['admin:statistics:home:chart:user'])" />
  </div>
</template>

<script>
import {yddSync} from "@/api/system.js"
import baseInfo from './components/baseInfo'; 
import gridMenu from './components/gridMenu';
import visitChart from './components/visitChart';
import userChart from './components/userChart';
import { checkPermi } from "@/utils/permission"; // 权限判断函数
export default {
  name: 'Dashboard',
  components: { baseInfo, gridMenu, visitChart, userChart}, 
  data() {
    return {
      authStatus:null,
      authHost:'',
      authQueryStatus:false
    }
  },
  methods:{
    checkPermi,
    add(){
      yddSync().then(res=>{
        
      })
    }
  },
}
</script>
