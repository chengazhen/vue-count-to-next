
//  在这里必须导出一下 才能生效
export { }
declare global {
    interface Window {
        webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number
        mozCancelAnimationFrame: (handle: number) => void
        cancelRequestAnimationFrame: (handle: number) => void
    }
}