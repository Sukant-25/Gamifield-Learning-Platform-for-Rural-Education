/**
 * AURA-Learn - Gamified Learning Platform Control Script
 * Implements: LocalStorage database simulator, Speech Synthesis narrator (TTS), 
 *             bilingual translation, Math Farm & Word Builder mini-games,
 *             Quiz grading & MCQs, Teacher/Admin dashboards, Canvas charts.
 */

// Global State
let currentUser = null;
let currentLanguage = 'en'; // 'en' or 'ta'
let currentTheme = 'light';
let activeGame = null;
let activeQuiz = null;

// Translation Dictionary (English and Tamil mapping)
const Translations = {
    en: {
        "header-logo-title": "AURA-Learn",
        "lbl-status": "Offline Cache Ready",
        "tab-student-login": "Student Login",
        "tab-teacher-login": "Teacher Login",
        "tab-admin-login": "Admin Login",
        "auth-title": "Student Portal Login",
        "auth-desc": "Enter your credentials to enter your digital classroom.",
        "lbl-username": "Username",
        "lbl-password": "Password",
        "btn-auth-submit": "Enter Classroom",
        "btn-auth-toggle": "New Student? Register",
        "link-forgot-pass": "Forgot Password?",
        "nav-btn-modules": "📚 Learning Modules",
        "nav-btn-games": "🎮 Play Games",
        "nav-btn-leaderboard": "🏆 Ranks & Badges",
        "nav-btn-shop": "🛍️ Coin Shop",
        "lbl-ch-1": "Read 1 Science notes guide (Earn 30 XP)",
        "lbl-ch-2": "Score 100% in a Mathematics Quiz (Earn 50 XP, 10 Coins)",
        "game-title-farm": "Arithmetic Math Farm",
        "game-desc-farm": "Answer mathematics questions to grow crops on your virtual farm! Avoid wrong answers to prevent crops from drying. Earn Coins & XP!",
        "btn-start-farm": "Play Math Farm",
        "game-title-word": "Bilingual Word Builder",
        "game-desc-word": "Combine translated letters to spell English and Tamil keywords. Sharpens spelling skills and builds vocabulary! Earn Coins & XP!",
        "btn-start-word": "Play Word Builder",
        "title-lead-tbl": "Regional School Ranks",
        "title-badge-tbl": "Achievements Gallery",
        "lbl-badge-desc": "Unlock digital badges by achieving specific educational targets.",
        "lbl-shop-title": "Unlock Special Avatars",
        "lbl-shop-desc": "Spend your earned learning coins to buy fun animal character avatars!",
        "live-notification-text": "AURA-Learn online. Welcome back, select your portal to begin learning!",
        "btn-logout": "🚪 Logout"
    },
    ta: {
        "header-logo-title": "ஆரா-கற்றல்",
        "lbl-status": "ஆஃப்லைன் கேச் தயார்",
        "tab-student-login": "மாணவர் உள்நுழைவு",
        "tab-teacher-login": "ஆசிரியர் உள்நுழைவு",
        "tab-admin-login": "அட்மின் உள்நுழைவு",
        "auth-title": "மாணவர் போர்டல் உள்நுழைவு",
        "auth-desc": "உங்கள் டிஜிட்டல் வகுப்பறைக்குள் நுழைய விவரங்களை உள்ளிடவும்.",
        "lbl-username": "பயனர் பெயர்",
        "lbl-password": "கடவுச்சொல்",
        "btn-auth-submit": "வகுப்பறைக்குள் நுழை",
        "btn-auth-toggle": "புதிய மாணவரா? பதிவு செய்",
        "link-forgot-pass": "கடவுச்சொல் மறந்துவிட்டதா?",
        "nav-btn-modules": "📚 கற்றல் தொகுதிகள்",
        "nav-btn-games": "🎮 விளையாட்டுகள்",
        "nav-btn-leaderboard": "🏆 தரவரிசை & பதக்கங்கள்",
        "nav-btn-shop": "🛍️ நாணயக் கடை",
        "lbl-ch-1": "1 அறிவியல் பாடக் குறிப்பைப் படிக்கவும் (30 XP பெறவும்)",
        "lbl-ch-2": "கணித வினாடி வினாவில் 100% மதிப்பெண் பெறவும் (50 XP, 10 நாணயங்கள் பெறவும்)",
        "game-title-farm": "கணித விவசாயம்",
        "game-desc-farm": "உங்கள் விர்ச்சுவல் பண்ணையில் பயிர்களை வளர்க்க கணிதக் கேள்விகளுக்குப் பதிலளிக்கவும்! பயிர்கள் காயாமல் இருக்க தவறான பதில்களைத் தவிர்க்கவும்.",
        "btn-start-farm": "பண்ணை விளையாடு",
        "game-title-word": "இருமொழி வார்த்தை பில்டர்",
        "game-desc-word": "ஆங்கிலம் மற்றும் தமிழ் சொற்களை உருவாக்க எழுத்துக்களை இணைக்கவும். எழுத்துப்பிழை திறனை மேம்படுத்தி சொல்லகராதியை உருவாக்குங்கள்!",
        "btn-start-word": "வார்த்தை பில்டர் விளையாடு",
        "title-lead-tbl": "வட்டார பள்ளி தரவரிசை",
        "title-badge-tbl": "சாதனைகள் கேலரி",
        "lbl-badge-desc": "குறிப்பிட்ட கல்வி இலக்குகளை அடைவதன் மூலம் டிஜிட்டல் பதக்கங்களைத் திறக்கவும்.",
        "lbl-shop-title": "சிறப்பு அவதாரங்களைத் திறக்கவும்",
        "lbl-shop-desc": "வேடிக்கையான விலங்கு அவதாரங்களை வாங்க நீங்கள் சம்பாதித்த நாணயங்களை செலவிடுங்கள்!",
        "live-notification-text": "ஆரா-கற்றல் ஆன்லைனில் உள்ளது. வகுப்பைத் தொடங்க உள்நுழையவும்!",
        "btn-logout": "🚪 வெளியேறு"
    }
};

/* ========================================================================= */
/* 1. MOCK DATABASE HYDRATION & RECOVERY                                    */
/* ========================================================================= */

// Default DB Entries
const defaultLessons = [
    {
        id: "L1",
        subject: "maths",
        title: "Introduction to Fractions",
        titleTa: "பின்னங்கள் பற்றிய அறிமுகம்",
        content: "A fraction represents a part of a whole. For example, if you divide a farm land into 4 equal parts, and you cultivate crops in 3 parts, the cultivated fraction is 3/4. The top number is called the Numerator, and the bottom is the Denominator.",
        contentTa: "ஒரு பின்னம் என்பது ஒரு முழுப் பகுதியின் ஒரு பகுதியைக் குறிக்கிறது. உதாரணமாக, நீங்கள் ஒரு விவசாய நிலத்தை 4 சம பாகங்களாகப் பிரித்து, 3 பாகங்களில் பயிர் வளர்த்தால், பயிரிடப்பட்ட பின்னம் 3/4 ஆகும். மேல் எண் தொகுதி என்றும், கீழ் எண் பகுதி என்றும் அழைக்கப்படுகிறது.",
        type: "notes",
        resourceUrl: ""
    },
    {
        id: "L2",
        subject: "science",
        title: "Photosynthesis - How Plants Eat",
        titleTa: "ஒளிச்சேர்க்கை - தாவரங்கள் எவ்வாறு உண்கின்றன",
        content: "Plants make their own food using sunlight, carbon dioxide from air, and water from soil. This process is called Photosynthesis. Chlorophyll, the green pigment in leaves, traps sunlight energy to convert inputs into glucose and oxygen.",
        contentTa: "தாவரங்கள் சூரிய ஒளி, காற்றில் உள்ள கார்பன் டை ஆக்சைடு மற்றும் மண்ணில் உள்ள நீரைப் பயன்படுத்தி தங்கள் சொந்த உணவைத் தயாரிக்கின்றன. இந்த செயல்முறை ஒளிச்சேர்க்கை என்று அழைக்கப்படுகிறது. இலைகளில் உள்ள பச்சையம் சூரிய ஆற்றலைப் பிடித்து குளுக்கோஸ் மற்றும் ஆக்ஸிஜனாக மாற்றுகிறது.",
        type: "notes",
        resourceUrl: ""
    },
    {
        id: "L3",
        subject: "english",
        title: "Nouns and Pronouns",
        titleTa: "பெயர்ச்சொற்கள் மற்றும் பிரதிபெயர்ச்சொற்கள்",
        content: "A Noun is a name of a person, place, or thing. For example: Arjun, Village, Book. A Pronoun is a word used in place of a noun. For example: He, She, It, They. Arjun went to school because he wanted to learn.",
        contentTa: "பெயர்ச்சொல் என்பது ஒரு நபர், இடம் அல்லது பொருளின் பெயரைக் குறிக்கும். உதாரணம்: அர்ஜுன், கிராமம், புத்தகம். பிரதிபெயர் என்பது பெயர்ச்சொல்லுக்குப் பதிலாகப் பயன்படுத்தப்படும் சொல். உதாரணம்: அவன், அவள், அது, அவர்கள்.",
        type: "notes",
        resourceUrl: ""
    }
];

