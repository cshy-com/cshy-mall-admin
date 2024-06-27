 import request from '@/utils/request'

 /**
  * 新增商品
  * @param pram
  */
 export function productCreateApi(data) {
     return request({
         url: '/admin/store/product/save',
         method: 'POST',
         data
     })
 }

 /**
  * 编辑商品
  * @param pram
  */
 export function productUpdateApi(data) {
     return request({
         url: '/admin/store/product/update',
         method: 'POST',
         data
     })
 }

 export function getProductslist(params) {
     return request({
         url: '/front/products',
         method: 'get',
         params
     })

 }
 /**
  * 商品详情
  * @param pram
  */
 export function productDetailApi(id) {
     return request({
         url: `/admin/store/product/info/${id}`,
         method: 'GET'
     })
 }

 /**
  * 删除商品
  * @param pram
  */
 export function productDeleteApi(id, type) {
     return request({
         url: `/admin/store/product/delete/${id}`,
         method: 'get',
         params: { type: type }
     })
 }

 /**
  * 商品列表 表头数量
  */
 export function productHeadersApi() {
     return request({
         url: '/admin/store/product/tabs/headers',
         method: 'GET'
     })
 }

 /**
  * 商品列表
  * @param pram
  */
 export function productLstApi(params) {
     return request({
         url: '/admin/store/product/list',
         method: 'GET',
         params
     })
 }
 /**
  * 商品分类
  * @param pram
  */
 export function categoryApi(params) {
     return request({
         url: '/admin/category/list/tree',
         method: 'GET',
         params
     })
 }
 /**
  * 商品上架
  * @param pram
  */
 export function putOnShellApi(id) {
     return request({
         url: `/admin/store/product/putOnShell/${id}`,
         method: 'GET'
     })
 }
 /**
  * 商品下架
  * @param pram
  */
 export function offShellApi(id) {
     return request({
         url: `/admin/store/product/offShell/${id}`,
         method: 'GET'
     })
 }
 /**
  * 商品规格 列表
  * @param pram
  */
 export function templateListApi(params) {
     return request({
         url: '/admin/store/product/rule/list',
         method: 'GET',
         params
     })
 }
 /**
  * 商品规格 删除
  * @param pram
  */
 export function attrDeleteApi(id) {
     return request({
         url: `/admin/store/product/rule/delete/${id}`,
         method: 'get'
     })
 }
 /**
  * 商品规格 新增
  * @param pram
  */
 export function attrCreatApi(data) {
     return request({
         url: '/admin/store/product/rule/save',
         method: 'POST',
         data
     })
 }
 /**
  * 商品规格 编辑
  * @param pram
  */
 export function attrEditApi(data) {
     return request({
         url: '/admin/store/product/rule/update',
         method: 'POST',
         data
     })
 }
 /**
  * 商品规格 详情
  * @param pram
  */
 export function attrInfoApi(id) {
     return request({
         url: `admin/store/product/rule/info/${id}`,
         method: 'GET'
     })
 }
 /**
  * 商品评论 列表
  * @param pram
  */
 export function replyListApi(params) {
     return request({
         url: '/admin/store/product/reply/list',
         method: 'GET',
         params
     })
 }
 /**
  * 商品评论 新增
  * @param pram
  */
 export function replyCreatApi(data) {
     return request({
         url: '/admin/store/product/reply/save',
         method: 'POST',
         data
     })
 }
 /**
  * 商品评论 编辑
  * @param pram
  */
 export function replyEditApi(data) {
     return request({
         url: '/admin/store/product/reply/update',
         method: 'POST',
         data
     })
 }
 /**
  * 商品评论 详情
  * @param pram
  */
 export function replyInfoApi(id) {
     return request({
         url: `/admin/store/product/reply/info/${id}`,
         method: 'GET'
     })
 }
 /**
  * 商品评论 删除
  * @param pram
  */
 export function replyDeleteApi(id) {
     return request({
         url: `/admin/store/product/reply/delete/${id}`,
         method: 'GET'
     })
 }

 /**
  * 商品评论 回复
  * @param pram
  */
 export function replyCommentApi(data) {
     return request({
         url: `/admin/store/product/reply/comment`,
         method: 'post',
         data
     })
 }

 /**
  * 商品评论 导出
  * @param pram
  */
 export function productExportApi(params) {
     return request({
         url: `/export/product`,
         method: 'get',
         params
     })
 }

 /**
  * 商品复制 99Api
  * @param pram
  */
 export function importProductApi(params) {
     return request({
         url: `/admin/store/product/importProduct`,
         method: 'post',
         params
     })
 }


 /**
  * 商品复制 一号通
  * @param pram
  */
 export function copyProductApi(data) {
     return request({
         url: `/admin/store/product/copy/product`,
         method: 'post',
         data
     })
 }

 /**
  * 恢复
  * @param pram
  */
 export function restoreApi(id) {
     return request({
         url: `/admin/store/product/restore/${id}`,
         method: 'get'
     })
 }

 /**
  * 商品列表 导出
  * @param pram
  */
 export function productExcelApi(params) {
     return request({
         url: `/export/product`,
         method: 'get',
         params
     })
 }

 /**
  * 商品列表 获取复制商品配置
  * @param pram
  */
 export function copyConfigApi() {
     return request({
         url: `/admin/store/product/copy/config`,
         method: 'post'
     })
 }

 /**
  * 订单数据 导出
  * @param pram
  */
 export function orderExcelApi(data) {
     return request({
         url: `/export/order`,
         method: 'post',
         data
     })
 }

 //  设为热卖
 export function setHotSaleApi(data) {

     return request({
         url: `/admin/store/product/set/feature`,
         method: 'post',
         data
     })
 }

 export function homeConfigList(data) {

     return request({
         url: `/admin/sys/home/config/list`,
         method: 'post',
         data
     })
 }
 export function sysHomeConfigAdd(data) {

     return request({
         url: `/admin/sys/home/config/add`,
         method: 'post',
         data
     })
 }
 export function sysHomeConfigUpdate(data) {

     return request({
         url: `/admin/sys/home/config/update`,
         method: 'post',
         data
     })
 }


 export function batchUpdate(data) {

     return request({
         url: `/admin/store/product/batchUpdate`,
         method: 'post',
         data
     })
 }
 export function integralAdd(data) {


     return request({
         url: `/admin/integral/coupon/add`,
         method: 'post',
         data
     })
 }
 export function integralBatchAdd(data) {
     return request({
         url: `/admin/integral/coupon/addList`,
         method: 'post',
         data
     })

 }
 export function integralDetail(data) {
     return request({
         url: `/admin/integral/coupon/obj/${data}`,
         method: 'get',

     })


 }
 export function integralUpdate(data) {

     return request({
         url: `/admin/integral/coupon/update`,
         method: 'post',
         data
     })
 }
 export function integralPage(data) {

     return request({
         url: `/admin/integral/coupon/page`,
         method: 'post',
         data
     })
 }
 export function integralDetete(data) {


     return request({
         url: `/admin/integral/coupon/delete?id=${data}`,
         method: 'delete',

     })
 }
 export function ticketQrCode() {
     return
 }
 export function updateAttrValue(data) {
     return request({
         url: `/admin/store/product/update/attr/value`,
         method: 'post',
         data
     })


 }
 export function updateShippingTemplates(data) {
     return request({
         url: `/admin/store/product/update/shippingTemplates`,
         method: 'post',
         data
     })


 }