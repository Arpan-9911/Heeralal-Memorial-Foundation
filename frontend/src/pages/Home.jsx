import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { useLanguage } from "../LanguageContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1974",
    title: {
      en: "Build Something Amazing",
      hi: "एक अद्भुत बनायें",
    },
    subtitle: {
      en: "Create modern, scalable web experiences",
      hi: "मॉडर्न, स्केलेबल वेब अनुभव",
    },
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1974",
    title: {
      en: "The Future of Web Development",
      hi: "वेब डेवलपमेंट के भविष्य",
    },
    subtitle: {
      en: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, autem.",
      hi: "लोरेम इप्सम डोलर सिट amet consectetur adipisicing elit. Quae, autem.",
    },
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1972",
    title: {
      en: "Sustainable social change",
      hi: "स्वतंत्र सामाजिक बदलाव",
    },
    subtitle: {
      en: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestiae maiores repudiandae. Perspiciatis ratione ipsa necessitatibus deserunt placeat voluptatibus doloribus? Qui quasi quos eius, nobis quod eaque laborum consequuntur est?",
      hi: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestiae maiores repudiandae. Perspiciatis ratione ipsa necessitatibus deserunt placeat voluptatibus doloribus? Qui quasi quos eius, nobis quod eaque laborum consequuntur est?",
    },
  },
];

const events = [
  {
    id: 1,
    title: {
      en: "Free Health Camp - April 10",
      hi: "मुफ्त स्वास्थ्य शिविर - 10 अप्रैल",
    },
  },
  {
    id: 2,
    title: {
      en: "Women Empowerment Workshop - April 15",
      hi: "महिला सशक्तिकरण कार्यशाला - 15 अप्रैल",
    },
  },
  {
    id: 3,
    title: {
      en: "Education Drive in Rural Areas - April 20",
      hi: "ग्रामीण क्षेत्रों में शिक्षा अभियान - 20 अप्रैल",
    },
  },
  {
    id: 4,
    title: {
      en: "Food Donation Program - April 25",
      hi: "भोजन दान कार्यक्रम - 25 अप्रैल",
    },
  },
  {
    id: 5,
    title: {
      en: "Blood Donation Camp - April 30",
      hi: "रक्तदान शिविर - 30 अप्रैल",
    },
  },
];

const sacredMemoryText = {
  img: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1974",
  title: {
    en: "In sacred memory of shri heeralal ji",
    hi: "श्री हीरालाल जी की पावन स्मृति में",
  },
  subtitle: {
    en: "The Grandfather and Eternal Guide of our Director",
    hi: "हमारे निदेशक के दादा और शाश्वत मार्गदर्शक",
  },
  description: {
    en: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto at tempora provident fugiat excepturi, odit labore quo soluta, voluptatum ab saepe cum possimus dolor amet vero reprehenderit, laboriosam veritatis ullam impedit nemo aperiam sequi minus? Eveniet hic rerum cum voluptatibus quas? Ut, incidunt totam hic assumenda voluptate fuga architecto! Veniam debitis officia repellendus quidem voluptatibus assumenda, cupiditate nihil. Corrupti qui optio sunt, unde debitis magni aliquam maxime, deleniti tempore quidem alias quae rem natus nesciunt recusandae incidunt dignissimos aut dolore. Rem maiores possimus doloremque neque velit eveniet nobis perferendis officia, doloribus cupiditate culpa amet deserunt quasi repudiandae in ipsam esse!",
    hi: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto at tempora provident fugiat excepturi, odit labore quo soluta, voluptatum ab saepe cum possimus dolor amet vero reprehenderit, laboriosam veritatis ullam impedit nemo aperiam sequi minus? Eveniet hic rerum cum voluptatibus quas? Ut, incidunt totam hic assumenda voluptate fuga architecto! Veniam debitis officia repellendus quidem voluptatibus assumenda, cupiditate nihil. Corrupti qui optio sunt, unde debitis magni aliquam maxime, deleniti tempore quidem alias quae rem natus nesciunt recusandae incidunt dignissimos aut dolore. Rem maiores possimus doloremque neque velit eveniet nobis perferendis officia, doloribus cupiditate culpa amet deserunt quasi repudiandae in ipsam esse!",
  },
};

