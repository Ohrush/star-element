<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { throttle } from "lodash-es";

defineOptions({
	name: "ScButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
	tag: "button",
	nativeType: "button",
	throttleDuration: 500,
	useThrottle: true,
});
const emits = defineEmits<ButtonEmits>();

const _ref = ref<HTMLButtonElement>();
const slots = defineSlots();

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration);

defineExpose<ButtonInstance>({
	ref: _ref,
});
</script>

<template>
	<component
		:is="props.tag"
		ref="_ref"
		class="sc-button"
		:type="tag === 'button' ? nativeType : void 0"
		:disabled="disabled || loading ? true : void 0"
		:class="{
			[`sc-button--${type}`]: type,
			[`sc-button--${size}`]: size,
			'is-plain': plain,
			'is-round': round,
			'is-circle': circle,
			'is-disabled': disabled,
			'is-loading': loading,
		}"
		@click="(e: MouseEvent) => useThrottle? handleBtnClickThrottle(e): handleBtnClick(e)"
	>
		<slot></slot>
	</component>
</template>
<style scoped>
@import "./style.css";
</style>
