<!-- 可拖拽选择器 -->
<template>
  <!-- v-bind="$attrs" 将父组件传递给该组件的所有属性(没有被该组件声明为 props 的 attribute)都绑定到 el-select 组件上 -->
  <!-- v-on="$listeners" 将父组件传递给该组件的所有事件监听器都绑定到 el-select 组件上。这使得子组件可以触发父组件的事件 -->
  <el-select ref="dragSelect" v-model="selectVal" v-bind="$attrs" class="drag-select" multiple v-on="$listeners">
    <!-- slot 为 el-option 占位 -->
    <slot />
  </el-select>
</template>

<script>
import Sortable from 'sortablejs' // https://github.com/SortableJS/Sortable

export default {
  name: 'DragSelect',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  computed: {
    // 不能直接修改父组件传递过来的 props，所以需要定义一个计算属性来获取和设置值
    selectVal: {
      get() {
        return [...this.value]
      },
      set(val) {
        this.$emit('input', [...val]) // 这里触发的是修改父组件中的 value 的值方法
      }
    }
  },
  mounted() {
    this.setSort()
  },
  methods: {
    // TODO
    setSort() {
      const el = this.$refs.dragSelect.$el.querySelectorAll('.el-select__tags > span')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.value.splice(evt.oldIndex, 1)[0]
          this.value.splice(evt.newIndex, 0, targetRow)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-select {
  ::v-deep {
    .sortable-ghost {
      opacity: .8;
      color: #fff !important;
      background: #42b983 !important;
    }

    .el-tag {
      cursor: pointer;
    }
  }
}
</style>
