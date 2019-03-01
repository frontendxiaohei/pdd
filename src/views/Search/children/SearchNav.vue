<template>
  <div class="search-nav">
    <a href="" class="search-nav-inner" @click.prevent="isShowSearchPanel(true)">
      <img src="../images/search.png" width="25" alt="">
      <span>帅的不谈</span>
    </a>
  </div>
</template>

<script>
  export default {
    props: {
      isShowSearchPanel: Function 
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/mixins.styl'
  .search-nav
    position fixed
    top: 0
    left: 0
    z-index: 998
    width 100%
    height 60px
    background-color: #fff;
    border-bottom-1px(#ccc)
    display: flex
    justify-content center
    align-items center
    .search-nav-inner
      display: flex
      justify-content center
      align-items center
      width 90%
      height 70%
      background-color: #f8f8f8;
      border-radius 10px
      span
        margin-left 6px
        font-size 18px
        color #999
        font-weight lighter
</style>