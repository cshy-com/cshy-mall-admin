 import Layout from '@/layout'

 const contentRouter = {
     path: '/content',
     component: Layout,
     redirect: '/content/articleManager',
     name: 'content',
     meta: {
         title: '内容',
         icon: 'clipboard'
     },
     children: [{
             path: 'articleManager',
             name: 'articleManager',
             component: () =>
                 import ('@/views/content/article/list'),
             meta: {
                 title: '文章管理',
                 icon: 'clipboard'
             }
         },

         {
             path: 'articleCreat/:id?',
             name: 'articleCreat',
             component: () =>
                 import ('@/views/content/article/edit'),
             meta: {
                 title: '添加文章',
                 noCache: true,
                 activeMenu: `/content/articleManager`
             }
         },
         {
             path: 'classifManager',
             name: 'classifManager',
             component: () =>
                 import ('@/views/content/articleclass/list'),
             meta: {
                 title: '文章分类',
                 icon: 'clipboard'
             }
         },
         {
             path: 'question',
             name: 'question',
             component: () =>
                 import ('@/views/content/question/index'),
             meta: {
                 title: '常见问题',
                 icon: 'clipboard'
             }
         }, {
             path: 'feedback',
             name: 'feedback',
             component: () =>
                 import ('@/views/content/feedback/index'),
             meta: {
                 title: '意见反馈',
                 icon: 'clipboard'
             }
         },
     ]
 }

 export default contentRouter