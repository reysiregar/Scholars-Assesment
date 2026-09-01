# EduScholar — Multi-Step Placement Test Engine

Live Demo: https://scholars-assesment.vercel.app  
GitHub Repository: https://github.com/reysiregar/Scholars-Assesment

---

## Project Overview

**EduScholar** is a modern, production-quality **Multi-Step Placement Test Engine** designed for prospective students and educational institutions. The application guides learners through a streamlined 3-step diagnostic experience:
```text
Landing & Biodata Registration ──▶ 15-Question Placement Test ──▶ Result & Program Recommendation
```
The platform delivers instant diagnostic scoring, accurate proficiency tiering (Beginner, Intermediate, Advanced), tailored curriculum recommendations, and a direct WhatsApp consultation CTA with pre-filled candidate metadata.

---

## Features

- **Intuitive Multi-Step Flow**:
  - **Step 1 (`/`)**: Engaging landing hero with assessment details and a validated student biodata registration form.
  - **Step 2 (`/test`)**: Progressive 15-question placement test engine with dynamic progress bar, interactive question navigation matrix, and modal submit verification.
  - **Step 3 (`/result`)**: Comprehensive scorecard featuring percentage score, circular gauge dial, level classification badge, tailored program recommendations, and dynamic WhatsApp CTA.
- **Robust Client-Side Validation**:
  - Full Name (required, min. 2 characters).
  - Email (valid email format regex).
  - WhatsApp Number (required, phone format validation).
  - Domisili / Target Program selection (required).
- **Persistent State & Resilience (`localStorage`)**:
  - Auto-saves user answers, current question index, and biodata in real-time.
  - Full recovery upon browser refresh.
  - Session and result corruption safeguards.
- **Thoughtful Quiz Navigation & Submit Safeguards**:
  - Free bidirectional navigation (Previous, Next, Question jump palette).
  - Previously selected answers persist seamlessly.
  - Submit confirmation modal displaying answered vs. unanswered question chips with direct-jump links to prevent accidental submissions.
- **Dynamic WhatsApp Counselor CTA**:
  - Generates pre-filled, URL-encoded WhatsApp messages containing student name, score, level, and selected target track.
  - Configurable admissions contact number.
- **Responsive & Accessible**:
  - Mobile-first layout tested across mobile (375px+), tablet, and desktop viewports.
  - ARIA attributes, semantic HTML5 tags, keyboard navigation, and visible focus rings.
  - Print-friendly styling for saving or printing diagnostic reports.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: JavaScript (ES Modules)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) (Handcrafted custom UI, strictly zero prohibited styled UI libraries)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## Project Structure

```
scholars-assessment/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Badge.jsx               # Reusable status & level badges
│   │   ├── Button.jsx              # Reusable button with variants, sizes & loading states
│   │   ├── Input.jsx               # Accessible text/email/tel input control
│   │   ├── Navbar.jsx              # Header with breadcrumbs & reset action
│   │   ├── OptionButton.jsx        # Multiple-choice option item (A-D badges & active state)
│   │   ├── ProgressBar.jsx         # Animated progress bar with question counter
│   │   ├── QuestionCard.jsx        # Question container & option group
│   │   ├── QuestionPalette.jsx     # 15-question jump palette matrix
│   │   ├── QuizNavigation.jsx      # Prev, Next, and Submit controls
│   │   ├── RecommendationCard.jsx  # Dynamic program curriculum recommendation
│   │   ├── ResultCard.jsx          # Scorecard dial, level badge, & item breakdown
│   │   ├── Select.jsx              # Custom styled select dropdown
│   │   ├── SubmitConfirmation.jsx  # Verification modal with unanswered question jump links
│   │   └── WhatsAppButton.jsx      # Dynamic WhatsApp CTA generator button
│   ├── data/
│   │   ├── programs.js             # Beginner, Intermediate, Advanced recommendation models
│   │   └── questions.js            # 15 calibrated English placement questions
│   ├── hooks/
│   │   └── useQuiz.js              # Encapsulated quiz state, navigation & persistence hook
│   ├── pages/
│   │   ├── LandingPage.jsx         # Landing overview & biodata form
│   │   ├── ResultPage.jsx          # Scorecard, recommendation & WhatsApp CTA
│   │   └── TestPage.jsx            # 15-question test interface
│   ├── utils/
│   │   ├── scoring.js              # Scoring formula & level classification
│   │   ├── storage.js              # Centralized localStorage helper functions
│   │   └── whatsapp.js             # WhatsApp URL builder & message encoder
│   ├── App.jsx                     # Router & Route guards
│   ├── index.css                   # Tailwind directives & base styles
│   └── main.jsx                    # Application entry point
├── index.html                      # HTML root with Inter font & metadata
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json                     # SPA routing rewrite rule for Vercel
└── README.md
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone the Repository
```bash
git clone [ADD GITHUB URL]
cd scholars-assesment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally (Development Server)
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## Deployment Instructions (Vercel)

This project includes a `vercel.json` configuration file with SPA rewrites to ensure direct route navigation (e.g. `/test`, `/result`) functions seamlessly without 404 errors:

