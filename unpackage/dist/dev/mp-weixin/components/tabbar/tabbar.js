(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabbar/tabbar"],{457:function(t,e,n){"use strict";n.r(e);var a=n(458),r=n(460);for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n(462);var c,u=n(54),o=Object(u["default"])(r["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],c);o.options.__file="components/tabbar/tabbar.vue",e["default"]=o.exports},458:function(t,e,n){"use strict";n.r(e);var a=n(459);n.d(e,"render",(function(){return a["render"]})),n.d(e,"staticRenderFns",(function(){return a["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return a["recyclableRender"]})),n.d(e,"components",(function(){return a["components"]}))},459:function(t,e,n){"use strict";var a;n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return c})),n.d(e,"recyclableRender",(function(){return i})),n.d(e,"components",(function(){return a}));var r=function(){var t=this,e=t.$createElement;t._self._c},i=!1,c=[];r._withStripped=!0},460:function(t,e,n){"use strict";n.r(e);var a=n(461),r=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},461:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"tabbar",props:["index"],data:function(){return{tabbarIndex:0,tablist:[{text:"首页",isbulge:!1,iconPath:"../../static/tabbar/home.png",selectedIconPath:"../../static/tabbar/homefill.png",pagePath:"/pages/index/index"},{text:"订单",isbulge:!1,iconPath:"../../static/tabbar/message.png",selectedIconPath:"../../static/tabbar/messagefill.png",pagePath:"/pages/order/OrderList"},{text:"我的",isbulge:!1,iconPath:"../../static/tabbar/my.png",selectedIconPath:"../../static/tabbar/myfill.png",pagePath:"/pages/home/ucenter"}]}},mounted:function(){this.tabbarIndex=this.index,t.hideTabBar()},methods:{tabbarItemClick:function(e,n){t.switchTab({url:e.pagePath})}}};e.default=n}).call(this,n(2)["default"])},462:function(t,e,n){"use strict";n.r(e);var a=n(463),r=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},463:function(t,e,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/tabbar/tabbar.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabbar/tabbar-create-component',
    {
        'components/tabbar/tabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(457))
        })
    },
    [['components/tabbar/tabbar-create-component']]
]);