const defaultQuizzes = [
    {
        id: "Q1",
        subject: "maths",
        title: "Fractions Quiz Challenge",
        questions: [
            {
                type: "mcq",
                question: "In the fraction 5/8, what is the number 8 called?",
                questionTa: "5/8 என்ற பின்னத்தில், 8 என்ற எண் எவ்வாறு அழைக்கப்படுகிறது?",
                options: ["Numerator / தொகுதி", "Denominator / பகுதி", "Integer / முழு எண்", "Decimal / தசம எண்"],
                answer: "Denominator / பகுதி"
            },
            {
                type: "tf",
                question: "The fraction 1/2 is larger than 1/4.",
                questionTa: "1/2 என்ற பின்னம் 1/4 ஐ விட பெரியது.",
                options: ["True / சரி", "False / தவறு"],
                answer: "True / சரி"
            },
            {
                type: "mcq",
                question: "If a circle is split into 4 equal slices and 2 are colored, what is the fraction?",
                questionTa: "ஒரு வட்டம் 4 சம பாகங்களாகப் பிரிக்கப்பட்டு 2 பாகங்களுக்கு வண்ணம் பூசப்பட்டால், பின்னம் என்ன?",
                options: ["1/4", "1/2", "3/4", "4/2"],
                answer: "1/2"
            }
        ]
    },
    {
        id: "Q2",
        subject: "science",
        title: "Plants Biology Quiz",
        questions: [
            {
                type: "mcq",
                question: "What pigment gives leaves their green color?",
                questionTa: "இலைகளுக்கு பச்சை நிறத்தை கொடுக்கும் நிறமி எது?",
                options: ["Hemoglobin / ஹீமோகுளோபின்", "Chlorophyll / பச்சையம்", "Melanin / மெலனின்", "Carotene / கரோட்டின்"],
                answer: "Chlorophyll / பச்சையம்"
            },
            {
                type: "tf",
                question: "Plants release Carbon Dioxide during photosynthesis.",
                questionTa: "ஒளிச்சேர்க்கையின் போது தாவரங்கள் கார்பன் டை ஆக்சைடை வெளியிடுகின்றன.",
                options: ["True / சரி", "False / தவறு"],
                answer: "False / தவறு"
            }
        ]
    }
];

const defaultLeaderboard = [
    { username: "Kavitha", xp: 1250, badgeCount: 4, school: "Nellore Govt School" },
    { username: "Arjun", xp: 850, badgeCount: 3, school: "Salem Middle School" },
    { username: "Priya", xp: 620, badgeCount: 2, school: "Nellore Govt School" },
    { username: "Manoj", xp: 410, badgeCount: 1, school: "Guntur High School" }
];

const defaultShopItems = [
    { id: "av-tiger", name: "Royal Tiger / புலி", emoji: "🐯", cost: 100, unlocked: false },
    { id: "av-peacock", name: "Peacock / மயில்", emoji: "🦚", cost: 150, unlocked: false },
    { id: "av-elephant", name: "Elephant / யானை", emoji: "🐘", cost: 200, unlocked: false },
    { id: "av-monkey", name: "Cheeky Monkey / குரங்கு", emoji: "🐒", cost: 250, unlocked: false }
];

// Initialize local database structure
function initDatabase() {
    if (!localStorage.getItem('aura_students')) {
        const seedStudents = [
            {
                username: "arjun",
                password: "123",
                level: 1,
                xp: 15,
                coins: 40,
                activeAvatar: "🧑‍🎓",
                unlockedAvatars: ["🧑‍🎓"],
                badges: ["First Steps / முதல் படி"],
                progress: { maths: 30, science: 0, english: 0 }
            }
        ];
        localStorage.setItem('aura_students', JSON.stringify(seedStudents));
    }
    
    if (!localStorage.getItem('aura_teachers')) {
        const seedTeachers = [
            { username: "teacher_tamil", password: "123", email: "tamil@school.org" }
        ];
        localStorage.setItem('aura_teachers', JSON.stringify(seedTeachers));
    }

    if (!localStorage.getItem('aura_lessons')) {
        localStorage.setItem('aura_lessons', JSON.stringify(defaultLessons));
    }

    if (!localStorage.getItem('aura_quizzes')) {
        localStorage.setItem('aura_quizzes', JSON.stringify(defaultQuizzes));
    }

    if (!localStorage.getItem('aura_leaderboard')) {
        localStorage.setItem('aura_leaderboard', JSON.stringify(defaultLeaderboard));
    }

    if (!localStorage.getItem('aura_shop_items')) {
        localStorage.setItem('aura_shop_items', JSON.stringify(defaultShopItems));
    }

    if (!localStorage.getItem('aura_audit_logs')) {
        const initialLogs = ["System DB Hydrated. Service worker cache active."];
        localStorage.setItem('aura_audit_logs', JSON.stringify(initialLogs));
    }
}

/* ========================================================================= */
/* 2. INITIALIZATION & TRANSLATOR                                            */
/* ========================================================================= */

// Safe DOM initialization wrapper
function initApp() {
    initDatabase();
    bindAuthentication();
    bindDashboardNavigation();
    bindBilingualControls();
    bindTeacherPanel();
    bindAdminDashboard();
    bindModalControls();
    
    // Default: Check if a user session exists
    toggleView("sec-auth");
    
    logAuditLog("AURA-Learn Console initialized safely.");
}

// Check readyState to prevent event timing crashes
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// Switch view panels
function toggleView(sectionId) {
    document.querySelectorAll("main > section").forEach(sec => {
        sec.classList.remove("active");
    });
    const target = document.getElementById(sectionId);
    if(target) target.classList.add("active");
}

// Translations observer
function updateLanguageUI() {
    const textDict = Translations[currentLanguage];
    
    for (const [key, value] of Object.entries(textDict)) {
        const el = document.getElementById(key);
        if (el) {
            if (el.tagName === 'INPUT' && el.placeholder) {
                el.placeholder = value;
            } else {
                el.innerText = value;
            }
        }
    }

    const langBtn = document.getElementById("lang-toggle-btn");
    if(langBtn) langBtn.textContent = currentLanguage === 'en' ? 'தமிழ்' : 'English';
    
    if (currentUser) {
        renderStudentLessons();
        renderShop();
    }
}

function bindBilingualControls() {
    const langBtn = document.getElementById("lang-toggle-btn");
    if (langBtn) {
        langBtn.addEventListener("click", () => {
            currentLanguage = currentLanguage === 'en' ? 'ta' : 'en';
            updateLanguageUI();
            notifyEvent(`Language switched to: ${currentLanguage.toUpperCase()}`);
        });
    }

    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            themeBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
            notifyEvent(`Theme toggled to: ${currentTheme.toUpperCase()}`);
        });
    }
}

/* ========================================================================= */
/* 3. AUTHENTICATION CONTROLLERS & PROFILE                                   */
/* ========================================================================= */

