import Vue from 'vue'
import Router from 'vue-router'
import Member from './components/Member'
import Address from './components/Address'
import Form from './components/Form'
import AllLists from './components/AllLists'



Vue.use(Router)

let routes = [{
    path: '/',
    component: Member

}, {
    path: '/address',
    component: Address,
    children: [{
        path: '',
        redirect: 'allLists'
    },{
        path: 'allLists',
        name: 'all',
        component: AllLists
    },{
        path: 'form',
        name: 'form',
        component: Form
    }]
}
]

let router = new Router({
    routes
})

new Vue({
    el: '#app',
    router,
})