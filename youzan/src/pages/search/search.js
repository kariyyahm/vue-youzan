import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'js/api.js'
import Velocity from 'velocity-animate'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll);

let { keyword, id } = qs.parse(location.search.substr(1))

new Vue({
    el: '#app',
    data: {
        searchList: null,
        isShow: false,
        allLoaded: false,
        loading: false,
        pageNum: 1,
        pageSize: 6,
        subData: null

    },
    methods: {
        getSearchList() {
            if (this.allLoaded) return
            this.loading = true
            axios.get(url.searchList, {
                keyword: keyword,
                id: id,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                let curSearchList = res.data.lists
                // 判断数据是否加载完毕
                if (curSearchList.length < this.pageSize) {
                    this.allLoaded = true
                }
                if (this.searchList) {
                    this.searchList = this.searchList.concat(curSearchList)
                } else {
                    // 初始化列表
                    this.searchList = curSearchList
                }
                this.loading = false
                this.pageNum++;
            })
        },
        move() {
            if (document.documentElement.scrollTop > 100) {
                this.isShow = true
            } else {
                this.isShow = false
            }
        },
        toTop() {
            Velocity(document.body, 'scroll', { duration: 700 })
        }
    },
    created() {
        this.getSearchList()
    },
    filters: {
        number(price) {
            return price.toFixed(2)
        }
    }
})