let activeRole = 'student'; // 'student', 'teacher', 'admin'
let isRegisterMode = false;

function bindAuthentication() {
    const tabStudent = document.getElementById("tab-student-login");
    const tabTeacher = document.getElementById("tab-teacher-login");
    const tabAdmin = document.getElementById("tab-admin-login");
    
    const formTitle = document.getElementById("auth-title");
    const formDesc = document.getElementById("auth-desc");
    const emailGroup = document.getElementById("form-group-email");
    const submitBtn = document.getElementById("btn-auth-submit");
    const toggleBtn = document.getElementById("btn-auth-toggle");
    const forgotLink = document.getElementById("link-forgot-pass");
    const logoutBtn = document.getElementById("btn-logout");

    if (tabStudent) tabStudent.onclick = () => switchRoleTab('student', tabStudent);
    if (tabTeacher) tabTeacher.onclick = () => switchRoleTab('teacher', tabTeacher);
    if (tabAdmin) tabAdmin.onclick = () => switchRoleTab('admin', tabAdmin);

    function switchRoleTab(role, tabEl) {
        activeRole = role;
        isRegisterMode = false;
        
        document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
        if(tabEl) tabEl.classList.add("active");
        
        if(emailGroup) emailGroup.style.display = "none";
        if(forgotLink) forgotLink.style.display = role === 'admin' ? "none" : "block";
        if(toggleBtn) toggleBtn.style.display = role === 'student' ? "block" : "none";
        
        if(formTitle) formTitle.textContent = `${capitalize(role)} Portal Login`;
        if(formDesc) formDesc.textContent = `Enter your credentials to enter your digital classroom.`;
        if(submitBtn) submitBtn.textContent = "Enter Classroom";
        if(toggleBtn) toggleBtn.textContent = "New Student? Register";
    }

    if (toggleBtn) {
        toggleBtn.onclick = () => {
            isRegisterMode = !isRegisterMode;
            if (isRegisterMode) {
                if(formTitle) formTitle.textContent = "Student Account Registration";
                if(formDesc) formDesc.textContent = "Create your free digital student account and start learning!";
                if(submitBtn) submitBtn.textContent = "Register & Log In";
                if(toggleBtn) toggleBtn.textContent = "Already have an account? Login";
            } else {
                if(formTitle) formTitle.textContent = "Student Portal Login";
                if(formDesc) formDesc.textContent = "Enter your credentials to enter your digital classroom.";
                if(submitBtn) submitBtn.textContent = "Enter Classroom";
                if(toggleBtn) toggleBtn.textContent = "New Student? Register";
            }
        };
    }

    if (forgotLink) {
        forgotLink.onclick = (e) => {
            e.preventDefault();
            const user = document.getElementById("auth-user").value;
            if (!user) {
                alert("Please enter your username in the field first.");
                return;
            }
            alert(`Forgot Password recovery: The recovery link has been simulated for user [${user}]. Check local school registry lists.`);
        };
    }

    const authForm = document.getElementById("auth-form");
    if (authForm) {
        authForm.onsubmit = (e) => {
            if(e) e.preventDefault();
            const username = document.getElementById("auth-user").value.trim().toLowerCase();
            const pass = document.getElementById("auth-pass").value;

            if (activeRole === 'admin') {
                if (username === 'admin' && pass === '123') {
                    loginSuccess({ username: 'Administrator', role: 'admin' });
                } else {
                    alert("Invalid Admin credentials. (Hint: admin / 123)");
                }
                return;
            }

            const dbTable = activeRole === 'student' ? 'aura_students' : 'aura_teachers';
            let users = JSON.parse(localStorage.getItem(dbTable)) || [];

            if (isRegisterMode) {
                if (users.find(u => u.username === username)) {
                    alert("Username is already taken.");
                    return;
                }
                const newStudent = {
                    username: username,
                    password: pass,
                    level: 1,
                    xp: 0,
                    coins: 20,
                    activeAvatar: "🧑‍🎓",
                    unlockedAvatars: ["🧑‍🎓"],
                    badges: [],
                    progress: { maths: 0, science: 0, english: 0 }
                };
                users.push(newStudent);
                localStorage.setItem(dbTable, JSON.stringify(users));
                addAuditLog(`New student registered: ${username}`);
                loginSuccess(newStudent);
            } else {
                const match = users.find(u => u.username === username && u.password === pass);
                if (match) {
                    loginSuccess(match);
                } else {
                    alert(`Invalid ${activeRole} credentials. (Try arjun/123 or teacher_tamil/123)`);
                }
            }
        };
    }

    if (logoutBtn) {
        logoutBtn.onclick = () => {
            currentUser = null;
            const hud = document.getElementById("user-hud-panel");
            if(hud) hud.style.display = "none";
            document.getElementById("auth-user").value = "";
            document.getElementById("auth-pass").value = "";
            
            if(window.speechSynthesis) window.speechSynthesis.cancel();
            
            toggleView("sec-auth");
            notifyEvent("Successfully logged out of portal.");
        };
    }
}

function loginSuccess(user) {
    currentUser = user;
    currentUser.role = activeRole;
    
    const hud = document.getElementById("user-hud-panel");
    if (hud) hud.style.display = "flex";
    
    const usernameEl = document.getElementById("hud-username");
    if(usernameEl) usernameEl.textContent = capitalize(user.username);
    
    const roleEl = document.getElementById("hud-role-badge");
    if(roleEl) roleEl.textContent = activeRole.toUpperCase();
    
    if (activeRole === 'student') {
        updateStudentHUD();
        renderStudentLessons();
        renderLeaderboard();
        renderBadges();
        renderShop();
        toggleView("sec-student");
        notifyEvent(`Welcome back, Student ${capitalize(user.username)}! Ready to learn?`);
        
        const chk1 = document.getElementById("daily-chk-1");
        const chk2 = document.getElementById("daily-chk-2");
        if(chk1) chk1.textContent = "⬜";
        if(chk2) chk2.textContent = "⬜";
        
        const challenge1 = document.getElementById("daily-challenge-1");
        const challenge2 = document.getElementById("daily-challenge-2");
        if(challenge1) challenge1.className = "challenge-item";
        if(challenge2) challenge2.className = "challenge-item";
    } else if (activeRole === 'teacher') {
        renderTeacherClassroom();
        toggleView("sec-teacher");
        notifyEvent(`Teacher ${capitalize(user.username)} logged in. Study builder ready.`);
    } else {
        loadAdminAnalytics();
        toggleView("sec-admin");
        notifyEvent("Administrator control interface unlocked.");
    }
}

function updateStudentHUD() {
    if (!currentUser || currentUser.role !== 'student') return;
    
    const students = JSON.parse(localStorage.getItem('aura_students')) || [];
    const index = students.findIndex(s => s.username === currentUser.username);
    if(index !== -1) {
        currentUser = { ...students[index], role: 'student' };
    }

    const xpEl = document.getElementById("hud-xp");
    const coinsEl = document.getElementById("hud-coins");
    const lvlEl = document.getElementById("hud-level");
    const avatarEl = document.getElementById("hud-avatar-img");

    if(xpEl) xpEl.textContent = currentUser.xp;
    if(coinsEl) coinsEl.textContent = currentUser.coins;
    if(lvlEl) lvlEl.textContent = currentUser.level;
    if(avatarEl) avatarEl.src = getAvatarDataUrl(currentUser.activeAvatar);
    
    const xpNeeded = currentUser.level * 100;
    const progressPct = clamp((currentUser.xp / xpNeeded) * 100, 0, 100);
    
    const barEl = document.getElementById("lvl-progress-bar");
    const txtEl = document.getElementById("lvl-progress-text");
    const titleEl = document.getElementById("lbl-lvl-title");

    if(barEl) barEl.style.width = `${progressPct}%`;
    if(txtEl) txtEl.textContent = `${currentUser.xp} / ${xpNeeded} XP`;
    if(titleEl) titleEl.textContent = `Level ${currentUser.level}`;
}

/* ========================================================================= */
/* 4. STUDENT DASHBOARD CONTROLLERS                                          */
/* ========================================================================= */

