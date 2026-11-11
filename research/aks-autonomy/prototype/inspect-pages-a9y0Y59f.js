import { $ as mergeModels, $n as normalizeProps, Ct as resolveDirective, D as createVNode, E as createTextVNode, En as toValue, Ft as useModel, Ht as watch, J as inject, On as unref, Pt as useId, Rt as useTemplateRef, Yt as withDirectives, Zn as normalizeClass, _ as createBaseVNode, b as createElementBlock, ct as onMounted, er as normalizeStyle, ft as onUnmounted, g as computed, gn as reactive, gt as provide, it as onBeforeUnmount, k as defineComponent, mt as openBlock, o as Fragment, pn as onScopeDispose, qt as withCtx, tr as toDisplayString, tt as nextTick, v as createBlock, vn as ref, wn as toRef, xn as shallowRef, xt as renderSlot, y as createCommentVNode } from "./runtime-core.esm-bundler-CrTl24Iq.js";
import { S as vShow, t as Transition, w as withModifiers } from "./runtime-dom.esm-bundler-CRYhMKDx.js";
import { A as icon_button_default, M as button_default, P as transition_vertical_default, j as scrollable_area_default, k as container_error_default, t as useTheme, w as overlay_button_default } from "./src-DOCafuS8.js";
import { B as usePreferredReducedMotion, F as useMousePressed, H as useResizeObserver, L as useNow, P as useMouseInElement, S as useEventListener, V as useRafFn, b as useElementSize, d as useBroadcastChannel, f as useClipboard, gt as useIntervalFn, lt as toRef$2, ot as refDebounced, pt as until, s as unrefElement, w as useFocusWithin, xt as watchDebounced, y as useElementBounding, yt as useTimeoutFn } from "./dist-CJxb4dxV.js";
import { a as storeToRefs } from "./pinia-xbQFaHIh.js";
import { r as defineInvokeHandler } from "./invoke-BPvOIpeR-Bo0pbN4E.js";
import { a as useElectronEventaInvoke, c as useElectronMouseInElement, d as useElectronWindowBounds, i as useElectronEventaContext, l as useElectronMouseInWindow, n as useElectronAllDisplays, s as useElectronMouseAroundWindowBorder, t as getElectronEventaContext, u as useElectronRelativeMouse } from "./dist-BuG2rU6Y.js";
import { n as errorMessageFrom } from "./error-D_H7hfJf.js";
import { J as useSettingsStageModel, Mt as useFeatureFlagsStore, N as useModsServerChannelStore, Rt as FULLSCREEN_WORKSPACE_FLAG, U as syncedRoles, V as useSpeechStore, W as usePiniaSynced, Wt as useAuthStore, a as useSpeakingStore, b as useAiriCardStore, d as useAnalytics, fn as AudioOutput, i as useAudioContext, rt as useChatSessionStore } from "./hearing-CWm8WPGq.js";
import { u as createQueue } from "./dist-BQodSB-a.js";
import { n as useAudioAnalyzer } from "./audio-D2k2fzBf.js";
import { h as useModelAssetStatus, r as ensureSherpawModelAssets } from "./model-assets-BENAqf5h.js";
import { F as hearing_config_dialog_default, N as bug_report_dialog_default, d as inbox_panel_default, f as holo_coupon_default, i as status_capsule_default, n as model_asset_progress_default, ot as badge_default, q as profile_switcher_popover_default, r as hearing_status_default, u as useInboxStore } from "./components-HQO86TYU.js";
import { t as clamp } from "./clamp-BuKqeYTJ.js";
import { m as useSettingsLive2d } from "./live2d-B798hPih.js";
import { n as presenceBubbleIdle, r as presenceBubbleThinking } from "./src-Dhh-cP7W.js";
import { n as Live2D_default } from "./src-Ctd1uzVi.js";
import { n as useI18n } from "./vue-i18n.runtime-DaR85lS8.js";
import { n as toast } from "./lib-CUzZGw5b.js";
import { F as Playback, z as normalizeActPayload } from "./dist-chQ79IX3.js";
import { a as EMOTION_EmotionMotionName_value, c as EmotionThinkMotionName, o as EMOTION_VRMExpressionName_value, s as Emotion } from "./composables-DEMMl2P2.js";
import { h as useRouter } from "./useApi-CROJJdhE-CQmaIBPL.js";
import { t as avatar_default } from "./avatar-B0BODsu4.js";
import { s as callout_default } from "./widgets-CfafLQS5.js";
import { a as TooltipProvider_default, i as TooltipRoot_default, n as TooltipPortal_default, r as TooltipContent_default, t as TooltipTrigger_default } from "./TooltipTrigger-Ncsd-A18.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { t as defineInvoke } from "./invoke-BPvOIpeR-D17wxOJ7.js";
import { i as tachie_default, t as useSettings } from "./settings-D3trC4Ho.js";
import { t as useSettingsAudioDevice } from "./audio-device-D4X5b4MN.js";
import { n as useChatStore } from "./chat-DqklHny2.js";
import { n as speechOutputGetPlaybackState, r as speechOutputPlaybackStateChangedEvent, t as getSpeechBusContext } from "./bus-DiEXMc8Z.js";
import { t as useBackgroundStore } from "./background-DXW9oQtQ.js";
import { t as useVoiceStore } from "./voice-B_7l2OTr.js";
import { t as useLlmStreamingControlStore } from "./streaming-control-COyPbjji.js";
import { t as useOnboardingStore } from "./onboarding-CdnA0hg9.js";
import { Fn as electron, L as electronFullscreenSetMode, Mt as electronStartDraggingWindow, N as electronFullscreenExit, Pt as electronWindowSetAlwaysOnTop, Qt as noticeWindowEventa, _t as electronOpenInlay, bt as electronOpenSettings, d as electronAuthCallback, f as electronAuthCallbackError, g as electronAuthStartLogin, it as electronMainWindowSetFullscreenBounds, l as electronAppQuit, mt as electronOpenChat, nt as electronMainWindowEnterFullscreen, rt as electronMainWindowGetFullscreenState, s as electronAppIsWayland, tt as electronMainPageMounted, v as electronCenterMainWindow, y as electronChatButtonStateChanged, yt as electronOpenOnboarding, z as electronGetChatButtonState } from "./eventa-C2qinp0T.js";
import { t as useAuthStatusStore } from "./auth-status-3XMnVfal.js";
import { n as useModelStore, t as ThreeScene_default } from "./src-2NzbpumZ.js";
import { a as fullscreenSurfaceOf, i as fullscreenHostPages, t as useFullscreenStore } from "./fullscreen-DhaSC0qM.js";
import { t as useStageWindowLifecycleStore } from "./stage-window-lifecycle-B_ICNY4g.js";
import { t as useToolSelectionStore } from "./tools-Bn1Ojtlm.js";
import { n as useSpeechOutputControlStore, t as useStopSpeakingButton } from "./useStopSpeakingButton-D0AUkuF9.js";
import { t as route_block_default } from "./route-block-DUJC7M2T.js";
import { t as window_resize_border_default } from "./window-resize-border-DVjFLXEH.js";
import { t as useControlsIslandStore } from "./controls-island-BnDpShLw.js";
import { i as usePushToTalkShortcut, s as useVoiceListening } from "./use-push-to-talk-shortcut-bZLhSKxV.js";
import { a as uniformAmbientLightEnvironment, f as wholeWindowRectangle, i as smoothAmbientLightEnvironment, n as ambientLightSampleFromHex, r as sampleScreenAmbientLight } from "./screen-ambient-light-C2GsrL--.js";
import { n as useSettingsScreenAmbientLight, t as useScreenAmbientLightEnvironment } from "./screen-ambient-light-DMTi2D9-.js";
import { r as screenAmbientLightDiagnosticsWatchMs, t as screenAmbientLightDiagnosticsChannelName } from "./screen-ambient-light-diagnostics-DOO4VXDZ.js";
import { n as defaultLive2DMotionControlDynamics, o as useLive2DMotionControl, p as useLive2dParams } from "./stores-B0SW3Jr5.js";
import { r as live2dMotionMagicProfiles, t as useLive2DMotionMagicSettings } from "./settings-oQj2Jhto.js";
import { t as useLive2DMotionMagic } from "./live2d-rkhzXvhO.js";
import { t as profile_default } from "./profile-BwyH1Ow5.js";
import { t as createLive2DLipSync } from "./src-DRqRA35t.js";
import { n as animations } from "./vrm-preview-BWYQR6yD.js";
import { t as useSettingsPresenceBubble } from "./presence-bubble-CC1eDB2-.js";
import { t as useElectronScreenCapture } from "./vue-D3vKuHZ-.js";
import { i as resolveComponentStateToRuntimePhase, r as createEmptyModelSettingsRuntimeSnapshot } from "./runtime-D5YGYWeg.js";
import { i as createLive2D } from "./live2d-wTo9g-Rg.js";
import { r as MMD_default, t as Spine_default } from "./src-Cxp0il0E.js";
import { n as useSharedLive2DExpressionPreview } from "./live2d-BCoO3JJu.js";
import { i as fullscreen_backdrop_default, n as fullscreen_overlay_default, r as provideFullscreenLayout, t as useFullscreenHost } from "./use-fullscreen-host-WQVobWeB.js";
import { i as modelSettingsRuntimeSnapshotRequested, n as modelSettingsRuntimeOwnerGone, r as modelSettingsRuntimeSnapshotChanged, t as getModelSettingsRuntimeContext } from "./model-settings-runtime-DmzvKEqq.js";
//#region ../../node_modules/.pnpm/@moeru+std@0.1.0-beta.17/node_modules/@moeru/std/dist/sleep/index.js
var sleep = async (delay) => new Promise((resolve) => setTimeout(resolve, delay));
//#endregion
//#region ../../packages/audio/dist/browser/playback.mjs
/**
* Plays owned nodes in a borrowed context. The context clock is the playback clock.
* Fade completion follows source ended events on that clock.
*/
var BrowserPlayback = class {
	context;
	options;
	constructor(context, options) {
		this.context = context;
		this.options = options;
	}
	nowMs() {
		return this.context.currentTime * 1e3;
	}
	play(clip) {
		return new AudioOutput(this.context, clip.audio, this.options?.destination ?? this.context.destination, {
			startAtMs: clip.startAtMs,
			onStart: clip.onStart,
			onSource: this.options?.onSource
		});
	}
};
//#endregion
//#region ../../packages/stage-ui/src/composables/canvas-alpha.ts
function isCanvasRegionTransparent({ gl, clientX, clientY, left, top, width, height, radius, threshold }) {
	if (!width || !height) return true;
	if (gl.drawingBufferWidth <= 0 || gl.drawingBufferHeight <= 0) return true;
	const xIn = clientX - left;
	const yIn = clientY - top;
	if (!(xIn >= 0 && yIn >= 0 && xIn < width && yIn < height)) return true;
	const scaleX = gl.drawingBufferWidth / width;
	const scaleY = gl.drawingBufferHeight / height;
	if (!Number.isFinite(scaleX) || !Number.isFinite(scaleY)) return true;
	const centerX = Math.floor(xIn * scaleX);
	const centerY = Math.floor(gl.drawingBufferHeight - 1 - yIn * scaleY);
	const radiusX = Math.ceil(radius * scaleX);
	const radiusY = Math.ceil(radius * scaleY);
	const startX = clamp(centerX - radiusX, 0, gl.drawingBufferWidth - 1);
	const endX = clamp(centerX + radiusX, 0, gl.drawingBufferWidth - 1);
	const startY = clamp(centerY - radiusY, 0, gl.drawingBufferHeight - 1);
	const endY = clamp(centerY + radiusY, 0, gl.drawingBufferHeight - 1);
	const readWidth = endX - startX + 1;
	const readHeight = endY - startY + 1;
	const data = new Uint8Array(readWidth * readHeight * 4);
	try {
		gl.readPixels(startX, startY, readWidth, readHeight, gl.RGBA, gl.UNSIGNED_BYTE, data);
	} catch {
		return true;
	}
	const radiusSq = radius * radius;
	for (let y = 0; y < readHeight; y += 1) {
		const dy = (startY + y - centerY) / scaleY;
		const dySq = dy * dy;
		for (let x = 0; x < readWidth; x += 1) {
			const dx = (startX + x - centerX) / scaleX;
			if (dx * dx + dySq > radiusSq) continue;
			if (data[(y * readWidth + x) * 4 + 3] >= threshold) return false;
		}
	}
	return true;
}
function useCanvasPixelAtPoint(canvas, pointX, pointY) {
	const canvasRef = toRef$2(canvas);
	const { left, top, width, height } = useElementBounding(canvasRef);
	const xRef = toRef$2(pointX);
	const yRef = toRef$2(pointY);
	const inCanvas = computed(() => {
		if (canvasRef.value == null) return false;
		const xIn = xRef.value - left.value;
		const yIn = yRef.value - top.value;
		return xIn >= 0 && yIn >= 0 && xIn < width.value && yIn < height.value;
	});
	return {
		inCanvas,
		pixel: computed(() => {
			const el = unrefElement(canvasRef);
			if (!el || !inCanvas.value) return new Uint8Array([
				0,
				0,
				0,
				0
			]);
			const gl = el.getContext("webgl2") || el.getContext("webgl");
			if (!gl) return new Uint8Array([
				0,
				0,
				0,
				0
			]);
			const xIn = xRef.value - left.value;
			const yIn = yRef.value - top.value;
			const scaleX = gl.drawingBufferWidth / width.value;
			const scaleY = gl.drawingBufferHeight / height.value;
			const pixelX = Math.floor(xIn * scaleX);
			const pixelY = Math.floor(gl.drawingBufferHeight - 1 - yIn * scaleY);
			const data = /* @__PURE__ */ new Uint8Array(4);
			try {
				gl.readPixels(pixelX, pixelY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
			} catch {
				return new Uint8Array([
					0,
					0,
					0,
					0
				]);
			}
			return data;
		})
	};
}
function useCanvasPixelIsTransparent(pixel, threshold = 10) {
	return computed(() => pixel.value[3] < threshold);
}
function useCanvasPixelIsTransparentAtPoint(canvas, pointX, pointY, optionsOrThreshold = 10) {
	const options = typeof optionsOrThreshold === "number" ? {
		threshold: optionsOrThreshold,
		regionRadius: 0
	} : optionsOrThreshold;
	const threshold = options?.threshold ?? 10;
	const radius = Math.max(0, options?.regionRadius ?? 0);
	if (radius === 0) {
		const { pixel } = useCanvasPixelAtPoint(canvas, pointX, pointY);
		return useCanvasPixelIsTransparent(pixel, threshold);
	}
	const canvasRef = toRef$2(canvas);
	const xRef = toRef$2(pointX);
	const yRef = toRef$2(pointY);
	const { left, top, width, height } = useElementBounding(canvasRef);
	return computed(() => {
		const el = unrefElement(canvasRef);
		if (!el) return true;
		const gl = el.getContext("webgl2") || el.getContext("webgl");
		if (!gl) return true;
		return isCanvasRegionTransparent({
			gl,
			clientX: xRef.value,
			clientY: yRef.value,
			left: left.value,
			top: top.value,
			width: width.value,
			height: height.value,
			radius,
			threshold
		});
	});
}
//#endregion
//#region ../../packages/stage-ui-three/src/composables/hit-test.ts
function useThreeSceneIsTransparentAtPoint(scene, pointX, pointY, optionsOrThreshold = 10) {
	const sceneRef = toRef$2(scene);
	const xRef = toRef$2(pointX);
	const yRef = toRef$2(pointY);
	const options = typeof optionsOrThreshold === "number" ? {
		threshold: optionsOrThreshold,
		regionRadius: 0
	} : optionsOrThreshold;
	const threshold = options?.threshold ?? 10;
	const radius = Math.max(0, options?.regionRadius ?? 0);
	return computed(() => {
		const instance = sceneRef.value;
		if (!instance || !instance.readRenderTargetRegionAtClientPoint) return true;
		const result = instance.readRenderTargetRegionAtClientPoint(xRef.value, yRef.value, radius);
		if (!result) return true;
		const { data, readWidth, readHeight, startX, startY, centerX, centerY, scaleX, scaleY } = result;
		const radiusSq = radius * radius;
		for (let y = 0; y < readHeight; y += 1) {
			const dy = (startY + y - centerY) / scaleY;
			const dySq = dy * dy;
			for (let x = 0; x < readWidth; x += 1) {
				const dx = (startX + x - centerX) / scaleX;
				if (dx * dx + dySq > radiusSq) continue;
				if (data[(y * readWidth + x) * 4 + 3] >= threshold) return false;
			}
		}
		return true;
	});
}
//#endregion
//#region ../../packages/stage-ui/src/components/scenes/stage-avatar-model-missing.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$8 = { class: /*@__PURE__*/ normalizeClass(["pointer-events-none absolute inset-0 z-20 p-6", "flex items-center justify-center"]) };
var _hoisted_2$8 = {
	"data-testid": "stage-avatar-model-missing",
	class: /*@__PURE__*/ normalizeClass([
		"pointer-events-auto max-w-xs",
		"flex flex-col items-center gap-3 px-5 py-4",
		"rounded-2xl text-center backdrop-blur-md",
		"bg-neutral-50/80 text-neutral-900 dark:bg-neutral-900/70 dark:text-neutral-50"
	])
};
var _hoisted_3$8 = { class: /*@__PURE__*/ normalizeClass(["text-sm font-medium"]) };
var _hoisted_4$6 = { class: /*@__PURE__*/ normalizeClass(["text-xs opacity-70"]) };
var _hoisted_5$4 = { class: /*@__PURE__*/ normalizeClass(["flex"]) };
//#endregion
//#region ../../packages/stage-ui/src/components/scenes/stage-avatar-model-missing.vue
var stage_avatar_model_missing_default = /* @__PURE__ */ defineComponent({
	__name: "stage-avatar-model-missing",
	props: {
		reason: {},
		name: {}
	},
	emits: ["select"],
	setup(__props) {
		const { t } = useI18n();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$8, [createBaseVNode("div", _hoisted_2$8, [
				createBaseVNode("div", _hoisted_3$8, toDisplayString(__props.reason === "missing" ? unref(t)("stage.avatar-model-missing.title") : unref(t)("stage.avatar-model-missing.unavailable-title")), 1),
				createBaseVNode("div", _hoisted_4$6, toDisplayString(unref(t)("stage.avatar-model-missing.description", { name: __props.name })), 1),
				createBaseVNode("div", _hoisted_5$4, [createVNode(unref(overlay_button_default), {
					icon: "i-solar:user-rounded-linear",
					label: unref(t)("stage.avatar-model-missing.select"),
					onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("select"))
				}, null, 8, ["label"])])
			])]);
		};
	}
});
//#endregion
//#region ../../packages/stage-ui/src/components/scenes/stage-render-error.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$7 = { class: /*@__PURE__*/ normalizeClass([
	"absolute inset-0 z-20 p-6",
	"flex items-center justify-center",
	"bg-white/45 dark:bg-black/45 backdrop-blur-sm"
]) };
var _hoisted_2$7 = { class: /*@__PURE__*/ normalizeClass(["max-w-xl w-full", "flex flex-col gap-3"]) };
var _hoisted_3$7 = { class: /*@__PURE__*/ normalizeClass(["flex flex-col gap-1 px-1"]) };
var _hoisted_4$5 = { class: /*@__PURE__*/ normalizeClass(["text-lg font-semibold text-neutral-900 dark:text-neutral-100"]) };
var _hoisted_5$3 = { class: /*@__PURE__*/ normalizeClass(["text-sm text-neutral-600 dark:text-neutral-300"]) };
//#endregion
//#region ../../packages/stage-ui/src/components/scenes/stage-render-error.vue
var stage_render_error_default = /* @__PURE__ */ defineComponent({
	__name: "stage-render-error",
	props: {
		error: {},
		renderer: {},
		modelId: {}
	},
	emits: ["retry"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = useI18n();
		const { copy, isSupported: isClipboardSupported } = useClipboard({ legacy: true });
		const showBugReportDialog = shallowRef(false);
		const bugReportDescription = shallowRef("");
		const bugReportSending = shallowRef(false);
		const bugReportSubmitError = shallowRef();
		function openBugReportDialog() {
			bugReportDescription.value = t("stage.render-error.report-description", {
				renderer: props.renderer,
				modelId: props.modelId ?? "unknown",
				error: errorMessageFrom(props.error) ?? props.error.message
			});
			bugReportSubmitError.value = void 0;
			showBugReportDialog.value = true;
		}
		async function submitBugReport(payload) {
			bugReportSending.value = true;
			bugReportSubmitError.value = void 0;
			try {
				if (!isClipboardSupported.value) throw new Error("Clipboard API is unavailable");
				await copy(payload.formattedReport);
				showBugReportDialog.value = false;
			} catch (error) {
				bugReportSubmitError.value = error;
			} finally {
				bugReportSending.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$7, [createBaseVNode("div", _hoisted_2$7, [
				createBaseVNode("div", _hoisted_3$7, [createBaseVNode("h2", _hoisted_4$5, toDisplayString(unref(t)("stage.render-error.title", { renderer: __props.renderer })), 1), createBaseVNode("p", _hoisted_5$3, toDisplayString(unref(t)("stage.render-error.description")), 1)]),
				createVNode(unref(container_error_default), {
					error: __props.error,
					"feedback-button-label": unref(t)("settings.dialogs.bug-report.trigger-label"),
					"height-preset": "lg",
					onFeedback: openBugReportDialog
				}, null, 8, ["error", "feedback-button-label"]),
				createVNode(unref(button_default), {
					color: "red",
					variant: "secondary",
					onClick: _cache[0] || (_cache[0] = ($event) => emit("retry"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("stage.chat.actions.retry")), 1)]),
					_: 1
				})
			]), createVNode(bug_report_dialog_default, {
				modelValue: showBugReportDialog.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => showBugReportDialog.value = $event),
				description: bugReportDescription.value,
				"onUpdate:description": _cache[2] || (_cache[2] = ($event) => bugReportDescription.value = $event),
				sending: bugReportSending.value,
				"submit-error": bugReportSubmitError.value,
				onSubmit: submitBugReport
			}, null, 8, [
				"modelValue",
				"description",
				"sending",
				"submit-error"
			])]);
		};
	}
});
//#endregion
//#region ../../packages/stage-ui/src/components/scenes/Stage.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = {
	relative: "",
	"h-full": "",
	"w-full": ""
};
var _hoisted_2$6 = {
	relative: "",
	"h-full": "",
	"w-full": ""
};
var _hoisted_3$6 = {
	key: 5,
	class: /*@__PURE__*/ normalizeClass([
		"h-full w-full",
		"flex items-center justify-center",
		"px-4 py-6"
	])
};
var _hoisted_4$4 = { class: /*@__PURE__*/ normalizeClass([
	"w-96 max-w-full",
	"min-h-32",
	"flex items-center justify-center"
]) };
var VRM_INTERACTION_COOLDOWN_MS = 450;
//#endregion
//#region ../../packages/stage-ui/src/components/scenes/Stage.vue
var Stage_default = /* @__PURE__ */ defineComponent({
	__name: "Stage",
	props: /*@__PURE__*/ mergeModels({
		cursorPosition: {},
		enableOrbitControls: {
			type: Boolean,
			default: true
		},
		paused: {
			type: Boolean,
			default: false
		}
	}, {
		"state": { default: "pending" },
		"stateModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"error",
		"reset",
		"selectAvatarModel"
	], ["update:state"]),
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const componentState = useModel(__props, "state");
		const vrmViewerRef = ref();
		const live2dSceneRef = ref();
		const spineSceneRef = ref();
		const tachieSceneRef = ref();
		const mmdSceneRef = ref();
		const settingsStore = useSettings();
		const { stageModelRenderer, stageViewControlsEnabled, stageModelSelectedUrl, stageModelSelected, themeColorsHue, themeColorsHueDynamic } = storeToRefs(settingsStore);
		const { live2dMotionDriver, live2dShadowEnabled, live2dMaxFps, live2dRenderScale } = storeToRefs(useSettingsLive2d());
		const live2dMotionControl = useLive2DMotionControl();
		const { exclusiveOwnerId: live2dMotionControlOwnerId } = storeToRefs(live2dMotionControl);
		const { forceViewTarget: live2dMagicForceViewTarget, profileId: live2dMagicProfileId, skipMouthOpen: live2dMagicSkipMouthOpen } = storeToRefs(useLive2DMotionMagicSettings());
		const live2dMagicMotion = useLive2DMotionMagic({
			dataset: () => live2dMotionMagicProfiles[live2dMagicProfileId.value].dataset,
			forceViewTarget: live2dMagicForceViewTarget,
			skipMouthOpen: live2dMagicSkipMouthOpen,
			disabled: () => live2dMotionControlOwnerId.value !== null,
			publishPose: (pose) => live2dMotionControl.setPose("stage:live2d-motion-magic", pose, defaultLive2DMotionControlDynamics),
			releasePose: () => live2dMotionControl.release("stage:live2d-motion-magic")
		});
		let live2dMagicActivationRequest = 0;
		watch([
			stageModelRenderer,
			live2dMotionDriver,
			live2dMagicProfileId,
			() => props.paused,
			live2dMotionControlOwnerId
		], async ([renderer, driver, , paused, controlOwnerId]) => {
			const request = ++live2dMagicActivationRequest;
			if (renderer !== "live2d" || driver !== "magic" || paused || controlOwnerId !== null) {
				live2dMagicMotion.stop();
				return;
			}
			if (live2dMagicMotion.status.value === "idle") await live2dMagicMotion.initialize();
			if (request !== live2dMagicActivationRequest || stageModelRenderer.value !== "live2d" || live2dMotionDriver.value !== "magic" || props.paused || live2dMotionControlOwnerId.value !== null) return;
			live2dMagicMotion.start();
		}, { immediate: true });
		const { spinePremultipliedAlpha, spineDefaultMixDuration, spineIdleAnimationEnabled, spineMaxFps, spineRenderScale } = storeToRefs(settingsStore);
		const { mouthOpenSize, nowSpeaking } = storeToRefs(useSpeakingStore());
		/** `voicing` of `SpeechOutputPlaybackState` in the speech bus. The voice output below keeps it. */
		const speechVoicing = shallowRef(false);
		const disposePlaybackStateHandler = defineInvokeHandler(getSpeechBusContext(), speechOutputGetPlaybackState, () => ({
			speaking: nowSpeaking.value,
			voicing: speechVoicing.value
		}));
		watch([nowSpeaking, speechVoicing], ([speaking, voicing]) => {
			getSpeechBusContext().emit(speechOutputPlaybackStateChangedEvent, {
				speaking,
				voicing
			});
		}, { immediate: true });
		const { audioContext } = useAudioContext();
		const currentAudioSource = ref();
		const speechOutputControlStore = useSpeechOutputControlStore();
		const { speechMuted, speechVolume } = storeToRefs(speechOutputControlStore);
		const lastVrmInteractionAt = /* @__PURE__ */ new Map();
		function getVrmInteractionExpression(target) {
			if (target === "head") return "happy";
			if (target === "leftFoot" || target === "rightFoot") return "relaxed";
			return "surprised";
		}
		function onVRMInteract(target) {
			const now = Date.now();
			if (now - (lastVrmInteractionAt.get(target) ?? 0) < VRM_INTERACTION_COOLDOWN_MS) return;
			lastVrmInteractionAt.set(target, now);
			vrmViewerRef.value?.setExpression(getVrmInteractionExpression(target), 1);
		}
		const { onBeforeMessageComposed, onBeforeSend, onTokenLiteral, onTokenSpecial, onStreamEnd, onAssistantResponseEnd } = useChatStore();
		const releaseSpeechPlayerRole = usePiniaSynced().addRole(syncedRoles.speechPlayer);
		const chatHookCleanups = [];
		const live2dStore = useLive2dParams();
		const showStage = ref(true);
		const stageRenderError = shallowRef();
		const viewUpdateCleanups = [];
		function handleStageRenderError(error) {
			stageRenderError.value = error;
			emit("error", error);
		}
		function reportStageRenderError(error) {
			console.error(error);
			handleStageRenderError(new Error(errorMessageFrom(error) ?? "Failed to render stage"));
		}
		function clearStageRenderError() {
			stageRenderError.value = void 0;
			emit("reset");
		}
		async function retryStageRenderer() {
			clearStageRenderError();
			showStage.value = false;
			await nextTick();
			showStage.value = true;
		}
		watch([
			stageModelRenderer,
			stageModelSelected,
			stageModelSelectedUrl
		], () => {
			clearStageRenderError();
		});
		const { post: postCaption } = useBroadcastChannel({ name: "airi-caption-overlay" });
		const assistantCaption = ref("");
		const { post: postPresent } = useBroadcastChannel({ name: "airi-chat-present" });
		viewUpdateCleanups.push(live2dStore.onShouldUpdateView(async () => {
			showStage.value = false;
			await settingsStore.updateStageModel();
			setTimeout(() => {
				showStage.value = true;
			}, 100);
		}));
		const audioAnalyser = ref();
		const lipSyncStarted = ref(false);
		const lipSyncLoopId = ref();
		const live2dLipSync = ref();
		const live2dLipSyncOptions = {
			mouthUpdateIntervalMs: 50,
			mouthLerpWindowMs: 50
		};
		function resetAssistantSpeechSurface(source) {
			nowSpeaking.value = false;
			mouthOpenSize.value = 0;
			assistantCaption.value = "";
			try {
				postCaption({
					type: "caption-assistant",
					text: ""
				});
			} catch (error) {
				console.warn(`[Stage] Failed to post caption reset for ${source} (channel may be closed)`, { error });
			}
			try {
				postPresent({ type: "assistant-reset" });
			} catch (error) {
				console.warn(`[Stage] Failed to post present reset for ${source} (channel may be closed)`, { error });
			}
		}
		const { activeCardId: selectedCharacterId, activeCard, selectedAvatarModel, ready: cardsReady } = storeToRefs(useAiriCardStore());
		const { stageModelUnavailable } = storeToRefs(useSettingsStageModel());
		const avatarModelPrompt = computed(() => {
			if (!cardsReady.value || stageModelRenderer.value !== "disabled" || stageRenderError.value) return void 0;
			if (!selectedAvatarModel.value) return "missing";
			return stageModelUnavailable.value ? "unavailable" : void 0;
		});
		const { sending: chatSending } = storeToRefs(useChatStore());
		const { presenceOverride } = storeToRefs(useSettingsPresenceBubble());
		const chatPresence = computed(() => chatSending.value ? presenceBubbleThinking : presenceBubbleIdle);
		const presenceBubble = computed(() => presenceOverride.value ?? chatPresence.value);
		const speechStore = useSpeechStore();
		const chatSession = useChatSessionStore();
		const backgroundStore = useBackgroundStore();
		const { activeBackgroundUrl } = storeToRefs(backgroundStore);
		const { currentMotion } = storeToRefs(useLive2dParams());
		const live2d = createLive2D({ controlPolicy: () => selectedAvatarModel.value?.type === "live2d" ? selectedAvatarModel.value.config.controls : void 0 });
		useSharedLive2DExpressionPreview(live2d, selectedCharacterId, () => selectedAvatarModel.value?.id);
		const emotionsQueue = createQueue({ handlers: [async (ctx) => {
			if (stageModelRenderer.value === "vrm") {
				const value = EMOTION_VRMExpressionName_value[ctx.data.name];
				if (!value) return;
				await vrmViewerRef.value.setExpression(value, ctx.data.intensity);
			} else if (stageModelRenderer.value === "live2d") currentMotion.value = { group: EMOTION_EmotionMotionName_value[ctx.data.name] };
			else if (stageModelRenderer.value === "spine") spineSceneRef.value?.setEmotion(ctx.data.name, ctx.data.intensity);
			else if (stageModelRenderer.value === "tachie") tachieSceneRef.value?.setEmotion(ctx.data.name, ctx.data.intensity);
			else if (stageModelRenderer.value === "mmd") mmdSceneRef.value?.setEmotion(ctx.data.name, ctx.data.intensity);
		}] });
		const streamingControl = useLlmStreamingControlStore();
		function toStageEmotionPayload(payload) {
			switch (payload.name) {
				case "happy": return {
					name: Emotion.Happy,
					intensity: payload.intensity
				};
				case "sad": return {
					name: Emotion.Sad,
					intensity: payload.intensity
				};
				case "angry": return {
					name: Emotion.Angry,
					intensity: payload.intensity
				};
				case "think": return {
					name: Emotion.Think,
					intensity: payload.intensity
				};
				case "surprised": return {
					name: Emotion.Surprise,
					intensity: payload.intensity
				};
				case "awkward": return {
					name: Emotion.Awkward,
					intensity: payload.intensity
				};
				case "question": return {
					name: Emotion.Question,
					intensity: payload.intensity
				};
				case "curious": return {
					name: Emotion.Curious,
					intensity: payload.intensity
				};
				case "neutral": return {
					name: Emotion.Neutral,
					intensity: payload.intensity
				};
				default: return;
			}
		}
		chatHookCleanups.push(streamingControl.onSignal(async (signal) => {
			if (signal.type === "act") {
				const act = normalizeActPayload(signal.payload);
				let explicitLive2DMotion = false;
				if (stageModelRenderer.value === "live2d") {
					if (act.motion) {
						if (await live2d.motions.execute(act.motion)) explicitLive2DMotion = true;
					}
					if (act.expression === null) await live2d.expressions.resetExecution();
					else if (act.expression) await live2d.expressions.execute(act.expression);
				}
				if (act.emotion && !explicitLive2DMotion) {
					const emotion = toStageEmotionPayload(act.emotion);
					if (!emotion) return;
					console.debug("emotion detected", emotion);
					emotionsQueue.enqueue(emotion);
				}
				return;
			}
			if (signal.type === "delay") {
				console.debug("delay detected", signal.seconds);
				await sleep(signal.seconds * 1e3);
			}
		}));
		async function playSpecialToken(special, options) {
			await streamingControl.dispatchWith(special, {
				turnId: options?.turnId,
				intentId: options?.intentId,
				streamId: options?.streamId
			});
		}
		const lipSyncNode = ref();
		const voice = useVoiceStore();
		const speechAnalysis = audioContext.createGain();
		const speechDestination = audioContext.createGain();
		speechAnalysis.connect(speechDestination);
		speechDestination.connect(audioContext.destination);
		watch(speechVolume, (volume) => {
			speechDestination.gain.setTargetAtTime(volume, audioContext.currentTime, .05);
		}, { immediate: true });
		const playback = new Playback(new BrowserPlayback(audioContext, {
			destination: speechAnalysis,
			onSource: (source) => {
				currentAudioSource.value = source;
			}
		}));
		let playingCount = 0;
		function resetSpeakingState() {
			nowSpeaking.value = false;
			mouthOpenSize.value = 0;
		}
		watch(() => voice.activeTurns, (turns) => {
			if (turns.length === 0) speechVoicing.value = false;
		});
		const cards = useAiriCardStore();
		const disconnectVoiceOutput = voice.connectOutput((turn) => {
			const output = {
				playback,
				onSpecial: (special) => void playSpecialToken(special, { turnId: turn.turnId }),
				onPlaybackStart: ({ text }) => {
					playingCount += 1;
					nowSpeaking.value = true;
					speechVoicing.value = true;
					assistantCaption.value += ` ${text}`;
					try {
						postCaption({
							type: "caption-assistant",
							text
						});
						postPresent({
							type: "assistant-append",
							text
						});
					} catch (error) {
						console.error("Speech presentation channel failed", error);
					}
				},
				onPlaybackEnd: () => {
					playingCount -= 1;
					if (playingCount === 0) resetSpeakingState();
				}
			};
			if (speechMuted.value) return {
				...output,
				synthesize: async () => null
			};
			try {
				const characterId = chatSession.sessionMetas[turn.sessionId]?.characterId;
				if (!characterId) throw new Error("The response session has no character");
				return speechStore.createOutput(turn, cards.getModules(characterId).speech, output, audioContext);
			} catch (error) {
				console.error("Speech output is unavailable", error);
				return {
					...output,
					synthesize: async () => null
				};
			}
		});
		function startLipSyncLoop() {
			if (lipSyncLoopId.value) return;
			const tick = () => {
				if (!nowSpeaking.value || !live2dLipSync.value) mouthOpenSize.value = 0;
				else mouthOpenSize.value = live2dLipSync.value.getMouthOpen();
				lipSyncLoopId.value = requestAnimationFrame(tick);
			};
			lipSyncLoopId.value = requestAnimationFrame(tick);
		}
		function stopLipSyncLoop() {
			if (lipSyncLoopId.value) {
				cancelAnimationFrame(lipSyncLoopId.value);
				lipSyncLoopId.value = void 0;
			}
			mouthOpenSize.value = 0;
		}
		function resetLive2dLipSync() {
			stopLipSyncLoop();
			try {
				lipSyncNode.value?.disconnect();
			} catch {}
			lipSyncNode.value = void 0;
			live2dLipSync.value = void 0;
			lipSyncStarted.value = false;
		}
		function syncLipSyncLoop() {
			if (stageModelRenderer.value === "live2d" && !props.paused && lipSyncStarted.value) {
				startLipSyncLoop();
				return;
			}
			stopLipSyncLoop();
		}
		async function setupLipSync() {
			if (stageModelRenderer.value !== "live2d") {
				resetLive2dLipSync();
				return;
			}
			if (lipSyncStarted.value) return;
			try {
				const lipSync = await createLive2DLipSync(audioContext, profile_default, live2dLipSyncOptions);
				live2dLipSync.value = lipSync;
				lipSyncNode.value = lipSync.node;
				speechAnalysis.connect(lipSync.node);
				await audioContext.resume();
				lipSyncStarted.value = true;
				syncLipSyncLoop();
			} catch (error) {
				resetLive2dLipSync();
				console.error("Failed to setup Live2D lip sync", error);
			}
		}
		function setupAnalyser() {
			if (!audioAnalyser.value) {
				audioAnalyser.value = audioContext.createAnalyser();
				speechAnalysis.connect(audioAnalyser.value);
			}
		}
		watch(speechMuted, (muted) => {
			if (muted) for (const turn of voice.activeTurns) voice.getSpeech(turn)?.cancel("Speech muted");
		});
		function holdsVoice(context) {
			return context.speaks ?? false;
		}
		chatHookCleanups.push(onBeforeMessageComposed(async (_message, context) => {
			if (!holdsVoice(context)) return;
			voice.startResponse(context);
			if (context.sessionId === chatSession.activeSessionId) resetAssistantSpeechSurface("new-message");
			setupAnalyser();
			await setupLipSync();
		}));
		chatHookCleanups.push(onBeforeSend(async (_message, context) => {
			if (holdsVoice(context)) currentMotion.value = { group: EmotionThinkMotionName };
		}));
		chatHookCleanups.push(onTokenLiteral(async (literal, context) => {
			if (holdsVoice(context) && !speechMuted.value) await voice.getSpeech(context)?.write(literal);
		}));
		chatHookCleanups.push(onTokenSpecial(async (special, context) => {
			if (!holdsVoice(context)) return;
			if (speechMuted.value) await playSpecialToken(special, { turnId: context.turnId });
			else voice.getSpeech(context)?.special(special);
		}));
		chatHookCleanups.push(onStreamEnd(async (context) => {
			voice.finishResponse(context).catch((error) => console.error("Speech response completion failed", error));
		}));
		chatHookCleanups.push(onAssistantResponseEnd(async (_message, context) => {
			if (!holdsVoice(context)) return;
			voice.finishResponse(context).catch((error) => console.error("Speech response completion failed", error));
		}));
		let audioContextResumed = false;
		function resumeAudioContextOnInteraction() {
			if (audioContextResumed || !audioContext) return;
			audioContextResumed = true;
			audioContext.resume().catch(() => {});
		}
		useEventListener([
			"click",
			"touchstart",
			"keydown"
		], resumeAudioContextOnInteraction, {
			once: true,
			passive: true
		});
		watch([stageModelRenderer, () => props.paused], ([renderer]) => {
			if (renderer === "godot") componentState.value = "mounted";
			if (renderer !== "live2d") {
				resetLive2dLipSync();
				return;
			}
			syncLipSyncLoop();
		}, { immediate: true });
		function canvasElement() {
			if (stageModelRenderer.value === "live2d") return live2dSceneRef.value?.canvasElement();
			else if (stageModelRenderer.value === "vrm") return vrmViewerRef.value?.canvasElement();
			else if (stageModelRenderer.value === "spine") return spineSceneRef.value?.canvasElement();
			else if (stageModelRenderer.value === "tachie") return tachieSceneRef.value?.canvasElement();
			else if (stageModelRenderer.value === "mmd") return mmdSceneRef.value?.canvasElement();
		}
		function readRenderTargetRegionAtClientPoint(clientX, clientY, radius) {
			if (stageModelRenderer.value !== "vrm") return null;
			return vrmViewerRef.value?.readRenderTargetRegionAtClientPoint?.(clientX, clientY, radius) ?? null;
		}
		async function captureCharacterFrame() {
			if (stageModelRenderer.value === "live2d") return live2dSceneRef.value?.captureFrame();
			if (stageModelRenderer.value === "vrm") return vrmViewerRef.value?.captureFrame();
			if (stageModelRenderer.value === "spine") return spineSceneRef.value?.captureFrame();
			if (stageModelRenderer.value === "tachie") return tachieSceneRef.value?.captureFrame();
			if (stageModelRenderer.value === "mmd") return mmdSceneRef.value?.captureFrame();
		}
		onUnmounted(() => {
			live2d.dispose();
			disposePlaybackStateHandler();
			resetLive2dLipSync();
			chatHookCleanups.forEach((dispose) => dispose?.());
			viewUpdateCleanups.forEach((dispose) => dispose?.());
			disconnectVoiceOutput();
			releaseSpeechPlayerRole();
			speechAnalysis.disconnect();
			speechDestination.disconnect();
		});
		__expose({
			canvasElement,
			/**
			* The frame already carries the scene: every renderer paints it into the canvas it
			* draws to, so what comes back is the whole picture.
			*/
			captureFrame: captureCharacterFrame,
			readRenderTargetRegionAtClientPoint,
			setExpression: async (expression, intensity = 1) => {
				if (stageModelRenderer.value === "vrm") await vrmViewerRef.value?.setExpression(expression, intensity);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$6, [createBaseVNode("div", _hoisted_2$6, [
				unref(stageModelRenderer) === "live2d" && showStage.value ? (openBlock(), createBlock(unref(Live2D_default), {
					key: 0,
					ref_key: "live2dSceneRef",
					ref: live2dSceneRef,
					state: componentState.value,
					"onUpdate:state": _cache[0] || (_cache[0] = ($event) => componentState.value = $event),
					context: unref(live2d),
					presence: presenceBubble.value,
					"min-w": "50% <lg:full",
					"h-full": "",
					"w-full": "",
					"flex-1": "",
					"model-src": unref(stageModelSelectedUrl),
					"model-id": unref(stageModelSelected),
					"background-url": unref(activeBackgroundUrl),
					"cursor-position": __props.cursorPosition,
					"mouth-open-size": unref(mouthOpenSize),
					"now-speaking": unref(nowSpeaking),
					paused: __props.paused,
					"theme-colors-hue": unref(themeColorsHue),
					"theme-colors-hue-dynamic": unref(themeColorsHueDynamic),
					"live2d-shadow-enabled": unref(live2dShadowEnabled),
					"live2d-max-fps": unref(live2dMaxFps),
					"live2d-render-scale": unref(live2dRenderScale),
					onError: handleStageRenderError
				}, null, 8, [
					"state",
					"context",
					"presence",
					"model-src",
					"model-id",
					"background-url",
					"cursor-position",
					"mouth-open-size",
					"now-speaking",
					"paused",
					"theme-colors-hue",
					"theme-colors-hue-dynamic",
					"live2d-shadow-enabled",
					"live2d-max-fps",
					"live2d-render-scale"
				])) : createCommentVNode("", true),
				unref(stageModelRenderer) === "vrm" && showStage.value ? (openBlock(), createBlock(unref(ThreeScene_default), {
					key: 1,
					ref_key: "vrmViewerRef",
					ref: vrmViewerRef,
					state: componentState.value,
					"onUpdate:state": _cache[1] || (_cache[1] = ($event) => componentState.value = $event),
					presence: presenceBubble.value,
					"background-url": unref(activeBackgroundUrl),
					"min-w": "50% <lg:full",
					"h-full": "",
					"w-full": "",
					"flex-1": "",
					"model-id": unref(stageModelSelected),
					"model-src": unref(stageModelSelectedUrl),
					"cursor-position": __props.cursorPosition,
					"idle-animation": unref(animations).idleLoop.toString(),
					paused: __props.paused,
					"show-axes": unref(stageViewControlsEnabled),
					"enable-orbit-controls": props.enableOrbitControls,
					"audio-context": unref(audioContext),
					"current-audio-source": currentAudioSource.value,
					onError: reportStageRenderError,
					onVrmInteract: onVRMInteract
				}, null, 8, [
					"state",
					"presence",
					"background-url",
					"model-id",
					"model-src",
					"cursor-position",
					"idle-animation",
					"paused",
					"show-axes",
					"enable-orbit-controls",
					"audio-context",
					"current-audio-source"
				])) : createCommentVNode("", true),
				unref(stageModelRenderer) === "spine" && showStage.value ? (openBlock(), createBlock(unref(Spine_default), {
					key: 2,
					ref_key: "spineSceneRef",
					ref: spineSceneRef,
					state: componentState.value,
					"onUpdate:state": _cache[2] || (_cache[2] = ($event) => componentState.value = $event),
					"background-url": unref(activeBackgroundUrl),
					"min-w": "50% <lg:full",
					"h-full": "",
					"w-full": "",
					"flex-1": "",
					"model-src": unref(stageModelSelectedUrl),
					"model-id": unref(stageModelSelected),
					paused: __props.paused,
					"premultiplied-alpha": unref(spinePremultipliedAlpha),
					"default-mix-duration": unref(spineDefaultMixDuration),
					"idle-animation-enabled": unref(spineIdleAnimationEnabled),
					"max-fps": unref(spineMaxFps),
					"render-scale": unref(spineRenderScale),
					onError: reportStageRenderError
				}, null, 8, [
					"state",
					"background-url",
					"model-src",
					"model-id",
					"paused",
					"premultiplied-alpha",
					"default-mix-duration",
					"idle-animation-enabled",
					"max-fps",
					"render-scale"
				])) : createCommentVNode("", true),
				unref(stageModelRenderer) === "tachie" && showStage.value ? (openBlock(), createBlock(unref(tachie_default), {
					key: 3,
					ref_key: "tachieSceneRef",
					ref: tachieSceneRef,
					state: componentState.value,
					"onUpdate:state": _cache[3] || (_cache[3] = ($event) => componentState.value = $event),
					"background-url": unref(activeBackgroundUrl),
					"min-w": "50% <lg:full",
					"h-full": "",
					"w-full": "",
					"flex-1": "",
					"model-src": unref(stageModelSelectedUrl),
					"model-id": unref(stageModelSelected),
					paused: __props.paused,
					"theme-colors-hue": unref(themeColorsHue),
					"theme-colors-hue-dynamic": unref(themeColorsHueDynamic),
					onError: reportStageRenderError
				}, null, 8, [
					"state",
					"background-url",
					"model-src",
					"model-id",
					"paused",
					"theme-colors-hue",
					"theme-colors-hue-dynamic"
				])) : createCommentVNode("", true),
				unref(stageModelRenderer) === "mmd" && showStage.value ? (openBlock(), createBlock(unref(MMD_default), {
					key: 4,
					ref_key: "mmdSceneRef",
					ref: mmdSceneRef,
					state: componentState.value,
					"onUpdate:state": _cache[4] || (_cache[4] = ($event) => componentState.value = $event),
					"background-url": unref(activeBackgroundUrl),
					"min-w": "50% <lg:full",
					"h-full": "",
					"w-full": "",
					"flex-1": "",
					"model-src": unref(stageModelSelectedUrl),
					"model-id": unref(stageModelSelected),
					paused: __props.paused,
					"cursor-position": __props.cursorPosition,
					"enable-orbit-controls": props.enableOrbitControls,
					"audio-context": unref(audioContext),
					"current-audio-source": currentAudioSource.value,
					onError: reportStageRenderError
				}, null, 8, [
					"state",
					"background-url",
					"model-src",
					"model-id",
					"paused",
					"cursor-position",
					"enable-orbit-controls",
					"audio-context",
					"current-audio-source"
				])) : createCommentVNode("", true),
				unref(stageModelRenderer) === "godot" ? (openBlock(), createElementBlock("div", _hoisted_3$6, [createBaseVNode("div", _hoisted_4$4, [createVNode(unref(callout_default), { label: "Godot Stage (Experimental)" }, {
					default: withCtx(() => [..._cache[6] || (_cache[6] = [createBaseVNode("p", null, "Godot Stage (experimental) is running...", -1)])]),
					_: 1
				})])])) : createCommentVNode("", true),
				avatarModelPrompt.value ? (openBlock(), createBlock(stage_avatar_model_missing_default, {
					key: 6,
					reason: avatarModelPrompt.value,
					name: unref(activeCard)?.name ?? "",
					onSelect: _cache[5] || (_cache[5] = ($event) => emit("selectAvatarModel"))
				}, null, 8, ["reason", "name"])) : createCommentVNode("", true),
				stageRenderError.value ? (openBlock(), createBlock(stage_render_error_default, {
					key: 7,
					error: stageRenderError.value,
					renderer: unref(stageModelRenderer) === "live2d" ? "Live2D" : unref(stageModelRenderer) ?? "Model",
					"model-id": unref(stageModelSelected),
					onRetry: retryStageRenderer
				}, null, 8, [
					"error",
					"renderer",
					"model-id"
				])) : createCommentVNode("", true)
			])]);
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/auth-status-island.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = ["data-state"];
var _hoisted_2$5 = {
	"data-icon": "b",
	class: /*@__PURE__*/ normalizeClass(["t-icon size-4"])
};
var _hoisted_3$5 = { class: /*@__PURE__*/ normalizeClass(["mt-3 w-full flex items-center gap-2"]) };
//#endregion
//#region src/renderer/components/stage-islands/auth-status-island.vue
var auth_status_island_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "auth-status-island",
	setup(__props) {
		const { t } = useI18n();
		const { status } = storeToRefs(useAuthStatusStore());
		const dismissedAttempt = ref();
		const startLogin = useElectronEventaInvoke(electronAuthStartLogin);
		const { start, stop } = useTimeoutFn(() => {
			if (status.value?.state === "success") status.value = void 0;
		}, 3e3, { immediate: false });
		const label = computed(() => {
			switch (status.value?.state) {
				case "success": return t("stage.status.signed-in");
				case "error": return t("stage.status.sign-in-error");
				case "confirming": return t("stage.status.confirming");
				default: return t("stage.status.signing-in");
			}
		});
		watch(status, (value) => {
			stop();
			if (value?.state === "success") start();
		}, { immediate: true });
		return (_ctx, _cache) => {
			return unref(status) && unref(status).attemptId !== dismissedAttempt.value ? (openBlock(), createBlock(unref(status_capsule_default), {
				key: 0,
				placement: "below",
				align: "center",
				"data-status": unref(status).state,
				tone: unref(status).state === "error" ? "error" : "neutral",
				label: label.value,
				details: unref(status).error,
				reveal: unref(status).state === "success"
			}, {
				indicator: withCtx(() => [createBaseVNode("span", {
					"aria-hidden": "true",
					class: normalizeClass(["t-icon-swap auth-status-icons size-4"]),
					"data-state": unref(status).state === "waiting" || unref(status).state === "confirming" ? "a" : "b"
				}, [_cache[2] || (_cache[2] = createBaseVNode("span", {
					"data-icon": "a",
					class: normalizeClass(["t-icon size-4"])
				}, [createBaseVNode("span", { class: normalizeClass(["i-solar:refresh-linear auth-pending block size-4"]) })], -1)), createBaseVNode("span", _hoisted_2$5, [createBaseVNode("span", { class: normalizeClass(["block size-4", unref(status).state === "error" ? "i-solar:danger-circle-linear" : "i-solar:check-circle-linear"]) }, null, 2)])], 8, _hoisted_1$5)]),
				default: withCtx(() => [createBaseVNode("div", _hoisted_3$5, [createVNode(unref(button_default), {
					size: "sm",
					icon: "i-solar:close-circle-line-duotone",
					label: unref(t)("stage.status.dismiss"),
					class: normalizeClass(["min-w-0 flex-1 whitespace-nowrap"]),
					onClick: _cache[0] || (_cache[0] = ($event) => dismissedAttempt.value = unref(status)?.attemptId)
				}, null, 8, ["label"]), unref(status).state === "error" ? (openBlock(), createBlock(unref(button_default), {
					key: 0,
					size: "sm",
					color: "primary",
					variant: "primary",
					icon: "i-solar:login-3-line-duotone",
					label: unref(t)("tamagotchi.stage.controls-island.login"),
					class: normalizeClass(["min-w-0 flex-1 whitespace-nowrap"]),
					onClick: _cache[1] || (_cache[1] = ($event) => unref(startLogin)())
				}, null, 8, ["label"])) : createCommentVNode("", true)])]),
				_: 1
			}, 8, [
				"data-status",
				"tone",
				"label",
				"details",
				"reveal"
			])) : createCommentVNode("", true);
		};
	}
}), [["__scopeId", "data-v-d25613e7"]]);
//#endregion
//#region src/shared/utils/electron/display.ts
/**
* Finds the display that owns the largest visible share of a window.
*/
function findDominantDisplayArea(bounds, displays) {
	let dominantDisplay;
	let dominantArea = -1;
	for (const display of displays) {
		const area = intersectionArea(bounds, display.bounds);
		if (area > dominantArea) {
			dominantDisplay = display;
			dominantArea = area;
		}
	}
	return dominantDisplay;
}
function intersectionArea(a, b) {
	const left = Math.max(a.x, b.x);
	const top = Math.max(a.y, b.y);
	const right = Math.min(a.x + a.width, b.x + b.width);
	const bottom = Math.min(a.y + a.height, b.y + b.height);
	if (right <= left || bottom <= top) return 0;
	return (right - left) * (bottom - top);
}
//#endregion
//#region src/renderer/components/stage-islands/controls-island/use-controls-island-placement.ts
/** The half-width of the center band that prevents repeated flips near an axis. */
var displayCenterDeadZoneRatio = .05;
/**
* Resolves the window corner in the same quadrant as its display position.
*
* The screen geometry stays in Electron logical coordinates. The returned
* dock contains no DOM coordinates, so display scaling cannot affect layout.
*/
function resolveControlsIslandDock(options) {
	if (options.windowBounds.width <= 0 || options.windowBounds.height <= 0) return options.previousDock;
	const display = findDominantDisplayArea(options.windowBounds, options.displays);
	if (!display) return options.previousDock;
	const windowCenterX = options.windowBounds.x + options.windowBounds.width / 2;
	const windowCenterY = options.windowBounds.y + options.windowBounds.height / 2;
	const displayCenterX = display.workArea.x + display.workArea.width / 2;
	const displayCenterY = display.workArea.y + display.workArea.height / 2;
	const horizontalDeadZone = display.workArea.width * displayCenterDeadZoneRatio;
	const verticalDeadZone = display.workArea.height * displayCenterDeadZoneRatio;
	let horizontalDock = options.previousDock.endsWith("left") ? "left" : "right";
	let verticalDock = options.previousDock.startsWith("top") ? "top" : "bottom";
	if (windowCenterX < displayCenterX - horizontalDeadZone) horizontalDock = "left";
	else if (windowCenterX > displayCenterX + horizontalDeadZone) horizontalDock = "right";
	if (windowCenterY < displayCenterY - verticalDeadZone) verticalDock = "top";
	else if (windowCenterY > displayCenterY + verticalDeadZone) verticalDock = "bottom";
	if (verticalDock === "top") return horizontalDock === "left" ? "top-left" : "top-right";
	return horizontalDock === "left" ? "bottom-left" : "bottom-right";
}
/** Placement contract provided by the Controls Island root. */
var controlsIslandPlacementKey = Symbol("controls-island-placement");
/** Returns the placement from the nearest Controls Island root. */
function useControlsIslandPlacement() {
	const placement = inject(controlsIslandPlacementKey);
	if (!placement) throw new Error("useControlsIslandPlacement() requires a parent ControlsIslandRoot");
	return placement;
}
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-root.vue?vue&type=script&setup=true&lang.ts
var placementSettleDelayMs = 1e3;
var placementLeaveDurationMs = 150;
var placementEnterPreparationMs = 16;
var placementArrivalDurationMs = 150;
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-root.vue
var controls_island_root_default = /* @__PURE__ */ defineComponent({
	__name: "controls-island-root",
	props: { frozen: { type: Boolean } },
	setup(__props) {
		const props = __props;
		const displays = useElectronAllDisplays();
		const windowBounds = useElectronWindowBounds();
		const preferredMotion = usePreferredReducedMotion();
		const dock = shallowRef("top-right");
		const pendingDock = shallowRef();
		const relocationTarget = shallowRef();
		const motionPhase = shallowRef("idle");
		/** The window must stay still for this period before the Island changes corners. */
		/** The old corner fades out before the dock changes. */
		/** One frame keeps the new corner hidden before its entrance starts. */
		/** The new corner fades in and moves into its resting position. */
		const { start: finishArrival, stop: stopArrival } = useTimeoutFn(() => {
			motionPhase.value = "idle";
			relocationTarget.value = void 0;
		}, placementArrivalDurationMs, { immediate: false });
		const { start: startArrival, stop: stopEnterPreparation } = useTimeoutFn(() => {
			motionPhase.value = "arriving";
			finishArrival();
		}, placementEnterPreparationMs, { immediate: false });
		const { start: finishLeave, stop: stopLeave } = useTimeoutFn(() => {
			if (!relocationTarget.value) {
				motionPhase.value = "idle";
				return;
			}
			dock.value = relocationTarget.value;
			motionPhase.value = "entering";
			startArrival();
		}, placementLeaveDurationMs, { immediate: false });
		function stopRelocation() {
			stopLeave();
			stopEnterPreparation();
			stopArrival();
		}
		function relocate(nextDock) {
			stopRelocation();
			if (nextDock === dock.value) {
				relocationTarget.value = void 0;
				motionPhase.value = "idle";
				return;
			}
			if (preferredMotion.value === "reduce") {
				dock.value = nextDock;
				relocationTarget.value = void 0;
				motionPhase.value = "idle";
				return;
			}
			relocationTarget.value = nextDock;
			motionPhase.value = "leaving";
			finishLeave();
		}
		const liveWindowBounds = computed(() => ({
			x: windowBounds.x.value,
			y: windowBounds.y.value,
			width: windowBounds.width.value,
			height: windowBounds.height.value
		}));
		const settledWindowBounds = refDebounced(liveWindowBounds, placementSettleDelayMs);
		const candidateDock = computed(() => resolveControlsIslandDock({
			displays: displays.value,
			previousDock: dock.value,
			windowBounds: settledWindowBounds.value
		}));
		watch(candidateDock, (nextDock) => {
			if (props.frozen) {
				pendingDock.value = nextDock;
				return;
			}
			relocate(nextDock);
			pendingDock.value = void 0;
		}, { immediate: true });
		watch(() => props.frozen, (frozen) => {
			if (frozen || !pendingDock.value) return;
			relocate(pendingDock.value);
			pendingDock.value = void 0;
		});
		const placement = {
			dock,
			isLeft: computed(() => dock.value.endsWith("left")),
			isTop: computed(() => dock.value.startsWith("top")),
			motionPhase
		};
		provide(controlsIslandPlacementKey, placement);
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/controls-island/control-button-tooltip.vue
var control_button_tooltip_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "control-button-tooltip",
	props: {
		side: { default: "top" },
		asChild: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const { isLeft } = useControlsIslandPlacement();
		const resolvedSide = computed(() => {
			if (props.side === "inward") return isLeft.value ? "right" : "left";
			return props.side;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TooltipProvider_default), {
				"delay-duration": 0,
				"skip-delay-duration": 0
			}, {
				default: withCtx(() => [createVNode(unref(TooltipRoot_default), null, {
					default: withCtx(() => [createVNode(unref(TooltipTrigger_default), { "as-child": __props.asChild }, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, void 0, true)]),
						_: 3
					}, 8, ["as-child"]), createVNode(unref(TooltipPortal_default), null, {
						default: withCtx(() => [createVNode(Transition, { name: "fade" }, {
							default: withCtx(() => [createVNode(unref(TooltipContent_default), {
								class: normalizeClass([
									"controls-island-tooltip",
									"border-1 border-solid border-neutral-200/60 dark:border-neutral-800/10",
									"bg-neutral-50/80 dark:bg-neutral-800/70",
									"w-fit flex items-center self-end justify-center px-1.5 py-1",
									"rounded-lg backdrop-blur-md",
									"max-w-[min(18rem,calc(100vw-1rem))] break-words text-center text-xs leading-4 whitespace-normal"
								]),
								side: resolvedSide.value,
								"side-offset": 4
							}, {
								default: withCtx(() => [renderSlot(_ctx.$slots, "tooltip", {}, void 0, true)]),
								_: 3
							}, 8, ["side"])]),
							_: 3
						})]),
						_: 3
					})]),
					_: 3
				})]),
				_: 3
			});
		};
	}
}), [["__scopeId", "data-v-53254172"]]);
//#endregion
//#region src/renderer/components/stage-islands/controls-island/control-button.vue
var control_button_default = /* @__PURE__ */ defineComponent({
	__name: "control-button",
	props: { buttonStyle: {} },
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(overlay_button_default), {
				size: "sm",
				class: normalizeClass(["p-2!", props.buttonStyle])
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/status-island/index.vue
var status_island_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	props: {
		buttonStyle: {},
		iconClass: {}
	},
	setup(__props) {
		const props = __props;
		const { t } = useI18n();
		const { connected } = storeToRefs(useModsServerChannelStore());
		const openSettings = useElectronEventaInvoke(electronOpenSettings);
		const iconClasses = computed(() => {
			return [
				"i-mingcute:link-3-line",
				!connected.value && "lamp-flicker-animation",
				props.iconClass,
				"shrink-0 text-neutral-800 transition-colors duration-300 ease-in-out dark:text-neutral-300"
			];
		});
		const buttonLabel = computed(() => {
			return connected.value ? t("stage.websocket-status.connected") : t("stage.websocket-status.disconnected");
		});
		const tooltipLabel = computed(() => {
			return `${buttonLabel.value}. ${t("stage.websocket-status.open-settings")}`;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(control_button_tooltip_default, { side: "inward" }, {
				tooltip: withCtx(() => [createTextVNode(toDisplayString(tooltipLabel.value), 1)]),
				default: withCtx(() => [createVNode(control_button_default, {
					"button-style": props.buttonStyle,
					"aria-label": tooltipLabel.value,
					title: tooltipLabel.value,
					onClick: _cache[0] || (_cache[0] = ($event) => unref(openSettings)({ route: "/settings/connection" }))
				}, {
					default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(iconClasses.value) }, null, 2)]),
					_: 1
				}, 8, [
					"button-style",
					"aria-label",
					"title"
				])]),
				_: 1
			});
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-auth-button.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = {
	key: 0,
	flex: "~ col gap-1.5",
	"mb-1.5": ""
};
var _hoisted_2$4 = {
	flex: "~ items-center gap-3",
	"rounded-xl": "",
	"px-3": "",
	"py-2.5": "",
	bg: "black/5 dark:white/5"
};
var _hoisted_3$4 = {
	text: "sm neutral-500 dark:neutral-400",
	truncate: ""
};
var _hoisted_4$3 = {
	key: 1,
	flex: "~ col gap-1.5",
	"mb-1.5": ""
};
var _hoisted_5$2 = { class: "min-w-0 flex flex-1 flex-col items-start gap-0.5" };
var _hoisted_6$1 = { class: /*@__PURE__*/ normalizeClass([
	"w-full truncate",
	"text-sm font-semibold",
	"text-neutral-800 dark:text-neutral-200"
]) };
var _hoisted_7$1 = { class: /*@__PURE__*/ normalizeClass([
	"flex items-center gap-1",
	"rounded-md px-1.5 py-0.5",
	"bg-primary-500/12 dark:bg-primary-400/12",
	"text-[10px] font-semibold",
	"text-primary-600 dark:text-primary-400"
]) };
var _hoisted_8$1 = { class: "whitespace-nowrap leading-tight" };
var _hoisted_9$1 = {
	key: 2,
	"mb-1.5": ""
};
var _hoisted_10$1 = {
	text: "sm primary-600 dark:primary-400",
	"font-medium": ""
};
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-auth-button.vue
var controls_island_auth_button_default = /* @__PURE__ */ defineComponent({
	__name: "controls-island-auth-button",
	props: {
		active: { type: Boolean },
		buttonStyle: {},
		iconClass: {}
	},
	setup(__props) {
		const props = __props;
		const { t } = useI18n();
		const authStore = useAuthStore();
		const { isAuthenticated, user, needsLogin, credits } = storeToRefs(authStore);
		const context = useElectronEventaContext();
		const startSigningIn = useElectronEventaInvoke(electronAuthStartLogin);
		const openSettings = useElectronEventaInvoke(electronOpenSettings);
		const signingIn = ref(false);
		const userName = computed(() => user.value?.name);
		const userAvatar = computed(() => user.value?.image);
		function handleClick() {
			if (isAuthenticated.value) openSettings({ route: "/settings/account" });
			else doSigningIn();
		}
		function doSigningIn() {
			signingIn.value = true;
			startSigningIn();
		}
		const stopCallback = context.value.on(electronAuthCallback, () => {
			signingIn.value = false;
		});
		const stopError = context.value.on(electronAuthCallbackError, () => {
			signingIn.value = false;
		});
		onScopeDispose(() => {
			stopCallback();
			stopError();
		});
		watch([needsLogin, () => props.active], async ([requested, active]) => {
			if (active && requested && !isAuthenticated.value && await authStore.consumeLoginRequest()) doSigningIn();
		});
		watch(isAuthenticated, (val) => {
			if (val) signingIn.value = false;
		});
		return (_ctx, _cache) => {
			return signingIn.value && !unref(isAuthenticated) ? (openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("div", _hoisted_2$4, [_cache[0] || (_cache[0] = createBaseVNode("div", { class: normalizeClass([
				"size-4 shrink-0",
				"i-svg-spinners:ring-resize",
				"text-primary-500 dark:text-primary-400"
			]) }, null, -1)), createBaseVNode("span", _hoisted_3$4, toDisplayString(unref(t)("tamagotchi.stage.controls-island.logging-in")), 1)])])) : unref(isAuthenticated) ? (openBlock(), createElementBlock("div", _hoisted_4$3, [createBaseVNode("button", {
				type: "button",
				class: normalizeClass([
					"flex min-w-0 items-center gap-2.5",
					"rounded-xl px-2.5 py-2",
					"bg-transparent hover:bg-black/5 dark:hover:bg-white/5",
					"transition-colors duration-200",
					"cursor-pointer border-none outline-none",
					"w-full text-left",
					props.buttonStyle
				]),
				onClick: handleClick
			}, [createVNode(unref(avatar_default), {
				src: userAvatar.value,
				class: normalizeClass([
					"size-8 shrink-0 overflow-hidden rounded-full",
					"bg-primary-100 dark:bg-primary-900/40",
					"flex items-center justify-center"
				])
			}, null, 8, ["src"]), createBaseVNode("div", _hoisted_5$2, [createBaseVNode("span", _hoisted_6$1, toDisplayString(userName.value), 1), createBaseVNode("div", _hoisted_7$1, [_cache[1] || (_cache[1] = createBaseVNode("div", { class: normalizeClass(["i-solar:battery-charge-bold-duotone", "size-3 shrink-0"]) }, null, -1)), createBaseVNode("span", _hoisted_8$1, toDisplayString(unref(credits)) + " Flux", 1)])])], 2)])) : (openBlock(), createElementBlock("div", _hoisted_9$1, [createBaseVNode("button", {
				type: "button",
				class: normalizeClass([
					"flex items-center gap-2.5",
					"w-full rounded-xl px-3 py-2.5",
					"bg-primary-500/10 hover:bg-primary-500/20",
					"dark:bg-primary-400/10 dark:hover:bg-primary-400/20",
					"transition-colors duration-200",
					"cursor-pointer border-none outline-none",
					"text-left",
					props.buttonStyle
				]),
				onClick: handleClick
			}, [createBaseVNode("div", {
				"i-solar:login-3-bold-duotone": "",
				class: normalizeClass([props.iconClass ?? "size-4.5", "shrink-0 text-primary-500 dark:text-primary-400"])
			}, null, 2), createBaseVNode("span", _hoisted_10$1, toDisplayString(unref(t)("tamagotchi.stage.controls-island.login")), 1)], 2)]));
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-chat-button.vue
var controls_island_chat_button_default = /* @__PURE__ */ defineComponent({
	__name: "controls-island-chat-button",
	props: {
		buttonStyle: {},
		iconClass: {}
	},
	setup(__props) {
		const { t } = useI18n();
		const context = useElectronEventaContext();
		const openChat = useElectronEventaInvoke(electronOpenChat);
		const getChatButtonState = useElectronEventaInvoke(electronGetChatButtonState);
		const state = shallowRef({
			mode: "legacy",
			floatingShown: false
		});
		const stopStateChanged = context.value.on(electronChatButtonStateChanged, (event) => {
			if (event?.body) state.value = event.body;
		});
		onScopeDispose(stopStateChanged);
		onMounted(async () => {
			state.value = await getChatButtonState();
		});
		const pressed = computed(() => state.value.mode === "floating" ? state.value.floatingShown : void 0);
		const label = computed(() => pressed.value ? t("tamagotchi.stage.controls-island.hide-chat") : t("tamagotchi.stage.controls-island.open-chat"));
		return (_ctx, _cache) => {
			const _directive_track_button = resolveDirective("track-button");
			return openBlock(), createBlock(control_button_tooltip_default, { side: "inward" }, {
				tooltip: withCtx(() => [createTextVNode(toDisplayString(label.value), 1)]),
				default: withCtx(() => [withDirectives((openBlock(), createBlock(control_button_default, {
					"button-style": [__props.buttonStyle, pressed.value ? "bg-primary-100! dark:bg-primary-900/60!" : ""].join(" "),
					"aria-label": label.value,
					"aria-pressed": pressed.value,
					onClick: _cache[0] || (_cache[0] = () => unref(openChat)())
				}, {
					default: withCtx(() => [createBaseVNode("div", {
						"i-solar:chat-line-line-duotone": "",
						class: normalizeClass([__props.iconClass, pressed.value ? "text-primary-600 dark:text-primary-300" : "text-neutral-800 dark:text-neutral-300"])
					}, null, 2)]),
					_: 1
				}, 8, [
					"button-style",
					"aria-label",
					"aria-pressed"
				])), [[_directive_track_button, {
					name: "controls_island_action",
					action: "toggle_chat"
				}]])]),
				_: 1
			});
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-fade-on-hover.vue?vue&type=script&setup=true&lang.ts
var NOTICE_WINDOW_ID = "fade-on-hover";
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-fade-on-hover.vue
var controls_island_fade_on_hover_default = /* @__PURE__ */ defineComponent({
	__name: "controls-island-fade-on-hover",
	props: {
		iconClass: { default: "size-5" },
		buttonStyle: {}
	},
	setup(__props) {
		const props = __props;
		const uiStore = useControlsIslandStore();
		const enabled = computed(() => uiStore.fadeOnHoverEnabled);
		const { t } = useI18n();
		const { trackControlsIslandAction } = useAnalytics();
		const requestNotice = useElectronEventaInvoke(noticeWindowEventa.openWindow);
		function setFadeOnHoverEnabled(value) {
			if (value) uiStore.enableFadeOnHover();
			else uiStore.disableFadeOnHover();
			trackControlsIslandAction({ action: value ? "enable_fade_on_hover" : "disable_fade_on_hover" });
		}
		async function handleToggle() {
			if (enabled.value) {
				setFadeOnHoverEnabled(false);
				return;
			}
			if (uiStore.dontShowItAgainNoticeFadeOnHover) {
				setFadeOnHoverEnabled(true);
				return;
			}
			try {
				if (await requestNotice({
					id: NOTICE_WINDOW_ID,
					route: "/notice/fade-on-hover",
					type: "fade-on-hover"
				})) setFadeOnHoverEnabled(true);
			} catch (error) {
				console.error("Failed to open fade-on-hover notice:", error);
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(control_button_tooltip_default, null, {
				tooltip: withCtx(() => [createTextVNode(toDisplayString(enabled.value ? unref(t)("tamagotchi.stage.controls-island.fade-on-hover.disable") : unref(t)("tamagotchi.stage.controls-island.fade-on-hover.enable")), 1)]),
				default: withCtx(() => [createVNode(control_button_default, {
					"button-style": props.buttonStyle,
					"aria-label": enabled.value ? unref(t)("tamagotchi.stage.controls-island.fade-on-hover.disable") : unref(t)("tamagotchi.stage.controls-island.fade-on-hover.enable"),
					class: normalizeClass({ "border-primary-300/70 shadow-[0_10px_24px_rgba(0,0,0,0.22)]": enabled.value }),
					onClick: handleToggle
				}, {
					default: withCtx(() => [createVNode(Transition, {
						name: "fade",
						mode: "out-in"
					}, {
						default: withCtx(() => [enabled.value ? (openBlock(), createElementBlock("div", {
							key: 0,
							"i-ph:eye": "",
							class: normalizeClass(props.iconClass),
							text: "primary-700 dark:primary-300"
						}, null, 2)) : (openBlock(), createElementBlock("div", {
							key: 1,
							"i-ph:eye-slash": "",
							class: normalizeClass(props.iconClass),
							text: "neutral-800 dark:neutral-300"
						}, null, 2))]),
						_: 1
					})]),
					_: 1
				}, 8, [
					"button-style",
					"aria-label",
					"class"
				])]),
				_: 1
			});
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-profile-picker.vue
var controls_island_profile_picker_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "controls-island-profile-picker",
	props: /*@__PURE__*/ mergeModels({ active: { type: Boolean } }, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {},
		"creating": {
			type: Boolean,
			default: false
		},
		"creatingModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["interactionChange"], ["update:open", "update:creating"]),
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const open = useModel(__props, "open");
		const creating = useModel(__props, "creating");
		const openSettings = useElectronEventaInvoke(electronOpenSettings);
		const { isLeft, isTop } = useControlsIslandPlacement();
		const contentSide = computed(() => isTop.value ? "bottom" : "top");
		const contentAlign = computed(() => isLeft.value ? "start" : "end");
		function handleManage() {
			openSettings({ route: "/settings/airi-card" });
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(profile_switcher_popover_default), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
				creating: creating.value,
				"onUpdate:creating": _cache[1] || (_cache[1] = ($event) => creating.value = $event),
				active: props.active,
				"content-side": contentSide.value,
				"content-align": contentAlign.value,
				onInteractionChange: _cache[2] || (_cache[2] = ($event) => emit("interactionChange", $event)),
				onManage: handleManage
			}, {
				default: withCtx(({ open: popoverOpen, toggle, activeCard }) => [renderSlot(_ctx.$slots, "default", {
					open: popoverOpen,
					toggle,
					activeCard
				})]),
				_: 3
			}, 8, [
				"open",
				"creating",
				"active",
				"content-side",
				"content-align"
			]);
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/controls-island/controls-island-speech-mute.vue
var controls_island_speech_mute_default = /* @__PURE__ */ defineComponent({
	__name: "controls-island-speech-mute",
	props: {
		buttonStyle: {},
		iconClass: {}
	},
	setup(__props) {
		const { t } = useI18n();
		const { speechMuted, toggleSpeechMuted } = useStopSpeakingButton();
		const label = computed(() => speechMuted.value ? t("tamagotchi.stage.controls-island.unmute") : t("tamagotchi.stage.controls-island.mute"));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(control_button_tooltip_default, {
				side: "inward",
				"as-child": ""
			}, {
				tooltip: withCtx(() => [createTextVNode(toDisplayString(label.value), 1)]),
				default: withCtx(() => [createVNode(control_button_default, {
					"button-style": __props.buttonStyle,
					"aria-label": label.value,
					"aria-pressed": unref(speechMuted),
					onClick: unref(toggleSpeechMuted)
				}, {
					default: withCtx(() => [unref(speechMuted) ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass([
							__props.iconClass,
							"i-solar:volume-cross-outline",
							"text-neutral-800 dark:text-neutral-300"
						])
					}, null, 2)) : (openBlock(), createElementBlock("div", {
						key: 1,
						class: normalizeClass([
							__props.iconClass,
							"i-solar:volume-loud-outline",
							"text-neutral-800 dark:text-neutral-300"
						])
					}, null, 2))]),
					_: 1
				}, 8, [
					"button-style",
					"aria-label",
					"aria-pressed",
					"onClick"
				])]),
				_: 1
			});
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/controls-island/indicator-mic-volume.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = {
	class: "size-full",
	viewBox: "0 0 256 256",
	"aria-hidden": "true"
};
var _hoisted_2$3 = {
	id: "micLevel",
	x1: "0%",
	y1: "0%",
	x2: "0%",
	y2: "100%"
};
var _hoisted_3$3 = ["offset"];
var _hoisted_4$2 = ["offset"];
//#endregion
//#region src/renderer/components/stage-islands/controls-island/indicator-mic-volume.vue
var indicator_mic_volume_default = /* @__PURE__ */ defineComponent({
	__name: "indicator-mic-volume",
	props: { colorClass: { default: "text-primary-500 dark:text-primary-200" } },
	setup(__props) {
		const props = __props;
		const settingsAudio = useSettingsAudioDevice();
		const { stream, listening } = storeToRefs(settingsAudio);
		const { audioContext } = storeToRefs(useAudioContext());
		const { startAnalyzer, stopAnalyzer, volumeLevel } = useAudioAnalyzer();
		let source;
		const normalized = computed(() => Math.min(1, (volumeLevel.value ?? 0) / 100));
		function teardown() {
			try {
				source?.disconnect();
			} catch {}
			source = void 0;
			stopAnalyzer();
		}
		async function setup() {
			teardown();
			if (!listening.value || !stream.value) return;
			const ctx = audioContext.value;
			if (ctx.state === "suspended") await ctx.resume();
			const analyser = startAnalyzer(ctx);
			if (!analyser) return;
			source = ctx.createMediaStreamSource(stream.value);
			source.connect(analyser);
		}
		onMounted(() => {
			watch([listening, stream], () => setup(), { immediate: true });
		});
		onUnmounted(() => teardown());
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(["flex items-center justify-center", props.colorClass]) }, [(openBlock(), createElementBlock("svg", _hoisted_1$3, [
				createBaseVNode("defs", null, [createBaseVNode("linearGradient", _hoisted_2$3, [
					_cache[0] || (_cache[0] = createBaseVNode("stop", {
						offset: "0%",
						"stop-color": "currentColor",
						"stop-opacity": "0"
					}, null, -1)),
					createBaseVNode("stop", {
						offset: `${100 - Math.round(normalized.value * 100)}%`,
						"stop-color": "currentColor",
						"stop-opacity": "0"
					}, null, 8, _hoisted_3$3),
					createBaseVNode("stop", {
						offset: `${100 - Math.round(normalized.value * 100)}%`,
						"stop-color": "currentColor",
						"stop-opacity": "0.95"
					}, null, 8, _hoisted_4$2),
					_cache[1] || (_cache[1] = createBaseVNode("stop", {
						offset: "100%",
						"stop-color": "currentColor",
						"stop-opacity": "0.95"
					}, null, -1))
				])]),
				_cache[2] || (_cache[2] = createBaseVNode("path", {
					fill: "url(#micLevel)",
					d: "M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48M96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V240a8 8 0 0 1-16 0v-32.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6"
				}, null, -1)),
				_cache[3] || (_cache[3] = createBaseVNode("path", {
					fill: "none",
					stroke: "currentColor",
					"stroke-opacity": "1",
					"stroke-width": "2",
					d: "M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48M96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V240a8 8 0 0 1-16 0v-32.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6"
				}, null, -1))
			]))], 2);
		};
	}
});
//#endregion
//#region src/renderer/components/stage-islands/controls-island/use-controls-island-layout.ts
/**
* Owns renderer-local geometry and scroll alignment for one mounted Island.
* Measures unconstrained border boxes, so clipping and animation cannot change
* the direction decision. VueUse observers stop with the component scope.
*/
function useControlsIslandLayout(elements, expanded, placement) {
	const { isLeft, isTop, dock } = placement;
	const main = useElementSize(elements.main, void 0, { box: "border-box" });
	const menu = useElementSize(elements.menu, void 0, { box: "border-box" });
	const available = useElementSize(elements.available);
	const gap = useElementSize(elements.gap);
	const sideways = computed(() => menu.height.value > 0 && available.height.value > 0 && main.height.value + gap.width.value + menu.height.value > available.height.value);
	const direction = computed(() => sideways.value ? isLeft.value ? "right" : "left" : isTop.value ? "down" : "up");
	const scrollWholeIsland = computed(() => main.height.value > available.height.value || main.width.value > available.width.value || sideways.value && available.width.value - main.width.value - gap.width.value <= 0);
	const panelStyle = computed(() => ({
		maxWidth: scrollWholeIsland.value ? "none" : `${Math.max(0, available.width.value - (sideways.value ? main.width.value + gap.width.value : 0))}px`,
		maxHeight: scrollWholeIsland.value ? "none" : `${Math.max(0, available.height.value - (sideways.value ? 0 : main.height.value + gap.width.value))}px`
	}));
	const layoutClasses = computed(() => sideways.value ? [isLeft.value ? "flex-row-reverse" : "flex-row", isTop.value ? "items-start" : "items-end"] : [isTop.value ? "flex-col-reverse" : "flex-col", isLeft.value ? "items-start" : "items-end"]);
	const arrowRotation = computed(() => ({
		up: 0,
		right: 90,
		down: 180,
		left: 270
	}[direction.value] + (expanded.value ? 180 : 0)) % 360);
	const motionOffset = computed(() => ({
		up: "0, 2rem",
		down: "0, -2rem",
		left: "2rem, 0",
		right: "-2rem, 0"
	})[direction.value]);
	function alignScrollPosition() {
		const viewport = elements.viewport.value;
		if (!viewport) return;
		viewport.scrollTop = isTop.value ? 0 : viewport.scrollHeight - viewport.clientHeight;
		viewport.scrollLeft = isLeft.value ? 0 : viewport.scrollWidth - viewport.clientWidth;
		const focused = document.activeElement;
		if (focused instanceof HTMLElement && viewport.contains(focused)) focused.scrollIntoView({
			block: "nearest",
			inline: "nearest"
		});
	}
	const { pause, resume } = useRafFn(() => {
		pause();
		alignScrollPosition();
	}, { immediate: false });
	useResizeObserver(elements.viewport, resume);
	useResizeObserver(elements.content, resume);
	watch([
		dock,
		expanded,
		direction,
		main.width,
		main.height,
		menu.width,
		menu.height,
		available.width,
		available.height
	], async () => {
		await nextTick();
		resume();
	}, { flush: "post" });
	watch(expanded, async (open) => {
		if (!open) return;
		await nextTick();
		elements.menuViewport.value?.scrollTo(0, 0);
	}, { flush: "post" });
	return {
		direction,
		scrollWholeIsland,
		panelStyle,
		layoutClasses,
		arrowRotation,
		motionOffset
	};
}
//#endregion
//#region src/renderer/components/stage-islands/controls-island/index.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = ["data-direction", "data-scroll-owner"];
var _hoisted_2$2 = {
	"aria-hidden": "true",
	class: /*@__PURE__*/ normalizeClass(["pointer-events-none invisible fixed size-0 overflow-hidden [contain:strict]"])
};
var _hoisted_3$2 = {
	ref: "availableSpace",
	class: /*@__PURE__*/ normalizeClass(["h-[calc(100dvh-1rem)] w-[calc(100dvw-1rem)]"])
};
var _hoisted_4$1 = {
	ref: "gap",
	class: /*@__PURE__*/ normalizeClass(["size-3"])
};
var _hoisted_5$1 = ["inert", "aria-hidden"];
var _hoisted_6 = { class: /*@__PURE__*/ normalizeClass(["w-max flex flex-col gap-1 rounded-2xl border border-neutral-200 p-2 dark:border-neutral-800", "bg-neutral-100/80 shadow-2xl shadow-black/20 backdrop-blur-xl dark:bg-neutral-900/80"]) };
var _hoisted_7 = {
	key: 0,
	"data-testid": "controls-island-notifications-view",
	class: /*@__PURE__*/ normalizeClass(["w-80"])
};
var _hoisted_8 = { class: /*@__PURE__*/ normalizeClass(["flex flex-col gap-1"]) };
var _hoisted_9 = ["aria-label"];
var _hoisted_10 = { class: /*@__PURE__*/ normalizeClass(["flex-1 text-left"]) };
var _hoisted_11 = { class: /*@__PURE__*/ normalizeClass(["grid grid-cols-3 gap-2"]) };
//#endregion
//#region src/renderer/components/stage-islands/controls-island/index.vue
var controls_island_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "index",
	props: { cursorAway: {
		type: Boolean,
		default: false
	} },
	emits: ["interactionChange"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { themeMode, switchToNextTheme } = useTheme();
		const { t } = useI18n();
		const themeIcons = {
			light: "i-solar:sun-2-outline",
			dark: "i-solar:moon-outline",
			auto: "i-lucide:contrast"
		};
		const themeActions = {
			light: "switch_to_dark_mode",
			dark: "switch_to_system_mode",
			auto: "switch_to_light_mode"
		};
		const themeLabel = computed(() => ({
			light: t("tamagotchi.stage.controls-island.switch-to-dark-mode"),
			dark: t("tamagotchi.stage.controls-island.switch-to-system-mode"),
			auto: t("tamagotchi.stage.controls-island.switch-to-light-mode")
		})[themeMode.value]);
		const placement = useControlsIslandPlacement();
		const { dock, isLeft, isTop, motionPhase } = placement;
		const settingsAudioDeviceStore = useSettingsAudioDevice();
		const settingsStore = useSettings();
		const context = useElectronEventaContext();
		const { enabled, listening, off: microphoneOff } = storeToRefs(settingsAudioDeviceStore);
		const { alwaysOnTop, controlsIslandIconSize } = storeToRefs(settingsStore);
		const openSettings = useElectronEventaInvoke(electronOpenSettings);
		const isLinux = useElectronEventaInvoke(electron.app.isLinux);
		const quitApp = useElectronEventaInvoke(electronAppQuit);
		const setAlwaysOnTop = useElectronEventaInvoke(electronWindowSetAlwaysOnTop);
		const centerMainWindow = useElectronEventaInvoke(electronCenterMainWindow);
		const expanded = ref(false);
		const inbox = useInboxStore();
		const { unread: notificationsUnread, messages: notificationMessages, loading: notificationsLoading, error: notificationsError, hasMore: notificationsHasMore, signedIn: notificationsSignedIn } = storeToRefs(inbox);
		const now = useNow({ interval: 6e4 });
		const notificationsLabel = computed(() => notificationsUnread.value > 0 ? t("stage.notifications.open-unread", { count: notificationsUnread.value }) : t("stage.notifications.open"));
		/** The menu card shows the controls or, after the Notifications row, the Notifications list. */
		const menuView = ref("controls");
		const panelPresent = ref(false);
		const islandElement = useTemplateRef("island");
		const profileCreationActive = ref(false);
		const islandScrollArea = useTemplateRef("islandScrollArea");
		const islandViewport = computed(() => islandScrollArea.value?.viewport);
		const islandContent = useTemplateRef("islandContent");
		const mainControlsElement = useTemplateRef("mainControls");
		const menuContent = useTemplateRef("menuContent");
		const menuScrollArea = useTemplateRef("menuScrollArea");
		const menuViewport = computed(() => menuScrollArea.value?.viewport);
		const availableSpaceElement = useTemplateRef("availableSpace");
		const gapElement = useTemplateRef("gap");
		const menuId = useId();
		const profileOpen = ref(false);
		const { direction, scrollWholeIsland, panelStyle, layoutClasses: islandLayoutClasses, arrowRotation, motionOffset } = useControlsIslandLayout({
			main: mainControlsElement,
			menu: menuContent,
			available: availableSpaceElement,
			gap: gapElement,
			viewport: islandViewport,
			menuViewport,
			content: islandContent
		}, expanded, placement);
		const blockingOverlays = reactive(/* @__PURE__ */ new Set());
		const { pressed } = useMousePressed({ target: islandElement });
		const isBlocked = computed(() => blockingOverlays.size > 0 || pressed.value);
		function setOverlay(key, active) {
			if (active) {
				blockingOverlays.add(key);
				return;
			}
			blockingOverlays.delete(key);
		}
		/** True while the microphone button waits for the permission prompt. The button is disabled, so a second press cannot start another request. */
		const microphonePending = ref(false);
		const microphoneLabel = computed(() => listening.value ? t("tamagotchi.stage.controls-island.disable-microphone") : t("tamagotchi.stage.controls-island.enable-microphone"));
		/**
		* Turns listening on, or turns the microphone off. The button is on while AIRI listens.
		*
		* Off is the microphone switch, so no feature can record until the microphone is on again. The listening preference
		* stays, so the next press listens again without a permission request.
		* On turns the microphone on. Only a first listening press asks for permission. A refusal opens Hearing controls,
		* which show the reason from the device store. The Hearing input mode still decides when the microphone captures.
		*/
		async function toggleMicrophone() {
			if (microphonePending.value) return;
			if (listening.value) {
				microphoneOff.value = true;
				return;
			}
			microphoneOff.value = false;
			if (enabled.value) return;
			microphonePending.value = true;
			try {
				if (await settingsAudioDeviceStore.askPermission()) {
					enabled.value = true;
					return;
				}
				expanded.value = true;
				setOverlay("hearing", true);
			} finally {
				microphonePending.value = false;
			}
		}
		const { isOutside: isOutsideByCursor } = useElectronMouseInElement(islandElement);
		const { isOutside: isOutsideByDom } = useMouseInElement(islandElement);
		const isOutside = computed(() => isOutsideByCursor.value && isOutsideByDom.value);
		const isOutsideAfter2seconds = refDebounced(isOutside, 1500);
		const { focused: islandFocused } = useFocusWithin(islandElement);
		const concealed = computed(() => props.cursorAway && !expanded.value && !isBlocked.value && !islandFocused.value);
		__expose({
			get element() {
				return islandElement.value;
			},
			get isOutside() {
				return isOutside.value;
			},
			get overlayActive() {
				return blockingOverlays.size > 0 || pressed.value;
			},
			get hearingDialogOpen() {
				return blockingOverlays.has("hearing");
			},
			set hearingDialogOpen(v) {
				setOverlay("hearing", v);
			}
		});
		watch(isOutsideAfter2seconds, (outside) => {
			if (outside && expanded.value && !isBlocked.value) expanded.value = false;
		});
		watch(expanded, (isExpanded) => {
			if (isExpanded) panelPresent.value = true;
			if (!isExpanded) {
				profileCreationActive.value = false;
				if (menuContent.value?.contains(document.activeElement) || blockingOverlays.size > 0) mainControlsElement.value?.querySelector("[aria-controls]")?.focus();
				profileOpen.value = false;
				menuView.value = "controls";
				blockingOverlays.clear();
			}
		});
		watch([expanded, isBlocked], ([isExpanded, isInteractionBlocked]) => {
			emit("interactionChange", isExpanded || isInteractionBlocked);
		}, { immediate: true });
		useIntervalFn(() => {
			if (expanded.value && isOutside.value && !isBlocked.value) expanded.value = false;
		}, 1500);
		watch(alwaysOnTop, (val) => {
			setAlwaysOnTop(val);
		}, { immediate: true });
		function toggleAlwaysOnTop() {
			alwaysOnTop.value = !alwaysOnTop.value;
		}
		async function showNotifications() {
			menuView.value = "notifications";
			inbox.loadFirstPage();
			await nextTick();
			menuContent.value?.querySelector("[data-testid=\"controls-island-notifications-back\"]")?.focus();
		}
		async function showControls() {
			menuView.value = "controls";
			await nextTick();
			menuContent.value?.querySelector("[data-testid=\"controls-island-notifications\"]")?.focus();
		}
		watch(notificationsSignedIn, (signedIn) => {
			if (!signedIn) menuView.value = "controls";
		});
		const onGoghSettingsVisibility=e=>setOverlay('gogh-character-settings',!!e.detail?.open);onMounted(()=>window.addEventListener('gogh-settings-visibility',onGoghSettingsVisibility));onUnmounted(()=>window.removeEventListener('gogh-settings-visibility',onGoghSettingsVisibility));
 function toggleControls() {
			expanded.value = !expanded.value;
		}
		const adjustStyleClasses = computed(() => {
			let isLarge;
			switch (controlsIslandIconSize.value) {
				case "large":
					isLarge = true;
					break;
				case "small":
					isLarge = false;
					break;
				default: isLarge = true;
			}
			const icon = isLarge ? "size-5" : "size-3";
			const border = isLarge ? "border-2" : "border-0";
			const padding = isLarge ? "p-2" : "p-0.5";
			return {
				icon,
				border,
				padding,
				button: `${border} ${padding}`
			};
		});
		const islandPositionClasses = computed(() => [isTop.value ? "top-2" : "bottom-2", isLeft.value ? "left-2" : "right-2"]);
		const islandMotionClasses = computed(() => {
			const isHidden = motionPhase.value === "leaving" || motionPhase.value === "entering";
			return [
				motionPhase.value === "entering" ? "transition-none" : "transition-[opacity,transform] duration-200 ease-out",
				motionPhase.value === "idle" ? "" : "will-change-[opacity,transform] pointer-events-none",
				isHidden ? "scale-95" : "scale-100",
				isHidden || concealed.value ? "opacity-0" : "opacity-100",
				isHidden && isLeft.value ? "-translate-x-3" : "",
				isHidden && !isLeft.value ? "translate-x-3" : "",
				isHidden && isTop.value ? "-translate-y-2" : "",
				isHidden && !isTop.value ? "translate-y-2" : ""
			];
		});
		const mainControlsLayoutClasses = computed(() => ["flex gap-1", isTop.value ? "flex-col-reverse" : "flex-col"]);
		const panelPositionClasses = computed(() => {
			if (dock.value === "top-left") return ["origin-top-left"];
			if (dock.value === "top-right") return ["origin-top-right"];
			if (dock.value === "bottom-left") return ["origin-bottom-left"];
			return ["origin-bottom-right"];
		});
		/**
		* This is a know issue (or expected behavior maybe) to Electron.
		* We don't use this approach on Linux because it's not working.
		*
		* See `apps/stage-tamagotchi/src/main/windows/main/index.ts` for handler definition
		*/
		const startDraggingWindow = !isLinux() ? defineInvoke(context.value, electronStartDraggingWindow) : void 0;
		function refreshWindow() {
			window.location.reload();
		}
		/**
		* Requests the main process to move the AIRI desktop window back to screen center.
		*/
		function resetMainWindowPosition() {
			centerMainWindow().catch(console.error);
		}
		return (_ctx, _cache) => {
			const _directive_track_button = resolveDirective("track-button");
			return openBlock(), createElementBlock("div", {
				ref: "island",
				"data-testid": "controls-island",
				"data-direction": unref(direction),
				"data-scroll-owner": unref(scrollWholeIsland) ? "island" : "menu",
				class: normalizeClass([
					"fixed max-h-[calc(100dvh-1rem)] max-w-[calc(100dvw-1rem)]",
					islandPositionClasses.value,
					islandMotionClasses.value
				])
			}, [createBaseVNode("div", _hoisted_2$2, [createBaseVNode("div", _hoisted_3$2, null, 512), createBaseVNode("div", _hoisted_4$1, null, 512)]), createVNode(unref(scrollable_area_default), {
				ref_key: "islandScrollArea",
				ref: islandScrollArea,
				orientation: "both",
				class: normalizeClass(["max-h-[inherit] max-w-[inherit]"]),
				"viewport-class": "overscroll-contain"
			}, {
				default: withCtx(() => [createBaseVNode("div", {
					ref_key: "islandContent",
					ref: islandContent,
					class: normalizeClass([
						"relative w-max flex",
						panelPresent.value ? "gap-3" : "",
						unref(islandLayoutClasses)
					])
				}, [createBaseVNode("div", {
					inert: !expanded.value,
					"aria-hidden": !expanded.value,
					class: normalizeClass(panelPresent.value ? "contents" : "pointer-events-none invisible absolute size-0 overflow-hidden [contain:strict]")
				}, [createVNode(unref(scrollable_area_default), {
					id: unref(menuId),
					ref_key: "menuScrollArea",
					ref: menuScrollArea,
					"data-testid": "controls-menu",
					orientation: "both",
					style: normalizeStyle(unref(panelStyle)),
					class: normalizeClass(["w-max shrink-0 rounded-2xl", panelPositionClasses.value]),
					"viewport-class": "overscroll-contain"
				}, {
					default: withCtx(() => [createBaseVNode("div", {
						ref_key: "menuContent",
						ref: menuContent,
						class: normalizeClass(["w-max", expanded.value ? "controls-menu-enter" : panelPresent.value ? "controls-menu-leave" : "opacity-0"]),
						style: normalizeStyle({ "--menu-offset": unref(motionOffset) }),
						onAnimationend: _cache[6] || (_cache[6] = withModifiers(($event) => panelPresent.value = expanded.value, ["self"]))
					}, [createBaseVNode("div", _hoisted_6, [menuView.value === "notifications" ? (openBlock(), createElementBlock("div", _hoisted_7, [createVNode(unref(inbox_panel_default), {
						messages: unref(notificationMessages),
						now: unref(now),
						unread: unref(notificationsUnread),
						loading: unref(notificationsLoading),
						error: unref(notificationsError),
						"has-more": unref(notificationsHasMore),
						surface: "drawer",
						onOpen: unref(inbox).markRead,
						onReadAll: unref(inbox).markAllRead,
						onRetry: unref(inbox).loadFirstPage,
						onLoadMore: unref(inbox).loadMore
					}, {
						leading: withCtx(() => [createVNode(unref(icon_button_default), {
							"data-testid": "controls-island-notifications-back",
							"aria-label": unref(t)("stage.notifications.back"),
							title: unref(t)("stage.notifications.back"),
							class: normalizeClass([
								"size-8 rounded-full outline-none",
								"text-neutral-600 hover:bg-black/5 hover:text-neutral-900",
								"dark:text-neutral-300 dark:hover:bg-white/5 dark:hover:text-white",
								"focus-visible:outline-2 focus-visible:outline-primary-400"
							]),
							onClick: showControls
						}, {
							default: withCtx(() => [..._cache[8] || (_cache[8] = [createBaseVNode("span", {
								"aria-hidden": "true",
								class: normalizeClass(["i-solar:alt-arrow-left-linear size-5"])
							}, null, -1)])]),
							_: 1
						}, 8, ["aria-label", "title"])]),
						_: 1
					}, 8, [
						"messages",
						"now",
						"unread",
						"loading",
						"error",
						"has-more",
						"onOpen",
						"onReadAll",
						"onRetry",
						"onLoadMore"
					])])) : createCommentVNode("", true), withDirectives(createBaseVNode("div", _hoisted_8, [
						createVNode(controls_island_auth_button_default, {
							active: expanded.value,
							"button-style": adjustStyleClasses.value.button,
							"icon-class": adjustStyleClasses.value.icon
						}, null, 8, [
							"active",
							"button-style",
							"icon-class"
						]),
						unref(notificationsSignedIn) ? (openBlock(), createElementBlock("button", {
							key: 0,
							type: "button",
							"data-testid": "controls-island-notifications",
							"aria-label": notificationsLabel.value,
							class: normalizeClass([
								"mb-1.5 flex items-center gap-2.5 rounded-xl px-3 py-2",
								"bg-black/4 hover:bg-black/8 dark:bg-white/4 dark:hover:bg-white/8",
								"text-sm text-neutral-800 dark:text-neutral-200",
								"cursor-pointer border-none outline-none transition-colors duration-200",
								"focus-visible:outline-2 focus-visible:outline-primary-500"
							]),
							onClick: showNotifications
						}, [
							createBaseVNode("span", {
								"aria-hidden": "true",
								class: normalizeClass(["i-solar:bell-outline shrink-0 text-neutral-500 dark:text-neutral-400", adjustStyleClasses.value.icon])
							}, null, 2),
							createBaseVNode("span", _hoisted_10, toDisplayString(unref(t)("stage.notifications.title")), 1),
							createVNode(unref(badge_default), {
								count: unref(notificationsUnread),
								"data-testid": "controls-island-notifications-count"
							}, null, 8, ["count"]),
							_cache[9] || (_cache[9] = createBaseVNode("span", {
								"aria-hidden": "true",
								class: normalizeClass(["i-solar:alt-arrow-right-outline size-4 shrink-0 text-neutral-400"])
							}, null, -1))
						], 8, _hoisted_9)) : createCommentVNode("", true),
						createBaseVNode("div", _hoisted_11, [createVNode(control_button_default,{"button-style":adjustStyleClasses.value.button,"data-testid":"gogh-character-settings-trigger","aria-label":"角色外观与动作设置",title:"角色外观与动作设置",onClick:()=>window.dispatchEvent(new CustomEvent('gogh-toggle-settings'))},{default:withCtx(()=>[createBaseVNode('span',{style:'font-size:11px;line-height:20px;white-space:nowrap'},'角色')]),_:1}),
							createVNode(control_button_tooltip_default, { "disable-hoverable-content": "" }, {
								tooltip: withCtx(() => [createTextVNode(toDisplayString(unref(t)("tamagotchi.stage.controls-island.open-settings")), 1)]),
								default: withCtx(() => [withDirectives((openBlock(), createBlock(control_button_default, {
									"button-style": adjustStyleClasses.value.button,
									"aria-label": unref(t)("tamagotchi.stage.controls-island.open-settings"),
									onClick: _cache[0] || (_cache[0] = ($event) => unref(openSettings)({ route: "/settings" }))
								}, {
									default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["i-solar:settings-minimalistic-outline text-neutral-800 dark:text-neutral-300", adjustStyleClasses.value.icon]) }, null, 2)]),
									_: 1
								}, 8, ["button-style", "aria-label"])), [[_directive_track_button, {
									name: "controls_island_action",
									action: "toggle_settings"
								}]])]),
								_: 1
							}),
							createVNode(control_button_tooltip_default, { "disable-hoverable-content": "" }, {
								tooltip: withCtx(() => [createTextVNode(toDisplayString(unref(t)("tamagotchi.stage.controls-island.switch-profile")), 1)]),
								default: withCtx(() => [createVNode(controls_island_profile_picker_default, {
									open: profileOpen.value,
									"onUpdate:open": _cache[1] || (_cache[1] = ($event) => profileOpen.value = $event),
									creating: profileCreationActive.value,
									"onUpdate:creating": _cache[2] || (_cache[2] = ($event) => profileCreationActive.value = $event),
									active: expanded.value,
									onInteractionChange: _cache[3] || (_cache[3] = ($event) => setOverlay("profile-picker", $event))
								}, {
									default: withCtx(({ toggle }) => [withDirectives((openBlock(), createBlock(control_button_default, {
										"button-style": adjustStyleClasses.value.button,
										"aria-label": unref(t)("tamagotchi.stage.controls-island.switch-profile"),
										onClick: toggle
									}, {
										default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["i-solar:emoji-funny-square-broken text-neutral-800 dark:text-neutral-300", adjustStyleClasses.value.icon]) }, null, 2)]),
										_: 1
									}, 8, [
										"button-style",
										"aria-label",
										"onClick"
									])), [[_directive_track_button, {
										name: "controls_island_action",
										action: "toggle_profile_picker"
									}]])]),
									_: 1
								}, 8, [
									"open",
									"creating",
									"active"
								])]),
								_: 1
							}),
							createVNode(control_button_tooltip_default, { "disable-hoverable-content": "" }, {
								tooltip: withCtx(() => [createTextVNode(toDisplayString(unref(t)("tamagotchi.stage.controls-island.refresh")), 1)]),
								default: withCtx(() => [withDirectives((openBlock(), createBlock(control_button_default, {
									"button-style": adjustStyleClasses.value.button,
									"aria-label": unref(t)("tamagotchi.stage.controls-island.refresh"),
									onClick: refreshWindow
								}, {
									default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["i-solar:refresh-linear text-neutral-800 dark:text-neutral-300", adjustStyleClasses.value.icon]) }, null, 2)]),
									_: 1
								}, 8, ["button-style", "aria-label"])), [[_directive_track_button, {
									name: "controls_island_action",
									action: "refresh_window"
								}]])]),
								_: 1
							}),
							createVNode(control_button_tooltip_default, { "disable-hoverable-content": "" }, {
								tooltip: withCtx(() => [createTextVNode(toDisplayString(unref(t)("tamagotchi.stage.controls-island.center-main-window")), 1)]),
								default: withCtx(() => [withDirectives((openBlock(), createBlock(control_button_default, {
									"button-style": adjustStyleClasses.value.button,
									"aria-label": unref(t)("tamagotchi.stage.controls-island.center-main-window"),
									onClick: resetMainWindowPosition
								}, {
									default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["i-solar:target-linear text-neutral-800 dark:text-neutral-300", adjustStyleClasses.value.icon]) }, null, 2)]),
									_: 1
								}, 8, ["button-style", "aria-label"])), [[_directive_track_button, {
									name: "controls_island_action",
									action: "center_main_window"
								}]])]),
								_: 1
							}),
							createVNode(control_button_tooltip_default, { "disable-hoverable-content": "" }, {
								tooltip: withCtx(() => [createTextVNode(toDisplayString(themeLabel.value), 1)]),
								default: withCtx(() => [withDirectives((openBlock(), createBlock(control_button_default, {
									"button-style": adjustStyleClasses.value.button,
									"aria-label": themeLabel.value,
									onClick: unref(switchToNextTheme)
								}, {
									default: withCtx(() => [createVNode(Transition, {
										name: "fade",
										mode: "out-in"
									}, {
										default: withCtx(() => [(openBlock(), createElementBlock("div", {
											key: unref(themeMode),
											class: normalizeClass([
												themeIcons[unref(themeMode)],
												"text-neutral-800 dark:text-neutral-300",
												adjustStyleClasses.value.icon
											])
										}, null, 2))]),
										_: 1
									})]),
									_: 1
								}, 8, [
									"button-style",
									"aria-label",
									"onClick"
								])), [[_directive_track_button, {
									name: "controls_island_action",
									action: themeActions[unref(themeMode)]
								}]])]),
								_: 1
							}),
							createVNode(control_button_tooltip_default, { "disable-hoverable-content": "" }, {
								tooltip: withCtx(() => [createTextVNode(toDisplayString(unref(alwaysOnTop) ? unref(t)("tamagotchi.stage.controls-island.unpin-from-top") : unref(t)("tamagotchi.stage.controls-island.pin-on-top")), 1)]),
								default: withCtx(() => [withDirectives((openBlock(), createBlock(control_button_default, {
									"button-style": adjustStyleClasses.value.button,
									"aria-label": unref(alwaysOnTop) ? unref(t)("tamagotchi.stage.controls-island.unpin-from-top") : unref(t)("tamagotchi.stage.controls-island.pin-on-top"),
									onClick: toggleAlwaysOnTop
								}, {
									default: withCtx(() => [unref(alwaysOnTop) ? (openBlock(), createElementBlock("div", {
										key: 0,
										class: normalizeClass(["i-solar:pin-bold text-neutral-800 dark:text-neutral-300", adjustStyleClasses.value.icon])
									}, null, 2)) : (openBlock(), createElementBlock("div", {
										key: 1,
										class: normalizeClass(["i-solar:pin-linear text-neutral-800 dark:text-neutral-300 opacity-50", adjustStyleClasses.value.icon])
									}, null, 2))]),
									_: 1
								}, 8, ["button-style", "aria-label"])), [[_directive_track_button, {
									name: "controls_island_action",
									action: unref(alwaysOnTop) ? "unpin_from_top" : "pin_on_top"
								}]])]),
								_: 1
							}),
							createVNode(controls_island_fade_on_hover_default, {
								"icon-class": adjustStyleClasses.value.icon,
								"button-style": adjustStyleClasses.value.button
							}, null, 8, ["icon-class", "button-style"]),
							createVNode(control_button_tooltip_default, { "disable-hoverable-content": "" }, {
								tooltip: withCtx(() => [createTextVNode(toDisplayString(unref(t)("tamagotchi.stage.controls-island.open-hearing-controls")), 1)]),
								default: withCtx(() => [createVNode(unref(hearing_config_dialog_default), {
									show: blockingOverlays.has("hearing"),
									"onUpdate:show": _cache[4] || (_cache[4] = ($event) => setOverlay("hearing", $event))
								}, {
									default: withCtx(() => [createVNode(control_button_default, {
										"data-testid": "controls-island-hearing-controls",
										"button-style": adjustStyleClasses.value.button,
										"aria-label": unref(t)("tamagotchi.stage.controls-island.open-hearing-controls")
									}, {
										default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["i-solar:microphone-3-linear text-neutral-800 dark:text-neutral-300", adjustStyleClasses.value.icon]) }, null, 2)]),
										_: 1
									}, 8, ["button-style", "aria-label"])]),
									_: 1
								}, 8, ["show"])]),
								_: 1
							}),
							createVNode(control_button_tooltip_default, { "disable-hoverable-content": "" }, {
								tooltip: withCtx(() => [createTextVNode(toDisplayString(unref(t)("tamagotchi.stage.controls-island.close")), 1)]),
								default: withCtx(() => [withDirectives((openBlock(), createBlock(control_button_default, {
									"button-style": adjustStyleClasses.value.button,
									"aria-label": unref(t)("tamagotchi.stage.controls-island.close"),
									class: normalizeClass(["hover:bg-red-500 hover:text-white"]),
									onClick: _cache[5] || (_cache[5] = () => unref(quitApp)())
								}, {
									default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["i-solar:close-circle-outline", adjustStyleClasses.value.icon]) }, null, 2)]),
									_: 1
								}, 8, ["button-style", "aria-label"])), [[_directive_track_button, {
									name: "controls_island_action",
									action: "close_app"
								}]])]),
								_: 1
							})
						])
					], 512), [[vShow, menuView.value === "controls"]])])], 38)]),
					_: 1
				}, 8, [
					"id",
					"style",
					"class"
				])], 10, _hoisted_5$1), createBaseVNode("div", {
					ref: "mainControls",
					"data-testid": "main-controls",
					class: normalizeClass(["shrink-0", mainControlsLayoutClasses.value])
				}, [
					createVNode(control_button_tooltip_default, { side: "inward" }, {
						tooltip: withCtx(() => [createTextVNode(toDisplayString(expanded.value ? unref(t)("tamagotchi.stage.controls-island.collapse") : unref(t)("tamagotchi.stage.controls-island.expand")), 1)]),
						default: withCtx(() => [withDirectives((openBlock(), createBlock(control_button_default, {
							"button-style": adjustStyleClasses.value.button,
							"aria-expanded": expanded.value,
							"aria-controls": unref(menuId),
							"aria-label": expanded.value ? unref(t)("tamagotchi.stage.controls-island.collapse") : unref(t)("tamagotchi.stage.controls-island.expand"),
							class: normalizeClass(["relative"]),
							onClick: toggleControls
						}, {
							default: withCtx(() => [createBaseVNode("div", {
								class: normalizeClass([
									"i-solar:alt-arrow-up-line-duotone scale-110 transition-all duration-300",
									"text-neutral-800 dark:text-neutral-300",
									adjustStyleClasses.value.icon
								]),
								style: normalizeStyle({ transform: `rotate(${unref(arrowRotation)}deg)` })
							}, null, 6), unref(notificationsUnread) > 0 ? (openBlock(), createBlock(unref(badge_default), {
								key: 0,
								dot: "",
								"data-testid": "controls-island-notifications-dot",
								class: normalizeClass(["pointer-events-none absolute right-1 top-1 ring-2 ring-neutral-100 dark:ring-neutral-900"])
							})) : createCommentVNode("", true)]),
							_: 1
						}, 8, [
							"button-style",
							"aria-expanded",
							"aria-controls",
							"aria-label"
						])), [[_directive_track_button, {
							name: "controls_island_action",
							action: expanded.value ? "collapse_controls" : "expand_controls"
						}]])]),
						_: 1
					}),
					unref(false) ? (openBlock(), createBlock(status_island_default, {
						key: 0,
						"button-style": adjustStyleClasses.value.button,
						"icon-class": adjustStyleClasses.value.icon
					}, null, 8, ["button-style", "icon-class"])) : createCommentVNode("", true),
					createVNode(controls_island_chat_button_default, {
						"button-style": adjustStyleClasses.value.button,
						"icon-class": adjustStyleClasses.value.icon
					}, null, 8, ["button-style", "icon-class"]),
					createVNode(control_button_tooltip_default, { side: "inward" }, {
						tooltip: withCtx(() => [createTextVNode(toDisplayString(microphoneLabel.value), 1)]),
						default: withCtx(() => [createVNode(control_button_default, {
							"data-testid": "controls-island-microphone",
							"button-style": adjustStyleClasses.value.button,
							"aria-label": microphoneLabel.value,
							"aria-pressed": unref(listening),
							"aria-busy": microphonePending.value,
							disabled: microphonePending.value,
							onClick: toggleMicrophone
						}, {
							default: withCtx(() => [createVNode(Transition, {
								name: "fade",
								mode: "out-in"
							}, {
								default: withCtx(() => [unref(listening) ? (openBlock(), createBlock(indicator_mic_volume_default, {
									key: 0,
									class: normalizeClass(adjustStyleClasses.value.icon)
								}, null, 8, ["class"])) : (openBlock(), createElementBlock("div", {
									key: 1,
									class: normalizeClass(["i-ph:microphone-slash text-neutral-800 dark:text-neutral-300", adjustStyleClasses.value.icon])
								}, null, 2))]),
								_: 1
							})]),
							_: 1
						}, 8, [
							"button-style",
							"aria-label",
							"aria-pressed",
							"aria-busy",
							"disabled"
						])]),
						_: 1
					}),
					createVNode(controls_island_speech_mute_default, {
						"button-style": adjustStyleClasses.value.button,
						"icon-class": adjustStyleClasses.value.icon
					}, null, 8, ["button-style", "icon-class"]),
					createVNode(control_button_tooltip_default, { side: "inward" }, {
						tooltip: withCtx(() => [createTextVNode(toDisplayString(unref(t)("tamagotchi.stage.controls-island.drag-to-move-window")), 1)]),
						default: withCtx(() => [createVNode(control_button_default, {
							"button-style": adjustStyleClasses.value.button,
							class: normalizeClass(["cursor-move", { "drag-region": unref(isLinux) }]),
							onMousedown: _cache[7] || (_cache[7] = ($event) => unref(startDraggingWindow)?.())
						}, {
							default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(["i-ph:arrows-out-cardinal text-neutral-800 dark:text-neutral-300", adjustStyleClasses.value.icon]) }, null, 2)]),
							_: 1
						}, 8, ["button-style", "class"])]),
						_: 1
					})
				], 2)], 2)]),
				_: 1
			}, 512)], 10, _hoisted_1$2);
		};
	}
}), [["__scopeId", "data-v-f4665f99"]]);
//#endregion
//#region src/renderer/composables/use-stage-painted-mask.ts
/**
* How long one mask serves captures before the stage canvas is read again, in
* milliseconds.
*
* A read costs about 3.4 ms at 20 captures per second, more than everything
* else in a capture together, and reading a smaller region does not help. The
* silhouette changes far more slowly than the screen behind it, so this
* interval is deliberately longer than the capture interval: raising the
* capture rate must not raise the cost of this read.
*
* Moving the window still invalidates the cache at once, because a mask read at
* another position indexes the wrong frame pixels. A drag therefore pays one
* read per capture for as long as it lasts.
*/
var paintedAlphaIntervalMs = 250;
/**
* Everything the mask covers besides the character.
*
* The marker covers the overlays AIRI places itself. Floating content is
* different: reka-ui mounts tooltip, popover and menu content and dialogs on
* the body through a portal, outside every marked root, so a marker on the
* island that opened them never reaches them. The mask recognizes them by what
* reka-ui stamps on them instead.
*
* NOTICE:
* The popper selector is a reka-ui internal, not a documented contract.
* Root cause: reka-ui portals floating content to the body with no hook for
* the opener to tag it.
* Source: `data-reka-popper-content-wrapper` in reka-ui's popper content,
* see node_modules/reka-ui/dist and use-stage-painted-mask.browser.test.ts,
* which mounts a real tooltip to pin the name to the installed version.
* Removal: when reka-ui exposes a way to pass attributes through the portal,
* mark the content at the opener and drop the selector.
*/
var paintedOverlaySelector = [
	`[data-ambient-light-opaque]`,
	"[data-reka-popper-content-wrapper]",
	"[role=\"dialog\"]",
	"[role=\"alertdialog\"]"
].join(", ");
/**
* Alpha above which a pixel counts towards the subject bounds.
*
* The softest edges of a character fade to nothing over several pixels, and a
* grid this coarse turns that fade into one dim cell. Counting those cells
* would grow the bounds by a cell on every side for no light in return.
*/
var subjectAlphaFloor = 8;
/**
* Reports which pixels of the stage window AIRI paints, one alpha byte per
* pixel of the screen sample frame.
*
* The screen sampler subtracts this mask, so that it measures the desktop
* behind the window instead of AIRI's own output. Two things need covering:
* the character, whose exact silhouette including soft edges comes from the
* stage canvas, and the overlays, which are plain DOM and count as rectangles.
*/
function useStagePaintedMask(sources) {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d", { willReadFrequently: true });
	let cache;
	/**
	* The cache answers until {@link paintedAlphaIntervalMs} passes, the window
	* rectangle moves, or the sample grid changes size.
	*
	* @param windowRectangle - The stage window on the sample frame, in frame units.
	* @param now - The capture time, on the same clock across calls.
	*/
	function maskFor(windowRectangle, now) {
		followSampleGrid();
		const cached = cache;
		if (cached !== void 0 && now - cached.readAt < paintedAlphaIntervalMs && cached.read.alpha.length === canvas.width * canvas.height && sameRectangle(cached.window, windowRectangle)) return cached.read;
		const read = readPaintedAlpha(windowRectangle);
		cache = read ? {
			read,
			readAt: now,
			window: windowRectangle
		} : void 0;
		return read;
	}
	/** A caller that stops capturing calls this: the window may paint something else before it resumes. */
	function reset() {
		cache = void 0;
	}
	/** A mask on any grid but the caller's cannot index the frame. */
	function followSampleGrid() {
		const { width, height } = sources.sampleGrid();
		if (canvas.width === width && canvas.height === height) return;
		canvas.width = width;
		canvas.height = height;
	}
	/**
	* Missing either part biases the measurement: the character feeds the filter
	* its own output, and an overlay feeds it AIRI's interface colors.
	*/
	function readPaintedAlpha(windowRectangle) {
		const stageCanvas = sources.stageCanvas?.();
		if (!context || !stageCanvas || stageCanvas.width === 0) return void 0;
		const left = windowRectangle.x * canvas.width;
		const top = windowRectangle.y * canvas.height;
		const width = windowRectangle.width * canvas.width;
		const height = windowRectangle.height * canvas.height;
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(stageCanvas, left, top, width, height);
		const painted = context.getImageData(0, 0, canvas.width, canvas.height).data;
		const alpha = new Uint8ClampedArray(canvas.width * canvas.height);
		for (let index = 0; index < alpha.length; index += 1) alpha[index] = painted[index * 4 + 3];
		const subject = subjectBoundsOf(alpha, left, top, width, height);
		const stageWindow = sources.windowSize();
		const windowWidth = Math.max(1, stageWindow.width);
		const windowHeight = Math.max(1, stageWindow.height);
		for (const element of document.querySelectorAll(paintedOverlaySelector)) {
			const bounds = element.getBoundingClientRect();
			if (bounds.width === 0 || bounds.height === 0) continue;
			fillRectangle(alpha, left + bounds.left / windowWidth * width, top + bounds.top / windowHeight * height, bounds.width / windowWidth * width, bounds.height / windowHeight * height);
		}
		return {
			alpha,
			subject
		};
	}
	/**
	* Bounds of what the renderer drew, in window units, from the alpha alone.
	*
	* Reading the canvas rather than asking the renderer keeps this independent
	* of what is on the stage: a Live2D model, a VRM, or anything else that
	* leaves pixels behind answers the same way. Nothing drawn returns the whole
	* window, which is the same rectangle the maps used before they were placed
	* around the subject.
	*/
	function subjectBoundsOf(alpha, left, top, width, height) {
		const startColumn = Math.max(0, Math.floor(left));
		const startRow = Math.max(0, Math.floor(top));
		const endColumn = Math.min(canvas.width, Math.ceil(left + width));
		const endRow = Math.min(canvas.height, Math.ceil(top + height));
		let minColumn = endColumn;
		let minRow = endRow;
		let maxColumn = startColumn;
		let maxRow = startRow;
		for (let row = startRow; row < endRow; row += 1) for (let column = startColumn; column < endColumn; column += 1) {
			if (alpha[row * canvas.width + column] <= subjectAlphaFloor) continue;
			if (column < minColumn) minColumn = column;
			if (column > maxColumn) maxColumn = column;
			if (row < minRow) minRow = row;
			if (row > maxRow) maxRow = row;
		}
		if (minColumn > maxColumn || minRow > maxRow) return wholeWindowRectangle;
		return {
			x: clamp((minColumn - left) / Math.max(1, width), 0, 1),
			y: clamp((minRow - top) / Math.max(1, height), 0, 1),
			width: clamp((maxColumn + 1 - minColumn) / Math.max(1, width), 0, 1),
			height: clamp((maxRow + 1 - minRow) / Math.max(1, height), 0, 1)
		};
	}
	function fillRectangle(alpha, x, y, width, height) {
		const startColumn = Math.max(0, Math.floor(x));
		const startRow = Math.max(0, Math.floor(y));
		const endColumn = Math.min(canvas.width, Math.ceil(x + width));
		const endRow = Math.min(canvas.height, Math.ceil(y + height));
		for (let row = startRow; row < endRow; row += 1) for (let column = startColumn; column < endColumn; column += 1) alpha[row * canvas.width + column] = 255;
	}
	return {
		maskFor,
		reset
	};
}
function sameRectangle(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
//#endregion
//#region src/renderer/components/stage-islands/resource-status-island/index.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: /*@__PURE__*/ normalizeClass(["pointer-events-none fixed left-0 top-3 w-full", "flex flex-col items-center"]) };
var _hoisted_2$1 = {
	key: 0,
	class: /*@__PURE__*/ normalizeClass(["i-solar:danger-triangle-bold-duotone pointer-events-none", "text-orange-600 dark:text-orange-400"])
};
var _hoisted_3$1 = {
	key: 1,
	class: /*@__PURE__*/ normalizeClass(["i-svg-spinners:pulse-ring pointer-events-none"])
};
var _hoisted_4 = { class: /*@__PURE__*/ normalizeClass(["pointer-events-none select-none pr-2"]) };
var _hoisted_5 = { class: /*@__PURE__*/ normalizeClass([
	"w-[calc(100dvw-1.5rem)] sm:w-[calc(75dvw-1.5rem)] md:sm:w-[calc(50dvw-1.5rem)]",
	"rounded-xl p-3 shadow-md backdrop-blur-md",
	"bg-white/80 dark:bg-neutral-900/80"
]) };
//#endregion
//#region src/renderer/components/stage-islands/resource-status-island/index.vue
var resource_status_island_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	setup(__props) {
		const { active: modelAssets } = useModelAssetStatus();
		const { t } = useI18n();
		const hasActiveResources = computed(() => modelAssets.value.length > 0);
		const hasAssetError = computed(() => modelAssets.value.some((model) => model.state === "error"));
		const loadingProgressOpen = shallowRef(false);
		watch(hasActiveResources, (newVal) => {
			loadingProgressOpen.value = newVal;
		}, { immediate: true });
		function handleClick() {
			loadingProgressOpen.value = !loadingProgressOpen.value;
		}
		function retry(id) {
			ensureSherpawModelAssets(id).catch(() => {});
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [hasActiveResources.value ? (openBlock(), createBlock(unref(TooltipProvider_default), {
				key: 0,
				"delay-duration": 150
			}, {
				default: withCtx(() => [createVNode(unref(TooltipRoot_default), {
					open: loadingProgressOpen.value,
					"disable-closing-trigger": "",
					"onUpdate:open": _cache[0] || (_cache[0] = (state) => loadingProgressOpen.value = state)
				}, {
					default: withCtx(() => [createVNode(unref(TooltipTrigger_default), null, {
						default: withCtx(() => [createVNode(Transition, { name: "fade" }, {
							default: withCtx(() => [hasActiveResources.value ? (openBlock(), createElementBlock("div", normalizeProps({
								key: 0,
								[unref("data-ambient-light-opaque") || ""]: true,
								class: [
									"pointer-events-auto mb-1 flex w-fit cursor-pointer items-center gap-2",
									"rounded-full px-2 py-1 text-sm shadow-md backdrop-blur-md",
									"bg-white/80 dark:bg-neutral-900/80"
								],
								onClick: handleClick
							}), [hasAssetError.value ? (openBlock(), createElementBlock("div", _hoisted_2$1)) : (openBlock(), createElementBlock("div", _hoisted_3$1)), createBaseVNode("div", _hoisted_4, toDisplayString(hasAssetError.value ? unref(t)("tamagotchi.stage.resource-island.failed") : unref(t)("tamagotchi.stage.resource-island.loading")), 1)], 16)) : createCommentVNode("", true)]),
							_: 1
						})]),
						_: 1
					}), createVNode(unref(TooltipPortal_default), null, {
						default: withCtx(() => [createVNode(unref(transition_vertical_default), null, {
							default: withCtx(() => [createVNode(unref(TooltipContent_default), { class: normalizeClass(["resource-status-island-tooltip", "flex w-fit justify-center"]) }, {
								default: withCtx(() => [createBaseVNode("div", _hoisted_5, [createVNode(unref(model_asset_progress_default), {
									statuses: unref(modelAssets),
									onRetry: retry
								}, null, 8, ["statuses"])])]),
								_: 1
							})]),
							_: 1
						})]),
						_: 1
					})]),
					_: 1
				}, 8, ["open"])]),
				_: 1
			})) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/renderer/composables/model-settings-runtime-owner.ts
/**
* Owns the model-settings channel for the renderer that controls the active model.
*
* The owner publishes runtime snapshots when they change and when a settings window asks.
*/
function useModelSettingsRuntimeOwner(options) {
	const context = options.context ?? getModelSettingsRuntimeContext();
	function postSnapshot(snapshot) {
		context.emit(modelSettingsRuntimeSnapshotChanged, snapshot).catch((error) => {
			console.warn("[Model Settings Runtime] Failed to publish the runtime snapshot:", error);
		});
	}
	watch(() => toValue(options.runtimeSnapshot), (snapshot) => {
		postSnapshot(snapshot);
	}, { immediate: true });
	const stopSnapshotRequests = context.on(modelSettingsRuntimeSnapshotRequested, () => {
		postSnapshot(toValue(options.runtimeSnapshot));
	});
	onBeforeUnmount(() => {
		stopSnapshotRequests();
		context.emit(modelSettingsRuntimeOwnerGone, { ownerInstanceId: options.ownerInstanceId }).catch((error) => {
			console.warn("[Model Settings Runtime] Failed to publish owner shutdown:", error);
		});
	});
}
//#endregion
//#region src/renderer/composables/use-screen-ambient-light.ts
var sourcesOptions = {
	types: ["screen"],
	thumbnailSize: {
		width: 0,
		height: 0
	}
};
/**
* Oversampling of the capture stream relative to the sample canvas.
*
* The stream is requested at this multiple of the sample width, so that the
* canvas downscale averages a few source pixels per sample instead of picking
* one. 4 keeps a 128-pixel sample at 512 pixels, which is small enough that the
* per-frame readback costs well under a millisecond.
*/
var captureOversampling = 4;
/**
* Widest stream the capture asks for, in pixels.
*
* Above this width the oversampling drops below 4, which a large sample frame
* does not need. The renderer pays for every stream pixel twice, once in the
* decode and once in the draw into the sample canvas: at 1024 x 576 and 20
* frames per second the draw alone took 4.4 ms per frame.
*/
var maximumCaptureWidth = 512;
/**
* How long the window has to sit on another display before the capture
* follows it, in milliseconds.
*
* A capture is pinned to the display it opened on. Dragging the window across
* the seam flips the dominant display on every frame near the midpoint, and a
* restart costs a new getDisplayMedia call and a gap in the light, so the
* capture waits until the window has settled on the other side.
*/
var displaySettleMs = 500;
/**
* Captures and samples the display behind the stage window for ambient lighting.
*
* Capture state lives in this composable. The store receives only the smoothed
* environment. The lifecycle is:
*
* - `enabled` or `source` changes stop the current capture and start the next.
* - The capture stream is constrained to a small frame at the sample rate, so
*   the renderer never receives full-resolution frames it does not use.
* - Each delivered frame samples once through `requestVideoFrameCallback`, so
*   the sample rate equals the stream rate and no timer samples a stale frame.
* - A stream that ends outside this composable disables the feature and reports
*   the reason through diagnostics.
*/
function useScreenAmbientLight(sources = {}) {
	const settings = useSettingsScreenAmbientLight();
	const { screenAmbientLightCaptureIntervalMs, screenAmbientLightEnabled, screenAmbientLightForcedColor, screenAmbientLightNeutralColorWeight, screenAmbientLightResponseMs, screenAmbientLightSampleWidth, screenAmbientLightSource } = storeToRefs(settings);
	const ambientLight = useScreenAmbientLightEnvironment();
	const displays = useElectronAllDisplays();
	const windowBounds = useElectronWindowBounds();
	const capturedDisplay = shallowRef();
	const activeStream = shallowRef();
	const video = document.createElement("video");
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d", { willReadFrequently: true });
	const paintedMask = useStagePaintedMask({
		stageCanvas: sources.stageCanvas,
		sampleGrid: () => ({
			width: canvas.width,
			height: canvas.height
		}),
		windowSize: () => ({
			width: windowBounds.width.value,
			height: windowBounds.height.value
		})
	});
	const { data: diagnosticsChannelEvent, post: postDiagnosticsChannelEvent } = useBroadcastChannel({ name: screenAmbientLightDiagnosticsChannelName });
	let startVersion = 0;
	let frameCallbackHandle = 0;
	let lastSampleTime = 0;
	let diagnosticsWatchedUntil = 0;
	let lastCaptureError;
	let lastDiagnostics;
	video.muted = true;
	video.playsInline = true;
	const hasWindowBounds = computed(() => windowBounds.width.value > 0 && windowBounds.height.value > 0);
	const samplingOptions = computed(() => ({ neutralColorWeight: screenAmbientLightNeutralColorWeight.value }));
	const captureFrameRate = computed(() => clamp(1e3 / Math.max(1, screenAmbientLightCaptureIntervalMs.value), 1, 30));
	const { selectWithSource, checkMacOSPermission, requestMacOSPermission } = useElectronScreenCapture(getElectronEventaContext(), sourcesOptions);
	const dominantDisplay = computed(() => {
		if (!hasWindowBounds.value || displays.value.length === 0) return void 0;
		return findDominantDisplayArea(currentWindowBounds(), displays.value);
	});
	watch([screenAmbientLightEnabled, screenAmbientLightSource], () => void restart(), { immediate: true });
	watchDebounced([dominantDisplay, capturedDisplay], ([display, captured]) => {
		if (!display || !captured) return;
		if (display.id === captured.id && sameBounds(display.bounds, captured.bounds)) return;
		restart();
	}, { debounce: displaySettleMs });
	async function restart() {
		const version = ++startVersion;
		stop();
		if (!screenAmbientLightEnabled.value) {
			publishDiagnostics(lastCaptureError ? "error" : "disabled");
			return;
		}
		lastCaptureError = void 0;
		if (screenAmbientLightSource.value === "forced-color") {
			applyForcedColor();
			return;
		}
		publishDiagnostics("starting");
		try {
			await start(version);
		} catch (error) {
			if (version !== startVersion) return;
			lastCaptureError = errorMessageFrom(error) ?? "Unknown error";
			console.error(`Failed to start screen ambient light: ${lastCaptureError}`);
			publishDiagnostics("error");
			screenAmbientLightEnabled.value = false;
		}
	}
	watch(diagnosticsChannelEvent, (event) => {
		if (event?.type !== "request-current") return;
		diagnosticsWatchedUntil = performance.now() + screenAmbientLightDiagnosticsWatchMs;
		if (lastDiagnostics) postDiagnosticsChannelEvent({
			type: "snapshot",
			snapshot: lastDiagnostics
		});
		else publishDiagnostics("disabled");
	});
	watch(screenAmbientLightForcedColor, () => {
		if (screenAmbientLightEnabled.value && screenAmbientLightSource.value === "forced-color") applyForcedColor();
	});
	watch([captureFrameRate, screenAmbientLightSampleWidth], async ([frameRate]) => {
		const track = activeStream.value?.getVideoTracks()[0];
		const display = capturedDisplay.value;
		if (!track || !display) return;
		try {
			await track.applyConstraints(captureConstraints(display.bounds, frameRate));
		} catch (error) {
			console.warn(`Failed to update the screen ambient light capture constraints: ${errorMessageFrom(error)}`);
		}
	});
	onScopeDispose(() => {
		startVersion += 1;
		stop();
	});
	async function start(version) {
		if (!context) throw new Error("Failed to create the screen sampling canvas");
		if (window.platform === "darwin") {
			if (await checkMacOSPermission() === "not-determined") await requestMacOSPermission();
		}
		if (displays.value.length === 0) await until(displays).toMatch((currentDisplays) => currentDisplays.length > 0);
		if (!hasWindowBounds.value) await until(hasWindowBounds).toBe(true);
		if (version !== startVersion) return;
		const display = findDominantDisplayArea(currentWindowBounds(), displays.value);
		if (!display) throw new Error("No display is available for screen ambient light");
		const stream = await selectWithSource((sources) => {
			const screens = sources.filter((candidate) => candidate.id.startsWith("screen:"));
			if (screens.length === 0) throw new Error(window.platform === "darwin" ? "No screen-capture source is available. Check the screen-recording permission for AIRI." : "No screen-capture source is available.");
			const matched = screens.find((candidate) => candidate.display_id === String(display.id));
			if (matched) return matched.id;
			if (screens.length === 1) return screens[0].id;
			throw new Error(`No screen-capture source matches display ${display.id}.`);
		}, async () => await navigator.mediaDevices.getDisplayMedia({
			video: captureConstraints(display.bounds, captureFrameRate.value),
			audio: false
		}));
		if (version !== startVersion) {
			stream.getTracks().forEach((track) => track.stop());
			return;
		}
		capturedDisplay.value = display;
		activeStream.value = stream;
		stream.getVideoTracks().forEach((track) => {
			track.addEventListener("ended", () => {
				if (activeStream.value === stream) {
					lastCaptureError = "The screen-capture stream ended.";
					screenAmbientLightEnabled.value = false;
				}
			}, { once: true });
		});
		video.srcObject = stream;
		await waitForVideo(video);
		if (version !== startVersion) return;
		lastSampleTime = performance.now();
		scheduleFrameSample(version);
	}
	/**
	* Width and height are maximums in the display aspect, so Chromium scales the
	* frame down without cropping it. The frame rate matches the sample interval.
	* Both were verified against Electron 43: a request for 320x180 at 5 fps
	* delivered 320x180 frames at about 6 fps, while an unconstrained request
	* delivered the full 5120x2880 display at 30 fps.
	*/
	function captureConstraints(display, frameRate) {
		const aspect = display.width / Math.max(1, display.height);
		const width = Math.min(display.width, maximumCaptureWidth, Math.round(screenAmbientLightSampleWidth.value * captureOversampling));
		return {
			width: { max: width },
			height: { max: Math.max(1, Math.round(width / aspect)) },
			frameRate: { max: frameRate }
		};
	}
	function scheduleFrameSample(version) {
		frameCallbackHandle = video.requestVideoFrameCallback(() => {
			if (version !== startVersion) return;
			sample();
			scheduleFrameSample(version);
		});
	}
	function stop() {
		if (frameCallbackHandle !== 0) {
			video.cancelVideoFrameCallback(frameCallbackHandle);
			frameCallbackHandle = 0;
		}
		const stream = activeStream.value;
		activeStream.value = void 0;
		capturedDisplay.value = void 0;
		video.pause();
		video.srcObject = null;
		stream?.getTracks().forEach((track) => track.stop());
		paintedMask.reset();
		ambientLight.reset();
	}
	/**
	* Sizes the sample canvas so that a frame pixel is square on screen.
	*
	* The track already delivers the display aspect, so matching it means the
	* measurement never stretches the frame. Stretching made the blur oval and
	* weighed the squashed axis more, which moved the map mean and the exposure
	* whenever a light moved between the sides and the top.
	*/
	function followVideoShape() {
		const width = Math.max(1, Math.round(screenAmbientLightSampleWidth.value));
		const height = Math.max(1, Math.round(width * video.videoHeight / Math.max(1, video.videoWidth)));
		if (canvas.width === width && canvas.height === height) return;
		canvas.width = width;
		canvas.height = height;
		paintedMask.reset();
	}
	function sample() {
		if (!context || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
		const display = capturedDisplay.value;
		if (!display) return;
		followVideoShape();
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		const frame = context.getImageData(0, 0, canvas.width, canvas.height);
		const now = performance.now();
		const excludedWindow = normalizeWindowBounds(display.bounds, currentWindowBounds());
		const painted = paintedMask.maskFor(excludedWindow, now);
		const subjectInWindow = painted?.subject ?? wholeWindowRectangle;
		const subjectOnDisplay = {
			x: excludedWindow.x + subjectInWindow.x * excludedWindow.width,
			y: excludedWindow.y + subjectInWindow.y * excludedWindow.height,
			width: subjectInWindow.width * excludedWindow.width,
			height: subjectInWindow.height * excludedWindow.height
		};
		const result = sampleScreenAmbientLight(frame, {
			exclude: excludedWindow,
			subject: subjectOnDisplay,
			paintedAlpha: painted?.alpha
		}, samplingOptions.value);
		const nextEnvironment = ambientLight.active ? smoothAmbientLightEnvironment(ambientLight.environment, result.environment, now - lastSampleTime, screenAmbientLightResponseMs.value) : result.environment;
		lastSampleTime = now;
		ambientLight.setEnvironment(nextEnvironment, subjectInWindow);
		const watched = now < diagnosticsWatchedUntil;
		publishDiagnostics("capturing", {
			frame: watched ? {
				width: frame.width,
				height: frame.height,
				data: frame.data.slice()
			} : void 0,
			excludedRegion: excludedWindow,
			subjectRegion: subjectOnDisplay,
			sampling: {
				...result.diagnostics,
				targetEnvironment: result.environment,
				appliedEnvironment: nextEnvironment
			}
		}, watched);
	}
	function applyForcedColor() {
		const sample = ambientLightSampleFromHex(screenAmbientLightForcedColor.value);
		if (!sample) {
			lastCaptureError = "The forced color must use #RRGGBB or #RRGGBBAA format.";
			console.error(`Failed to apply forced ambient light: ${lastCaptureError}`);
			ambientLight.reset();
			publishDiagnostics("error");
			return;
		}
		lastCaptureError = void 0;
		const environment = uniformAmbientLightEnvironment(sample);
		ambientLight.setEnvironment(environment);
		publishDiagnostics("forced-color", { sampling: {
			totalPixelCount: 0,
			excludedPixelCount: 0,
			transparentPixelCount: 0,
			acceptedPixelCount: 0,
			seeThroughPixelCount: 0,
			targetEnvironment: environment,
			appliedEnvironment: environment
		} });
	}
	function currentWindowBounds() {
		return {
			x: windowBounds.x.value,
			y: windowBounds.y.value,
			width: windowBounds.width.value,
			height: windowBounds.height.value
		};
	}
	/**
	* Records a snapshot and, unless `post` says otherwise, sends it.
	*
	* A lifecycle change always sends, because a viewer has to learn that the
	* capture started, stopped, or failed. A per-frame update sends only while a
	* viewer keeps asking for one.
	*/
	function publishDiagnostics(status, details = {}, post = true) {
		const display = capturedDisplay.value;
		const snapshot = {
			publishedAt: Date.now(),
			status,
			source: screenAmbientLightSource.value,
			error: lastCaptureError,
			display: display ? {
				id: display.id,
				bounds: { ...display.bounds }
			} : void 0,
			windowBounds: currentWindowBounds(),
			videoSize: video.videoWidth > 0 && video.videoHeight > 0 ? {
				width: video.videoWidth,
				height: video.videoHeight
			} : void 0,
			...details
		};
		lastDiagnostics = snapshot;
		if (post) postDiagnosticsChannelEvent({
			type: "snapshot",
			snapshot
		});
	}
}
function sameBounds(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function normalizeWindowBounds(display, window) {
	return {
		x: (window.x - display.x) / display.width,
		y: (window.y - display.y) / display.height,
		width: window.width / display.width,
		height: window.height / display.height
	};
}
async function waitForVideo(video) {
	if (video.readyState < HTMLMediaElement.HAVE_METADATA) await new Promise((resolve, reject) => {
		video.addEventListener("loadedmetadata", () => resolve(), { once: true });
		video.addEventListener("error", () => reject(video.error ?? /* @__PURE__ */ new Error("Screen capture video failed to load")), { once: true });
	});
	await video.play();
}
//#endregion
//#region src/renderer/utils/fade-on-hover.ts
/**
* Resolves the visual fade and the native click-through state for the stage window.
*
* The two are independent decisions. Auto Hide (`enabled`) only chooses whether a
* hovered model fades. Click-through follows the pointer hit test, so the blank area
* around the model lets clicks reach the application below it.
*/
function resolveFadeOnHoverInteraction(params) {
	const fadeStage = params.enabled && params.cursorInsideWindow && !params.transparentForFade;
	const transparentPixelsClickThrough = params.enabled || params.alwaysOnTop;
	return {
		fadeStage,
		ignoreMouseEvents: params.clickThroughAvailable && (fadeStage || transparentPixelsClickThrough && params.transparentForPointer)
	};
}
//#endregion
//#region src/renderer/utils/stage-three-transparency.ts
/**
* Reports whether the Three.js render target can answer a transparency hit test.
*
* Pointer hit-testing needs this whenever a VRM stage is on screen, so the blank
* area around the model stays click-through. Auto Hide is a separate decision and
* must not gate it.
*/
function shouldSampleStageTransparency(params) {
	return !params.stagePaused && params.componentState === "mounted" && params.stageModelRenderer === "vrm";
}
//#endregion
//#region src/renderer/pages/index.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	"max-h": "[100vh]",
	"max-w": "[100vw]",
	flex: "~ col",
	relative: "",
	"z-2": "",
	"h-full": "",
	"overflow-hidden": "",
	"rounded-xl": "",
	transition: "opacity duration-500 ease-in-out"
};
var _hoisted_2 = { class: /*@__PURE__*/ normalizeClass(["relative h-full w-full items-end gap-2", "transition-opacity duration-250 ease-in-out"]) };
var _hoisted_3 = { class: "absolute left-0 top-0 z-99 h-full w-full flex cursor-grab items-center justify-center overflow-hidden" };
/**
* The parts of the fullscreen transition. `height` also moves the window and scales the stage, so the bottom edge of
* the stage and the area stays in place. `width` is slower, so the area fills the height first. Closing runs every part
* along `close`, an ease-out curve that overshoots a little, so the character lands with a slight spring.
*/
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	setup(__props) {
		const hearingStatusElement = ref();
		const authStatusElement = ref();
		const { isOutside: outsideHearingStatus } = useElectronMouseInElement(hearingStatusElement);
		const { isOutside: outsideAuthStatus } = useElectronMouseInElement(authStatusElement);
		const controlsIslandRef = ref();
		const controlsIslandInteractionActive = shallowRef(false);
		const widgetStageRef = ref();
		useScreenAmbientLight({ stageCanvas: () => widgetStageRef.value?.canvasElement() });
		const stageCanvas = toRef(() => widgetStageRef.value?.canvasElement());
		const componentStateStage = ref("pending");
		const stageMounted = computed(() => componentStateStage.value === "mounted");
		const stageError = shallowRef();
		const isLoading = computed(() => !stageMounted.value && !stageError.value);
		const isIgnoringMouseEvents = ref(false);
		const shouldFadeOnCursorWithin = ref(false);
		const onboardingStore = useOnboardingStore();
		const openOnboarding = useElectronEventaInvoke(electronOpenOnboarding);
		const openSettings = useElectronEventaInvoke(electronOpenSettings);
		const { isOutside: isOutsideWindow } = useElectronMouseInWindow();
		const isOutside = computed(() => controlsIslandRef.value?.isOutside ?? true);
		const isOutsideFor250Ms = refDebounced(isOutside, 250);
		const { x: relativeMouseX, y: relativeMouseY } = useElectronRelativeMouse();
		const isTransparentByPixels = useCanvasPixelIsTransparentAtPoint(stageCanvas, relativeMouseX, relativeMouseY, { regionRadius: 25 });
		const isTransparentByThree = useThreeSceneIsTransparentAtPoint(widgetStageRef, relativeMouseX, relativeMouseY, { regionRadius: 25 });
		const isTransparentByPixelsExact = useCanvasPixelIsTransparentAtPoint(stageCanvas, relativeMouseX, relativeMouseY);
		const isTransparentByThreeExact = useThreeSceneIsTransparentAtPoint(widgetStageRef, relativeMouseX, relativeMouseY);
		const settingsStore = useSettings();
		const { alwaysOnTop, stageModelRenderer, stageModelSelectedUrl } = storeToRefs(settingsStore);
		function handleStageRenderError(error) {
			stageError.value = error;
		}
		function handleStageReset() {
			stageError.value = void 0;
		}
		const modelStore = useModelStore();
		const { sceneMutationLocked, scenePhase } = storeToRefs(modelStore);
		const { stagePaused } = storeToRefs(useStageWindowLifecycleStore());
		const { fadeOnHoverEnabled } = storeToRefs(useControlsIslandStore());
		const modelSettingsRuntimeOwnerInstanceId = `tamagotchi-main-stage:${Math.random().toString(36).slice(2, 10)}`;
		const shouldUseThreeTransparencyHitTest = computed(() => shouldSampleStageTransparency({
			componentState: componentStateStage.value,
			stageModelRenderer: stageModelRenderer.value,
			stagePaused: stagePaused.value
		}));
		/**
		* Drives the Auto Hide fade. `true` means "do not fade", so any case without a usable
		* region sampler reports `true` and the stage stays visible.
		*/
		const isTransparent = computed(() => {
			if (stagePaused.value || componentStateStage.value !== "mounted" || !fadeOnHoverEnabled.value) return true;
			if (stageModelRenderer.value === "vrm") return shouldUseThreeTransparencyHitTest.value ? isTransparentByThree.value : true;
			return isTransparentByPixels.value;
		});
		/**
		* Whether the cursor sits on the stage canvas rather than on interface drawn over it.
		*
		* The pixel test can only answer for the canvas, and the canvas draws nothing beneath a
		* DOM overlay, so a button, a toast or a portaled panel floating over blank canvas
		* would read as empty space and lose its clicks. Ask the document what is really under
		* the cursor instead. This is a hit test, not an event, so it still answers while the
		* window is click-through.
		*/
		const isPointerOverStageCanvas = computed(() => document.elementFromPoint(relativeMouseX.value, relativeMouseY.value) === stageCanvas.value);
		/**
		* Drives native click-through, and runs whether or not Auto Hide is on.
		*
		* `true` surrenders the pixel to the app below, the opposite sense of
		* {@link isTransparent}. The samplers report a missing canvas as transparent, so the
		* guards below are what keep the window interactive when nothing can answer. Godot
		* lands there: it draws a DOM panel and exposes no canvas to read.
		*/
		const isTransparentForMouseEvents = computed(() => {
			if (stagePaused.value || componentStateStage.value !== "mounted") return false;
			if (!stageCanvas.value) return false;
			if (!isPointerOverStageCanvas.value) return false;
			if (stageModelRenderer.value === "vrm") return shouldUseThreeTransparencyHitTest.value ? isTransparentByThreeExact.value : false;
			return isTransparentByPixelsExact.value;
		});
		const { isNearAnyBorder: isAroundWindowBorder } = useElectronMouseAroundWindowBorder({ threshold: 10 });
		const isAroundWindowBorderFor250Ms = refDebounced(isAroundWindowBorder, 250);
		const isWayland = ref(true);
		useElectronEventaInvoke(electronAppIsWayland)().then((value) => isWayland.value = value).catch((error) => console.warn("[Main Page] Failed to detect Wayland; the controls Island stays shown:", errorMessageFrom(error)));
		const reportPageMounted = useElectronEventaInvoke(electronMainPageMounted);
		until(isLoading).toBe(false).then(() => reportPageMounted());
		const cursorAwayFromWindow = computed(() => !isWayland.value && isOutsideWindow.value && !isAroundWindowBorder.value);
		const setIgnoreMouseEvents = useElectronEventaInvoke(electron.window.setIgnoreMouseEvents);
		const controlsOverlayActive = computed(() => controlsIslandRef.value?.overlayActive ?? false);
		const modelSettingsRuntimeSnapshot = computed(() => {
			const hasModel = !!stageModelSelectedUrl.value;
			if (stageModelRenderer.value === "live2d") {
				const phase = resolveComponentStateToRuntimePhase(componentStateStage.value, { hasModel });
				return createEmptyModelSettingsRuntimeSnapshot({
					ownerInstanceId: modelSettingsRuntimeOwnerInstanceId,
					renderer: "live2d",
					phase,
					controlsLocked: hasModel ? phase !== "mounted" : false,
					previewAvailable: hasModel,
					canCapturePreview: false,
					updatedAt: Date.now()
				});
			}
			if (stageModelRenderer.value === "vrm") return createEmptyModelSettingsRuntimeSnapshot({
				ownerInstanceId: modelSettingsRuntimeOwnerInstanceId,
				renderer: "vrm",
				phase: hasModel ? scenePhase.value : "no-model",
				controlsLocked: hasModel ? !stageMounted.value || sceneMutationLocked.value : false,
				previewAvailable: hasModel,
				canCapturePreview: false,
				updatedAt: Date.now()
			});
			if (stageModelRenderer.value === "spine") {
				const phase = resolveComponentStateToRuntimePhase(componentStateStage.value, { hasModel });
				return createEmptyModelSettingsRuntimeSnapshot({
					ownerInstanceId: modelSettingsRuntimeOwnerInstanceId,
					renderer: "spine",
					phase,
					controlsLocked: hasModel ? phase !== "mounted" : false,
					previewAvailable: hasModel,
					canCapturePreview: false,
					updatedAt: Date.now()
				});
			}
			if (stageModelRenderer.value === "tachie") {
				const phase = resolveComponentStateToRuntimePhase(componentStateStage.value, { hasModel });
				return createEmptyModelSettingsRuntimeSnapshot({
					ownerInstanceId: modelSettingsRuntimeOwnerInstanceId,
					renderer: "tachie",
					phase,
					controlsLocked: hasModel ? phase !== "mounted" : false,
					previewAvailable: hasModel,
					canCapturePreview: false,
					updatedAt: Date.now()
				});
			}
			if (stageModelRenderer.value === "mmd") {
				const phase = resolveComponentStateToRuntimePhase(componentStateStage.value, { hasModel });
				return createEmptyModelSettingsRuntimeSnapshot({
					ownerInstanceId: modelSettingsRuntimeOwnerInstanceId,
					renderer: "mmd",
					phase,
					controlsLocked: hasModel ? phase !== "mounted" : false,
					previewAvailable: hasModel,
					canCapturePreview: false,
					updatedAt: Date.now()
				});
			}
			if (stageModelRenderer.value === "godot") return createEmptyModelSettingsRuntimeSnapshot({
				ownerInstanceId: modelSettingsRuntimeOwnerInstanceId,
				renderer: "godot",
				phase: hasModel ? "mounted" : "no-model",
				controlsLocked: false,
				previewAvailable: false,
				canCapturePreview: false,
				updatedAt: Date.now()
			});
			return createEmptyModelSettingsRuntimeSnapshot({
				ownerInstanceId: modelSettingsRuntimeOwnerInstanceId,
				updatedAt: Date.now()
			});
		});
		const fullscreen = useFullscreenStore();
		const { phase: fullscreenPhase, active: fullscreenActive } = storeToRefs(fullscreen);
		const router = useRouter();
		useFullscreenHost();
		const enterFullscreenWindow = useElectronEventaInvoke(electronMainWindowEnterFullscreen);
		const setFullscreenWindowBounds = useElectronEventaInvoke(electronMainWindowSetFullscreenBounds);
		const exitFullscreenWindow = useElectronEventaInvoke(electronFullscreenExit);
		const getFullscreenWindowState = useElectronEventaInvoke(electronMainWindowGetFullscreenState);
		const setFullscreenMode = useElectronEventaInvoke(electronFullscreenSetMode);
		const featureFlags = useFeatureFlagsStore();
		/** The mode that the user chose: the experiment turns it on, and its variant names the window. */
		const fullscreenMode = computed(() => {
			if (!featureFlags.isEnabled(FULLSCREEN_WORKSPACE_FLAG.key)) return "off";
			return featureFlags.variantOf(FULLSCREEN_WORKSPACE_FLAG.key) === "multi-window" ? "multi-window" : "single-window";
		});
		watch(fullscreenMode, async (mode) => {
			try {
				await setFullscreenMode({ mode });
			} catch (error) {
				console.error("[Main window fullscreen] Failed to report the mode:", errorMessageFrom(error));
			}
		}, { immediate: true });
		/**
		* The stage in fullscreen mode. It keeps one size in window pixels, so the canvas resizes only when the mode starts
		* and ends. A transform anchored at the top left scales it down to the size it had in the small window.
		*/
		const stageLayout = shallowRef();
		/**
		* The area of the fullscreen mode, from the top left of the window. It clips the backdrop, the island, and the surface,
		* which keep their final layout, so they show as the area grows.
		*/
		const fullscreenArea = shallowRef();
		/** The direction that the stage and the area move in now. `false` sets them at once. */
		const fullscreenMotion = shallowRef(false);
		const FULLSCREEN_MOTION = {
			height: {
				duration: 350,
				curve: [
					.25,
					1,
					.5,
					1
				]
			},
			width: {
				duration: 500,
				curve: [
					.33,
					1,
					.68,
					1
				]
			},
			close: {
				duration: 400,
				curve: [
					.34,
					1.1,
					.64,
					1
				]
			}
		};
		/** The surface width, its drag, and the place of the stage beside the surface. The overlay reads the same layout. */
		const fullscreenLayout = provideFullscreenLayout();
		watch(fullscreenLayout.stageOffset, (offsetX) => {
			if (fullscreenPhase.value === "open" && !fullscreenMotion.value && stageLayout.value) stageLayout.value = {
				...stageLayout.value,
				offsetX
			};
		});
		/** The bounds of the main window outside fullscreen mode, the work area, and the stage size in it. */
		function planFor(home, workArea) {
			return {
				home,
				workArea,
				stage: fullscreenLayout.stageSizeIn(workArea)
			};
		}
		/** The CSS transitions of `parts` in the current direction, and none while nothing moves. */
		function motionTransitions(...parts) {
			const direction = fullscreenMotion.value;
			if (!direction) return [];
			return parts.map(([property, part]) => {
				const { duration, curve } = direction === "open" ? part : FULLSCREEN_MOTION.close;
				return `${property} ${duration}ms cubic-bezier(${curve.join(", ")})`;
			});
		}
		const stageFrameStyle = computed(() => {
			const layout = stageLayout.value;
			if (!layout) return void 0;
			return {
				position: "fixed",
				left: "0px",
				top: "0px",
				width: `${layout.width}px`,
				height: `${layout.height}px`,
				transformOrigin: "0 0",
				transform: `translateX(${layout.offsetX}px) scale(${layout.scale})`,
				transition: motionTransitions(["transform", FULLSCREEN_MOTION.height]).join(", ") || "none"
			};
		});
		const fullscreenAreaStyle = computed(() => {
			const area = fullscreenArea.value;
			if (!area) return void 0;
			return {
				width: `${area.width}px`,
				height: `${area.height}px`,
				transition: motionTransitions(["width", FULLSCREEN_MOTION.width], ["height", FULLSCREEN_MOTION.height]).join(", ") || "none"
			};
		});
		/** The stage at its fullscreen size, drawn as large as it was in the small window, with the character centered as before. */
		function homeStageLayout(plan) {
			const scale = plan.home.height / plan.stage.height;
			return {
				...plan.stage,
				scale,
				offsetX: (plan.home.width - plan.stage.width * scale) / 2
			};
		}
		const stageFrameElement = ref();
		const fullscreenAreaElement = ref();
		/** Starts the next transition from the layout that the stage and the area have now, by making the browser commit it first. */
		function commitFullscreenLayout() {
			stageFrameElement.value?.getBoundingClientRect();
			fullscreenAreaElement.value?.getBoundingClientRect();
		}
		/** Resolves when every transition that the latest layout change started on the stage and the area has ended. */
		async function fullscreenTransitionsEnded() {
			await nextTick();
			const animations = [stageFrameElement.value, fullscreenAreaElement.value].flatMap((element) => element?.getAnimations() ?? []);
			await Promise.all(animations.map((animation) => animation.finished));
		}
		/**
		* Opens the fullscreen mode. A resize keeps the window's top left corner, and a glide keeps its size, so the content
		* never shifts against the window and the stage never blinks. The islands hide as soon as the mode starts.
		*
		* 1. The stage takes its fullscreen size, scaled to look unchanged, and the window grows from its top left to the size
		*    of the work area. The area starts with no width, so nothing on screen changes.
		* 2. The window glides to the top left of the work area while the stage and the area grow along the same curve. The
		*    area opens to the right along a slower curve and shows the island and the surface.
		*
		* The mode ends fully open or fully closed: any failed step rolls everything back through {@link leaveFullscreen}.
		*/
		async function expandToFullscreen() {
			try {
				const { bounds, workArea } = await enterFullscreenWindow();
				const plan = planFor(bounds, workArea);
				const { height } = FULLSCREEN_MOTION;
				fullscreenMotion.value = false;
				stageLayout.value = homeStageLayout(plan);
				fullscreenArea.value = {
					width: 0,
					height: bounds.height
				};
				await setFullscreenWindowBounds({ bounds: {
					x: bounds.x,
					y: bounds.y,
					width: workArea.width,
					height: workArea.height
				} });
				commitFullscreenLayout();
				fullscreenLayout.measureIsland();
				fullscreenMotion.value = "open";
				stageLayout.value = {
					...plan.stage,
					scale: 1,
					offsetX: fullscreenLayout.stageOffsetIn(workArea.width)
				};
				fullscreenArea.value = {
					width: workArea.width,
					height: workArea.height
				};
				await Promise.all([setFullscreenWindowBounds({
					bounds: workArea,
					duration: height.duration,
					curve: height.curve
				}), fullscreenTransitionsEnded()]);
				fullscreenMotion.value = false;
				stageLayout.value = {
					...plan.stage,
					scale: 1,
					offsetX: fullscreenLayout.stageOffsetIn(workArea.width)
				};
				fullscreen.settle("open");
			} catch (error) {
				console.error("[Main window fullscreen] Failed to open:", errorMessageFrom(error));
				await leaveFullscreen(`opening failed: ${errorMessageFrom(error) ?? "unknown error"}`);
			}
		}
		/**
		* Closes the fullscreen mode. The area closes to the left while the window glides back and the stage shrinks, all
		* along the closing curve, then the window shrinks from its top left. The stage returns to its normal layout only
		* after that, because its scaled layout fits both window sizes.
		*/
		async function collapseFromFullscreen() {
			try {
				const state = await getFullscreenWindowState();
				if (state) {
					const plan = planFor(state.home, state.workArea);
					const { close } = FULLSCREEN_MOTION;
					commitFullscreenLayout();
					fullscreenMotion.value = "close";
					stageLayout.value = homeStageLayout(plan);
					fullscreenArea.value = {
						width: 0,
						height: plan.home.height
					};
					await Promise.all([setFullscreenWindowBounds({
						bounds: {
							...plan.workArea,
							x: plan.home.x,
							y: plan.home.y
						},
						...close
					}), fullscreenTransitionsEnded()]);
					await setFullscreenWindowBounds({ bounds: plan.home });
				}
				await exitFullscreenWindow({ reason: "the user closed it" });
				clearFullscreenLayout();
				fullscreen.settle("closed");
			} catch (error) {
				console.error("[Main window fullscreen] Failed to close:", errorMessageFrom(error));
				await leaveFullscreen(`closing failed: ${errorMessageFrom(error) ?? "unknown error"}`);
			}
		}
		/** Returns the stage to its normal layout and unmounts the area. */
		function clearFullscreenLayout() {
			fullscreenMotion.value = false;
			stageLayout.value = void 0;
			fullscreenArea.value = void 0;
		}
		/**
		* The way out after any failed step: the window and the stage return to their state before the mode, and it closes.
		* The main process restores its bounds and always on top, and does nothing when it was never in fullscreen mode.
		*/
		async function leaveFullscreen(reason) {
			clearFullscreenLayout();
			try {
				await exitFullscreenWindow({ reason });
			} catch (error) {
				console.error("[Main window fullscreen] Failed to restore the window:", errorMessageFrom(error));
			} finally {
				fullscreen.settle("closed");
			}
		}
		/**
		* Shows the fullscreen mode again when the page loads while the main window is still in it, after a reload for example.
		* The window covers the work area again, because a reload can stop it in the middle of a glide.
		*/
		async function resumeFullscreen() {
			try {
				const state = await getFullscreenWindowState();
				if (!state) {
					if (fullscreenSurfaceOf(router.currentRoute.value.path)) await router.replace(fullscreenHostPages["main-window"]);
					return;
				}
				const plan = planFor(state.home, state.workArea);
				fullscreenMotion.value = false;
				stageLayout.value = {
					...plan.stage,
					scale: 1,
					offsetX: fullscreenLayout.stageOffsetIn(plan.workArea.width)
				};
				fullscreenArea.value = {
					width: plan.workArea.width,
					height: plan.workArea.height
				};
				await setFullscreenWindowBounds({ bounds: plan.workArea });
				await fullscreen.resume(state.surface ?? "settings");
			} catch (error) {
				console.error("[Main window fullscreen] Failed to show the mode again:", errorMessageFrom(error));
				await leaveFullscreen(`showing the mode again after a reload failed: ${errorMessageFrom(error) ?? "unknown error"}`);
			}
		}
		onMounted(() => void resumeFullscreen());
		watch(fullscreenPhase, (phase) => {
			if (phase === "expanding") expandToFullscreen();
			else if (phase === "closing") collapseFromFullscreen();
		});
		/**
		* Keeps the rendered fade state and Electron click-through state synchronized.
		*
		* Triggering workflow:
		*
		* {@link watch}
		*   -> `fade-on-hover reactive state change`
		*     -> {@link handleFadeOnHoverInteractionChange}
		*
		* Upstream:
		* - {@link isOutsideFor250Ms} and {@link isAroundWindowBorderFor250Ms}
		* - {@link isOutsideWindow}, {@link isTransparent}, and {@link isTransparentForMouseEvents}
		* - {@link controlsOverlayActive}, {@link fadeOnHoverEnabled}, {@link alwaysOnTop}, and {@link stagePaused}
		*
		* Downstream:
		* - {@link resolveFadeOnHoverInteraction}
		* - {@link setIgnoreMouseEvents}
		*/
		function handleFadeOnHoverInteractionChange() {
			if (stagePaused.value || fullscreenActive.value) {
				isIgnoringMouseEvents.value = false;
				shouldFadeOnCursorWithin.value = false;
				setIgnoreMouseEvents([false, { forward: true }]);
				return;
			}
			if (controlsOverlayActive.value || !outsideHearingStatus.value || !outsideAuthStatus.value) {
				isIgnoringMouseEvents.value = false;
				shouldFadeOnCursorWithin.value = false;
				setIgnoreMouseEvents([false, { forward: true }]);
				return;
			}
			const insideControls = !isOutside.value || !isOutsideFor250Ms.value;
			const nearBorder = isAroundWindowBorder.value || isAroundWindowBorderFor250Ms.value;
			if (insideControls || nearBorder) {
				isIgnoringMouseEvents.value = false;
				shouldFadeOnCursorWithin.value = false;
				setIgnoreMouseEvents([false, { forward: true }]);
			} else {
				const interaction = resolveFadeOnHoverInteraction({
					alwaysOnTop: alwaysOnTop.value,
					cursorInsideWindow: !isOutsideWindow.value,
					clickThroughAvailable: !isWayland.value,
					enabled: fadeOnHoverEnabled.value,
					transparentForFade: isTransparent.value,
					transparentForPointer: isTransparentForMouseEvents.value
				});
				isIgnoringMouseEvents.value = interaction.ignoreMouseEvents;
				shouldFadeOnCursorWithin.value = interaction.fadeStage;
				setIgnoreMouseEvents([interaction.ignoreMouseEvents, { forward: true }]);
			}
		}
		watch([
			outsideHearingStatus,
			outsideAuthStatus,
			isOutside,
			isOutsideFor250Ms,
			isPointerOverStageCanvas,
			isAroundWindowBorder,
			isAroundWindowBorderFor250Ms,
			isOutsideWindow,
			isTransparent,
			isTransparentForMouseEvents,
			controlsOverlayActive,
			fadeOnHoverEnabled,
			alwaysOnTop,
			stagePaused,
			isWayland,
			fullscreenActive
		], handleFadeOnHoverInteractionChange, { immediate: true });
		useModelSettingsRuntimeOwner({
			ownerInstanceId: modelSettingsRuntimeOwnerInstanceId,
			renderer: () => stageModelRenderer.value,
			runtimeSnapshot: modelSettingsRuntimeSnapshot
		});
		const voice = useVoiceStore();
		const toolSelection = useToolSelectionStore();
		onScopeDispose(voice.connectTools(() => toolSelection.requestTools));
		const openInlay = useElectronEventaInvoke(electronOpenInlay);
		useVoiceListening();
		usePushToTalkShortcut();
		watch(() => voice.state?.phase === "capturing", (capturing) => {
			if (capturing) openInlay();
		});
		watch(() => voice.error, (error) => {
			if (error) toast.error(error);
		});
		watch(() => voice.drafts.filter((draft) => !draft.sending).map((draft) => `${draft.id}:${draft.rawText}`).join("\0"), (speechDrafts) => {
			if (speechDrafts) openInlay();
		});
		onMounted(() => {
			if (onboardingStore.needsOnboarding) openOnboarding();
		});
		const cursorPosition = computed(() => ({
			x: relativeMouseX.value,
			y: relativeMouseY.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createBaseVNode("div", _hoisted_1, [
					withDirectives(createBaseVNode("div", {
						ref_key: "hearingStatusElement",
						ref: hearingStatusElement,
						class: normalizeClass(["absolute bottom-3 left-1/2 z-30 w-fit -translate-x-1/2"])
					}, [createVNode(unref(hearing_status_default), { align: "center" })], 512), [[vShow, !unref(settingsStore).streamerMode && !unref(fullscreenActive)]]),
					withDirectives(createBaseVNode("div", {
						ref_key: "authStatusElement",
						ref: authStatusElement,
						class: normalizeClass(["absolute left-1/2 top-3 z-40 w-fit -translate-x-1/2"])
					}, [createVNode(auth_status_island_default)], 512), [[vShow, !unref(settingsStore).streamerMode && !unref(fullscreenActive)]]),
					createBaseVNode("div", _hoisted_2, [createBaseVNode("div", {
						ref_key: "stageFrameElement",
						ref: stageFrameElement,
						style: normalizeStyle(stageFrameStyle.value),
						class: normalizeClass([
							shouldFadeOnCursorWithin.value ? "op-0" : "op-100",
							"absolute",
							"top-0 left-0 w-full h-full",
							"overflow-hidden",
							"rounded-2xl",
							"transition-opacity duration-250 ease-in-out"
						])
					}, [
						withDirectives(createBaseVNode("div", null, [createVNode(resource_status_island_default)], 512), [[vShow, !unref(fullscreenActive)]]),
						createVNode(unref(Stage_default), {
							ref_key: "widgetStageRef",
							ref: widgetStageRef,
							state: componentStateStage.value,
							"onUpdate:state": _cache[0] || (_cache[0] = ($event) => componentStateStage.value = $event),
							"h-full": "",
							"w-full": "",
							"flex-1": "",
							"cursor-position": cursorPosition.value,
							paused: unref(stagePaused),
							onError: handleStageRenderError,
							onReset: handleStageReset,
							onSelectAvatarModel: _cache[1] || (_cache[1] = ($event) => unref(openSettings)({ route: "/settings/models" }))
						}, null, 8, [
							"state",
							"cursor-position",
							"paused"
						]),
						createVNode(unref(holo_coupon_default)),
						withDirectives(createBaseVNode("div", null, [createVNode(controls_island_root_default, { frozen: controlsIslandInteractionActive.value }, {
							default: withCtx(() => [createVNode(controls_island_default, normalizeProps({
								ref_key: "controlsIslandRef",
								ref: controlsIslandRef,
								"cursor-away": cursorAwayFromWindow.value,
								[unref("data-ambient-light-opaque") || ""]: true,
								onInteractionChange: _cache[2] || (_cache[2] = ($event) => controlsIslandInteractionActive.value = $event)
							}), null, 16, ["cursor-away"])]),
							_: 1
						}, 8, ["frozen"])], 512), [[vShow, !unref(fullscreenActive)]])
					], 6)]),
					withDirectives(createBaseVNode("div", _hoisted_3, [..._cache[3] || (_cache[3] = [createBaseVNode("div", { class: normalizeClass([
						"absolute h-24 w-full overflow-hidden rounded-xl",
						"flex items-center justify-center",
						"bg-white/80 dark:bg-neutral-950/80",
						"backdrop-blur-md"
					]) }, [createBaseVNode("div", { class: normalizeClass([
						"drag-region",
						"absolute left-0 top-0",
						"h-full w-full flex items-center justify-center",
						"text-1.5rem text-primary-600 dark:text-primary-400 font-normal",
						"select-none",
						"animate-flash animate-duration-5s animate-count-infinite"
					]) }, " Loading... ")], -1)])], 512), [[vShow, isLoading.value]])
				]),
				createVNode(Transition, {
					"enter-active-class": "transition-opacity duration-250",
					"enter-from-class": "opacity-0",
					"enter-to-class": "opacity-100",
					"leave-active-class": "transition-opacity duration-250",
					"leave-from-class": "opacity-100",
					"leave-to-class": "opacity-0"
				}, {
					default: withCtx(() => [createCommentVNode("", true)]),
					_: 1
				}),
				createVNode(window_resize_border_default, {
					shown: (unref(isAroundWindowBorder) || unref(isAroundWindowBorderFor250Ms)) && !isLoading.value && !unref(fullscreenActive),
					class: normalizeClass(["rounded-2xl"])
				}, null, 8, ["shown"]),
				fullscreenAreaStyle.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					ref_key: "fullscreenAreaElement",
					ref: fullscreenAreaElement,
					style: normalizeStyle(fullscreenAreaStyle.value),
					class: normalizeClass(["fixed left-0 top-0 z-1 overflow-hidden"])
				}, [createVNode(fullscreen_backdrop_default)], 4)) : createCommentVNode("", true),
				fullscreenAreaStyle.value ? (openBlock(), createElementBlock("div", {
					key: 1,
					style: normalizeStyle(fullscreenAreaStyle.value),
					class: normalizeClass(["pointer-events-none fixed left-0 top-0 z-3 overflow-hidden"])
				}, [createVNode(fullscreen_overlay_default)], 4)) : createCommentVNode("", true)
			], 64);
		};
	}
});
//#endregion
//#region src/renderer/pages/index.vue
if (typeof route_block_default === "function") route_block_default(index_vue_vue_type_script_setup_true_lang_default);
var pages_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8716f0a0"]]);
//#endregion
export { pages_default as default, useThreeSceneIsTransparentAtPoint as t };
