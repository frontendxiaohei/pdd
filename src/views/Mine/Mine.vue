<template>
  <div class="me">
    <div v-if="userInfo.id">
      <MineTop/>
    </div>
    <SelectLogin v-else/>
  </div>
</template>

<script>
  import SelectLogin from './Login/SelectLogin'
  import MineTop from './MineTop'
  import {mapState} from 'vuex'
  export default {
    name: "Me",
    components: {
      SelectLogin,
      MineTop
    },
    computed: {
      ...mapState(['userInfo'])
    }
  }
</script>

<style scoped lang="stylus">
  div
    width: 100%
    height: 100%
</style>
