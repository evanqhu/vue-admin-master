<!-- 回到顶部 -->
<template>
  <transition :name="transitionName">
    <div v-show="visible" :style="customStyle" class="back-to-ceiling" @click="backToTop">
      <svg width="16" height="16" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="Icon Icon--backToTopArrow" aria-hidden="true" style="height:16px;width:16px"><path d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z" /></svg>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    // 当滚动高度超过该值时，显示回到顶部按钮
    visibilityHeight: {
      type: Number,
      default: 400
    },
    // 滚动回到顶部时的位置，距离顶部多少距离，0 表示滚动到最上方
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px',
          background: '#e7eaf1'
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false // 滚动条是否在移动
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    // 滚动事件回调
    handleScroll() {
      this.visible = window.scrollY > this.visibilityHeight
    },
    // 回到顶部事件
    backToTop() {
      if (this.isMoving) return // 如果当前正在滚动，则直接返回，避免多个动画同时进行
      window.scrollTo({
        top: this.backPosition,
        behavior: 'smooth' // 平滑滚动
      })

      // 手动实现的平滑滚动的方案
      // const start = window.scrollY // 获取当前滚动条的垂直位置
      // let i = 0 // 初始化一个计数器
      // this.isMoving = true // 设置标志位，表示正在滚动
      // this.interval = setInterval(() => {
      //   const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
      //   if (next <= this.backPosition) {
      //     window.scrollTo(0, this.backPosition)
      //     clearInterval(this.interval)
      //     this.isMoving = false
      //   } else {
      //     window.scrollTo(0, next)
      //   }
      //   i++
      // }, 16.7)
    },
    // 二次方缓动函数
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    }
  }
}
</script>

<style scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.back-to-ceiling:hover {
  background: #d5dbe7;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
