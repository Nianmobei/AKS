import { D as createVNode, Ht as watch, On as unref, Yt as withDirectives, Zn as normalizeClass, _ as createBaseVNode, _n as readonly, b as createElementBlock, bt as renderList, ct as onMounted, er as normalizeStyle, ft as onUnmounted, g as computed, k as defineComponent, mt as openBlock, o as Fragment, qt as withCtx, vn as ref, xn as shallowRef, y as createCommentVNode } from "./runtime-core.esm-bundler-CrTl24Iq.js";
import { S as vShow, t as Transition } from "./runtime-dom.esm-bundler-CRYhMKDx.js";
import { d as useBroadcastChannel, ot as refDebounced } from "./dist-CJxb4dxV.js";
import { i as useElectronEventaContext, l as useElectronMouseInWindow, s as useElectronMouseAroundWindowBorder } from "./dist-BuG2rU6Y.js";
import "./components-HQO86TYU.js";
import { a as PoppinText_web_default } from "./chat-CpWVX12-.js";
import { t as defineInvoke } from "./invoke-BPvOIpeR-D17wxOJ7.js";
import { t as createTimeline } from "./timeline-BLltM-dY.js";
import { n as captionIsFollowingWindowChanged, t as captionGetIsFollowingWindow } from "./eventa-C2qinp0T.js";
import { t as route_block_default } from "./route-block-DUJC7M2T.js";
//#region ../../packages/stage-ui/src/components/widgets/poppin-text/animators/fade.ts
function createFadeAnimator(options) {
	return (elements) => {
		if (elements.length === 0) return () => {};
		const timeline = createTimeline({ loop: options.loop }).set(elements, { opacity: 0 }).add(elements, {
			opacity: [0, 1],
			...options,
			delay: (_, i = 0) => options.duration / elements.length * (i + 1)
		});
		return () => {
			timeline.remove(elements);
		};
	};
}
//#endregion
//#region src/renderer/composables/useCaptionItems.ts
var defaultCaptionItemsOptions = { ttlMs: 5e3 };
/**
* Manages caption overlay items with per-event expiry.
*
* Use when:
* - Broadcast caption updates should age out independently.
* - Empty caption events should clear only the matching caption source.
*
* Expects:
* - Callers pass plain caption broadcast events.
* - Callers call `dispose()` when the owner outlives Vue component cleanup.
*
* Returns:
* - Readonly caption items plus actions for adding events and clearing timers.
*/
function useCaptionItems(options = {}) {
	const { ttlMs } = {
		...defaultCaptionItemsOptions,
		...options
	};
	const items = shallowRef([]);
	const expiryTimers = /* @__PURE__ */ new Map();
	let nextId = 1;
	function clearTimer(id) {
		const timer = expiryTimers.get(id);
		if (!timer) return;
		clearTimeout(timer);
		expiryTimers.delete(id);
	}
	function remove(id) {
		clearTimer(id);
		items.value = items.value.filter((item) => item.id !== id);
	}
	function clearType(type) {
		const matchedItems = items.value.filter((item) => item.type === type);
		for (const item of matchedItems) clearTimer(item.id);
		items.value = items.value.filter((item) => item.type !== type);
	}
	function scheduleExpiry(item) {
		expiryTimers.set(item.id, setTimeout(() => {
			remove(item.id);
		}, ttlMs));
	}
	function replace(event) {
		const matchedItems = items.value.filter((item) => item.type === event.type);
		const currentItem = matchedItems.at(-1);
		if (!currentItem) {
			const item = {
				id: nextId++,
				type: event.type,
				text: event.text
			};
			items.value = [...items.value, item];
			scheduleExpiry(item);
			return;
		}
		for (const item of matchedItems) clearTimer(item.id);
		const replacement = {
			...currentItem,
			text: event.text
		};
		items.value = items.value.filter((item) => item.type !== event.type || item.id === currentItem.id).map((item) => item.id === currentItem.id ? replacement : item);
		scheduleExpiry(replacement);
	}
	function add(event) {
		if (!event.text.trim()) {
			clearType(event.type);
			return;
		}
		if (event.operation === "replace") {
			replace(event);
			return;
		}
		const item = {
			id: nextId++,
			type: event.type,
			text: event.text
		};
		items.value = [...items.value, item];
		scheduleExpiry(item);
	}
	function dispose() {
		for (const timer of expiryTimers.values()) clearTimeout(timer);
		expiryTimers.clear();
		items.value = [];
	}
	return {
		items: readonly(items),
		add,
		clearType,
		dispose
	};
}
//#endregion
//#region src/renderer/pages/caption.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "pointer-events-none relative h-full w-full flex items-end justify-center" };
var _hoisted_2 = {
	class: "[-webkit-app-region:drag] absolute left-1/2 h-[14px] w-[36px] border border-[rgba(125,125,125,0.35)] rounded-[10px] bg-[rgba(125,125,125,0.28)] backdrop-blur-[6px] -top-2 -translate-x-1/2",
	title: "Drag to move"
};
var _hoisted_3 = { class: "max-w-[80vw] flex flex-col gap-1" };
var _hoisted_4 = {
	key: 0,
	class: "pointer-events-none absolute left-0 top-0 z-999 h-full w-full"
};
/** Keep stale captions from lingering after the last broadcast update. */
var CAPTION_TEXT_EXPIRY_MS = 1e4;
var caption_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "caption",
	setup(__props) {
		const attached = ref(true);
		const { isOutside: isOutsideWindow } = useElectronMouseInWindow();
		const isOutsideWindowFor250Ms = refDebounced(isOutsideWindow, 250);
		const shouldFadeOnCursorWithin = computed(() => !isOutsideWindowFor250Ms.value);
		const { isNearAnyBorder: isAroundWindowBorder } = useElectronMouseAroundWindowBorder({ threshold: 30 });
		const isAroundWindowBorderFor250Ms = refDebounced(isAroundWindowBorder, 250);
		const { data } = useBroadcastChannel({ name: "airi-caption-overlay" });
		const { items: captionItems, add: addCaptionItem, dispose: disposeCaptionItems } = useCaptionItems({ ttlMs: CAPTION_TEXT_EXPIRY_MS });
		const context = useElectronEventaContext();
		const getAttached = defineInvoke(context.value, captionGetIsFollowingWindow);
		const captionAnimatorByType = {
			"caption-speaker": createFadeAnimator({ duration: 180 }),
			"caption-assistant": createFadeAnimator({ duration: 180 })
		};
		const captionTypes = ["caption-speaker", "caption-assistant"];
		function toCaptionTextSegments(type) {
			return captionItems.value.filter((item) => item.type === type).map((item, index) => ({
				key: item.id,
				text: index === 0 ? item.text : ` ${item.text}`
			}));
		}
		const captionTextByType = computed(() => ({
			"caption-speaker": toCaptionTextSegments("caption-speaker"),
			"caption-assistant": toCaptionTextSegments("caption-assistant")
		}));
		onMounted(async () => {
			try {
				const isAttached = await getAttached();
				attached.value = Boolean(isAttached);
			} catch {}
			try {
				context.value.on(captionIsFollowingWindowChanged, (event) => {
					attached.value = Boolean(event?.body);
				});
			} catch {}
			try {
				watch(data, (event) => {
					if (!event) return;
					if (event.type === "caption-speaker") addCaptionItem(event);
					else if (event.type === "caption-assistant") addCaptionItem(event);
				}, { immediate: true });
			} catch {}
		});
		onUnmounted(() => {
			disposeCaptionItems();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", { class: normalizeClass([
				shouldFadeOnCursorWithin.value ? "op-0" : "op-100",
				"pointer-events-auto relative select-none rounded-xl px-3 py-2",
				"transition-opacity duration-250 ease-in-out"
			]) }, [withDirectives(createBaseVNode("div", _hoisted_2, [..._cache[0] || (_cache[0] = [createBaseVNode("div", { class: "absolute left-1/2 top-1/2 h-[3px] w-4 rounded-full bg-[rgba(255,255,255,0.85)] -translate-x-1/2 -translate-y-1/2" }, null, -1)])], 512), [[vShow, !attached.value]]), createBaseVNode("div", _hoisted_3, [(openBlock(), createElementBlock(Fragment, null, renderList(captionTypes, (type) => {
				return withDirectives(createBaseVNode("div", {
					key: type,
					class: normalizeClass([type === "caption-speaker" ? "rounded-md px-2 py-1 text-[1.1rem] text-neutral-50 font-medium text-shadow-lg text-shadow-color-neutral-900/60" : "", type === "caption-assistant" ? "rounded-md px-2 py-1 text-[1.35rem] text-primary-50 font-semibold text-stroke-4 text-stroke-primary-300/50 text-shadow-lg text-shadow-color-primary-700/50" : ""]),
					style: normalizeStyle(type === "caption-assistant" ? { paintOrder: "stroke fill" } : void 0)
				}, [createVNode(unref(PoppinText_web_default), {
					text: captionTextByType.value[type],
					animator: captionAnimatorByType[type],
					"text-class": type === "caption-assistant" ? "color-neutral-50! align-middle" : type === "caption-speaker" ? "color-neutral-50! align-middle" : ""
				}, null, 8, [
					"text",
					"animator",
					"text-class"
				])], 6), [[vShow, captionTextByType.value[type].length > 0]]);
			}), 64))])], 2), createVNode(Transition, {
				"enter-active-class": "transition-opacity duration-250 ease-in-out",
				"enter-from-class": "opacity-50",
				"enter-to-class": "opacity-100",
				"leave-active-class": "transition-opacity duration-250 ease-in-out",
				"leave-from-class": "opacity-100",
				"leave-to-class": "opacity-50"
			}, {
				default: withCtx(() => [unref(isAroundWindowBorderFor250Ms) ? (openBlock(), createElementBlock("div", _hoisted_4, [..._cache[1] || (_cache[1] = [createBaseVNode("div", { class: normalizeClass(["b-primary/50", "h-full w-full animate-flash animate-duration-3s animate-count-infinite b-4 rounded-2xl"]) }, null, -1)])])) : createCommentVNode("", true)]),
				_: 1
			})]);
		};
	}
});
//#endregion
//#region src/renderer/pages/caption.vue
if (typeof route_block_default === "function") route_block_default(caption_vue_vue_type_script_setup_true_lang_default);
var caption_default = caption_vue_vue_type_script_setup_true_lang_default;
//#endregion
export { caption_default as default };
