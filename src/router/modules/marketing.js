import Layout from "@/layout";

const marketingRouter = {
    path: "/marketing",
    component: Layout,
    redirect: "/coupon/list",
    name: "Marketing",
    meta: {
        title: "营销",
        icon: "clipboard",
    },
    children: [{
            path: "homeSet",
            component: () =>
                import ("@/views/marketing/homeSet/index"),
            name: "Integral",
            meta: { title: "首页配置", icon: "" },
            children: [{
                    path: "bannerSet",
                    component: () =>
                        import ("@/views/marketing/homeSet/bannerSet"),
                    name: "bannerSet",
                    hidden: true,
                    meta: { title: "banner设置", icon: "" },
                },

                {
                    path: "drag",
                    component: () =>
                        import ("@/views/marketing/homeSet/drag"),
                    name: "drag",
                    hidden: true,
                    meta: { title: "拖拽配置", icon: "" },
                },

                {
                    path: "specialPrice",
                    component: () =>
                        import ("@/views/marketing/homeSet/specialPrice"),
                    name: "specialPrice",
                    hidden: true,
                    meta: { title: "特价", icon: "" }
                },
                {
                    path: "goodGoods",
                    component: () =>
                        import ("@/views/marketing/homeSet/goodGoods"),
                    name: "superSet",
                    hidden: true,
                    meta: { title: "好货集结", icon: "" },
                },
                {
                    path: "crabGift",
                    component: () =>
                        import ("@/views/marketing/homeSet/crabGift"),
                    name: "crabGift",
                    hidden: true,
                    meta: { title: "金秋蟹礼", icon: "" },
                },
                {
                    path: "citySet",
                    component: () =>
                        import ("@/views/marketing/homeSet/citySet"),
                    name: "citySet",
                    hidden: true,
                    meta: { title: "城市特色", icon: "" },
                },
            ],
        },
        {
            path: "coupon",
            component: () =>
                import ("@/views/marketing/coupon/index"),
            name: "Coupon",
            meta: { title: "优惠券", icon: "" },
            children: [{
                    path: "template",
                    component: () =>
                        import ("@/views/marketing/coupon/couponTemplate/index"),
                    name: "couponTemplate",
                    hidden: true,
                    meta: { title: "优惠券模板", icon: "" },
                },
                {
                    path: "list/save/:id?",
                    name: "couponAdd",
                    meta: {
                        title: "优惠劵添加",
                        noCache: true,
                        activeMenu: `/marketing/coupon/list`,
                    },
                    hidden: true,
                    component: () =>
                        import ("@/views/marketing/coupon/list/creatCoupon"),
                },
                {
                    path: "list",
                    component: () =>
                        import ("@/views/marketing/coupon/list/index"),
                    name: "List",
                    meta: { title: "优惠券列表", icon: "" },
                },
                {
                    path: "record",
                    component: () =>
                        import ("@/views/marketing/coupon/record/index"),
                    name: "Record",
                    meta: { title: "领取记录", icon: "" },
                },
            ],
        },
        {
            path: "bargain",
            component: () =>
                import ("@/views/marketing/bargain/index"),
            name: "Bargain",
            meta: { title: "砍价管理", icon: "" },
            alwaysShow: true,
            hidden: true,
            children: [{
                    path: "bargainGoods",
                    component: () =>
                        import ("@/views/marketing/bargain/bargainGoods/index"),
                    name: "bargainGoods",
                    meta: { title: "砍价商品", icon: "" },
                },
                {
                    path: "creatBargain/:id?",
                    component: () =>
                        import ("@/views/marketing/bargain/bargainGoods/creatBargain"),
                    name: "creatBargain",
                    meta: {
                        title: "砍价商品",
                        icon: "",
                        noCache: true,
                        activeMenu: `/marketing/bargain/bargainGoods`,
                    },
                },
                {
                    path: "bargainList",
                    component: () =>
                        import ("@/views/marketing/bargain/bargainList/index"),
                    name: "bargainList",
                    meta: { title: "砍价列表", icon: "" },
                },
            ],
        },
        {
            path: "groupBuy",
            component: () =>
                import ("@/views/marketing/groupBuy/index"),
            name: "groupBuy",
            meta: { title: "拼团管理", icon: "" },
            hidden: true,
            children: [{
                    path: "groupGoods",
                    component: () =>
                        import ("@/views/marketing/groupBuy/groupGoods/index"),
                    name: "groupGoods",
                    meta: { title: "拼团商品", icon: "" },
                },
                {
                    path: "creatGroup/:id?",
                    component: () =>
                        import ("@/views/marketing/groupBuy/groupGoods/creatGroup"),
                    name: "creatGroup",
                    meta: {
                        title: "拼团商品",
                        icon: "",
                        noCache: true,
                        activeMenu: `/marketing/groupBuy/groupGoods`,
                    },
                },
                {
                    path: "groupList",
                    component: () =>
                        import ("@/views/marketing/groupBuy/groupList/index"),
                    name: "groupList",
                    meta: { title: "拼团列表", icon: "" },
                },
            ],
        },
        {
            path: "seckill",
            component: () =>
                import ("@/views/marketing/seckill/index"),
            name: "Seckill",
            meta: { title: "秒杀管理", icon: "" },
            children: [{
                    path: "config",
                    component: () =>
                        import ("@/views/marketing/seckill/seckillConfig/index"),
                    name: "SeckillConfig",
                    meta: { title: "秒杀配置", icon: "" },
                },
                {
                    path: "config1/:timeId?",
                    component: () =>
                        import ("@/views/marketing/seckill/seckillConfig/set"),
                    name: "SeckillConfig",
                    meta: { title: "秒杀配置", icon: "" },
                },
                {
                    path: "list/:timeId?",
                    component: () =>
                        import ("@/views/marketing/seckill/seckillList/index"),
                    name: "SeckillList",
                    meta: {
                        title: "秒杀商品",
                        icon: "",
                        noCache: true,
                        activeMenu: `/marketing/seckill/list`,
                    },
                },
                {
                    path: "creatSeckill/:name?/:timeId?/:id?",
                    component: () =>
                        import ("@/views/marketing/seckill/seckillList/creatSeckill"),
                    name: "CreatSeckill",
                    meta: {
                        title: "添加秒杀商品",
                        icon: "",
                        noCache: true,
                        activeMenu: `/marketing/seckill/list`,
                    },
                },
            ],
        },
        {
            path: "active",
            component: () =>
                import ("@/views/marketing/active/index"),
            name: "Active",
            meta: { title: "活动管理", icon: "" },
            children: [{
                    path: "activeList/:timeId?",
                    component: () =>
                        import ("@/views/marketing/active/activeList/index"),
                    name: "ActiveList",
                    meta: { title: "活动商品", icon: "" },
                },
                {
                    path: "acitveName",
                    component: () =>
                        import ("@/views/marketing/active/activeList/activeName"),
                    name: "activeName",
                    meta: { title: "活动名称配置", icon: "" },
                },
                {
                    path: "creatActive/:name?/:timeId?/:id?",
                    component: () =>
                        import ("@/views/marketing/active/activeList/createGoodsActive"),
                    name: "CreatSeckill",
                    meta: {
                        title: "添加活动商品",
                        icon: "",
                        noCache: true,
                        activeMenu: `/marketing/active/activeList`,
                    },
                },
                {
                    path: "activeConfig",
                    component: () =>
                        import ("@/views/marketing/active/activeConfig/index"),
                    name: "ActiveConfig",
                    meta: { title: "活动配置", icon: "" },
                },
            ],
        },
        {
            path: "integral",
            component: () =>
                import ("@/views/marketing/integral/index"),
            name: "Integral",
            meta: { title: "积分", icon: "" },
            children: [{
                    path: "integralconfig",
                    component: () =>
                        import ("@/views/marketing/integral/config/index"),
                    name: "integralConfig",
                    meta: { title: "积分配置", icon: "" },
                },
                {
                    path: "integrallog",
                    component: () =>
                        import ("@/views/marketing/integral/integralLog/index"),
                    name: "integralLog",
                    meta: { title: "积分日志", icon: "" },
                },
                {
                    path: "receive",
                    component: () =>
                        import ("@/views/marketing/integral/receive/index"),
                    name: "receive",
                    meta: { title: "积分领取", icon: "" },
                },
            ],
        },

        {
            path: "gift",
            component: () =>
                import ("@/views/marketing/gift/index"),
            name: "gift",
            meta: { title: "礼品卡", icon: "" },
            children: [{
                    path: "coupon",
                    component: () =>
                        import ("@/views/marketing/gift/coupon/index"),
                    name: "coupon",
                    meta: { title: "礼品卡券", icon: "" },
                },
                {
                    path: "type",
                    component: () =>
                        import ("@/views/marketing/gift/type/index"),
                    name: "type",
                    meta: { title: "礼品类型", icon: "" },
                },
                {
                    path: "order",
                    component: () =>
                        import ("@/views/marketing/gift/order/index"),
                    name: "order",
                    meta: { title: "礼品订单", icon: "" },
                },
            ],
        },
    ],
};

export default marketingRouter;