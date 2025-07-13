<script setup lang="ts">
import { computed, ref } from "vue";
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import ScIcon from "../Icon/Icon.vue";
import { throttle } from "lodash-es";

defineOptions({
	name: "ScButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
	tag: "button",
	nativeType: "button",
	throttleDuration: 500,
});
const emits = defineEmits<ButtonEmits>();

const iconStyle = computed(() => ({
	marginRight: slots.default ? "6px" : "0",
}));

const _ref = ref<HTMLButtonElement>();
const slots = defineSlots();

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(
	handleBtnClick,
	props.throttleDuration,
	{ trailing: false }
);

defineExpose<ButtonInstance>({
	ref: _ref,
});
</script>

<template>
	<component
		ref="_ref"
		class="sc-button"
		:is="tag"
		:autofocus="autofocus"
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
		<template v-if="loading">
			<slot name="loading">
				<sc-icon
					class="loading-icon"
					:icon="loadingIcon ?? 'spinner'"
					:style="iconStyle"
					size="1x"
					spin
				/>
			</slot>
		</template>
		<sc-icon
			v-if="icon && !loading"
			:icon="icon"
			:style="iconStyle"
			size="1x"
		/>
		<slot></slot>
	</component>
</template>
<style scoped>
@import "./style.css";
</style>
