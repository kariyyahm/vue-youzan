webpackJsonp([2],{AaGc:function(t,s){},AeEs:function(t,s){},AnIW:function(t,s){},"Do/K":function(t,s){},HFfA:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("JWK+"),n=(e.n(a),e("pI1A")),i=(e.n(n),e("AeEs")),d=(e.n(i),e("AnIW")),r=(e.n(d),e("d7BR")),o=(e.n(r),e("Do/K")),c=(e.n(o),e("LjF4")),u=(e.n(c),e("7+uW")),l=e("TFhR"),h=e("mtWM"),f=e.n(h),p=e("mw3O"),m=e.n(p),g=e("gN+L"),v=m.a.parse(location.search.substr(1)).id;new u.default({el:"#app",data:{id:v,details:null,detailTab:["商品详情","本店成交"],tabIndex:0,deals:null,bannerLists:null,skuType:1,showSku:!1,skuNum:1,isAddCart:!1,isAddCartMsg:!1},created:function(){this.getDetails()},methods:{getDetails:function(){var t=this;f.a.get(l.a.details,{id:v}).then(function(s){t.details=s.data.data,t.bannerLists=[],t.details.imgs.forEach(function(s){t.bannerLists.push({clickUrl:"",img:s})})})},changeTab:function(t){this.tabIndex=t,t&&this.getDeals()},getDeals:function(){var t=this;f.a.get(l.a.deal,{id:v}).then(function(s){t.deals=s.data.data.lists})},chooseSku:function(t){this.skuType=t,this.showSku=!0},changeSkuNum:function(t){t<0&&1===this.skuNum||(this.skuNum+=t)},addCart:function(){var t=this;f.a.post(l.a.addCart,{id:v,number:this.skuNum}).then(function(s){200===s.data.status&&(t.showSku=!1,t.isAddCart=!0,t.isAddCartMsg=!0,setTimeout(function(){t.isAddCartMsg=!1},1e3))})}},filters:{number:function(t){return t.toFixed(2)}},components:{Swipe:g.a},watch:{showSku:function(t,s){document.body.style.overflow=t?"hidden":"auto",document.querySelector("html").style.overflow=t?"hidden":"auto",document.body.style.height=t?"hidden":"auto",document.querySelector("html").style.height=t?"hidden":"auto"}}})},"JWK+":function(t,s){},LjF4:function(t,s){},TFhR:function(t,s,e){"use strict";var a={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add",cartList:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMrremove:"/cart/mrremove",addressList:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var n in a)a.hasOwnProperty(n)&&(a[n]="https://easy-mock.com/mock/5cdf9e46ca410e607a1193b3/youzan"+a[n]);s.a=a},d7BR:function(t,s){},"gN+L":function(t,s,e){"use strict";var a=e("DNVT"),n=(e("v2ns"),{name:"swipe",props:{lists:{type:Array,required:!0}},mounted:function(){new a.a(".swiper-container",{loop:!0,pagination:{el:".swiper-pagination"}})}}),i={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"swiper-container"},[s("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return s("div",{staticClass:"swp-page swiper-slide"},[s("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[s("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])}),0),this._v(" "),s("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var d=e("VU/8")(n,i,!1,function(t){e("AaGc")},null,null);s.a=d.exports},pI1A:function(t,s){},v2ns:function(t,s){}},["HFfA"]);
//# sourceMappingURL=goods.f1119bb0b06f6a59b637.js.map