 import request from '@/utils/request'

 export function systemConfigCheck(pram) {
     const data = {
         name: pram.name
     }
     return request({
         url: '/admin/system/config/check',
         method: 'GET',
         params: data
     })
 }

 export function systemConfigInfo(pram) {
     const data = {
         formId: pram.id
     }
     return request({
         url: '/admin/system/config/info',
         method: 'GET',
         params: data
     })
 }

 export function systemConfigSave(pram) {
     return request({
         url: '/admin/system/config/save/form',
         method: 'POST',
         data: pram
     })
 }


 /**
  * 文件上传
  * @param data
  */
 export function fileFileApi(data, params) {
     return request({
         url: '/admin/upload/file',
         method: 'POST',
         params,
         data
     })
 }

 /**
  * 图片上传
  * @param data
  */
 export function fileImageApi(data, params) {
     return request({
         url: '/admin/upload/image',
         method: 'POST',
         params,
         data
     })
 }

 /**
  * 图片列表
  * @param data
  */
 export function fileListApi(params) {
     return request({
         url: '/admin/system/attachment/list',
         method: 'get',
         params
     })
 }

 /**
  * 图片列表 删除图片
  * @param data
  */
 export function fileDeleteApi(id) {
     return request({
         url: `/admin/system/attachment/delete/${id}`,
         method: 'get'
     })
 }

 /**
  * 图片列表 移動分類
  * @param data
  */
 export function attachmentMoveApi(data) {
     return request({
         url: `/admin/system/attachment/move`,
         method: 'post',
         data
     })
 }


 /**
  * 微信上传图片
  * @param data
  */
 export function wechatUploadApi(data, params) {
     return request({
         url: `/admin/wechat/media/upload`,
         method: 'post',
         data,
         params
     })
 }
 // 短信发送日志
 export function smsLogPage(params) {
     return request({
         url: `/admin/sms/page`,
         method: 'GET',
         params

     })
 }

 //  短信签名分页查询
 export function smsSignPage(data) {
     return request({
         url: `/admin/sms/sign/page`,
         method: 'post',
         data
     })
 }
 // 同步短信签名
 export function smsSignSync(params) {
     return request({
         url: `/admin/sms/sign/sync`,
         method: 'GET',
         params

     })
 }
 // 短信模板分页
 export function smsTemplatePage(data) {
     return request({
         url: `/admin/sms/template/page`,
         method: 'post',
         data
     })
 }
 // 同步短信模板
 export function smsTemplateSync(params) {
     return request({
         url: `/admin/sms/template/sync`,
         method: 'GET',
         params

     })
 }
 //  查看短信模板
 export function smsTemplateDetail(params) {
     return request({
         url: `/admin/sms/template/get/` + params,
         method: 'GET',


     })
 }
 // 获取所有短信签名
 export function smsSignList(params) {
     return request({
         url: `/admin/sms/sign/list`,
         method: 'GET',
         params

     })
 }

 // 修改短信签名
 export function templateUpdate(params) {
     return request({
         url: `/admin/sms/template/update`,
         method: 'GET',
         params
     })
 }

 //  修改是否为内部短信
 export function templateUpdateIsInner(params) {
     return request({
         url: `/admin/sms/template/update/isInternal`,
         method: 'GET',
         params
     })
 }