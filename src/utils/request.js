/*
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-27 16:49:13
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-06-06 16:08:14
 * @FilePath: \cshy-admin\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

import SettingMer from '@/utils/settingMer'
import { isPhone } from "@/libs/wechat";

import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import router, { resetRouter } from '@/router'
const service = axios.create({
        baseURL: SettingMer.apiBaseURL,
        timeout: 60000 // 过期时间
    })
    // request interceptor
service.interceptors.request.use(
    config => {
        // 发送请求之前做的
        const token = !store.getters.token ? sessionStorage.getItem('token') : store.getters.token;
        if (token) {
            config.headers['Authorization'] = token
        }
        if (/get/i.test(config.method)) {
            config.params = config.params || {}
            config.params.temp = Date.parse(new Date()) / 1000
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    async(response) => {
        const res = response.data
            // if the custom code is not 20000, it is judged as an error.
        if (res.code === 401) {
            // to re-login
            Message.error('无效的会话，或者登录已过期，请重新登录。');

            removeToken()
            resetRouter()
            localStorage.clear();
            Cookies.remove('storeStaffList')
            Cookies.remove('JavaInfo')
            sessionStorage.removeItem('token')
                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485

            //  router.push(`/login?redirect=${this.$route.fullPath}`);

            router.replace({
                path: '/login',
                query: {
                    missAuth: '1'
                }
            });
            // location.href = 'https://cshy.store/admin/#/login?redirect=%2Fdashboard'

        } else if (res.code === 403) {
            Message.error('没有权限访问。');
        }
        if (res.code !== 200 && res.code !== 401 && res.code !== 0) {
            if (isPhone()) { //移动端
                return Promise.reject(res || 'Error')
            }
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject()
        } else {

            return res.data
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service


export function downloadZip(method, url, data) {

    axios({
        method: method,
        url: SettingMer.apiBaseURL + url,
        headers: {
            Authorization: getToken(),
        },
        data: data,
        responseType: 'blob',
    }).then((res) => {
        console.log(res)
        let blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })

        let fileName = (res.headers['content-disposition'].split("filename*=utf-8"))[1]

        let url = window.URL.createObjectURL(blob)
        const link = document.createElement('a') // 创建a标签
        link.href = url
        link.download = fileName // 重命名文件
        link.click()
        URL.revokeObjectURL(url)
    })
}