<template>
    <div class="select-login">
      <div class="bottom">
        <img src="./images/logo1.png" alt="" width="200">
        <h4>选择登陆方式</h4>
      </div>
      <router-link tag="button" to="/login">手机登录</router-link>
    </div>
</template>

<script>
    export default {
        name: "SelectLogin"
    }
</script>

<style scoped lang="stylus">
  .select-login
    background-color #f5f5f5
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 1000
    display flex
    justify-content center
    align-items center
    button
      height 38px
      background #e02e24
      border none
      border-radius 5px
      font-size 20px
      color #fff
      margin-top 30px
      width 80%
    .bottom
      position fixed
      top 130px
      left 50%
      margin-left -100px
      h4
        margin-top: 40px
        text-align center
        font-size 20px
        font-weight bold
</style>
