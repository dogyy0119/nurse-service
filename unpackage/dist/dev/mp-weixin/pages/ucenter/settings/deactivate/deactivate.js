(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/settings/deactivate/deactivate"],{420:function(t,e,n){"use strict";(function(t,e){var r=n(4);n(26),n(27),n(34);r(n(25));var c=r(n(421));t.__webpack_require_UNI_MP_PLUGIN__=n,e(c.default)}).call(this,n(1)["default"],n(2)["createPage"])},421:function(t,e,n){"use strict";n.r(e);var r=n(422),c=n(424);for(var o in c)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return c[t]}))}(o);n(426);var a,i=n(54),u=Object(i["default"])(c["default"],r["render"],r["staticRenderFns"],!1,null,null,null,!1,r["components"],a);u.options.__file="pages/ucenter/settings/deactivate/deactivate.vue",e["default"]=u.exports},422:function(t,e,n){"use strict";n.r(e);var r=n(423);n.d(e,"render",(function(){return r["render"]})),n.d(e,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(e,"components",(function(){return r["components"]}))},423:function(t,e,n){"use strict";var r;n.r(e),n.d(e,"render",(function(){return c})),n.d(e,"staticRenderFns",(function(){return a})),n.d(e,"recyclableRender",(function(){return o})),n.d(e,"components",(function(){return r}));var c=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$t("deactivate.nextStep")),r=t.$t("deactivate.cancelText");t.$mp.data=Object.assign({},{$root:{m0:n,m1:r}})},o=!1,a=[];c._withStripped=!0},424:function(t,e,n){"use strict";n.r(e);var r=n(425),c=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=c.a},425:function(t,e,n){"use strict";(function(t,r){var c=n(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=c(n(11)),a=n(49);function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){(0,o.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s={data:function(){return{}},onLoad:function(){t.setNavigationBarTitle({title:this.$t("deactivate.navigationBarTitle")})},methods:u(u({},(0,a.mapActions)({logout:"user/logout"})),{},{cancel:function(){t.navigateBack()},nextStep:function(){var e=this;t.showModal({content:"已经仔细阅读注销提示，知晓可能带来的后果，并确认要注销",complete:function(n){n.confirm?r.callFunction({name:"uni-id-cf",data:{action:"closeAccount"},complete:function(n){console.log(n),0===n.result.code?(t.showToast({title:"注销成功"}),e.logout(),t.navigateTo({url:"/pages/ucenter/login-page/index/index"})):t.showToast({icon:"error",title:n.result.errMsg})}}):t.navigateBack()}})}})};e.default=s}).call(this,n(2)["default"],n(34)["default"])},426:function(t,e,n){"use strict";n.r(e);var r=n(427),c=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=c.a},427:function(t,e,n){}},[[420,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/ucenter/settings/deactivate/deactivate.js.map