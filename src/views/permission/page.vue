<!-- Permission 页面权限 -->
<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'PagePermission',
  components: { SwitchRoles },
  methods: {
    // 切换角色
    handleRolesChange() {
      // this.$router.push({ path: '/permission/index?' + +new Date() }) // ?
      this.key++
    }
  }
}
</script>
