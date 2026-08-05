# Academic Project Report

**PROJECT TITLE:** AURA-Learn: Gamified Learning Platform for Rural Education  
**COURSE/DEGREE:** Bachelor of Technology (B.Tech) in Computer Science and Business Systems  
**DEVELOPED BY:** SUKANT S  
**DEPARTMENT:** Computer Science and Business Systems  

---

## 1. Project Overview & Objective

### 1.1 Objective
The primary objective of **AURA-Learn** is to bridge the educational gap in rural communities by providing an interactive, game-based learning platform optimized for low-bandwidth and offline environments. By integrating a bilingual curriculum (English and Tamil), speech-based accessibility aids, and an experience point (XP)/coin reward economy, the platform aims to increase primary school retention and learning engagement without relying on costly server backends.

---

## 2. Requirements Specification

### 2.1 Functional Requirements
1. **User Identity & Roles**: Separate student portals (grades, avatars, levels, games), teacher portals (lesson uploads, quiz creation, student performance logs), and admin consoles (user directories, engagement graphs).
2. **Offline-First Storage**: Local client database simulation using standard `localStorage` to persist student progression, earned badges, and quiz attempts.
3. **Bilingual Engine**: Integrated instant translation toggle supporting English and Tamil languages.
4. **Gamification Economy**: Accumulation of XP, level progressions, coin purchases for customized avatars, and badge achievements.
5. **Interactive Quizzes**: Client-side graded quizzes with MCQs and True/False questions, automatic score tracking, and time limits.
6. **Speech Assistant**: Text-to-Speech (TTS) integration utilizing native Web Speech APIs to assist children with low literacy skills.
7. **Certificate Generator**: Dynamic generation of printable graduation credentials with unique mock QR verification codes.

### 2.2 Non-Functional Requirements
1. **Low-Bandwidth Operation**: Light file sizes loading in under 1.5s on simulated 2G/3G speeds.
2. **Responsive Layout**: Fluid layouts matching mobile, tablet, and desktop viewports.
3. **Zero Dependencies**: Pure HTML5/CSS3 and vanilla JavaScript without heavy external frameworks (like Angular or React).
4. **Offline Resilience**: Progressive Web App caching via service workers.

### 2.3 System Requirements
*   **Operating System**: Windows 10/11
*   **Editor**: Visual Studio Code
*   **Client Device**: Smartphone, Tablet, or PC with modern browsers (Edge/Chrome)

---

## 3. Database Schema (Simulated in LocalStorage)

To bypass complex backend configurations while maintaining data consistency, a simulated relational schema is managed via JSON arrays inside browser `localStorage`:

### 3.1 Student Registry (`aura_students` Table)
```json
{
  "username": "string (Primary Key)",
  "password": "string",
  "level": "integer",
  "xp": "integer",
  "coins": "integer",
  "activeAvatar": "string (Emoji)",
  "unlockedAvatars": "array [string]",
  "badges": "array [string]",
  "progress": {
    "maths": "integer (percentage)",
    "science": "integer",
    "english": "integer"
  }
}
```

### 3.2 Lesson Store (`aura_lessons` Table)
```json
{
  "id": "string (Key)",
  "subject": "string (maths/science/english)",
  "title": "string",
  "titleTa": "string (Tamil)",
  "content": "string",
  "contentTa": "string (Tamil)",
  "type": "string (notes/video)",
  "resourceUrl": "string"
}
```

---

## 4. System Design & Architecture

### 4.1 Modular Framework
The architecture is structured around four core modules implemented inside [app.js](file:///C:/Users/sukan/.gemini/antigravity/scratch/gamified-learning-platform/app.js):

1.  **State Manager (Data Layer)**: Handles localStorage reads/writes, logins/logouts, and synchronization.
2.  **Bilingual & Speech Engine (Accessibility Layer)**: Manages UI translation mappings and maps text guides to SpeechSynthesisUtterance threads.
3.  **Gamification Engine (Motivational Layer)**: Runs loops for XP additions, level-up threshold checks, avatar shops, and badge unlocks.
4.  **Interactive Game Engines (Activities Layer)**:
    *   **Math Farm**: Renders dynamic arithmetic operators, maps user choices to crop progress values, and controls seed-to-fruit animations.
    *   **Word Builder**: Extracts character segments from keyword lists, generates letter pool elements, and handles spelling verifications.

---

## 5. Key Features & Implementation Mechanics

### 5.1 Bilingual Translation Mechanism
Instead of heavy backend translation calls, we maintain a local translation dictionary. HTML elements are mapped dynamically. When the language toggle button is clicked:
```javascript
const textDict = Translations[currentLanguage];
for (const [key, value] of Object.entries(textDict)) {
    const el = document.getElementById(key);
    if (el) el.innerText = value;
}
```
This enables zero-latency translation, critical for low-performance smartphones.

### 5.2 Speech Narration
Using the browser’s native `SpeechSynthesis` window interface:
*   Language locale is automatically switched (`en-US` vs `ta-IN`) based on the selected UI language.
*   Speech rates are optimized at `0.85` speed so children in rural communities can easily grasp complex technical terms.

---

## 6. Project Verification & Results

### 6.1 Simulation Scenario Results
1.  **Student Progression**: Successfully registered student `arjun`, completed three maths fractions guides, completed the fractions quiz, and checked that XP rose from `0` to `75`, triggering Level 2 progression.
2.  **Virtual Economy**: Earned coins from arithmetic games, spent `100` coins in the shop to purchase a Tiger avatar, and verified it updated in the header HUD.
3.  **Teacher Additions**: Logged in as `teacher_tamil`, added a new science lesson "Photosynthesis", logged back in as a student, and confirmed it loaded instantly.

---

## 7. Conclusion & Future Enhancements

**AURA-Learn** successfully demonstrates that high-engagement gamified learning structures can be deployed in resource-constrained rural schools with zero server dependencies and zero operating costs.

### Future Work:
*   Integrating peer-to-peer (P2P) database synchronization using WebRTC to let students share leaderboards in local classrooms without internet.
*   Expanding Speech-to-Text (STT) interfaces to allow students to answer quiz questions verbally.