1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import this repository.
4. Keep the default build settings (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
5. Click **"Deploy"**.

---

## LocalStorage Persistence Behavior

All client-side persistence is centralized in [`src/utils/storage.js`](file:///src/utils/storage.js):

| Key | Content | Lifecycle |
|---|---|---|
| `eduscholar_biodata` | Student name, email, WhatsApp number, and target program. | Stored on biodata submission; cleared on explicit reset. |
| `eduscholar_quiz_session` | Current question index, answer map `{ [questionId]: optionIndex }`, timestamp. | Updated on every answer selection / navigation; restored on reload. |
| `eduscholar_quiz_result` | Calculated score, level, correct count, item breakdown, completion timestamp. | Generated on submission; prevents accidental loss of completed test. |

---

## Scoring Logic & Placement Tiers

Scoring is computed centrally in [`src/utils/scoring.js`](file:///src/utils/scoring.js) using the exact assessment formula:

$$\text{Score} = \text{round}\left(\frac{\text{Correct Answers}}{15} \times 100\right)$$

### Level Thresholds:
- **`0% – 40%` → Beginner Level**: Focuses on core grammar, basic tenses, and foundational vocabulary.
- **`41% – 75%` → Intermediate Level**: Focuses on conditionals, complex connectors, and academic communication.
- **`76% – 100%` → Advanced Level**: Focuses on executive rhetoric, subjunctive structures, and idiomatic precision.

---

## Design Decisions

1. **Educational Trust Aesthetic**: Used a balanced color palette with Slate neutral backgrounds, Indigo primary branding, Emerald success accents, and Amber highlights to feel like a real education technology platform.
2. **Direct Tailwind CSS**: Handcrafted every component with Tailwind CSS utility classes, adhering strictly to the constraint of zero external component libraries (no shadcn/ui, DaisyUI, MUI, etc.).
3. **Frictionless UX**: Provided both sequential navigation (Prev/Next) and a Question Navigator Matrix for quick jumping and visual completion reassurance.
4. **Resilient Routing & Route Protection**: Guarded `/test` and `/result` to gracefully redirect users if prerequisite steps are missing or already finished.

---

## AI Assistance & Complete Prompt Logs

This project was developed with the assistance of AI pair-programming. In full compliance with assessment guidelines, below is the comprehensive record of prompts and instructions used across the development lifecycle:

### 1. Architecture & Setup Prompt
```text
Buatkan arsitektur mini project Multi-Step Placement Test Engine menggunakan React + Vite dan Tailwind CSS v3 tanpa library komponen pihak ketiga (shadcn/ui, DaisyUI, MUI, dsb). Struktur direktori harus modular dengan folder components, data, hooks, pages, dan utils. Pastikan router menggunakan react-router-dom dengan 3 halaman utama: Landing (Biodata), Test (15 Soal Pilihan Ganda), dan Result (Kalkulasi Skor, Predikat Level, Rekomendasi Program, WhatsApp CTA).
```

### 2. Form & Biodata Validation Prompt
```text
Buat komponen form biodata pada LandingPage.jsx untuk mengumpulkan:
- Nama Lengkap (min. 2 karakter)
- Email (validasi regex email)
- Nomor WhatsApp (validasi numerik 8-15 digit)
- Domisili / Target Program (dropdown select wajib diisi)
Sediakan penanganan error real-time, touch validation, auto-focus pada input pertama yang error, dan penyimpanan ke localStorage.
```

### 3. Quiz State & Engine Hook (`useQuiz`) Prompt
```text
Buat custom hook useQuiz.js untuk mengisolasi state kuis:
- Kelola state currentQuestionIndex, answers map { [id]: optionIndex }, isCompleted, dan result.
- Implementasikan auto-save ke localStorage (eduscholar_quiz_session) setiap kali ada perubahan jawaban atau nomor soal.
- Sediakan fungsi navigasi: selectAnswer, goToNext, goToPrev, jumpToQuestion, submitQuiz, dan resetQuiz.
- Hitung answeredCount, unansweredQuestions list, dan progress percentage dengan useMemo untuk optimasi render.
```

### 4. 15-Question Bank & Program Recommendation Prompt
```text
Rancang dataset 15 soal pilihan ganda bahasa Inggris terkalibrasi di questions.js:
- Soal 1-5: Beginner level (Grammar basics, vocabulary, prepositions, basic tenses).
- Soal 6-10: Intermediate level (Conditionals, modal verbs, connectors, collocations, passives).
- Soal 11-15: Advanced level (Advanced vocabulary, inversion, subjunctive mood, idioms, complex sentence structures).
Buat juga programs.js berisi rekomendasi program belajar untuk masing-masing level (Beginner: Foundation Track, Intermediate: Bridge Track, Advanced: Mastery Track) lengkap dengan durasi, benefit, dan silabus.
```

### 5. UI Components & Pure Tailwind Styling Prompt
```text
Buat komponen UI murni menggunakan Tailwind CSS utility classes:
- Input.jsx & Select.jsx dengan label, ikon, helper text, dan state error accessible.
- ProgressBar.jsx dengan persentase animasi halus dan label progress.
- OptionButton.jsx dengan badge huruf A-D, state hover, focus ring, dan status active/selected.
- QuestionCard.jsx dengan tag kategori, badge difficulty, dan group radio button.
- QuestionPalette.jsx sebagai matriks navigasi 15 nomor soal dengan penanda soal terjawab, kosong, dan aktif.
- SubmitConfirmation.jsx modal dialog yang mendeteksi jika ada soal belum terjawab serta menyediakan link langsung loncat ke soal terkait.
- ResultCard.jsx dengan visual circular SVG score gauge, breakdown review jawaban benar vs salah, dan status predikat.
- WhatsAppButton.jsx untuk menghasilkan tautan wa.me dengan pesan otomatis terformat rapi.
```

### 6. Scoring & Edge Case Handling Prompt
```text
Implementasikan kalkulasi skor pada scoring.js:
- Rumus: round((correctCount / totalCount) * 100).
- Level mapping: 0-40% Beginner, 41-75% Intermediate, 76-100% Advanced.
- Tambahkan deskripsi feedback personal sesuai level.
- Tangani edge case: refresh browser saat ujian (auto-recover dari localStorage), cegah akses halaman /test atau /result tanpa biodata, konfirmasi reset ujian, dan print stylesheet untuk cetak hasil scorecard.
```