let activeSubjectFilter = 'maths';

function bindDashboardNavigation() {
    const navModules = document.getElementById("nav-btn-modules");
    const navGames = document.getElementById("nav-btn-games");
    const navLeaderboard = document.getElementById("nav-btn-leaderboard");
    const navShop = document.getElementById("nav-btn-shop");

    const panels = document.querySelectorAll(".dash-panel");

    if(navModules) navModules.onclick = () => switchPanel(navModules, "panel-modules");
    if(navGames) navGames.onclick = () => switchPanel(navGames, "panel-games");
    if(navLeaderboard) navLeaderboard.onclick = () => switchPanel(navLeaderboard, "panel-leaderboard");
    if(navShop) navShop.onclick = () => switchPanel(navShop, "panel-shop");

    function switchPanel(btn, panelId) {
        document.querySelectorAll(".dash-nav-btn").forEach(b => b.classList.remove("active"));
        panels.forEach(p => p.classList.remove("active"));
        
        if(btn) btn.classList.add("active");
        const targetPanel = document.getElementById(panelId);
        if(targetPanel) targetPanel.classList.add("active");
        
        const gameContainer = document.getElementById("active-game-container");
        if(gameContainer) gameContainer.style.display = "none";
        
        if(window.speechSynthesis) window.speechSynthesis.cancel();
    }

    const chips = document.querySelectorAll(".subject-chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            activeSubjectFilter = chip.getAttribute("data-subject");
            renderStudentLessons();
        });
    });
}

function renderStudentLessons() {
    const grid = document.getElementById("student-lesson-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const lessons = JSON.parse(localStorage.getItem('aura_lessons')) || [];
    const quizzes = JSON.parse(localStorage.getItem('aura_quizzes')) || [];

    const filteredLessons = lessons.filter(l => l.subject === activeSubjectFilter);
    const filteredQuizzes = quizzes.filter(q => q.subject === activeSubjectFilter);

    filteredLessons.forEach(less => {
        const card = document.createElement("div");
        card.className = "lesson-card";
        
        const titleText = currentLanguage === 'en' ? less.title : less.titleTa;
        const contentText = currentLanguage === 'en' ? less.content : less.contentTa;
        
        card.innerHTML = `
            <div class="lesson-header">
                <span class="lesson-subject-tag">${less.subject}</span>
                <span class="badge" style="background-color: var(--color-secondary);">Read</span>
            </div>
            <div class="lesson-card-body">
                <h4>${titleText}</h4>
                <p class="lesson-summary">${contentText}</p>
            </div>
            <div class="lesson-card-actions">
                <button class="lesson-action-btn" onclick="openStudyLesson('${less.id}')">📖 Read Guide</button>
            </div>
        `;
        grid.appendChild(card);
    });

    filteredQuizzes.forEach(quiz => {
        const card = document.createElement("div");
        card.className = "lesson-card";
        card.style.borderColor = "var(--color-warning)";
        
        card.innerHTML = `
            <div class="lesson-header" style="background-color: rgba(245, 158, 11, 0.05);">
                <span class="lesson-subject-tag">${quiz.subject}</span>
                <span class="badge" style="background-color: var(--color-warning); color: #000;">Quiz</span>
            </div>
            <div class="lesson-card-body">
                <h4>${quiz.title}</h4>
                <p class="lesson-summary">Test your knowledge! Answer ${quiz.questions.length} questions. Earn badges and XP points!</p>
            </div>
            <div class="lesson-card-actions">
                <button class="lesson-action-btn" onclick="startQuizChallenge('${quiz.id}')" style="color: var(--color-warning);">📝 Take Quiz</button>
            </div>
        `;
        grid.appendChild(card);
    });

    if (filteredLessons.length === 0 && filteredQuizzes.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 3; text-align: center; color: var(--text-secondary); padding: 30px;">No materials available for this subject yet.</div>`;
    }
}

// Opens the detail drawer view for study notes
window.openStudyLesson = (lessonId) => {
    const lessons = JSON.parse(localStorage.getItem('aura_lessons')) || [];
    const less = lessons.find(l => l.id === lessonId);
    if (!less) return;

    const oldDrawer = document.getElementById("active-study-drawer");
    if(oldDrawer) oldDrawer.remove();

    const titleText = currentLanguage === 'en' ? less.title : less.titleTa;
    const contentText = currentLanguage === 'en' ? less.content : less.contentTa;

    const drawer = document.createElement("div");
    drawer.className = "expanded-lesson-box";
    drawer.id = "active-study-drawer";
    
    drawer.innerHTML = `
        <div class="exp-lesson-header">
            <span class="lesson-subject-tag">${less.subject}</span>
            <h3 class="exp-lesson-title">${titleText}</h3>
            <button class="btn-close-game" onclick="document.getElementById('active-study-drawer').remove()">&times;</button>
        </div>
        <div class="speech-assist-row">
            <span>🔊 <strong>Voice Assistant:</strong> Read notes aloud for easier learning</span>
            <button class="speech-assist-btn" id="btn-voice-narrate">Listen Lesson</button>
        </div>
        <div class="exp-lesson-body">${contentText}</div>
        ${less.resourceUrl ? `
            <div class="video-container">
                <iframe src="${less.resourceUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
        ` : ''}
        <div class="form-actions" style="margin-top: 15px;">
            <button class="btn btn-secondary" onclick="simulateNotesDownload('${less.title}')">💾 Download PDF Notes</button>
            <button class="btn btn-primary" onclick="completeStudyNote('${less.id}')">Mark as Finished</button>
        </div>
    `;

    const grid = document.getElementById("student-lesson-grid");
    if(grid) {
        grid.parentNode.insertBefore(drawer, grid);
        drawer.scrollIntoView({ behavior: 'smooth' });
    }

    const speakBtn = document.getElementById("btn-voice-narrate");
    if (speakBtn) {
        speakBtn.addEventListener("click", () => {
            toggleSpeechNarration(contentText);
        });
    }
};

window.simulateNotesDownload = (title) => {
    alert(`File System: [${title}.pdf] has been successfully cached on your local storage for offline reading!`);
    notifyEvent(`PDF notes successfully saved locally: ${title}`);
};

window.completeStudyNote = (id) => {
    const challenge1 = document.getElementById("daily-chk-1");
    if (challenge1 && challenge1.textContent === "⬜" && activeSubjectFilter === "science") {
        challenge1.textContent = "✅";
        const cCard = document.getElementById("daily-challenge-1");
        if(cCard) cCard.classList.add("completed");
        awardXPandCoins(30, 0);
        notifyEvent("Daily Task Complete: Read 1 Science guide! +30 XP awarded.");
    } else {
        awardXPandCoins(15, 0);
        notifyEvent("Lesson read complete! Earned +15 XP.");
    }
    
    const drawer = document.getElementById("active-study-drawer");
    if(drawer) drawer.remove();
};

/* ========================================================================= */
/* 5. ACCESSIBILITY TEXT-TO-SPEECH NARRATOR (Web Speech API)                */
/* ========================================================================= */

let speechUtterance = null;
let isSpeaking = false;

function toggleSpeechNarration(text) {
    if (!window.speechSynthesis) {
        alert("Your web browser does not support Speech Synthesis audio.");
        return;
    }

    const speakBtn = document.getElementById("btn-voice-narrate");

    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
        if(speakBtn) {
            speakBtn.textContent = "Listen Lesson";
            speakBtn.style.backgroundColor = "var(--color-secondary)";
        }
        notifyEvent("Voice narration silenced.");
        return;
    }

    speechUtterance = new SpeechSynthesisUtterance(text);
    
    if (currentLanguage === 'ta') {
        speechUtterance.lang = 'ta-IN';
    } else {
        speechUtterance.lang = 'en-US';
    }

    speechUtterance.onend = () => {
        isSpeaking = false;
        if(speakBtn) {
            speakBtn.textContent = "Listen Lesson";
            speakBtn.style.backgroundColor = "var(--color-secondary)";
        }
    };

    speechUtterance.onerror = (e) => {
        console.error("Speech Synthesis failure:", e);
        isSpeaking = false;
        if(speakBtn) {
            speakBtn.textContent = "Listen Lesson";
            speakBtn.style.backgroundColor = "var(--color-secondary)";
        }
    };

    speechUtterance.rate = 0.85;
    
    window.speechSynthesis.speak(speechUtterance);
    isSpeaking = true;
    if(speakBtn) {
        speakBtn.textContent = "⏹️ Stop Voice";
        speakBtn.style.backgroundColor = "var(--color-danger)";
    }
    notifyEvent("Voice narration active. Pitch-rate optimized for students.");
}

