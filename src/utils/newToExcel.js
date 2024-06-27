// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import { export_json_to_excel } from '../vendor/Export1Excel'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { saveAs } from 'file-saver'
const baseURL = process.env.VUE_APP_BASE_API
    /**
     * @method exportExcel
     * @param {Array} header   表头
     * @param {Array} filterVal 表头属性字段
     * @param {String} filename 文件名称
     * @param {Array} tableData 列表数据
     **/
export default function exportExcel(header, filterVal, filename, tableData) {
    var data = formatJson(filterVal, tableData)
    export_json_to_excel(
        header,
        data,
        filename
    )
}

function formatJson(filterVal, tableData) {
    return tableData.map(v => {
        return filterVal.map(j => {
            return v[j]
        })
    })
}

export function exportFile(httpUrl, data) {
    var url = baseURL + httpUrl;
    axios({
        method: 'post',
        url: url,
        responseType: 'blob',
        data: data,
        headers: {
            'Authorization': getToken(),


            // 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        }
    }).then(async(res) => {

        // const isLogin = await this.blobValidate(res.data);
        // if (isLogin) {

        const blob = new Blob([res.data])
        let fileName = res.headers['content-disposition'].split("attachment;filename*=utf-8''")
        saveAs(blob, decodeURI(fileName[1]))
            // } else {
            //     Message.error('无效的会话，或者会话已过期，请重新登录。');
            // }
    })
}