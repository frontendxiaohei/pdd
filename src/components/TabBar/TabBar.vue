<template>
  <div class="bottom-tab">
    <span class="tab-item" @click="switchTo('/home')">
      <img 
        :src="$route.path.includes('/home') ? tabImg[0].selected : tabImg[0].normal"
      >
      <span :class="{on: $route.path.includes('/home')}">首页</span>
    </span>
    <span class="tab-item" @click="switchTo('/recommend')">
      <img  alt=""
        :src="$route.path.includes('/recommend') ? tabImg[1].selected : tabImg[1].normal"
      >
      <span :class="{on: $route.path.includes('/recommend')}">推荐</span>
    </span>
    <span class="tab-item" @click="switchTo('/search')">
      <img  alt
        :src="$route.path.includes('/search') ? tabImg[2].selected : tabImg[2].normal"
      >
      <span :class="{on: $route.path.includes('/search')}">搜索</span>
    </span>
    <span class="tab-item" @click="switchTo('/chat')">
      <img  alt
        :src="$route.path.includes('/chat') ? tabImg[3].selected : tabImg[3].normal"
      >
      <span :class="{on: $route.path.includes('/chat')}">聊天</span>
    </span>
    <span class="tab-item" @click="switchTo('/mine')">
      <img  alt
        :src="$route.path.includes('/mine') ? tabImg[4].selected : tabImg[4].normal"
      >
      <span :class="{on: $route.path.includes('/mine')}">个人</span>
    </span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tabImg: [
          {
            normal: require('common/static/img/icon_home.png'),
            selected: require('common/static/img/icon_home_selected.png')
          },
          {
            normal: require('common/static/img/icon_intro.png'),
            selected: require('common/static/img/icon_intro_selected.png')
          },
          {
            normal: require('common/static/img/icon_search.png'),
            selected: require('common/static/img/icon_search_selected.png')
          },
          {
            normal: require('common/static/img/icon_chat.png'),
            selected: require('common/static/img/icon_chat_selected.png')
          },
          {
            normal: require('common/static/img/icon_mine.png'),
            selected: require('common/static/img/icon_mine_selected.png')
          }
        ]
      }
      
    },
    methods: {
      switchTo (path) {
        this.$router.replace(path)
      }    
    }
   }
</script>
<style lang="stylus">
  .bottom-tab
    position fixed
    display flex
    bottom 0
    left 0
    width 100%
    height 50px
    background-color #fff
    z-index 999
    .tab-item
      display flex
      flex-direction column
      flex 1
      justify-content center
      align-items center
      font-size 14px
      color #666
      img 
        width 35%
        margin-bottom 2px
      .on
        color red


</style>
