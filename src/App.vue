<template>
  <div id="app">
    <router-view/>
    <Tab-bar v-show="$route.meta.showBottomTabBar" />
  </div>
</template>
<script>
import TabBar from 'components/TabBar/TabBar'
export default {
  components: {
    TabBar
  }
}
</script>

<style lang="stylus">
#app
  width: 100%
  height: 100%
  background: #f5f5f5
</style>
