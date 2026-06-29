# AI-Native Capability Layer: Architectural Manifesto

## 1. Overview
The **Capability Layer** is the foundational pattern of this application. It decouples the "intent" of an action from its "implementation," creating a high-integrity bridge between human users, AI agents, and the application state. 

In this architecture, neither the UI nor the LLM mutates state directly. Instead, they both request an "Action" from a centralized registry. This ensures that the AI is never "guessing" what it can do; it is strictly constrained by the same schemas that drive the UI's internal logic.

## 2. The Core Components

### 2.1 The Atomic Capability Definition
Every feature starts as a static object in `capabilities.ts`. This object is the Single Source of Truth (SSOT).

```typescript
export const CapabilityAddNode: AppCapability = {
  id: 'addNode',                   // Unique identifier used in code and LLM calls
  name: 'Add Node',                // Human-readable name
  description: '...',              // Critical for the LLM to understand context
  isExposedToLLM: true,            // Gating for safety/utility
  parameters: { ...schema }        // JSON Schema (OpenAPI style) for validation
};
```

### 2.2 The Shared Registry
All capabilities are collected into an array (`ALL_CAPABILITIES`). This allows us to:
1.  **Iterate on Tools**: Use `getLLMTools()` to automatically generate the function declarations sent to the Gemini API.
2.  **Validate Payloads**: Ensure incoming requests from the sidebar or UI match the expected shape.
3.  **Audit Interactions**: Every execution can be logged with its capability ID and payload.

### 2.3 The Centralized Execution Engine (`executeAction`)
The `App.tsx` file contains the `executeAction` function. This is the only place where `setNodes`, `setEdges`, or other state setters should be called for global mutations.

- **Human Path**: `Button Click -> executeAction('addNode', { ... })`
- **AI Path**: `LLM Function Call -> executeAction(call.name, call.args)`

---

## 3. The Iteration Workflow (Mandatory)

When adding a new feature or operation to the app, follow these steps in order:

### Step 1: Define the Capability
Open `capabilities.ts`.
- Create a new `AppCapability` constant.
- Define a strict `parameters` schema using the `Type` enum from `@google/genai`.
- Add the new constant to the `ALL_CAPABILITIES` array.

### Step 2: Implement the Logic
Open `App.tsx`.
- Update the `executeAction` switch statement.
- Add a `case` for the new `CapabilityID`.
- Implement the state mutation logic (e.g., updating a specific node property).
- Ensure the return value provides enough feedback (e.g., `{ status: 'success', id: ... }`).

### Step 3: Extend the UI (If necessary)
- If the feature needs a new visual representation (like a new UX component), create the component in `components/ux/`.
- Register the component in `components/ux/registry.tsx`.
- The AI will automatically see the new `enum` values in the capability schema and start using it immediately without further prompt engineering.

---

## 4. Why This Pattern?

### 4.1 Synchronized Intelligence
By deriving `TOOLS` from `capabilities.ts`, the LLM’s knowledge of the app is always perfectly in sync with the actual code. If you change a parameter name in the schema, the LLM receives that update in the next request. This eliminates "hallucinated tool calls."

### 4.2 High Integrity and Safety
By checking `isExposedToLLM`, we can build powerful administrative tools that only humans can use, while giving the AI a safe "sandbox" of capabilities to orchestrate the user's workspace.

### 4.3 Deterministic Behavior
Because the LLM is forced to use structured function calls rather than raw text generation to change the app, the results are deterministic. We don't have to parse messy strings; we receive clean, validated JSON.

### 4.4 Observability (The Audit Trail)
Since every change passes through `executeAction`, we have a perfect stream of events. We can tell exactly when an AI agent connected two nodes versus when a human manually updated a label.

---

## 5. Implementation Details

### Parameter Schemas
Always use the most restrictive types possible. If a component only supports specific strings, use an `enum` in the schema. This provides the LLM with a clear "menu" of choices, reducing error rates.

```typescript
type: Type.STRING,
enum: ['process', 'decision', 'ux'],
description: 'The visual style of the node'
```

### Response Handling
`executeAction` must return a JSON-serializable object. This object is sent back to the LLM as a `functionResponse`. If the operation fails, return an error object: `{ error: 'Invalid ID' }`. The LLM can then read this error and attempt to correct its next move.

### System Instructions
The `SYSTEM_INSTRUCTION` in `constants.tsx` should focus on *how* to use the tools and the *philosophy* of the design, rather than listing the tools themselves. The tools are self-documenting via their schemas.

---

## 6. Future Expansion
This pattern is designed to scale. Whether we add video generation, real-time collaboration, or complex data visualization, the process remains the same:
1. **Capability** (The Contract)
2. **Execution** (The Mutation)
3. **UI/UX** (The Rendering)

By sticking to this three-step dance, we maintain a codebase that is both human-readable and AI-native.

---
*Documentation Version: 3.0*
*Architect: Gemini Pro 1.5 + Human Architect*
*Principles: Decoupling, Type Safety, AI-Synchronization*
