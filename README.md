# Dicto-ai 🎙️✨

Dicto-ai is a state-of-the-art, conversational AI tool discovery application. It blends the premium, dark cinematic aesthetics of the **Elva** design system with the bold, high-contrast, color-blocked accent cards of the **Units** design system. Powered by a live Supabase database and a reactive microphone-recording-to-recommendation pipeline, Dicto-ai lets users describe their goals with their voice and get tailored recommendations in seconds.

---

## 🚀 Core Features & Design Philosophy

### 🎨 The Merged Design System (Elva + Units)
* **Cinematic Dark Backdrop (Elva)**: Deep surface blacks (`#131313`) paired with pure black base colors, layered behind glowing ambient indigo/violet gradients and an oversized, ghosted background typography layer (`18vw` Syne display font).
* **Oversized Flanked Phone Mockup**: A central interactive phone mockup displaying the active Voice Concierge, flanked by dimmed, blurred depth-of-field copies to create a premium 3D layout stack.
* **Bold Color-Blocked Elements (Units)**: Generating high contrast using signature accents (Warm Cream, Vivid Purple, Coral Orange, Amber Yellow, Deep Blue, Vivid Green) on sidebar navigation category cards, FAQ accordions, and step badges.
* **Modern Typography**: Powered by **Syne** (for bold display headlines), **Plus Jakarta Sans** (for clean, legible UI and copy), and **Playfair Display** (for the serif brand wordmark).

### 🎙️ The "Mic Factor" (Voice Concierge Pipeline)
Dicto-ai features a custom, reactive voice-processing pipeline that transforms spoken goals into precise recommendations:
1. **Reactive Audio Capture**: Managed inside the React state store and triggered by a unified voice recorder. The frontend captures audio streams via the browser's `navigator.mediaDevices.getUserMedia` API.
2. **Audio Transcription**: Upon ending speech, the recorded audio blob is packaged and dispatched to `/api/voice` (powered by Sarvam AI's Speech-to-Text API) to resolve the natural language request.
3. **Cognitive Load Optimization (3-Item Limit)**: To prevent information overload while listening, the voice-concierge query engine strictly returns a **maximum of 3 recommendations** (whereas traditional text searches display 5 items).
4. **Analytics**: Logs analytics events (`voice_completed`) on successful queries.

---

## 🛠️ Developer & Agent Architecture

This repository is built and maintained utilizing advanced agentic coding standards, highlighting two main pillars:

### 📑 Artifacts-First Approach
Our development lifecycle follows an **Artifacts-First** strategy to ensure strict alignment, complete transparency, and flawless execution:
* **Task List (`task.md`)**: A living, component-level checklist tracked throughout execution, preventing scope creep and ensuring structural progress.
* **Implementation Plan (`implementation_plan.md`)**: A detailed technical design document written, reviewed, and approved *before* writing any code. It captures target files, design token specifications, and migration plans.
* **Walkthrough (`walkthrough.md`)**: A final verification document summarizing all changes, listing compiler and audit results, and providing manual test flows.
* **Lint & Spacing Audits**: Automated via `audit_script.js` to ensure the project layout adheres to the 8-point spacing grid and branding constraints before deployment.

### 🔌 Extensible Customization & Agent Skills
Our coding agents operate under modular customization layers, enabling the automated creation and consumption of **Skills**:
* **Skill Discovery**: Skills are loaded automatically from the global configurations directory (`~/.gemini/config/skills/`) or project-scoped roots (`.agents/skills/`).
* **YAML Frontmatter**: Each skill contains a `SKILL.md` file featuring structured metadata:
  ```yaml
  ---
  name: "skill_name"
  description: "Description of what the skill does and when the agent should trigger it."
  ---
  ```
* **Rich Capabilities**: Skills can package supporting resources, template scripts in `scripts/`, and reference docs in `references/` to autonomously extend the agent's capabilities without modifying core systems.

---

## ⚙️ Local Development

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed.

### 2. Configure Environment Variables
Create a `.env.local` file at the root of the project and define the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SARVAM_API_KEY=your_sarvam_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Installation & Run
```bash
# Install dependencies (forcing development packages for build-time compilation)
npm install

# Start the local Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🌐 Azure App Service Deployment

The production app is optimized to build and run seamlessly on **Azure App Service (Linux Web App)** with custom domains and SSL.

### 1. Build Compilation Fix
Next.js applications compile during deployment (`SCM_DO_BUILD_DURING_DEPLOYMENT=true`). Because Web App environments run with `NODE_ENV=production`, standard npm installs omit packages listed under `devDependencies` (which contains necessary Next.js and Tailwind plugins like `@tailwindcss/postcss`).
* **Fix**: Configure `NPM_CONFIG_PRODUCTION=false` in the Azure appsettings to force Oryx to install all build dependencies, ensuring a successful production build compilation.

### 2. Domain & SSL Setup
The application is hosted at [https://dicto-ai.me](https://dicto-ai.me) (and [https://www.dicto-ai.me](https://www.dicto-ai.me)).
* **Verification**: DNS ownership verified via TXT record mapping (host `asuid` with custom verification ID).
* **Security**: SSL certificates issued via **Azure App Service Managed Certificates** with SNI binding, forcing all HTTP traffic to redirect to secure HTTPS.
