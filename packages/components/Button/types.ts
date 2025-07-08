import type { Component, Ref } from "vue";

// 定义按钮类型
export type ButtonType =
	| "primary"
	| "success"
	| "error"
	| "info"
	| "warning"
	| "default";

// 定义按钮的原生按钮类型
export type NativeType = "button" | "reset" | "submit";

// 定义按钮大小
export type ButtonSize = "small" | "medium" | "large";

// 定义按钮的Props类型
export interface ButtonProps {
	tag?: string | Component;
	type?: ButtonType;
	size?: ButtonSize;
	nativeType?: NativeType;
	disabled?: boolean;
	loading?: boolean;
	icon?: string;
	circle?: boolean;
	round?: boolean;
	plain?: boolean;
	autofocus?: boolean;
	useThrottle?: boolean;
	throttleDuration?: number;
	loadingIcon?: string;
}

export interface ButtonEmits {
	(e: "click", val: MouseEvent): void;
}

export interface ButtonInstance {
	ref: Ref<HTMLButtonElement | void>;
}
