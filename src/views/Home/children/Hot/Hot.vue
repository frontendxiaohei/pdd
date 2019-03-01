<template>
  <div class="hot">
    <!-- 轮播图 -->
    <div class="swiper-container" v-if="homecasual.length>0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(casual,index) in homecasual" :key="index">
          <img :src="casual.imgurl" alt="" width="100%">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- scroll area -->
    <hot-nav></hot-nav>
    <!-- 广告位 -->
    <div class="hot-ad">
      <img src="./../../imgs/hot_ad/home_ad.gif" alt="" width="100%">
    </div>
    <!-- 商品列表 -->
    <hot-shop-list></hot-shop-list>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import {mapState} from 'vuex'
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'
  export default {
    mounted () {
      // 1.获取首页轮播图数据
      this.$store.dispatch('reqHomeCasual', ()=>{
        this.$nextTick(()=>{
          // 创建swiper实例
          new Swiper('.swiper-container', {
            loop: true,
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            }
          })
        })
      });
      // 2.获取首页导航数据
      this.$store.dispatch('reqHomeNav');
      // 3.获取首页商品列表数据
      this.$store.dispatch('reqHomeShopList');
    },
    computed: {
      ...mapState(['homecasual'])
    },
    components: {
      HotNav,
      HotShopList
    }
  }
</script>

<style scoped lang="stylus">
  .hot
    padding-top 34px
    width 100%
    background #f5f5f5
    .hot-ad
      margin 8px 0
      padding 5px
      background #fff
</style>