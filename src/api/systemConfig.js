 import request from '@/utils/request'

 export function configCheckUnique(pram) {
     const data = {
         name: pram.name
     }
     return request({
         url: '/admin/system/config/check',
         method: 'GET',
         params: data
     })
 }

 export function configDelete(pram) {
     const data = {
         id: pram.id
     }
     return request({
         url: '/admin/system/config/delete',
         method: 'GET',
         params: data
     })
 }

 export function configInfo(pram) {
     const data = {
         formId: pram.id
     }
     return request({
         url: '/admin/system/config/info',
         method: 'GET',
         params: data
     })
 }

 export function configList(pram) {
     const data = {
         page: pram.page,
         limit: pram.limit
     }
     return request({
         url: '/admin/system/config/list',
         method: 'GET',
         params: data
     })
 }

 export function configSave(pram) {
     const data = {
         systemConfigRequest: {
             desc: pram.desc,
             groupId: pram.groupId,
             info: pram.info,
             name: pram.name,
             pid: pram.pid,
             status: pram.status,
             type: pram.type,
             value: pram.value // value 存储表单配置数据，其他的参数来自于父级数据 justForAPI
         }
     }
     return request({
         url: '/admin/system/config/save',
         method: 'POST',
         params: data
     })
 }

 export function configSaveForm(pram) {
     return request({
         url: '/admin/system/config/save/form',
         method: 'POST',
         data: pram
     })
 }

 export function configUpdate(pram) {
     const data = {
         id: pram.id,
         systemConfigRequest: pram.systemConfigRequest
     }
     return request({
         url: '/admin/system/config/update',
         method: 'POST',
         params: data
     })
 }

 export function configSaveUniq(pram) {
     const data = {
         key: pram.key,
         value: pram.value
     }
     return request({
         url: '/admin/system/config/saveuniq',
         method: 'POST',
         params: data
     })
 }

 export function configGetUniq(pram) {
     const data = {
         key: pram.key
     }
     return request({
         url: '/admin/system/config/getuniq',
         method: 'GET',
         params: data
     })
 }
 export function listType(params) {


     return request({
         url: '/admin/system/dict/type/list',
         method: 'GET',
         params
     })
 }
 export function dictTypeDetail(dictId) {


     return request({
         url: '/admin/system/dict/type/' + dictId,
         method: 'GET',

     })
 }
 export function dictDataDetail(dictId) {


     return request({
         url: '/admin/system/dict/data/' + dictId,
         method: 'GET',

     })
 }
 //  根据字典类型查询字典数据信息
 export function getType(dictId) {
     return request({
         url: '/admin/system/dict/data/type/' + dictId,
         method: 'GET',

     })


 }
 export function delType(data) {
     return request({
         url: '/admin/system/dict/type/' + data,
         method: 'DELETE'
     })
 }
 export function addType(data) {
     return request({
         url: '/admin/system/dict/type/add',
         method: 'POST',
         data
     })
 }
 export function updateType(data) {
     return request({
         url: '/admin/system/dict/type/update',
         method: 'POST',
         data

     })
 }
 //  刷新字典缓存
 export function refreshCache() {
     return request({
         url: '/admin/system/dict/type/refreshCache',
         method: 'delete',

     })

 }
 //  获取字典表下拉选框的数据
 export function getDictSelect(params) {
     return request({
         url: '/admin/system/dict/type/option/select',
         method: 'GET',
         params
     })
 }
 //  字典表数据--列表查询
 export function listDictData(params) {
     return request({
         url: '/admin/system/dict/data/list',
         method: 'GET',
         params
     })
 }


 //  字典表数据--新增
 export function addDictData(data) {
     return request({
         url: '/admin/system/dict/data/add',
         method: 'post',
         data
     })
 }
 //  字典表数据--修改
 export function updateDictData(data) {
     return request({
         url: '/admin/system/dict/data/update',
         method: 'post',
         data
     })
 }

 //  字典表数据--删除
 export function delDictData(id) {
     return request({
         url: '/admin/system/dict/data/' + id,
         method: 'delete',

     })
 }