<template>
  <div class="search">
    <!--搜索导航-->
    <SearchNav
      :isShowSearchPanel="isShowSearchPanel"
    />
    <!--联动列表-->
    <div class="shop">
      <!--Left-->
      <div class="menu-wrapper" v-if="searchdata.length > 0">
        <ul>
          <li class="menu-item"
              v-for="(item, index) in searchdata" :key="index"
              :class="{current: index === curIndex}"
              @click="clickLeftItem(index)"
              ref="menuList"
          >{{item.name}}
          </li>
        </ul>
      </div>

      <!--Right-->
      <div class="shop-wrapper">
        <ul class="shop-list" v-if="searchdata.length > 0" ref="shopMenu">
          <li v-for="(item,shopNum) in searchdata" :key="shopNum" ref="shopList">
            <div class="shop-title">
              <p>{{item.name}}</p>
              <a>查看更多></a>
            </div>
            <ul class="shop-tag" v-if="item.tag">
              <li v-for="(icon, index) in item.category" :key="index">
                <img v-lazy="icon.icon" alt="" >
              </li>
            </ul>
            <ul class="shop-item">
              <li class="shop-inner"
                  v-for="(list,goodNum) in item.items"
                  :key="goodNum"
              >
                <img :src="list.icon" alt="">
                <p>{{list.title}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--搜索面板-->
    <SearchPanel
      v-if="isShow"
      :isShowSearchPanel="isShowSearchPanel"
    />
  </div>
</template>

<script>
  import SearchNav from './children/SearchNav'
  import SearchPanel from './children/SearchPanel'
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    name: "Search",
    data() {
      return {
        scrollY: 0,
        rightTops: [],
        isShow: false
      }
    },
    components: {
      SearchNav,
      SearchPanel
    },
    //1.发起数据请求
    mounted() {
      this.$store.dispatch('reqSearchGoods')
    },
    //2.获取数据
    computed: {
      ...mapState(['searchdata']),
      /*6.绑定索引值*/
      curIndex() {
        const {scrollY, rightTops} = this
        return rightTops.findIndex((el, index) => {
          this._initLeftScroll(index)
          return scrollY >= el && scrollY < rightTops[index + 1]
        })
      }
    },
    methods: {
      /* 3.初始化滚动*/
      _initBScroll() {
        this.leftScroll = new BScroll('.menu-wrapper', {})
        this.rightScroll = new BScroll('.shop-wrapper', {
          probeType: 3 // 6.1 监听滚动事件
        })
        /* 6.监听右侧滑动事件 */
        this.rightScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(pos.y)
        })
      },
      /* 5.计算rightTops高度值*/
      _initRightLiTops() {
        const tempArr = []
        let top = 0
        tempArr.push(top)
        let aShopList = this.$refs.shopList
        aShopList.forEach(el => {
          top += el.clientHeight
          tempArr.push(top)
        })
        this.rightTops = tempArr
      },
      /* 6.点击左侧切换右侧*/
      clickLeftItem(index) {
        // this.scrollY = this.rightTops[index]
        // this.rightScroll.scrollTo(0,-this.scrollY,200)
        console.log(index)
      },
      /* 7.左右联动*/
      _initLeftScroll(index) {
        let menuList = this.$refs.menuList
        let el = menuList[index]
        this.leftScroll.scrollToElement(el, 300, 0, -200)
      },
      /* 设置搜索面板的显示*/
      isShowSearchPanel(flag) {
        this.isShow = flag
      }
    },
    watch: {
      /* 4.监听滚动*/
      searchdata() {
        this.$nextTick(() => {
          /* 4.1 初始化*/
          this._initBScroll()
          /* 5.1高度监听 */
          this._initRightLiTops()
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/mixins.styl"
  .search
    width: 100%
    height: 100%
    background #f5f5f5
    .shop
      display flex
      position absolute
      top 60px
      bottom 50px
      width 100%
      overflow hidden
      .menu-wrapper
        flex 0 0 80px
        background #f5f5f5
        .menu-item
          height 50px
          display flex
          justify-content center
          align-items center
          color #666
          background #f5f5f5
          &.current
            position relative
            color #d8050a
            background #fff
            &:before
              position absolute
              content ''
              left 0
              width 4px
              height 26px
              background #d8050a
      .shop-wrapper
        flex 1
        background #fff
        .shop-title
          padding 0 5px
          display flex
          justify-content space-between
          align-items center
          color #666
          height 40px
        .shop-tag
          display flex
          flex-wrap wrap
          justify-content center
          align-items center
          li
            width 33.3%
            text-align: center
            margin 5px 0
            img
              width 80%

          border-bottom-1px(#ccc)
        .shop-item
          padding-bottom 10px
          display flex
          flex-wrap wrap
          justify-content center
          align-items center
          .shop-inner
            padding 5px
            width 33.3%
            text-align center
            img
              width 70%
              margin-bottom 5px
            p
              color #555
              font-size 14px
</style>
