 import request from '@/utils/request'

 /**
  * 订单 列表
  * @param prams
  */
 export function orderListApi(params) {
     return request({
         url: '/admin/store/order/list',
         method: 'get',
         params
     })
 }

 /**
  * 订单 列表 获取各状态数量
  * @param params
  */
 export function orderStatusNumApi(params) {
     return request({
         url: '/admin/store/order/status/num',
         method: 'get',
         params
     })
 }

 /**
  * 订单 列表 数据统计
  * @param params
  */
 export function orderListDataApi(params) {
     return request({
         url: '/admin/store/order/list/data',
         method: 'get',
         params
     })
 }
 /**
  * 订单 删除
  * @param params
  */
 export function orderDeleteApi(params) {
     return request({
         url: '/admin/store/order/delete',
         method: 'get',
         params
     })
 }

 /**
  * 订单 编辑
  * @param prams
  */
 export function orderUpdateApi(data, params) {
     return request({
         url: '/admin/store/order/update',
         method: 'post',
         data,
         params
     })
 }

 /**
  * 订单 记录
  * @param prams
  */
 export function orderLogApi(params) {
     return request({
         url: '/admin/store/order/status/list',
         method: 'get',
         params
     })
 }

 /**
  * 订单 详情
  * @param prams
  */
 export function orderDetailApi(params) {
     return request({
         url: '/admin/store/order/info',
         method: 'get',
         params
     })
 }

 /**
  * 订单 备注
  * @param prams
  */
 export function orderMarkApi(params) {
     return request({
         url: '/admin/store/order/mark',
         method: 'post',
         params
     })
 }

 /**
  * 订单 发货
  * @param prams
  */
 export function orderSendApi(data) {
     return request({
         url: '/admin/store/order/send',
         method: 'post',
         data
     })
 }
 //  订单发货
 export function orderSendShip(data) {
     return request({
         url: '/admin/store/order/ship',
         method: 'post',
         data
     })
 }

 /**
  * 订单 拒绝退款
  * @param prams
  */
 export function orderRefuseApi(params) {
     return request({
         url: '/admin/store/order/refund/refuse',
         method: 'get',
         params
     })
 }

 //  订单 同意退货退款
 export function refundReturn(params) {
     return request({
         url: '/admin/store/order/refund/return',
         method: 'get',
         params
     })
 }
 //  订单 同意退货退款---确认退款
 export function refundArrived(params) {
     return request({
         url: '/admin/store/order/refund/arrived',
         method: 'get',
         params
     })
 }


 /**
  * 订单 立即退款
  * @param prams
  */
 export function orderRefundApi(data) {
     return request({
         url: '/admin/store/order/refund',
         method: 'post',
         data
     })
 }

 /**
  * 订单 核销订单
  * @param prams
  */
 export function writeUpdateApi(vCode) {
     return request({
         url: `/admin/store/order/writeUpdate/${vCode}`,
         method: 'get'
     })
 }

 /**
  * 订单 核销码查询待核销订单
  * @param prams
  */
 export function writeConfirmApi(vCode) {
     return request({
         url: `/admin/store/order/writeConfirm/${vCode}`,
         method: 'get'
     })
 }

 /**
  * 订单 统计 头部数据
  */
 export function orderStatisticsApi() {
     return request({
         url: `/admin/store/order/statistics`,
         method: 'get'
     })
 }

 /**
  * 核销订单 月列表数据
  */
 export function statisticsDataApi(params) {
     return request({
         url: `/admin/store/order/statisticsData`,
         method: 'get',
         params
     })
 }

 /**
  * 一键改价
  */
 export function updatePriceApi(data) {
     return request({
         url: `admin/store/order/update/price`,
         method: 'post',
         data
     })
 }

 /**
  *订单统计详情
  */
 export function orderTimeApi(params) {
     return request({
         url: `/admin/store/order/time`,
         method: 'get',
         params
     })
 }

 /**
  *面单默认配置信息
  */
 export function sheetInfoApi() {
     return request({
         url: `/admin/store/order/sheet/info`,
         method: 'get'
     })
 }

 /**
  *面单默认配置信息
  */
 export function getLogisticsInfoApi(params) {
     return request({
         url: `/admin/store/order/getLogisticsInfo`,
         method: 'get',
         params
     })
 }

 /**
  *视频号物流公司
  */
 export function companyGetListApi() {
     return request({
         url: `/admin/pay/component/delivery/company/get/list`,
         method: 'get'
     })
 }

 /**
  *视频号物流公司
  */
 export function videoSendApi(data) {
     return request({
         url: `/admin/store/order/video/send`,
         method: 'post',
         data
     })
 }

 /**
  *打印小票
  */
 export function orderPrint(id) {
     return request({
         url: `/admin/yly/print/${id}`,
         method: 'get',
     })
 }

 //  同步物流信息
 export function expressSyncExpressStatus() {
     return request({
         url: `/admin/express/syncExpressStatus`,
         method: 'get',

     })
 }

 //  退款退货后-----确认确认退款
 export function orderRefundArrived(params) {
     return request({
         url: `/admin/store/order/refund/arrived`,
         method: 'get',
         params

     })
 }
 export function orderRefundCompute(data) {
     return request({
         url: `/admin/store/order/refund/compute`,
         method: 'post',
         data

     })
 }