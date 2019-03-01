<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
      class="fixed"
    >
    </ly-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selectedId: 0,
        items: [
          {label: "热门"},
          {label: '服饰'},
          {label: '鞋包'},
          {label: '母婴'},
          {label: '后端'},
          {label: '百货'},
          {label: '产品'},
          {label: '内衣'},
          {label: '设计'}
        ],
        options: {
          activeColor: '#e9232c',
        },
        // 二级路由路径
        subRouterUrl: [
          '/home/hot',
          '/home/box',
          '/home/dress',
          '/home/food',
          '/home/general',
          '/home/man',
          '/home/ele',
          '/home/mbaby',
          '/home/shirt',
          '/home/',
          '/home/hot',
        ]
      }
    },
    methods: {
      handleChange (item, index) {
        this.$router.replace(this.subRouterUrl[index])
      }
    }
  }
</script>
<style scoped lang="stylus">
  .home
    width: 100%
    height 100%
    background #f5f5f5
    .fixed
      position fixed
      left 0
      top 0
      z-index 998
</style>
  