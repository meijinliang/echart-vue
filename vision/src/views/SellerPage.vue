<!-- 针对/sellerPage这条路径显示出来的
在这个组件中，通过子组件注册的方式 要显示出seller.vue这个组件-->
<template>
  <div class="com_page">
    <Seller />
  </div>
</template>
<script>
import Seller from '@/components/seller'
export default {
  data () {
    return {
    }
  },
  methods: {},
  components: {
    Seller
  }
}
</script>
<style lang="less" scoped>
</style>
