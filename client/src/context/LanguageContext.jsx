import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('hi'); // Default to Hindi

    const translations = {
        en: {
            home: "Home",
            about: "About",
            dashboard: "Employer Dashboard",
            registerWorker: "Register as Worker",
            hireWorker: "Hire Worker",
            heroTitle: "Digital Labour Chowk",
            heroSubtitle: "Hire verified & skilled workers near you — instantly.",
            howItWorks: "How It Works",
            step1: "Worker registers & gets verified",
            step2: "Employer searches by skill & location",
            step3: "Hire in one click",
            impact: "Our Impact",
            workersRegistered: "Workers Registered",
            jobsCreated: "Jobs Created",
            citiesCovered: "Cities Covered",
            whyChooseUs: "Why Choose Us",
            govtSection: "Partner with us to digitize the unorganized workforce",
            govtAction: "Government & NGO Partners",
            searchPlaceholder: "Search by Location",
            searchBtn: "Search",
            hireNow: "Hire Now",
            trustTitle: "Trust & Safety",
            trust1: "Govt ID Verification",
            trust2: "No Middlemen",
            trust3: "Transparent Hiring",
            trust4: "Worker Ratings",
            previewTitle: "Real Worker Profiles",
            footerBuilt: "Built with ❤️ for India’s workforce",
            footerLinks: ["About Us", "Contact", "Privacy Policy", "Terms"],
            stickyHire: "Hire Worker",
            stickyRegister: "Register as Worker",
            login: "Login",
            loginEmployer: "Login as Employer",
            loginWorker: "Login as Worker",
            aboutHeroTitle: "Empowering India's Workforce",
            aboutHeroSubtitle: "Bridging the gap between hard-working daily wagers and employers through technology.",
            ourMission: "Our Mission",
            missionDesc1: "Millions of skilled workers stand at \"Labour Chowks\" every morning, waiting for work. Our mission is to digitize this experience, giving them dignity, visibility, and consistent income.",
            missionDesc2: "We believe that every worker deserves a digital identity and fair opportunities, regardless of their background or location.",
            aboutTrust: "Trust",
            aboutTrustDesc: "Verified profiles",
            aboutCommunity: "Community",
            aboutCommunityDesc: "Local connection",
            aboutDignity: "Dignity",
            aboutDignityDesc: "Respect for work",
            aboutImpact: "Impact",
            aboutImpactDesc: "Real Livelihoods",
            whyChooseTitle: "Why Ek Digital Labour Chowk?",
            whyChooseDesc: "Every city has a labour chowk—a physical spot where workers gather. It's chaotic, unorganized, and often leaves workers empty-handed.",
            quote: "\"Technology should not just be for the office goers, but for the hands that build our offices.\""
        },
        hi: {
            home: "होम",
            about: "हमारे बारे में",
            dashboard: "नियोक्ता डैशबोर्ड",
            registerWorker: "मज़दूर पंजीकरण",
            hireWorker: "मज़दूर चाहिए",
            heroTitle: "डिजिटल लेबर चौक",
            heroSubtitle: "वेरीफाइड मज़दूर, मिस्त्री, प्लंबर अब 1 क्लिक में।",
            howItWorks: "यह कैसे काम करता है?",
            step1: "मज़दूर अपना प्रोफाइल बनाते हैं",
            step2: "मालिक काम और जगह चुनते हैं",
            step3: "सीधे 1 क्लिक में बात करें",
            impact: "हमारा प्रभाव",
            workersRegistered: "कुल मज़दूर",
            jobsCreated: "काम मिला",
            citiesCovered: "शहर",
            whyChooseUs: "हमें क्यों चुनें?",
            govtSection: "असंगठित मज़दूरों को डिजिटल बनाने में हमारा साथ दें",
            govtAction: "सरकार और NGO पार्टनर",
            searchPlaceholder: "शहर या जगह लिखें (जैसे: पटना)",
            searchBtn: "खोजें",
            hireNow: "हायर करें",
            trustTitle: "भरोसा और सुरक्षा",
            trust1: "सरकारी आईडी चेक",
            trust2: "कोई बिचौलिया नहीं",
            trust3: "साफ-सुथरी भर्ती",
            trust4: "मज़दूर रेटिंग",
            previewTitle: "असली मज़दूर प्रोफाइल",
            footerBuilt: "भारत के मज़दूरों के लिए ❤️ से बनाया गया",
            footerLinks: ["हमारे बारे में", "संपर्क करें", "गोपनीयता नीति", "शर्तें"],
            stickyHire: "मज़दूर चाहिए",
            stickyRegister: "मज़दूर बनें",
            login: "लॉगिन",
            loginEmployer: "मालिक लॉगिन (Employer)",
            loginWorker: "मज़दूर लॉगिन (Worker)",
            aboutHeroTitle: "भारत के कार्यबल को सशक्त बनाना",
            aboutHeroSubtitle: "कड़ी मेहनत करने वाले दिहाड़ी मज़दूरों और नियोक्ताओं के बीच तकनीक के माध्यम से दूरी पाटना।",
            ourMission: "हमारा मिशन",
            missionDesc1: "लाखों कुशल मज़दूर हर सुबह काम के इंतज़ार में 'लेबर चौक' पर खड़े होते हैं। हमारा मिशन इस अनुभव को डिजिटल बनाना है, जिससे उन्हें सम्मान, पहचान और नियमित आय मिल सके।",
            missionDesc2: "हमारा मानना है कि हर मज़दूर को डिजिटल पहचान और समान अवसर मिलने चाहिए, चाहे उनकी पृष्ठभूमि या स्थान कुछ भी हो।",
            aboutTrust: "भरोसा",
            aboutTrustDesc: "वेरीफाइड प्रोफाइल",
            aboutCommunity: "समुदाय",
            aboutCommunityDesc: "स्थानीय जुड़ाव",
            aboutDignity: "सम्मान",
            aboutDignityDesc: "काम का आदर",
            aboutImpact: "प्रभाव",
            aboutImpactDesc: "असली आजीविका",
            whyChooseTitle: "एक डिजिटल लेबर चौक क्यों?",
            whyChooseDesc: "हर शहर में एक लेबर चौक होता है—मज़दूरों के इकट्ठा होने की जगह। यह अस्त-व्यस्त होता है और अक्सर मज़दूरों को खाली हाथ लौटना पड़ता है।",
            quote: "\"तकनीक सिर्फ ऑफिस जाने वालों के लिए नहीं होनी चाहिए, बल्कि उन हाथों के लिए भी होनी चाहिए जो हमारे ऑफिस बनाते हैं।\""
        }
    };

    const t = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
