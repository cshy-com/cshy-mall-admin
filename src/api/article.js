 import request from '@/utils/request'

 /**
  * 绑定产品
  * @param pram
  */
 export function bindProduct(pram) {
     const data = {
         id: pram.id,
         productId: pram.productId
     }
     return request({
         url: '/admin/article/bind/product',
         method: 'POST',
         params: data
     })
 }

 /**
  * 删除文章
  * @param id
  * @constructor
  */
 export function DelArticle(pram) {
     const data = {
         id: pram.id
     }
     return request({
         url: '/admin/article/delete',
         method: 'GET',
         params: data
     })
 }

 /**
  * 文章详情
  * @param id
  * @constructor
  */
 export function InfoArticle(id) {
     const data = {
         id: id
     }
     return request({
         url: '/admin/article/info',
         method: 'get',
         params: data
     })
 }

 /**
  * 文章列表
  * @param pram
  * @constructor
  */
 export function ListArticle(pram) {
     const data = {
         keywords: pram.keywords,
         cid: pram.cid,
         page: pram.page,
         limit: pram.limit
     }
     return request({
         url: '/admin/article/list',
         method: 'GET',
         params: data
     })
 }

 /**
  * 新增文章
  * @param pram
  * @constructor
  */
 export function AddArticle(pram) {
     const data = {
         author: pram.author,
         cid: pram.cid,
         content: pram.content,
         imageInput: pram.imageInput,
         isBanner: pram.isBanner,
         isHot: pram.isHot,
         shareSynopsis: pram.shareSynopsis,
         shareTitle: pram.shareTitle,
         sort: pram.sort,
         synopsis: pram.synopsis,
         title: pram.title,
         url: pram.url
     }
     return request({
         url: '/admin/article/save',
         method: 'post',
         data: data
     })
 }

 /**
  * 更新文章
  * @param pram
  * @constructor
  */
 export function UpdateArticle(pram) {
     const data = {
         author: pram.author,
         cid: pram.cid,
         content: pram.content,
         imageInput: pram.imageInput,
         isBanner: pram.isBanner,
         isHot: pram.isHot,
         shareSynopsis: pram.shareSynopsis,
         shareTitle: pram.shareTitle,
         sort: pram.sort,
         synopsis: pram.synopsis,
         title: pram.title,
         url: pram.url
     }
     return request({
         url: '/admin/article/update',
         method: 'post',
         params: { id: pram.id },
         data: data
     })
 }

 //  意见反馈----查分页

 export function adviceList(data) {

     return request({
         url: '/admin/advices/page',
         method: 'POST',
         data
     })
 }
 //  意见反馈----删除
 export function DelAdvices(pram) {

     return request({
         url: '/admin/advices/delete/' + pram.id,
         method: 'delete',

     })
 }

 //  意见反馈----回复
 export function replyAdvices(pram) {

     return request({
         url: '/admin/advices/reply',
         method: 'POST',
         data: pram
     })
 }

 //  常见问题---分页列表

 export function getQuestionList(data) {

     return request({
         url: '/admin/faq/page',
         method: 'post',
         data
     })
 }

 // 常见问题---删除

 export function faqDel(id) {

     return request({
         url: '/admin/faq/delete/' + id,
         method: 'delete',

     })
 }
 //  常见问题---新增
 export function faqAdd(data) {
     return request({
         url: '/admin/faq/add',
         method: 'post',
         data
     })
 }
 // 常见问题---修改
 export function faqUpdate(data) {
     return request({
         url: '/admin/faq/update',
         method: 'put',
         data
     })
 }