/* ========================================================================= */
/* 6. GAMIFICATION ENGINE - MINI GAMES                                       */
/* ========================================================================= */

function bindModalControls() {
    const closeGameBtn = document.getElementById("btn-close-game");
    if (closeGameBtn) {
        closeGameBtn.onclick = () => {
            const gameContainer = document.getElementById("active-game-container");
            if(gameContainer) gameContainer.style.display = "none";
            activeGame = null;
        };
    }

    const startFarmBtn = document.getElementById("btn-start-farm");
    const startWordBtn = document.getElementById("btn-start-word");

    if (startFarmBtn) startFarmBtn.onclick = () => startMiniGame("farm");
    if (startWordBtn) startWordBtn.onclick = () => startMiniGame("word");

    // Close Modals
    const closeLvlBtn = document.getElementById("btn-close-levelup");
    if(closeLvlBtn) {
        closeLvlBtn.onclick = () => {
            const m = document.getElementById("levelup-modal");
            if(m) m.classList.remove("active");
        };
    }

    const closeCertBtn = document.getElementById("btn-close-cert");
    if(closeCertBtn) {
        closeCertBtn.onclick = () => {
            const m = document.getElementById("certificate-modal");
            if(m) m.classList.remove("active");
        };
    }

    const printCertBtn = document.getElementById("btn-print-certificate");
    if(printCertBtn) {
        printCertBtn.onclick = () => {
            window.print();
        };
    }

    const quitQuizBtn = document.getElementById("btn-quit-quiz");
    if (quitQuizBtn) {
        quitQuizBtn.onclick = () => {
            if(confirm("Are you sure you want to quit? Your progress for this quiz will be lost.")) {
                clearInterval(quizState.timerId);
                const m = document.getElementById("quiz-modal");
                if(m) m.classList.remove("active");
                notifyEvent("Quiz challenge aborted.");
            }
        };
    }
}

function startMiniGame(type) {
    const container = document.getElementById("active-game-container");
    const screen = document.getElementById("game-screen-area");
    
    if(container) {
        container.style.display = "block";
        container.scrollIntoView({ behavior: 'smooth' });
    }
    activeGame = type;

    if (type === "farm") {
        const title = document.getElementById("active-game-title");
        if(title) title.textContent = "Math Farm - Grow Crops!";
        loadMathFarmGame(screen);
    } else {
        const title = document.getElementById("active-game-title");
        if(title) title.textContent = "Bilingual Word Builder";
        loadWordBuilderGame(screen);
    }
}

// Math Farm logic
let farmStats = { score: 0, cropProgress: 0, currentCrop: '🌾' };

function loadMathFarmGame(screen) {
    if(!screen) return;
    farmStats.score = 0;
    farmStats.cropProgress = 10;
    farmStats.currentCrop = '🌱';

    renderFarmBoard();

    function renderFarmBoard() {
        const num1 = Math.floor(rand(2, 10));
        const num2 = Math.floor(rand(2, 10));
        const ops = ['+', '-'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        
        let answer = 0;
        if (op === '+') answer = num1 + num2;
        else answer = num1 - num2;

        let choices = new Set([answer]);
        while(choices.size < 4) {
            choices.add(answer + Math.floor(rand(-5, 6)));
        }
        choices = Array.from(choices).sort(() => Math.random() - 0.5);

        screen.innerHTML = `
            <div class="math-farm-board">
                <div class="farm-crops">
                    <div class="crop-cell">
                        <span>${farmStats.currentCrop}</span>
                        <span class="crop-label">Current Crop</span>
                    </div>
                    <div style="font-size: 20px; display:flex; align-items:center;">🌾 ➔ 🌽 ➔ 🍉</div>
                </div>
                
                <div class="lvl-progress-outer" style="max-width: 300px; width: 100%;">
                    <div class="lvl-progress-inner" style="width: ${farmStats.cropProgress}%"></div>
                </div>
                
                <div class="farm-question-box">${num1} ${op} ${num2} = ?</div>
                
                <div class="farm-answers-grid">
                    ${choices.map(c => `<button class="farm-btn" onclick="submitFarmAnswer(${c}, ${answer})">${c}</button>`).join('')}
                </div>
                
                <div class="farm-stats">
                    <span>Score: <strong>${farmStats.score} / 5</strong> answers</span>
                    <span>Crops status: <strong>${farmStats.cropProgress}% Grown</strong></span>
                </div>
            </div>
        `;
    }
}

window.submitFarmAnswer = (choice, correct) => {
    if (choice === correct) {
        farmStats.score++;
        farmStats.cropProgress = Math.min(farmStats.cropProgress + 20, 100);
        
        if (farmStats.cropProgress >= 80) farmStats.currentCrop = '🍉';
        else if (farmStats.cropProgress >= 50) farmStats.currentCrop = '🌽';
        else farmStats.currentCrop = '🌱';

        notifyEvent("Correct! Crops are growing tall. +10 XP!");
        
        if (farmStats.score >= 5) {
            awardXPandCoins(50, 10);
            alert("Congratulations! Your farm is fully grown and harvested! Earned +50 XP and 10 Coins.");
            const gameContainer = document.getElementById("active-game-container");
            if(gameContainer) gameContainer.style.display = "none";
            addBadge("Math Farmer / இளம் விவசாயி");
            return;
        }
    } else {
        farmStats.cropProgress = Math.max(farmStats.cropProgress - 15, 10);
        notifyEvent("Wrong answer! Crop withered slightly. Try again.");
    }
    
    loadMathFarmGame(document.getElementById("game-screen-area"));
};

// Word Builder logic
const spellingWords = [
    { word: "WATER", wordTa: "தண்ணீர்", pool: ["W", "A", "T", "E", "R", "K", "O", "S"] },
    { word: "EARTH", wordTa: "பூமி", pool: ["E", "A", "R", "T", "H", "B", "U", "N"] },
    { word: "SCHOOL", wordTa: "பள்ளி", pool: ["S", "C", "H", "O", "O", "L", "T", "I"] }
];
let currentWordIndex = 0;
let builtWord = [];

function loadWordBuilderGame(screen) {
    if(!screen) return;
    currentWordIndex = 0;
    builtWord = [];
    renderWordBuilder();
}

function renderWordBuilder() {
    const screen = document.getElementById("game-screen-area");
    if(!screen) return;
    const item = spellingWords[currentWordIndex];

    screen.innerHTML = `
        <div class="word-builder-board">
            <div class="word-clue-box">
                <span style="font-size: 11px; color: var(--text-secondary); display:block;">TRANSLATED CLUE</span>
                <strong>${item.wordTa}</strong> (English spelling puzzle)
            </div>
            
            <div class="word-slots" id="slots-area">
                ${builtWord.map(letter => `<div class="letter-tile" onclick="removeLetter('${letter}')">${letter}</div>`).join('')}
                ${builtWord.length === 0 ? '<span style="color: var(--text-muted);">Click letter tiles below to build word</span>' : ''}
            </div>
            
            <div class="letter-pool">
                ${item.pool.map(letter => `<button class="letter-tile" onclick="clickPoolLetter('${letter}')">${letter}</button>`).join('')}
            </div>
            
            <div class="form-actions">
                <button class="btn btn-secondary" onclick="resetWordBuilder()">Reset Word</button>
                <button class="btn btn-primary" onclick="checkBuiltWord()">Submit Spelling</button>
            </div>
        </div>
    `;
}

window.clickPoolLetter = (letter) => {
    builtWord.push(letter);
    renderWordBuilder();
};

window.removeLetter = (letter) => {
    const idx = builtWord.indexOf(letter);
    if(idx !== -1) builtWord.splice(idx, 1);
    renderWordBuilder();
};

window.resetWordBuilder = () => {
    builtWord = [];
    renderWordBuilder();
};

window.checkBuiltWord = () => {
    const targetWord = spellingWords[currentWordIndex].word;
    const finalSpelled = builtWord.join("");

    if (finalSpelled === targetWord) {
        notifyEvent(`Awesome! You spelled [${targetWord}] correctly! +15 XP!`);
        currentWordIndex++;
        builtWord = [];
        
        if (currentWordIndex >= spellingWords.length) {
            alert("Superb! You completed all vocabulary words! Earned +40 XP and 8 Coins.");
            awardXPandCoins(40, 8);
            const gameContainer = document.getElementById("active-game-container");
            if(gameContainer) gameContainer.style.display = "none";
            addBadge("Vocabulary Scout / சொல்லகராதி அறிஞர்");
            return;
        }
        
        renderWordBuilder();
    } else {
        alert(`Spelling is incorrect. (Hint: It spells ${targetWord})`);
        builtWord = [];
        renderWordBuilder();
    }
};

/* ========================================================================= */
/* 7. INTERACTIVE QUIZ & GRADING ENGINE                                      */
/* ========================================================================= */

let quizState = {
    questions: [],
    currentIndex: 0,
    answers: [],
    correctCount: 0,
    timer: 30,
    timerId: null
};

window.startQuizChallenge = (quizId) => {
    const quizzes = JSON.parse(localStorage.getItem('aura_quizzes')) || [];
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    activeQuiz = quiz;
    quizState.questions = quiz.questions;
    quizState.currentIndex = 0;
    quizState.answers = [];
    quizState.correctCount = 0;

    const modal = document.getElementById("quiz-modal");
    if(modal) modal.classList.add("active");

    renderQuizQuestion();
    startQuizTimer();
};

function renderQuizQuestion() {
    const qNumEl = document.getElementById("quiz-question-num");
    const progressEl = document.getElementById("quiz-progress-indicator");
    const qTextEl = document.getElementById("quiz-question-text");
    const optionsContainer = document.getElementById("quiz-options-container");
    const nextBtn = document.getElementById("btn-next-question");

    const currentQ = quizState.questions[quizState.currentIndex];
    
    if(qNumEl) qNumEl.textContent = `Question ${quizState.currentIndex + 1} of ${quizState.questions.length}`;
    
    const pct = ((quizState.currentIndex + 1) / quizState.questions.length) * 100;
    if(progressEl) progressEl.style.width = `${pct}%`;

    const displayQText = currentLanguage === 'en' ? currentQ.question : currentQ.questionTa;
    if(qTextEl) qTextEl.textContent = displayQText;

    if (optionsContainer) {
        optionsContainer.innerHTML = "";
        currentQ.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "quiz-opt-btn";
            btn.textContent = opt;
            btn.onclick = () => {
                document.querySelectorAll(".quiz-opt-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                if(nextBtn) nextBtn.disabled = false;
            };
            optionsContainer.appendChild(btn);
        });
    }

    if(nextBtn) nextBtn.disabled = true;
}

