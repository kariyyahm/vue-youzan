import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot'


new Vue({
    el: '#app',
    components: {
        Foot
    },
    data: {
        topLists: null,
        topIndex: 0,
        subData: null,
        rankData: null
    },
    methods: {
        getTopLists() {
            axios.get(url.topList).then(res => {
                this.topLists = res.data.lists
            })
        },
        getSubList(id, index) {
            this.topIndex = index
            if (index === 0) {
                this.getRank()
            } else {
                axios.get(url.subList).then(res => {
                    this.subData = res.data.data
                })
            }
        },
        getRank() {
            axios.get(url.rank).then(res => {
                this.rankData = res.data.data
            })
        },
        toSearch(list) {
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    created() {
        this.getTopLists()
        this.getSubList(0, 0)
    },
    filters: {
        number(price) {
            return price.toFixed(2)
        }
    }
})