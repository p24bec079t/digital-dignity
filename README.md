## <img src="src/components/layout/dig-dignity.png" alt="Digital Dignity" width="22" />Digital Dignity


**First Aid for Digital Harm**

This is a privacy-first, browser-only toolkit designed for people who may be scared, overwhelmed, or unsure what to do next.  
No judgment. No tracking. No data stored. Just clear support when it matters most.

---

##  Inspiration & Purpose

Digital harm often happens suddenly — harassment, blackmail, image abuse, deepfakes, or threats.  
In those moments, people don’t need long articles or legal jargon. They need **clarity, calm, and immediate next steps**.

Most existing resources:
- are overwhelming
- require sign-ups or data sharing
- assume the user already knows what to do
- fail to protect dignity and privacy

**Digital Dignity Toolkit** exists to change that.

Its purpose is to:
- help users stay calm in the first critical minutes
- guide them through evidence preservation and safety
- connect them to real, trusted support
- do all of this without collecting a single piece of personal data

The toolkit is especially mindful of **minors**, who face higher risk and often hesitate to ask for help.

---

## Core Features

- **Digital First Aid Flow**  
  Clear, step-by-step guidance for the first 10 critical minutes after online harm.

- **Crisis Response Checklists**  
  Simple, decisive actions focused on safety, silence, and evidence preservation.

- **Evidence Preservation Guidance**  
  What to capture, how to capture it, and where to store it safely for maximum protection.

- **Under-18 Protection Guidance**  
  Dedicated information on legal protections and child-safety resources for minors.

- **Human Support Connections**  
  Direct links to trusted organizations and helplines, not automated reports.

- **AI-Assisted Support (Optional)**  
  Judgment-free guidance to help users understand their situation and next steps.

- **Deepfake Risk Check (Client-Side)**  
  Browser-only image analysis to identify possible manipulation indicators, without uploads.

- **Absolute Privacy by Design**  
  No accounts, no cookies, no analytics, no storage, no third-party tracking — ever.

---

## 🛠 Tech Stack

- **Frontend and Style:** HTML,tailwind CSS,React-Vite,Typescript
- **Build Tool:** Vite
- **Logic:** Custom Typescript logic
- **AI Integration:** Google Gemini API
- **Deployment:** Vercel

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variable:

```env
# AI Integration
GEMINI_API_KEY=your_gemini_api_key
```
## 📁 Project Structure

```text
dig-dignity/
├── scenarios/                        # Entry points based on what the user is facing
│                                     # High-level situation selection and routing
│
├── guide/                            # Step-by-step, in-depth response guides
│   ├── screenshot-blackmail/         # Guidance for screenshot-based blackmail
│   │                                 # Silence, evidence capture, and safety steps
│   │
│   ├── deepfake/                     # What to do if you’re targeted by a deepfake
│   │                                 # Reporting, takedown, and harm reduction
│   │
│   └── account-takeover/             # Account compromise and recovery guide
│                                     # Securing access and preventing repeat attacks
│
├── chat/                             # AI-assisted, judgment-free support interface
│                                     # Helps users understand next steps calmly
│
├── help-centre/                      # Central hub for actionable guidance
│                                     # Crisis response and evidence preservation
│
├── helplines/                        # Trusted external support organizations
│                                     # Hotlines, reporting tools, and safety resources
│
├── privacy/                          # Privacy-first architecture explanation
│                                     # Zero storage, no tracking, client-only design
│
└── deepfake-check/                   # Client-side deepfake risk analysis 
```
##  Getting Started


### 1. Clone Repository
```bash

git clone https://github.com/your-username/dig-dignity.git
cd dig-dignity
```
### 2. Install Dependencies
```
npm install
# or
pnpm install
```
### 3. Run Server
```
npm run dev
# or
pnpm dev
```
## ➕ Future Add-Ons

- Guided creation of a **personal digital safety plan** before any incident occurs
- Simple tools to **prepare and secure accounts in advance**, including password and 2FA guidance
- Practice guides for **proper evidence capture and safe storage**
- Local, private mapping of **trusted people and support organizations** to contact early  