function startQuizTimer() {
    if (quizState.timerId) clearInterval(quizState.timerId);
    
    const timerEl = document.getElementById("quiz-timer");
    quizState.timer = 30;
    if(timerEl) timerEl.textContent = `Timer: ${quizState.timer}s`;

    quizState.timerId = setInterval(() => {
        quizState.timer--;
        if(timerEl) timerEl.textContent = `Timer: ${quizState.timer}s`;

        if (quizState.timer <= 0) {
            clearInterval(quizState.timerId);
            alert("Time's up for this question!");
            evaluateQuestionAnswer("");
        }
    }, 1000);
}

// Binds next question click
const nextQBtn = document.getElementById("btn-next-question");
if (nextQBtn) {
    nextQBtn.onclick = () => {
        clearInterval(quizState.timerId);
        
        const selectedBtn = document.querySelector(".quiz-opt-btn.selected");
        const selection = selectedBtn ? selectedBtn.textContent : "";
        evaluateQuestionAnswer(selection);
    };
}

function evaluateQuestionAnswer(selection) {
    const currentQ = quizState.questions[quizState.currentIndex];
    
    if (selection === currentQ.answer) {
        quizState.correctCount++;
    }

    quizState.currentIndex++;

    if (quizState.currentIndex < quizState.questions.length) {
        renderQuizQuestion();
        startQuizTimer();
    } else {
        finishQuizChallenge();
    }
}

function finishQuizChallenge() {
    clearInterval(quizState.timerId);
    const m = document.getElementById("quiz-modal");
    if(m) m.classList.remove("active");

    const total = quizState.questions.length;
    const score = quizState.correctCount;
    const percentage = Math.round((score / total) * 100);

    let xpEarned = score * 20;
    let coinsEarned = score * 5;

    let congratMsg = `Quiz complete! You answered ${score} out of ${total} correctly. (${percentage}%)`;
    
    const challenge2 = document.getElementById("daily-chk-2");
    if (percentage === 100 && activeSubjectFilter === 'maths' && challenge2 && challenge2.textContent === "⬜") {
        challenge2.textContent = "✅";
        const cCard = document.getElementById("daily-challenge-2");
        if(cCard) cCard.classList.add("completed");
        xpEarned += 50;
        coinsEarned += 10;
        congratMsg += `\nDaily Challenge Complete! Earned bonus 50 XP and 10 Coins.`;
    }

    awardXPandCoins(xpEarned, coinsEarned);
    
    const students = JSON.parse(localStorage.getItem('aura_students')) || [];
    const idx = students.findIndex(s => s.username === currentUser.username);
    if(idx !== -1) {
        students[idx].progress[activeSubjectFilter] = Math.max(students[idx].progress[activeSubjectFilter] || 0, percentage);
        
        if (students[idx].progress[activeSubjectFilter] === 100) {
            addBadge(`${capitalize(activeSubjectFilter)} Master`);
            triggerCertificateAwards(activeSubjectFilter);
        }
        
        localStorage.setItem('aura_students', JSON.stringify(students));
    }

    alert(`${congratMsg}\nEarned: +${xpEarned} XP, +${coinsEarned} Coins.`);
    updateStudentHUD();
    renderStudentLessons();
}

/* ========================================================================= */
/* 8. COIN SHOP & AVATAR UPGRADES                                           */
/* ========================================================================= */

