<template>
  <span>
    {{ displayValue }}
  </span>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  watch,
  ref
} from 'vue'
import type { SetupContext, PropType } from 'vue'
import { useRequestAnimationFrame } from './requestAnimationFrame'

export interface IEasingFunction {
  (t: number, b: number, c: number, d: number): number
}

export interface ICountToProps {
  startVal: number
  endVal: number
  duration: number
  autoplay: boolean
  decimal: string
  decimals: number
  separator: string
  prefix: string
  suffix: string
  useEasing: boolean
  easingFn?: IEasingFunction
}

export default defineComponent({
  name: 'CountTo',
  emits: ['mountedCallback', 'callback'],
  props: {
    startVal: {
      type: Number,
      required: false,
      default: 0
    },
    endVal: {
      type: Number,
      required: false,
      default: 2017
    },
    duration: {
      type: Number,
      required: false,
      default: 3000
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true
    },
    decimal: {
      type: String,
      required: false,
      default: '.'
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator: (value: number) => {
        return value >= 0
      }
    },
    separator: {
      type: String,
      required: false,
      default: ','
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    suffix: {
      type: String,
      required: false,
      default: ''
    },
    useEasing: {
      type: Boolean,
      required: false,
      default: true
    },
    easingFn: {
      type: Object as PropType<IEasingFunction>,
      required: false,
      default: undefined
    }
  },
  setup(props: ICountToProps, context: SetupContext) {
    // 默认 变化函数
    const defaultEasingFn = (
      t: number,
      b: number,
      c: number,
      d: number
    ): number => {
      return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
    }
    const easingFn: IEasingFunction = props.easingFn || defaultEasingFn // set default func to prop will cause en error

    const isNumber = (val: string): boolean => {
      return !isNaN(parseFloat(val))
    }

    // 格式化数据 增加前缀、后缀、
    const formatNumber = (num = 0, decimals = 0): string => {
      const numString = num.toFixed(decimals)
      const x = numString.split('.')
      let x1 = x[0] // 整数部分
      const x2 = x.length > 1 ? props.decimal + x[1] : '' // 小数部分
      const rgx = /(\d+)(\d{3})/
      // 添加分隔符 默认 ,
      if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + props.separator + '$2')
        }
      }
      return props.prefix + x1 + x2 + props.suffix
    }

    const displayValue = ref<string>(formatNumber(props.startVal)) // 具体显示的格式化后的字符串
    let startTime = 0 // 开始时间
    let remaining = 0 // 剩余时间
    let localDuration = props.duration || 3000 // 本地持续时间
    let localStartVal = props.startVal || 0 // 开始数值
    let printVal = 0 // 显示的数字
    let paused = false // 是否暂停
    let requestAnimationFrameHandler = 0 // 动画函数句柄

    const { requestAnimationFrame, cancelAnimationFrame } =
      useRequestAnimationFrame()

    // 是否为下降式渐变 计算属性 中途可能会改变状态
    const isCountDown = computed(() => {
      return props.startVal > props.endVal
    })

    // 计算数值
    const count = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime // 持续时间
      remaining = localDuration - progress
      if (props.useEasing) {
        // 使用自定义事件函数
        if (isCountDown.value) {
          printVal =
            localStartVal -
            easingFn(progress, 0, localStartVal - props.endVal, localDuration)
        } else {
          printVal = easingFn(
            progress,
            localStartVal,
            props.endVal - localStartVal,
            localDuration
          )
        }
      } else {
        if (isCountDown.value) {
          printVal =
            localStartVal -
            (localStartVal - props.endVal) * (progress / localDuration)
        } else {
          printVal =
            localStartVal +
            (props.endVal - localStartVal) * (progress / localDuration)
        }
      }
      if (isCountDown.value) {
        printVal = printVal < props.endVal ? props.endVal : printVal
      } else {
        printVal = printVal > props.endVal ? props.endVal : printVal
      }
      displayValue.value = formatNumber(printVal)
      if (progress < localDuration) {
        requestAnimationFrameHandler = requestAnimationFrame(count)
      } else {
        context.emit('callback')
      }
    }

    const start = () => {
      localStartVal = props.startVal
      startTime = 0
      localDuration = props.duration
      paused = false
      requestAnimationFrameHandler = requestAnimationFrame(count)
    }

    const pause = () => {
      cancelAnimationFrame(requestAnimationFrameHandler)
    }

    const resume = () => {
      startTime = 0
      localDuration = +remaining
      localStartVal = +printVal
      requestAnimationFrame(count)
    }

    const reset = () => {
      startTime = 0
      cancelAnimationFrame(requestAnimationFrameHandler)
      displayValue.value = formatNumber(props.startVal)
    }

    const pauseResume = () => {
      if (paused) {
        resume()
        paused = false
      } else {
        pause()
        paused = true
      }
    }

    onBeforeUnmount(() => {
      cancelAnimationFrame(requestAnimationFrameHandler)
    })

    onMounted(() => {
      if (props.autoplay) {
        start()
      }
      context.emit('mountedCallback')
    })

    watch(
      () => {
        return props.startVal + props.endVal
      },
      () => {
        if (props.autoplay) {
          start()
        }
      }
    )

    return {
      displayValue,
      start,
      pause,
      resume,
      reset,
      pauseResume
    }
  }
})
</script>
