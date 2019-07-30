import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import Volecity from 'velocity-animate'

new Vue({
    el: '#app',
    data: {
        cartLists: null,
        total: 0,
        editingShop: null,
        editingShopIndex: -1,
        removePopup: false,
        removeData: null,
        removeMsg: ''
    },
    methods: {
        getCartLists() {
            axios.get(url.cartList).then(res => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(goods => {
                        goods.checked = true
                        goods.removeChecked = false
                    });
                });
                this.cartLists = lists
            })
        },
        selectGoods(shop, goods) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            goods[attr] = !goods[attr]
            shop[attr] = shop.goodsList.every(goods => {
                return goods[attr]
            })
        },
        selectShop(shop) {
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(goods => {
                return goods[attr] = shop[attr]
            })
        },
        selectAll() {
            let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop, shopIndex) {
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.cartLists.forEach((item, i) => {
                if (shopIndex !== i) {
                    item.editing = false
                    item.editingMsg = shop.editing ? '' : '编辑'
                }
            })
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
        },
        reduce(goods) {
            if (goods.number === 1) return
            axios.post(url.cartReduce, {
                id: goods.id,
                number: 1
            }).then(res => {
                goods.number--;
            })
        },
        add(goods) {
            axios.post(url.addCart, {
                id: goods.id,
                number: 1
            }).then(res => {
                goods.number++;
            })
        },
        remove(shop, shopIndex, goods, goodIndex) {
            this.removePopup = true
            this.removeData = { shop, shopIndex, goods, goodIndex }
            this.removeMsg = '确定要删除该商品吗？'
        },
        removeList() {
            this.removePopup = true
            this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
        },
        removeConfirm() {
            if (this.removeMsg === '确定要删除该商品吗？') {
                let { shop, shopIndex, goods, goodIndex } = this.removeData
                fetch(url.cartRemove, {
                    id: goods.id
                }).then(res => {
                    shop.goodsList.splice(goodIndex, 1)
                    if (!shop.goodsList.length) {
                        this.cartLists.splice(shopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            } else {
                let ids = []
                this.removeLists.forEach(goods => {
                    ids.push(goods.id)
                })
                axios.post(url.cartMrremove, {
                    ids
                }).then(res => {
                    let arr = []
                    this.editingShop.goodsList.forEach(goods => {
                        let index = this.removeLists.findIndex(item => {
                            return item.id == goods.id
                        })
                        if (index === -1) {
                            arr.push(goods)
                        }
                    })
                    if (arr.length) {
                        this.editingShop.goodsList = arr
                    } else {
                        this.cartLists.splice(this.editingShopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false
                })
            }
        },
        // removeConfirm() {
        //     let { shop, shopIndex, goods, goodIndex } = this.removeData
        //     axios.post(url.cartRemove, {
        //         id: goods.id
        //     }).then(res => {
        //         shop.goodsList.splice(goodIndex, 1)
        //         if (!shop.goodsList.length) {
        //             this.cartLists.splice(shopIndex, 1)
        //             this.removeShop()
        //         }
        //         this.removePopup = false
        //     })
        // },
        removeShop() {
            this.editingShop = null
            this.editingShopIndex = -1
            this.cartLists.forEach(shop => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        start(e, goods) {
            goods.startX = e.changedTouches[0].clientX
        },
        end(e, shopIndex, good, goodIndex) {
            let endX = e.changedTouches[0].clientX
            let left = '0'
            if (good.startX - endX > 100) {
                left = '-60px'
            }
            if (endX - good.startX > 100) {
                left = '0px'
            }
            Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
                left
            })
        },
        removeCancel() {
            this.removePopup = false
        }
    },
    computed: {
        allSelected: {
            get() {
                if (this.cartLists && this.cartLists.length) {
                    return this.cartLists.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal) {
                this.cartLists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(goods => {
                        goods.checked = newVal
                    })
                })
            }
        },
        allRemoveSelected: {
            get() {
                if (this.editingShop) {
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal) {
                if (this.editingShop) {
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(goods => {
                        goods.removeChecked = newVal
                    });
                }
            }
        },
        selectLists() {
            if (this.cartLists && this.cartLists.length) {
                let arr = []
                let total = 0
                this.cartLists.forEach(shop => {
                    shop.goodsList.forEach(goods => {
                        if (goods.checked) {
                            arr.push(goods)
                            total += goods.price * goods.number
                        }
                    });
                })
                this.total = total
                return arr
            }
            return []
        },
        removeLists() {
            if (this.editingShop) {
                let arr = []
                this.editingShop.goodsList.forEach(goods => {
                    if (goods.removeChecked) {
                        arr.push(goods)
                    }
                })
                return arr
            }
            return []
        }
    },
    created() {
        this.getCartLists()
    },
    filters: {
        number(price) {
            return price.toFixed(2)

        }
    }
})
