 import Layout from '@/layout'

 const maintainRouter = {
     path: '/maintain',
     component: Layout,
     redirect: '/maintain/devconfiguration/configCategory',
     name: 'maintain',
     meta: {
         title: '维护',
         icon: 'clipboard'
     },
     children: [{
             path: 'devconfiguration',
             name: 'devconfiguration',
             component: () =>
                 import ('@/views/maintain'),
             meta: {
                 title: '开发配置',
                 icon: 'clipboard'
             },
             children: [{
                     path: 'configCategory',
                     name: 'configCategory',
                     component: () =>
                         import ('@/views/maintain/devconfig/configCategroy'),
                     meta: {
                         title: '配置分类',
                         icon: 'clipboard'
                     }
                 },
                 {
                     path: 'combineddata',
                     name: 'combineddata',
                     component: () =>
                         import ('@/views/maintain/devconfig/combinedData'),
                     meta: {
                         title: '组合数据',
                         icon: 'clipboard'
                     }
                 },
                 {
                     path: 'formConfig',
                     name: 'formConfig',
                     component: () =>
                         import ('@/views/maintain/formConfig/index'),
                     meta: {
                         title: '表单配置',
                         icon: 'clipboard'
                     }
                 }
             ]
         },
         {
             path: 'user',
             name: 'user',
             component: () =>
                 import ('@/views/maintain/user'),
             meta: {
                 title: '个人中心',
                 icon: 'clipboard'
             },
             hidden: true
         },
         {
             path: 'picture',
             name: 'picture',
             component: () =>
                 import ('@/views/maintain/picture'),
             meta: {
                 title: '素材管理',
                 icon: 'clipboard'
             },
             hidden: false
         },

         {
             path: 'logistics',
             name: 'Logistics',
             alwaysShow: true,
             redirect: '/logistics/cityList',
             component: () =>
                 import ('@/views/maintain'),
             meta: {
                 title: '物流设置',
                 icon: 'clipboard',
                 roles: ['admin']
             },
             children: [{
                     path: 'cityList',
                     component: () =>
                         import ('@/views/maintain/logistics/cityList'),
                     name: 'cityList',
                     meta: { title: '城市数据', icon: '' }
                 },
                 {
                     path: 'companyList',
                     component: () =>
                         import ('@/views/maintain/logistics/companyList'),
                     name: 'companyList',
                     meta: { title: '物流公司', icon: '' }
                 },
             ]
         },
         {
             path: 'dict',
             name: 'dict',
             component: () =>
                 import ('@/views/maintain/dict/index'),
             meta: {
                 title: '字典管理',
                 icon: 'clipboard'
             },
             //  children: [{
             //      path: 'index/:dictId(\\d+)',
             //      component: () =>
             //          import ('@/views/maintain/dict/data'),
             //      name: 'Data',
             //      //  meta: { title: '字典数据', activeMenu: '/maintain/dict' }
             //  }],
             hidden: false
         },
         {

             path: 'dict/:dictId(\\d+)',
             component: () =>
                 import ('@/views/maintain/dict/data'),
             name: 'Data',
             meta: { title: '字典数据', activeMenu: '/maintain/dict' },

             hidden: false
         },
     ]
 }

 export default maintainRouter