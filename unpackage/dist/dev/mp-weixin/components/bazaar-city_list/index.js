(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/bazaar-city_list/index"],{615:function(t,i,n){"use strict";n.r(i);var e=n(616),o=n(618);for(var c in o)["default"].indexOf(c)<0&&function(t){n.d(i,t,(function(){return o[t]}))}(c);n(621);var s,r=n(54),l=Object(r["default"])(o["default"],e["render"],e["staticRenderFns"],!1,null,null,null,!1,e["components"],s);l.options.__file="components/bazaar-city_list/index.vue",i["default"]=l.exports},616:function(t,i,n){"use strict";n.r(i);var e=n(617);n.d(i,"render",(function(){return e["render"]})),n.d(i,"staticRenderFns",(function(){return e["staticRenderFns"]})),n.d(i,"recyclableRender",(function(){return e["recyclableRender"]})),n.d(i,"components",(function(){return e["components"]}))},617:function(t,i,n){"use strict";var e;n.r(i),n.d(i,"render",(function(){return o})),n.d(i,"staticRenderFns",(function(){return s})),n.d(i,"recyclableRender",(function(){return c})),n.d(i,"components",(function(){return e}));var o=function(){var t=this,i=t.$createElement;t._self._c},c=!1,s=[];o._withStripped=!0},618:function(t,i,n){"use strict";n.r(i);var e=n(619),o=n.n(e);for(var c in e)["default"].indexOf(c)<0&&function(t){n.d(i,t,(function(){return e[t]}))}(c);i["default"]=o.a},619:function(t,i,n){"use strict";(function(t){var e=n(4);Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o=e(n(620)),c={props:{getCity:{type:Function,default:function(){}}},computed:{fixedTitle:function(){return this.scrollY<0?"":this.title&&this.title[this.currentIndex]}},watch:{scrollY:function(t){var i=this,n=this.tops,e=n.findIndex((function(e,o){return i.diff=n[o+1]-t,t>=e&&t<n[o+1]}));this.currentIndex=e},diff:function(t){var i=t>0&&t<30?t-30:0;this.fixedTop===i&&(this.fixedStyle="translate3d(0,0,0)"),this.fixedTop=i,this.fixedStyle="translate3d(0,".concat(this.fixedTop,"px,0)")}},data:function(){return{scrollY:-1,tops:[],diff:-1,citylist:{},hotcity:{},currentIndex:0,title:[],windowH:"",scrollTop:0,fixedStyle:"translate3d(0,0,0)",fixedTop:0,locationCity:"定位中...."}},methods:{initCityList:function(){var i=[];for(var n in this.hotcity=o.default.hotcity,this.citylist=o.default.city,i.push("定位城市"),i.push(this.hotcity.title),this.citylist)i.push(this.citylist[n].title);this.title=i;var e=t.getSystemInfoSync();this.windowH=e.windowHeight+"px"},initTop:function(){var i=this,n=t.createSelectorQuery();n.select("#location_city").boundingClientRect().select("#hotcity").boundingClientRect().selectAll(".city_title_wrap").boundingClientRect().exec((function(t){var n=[],e=0;if(n.push(e),t[0]&&(e+=t[0].height,n.push(e)),t[1]&&(e+=t[1].height,n.push(e)),0!==t[2].length)for(var o in t[2])e+=t[2][o].height,n.push(e);i.tops=n}))},selectedCity:function(t){var i=t.city,n=t.address;console.log(i),console.log(n),this.getCity&&this.getCity(i,n)},location:function(){var i=this;t.chooseLocation({success:function(t){console.log("uni.chooseLocation success!!!"),console.log(t),i.locationCity=t&&t.address,i.locationName=t&&t.name,i.selectedCity({city:i.locationName,address:Thar.locationCity})},fail:function(){i.locationCity="定位失败，请点击重试",i.locationName=""}})},scroll:function(t){this.scrollY=t.detail&&t.detail.scrollTop},scroll_to_city:function(t){this.scrollTop=this.tops[t],this.scrollY=scrollY,this.cityScroll.scrollTo(0,-scrollY,300)}},created:function(){this.initCityList()},mounted:function(){this.location(),this.initTop()}};i.default=c}).call(this,n(2)["default"])},621:function(t,i,n){"use strict";n.r(i);var e=n(622),o=n.n(e);for(var c in e)["default"].indexOf(c)<0&&function(t){n.d(i,t,(function(){return e[t]}))}(c);i["default"]=o.a},622:function(t,i,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/bazaar-city_list/index.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/bazaar-city_list/index-create-component',
    {
        'components/bazaar-city_list/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(615))
        })
    },
    [['components/bazaar-city_list/index-create-component']]
]);
