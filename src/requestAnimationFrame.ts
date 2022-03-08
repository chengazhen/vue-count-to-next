
function useRequestAnimationFrame() {
  let lastTime = 0

  const isServer = typeof window === 'undefined'

  let requestAnimationFrame: (callback: FrameRequestCallback) => number
  let cancelAnimationFrame: (handle: number) => void

  // 服务端 渲染
  if (isServer) {
    requestAnimationFrame = function (): number {
      return 0
    }
    cancelAnimationFrame = function (): void {
      return
    }
  } else {

    requestAnimationFrame = window.requestAnimationFrame
    cancelAnimationFrame = window.cancelAnimationFrame
    console.log(typeof requestAnimationFrame);

    // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
    if (typeof requestAnimationFrame !== 'function' && typeof cancelAnimationFrame !== 'function') {
      requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
      cancelAnimationFrame = window.mozCancelAnimationFrame || window.cancelRequestAnimationFrame
    }


    // 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
    if (!requestAnimationFrame || !cancelAnimationFrame) {
      requestAnimationFrame = function (callback: FrameRequestCallback) {
        const currTime = new Date().getTime()
        // 为了使setTimteout的尽可能的接近每秒60帧的效果
        const timeToCall = Math.max(0, 16 - (currTime - lastTime))
        const id = window.setTimeout(() => {
          callback(currTime + timeToCall)
        }, timeToCall)
        lastTime = currTime + timeToCall
        return id
      }

      cancelAnimationFrame = function (id: number) {
        window.clearTimeout(id)
      }
    }
  }
  return { requestAnimationFrame, cancelAnimationFrame }
}

export { useRequestAnimationFrame }
