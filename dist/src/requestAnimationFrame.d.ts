declare function useRequestAnimationFrame(): {
    requestAnimationFrame: (callback: FrameRequestCallback) => number;
    cancelAnimationFrame: (handle: number) => void;
};
export { useRequestAnimationFrame };
