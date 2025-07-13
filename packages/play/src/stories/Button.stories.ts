import type { Meta, StoryObj, ArgTypes } from "@storybook/vue3-vite";
import { fn, within, userEvent, expect, clearAllMocks } from "storybook/test";
import { set } from "lodash-es";

import { ScButton } from "star-element";

type Story = StoryObj<typeof ScButton> & {
	argTypes?: ArgTypes<typeof ScButton>;
};

const meta: Meta<typeof ScButton> = {
	title: "Example/Button",
	component: ScButton,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["primary", "success", "warning", "danger", "info", ""],
		},
		size: {
			control: { type: "select" },
			options: ["large", "default", "small", ""],
		},
		disabled: {
			control: "boolean",
		},
		loading: {
			control: "boolean",
		},
		useThrottle: {
			control: "boolean",
		},
		throttleDuration: {
			control: "number",
		},
		autofocus: {
			control: "boolean",
		},
		tag: {
			control: { type: "select" },
			options: ["button", "a", "div"],
		},
		nativeType: {
			control: { type: "select" },
			options: ["button", "submit", "reset", ""],
		},
		icon: {
			control: { type: "text" },
		},
		loadingIcon: {
			control: { type: "text" },
		},
	},
	args: { onClick: fn() },
};

const container = (val: string) => `
<div style="margin: 5px">
	${val}
</div>
`;

export const Default: Story & { args: { content: string } } = {
	argTypes: {
		content: {
			control: { type: "text" },
		},
	},
	args: {
		type: "primary",
		content: "Button",
	},
	render: (args: any) => ({
		components: { ScButton },
		setup() {
			return { args };
		},
		template: container(
			`<sc-button data-testid="story-test-btn" v-bind="args">{{args.content}}</sc-button>`
		),
	}),
	play: async ({ canvasElement, args, step }: any) => {
		const canvas = within(canvasElement);
		const btn = canvas.getByTestId("story-test-btn");

		await step(
			"When useThrottle is set to true, the onClick should be called once",
			async () => {
				set(args, "useThrottle", true);
				await userEvent.tripleClick(btn);

				expect(args.onClick).toHaveBeenCalledOnce();
				clearAllMocks();
			}
		);

		await step(
			"When useThrottle is set to false, the onClick should be called three times",
			async () => {
				set(args, "useThrottle", false);
				await userEvent.tripleClick(btn);

				expect(args.onClick).toHaveBeenCalledTimes(3);
				clearAllMocks();
			}
		);

		await step(
			"When disabled is set to true, the onClick should not be called",
			async () => {
				set(args, "disabled", true);
				await userEvent.click(btn);

				expect(args.onClick).toHaveBeenCalledTimes(0);
				set(args, "disabled", false);
				clearAllMocks();
			}
		);

		// await step(
		// 	"When loading is set to true, the onClick should not be called",
		// 	async () => {
		// 		set(args, "loading", true);
		// 		await userEvent.click(btn);

		// 		expect(args.onClick).toHaveBeenCalledTimes(0);
		// 		set(args, "loading", false);
		// 		clearAllMocks();
		// 	}
		// );
	},
};

export const Autofocus: Story & { args: { content: string } } = {
	argTypes: {
		content: {
			control: { type: "text" },
		},
	},
	args: {
		content: "Button",
		type: "primary",
		autofocus: true,
	},
	render: (args: any) => ({
		components: { ScButton },
		setup() {
			return { args };
		},
		template: container(
			`
			<p>请点击浏览器的刷新页面来获取按钮聚焦</p>
			<sc-button data-testid="story-test-btn" v-bind="args">{{args.content}}</sc-button>
			`
		),
	}),
	play: async ({ args }: any) => {
		await userEvent.keyboard("{enter}");
		expect(args.onClick).toHaveBeenCalledOnce();
		clearAllMocks();
	},
};

export const Circle: Story = {
	args: {
		icon: "search",
		autofocus: false,
	},
	render: (args: any) => ({
		components: { ScButton },
		setup() {
			return { args };
		},
		template: container(`
		<sc-button circle v-bind="args"/>
		<sc-button circle type="success" v-bind="args"/>
	  `),
	}),
	// play: async ({ canvasElement, args, step }: any) => {
	// 	const canvas = within(canvasElement);
	// 	await step("click button", async () => {
	// 		await userEvent.click(canvas.getByRole("button"));

	// 		expect(args.onClick).toHaveBeenCalled();
	// 		clearAllMocks();
	// 	});
	// },
};

export default meta;