const commendation = {
  subtitle: {
    en: "Institutional Patronage",
    hi: "संस्थागत संरक्षण",
  },
  title: {
    en: "Formal Commendation",
    hi: "औपचारिक प्रशंसा",
  },
  letter: {
    address: {
      en: "Office of Dr. Arpan Kumar,<br />Director, Heeralal Memorial Foundation",
      hi: "डॉ. अर्पन कुमार कार्यालय,<br />निदेशक, हीरालाल मेमोरियल फाउंडेशन",
    },
    date: "2024-06-01",
    body: {
      en: "Dear [Recipient's Name],<br /><br />I am writing to formally commend [Organization/Individual Name] for their outstanding contributions to our community. Your dedication and hard work have made a significant impact, and I want to express my sincere appreciation for your efforts.<br /><br />Your commitment to [specific achievements or initiatives] has not only benefited those directly involved but has also inspired others to get involved and make a difference. Your leadership and vision are truly commendable.<br /><br />On behalf of the Heeralal Memorial Foundation, I extend my heartfelt gratitude for your invaluable contributions. We look forward to continuing our collaboration and working together towards a brighter future.<br /><br />Sincerely,<br />Dr. Arpan Kumar<br />Director, Heeralal Memorial Foundation",
      hi: "प्रिय [प्राप्तकर्ता का नाम],<br /><br />मैं [संगठन/व्यक्ति का नाम] को हमारे समुदाय में उनके उत्कृष्ट योगदान के लिए औपचारिक रूप से प्रशंसा करने के लिए लिख रहा हूँ। आपकी समर्पण और कड़ी मेहनत ने एक महत्वपूर्ण प्रभाव डाला है, और मैं आपके प्रयासों के लिए अपनी सच्ची प्रशंसा व्यक्त करना चाहता हूँ।<br /><br />[विशिष्ट उपलब्धियों या पहलों] के प्रति आपकी प्रतिबद्धता ने न केवल सीधे शामिल लोगों को लाभ पहुंचाया है बल्कि दूसरों को भी शामिल होने और फर्क डालने के लिए प्रेरित किया है। आपका नेतृत्व और दृष्टि वास्तव में प्रशंसनीय है।<br /><br />हीरालाल मेमोरियल फाउंडेशन की ओर से, मैं आपके अमूल्य योगदान के लिए अपनी हार्दिक कृतज्ञता व्यक्त करता हूँ। हम सहयोग जारी रखने और एक उज्जवल भविष्य की ओर मिलकर काम करने की आशा करते हैं।<br /><br />सादर,<br />डॉ. अर्पन कुमार<br />निदेशक, हीरालाल मेमोरियल फाउंडेशन",
    },
    name: {
      en: "Dr. Arpan Kumar",
      hi: "डॉ. अर्पन कुमार",
    },
    post: {
      en: "Director, Heeralal Memorial Foundation",
      hi: "निदेशक, हीरालाल मेमोरियल फाउंडेशन",
    },
    sign: "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1974",
  },
};

const hopeMessage = {
  title: {
    en: "Message of Hope",
    hi: "आशा का संदेश",
  },
  description: {
    en: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestiae maiores repudiandae. Perspiciatis ratione ipsa necessitatibus deserunt placeat voluptatibus doloribus? Qui quasi quos eius, nobis quod eaque laborum consequuntur est?",
    hi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestiae maiores repudiandae. Perspiciatis ratione ipsa necessitatibus deserunt placeat voluptatibus doloribus? Qui quasi quos eius, nobis quod eaque laborum consequuntur est?",
  },
  name: {
    en: "Dr. Arpan Kumar",
    hi: "डॉ. अर्पन कुमार",
  },
  post: {
    en: "Director, Heeralal Memorial Foundation",
    hi: "निदेशक, हीरालाल मेमोरियल फाउंडेशन",
  },
  photo:
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1974",
};

