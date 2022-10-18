<template>
  <div>
    <label class="radio-label" style="padding-left:0;">Cell Auto-Width: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" style="margin-right:0;" border>
        True
      </el-radio>
      <el-radio :label="false" border>
        False
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    autoWidth: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
