import Vue from 'vue'
import Vuex from 'vuex'

import addressSv from 'js/addressServse.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        lists: null
    },
    mutations: {
        init(state, lists) {
            state.lists = lists
        },
        add(state, instance) {
            state.lists.push(instance)
        },
        remove(state, id) {
            let lists = state.lists
            let index = lists.findIndex(item => {
                return item.id == id
            })
            lists.splice(index, 1)
        },
        update(state, instance) {
            let lists = JSON.parse(JSON.stringify(state.lists))
            let index = lists.findIndex(item => {
                return item.id == instance.id
            })
            lists[index] = instance
            state.lists = lists
        },
        setDefault(state, id) {
            let lists = state.lists
            lists.forEach(item => {
                item.isDefault = item.id == id ? true : false
            });
        }
    },
    actions: {
        getLists({ commit }) {
            addressSv.list().then(res => {
                commit('init', res.data.lists)
            })
        },
        addAction({ commit }, instance) {
            addressSv.add(instance).then(res => {
                instance.id = parseInt(Math.random()*10000)
                commit('add', instance)
            })
        },
        removeAction({ commit }, id) {
            addressSv.remove(id).then(res => {
                commit('remove', id)
            })
        },
        updateAction({ commit }, instance) {
            addressSv.update(instance).then(res => {
                commit('update', instance)
            })
        },
        setDefaultAction({ commit }, id) {
            addressSv.setDefault(id).then(res => {
                commit('setDefault', id)
            })
        }
    }
})

export default store