const stats = [
  {
    id: 1,
    icon: "🎓",
    value: "15,000+",
    label: {
      en: "Students Empowered",
      hi: "छात्र सशक्त",
    },
  },
  {
    id: 2,
    icon: "🏡",
    value: "25+",
    label: {
      en: "Rural Villages Reached",
      hi: "ग्रामीण गांव पहुंचे",
    },
  },
  {
    id: 3,
    icon: "🏥",
    value: "5,000+",
    label: {
      en: "Medical Consultations",
      hi: "चिकित्सा परामर्श",
    },
  },
  {
    id: 4,
    icon: "🤝",
    value: "12+",
    label: {
      en: "MoU Partners",
      hi: "एमओयू साझेदार",
    },
  },
];

const pillars = [
  {
    id: 1,
    icon: "📚",
    title: {
      en: "Educational Upliftment",
      hi: "शैक्षिक उत्थान",
    },
    desc: {
      en: "Providing scholarships and infrastructure support to ensure no child is left behind in the digital age.",
      hi: "छात्रवृत्ति और बुनियादी ढांचे के माध्यम से हर बच्चे तक शिक्षा पहुँचाना।",
    },
  },
  {
    id: 2,
    icon: "🏥",
    title: {
      en: "Healthcare Initiatives",
      hi: "स्वास्थ्य पहल",
    },
    desc: {
      en: "Mobile medical units and sanitation drives reaching the heart of underserved communities.",
      hi: "मोबाइल चिकित्सा और स्वच्छता अभियानों के माध्यम से सेवा।",
    },
  },
  {
    id: 3,
    icon: "🌱",
    title: {
      en: "Environmental Advocacy",
      hi: "पर्यावरण संरक्षण",
    },
    desc: {
      en: "Institutional commitment to afforestation and water conservation for a sustainable future.",
      hi: "हरित भविष्य हेतु वृक्षारोपण और जल संरक्षण।",
    },
  },
  {
    id: 4,
    icon: "⚖️",
    title: {
      en: "Women Empowerment",
      hi: "महिला सशक्तिकरण",
    },
    desc: {
      en: "Vocational training and financial literacy programs designed for long-term self-reliance.",
      hi: "आत्मनिर्भरता हेतु कौशल और वित्तीय शिक्षा।",
    },
  },
];

const posts = [
  {
    id: 1,
    tag: "Press Release",
    date: "Nov 26, 2024",
    title: {
      en: "HLMF Inaugurates New Digital Learning Center in Rural Delhi",
      hi: "ग्रामीण दिल्ली में डिजिटल लर्निंग सेंटर का उद्घाटन",
    },
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1974",
  },
  {
    id: 2,
    tag: "Event",
    date: "Nov 18, 2024",
    title: {
      en: "Success: 500+ Trees Planted in Annual Reforestation Drive",
      hi: "वार्षिक वृक्षारोपण अभियान में 500+ पेड़ लगाए गए",
    },
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974",
  },
];

const compliancePoints = [
  {
    title: {
      en: "Tax Exemption",
      hi: "कर छूट",
    },
    desc: {
      en: "Registered under Section 12A & 80G of the Income Tax Act.",
      hi: "आयकर अधिनियम की धारा 12A और 80G के तहत पंजीकृत।",
    },
  },
  {
    title: {
      en: "Data Privacy",
      hi: "डेटा गोपनीयता",
    },
    desc: {
      en: "ISO 27001 compliant data management systems.",
      hi: "ISO 27001 अनुरूप डेटा प्रबंधन प्रणाली।",
    },
  },
  {
    title: {
      en: "Annual Audits",
      hi: "वार्षिक ऑडिट",
    },
    desc: {
      en: "Transparent reporting by empaneled auditors.",
      hi: "पैनल ऑडिटर्स द्वारा पारदर्शी रिपोर्टिंग।",
    },
  },
];

