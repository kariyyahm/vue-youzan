webpackJsonp([6],{"0C+S":function(e,t){},NW8W:function(e,t){},TFhR:function(e,t,i){"use strict";var o={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add",cartList:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMrremove:"/cart/mrremove",addressList:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var s in o)o.hasOwnProperty(s)&&(o[s]="http://rap2api.taobao.org/app/mock/7058"+o[s]);t.a=o},eC21:function(e,t){},gWPi:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("eC21"),s=(i.n(o),i("NW8W")),n=(i.n(s),i("0C+S")),r=(i.n(n),i("7+uW")),c=i("TFhR"),d=i("mtWM"),a=i.n(d),h=i("9qgI"),u=i.n(h);new r.default({el:"#app",data:{cartLists:null,total:0,editingShop:null,editingShopIndex:-1,removePopup:!1,removeData:null,removeMsg:""},methods:{getCartLists:function(){var e=this;a.a.get(c.a.cartList).then(function(t){var i=t.data.cartList;i.forEach(function(e){e.checked=!0,e.removeChecked=!1,e.editing=!1,e.editingMsg="编辑",e.goodsList.forEach(function(e){e.checked=!0,e.removeChecked=!1})}),e.cartLists=i})},selectGoods:function(e,t){var i=this.editingShop?"removeChecked":"checked";t[i]=!t[i],e[i]=e.goodsList.every(function(e){return e[i]})},selectShop:function(e){var t=this.editingShop?"removeChecked":"checked";e[t]=!e[t],e.goodsList.forEach(function(i){return i[t]=e[t]})},selectAll:function(){var e=this.editingShop?"allRemoveSelected":"allSelected";this[e]=!this[e]},edit:function(e,t){e.editing=!e.editing,e.editingMsg=e.editing?"完成":"编辑",this.cartLists.forEach(function(i,o){t!==o&&(i.editing=!1,i.editingMsg=e.editing?"":"编辑")}),this.editingShop=e.editing?e:null,this.editingShopIndex=e.editing?t:-1},reduce:function(e){1!==e.number&&a.a.post(c.a.cartReduce,{id:e.id,number:1}).then(function(t){e.number--})},add:function(e){a.a.post(c.a.addCart,{id:e.id,number:1}).then(function(t){e.number++})},remove:function(e,t,i,o){this.removePopup=!0,this.removeData={shop:e,shopIndex:t,goods:i,goodIndex:o},this.removeMsg="确定要删除该商品吗？"},removeList:function(){this.removePopup=!0,this.removeMsg="确定将所选 "+this.removeLists.length+" 个商品删除？"},removeConfirm:function(){var e=this;if("确定要删除该商品吗？"===this.removeMsg){var t=this.removeData,i=t.shop,o=t.shopIndex,s=t.goods,n=t.goodIndex;fetch(c.a.cartRemove,{id:s.id}).then(function(t){i.goodsList.splice(n,1),i.goodsList.length||(e.cartLists.splice(o,1),e.removeShop()),e.removePopup=!1})}else{var r=[];this.removeLists.forEach(function(e){r.push(e.id)}),a.a.post(c.a.cartMrremove,{ids:r}).then(function(t){var i=[];e.editingShop.goodsList.forEach(function(t){-1===e.removeLists.findIndex(function(e){return e.id==t.id})&&i.push(t)}),i.length?e.editingShop.goodsList=i:(e.cartLists.splice(e.editingShopIndex,1),e.removeShop()),e.removePopup=!1})}},removeShop:function(){this.editingShop=null,this.editingShopIndex=-1,this.cartLists.forEach(function(e){e.editing=!1,e.editingMsg="编辑"})},start:function(e,t){t.startX=e.changedTouches[0].clientX},end:function(e,t,i,o){var s=e.changedTouches[0].clientX,n="0";i.startX-s>100&&(n="-60px"),s-i.startX>100&&(n="0px"),u()(this.$refs["goods-"+t+"-"+o],{left:n})},removeCancel:function(){this.removePopup=!1}},computed:{allSelected:{get:function(){return!(!this.cartLists||!this.cartLists.length)&&this.cartLists.every(function(e){return e.checked})},set:function(e){this.cartLists.forEach(function(t){t.checked=e,t.goodsList.forEach(function(t){t.checked=e})})}},allRemoveSelected:{get:function(){return!!this.editingShop&&this.editingShop.removeChecked},set:function(e){this.editingShop&&(this.editingShop.removeChecked=e,this.editingShop.goodsList.forEach(function(t){t.removeChecked=e}))}},selectLists:function(){if(this.cartLists&&this.cartLists.length){var e=[],t=0;return this.cartLists.forEach(function(i){i.goodsList.forEach(function(i){i.checked&&(e.push(i),t+=i.price*i.number)})}),this.total=t,e}return[]},removeLists:function(){if(this.editingShop){var e=[];return this.editingShop.goodsList.forEach(function(t){t.removeChecked&&e.push(t)}),e}return[]}},created:function(){this.getCartLists()},filters:{number:function(e){return e.toFixed(2)}}})}},["gWPi"]);
//# sourceMappingURL=cart.8440c47a6261cee84e9d.js.map