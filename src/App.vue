<template>
  <div id="app">
    <router-view></router-view>

    <NavBar :tabs="tabs"></NavBar>

  </div>
</template>

<script>
 import NavBar from './components/NarBar';


export default {
  data() {
    return {
      tabs:[
        {name:'电影', href:'/films',icon:'icon-films'},
        {name:'影院', href:'/cinema',icon:'icon-cinemas'},
        {name:'特惠', href:'/sales',icon:'icon-sales'},
        {name:'我的', href:'/center',icon:'icon-center'}
      ]
    }
  },
 
  
  components:{
    NavBar
  }
 
}
</script>

<style lang="less">
@import './styles/base.less';

</style>
