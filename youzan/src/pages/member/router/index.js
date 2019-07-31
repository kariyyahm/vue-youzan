import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

let routes = [{
    path: '/',
    components: require('../components/Member.vue'),

}, {
    path: '/address',
    components: require('../components/Address.vue'),
    children: [{
        path: '',
        redirect: 'allLists'
    },{
        path: 'allLists',
        name: 'all',
        components: require('../components/AllLists.vue'),
    },{
        path: 'form',
        name: 'form',
        components: require('../components/Form.vue'),
    }]
}
]

let router = new Router({
    routes
})



export default router