function renderShop() {
    const grid = document.getElementById("shop-items-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const shopItems = JSON.parse(localStorage.getItem('aura_shop_items')) || [];

    shopItems.forEach(item => {
        const isUnlocked = currentUser.unlockedAvatars.includes(item.emoji);
        const isEquipped = currentUser.activeAvatar === item.emoji;

        let actionBtnHTML = "";
        if (isEquipped) {
            actionBtnHTML = `<button class="btn btn-secondary btn-shop" disabled>Equipped</button>`;
        } else if (isUnlocked) {
            actionBtnHTML = `<button class="btn btn-primary btn-shop" onclick="equipAvatar('${item.emoji}')">Equip</button>`;
        } else {
            actionBtnHTML = `<button class="btn btn-primary btn-shop" onclick="buyAvatar('${item.id}', ${item.cost}, '${item.emoji}')" style="background-color: var(--color-warning); color:#000;">Buy for 🪙${item.cost}</button>`;
        }

        const card = document.createElement("div");
        card.className = "shop-item-card";
        card.innerHTML = `
            <div class="shop-item-art">${item.emoji}</div>
            <div class="shop-item-name">${item.name}</div>
            <div class="shop-item-cost">${isUnlocked ? 'Unlocked' : `🪙 ${item.cost} Coins`}</div>
            ${actionBtnHTML}
        `;
        grid.appendChild(card);
    });
}

window.buyAvatar = (id, cost, emoji) => {
    if (currentUser.coins < cost) {
        alert("You do not have enough coins to unlock this avatar yet. Keep completing quizzes!");
        return;
    }

    const students = JSON.parse(localStorage.getItem('aura_students')) || [];
    const idx = students.findIndex(s => s.username === currentUser.username);
    if(idx !== -1) {
        students[idx].coins -= cost;
        students[idx].unlockedAvatars.push(emoji);
        students[idx].activeAvatar = emoji;
        localStorage.setItem('aura_students', JSON.stringify(students));
        
        notifyEvent(`Purchased avatar unlocked! Equipped ${emoji}.`);
        updateStudentHUD();
        renderShop();
    }
};

window.equipAvatar = (emoji) => {
    const students = JSON.parse(localStorage.getItem('aura_students')) || [];
    const idx = students.findIndex(s => s.username === currentUser.username);
    if(idx !== -1) {
        students[idx].activeAvatar = emoji;
        localStorage.setItem('aura_students', JSON.stringify(students));
        notifyEvent(`Avatar modified to: ${emoji}`);
        updateStudentHUD();
        renderShop();
    }
};

/* ========================================================================= */
/* 9. TEACHER CONTROL PANEL                                                  */
/* ========================================================================= */

function bindTeacherPanel() {
    const tAddLessBtn = document.getElementById("t-btn-add-lesson");
    const tAddQuizBtn = document.getElementById("t-btn-add-quiz");
    const pLess = document.getElementById("t-panel-lesson");
    const pQuiz = document.getElementById("t-panel-quiz");

    if (tAddLessBtn) tAddLessBtn.onclick = () => switchTeacherPanel(tAddLessBtn, pLess);
    if (tAddQuizBtn) tAddQuizBtn.onclick = () => switchTeacherPanel(tAddQuizBtn, pQuiz);

    function switchTeacherPanel(btn, panelEl) {
        document.querySelectorAll(".teacher-tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".teacher-panel-content").forEach(p => p.classList.remove("active"));
        
        if(btn) btn.classList.add("active");
        if(panelEl) panelEl.classList.add("active");
    }

    // Save Lesson Form
    const addLessForm = document.getElementById("add-lesson-form");
    if (addLessForm) {
        addLessForm.onsubmit = (e) => {
            if(e) e.preventDefault();
            const subject = document.getElementById("less-subject").value;
            const type = document.getElementById("less-type").value;
            const title = document.getElementById("less-title").value;
            const titleTa = document.getElementById("less-title-ta").value;
            const content = document.getElementById("less-content").value;
            const contentTa = document.getElementById("less-content-ta").value;
            const url = document.getElementById("less-video-url").value;

            const lessons = JSON.parse(localStorage.getItem('aura_lessons')) || [];
            
            const newLess = {
                id: `L${lessons.length + 1}`,
                subject,
                title,
                titleTa,
                content,
                contentTa,
                type,
                resourceUrl: url
            };

            lessons.push(newLess);
            localStorage.setItem('aura_lessons', JSON.stringify(lessons));

            addAuditLog(`Teacher uploaded lesson: ${title}`);
            alert("Lesson published successfully! Students can access it instantly on their dashboards.");
            
            addLessForm.reset();
        };
    }

    // Save Quiz Question Form
    const addQForm = document.getElementById("add-quiz-form");
    if (addQForm) {
        addQForm.onsubmit = (e) => {
            if(e) e.preventDefault();
            const subject = document.getElementById("q-subject").value;
            const type = document.getElementById("q-type").value;
            const text = document.getElementById("q-text").value;
            const textTa = document.getElementById("q-text-ta").value;
            const answer = document.getElementById("q-answer").value;

            const options = type === 'tf' 
                ? ["True / சரி", "False / தவறு"]
                : [
                    document.getElementById("opt-a").value,
                    document.getElementById("opt-b").value,
                    document.getElementById("opt-c").value,
                    document.getElementById("opt-d").value
                  ];

            const quizzes = JSON.parse(localStorage.getItem('aura_quizzes')) || [];
            const quizIndex = quizzes.findIndex(q => q.subject === subject);
            
            const newQ = {
                type,
                question: text,
                questionTa: textTa,
                options,
                answer
            };

            if (quizIndex !== -1) {
                quizzes[quizIndex].questions.push(newQ);
            } else {
                quizzes.push({
                    id: `Q${quizzes.length + 1}`,
                    subject,
                    title: `${capitalize(subject)} Subject Quiz`,
                    questions: [newQ]
                });
            }

            localStorage.setItem('aura_quizzes', JSON.stringify(quizzes));
            addAuditLog(`Teacher appended quiz question to subject: ${subject}`);
            alert("Interactive quiz question added successfully!");
            
            addQForm.reset();
        };
    }

    const qTypeSelect = document.getElementById("q-type");
    if (qTypeSelect) {
        qTypeSelect.onchange = (e) => {
            const mcqBox = document.getElementById("mcq-options-box");
            if(mcqBox) mcqBox.style.display = e.target.value === 'tf' ? 'none' : 'block';
        };
    }

    const exportBtn = document.getElementById("btn-export-teacher-report");
    if (exportBtn) {
        exportBtn.onclick = () => {
            const students = JSON.parse(localStorage.getItem('aura_students')) || [];
            let csv = "Student Username,Level,XP,Coins,Maths Grade,Science Grade,English Grade\n";
            
            students.forEach(s => {
                csv += `${s.username},${s.level},${s.xp},${s.coins},${s.progress.maths || 0}%,${s.progress.science || 0}%,${s.progress.english || 0}%\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `Classroom_Performance_Report_${new Date().toISOString().slice(0,10)}.csv`;
            link.click();
            
            notifyEvent("Classroom performance CSV report downloaded.");
        };
    }
}

function renderTeacherClassroom() {
    const tbody = document.getElementById("teacher-students-tbody");
    if(!tbody) return;
    tbody.innerHTML = "";

    const students = JSON.parse(localStorage.getItem('aura_students')) || [];

    students.forEach(s => {
        const totalProgress = Math.round(((s.progress.maths || 0) + (s.progress.science || 0) + (s.progress.english || 0)) / 3);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>🧑‍🎓 <strong>${s.username}</strong></td>
            <td>Lvl ${s.level}</td>
            <td>${s.xp}</td>
            <td>${s.coins}</td>
            <td><strong>${totalProgress}%</strong> completed</td>
        `;
        tbody.appendChild(row);
    });
}

/* ========================================================================= */
/* 10. ADMIN DASHBOARD & CUSTOM CANVAS ANALYTICS                             */
/* ========================================================================= */

let adminUserFilter = 'students';

function bindAdminDashboard() {
    const fStud = document.getElementById("btn-filter-students");
    const fTeach = document.getElementById("btn-filter-teachers");

    if(fStud) fStud.onclick = () => switchAdminFilter('students', fStud);
    if(fTeach) fTeach.onclick = () => switchAdminFilter('teachers', fTeach);

    function switchAdminFilter(filter, btnEl) {
        adminUserFilter = filter;
        document.querySelectorAll(".user-filter-btn").forEach(b => b.classList.remove("active"));
        if(btnEl) btnEl.classList.add("active");
        renderAdminUserDirectory();
    }

    const clearBtn = document.getElementById("btn-clear-logs");
    if (clearBtn) {
        clearBtn.onclick = () => {
            localStorage.setItem('aura_audit_logs', JSON.stringify([]));
            renderAdminAuditLogs();
            notifyEvent("Audit registers cleared by admin.");
        };
    }
}

// Draws Canvas Chart metrics
function loadAdminAnalytics() {
    renderAdminUserDirectory();
    renderAdminAuditLogs();

    const canvas = document.getElementById("admin-analytics-chart");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px 'Outfit', sans-serif";
    ctx.fillText("Weekly Classroom Logins & Performance Index", 15, 20);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const loginsData = [45, 62, 85, 74, 98, 42, 35];
    const avgScoreData = [55, 60, 68, 70, 78, 80, 85];

    const chartWidth = 380;
    const chartHeight = 130;
    const originX = 35;
    const originY = 175;

    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, originY - chartHeight);
    ctx.lineTo(originX, originY);
    ctx.lineTo(originX + chartWidth, originY);
    ctx.stroke();

    ctx.fillStyle = "#8a99ad";
    ctx.font = "9px monospace";
    const xSpacing = chartWidth / (days.length - 1);
    
    days.forEach((day, index) => {
        const x = originX + (index * xSpacing);
        ctx.fillText(day, x - 10, originY + 15);
    });

    // Draw Logins Line (Cyan)
    ctx.strokeStyle = "#00e676";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    loginsData.forEach((val, idx) => {
        const x = originX + (idx * xSpacing);
        const y = originY - (val / 100) * chartHeight;
        if(idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw Avg Scores Line (Blue)
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    avgScoreData.forEach((val, idx) => {
        const x = originX + (idx * xSpacing);
        const y = originY - (val / 100) * chartHeight;
        if(idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = "#00e676";
    ctx.fillRect(originX + 200, 10, 8, 8);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Active Logins", originX + 212, 17);

    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(originX + 280, 10, 8, 8);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Avg Quiz Grade %", originX + 292, 17);
}

function renderAdminUserDirectory() {
    const tbody = document.getElementById("admin-users-tbody");
    if(!tbody) return;
    tbody.innerHTML = "";

    const dbKey = adminUserFilter === 'students' ? 'aura_students' : 'aura_teachers';
    const users = JSON.parse(localStorage.getItem(dbKey)) || [];

    users.forEach((u, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>👤 <strong>${u.username}</strong></td>
            <td>${adminUserFilter === 'students' ? 'Student' : 'Teacher'}</td>
            <td>2026-07-24</td>
            <td>
                <button class="btn-delete-user" onclick="deleteUserRow('${dbKey}', ${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

window.deleteUserRow = (dbKey, idx) => {
    if(confirm("Are you sure you want to delete this user from the system registry?")) {
        const users = JSON.parse(localStorage.getItem(dbKey)) || [];
        const username = users[idx].username;
        
        users.splice(idx, 1);
        localStorage.setItem(dbKey, JSON.stringify(users));
        
        addAuditLog(`Admin deleted user: ${username} (DB: ${dbKey})`);
        loadAdminAnalytics();
    }
};

function renderAdminAuditLogs() {
    const box = document.getElementById("admin-audit-log");
    if(!box) return;
    box.innerHTML = "";

    const logs = JSON.parse(localStorage.getItem('aura_audit_logs')) || [];

    logs.reverse().forEach(log => {
        const line = document.createElement("div");
        line.className = "audit-line";
        line.textContent = `> ${log}`;
        box.appendChild(line);
    });
}

/* ========================================================================= */
/* 11. REWARDS, CERTIFICATES & UTILITIES                                     */
/* ========================================================================= */

// Awards XP points and checks level ups
function awardXPandCoins(xp, coins) {
    const students = JSON.parse(localStorage.getItem('aura_students')) || [];
    const idx = students.findIndex(s => s.username === currentUser.username);
    if (idx === -1) return;

    let s = students[idx];
    s.xp += xp;
    s.coins += coins;

    const xpNeeded = s.level * 100;
    if (s.xp >= xpNeeded) {
        s.level++;
        s.xp = s.xp - xpNeeded; // carry over
        s.coins += 50; // Level up bonus coins

        setTimeout(() => {
            const txt = document.getElementById("lvl-congrat-txt");
            if(txt) txt.textContent = `Level ${s.level}`;
            const m = document.getElementById("levelup-modal");
            if(m) m.classList.add("active");
            addAuditLog(`Student ${s.username} leveled up to Level ${s.level}`);
        }, 800);
    }

    localStorage.setItem('aura_students', JSON.stringify(students));
    updateStudentHUD();
}

// Generates printable course certificates
function triggerCertificateAwards(subject) {
    setTimeout(() => {
        const modal = document.getElementById("certificate-modal");
        const recip = document.getElementById("cert-recip-name");
        const course = document.getElementById("cert-course-subject");

        if(recip) recip.textContent = currentUser.username.toUpperCase();
        if(course) course.textContent = `${subject.toUpperCase()} (${subject === 'maths' ? '📐 கணிதம்' : subject === 'science' ? '🔬 அறிவியல்' : '🔤 ஆங்கிலம்'})`;
        
        if(modal) modal.classList.add("active");
    }, 1500);
}

function addBadge(badgeName) {
    const students = JSON.parse(localStorage.getItem('aura_students')) || [];
    const idx = students.findIndex(s => s.username === currentUser.username);
    if(idx !== -1) {
        if(!students[idx].badges.includes(badgeName)) {
            students[idx].badges.push(badgeName);
            localStorage.setItem('aura_students', JSON.stringify(students));
            notifyEvent(`New achievement badge unlocked: ${badgeName}!`);
            renderBadges();
        }
    }
}

function renderBadges() {
    const container = document.getElementById("badges-gallery");
    if(!container) return;
    container.innerHTML = "";

    const allBadges = [
        { name: "First Steps / முதல் படி", emoji: "🐣" },
        { name: "Math Farmer / இளம் விவசாயி", emoji: "🚜" },
        { name: "Vocabulary Scout / சொல்லகராதி அறிஞர்", emoji: "🧩" },
        { name: "Maths Master", emoji: "📐" },
        { name: "Science Master", emoji: "🔬" }
    ];

    allBadges.forEach(b => {
        const isUnlocked = currentUser.badges.includes(b.name);
        const item = document.createElement("div");
        item.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
        item.title = isUnlocked ? `Unlocked: ${b.name}` : `Locked: ${b.name}`;
        
        item.innerHTML = `
            <div class="badge-art">${isUnlocked ? b.emoji : '🔒'}</div>
            <div class="badge-name">${b.name.split("/")[0]}</div>
        `;
        container.appendChild(item);
    });
}

function renderLeaderboard() {
    const tbody = document.getElementById("leaderboard-tbody");
    if(!tbody) return;
    tbody.innerHTML = "";

    let scores = [...defaultLeaderboard];
    
    const exist = scores.find(s => s.username.toLowerCase() === currentUser.username.toLowerCase());
    if(!exist) {
        scores.push({
            username: currentUser.username,
            xp: currentUser.xp + (currentUser.level - 1) * 100,
            badgeCount: currentUser.badges.length,
            school: "My Village Govt School"
        });
    } else {
        exist.xp = currentUser.xp + (currentUser.level - 1) * 100;
        exist.badgeCount = currentUser.badges.length;
    }

    scores.sort((a,b) => b.xp - a.xp);

    scores.forEach((s, idx) => {
        const isMe = s.username.toLowerCase() === currentUser.username.toLowerCase();
        const row = document.createElement("tr");
        if(isMe) row.className = "user-row";
        
        row.innerHTML = `
            <td><strong>#${idx + 1}</strong></td>
            <td>🧑‍🎓 ${capitalize(s.username)} <span style="font-size:10px; color:var(--text-secondary); display:block;">${s.school}</span></td>
            <td>${s.xp}</td>
            <td>🏅 ${s.badgeCount}</td>
        `;
        tbody.appendChild(row);
    });
}

function getAvatarDataUrl(emoji) {
    // URL Encode the SVG to prevent Broken image rendering in Chrome/Edge
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><text x="18" y="27" font-size="26" text-anchor="middle">${emoji}</text></svg>`;
    return `data:image/svg+xml;utf8,` + encodeURIComponent(svgContent);
}

function logAuditLog(text) {
    addAuditLog(text);
}

function addAuditLog(text) {
    const logs = JSON.parse(localStorage.getItem('aura_audit_logs')) || [];
    const stamp = new Date().toLocaleTimeString();
    logs.push(`[${stamp}] ${text}`);
    localStorage.setItem('aura_audit_logs', JSON.stringify(logs));
}

function notifyEvent(text) {
    const textEl = document.getElementById("live-notification-text");
    if(textEl) {
        textEl.style.opacity = 0;
        setTimeout(() => {
            textEl.textContent = text;
            textEl.style.opacity = 1;
        }, 200);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}
