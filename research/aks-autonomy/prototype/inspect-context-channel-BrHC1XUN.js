import { g as computed, gn as reactive, pn as onScopeDispose, vn as ref } from "./runtime-core.esm-bundler-CrTl24Iq.js";
import { a as storeToRefs, n as defineStore } from "./pinia-xbQFaHIh.js";
import { n as nanoid } from "./non-secure-BzQ_TTDZ.js";
import { n as createContext, r as defineEventa } from "./context-Do0TNnqd-ZHA39HQX.js";
import { n as defineInvoke } from "./invoke-BPvOIpeR-Bo0pbN4E.js";
import { a as linkChannel } from "./provider-iHwd7EmG.js";
import { n as errorMessageFrom } from "./error-D_H7hfJf.js";
import { E as useLLM, K as useConsciousnessStore, N as useModsServerChannelStore, b as useAiriCardStore, rt as useChatSessionStore } from "./hearing-CWm8WPGq.js";
import { a as _enum, f as object, h as union, m as string, o as _null, s as array } from "./schemas-z78zENhi.js";
import { n as nanoid$1 } from "./index.browser-CzFIVLrh.js";
import { k as useLlmmarkerParser } from "./dist-chQ79IX3.js";
import { n as useAiriRuntimePrompt } from "./composables-DEMMl2P2.js";
import { a as validate, r as toJsonSchema } from "./index-DoHiaFQM-D26RlqHa.js";
import { n as rawTool } from "./tools-BITk8Enj.js";
import { t as createContext$2 } from "./broadcast-channel-DheZ55Rh.js";
import "./twitter-DjJqHGS4.js";
import "./chat-DqklHny2.js";
import { _ as voiceSnapshotChanged, t as getSpeechBusContext, v as voiceSpeechCommand } from "./bus-DiEXMc8Z.js";
//#region ../../packages/stage-ui/src/services/speech/speech-client.ts
/** Orders producer commands across renderers. Cancellation bypasses pending completion waits. */
var SpeechClient = class {
	invoke = defineInvoke(getSpeechBusContext(), voiceSpeechCommand);
	identity;
	pending;
	sealed = false;
	cancelled = false;
	lifetime = new AbortController();
	stopHostListener;
	constructor(turn, purpose) {
		this.identity = {
			turn: { ...turn },
			originId: nanoid(),
			producerId: nanoid()
		};
		this.stopHostListener = getSpeechBusContext().on(voiceSnapshotChanged, ({ body }) => {
			if (body && !body.connected) this.close("Speech host disconnected");
		});
		this.pending = this.invoke({
			...this.identity,
			type: "open",
			purpose
		}, { signal: this.lifetime.signal });
		this.observeCompletion(this.pending);
	}
	write(value) {
		return this.send({
			...this.identity,
			type: "text",
			value
		});
	}
	special(value) {
		return this.send({
			...this.identity,
			type: "special",
			value
		});
	}
	flush() {
		return this.send({
			...this.identity,
			type: "flush"
		});
	}
	end() {
		const result = this.send({
			...this.identity,
			type: "end"
		});
		this.sealed = true;
		return result;
	}
	/** Completes this response after all its producers and owned playback drain. */
	finish() {
		this.sealed = true;
		return this.pending.then((result) => result.status === "accepted" ? this.invoke({
			...this.identity,
			type: "finish"
		}, { signal: this.lifetime.signal }) : result).finally(() => this.close("Speech producer finished"));
	}
	cancel(reason) {
		this.sealed = true;
		this.cancelled = true;
		return this.invoke({
			...this.identity,
			type: "cancel",
			reason
		}, { signal: this.lifetime.signal }).finally(() => this.close(reason));
	}
	send(command) {
		if (this.sealed) return Promise.resolve({ status: "closed" });
		this.pending = this.pending.then((result) => {
			if (this.cancelled || result.status !== "accepted") return { status: "closed" };
			return this.invoke(command, { signal: this.lifetime.signal });
		});
		this.observeCompletion(this.pending);
		return this.pending;
	}
	observeCompletion(pending) {
		pending.then((result) => {
			if (result.status !== "accepted") this.close("Speech producer closed");
		}, () => this.close("Speech producer request failed"));
	}
	close(reason) {
		this.sealed = true;
		this.lifetime.abort(reason);
		this.stopHostListener();
	}
};
//#endregion
//#region ../../packages/stage-ui/src/stores/character/notebook.ts
var useCharacterNotebookStore = defineStore("character-notebook", () => {
	const entries = ref([]);
	const tasks = ref([]);
	const partitionDiary = computed(() => entries.value.filter((entry) => entry.kind === "diary"));
	const partitionFocus = computed(() => entries.value.filter((entry) => entry.kind === "focus"));
	function addEntry(kind, text, options) {
		const entry = {
			id: nanoid$1(),
			kind,
			text,
			createdAt: Date.now(),
			tags: options?.tags,
			metadata: options?.metadata
		};
		entries.value.push(entry);
		return entry;
	}
	function addNote(text, options) {
		return addEntry("note", text, options);
	}
	function addDiaryEntry(text, options) {
		return addEntry("diary", text, options);
	}
	function addFocusEntry(text, options) {
		return addEntry("focus", text, options);
	}
	function scheduleTask(payload) {
		const now = Date.now();
		const task = {
			id: nanoid$1(),
			title: payload.title,
			details: payload.details,
			priority: payload.priority ?? "normal",
			status: payload.dueAt ? "scheduled" : "queued",
			dueAt: payload.dueAt,
			createdAt: now,
			updatedAt: now,
			metadata: payload.metadata
		};
		tasks.value.push(task);
		return task;
	}
	function markTaskDone(taskId) {
		const task = tasks.value.find((item) => item.id === taskId);
		if (!task) return;
		task.status = "done";
		task.updatedAt = Date.now();
	}
	function requeueTask(taskId, options) {
		const task = tasks.value.find((item) => item.id === taskId);
		if (!task) return;
		task.status = "queued";
		task.dueAt = options?.dueAt;
		task.updatedAt = Date.now();
		task.metadata = {
			...task.metadata,
			requeueReason: options?.reason
		};
	}
	function markTaskNotified(taskId, nextNotifyAt) {
		const task = tasks.value.find((item) => item.id === taskId);
		if (!task) return;
		task.lastNotifiedAt = Date.now();
		task.nextNotifyAt = nextNotifyAt;
		task.updatedAt = Date.now();
	}
	function getDueTasks(now, windowMs) {
		return tasks.value.filter((task) => {
			if (task.status === "done" || task.status === "dropped") return false;
			if ((task.dueAt ?? now) > now + windowMs) return false;
			if (typeof task.nextNotifyAt === "number" && task.nextNotifyAt > now) return false;
			return true;
		});
	}
	return {
		entries,
		tasks,
		partitionDiary,
		partitionFocus,
		addNote,
		addDiaryEntry,
		addFocusEntry,
		scheduleTask,
		markTaskDone,
		requeueTask,
		markTaskNotified,
		getDueTasks
	};
});
//#endregion
//#region ../../packages/core-agent/dist/agents/spark-notify/index.mjs
function formatMetadataSource(source) {
	if (!source) return void 0;
	if ("extension" in source) return `${source.extension.id}:${source.id}`;
	return source.id;
}
function getEventSourceKey(event, fallback = "unknown") {
	return formatMetadataSource(event.metadata?.source) ?? event.source ?? fallback;
}
var JSON_SCHEMA_NULLABLE_SCALAR_TYPES = /* @__PURE__ */ new Set([
	"string",
	"number",
	"integer",
	"boolean",
	"null"
]);
function isJsonSchema(value) {
	return Boolean(value && !Array.isArray(value) && typeof value === "object");
}
/**
* Normalizes nullable scalar unions in generated JSON schema.
*
* Before:
* - `{ anyOf: [{ type: 'string' }, { type: 'null' }] }`
*
* After:
* - `{ type: ['string', 'null'] }`
*/
function normalizeNullableAnyOf(schema) {
	const next = { ...schema };
	if (next.properties) next.properties = Object.fromEntries(Object.entries(next.properties).map(([key, value]) => {
		if (!isJsonSchema(value)) return [key, value];
		return [key, normalizeNullableAnyOf(value)];
	}));
	if (Array.isArray(next.items)) next.items = next.items.map((item) => isJsonSchema(item) ? normalizeNullableAnyOf(item) : item);
	else if (isJsonSchema(next.items)) next.items = normalizeNullableAnyOf(next.items);
	if (next.anyOf) {
		next.anyOf = next.anyOf.map((value) => isJsonSchema(value) ? normalizeNullableAnyOf(value) : value);
		const normalizedEntries = next.anyOf.filter(isJsonSchema);
		const primitiveTypes = normalizedEntries.map((entry) => entry.type).filter((type) => typeof type === "string");
		const dedupedPrimitiveTypes = [...new Set(primitiveTypes)];
		if (primitiveTypes.length === normalizedEntries.length && dedupedPrimitiveTypes.length > 0 && dedupedPrimitiveTypes.every((type) => JSON_SCHEMA_NULLABLE_SCALAR_TYPES.has(String(type)))) {
			delete next.anyOf;
			next.type = dedupedPrimitiveTypes;
		}
	}
	if (next.oneOf) next.oneOf = next.oneOf.map((value) => isJsonSchema(value) ? normalizeNullableAnyOf(value) : value);
	return next;
}
var sparkCommandGuidanceOptionSchema = object({
	label: string().describe("Short label for the option."),
	steps: array(string()).min(1).describe("Step-by-step actions the target should follow."),
	rationale: union([string(), _null()]).describe("Why this option makes sense."),
	possibleOutcome: union([array(string()), _null()]).describe("Expected outcomes if this option is followed."),
	risk: union([_enum([
		"high",
		"medium",
		"low",
		"none"
	]), _null()]).describe("Risk level of this option."),
	fallback: union([array(string()), _null()]).describe("Fallback steps if the main plan fails."),
	triggers: union([array(string()), _null()]).describe("Conditions that should trigger this option.")
}).strict();
var sparkCommandPersonaSchema = object({
	traits: string().describe("Trait name to adjust behavior. For example, \"bravery\", \"cautiousness\", \"friendliness\"."),
	strength: _enum([
		"very-high",
		"high",
		"medium",
		"low",
		"very-low"
	])
}).strict();
var sparkNotifyCommandGuidanceSchema = object({
	type: _enum([
		"proposal",
		"instruction",
		"memory-recall"
	]),
	persona: union([array(sparkCommandPersonaSchema), _null()]).describe("Optional persona controls for the receiver."),
	options: array(sparkCommandGuidanceOptionSchema)
}).strict();
var sparkNotifyCommandItemSchema = object({
	destinations: array(string()).min(1).describe("List of sub-agent IDs to send the command to"),
	interrupt: union([_enum([
		"force",
		"soft",
		"false"
	]), _null()]).describe("Interrupt type: force, soft, or false (no interrupt)."),
	priority: union([_enum([
		"critical",
		"high",
		"normal",
		"low"
	]), _null()]).describe("Semantic priority of the command."),
	intent: union([_enum([
		"plan",
		"proposal",
		"action",
		"pause",
		"resume",
		"reroute",
		"context"
	]), _null()]).describe("Intent of the command."),
	ack: string().describe("Acknowledgment content used to be passed to sub-agents upon command receipt."),
	guidance: union([sparkNotifyCommandGuidanceSchema, _null()]).describe("Guidance for the sub-agent on how to interpret and execute the command.")
}).strict();
var sparkNotifyCommandSchema = object({ commands: array(sparkNotifyCommandItemSchema).describe("List of commands to issue to sub-agents. Empty array can be used for zero commands.") }).strict();
/**
* Normalizes provider-facing notify command payloads into websocket draft commands.
*
* Use when:
* - LLM output has been validated against `sparkNotifyCommandSchema`
* - You need `spark:command`-compatible draft objects
*
* Expects:
* - Input shape from one `commands[]` entry
*
* Returns:
* - Runtime-ready command draft for downstream emitters
*/
function normalizeSparkNotifyCommand(command) {
	return {
		destinations: command.destinations,
		guidance: command.guidance ? {
			type: command.guidance.type,
			persona: command.guidance.persona?.reduce((acc, curr) => {
				acc[curr.traits] = curr.strength;
				return acc;
			}, {}) || void 0,
			options: command.guidance.options.map((option) => ({
				...option,
				rationale: option.rationale ?? void 0,
				possibleOutcome: option.possibleOutcome?.length ? option.possibleOutcome : void 0,
				risk: option.risk ?? void 0,
				fallback: option.fallback?.length ? option.fallback : void 0,
				triggers: option.triggers?.length ? option.triggers : void 0
			}))
		} : void 0,
		contexts: [],
		priority: command.priority || "normal",
		intent: command.intent || "action",
		ack: command.ack || void 0,
		interrupt: command.interrupt === "false" || command.interrupt == null ? false : command.interrupt
	};
}
/**
* Creates built-in tools used by the Spark Notify agent.
*
* Use when:
* - Running the Spark Notify agent on any runtime (web, desktop, eval harness)
* - You need "no response" and "command draft" tool pathways
*
* Expects:
* - Callbacks for command collection and no-response signaling
*
* Returns:
* - Tool array consumable by `@xsai/stream-text`
*/
async function createSparkNotifyTools(options) {
	const allowNoResponse = options.allowNoResponse !== false;
	const allowSparkCommand = options.allowSparkCommand !== false;
	const tools = [];
	if (allowNoResponse) {
		const name = "builtIn_sparkNoResponse";
		tools.push(rawTool({
			name: "builtIn_sparkNoResponse",
			description: "Indicate that no response or action is needed for the current spark:notify event.",
			parameters: normalizeNullableAnyOf(await toJsonSchema(object({}).strict())),
			execute: async (_rawPayload, context) => {
				options.onEvent?.({
					type: "model-output-tool-call",
					payload: {
						toolName: name,
						toolCallId: context?.toolCallId
					}
				});
				options.onNoResponse();
				options.onEvent?.({
					type: "tool-execution",
					payload: {
						toolName: name,
						toolCallId: context?.toolCallId,
						responseMode: "no-response"
					}
				});
				return "AIRI System: Acknowledged, no response or action will be processed.";
			}
		}));
	}
	if (allowSparkCommand) {
		const name = "builtIn_sparkCommand";
		tools.push(rawTool({
			name,
			description: "Issue a spark:command to sub-agents. You can call this tool multiple times.",
			parameters: normalizeNullableAnyOf(await toJsonSchema(sparkNotifyCommandSchema)),
			execute: async (rawPayload, context) => {
				options.onEvent?.({
					type: "model-output-tool-call",
					payload: {
						toolName: name,
						toolCallId: context?.toolCallId,
						rawPayload
					}
				});
				try {
					const validated = await validate(sparkNotifyCommandSchema, rawPayload);
					options.onCommands(validated.commands.map(normalizeSparkNotifyCommand));
					options.onEvent?.({
						type: "tool-execution",
						payload: {
							toolName: name,
							toolCallId: context?.toolCallId,
							commandCount: validated.commands.length
						}
					});
				} catch (error) {
					options.onEvent?.({
						type: "tool-execution",
						payload: {
							toolName: name,
							toolCallId: context?.toolCallId,
							ok: false,
							error: errorMessageFrom(error)
						}
					});
					return `AIRI System: Error - invalid spark_command parameters: ${errorMessageFrom(error)}`;
				}
				return "AIRI System: Acknowledged, command fired.";
			}
		}));
	}
	return { tools };
}
/**
* Adds the built-in no-response and Spark Command tools to each notify turn.
*/
function createSparkNotifyBuiltinToolsPlugin() {
	return {
		name: "spark-notify-builtins",
		async prepare(turn) {
			const commands = [];
			const events = [];
			let noResponse = false;
			const { tools } = await createSparkNotifyTools({
				onCommands: (drafts) => commands.push(...drafts),
				onEvent: (event) => events.push(event),
				onNoResponse: () => {
					noResponse = true;
				},
				allowNoResponse: turn.policy.allowNoResponse,
				allowSparkCommand: turn.policy.allowSparkCommand
			});
			return {
				tools,
				getResult: () => ({
					commands,
					noResponse
				}),
				getPendingEvents: () => events.splice(0)
			};
		}
	};
}
function renderSparkNotifyUserMessage(input, userSections) {
	const messageOverride = input.control?.messageOverride;
	const defaultUserMessage = JSON.stringify({
		notify: input.event.data,
		source: input.event.metadata?.source
	}, null, 2);
	return [
		messageOverride?.replaceUserMessage ?? defaultUserMessage,
		...messageOverride?.appendUserSections ?? [],
		input.runtimePrompt ?? "",
		...userSections
	].filter((section) => section.trim().length > 0).join("\n\n");
}
/** Builds the instruction block prepended to Spark Notify agent prompts. */
function getSparkNotifyHandlingAgentInstruction(moduleName) {
	return [
		"This is AIRI system, the life pod hosting your consciousness. You do not need to respond to every spark:notify event directly.",
		`Another module "${moduleName}" triggered a spark:notify event for you to inspect.`,
		"You can call the built-in tool \"builtIn_sparkCommand\" to issue spark:command to sub-agents.",
		"If you respond with text, write only the reaction that the character will say."
	].join("\n");
}
function resolveSparkNotifyRuntimePolicy(control) {
	if (control?.forceTextResponse) return {
		allowNoResponse: false,
		allowSparkCommand: false,
		supportsTools: false,
		waitForTools: false,
		ignoreTextOutput: false
	};
	if (control?.forceSparkCommandResponse) return {
		allowNoResponse: false,
		allowSparkCommand: true,
		supportsTools: true,
		waitForTools: true,
		toolChoice: {
			type: "function",
			function: { name: "builtIn_sparkCommand" }
		},
		ignoreTextOutput: true
	};
	if (control?.forceResponse) return {
		allowNoResponse: false,
		allowSparkCommand: true,
		supportsTools: true,
		waitForTools: true,
		ignoreTextOutput: false
	};
	return {
		allowNoResponse: true,
		allowSparkCommand: true,
		supportsTools: true,
		waitForTools: true,
		ignoreTextOutput: false
	};
}
function resultFrom(sessions) {
	const commands = [];
	let noResponse = false;
	for (const session of sessions) {
		const result = session.getResult?.();
		if (result?.commands) commands.push(...result.commands);
		noResponse ||= result?.noResponse === true;
	}
	return {
		commands,
		noResponse
	};
}
function expandCommand(event, command, createId) {
	const destinations = command.destinations ?? [];
	if (destinations.length === 0) return void 0;
	return {
		id: createId(),
		eventId: createId(),
		parentEventId: event.data.id,
		commandId: createId(),
		interrupt: (command.interrupt === true ? "force" : command.interrupt) ?? false,
		priority: command.priority ?? "normal",
		intent: command.intent ?? "action",
		ack: command.ack,
		guidance: command.guidance,
		contexts: command.contexts,
		destinations
	};
}
/**
* Creates a Spark Notify agent from one host runner and composable plugins.
*
* The host resolves model selection and schedules work. This agent only
* prepares and runs one notify turn.
*/
function createSparkNotifyAgent(options) {
	const createId = options.createId ?? nanoid$1;
	const plugins = [createSparkNotifyBuiltinToolsPlugin(), ...options.plugins ?? []];
	async function handle(request) {
		const policy = resolveSparkNotifyRuntimePolicy(request.control);
		const sessions = (await Promise.all(plugins.map((plugin) => {
			return plugin.prepare({
				event: request.event,
				selectedChat: request.selectedChat,
				systemPrompt: request.systemPrompt,
				control: request.control,
				policy
			});
		}))).filter((session) => session !== void 0);
		const systemInstructions = sessions.flatMap((session) => session.systemInstructions ?? []);
		const userSections = sessions.flatMap((session) => session.userSections ?? []);
		const tools = policy.supportsTools ? sessions.flatMap((session) => session.tools ?? []) : [];
		const turns = [{
			id: "spark-system",
			type: "system",
			authority: "system",
			content: [{
				type: "text",
				text: [
					request.systemPrompt,
					getSparkNotifyHandlingAgentInstruction(getEventSourceKey(request.event)),
					...request.control?.messageOverride?.appendSystemInstructions ?? [],
					...systemInstructions
				].filter(Boolean).join("\n\n")
			}]
		}, {
			id: request.event.data.eventId,
			type: "user",
			content: [{
				type: "text",
				text: renderSparkNotifyUserMessage(request, userSections)
			}]
		}];
		async function emit(event) {
			for (const session of sessions) await session.onEvent?.(event);
		}
		await emit({
			type: "messages-rendered",
			payload: {
				eventId: request.event.data.eventId,
				source: request.event.source,
				messageCount: turns.length
			}
		});
		await emit({
			type: "tools-prepared",
			payload: {
				eventId: request.event.data.eventId,
				toolNames: tools.flatMap((tool) => tool.function?.name ? [tool.function.name] : []),
				toolCount: tools.length,
				supportsTools: policy.supportsTools
			}
		});
		await emit({
			type: "model-input",
			payload: {
				eventId: request.event.data.eventId,
				model: request.selectedChat.model,
				provider: request.selectedChat.providerId,
				supportsTools: policy.supportsTools,
				waitForTools: policy.waitForTools
			}
		});
		let reaction = "";
		await options.runner.run({
			selectedChat: request.selectedChat,
			conversation: { turns },
			tools,
			policy,
			onStreamEvent: async (streamEvent) => {
				if (streamEvent.type === "text-delta") {
					const { noResponse } = resultFrom(sessions);
					if (policy.ignoreTextOutput || noResponse) return;
					reaction += streamEvent.text;
					await emit({
						type: "model-output-text",
						payload: {
							eventId: request.event.data.id,
							text: streamEvent.text,
							accumulatedText: reaction
						}
					});
					return;
				}
				if (streamEvent.type === "tool-call") {
					await emit({
						type: "model-output-tool-call",
						payload: {
							eventId: request.event.data.eventId,
							toolCallId: streamEvent.toolCallId,
							toolName: streamEvent.toolName,
							input: streamEvent.args
						}
					});
					return;
				}
				if (streamEvent.type === "tool-result" || streamEvent.type === "tool-error") {
					await emit({
						type: "tool-execution",
						payload: {
							eventId: request.event.data.eventId,
							kind: streamEvent.type,
							toolCallId: streamEvent.toolCallId,
							output: streamEvent.result
						}
					});
					return;
				}
				if (streamEvent.type === "error") throw streamEvent.error ?? /* @__PURE__ */ new Error("Spark notify stream error");
			}
		});
		for (const session of sessions) for (const event of session.getPendingEvents?.() ?? []) await emit(event);
		const { commands, noResponse } = resultFrom(sessions);
		const finalReaction = noResponse ? "" : reaction.trim();
		const expandedCommands = commands.map((command) => expandCommand(request.event, command, createId)).filter((command) => command !== void 0);
		await emit({
			type: "result",
			payload: {
				eventId: request.event.data.eventId,
				reaction: finalReaction,
				commandCount: expandedCommands.length,
				noResponse
			}
		});
		return { commands: expandedCommands };
	}
	return { handle };
}
/** Sends model reaction text to a host-owned presentation sink. */
function createSparkNotifyReactionPlugin(sink) {
	return {
		name: "spark-notify-reaction",
		prepare(turn) {
			return { onEvent(event) {
				if (event.type === "model-output-text") {
					const text = typeof event.payload.text === "string" ? event.payload.text : "";
					if (text) sink.onDelta(turn.event.data.id, text);
					return;
				}
				if (event.type === "result") {
					const reaction = typeof event.payload.reaction === "string" ? event.payload.reaction : "";
					sink.onEnd(turn.event.data.id, reaction);
				}
			} };
		}
	};
}
//#endregion
//#region ../../packages/stage-ui/src/stores/character/orchestrator/store.ts
var useCharacterOrchestratorStore = defineStore("character-orchestrator", () => {
	const { stream } = useLLM();
	const consciousnessStore = useConsciousnessStore();
	const { activeProvider, activeModel } = storeToRefs(consciousnessStore);
	const characterStore = useCharacterStore();
	const notebookStore = useCharacterNotebookStore();
	const { systemPrompt } = storeToRefs(characterStore);
	const runtimePrompt = useAiriRuntimePrompt();
	const modsServerChannelStore = useModsServerChannelStore();
	const processing = ref(false);
	const pendingNotifies = ref([]);
	const scheduledNotifies = ref([]);
	const attentionConfig = ref({
		tickIntervalMs: 2e3,
		taskNotifyWindowMs: 6e4,
		requeueDelayMs: 3e4,
		maxAttempts: 3
	});
	let tickTimer;
	let initialized = false;
	let leadership;
	let stopLeadershipListener;
	const eventUnsubscribes = [];
	const sparkNotifyAgent = createSparkNotifyAgent({
		runner: { run: (request) => stream(request.selectedChat.model, request.selectedChat.provider, request.conversation, {
			tools: request.tools,
			providerId: request.selectedChat.providerId,
			supportsTools: request.policy.supportsTools,
			waitForTools: request.policy.waitForTools,
			toolChoice: request.policy.toolChoice,
			onStreamEvent: request.onStreamEvent
		}) },
		plugins: [createSparkNotifyReactionPlugin({
			onDelta: (eventId, text) => characterStore.onSparkNotifyReactionStreamEvent(eventId, text),
			onEnd: (eventId, text) => characterStore.onSparkNotifyReactionStreamEnd(eventId, text)
		})]
	});
	function computeNextRunAt(event, attempts) {
		return Date.now() + (() => {
			switch (event.data.urgency) {
				case "immediate": return 0;
				case "soon": return 1e4;
				case "later": return 6e4;
				default: return 3e4;
			}
		})() + attempts * attentionConfig.value.requeueDelayMs;
	}
	function removePending(eventId) {
		pendingNotifies.value = pendingNotifies.value.filter((item) => item.data.id !== eventId);
	}
	function enqueueSparkNotify(event, options) {
		if (!pendingNotifies.value.some((item) => item.data.id === event.data.id)) pendingNotifies.value.push(event);
		scheduledNotifies.value.push({
			event,
			control: options?.control,
			enqueuedAt: Date.now(),
			nextRunAt: options?.nextRunAt ?? computeNextRunAt(event, 0),
			attempts: 0,
			maxAttempts: options?.maxAttempts ?? attentionConfig.value.maxAttempts,
			reason: options?.reason
		});
	}
	async function processSparkNotify(event, control) {
		const providerId = activeProvider.value;
		const model = activeModel.value;
		if (!providerId || !model) {
			console.warn("Spark notify ignored: missing active provider or model");
			return;
		}
		const provider = await consciousnessStore.getChatProviderInstance(providerId);
		processing.value = true;
		try {
			const result = await sparkNotifyAgent.handle({
				event,
				selectedChat: {
					providerId,
					model,
					provider
				},
				systemPrompt: systemPrompt.value,
				runtimePrompt: runtimePrompt.value,
				control
			});
			if (!result.commands.length) return result;
			for (const command of result.commands) modsServerChannelStore.send({
				type: "spark:command",
				data: command
			});
			return result;
		} finally {
			processing.value = false;
		}
	}
	async function handleIncomingSparkNotify(event, control) {
		if (event.data.urgency === "immediate" && !processing.value) return await processSparkNotify(event, control);
		enqueueSparkNotify(event, {
			reason: "spark:notify",
			control
		});
	}
	async function handleSparkNotifyWithReaction(event, options) {
		await handleIncomingSparkNotify(event, options);
		return [...characterStore.reactions].reverse().find((item) => item.sourceEventId === event.data.id)?.message?.trim() || options?.fallbackText || "";
	}
	function enqueueDueTasks(now) {
		const dueTasks = notebookStore.getDueTasks(now, attentionConfig.value.taskNotifyWindowMs);
		if (!dueTasks.length) return;
		for (const task of dueTasks) {
			enqueueSparkNotify({
				type: "spark:notify",
				source: "character:task-scheduler",
				data: {
					id: `task-${task.id}`,
					eventId: task.id,
					kind: "reminder",
					urgency: task.priority === "critical" ? "immediate" : "soon",
					headline: `Task reminder: ${task.title}`,
					note: task.details,
					destinations: ["character"],
					payload: {
						taskId: task.id,
						dueAt: task.dueAt,
						priority: task.priority
					}
				}
			}, { reason: "task:due" });
			notebookStore.markTaskNotified(task.id, now + attentionConfig.value.requeueDelayMs);
		}
	}
	async function tick() {
		if (!leadership?.isLeader() || processing.value) return;
		const now = Date.now();
		enqueueDueTasks(now);
		const nextIndex = scheduledNotifies.value.findIndex((item) => item.nextRunAt <= now);
		if (nextIndex < 0) return;
		const [next] = scheduledNotifies.value.splice(nextIndex, 1);
		removePending(next.event.data.id);
		try {
			await processSparkNotify(next.event, next.control);
		} catch (error) {
			if (next.attempts + 1 < next.maxAttempts) {
				scheduledNotifies.value = [...scheduledNotifies.value, {
					...next,
					attempts: next.attempts + 1,
					nextRunAt: computeNextRunAt(next.event, next.attempts + 1)
				}];
				pendingNotifies.value = [...pendingNotifies.value, next.event];
			} else console.warn("Dropped spark:notify after max attempts:", error);
		}
	}
	function startTicker() {
		if (tickTimer) return;
		tickTimer = setInterval(() => {
			tick();
		}, attentionConfig.value.tickIntervalMs);
	}
	function stopTicker() {
		if (!tickTimer) return;
		clearInterval(tickTimer);
		tickTimer = void 0;
	}
	async function handleSparkEmit(_) {}
	function startConsumers() {
		if (eventUnsubscribes.length) return;
		eventUnsubscribes.push(modsServerChannelStore.onEvent("spark:notify", async (event) => {
			if (!leadership?.isLeader()) return;
			try {
				await handleIncomingSparkNotify(event);
			} catch (error) {
				console.warn("Failed to handle spark:notify event:", error);
			}
		}));
		eventUnsubscribes.push(modsServerChannelStore.onEvent("spark:emit", async (event) => {
			if (!leadership?.isLeader()) return;
			try {
				await handleSparkEmit(event);
			} catch (error) {
				console.warn("Failed to handle spark:emit event:", error);
			}
		}));
		startTicker();
	}
	function stopConsumers() {
		stopTicker();
		for (const unsubscribe of eventUnsubscribes) unsubscribe();
		eventUnsubscribes.length = 0;
	}
	/** Starts background consumers only while this renderer owns synchronized leadership. */
	function initialize(syncedPinia) {
		if (initialized) return;
		initialized = true;
		leadership = syncedPinia;
		stopLeadershipListener = syncedPinia.onLeadershipChange((isLeader) => {
			if (isLeader) startConsumers();
			else stopConsumers();
		});
	}
	function dispose() {
		stopLeadershipListener?.();
		stopLeadershipListener = void 0;
		stopConsumers();
		leadership = void 0;
		initialized = false;
	}
	onScopeDispose(dispose);
	return {
		processing,
		pendingNotifies,
		scheduledNotifies,
		attentionConfig,
		initialize,
		startTicker,
		stopTicker,
		dispose,
		handleSparkNotify: handleIncomingSparkNotify,
		handleSparkNotifyWithReaction,
		handleSparkEmit
	};
});
//#endregion
//#region ../../packages/stage-ui/src/stores/character/index.ts
var MAX_REACTIONS = 200;
var parserFactory = useLlmmarkerParser;
var useCharacterStore = defineStore("character", () => {
	const { activeCard, systemPrompt } = storeToRefs(useAiriCardStore());
	const name = computed(() => activeCard.value?.name ?? "");
	const reactions = ref([]);
	const streamingReactions = ref(/* @__PURE__ */ new Map());
	const sessions = useChatSessionStore();
	async function emitTextOutput(text) {
		const speech = new SpeechClient({
			sessionId: sessions.activeSessionId,
			turnId: nanoid$1()
		}, "read-aloud");
		const parser = parserFactory({
			onLiteral: async (literal) => {
				if (literal) await speech.write(literal);
			},
			onSpecial: async (special) => {
				if (special) await speech.special(special);
			}
		});
		await parser.consume(text);
		await parser.end();
		await speech.end();
		speech.finish().catch((error) => console.error("Speech output failed", error));
	}
	function onSparkNotifyReactionStreamEvent(sparkEventId, chunk, options) {
		if (!streamingReactions.value.has(sparkEventId)) {
			const newReaction = reactive({
				id: nanoid$1(),
				message: "",
				createdAt: Date.now(),
				sourceEventId: sparkEventId,
				metadata: options?.metadata
			});
			const speech = new SpeechClient({
				sessionId: sessions.activeSessionId,
				turnId: `spark:${sparkEventId}`
			}, "notification");
			const parser = parserFactory({
				onLiteral: async (literal) => {
					if (literal) await speech.write(literal);
				},
				onSpecial: async (special) => {
					if (special) await speech.special(special);
				}
			});
			streamingReactions.value.set(sparkEventId, {
				reaction: newReaction,
				speech,
				parser
			});
		}
		const state = streamingReactions.value.get(sparkEventId);
		state.reaction.message += chunk;
		state.parser.consume(chunk);
	}
	function onSparkNotifyReactionStreamEnd(sparkEventId, fullText, options) {
		const state = streamingReactions.value.get(sparkEventId);
		if (!state) return;
		state.reaction.message = fullText;
		recordSparkNotifyReaction(sparkEventId, fullText, { metadata: options?.metadata });
		state.parser.end().then(async () => {
			await state.speech.end();
			streamingReactions.value.delete(sparkEventId);
			await state.speech.finish();
		}).catch((error) => console.error("Notification speech failed", error));
	}
	function recordSparkNotifyReaction(sparkEventId, message, options) {
		const newReaction = {
			id: nanoid$1(),
			message,
			createdAt: Date.now(),
			sourceEventId: sparkEventId,
			metadata: options?.metadata
		};
		reactions.value.push(newReaction);
		if (reactions.value.length > MAX_REACTIONS) reactions.value.splice(0, reactions.value.length - MAX_REACTIONS);
	}
	function clearReactions() {
		reactions.value = [];
	}
	return {
		name,
		reactions,
		systemPrompt,
		recordSparkNotifyReaction,
		onSparkNotifyReactionStreamEvent,
		onSparkNotifyReactionStreamEnd,
		clearReactions,
		emitTextOutput
	};
});
//#endregion
//#region ../../packages/stage-ui/src/stores/chat/constants.ts
var CONTEXT_CHANNEL_NAME = "airi-context-update";
var CHAT_STREAM_CHANNEL_NAME = "airi-chat-stream";
//#endregion
//#region ../../packages/stage-ui/src/stores/mods/api/context-channel.ts
var contextUpdateEvent = defineEventa("stage:context:update");
var chatStreamEvent = defineEventa("stage:chat:stream");
var chatStreamCancelEvent = defineEventa("stage:chat:stream:cancel");
/** Terminal failure shares the token channel so it cannot arrive before the stream's admission event. */
var chatStreamFailedEvent = defineEventa("stage:chat:stream:failed");
function createBroadcastLink(name) {
	const localContext = createContext();
	const broadcastChannel = new BroadcastChannel(name);
	const broadcast = createContext$2(broadcastChannel, { closeOnDispose: true });
	const link = linkChannel(localContext, broadcast.context);
	return {
		broadcastContext: broadcast.context,
		localContext,
		dispose(reason) {
			link.dispose();
			broadcast.dispose(reason);
			localContext.abort(reason);
		}
	};
}
/**
* Connects context updates and chat stream events across same-origin Stage contexts.
*
* Eventa owns delivery identity and loop suppression. The bridge owns both
* BroadcastChannel instances and closes them during disposal.
*/
function createContextChannel() {
	const contexts = createBroadcastLink(CONTEXT_CHANNEL_NAME);
	const stream = createBroadcastLink(CHAT_STREAM_CHANNEL_NAME);
	return {
		emitContext(message) {
			return contexts.localContext.emit(contextUpdateEvent, message);
		},
		emitStream(event) {
			return stream.localContext.emit(chatStreamEvent, event);
		},
		emitStreamCancel(command) {
			return stream.localContext.emit(chatStreamCancelEvent, command);
		},
		emitStreamFailed(turn) {
			return stream.localContext.emit(chatStreamFailedEvent, turn);
		},
		onStreamFailed(listener) {
			return stream.broadcastContext.on(chatStreamFailedEvent, (event, options) => {
				if (options?.raw.message && event.body) listener(event.body);
			});
		},
		onContext(listener) {
			return contexts.broadcastContext.on(contextUpdateEvent, (event, options) => {
				const message = event.body;
				if (options?.raw.message && message) return listener(message);
			});
		},
		onStream(listener) {
			return stream.broadcastContext.on(chatStreamEvent, (event, options) => {
				const message = event.body;
				if (options?.raw.message && message) return listener(message);
			});
		},
		onStreamCancel(listener) {
			return stream.broadcastContext.on(chatStreamCancelEvent, (event, options) => {
				const command = event.body;
				if (options?.raw.message && command) return listener(command);
			});
		},
		dispose(reason) {
			contexts.dispose(reason);
			stream.dispose(reason);
		}
	};
}
//#endregion
export { useCharacterStore as n, useCharacterOrchestratorStore as r, createContextChannel as t };
