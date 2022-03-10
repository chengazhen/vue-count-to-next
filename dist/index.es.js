import { defineComponent, ref, computed, onBeforeUnmount, onMounted, watch, openBlock, createElementBlock, toDisplayString } from "vue";
function useRequestAnimationFrame() {
  let lastTime = 0;
  const isServer = typeof window === "undefined";
  let requestAnimationFrame;
  let cancelAnimationFrame;
  if (isServer) {
    requestAnimationFrame = function() {
      return 0;
    };
    cancelAnimationFrame = function() {
      return;
    };
  } else {
    requestAnimationFrame = window.requestAnimationFrame;
    cancelAnimationFrame = window.cancelAnimationFrame;
    console.log(typeof requestAnimationFrame);
    if (typeof requestAnimationFrame !== "function" && typeof cancelAnimationFrame !== "function") {
      requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
      cancelAnimationFrame = window.mozCancelAnimationFrame || window.cancelRequestAnimationFrame;
    }
    if (!requestAnimationFrame || !cancelAnimationFrame) {
      requestAnimationFrame = function(callback) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
      cancelAnimationFrame = function(id) {
        window.clearTimeout(id);
      };
    }
  }
  return { requestAnimationFrame, cancelAnimationFrame };
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = defineComponent({
  name: "CountTo",
  emits: ["mountedCallback", "callback"],
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
      default: 3e3
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true
    },
    decimal: {
      type: String,
      required: false,
      default: "."
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator: (value) => {
        return value >= 0;
      }
    },
    separator: {
      type: String,
      required: false,
      default: ","
    },
    prefix: {
      type: String,
      required: false,
      default: ""
    },
    suffix: {
      type: String,
      required: false,
      default: ""
    },
    useEasing: {
      type: Boolean,
      required: false,
      default: true
    },
    easingFn: {
      type: Object,
      required: false,
      default: void 0
    }
  },
  setup(props, context) {
    const defaultEasingFn = (t, b, c, d) => {
      return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    };
    const easingFn = props.easingFn || defaultEasingFn;
    const isNumber = (val) => {
      return !isNaN(parseFloat(val));
    };
    const formatNumber = (num = 0, decimals = 0) => {
      const numString = num.toFixed(decimals);
      const x = numString.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? props.decimal + x[1] : "";
      const rgx = /(\d+)(\d{3})/;
      if (props.separator && !isNumber(props.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + props.separator + "$2");
        }
      }
      return props.prefix + x1 + x2 + props.suffix;
    };
    const displayValue = ref(formatNumber(props.startVal));
    let startTime = 0;
    let remaining = 0;
    let localDuration = props.duration || 3e3;
    let localStartVal = props.startVal || 0;
    let printVal = 0;
    let paused = false;
    let requestAnimationFrameHandler = 0;
    const { requestAnimationFrame, cancelAnimationFrame } = useRequestAnimationFrame();
    const isCountDown = computed(() => {
      return props.startVal > props.endVal;
    });
    const count = (timestamp) => {
      if (!startTime)
        startTime = timestamp;
      const progress = timestamp - startTime;
      remaining = localDuration - progress;
      if (props.useEasing) {
        if (isCountDown.value) {
          printVal = localStartVal - easingFn(progress, 0, localStartVal - props.endVal, localDuration);
        } else {
          printVal = easingFn(progress, localStartVal, props.endVal - localStartVal, localDuration);
        }
      } else {
        if (isCountDown.value) {
          printVal = localStartVal - (localStartVal - props.endVal) * (progress / localDuration);
        } else {
          printVal = localStartVal + (props.endVal - localStartVal) * (progress / localDuration);
        }
      }
      if (isCountDown.value) {
        printVal = printVal < props.endVal ? props.endVal : printVal;
      } else {
        printVal = printVal > props.endVal ? props.endVal : printVal;
      }
      displayValue.value = formatNumber(printVal);
      if (progress < localDuration) {
        requestAnimationFrameHandler = requestAnimationFrame(count);
      } else {
        context.emit("callback");
      }
    };
    const start = () => {
      localStartVal = props.startVal;
      startTime = 0;
      localDuration = props.duration;
      paused = false;
      requestAnimationFrameHandler = requestAnimationFrame(count);
    };
    const pause = () => {
      cancelAnimationFrame(requestAnimationFrameHandler);
    };
    const resume = () => {
      startTime = 0;
      localDuration = +remaining;
      localStartVal = +printVal;
      requestAnimationFrame(count);
    };
    const reset = () => {
      startTime = 0;
      cancelAnimationFrame(requestAnimationFrameHandler);
      displayValue.value = formatNumber(props.startVal);
    };
    const pauseResume = () => {
      if (paused) {
        resume();
        paused = false;
      } else {
        pause();
        paused = true;
      }
    };
    onBeforeUnmount(() => {
      cancelAnimationFrame(requestAnimationFrameHandler);
    });
    onMounted(() => {
      if (props.autoplay) {
        start();
      }
      context.emit("mountedCallback");
    });
    watch(() => {
      return props.startVal + props.endVal;
    }, () => {
      if (props.autoplay) {
        start();
      }
    });
    return {
      displayValue,
      start,
      pause,
      resume,
      reset,
      pauseResume
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, toDisplayString(_ctx.displayValue), 1);
}
var CountTo = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { CountTo as default };