const stripText = (text, maxLength = 200) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const Hero = () => {
  const { lang } = useLanguage();
  return (
    <section>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative md:h-120 h-72 w-full px-4">
                <img
                  src={slide.image}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt="Image"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
                <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto">
                  <h1 className="text-white text-2xl md:text-5xl font-semibold tracking-wide">
                    {stripText(slide.title[lang])}
                  </h1>
                  <p className="text-gray-300 md:mt-4 mt-1 md:text-lg text-sm max-w-2xl leading-relaxed">
                    {stripText(slide.subtitle[lang])}
                  </p>
                  <div className="flex gap-4 md:mt-8 mt-2">
                    <Button className="max-md:text-xs" to="/about">
                      {lang === "en" ? "Learn More" : "अधिक जानें"}
                    </Button>
                    <Button
                      className="max-md:text-xs"
                      variant="outline"
                      to="/contact"
                    >
                      {lang === "en" ? "Contact Us" : "संपर्क करें"}
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const UpcomingEvents = () => {
  const { lang } = useLanguage();

  return (
    <section className="bg-[var(--color-primary)] border-y border-gray-200 text-black py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Label + Slider */}
        <div className="flex items-center gap-2 flex-1 items-center overflow-hidden">
          <Button
            variant="secondary"
            size="sm"
            className="text-xs bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)]"
          >
            {lang === "en" ? "Upcoming" : "आगामी"}
          </Button>

          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              prevEl: ".event-prev",
              nextEl: ".event-next",
            }}
            className="w-full"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <p className="md:text-sm text-xs font-medium truncate">
                  {event.title[lang]}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1">
          <button className="event-prev p-1 rounded-full hover:bg-black/10 transition">
            <FiChevronLeft size={12} />
          </button>
          <button className="event-next p-1 rounded-full hover:bg-black/10 transition">
            <FiChevronRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
};

const SacredMemory = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10">
      <div className="border-3 border-[var(--color-primary)] bg-white shadow-sm max-w-7xl mx-auto md:p-10 p-4 rounded">
        <div className="flex max-md:flex-col md:gap-10 gap-4 max-w-5xl mx-auto">
          <img
            src={sacredMemoryText.img}
            alt="Sacred Memory"
            className="max-w-80 object-cover border-2 border-gray-500 p-1"
          />
          <div>
            <h2 className="text-2xl font-bold md:text-3xl uppercase text-[var(--color-secondary)]">
              {sacredMemoryText.title[lang]}
            </h2>
            <p className="text-[var(--color-primary-dark)] italic">
              {sacredMemoryText.subtitle[lang]}
            </p>
            <div className="w-16 h-0.5 bg-[var(--color-primary)] my-6 rounded"></div>
            <p className="text-sm">{sacredMemoryText.description[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormalCommendation = () => {
  const { lang } = useLanguage();

  return (
    <section className="bg-[var(--color-primary-light)] px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <span className="block text-center uppercase text-[var(--color-primary-dark)] text-xs font-semibold">
          {commendation.subtitle[lang]}
        </span>
        <h2 className="text-2xl font-bold md:text-3xl uppercase text-center text-[var(--color-secondary)]">
          {commendation.title[lang]}
        </h2>
        <div className="w-20 h-1 bg-[var(--color-primary-dark)] my-4 mx-auto rounded"></div>
        <div className="bg-white md:p-6 p-3 rounded border border-gray-200 shadow-md max-w-2xl mx-auto">
          <img
            src="/commendation-letter.jpg"
            alt={lang === "en" ? "Formal Commendation Letter" : "औपचारिक प्रशंसा पत्र"}
            className="w-full h-auto rounded object-contain"
          />
        </div>
      </div>
    </section>
  );
};

const MessageOfHope = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto bg-[image:var(--gradient-secondary)] md:p-10 p-4 rounded border-t-4 border-[var(--color-primary)]">
        <div className="flex max-md:flex-col md:gap-10 gap-4 items-center justify-center max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full border-4 border-yellow-600 overflow-hidden">
              <img
                src={hopeMessage.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-xl md:text-2xl font-bold text-white">
              {hopeMessage.name[lang]}
            </h2>
          </div>
          <div className="flex-1 p-4 md:p-10 rounded shadow-lg bg-white">
            <p className="text-lg font-semibold border-b-2 border-[var(--color-secondary)] text-[var(--color-secondary)] mb-4">
              {hopeMessage.title[lang]}
            </p>
            <p className="text-sm italic text-gray-600 leading-relaxed mb-6">
              "{hopeMessage.description[lang]}"
            </p>
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-sm font-semibold text-[var(--color-secondary)]">
                  — {hopeMessage.name[lang]}
                </p>
                <p className="text-xs text-gray-500 italic">
                  {hopeMessage.post[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InstitutionalProgress = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10 bg-[var(--color-primary-light)]">
      <div className="max-w-7xl mx-auto border border-gray-200 rounded-lg bg-white md:p-10 p-6 shadow-sm">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "Institutional Progress" : "संस्थागत प्रगति"}
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en" ? "Impact At A Glance" : "प्रभाव एक नज़र में"}
          </h2>

          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--color-primary-light)] hover:shadow-md transition rounded-md p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1"
            >
              <div className="text-3xl mb-3">{item.icon}</div>

              <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-secondary)]">
                {item.value}
              </h3>

              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {item.label[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InstitutionalPillars = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10 bg-[var(--color-primary-light)]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {lang === "en" ? "Our Core Mission" : "हमारा मुख्य उद्देश्य"}
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary)] mt-2">
            {lang === "en"
              ? "Pillars of Institutional Impact"
              : "संस्थागत प्रभाव के स्तंभ"}
          </h2>

          <div className="w-16 h-1 bg-[var(--color-primary)] mx-auto mt-3 rounded"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-md p-6 text-center hover:shadow-lg transition group hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="text-3xl mb-4">{item.icon}</div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-[var(--color-secondary)] uppercase tracking-wide">
                {item.title[lang]}
              </h3>

              {/* Divider */}
              <div className="w-10 h-[2px] bg-[var(--color-primary)] mx-auto my-3"></div>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LatestFromField = () => {
  const { lang } = useLanguage();

  return (
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT: POSTS */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary)]">
              {lang === "en" ? "Latest from the Field" : "मैदान से नवीनतम"}
            </h2>

            <button className="text-xs border px-3 py-1 rounded hover:bg-gray-100">
              {lang === "en" ? "All Press Releases" : "सभी प्रेस विज्ञप्ति"}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-lg group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="h-48 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] bg-[var(--color-primary-light)] text-black font-semibold px-2 py-1 rounded">
                    {post.tag}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wide">
                    {post.date}
                  </p>

                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[var(--color-secondary)]">
                    {post.title[lang]}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: COMPLIANCE PANEL */}
        <div className="bg-[image:var(--gradient-secondary)] text-white p-6 rounded shadow-lg">
          <div className="relative z-10">
            <h3 className="text-lg uppercase tracking-widest mb-4 text-[var(--color-primary)] font-bold">
              {lang === "en" ? "Institutional Compliance" : "संस्थागत अनुपालन"}
            </h3>

            <ul className="space-y-4 list-disc pl-5 marker:text-[var(--color-primary)]">
              {compliancePoints.map((item, i) => (
                <li key={i}>
                  <p className="text-sm font-semibold">
                    {item.title[lang]}
                  </p>
                  <p className="text-xs text-gray-200 leading-relaxed mt-1">
                    {item.desc[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <UpcomingEvents />
      <SacredMemory />
      <FormalCommendation />
      <MessageOfHope />
      <InstitutionalProgress />
      <InstitutionalPillars />
      <LatestFromField />
      <Footer />
    </div>
  );
};

export default Home;
