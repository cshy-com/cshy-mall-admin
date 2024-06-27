/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-09-07 17:29:05
 * @LastEditors: zxs 774004514@qq.com
 * @LastEditTime: 2023-10-19 09:56:44
 * @FilePath: \admin\src\plugins\download.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { saveAs } from 'file-saver'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

const baseURL = process.env.VUE_APP_BASE_API

export default {
    name(name, isDelete = true) {
        var url = baseURL + "/common/download?fileName=" + encodeURI(name) + "&delete=" + isDelete
        axios({
            method: 'get',
            url: url,
            responseType: 'blob',
            headers: { 'Authorization': 'Bearer ' + getToken() }
        }).then(async(res) => {
            const isLogin = await this.blobValidate(res.data);
            if (isLogin) {
                const blob = new Blob([res.data])
                this.saveAs(blob, decodeURI(res.headers['download-filename']))
            } else {
                Message.error('无效的会话，或者会话已过期，请重新登录。');
            }
        })
    },
    resource(resource) {
        var url = baseURL + "/common/download/resource?resource=" + encodeURI(resource);
        axios({
            method: 'get',
            url: url,
            responseType: 'blob',
            headers: { 'Authorization': 'Bearer ' + getToken() }
        }).then(async(res) => {
            const isLogin = await this.blobValidate(res.data);
            if (isLogin) {
                const blob = new Blob([res.data])
                this.saveAs(blob, decodeURI(res.headers['download-filename']))
            } else {
                Message.error('无效的会话，或者会话已过期，请重新登录。');
            }
        })
    },
    zip(url, name) {
        var url = baseURL + url
        axios({
            method: 'get',
            url: url,
            responseType: 'blob',
            headers: { 'Authorization': 'Bearer ' + getToken() }
        }).then(async(res) => {
            const isLogin = await this.blobValidate(res.data);
            if (isLogin) {
                const blob = new Blob([res.data], { type: 'application/zip' })
                this.saveAs(blob, name)
            } else {
                Message.error('无效的会话，或者会话已过期，请重新登录。');
            }
        })
    },
    saveAs(text, name, opts) {
        saveAs(text, name, opts);
    },
    async blobValidate(data) {
        try {
            const text = await data.text();
            JSON.parse(text);
            return false;
        } catch (error) {
            return true;
        }
    },
}