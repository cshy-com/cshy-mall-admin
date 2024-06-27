<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-01-10 17:11:20
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-06-06 21:50:12
 * @FilePath: \cshy-wechatd:\work\cshy-admin\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <keep-alive>
        <!-- 需要缓存的视图组件 --> 
        <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
      <!-- 不需要缓存的视图组件 -->
     <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
