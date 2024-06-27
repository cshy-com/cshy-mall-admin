/*
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-27 16:49:12
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2023-11-02 10:49:32
 * @FilePath: \cshy-admin\src\directive\permission\hasPermi.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from '@/store'

export default {
    inserted(el, binding, vnode) {
        // 当被绑定的元素插入到 DOM 中时……
        const { value } = binding
        const all_permission = "*:*:*";
        //超管标识
        const permissions = store.getters && store.getters.permissions
            //从getters中取出从接口请求到的权限标识数组
        if (value && value instanceof Array && value.length > 0) {
            //value为指令的绑定值，并且要求是一个非空数组
            const permissionFlag = value

            const hasPermissions = permissions.some(permission => {
                //some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
                //如果是超管或者其他管理员有对应的权限标识
                return all_permission === permission || permissionFlag.includes(permission)
                    //检测数组 permissionFlag 是否包含 permission 
            })

            if (!hasPermissions) {
                el.parentNode && el.parentNode.removeChild(el)
                    //否则就删除该节点，体现在页面上就是没有按钮对应的权限标识就不显示该按钮
            }
        } else {
            throw new Error(`请设置操作权限标签值`)
                //页面上使用v-hasPermi没有传值的情况下给的提示 
        }
    }
}