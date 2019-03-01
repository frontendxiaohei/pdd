<template>
  <div class="hot-nav">
    <!-- 滚动区域 -->
    <div class="hot-nav-content" ref="scrollWrap">
      <div class="nav-content-inner" v-if="homenav.length>0">
        <div class="inner-item" v-for="(nav,index) in homenav" :key="index">
          <img v-lazy="nav.iconurl" alt="">
          <span>{{nav.icontitle}}</span>
        </div>
      </div>
    </div>
    <!-- 滚动条 -->
    <div class="hot-nav-bottom">
      <div class="hot-nav-content-inner"></div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {  
    data () {
      return {
        // 1.屏幕的宽度
        screenWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        // 2. 滚动内容的宽度
        scrollContentW: 720,
        // 3. 滚动条背景长度
        bgBar: 100,
        // 4. 滚动条的长度
        barXWidth: 0,
        // 5. 起点
        startX: 0,
        // 6.结束点
        endFlag: 0,
        // 7. 移动的距离
        barMoveWidth: 0
      }
    },
    mounted () {
      this.getBottomWidth()
      this.bindEvent()
    },
    methods: {
      // 获取滚动条的宽度
      getBottomWidth () {
        this.barXWidth = this.bgBarW * (this.screenWidth / this.scrollContentW)
      },
      // 滚动监听
      bindEvent() {
        // 监听滚动区域的滚动事件
        this.$refs.scrollWrap.addEventListener('scroll',this.scrollEvent,false);
      },
      // 逻辑
      scrollEvent () {
        // 获取滚动区滚动的左值
        let left = this.$refs.scrollWrap.scrollLeft;
        // 移动的距离=左值/滚动内容的宽度÷滚动条背景的长度
        this.barMoveWidth = left / this.scrollContentW * this.bgBarW
      }
    },
    computed: {
      ...mapState(['homenav']),
      // 底部滚动条的监听
      innerBarStyle() {
        return {
          width:  `${this.barXWidth}`,
          left: `${this.barMoveWidth}`
        }
      }
    }
    
  }
</script>
<style scoped lang="stylus">
  .hot-nav
    padding-bottom 10px
    position relative
    width 100%
    height 180px
    background-color #fff
    .hot-nav-content
      width 100%
      overflow-x scroll
      &::-webkit-scrollbar
        display none 
      .nav-content-inner
        display flex
        flex-wrap wrap
        width 720px
        height 180px
        .inner-item
          display flex
          flex-direction column
          justify-content center
          align-items center
          width 90px
          height 90px
          font-size 14px
          color #666
          img
            margin-bottom 5px
            width 40%
      .hot-nav-bottom
        width 100px
        height 2px
        background #red 
        position relative
        z-index 10000
        left 50%
        bottom 8px
        margin-left -50px
        .hot-nav-bottom-inner
          position absolute
          left 0
          height 100% 
          background-color red
          width 4px










</style>
