<template>
  <div class="container" style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-if="lists&&lists.length">
      <a class="block-item js-address-item address-item" :class="{'address-item-default':list.isDefault}"
      @click="toEdit(list)" v-for="list in lists" :key="list.id">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit"></a>
      </a>
    </div>
    <div  v-if="lists&&!lists.length">没有地址,请添加地址</div>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        :to="{name:'form',query:{type:'add'}}"
      >新增地址</router-link>
    </div>
  </div>
</template>

<script>
import store from '../vuex'

// import AddressSv from 'js/addressServse.js'

export default {
    // data(){
    //     return {
    //         lists: null
    //     }
    // },
    computed: {
      lists() {
        return this.$store.state.lists
      }    
    },
    methods: {
        toEdit(list) {
            this.$router.push({name: 'form', query: {
                type: 'edit',
                instance: list
            }})
        }
    },
    created() {
        // AddressSv.list().then(res=>{
        //     this.lists = res.data.lists
        // })
        if(!this.lists) {
          this.$store.dispatch('getLists')
        }
    }
}
</script>

<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>



