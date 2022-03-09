import type { PropType } from 'vue';
export interface IEasingFunction {
    (t: number, b: number, c: number, d: number): number;
}
export interface ICountToProps {
    startVal: number;
    endVal: number;
    duration: number;
    autoplay: boolean;
    decimal: string;
    decimals: number;
    separator: string;
    prefix: string;
    suffix: string;
    useEasing: boolean;
    easingFn?: IEasingFunction;
}
declare const _default: import("vue").DefineComponent<{
    startVal: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    endVal: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    autoplay: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    decimal: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    decimals: {
        type: NumberConstructor;
        required: false;
        default: number;
        validator: (value: number) => boolean;
    };
    separator: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    prefix: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    suffix: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    useEasing: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    easingFn: {
        type: PropType<IEasingFunction>;
        required: false;
        default: undefined;
    };
}, {
    displayValue: import("vue").Ref<string>;
    start: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    pauseResume: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, "mountedCallback" | "callback", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    startVal: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    endVal: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    autoplay: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    decimal: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    decimals: {
        type: NumberConstructor;
        required: false;
        default: number;
        validator: (value: number) => boolean;
    };
    separator: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    prefix: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    suffix: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    useEasing: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    easingFn: {
        type: PropType<IEasingFunction>;
        required: false;
        default: undefined;
    };
}>>, {
    startVal: number;
    endVal: number;
    duration: number;
    autoplay: boolean;
    decimal: string;
    decimals: number;
    separator: string;
    prefix: string;
    suffix: string;
    useEasing: boolean;
    easingFn: IEasingFunction;
}>;
export default _default;
