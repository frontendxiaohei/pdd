<template>
  <div class="recommend-container">
    <ul class="recommend"  v-if="recommendshoplist.length>0">
      <ShopList tag="li"
        v-for="(item, index) in recommendshoplist"
        :key="index"
        :item="item"
      />
    </ul>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ShopList from 'components/ShopList/ShopList'
  import BScroll from 'better-scroll'
  import {Indicator} from 'mint-ui';
  export default {
    name: "Recommend",
    data() {
      return {
        page: 1,
        count: 10,
        top: 0,
        status: true
      }
    },
    components: {
      ShopList,
    },
    mounted() {
      Indicator.open('正在加载数据...');
      // 获取推荐数据列表
      this.$store.dispatch('reqRecommendShopList', {
        page: this.page, count: this.count, callback: () => {
          Indicator.close();
        }
      })
    },
    watch: {
      recommendshoplist() {
        this.$nextTick(() => {
          // 当前页码+1
          this.page += 1;
          // 初始化
          this._initBScroll()
          // 滚动到固定的高度值
          this.listScroll.scrollTo(0, this.top)
        })
      }
    },
    methods: {
      _initBScroll() {
        //1.1初始化
        this.listScroll = new BScroll('.recommend-container', {
          scrollY: true,
          probeType: 3
        })
        // 1.2监听列表的滚动
        this.listScroll.on('touchEnd', (pos) => {
          // 1.2.1 监听下拉动作
          if (pos.y >= 50) {
            console.log('下拉刷新')
          }
          //1.2.2 监听上拉
          if (this.status === true) {
            if (this.listScroll.maxScrollY > pos.y + 30) {
              this.status = false;
              Indicator.open('正在加载数据...');
              // 设置最高值为当前加载最大文档值
              this.top = this.listScroll.maxScrollY - 50
              // 发起数据请求
              this.$store.dispatch('reqRecommendShopList', {
                page: this.page, count: this.count, callback: () => {
                  Indicator.close();
                  this.status = true;
                }
              })
            }
          }
        })
        // 顶部的值
        console.log(this.top)
        // 1.3监听列表滚动结束
        this.listScroll.on('scrollEnd', () => {
          this.listScroll.refresh();
        })
      },
    },
    computed: {
      ...mapState(['recommendshoplist'])
    }
  }
</script>

<style scoped lang="stylus">
  .recommend-container
    width: 100%
    height: 100%
    background #f5f5f5
    overflow hidden
    .recommend
      padding-bottom 50px
      display flex
      flex-wrap wrap
      background #f5f5f5
</style>
