<script lang="ts" setup>
import { computed } from "vue";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { omit } from "lodash-es";

defineOptions({
	name: "ScIcon",
	inheritAttrs: false,
});

const props = withDefaults(defineProps<IconProps>(), {});

const filterProps = computed(() => omit(props, ["type", "color"]));
const customStyles = computed(() => ({
	color: props.color ?? void 0,
}));
</script>

<template>
	<i
		class="sc-icon"
		:class="[`sc-icon--${props.type}`]"
		:style="customStyles"
		v-bind="$attrs"
	>
		<font-awesome-icon v-bind="filterProps"></font-awesome-icon>
	</i>
</template>

<style>
@import "./style.css";
</style>
