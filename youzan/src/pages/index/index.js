import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot'
import Swipe from 'components/Swipe'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll);

new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false,
        allLoaded: false,
        bannerLists: null
    },
    components: {
        Foot, Swipe
    },
    methods: {
        getLists() {
            if (this.allLoaded) return
            this.loading = true
            axios.get(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                // 判断是否所有数据加载完毕
                let curLists = res.data.lists
                if (curLists.length < this.pageSize) {
                    this.allLoaded = true
                }
                if (this.lists) {
                    this.lists = this.lists.concat(curLists)
                } else {
                    // 初始化列表
                    this.lists = curLists
                }
                this.loading = false
                this.pageNum++;
            }).catch(err => {
                console.log(err)
            })
        },
        getBanner() {
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
            })
        }
    },
    created() {
        this.getLists()
        this.getBanner()
    }
})