<!-- 重定向组件 -->
<!-- 用于不刷新页面的情况下更新页面 -->
<script>
export default {
  created() {
    console.log(this)
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
