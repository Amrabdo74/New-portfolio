import { AiOutlineApi, AiOutlineGlobal } from "react-icons/ai";
import { FaJsSquare, FaMobileAlt, FaSearch } from "react-icons/fa";
import {
  FaCss3,
  FaFacebook,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaInstagram,
  FaLinkedin,
  FaReact,
  FaWhatsapp,
} from "react-icons/fa6";
import { MdOutlineSpeed } from "react-icons/md";
import {
  SiAxios,
  SiBootstrap,
  SiFramer,
  SiGraphql,
  SiNextdotjs,
  SiRedux,
  SiSass,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { z } from "zod";

export const cvUrl =
  "https://drive.google.com/file/d/1khp3Ph8gCyudKUGOTx-8Y8BZDZs-zLUw/view";

export const reviews = [
  {
    id: 1,
    name: "د. على",
    body: "بصراحة شغلكم أكتر من ممتاز، سعدت بالتعامل معكم جداً والله ياشباب فعلاً شغل متقن جدًا، شكراً مرة ثانية وأكيد ماراح يكون آخر تعامل إن شاء الله.",
  },
  {
    id: 2,
    name: "عبدالرحمن",
    body: "التعامل معاك فعلا راقي جدًا وفعلا فاهم انت بتعمل اي كويس، تسلم إيدك والله يابشمهندس.",
  },
  {
    id: 3,
    name: "محمد",
    body: "مشفتش حد بيهتم بالتفاصيل زيك، كل حاجة متظبطة آخر حاجة.",
  },
  {
    id: 4,
    name: "د. هند",
    body: "أنا مبسوطة جدًا بالشغل مع حضرتك، الحمد لله فوق توقعاتي بكتير.",
  },
  {
    id: 5,
    name: "محمود",
    body: "إنت من أكتر الناس المحترمة اللي اتعاملت معاها، ربنا يوفقك.",
  },
  {
    id: 6,
    name: "د. إيهاب",
    body: "شغل جميل جدًا وبتسمع كل الملاحظات وتنفذها بنفس الجودة.",
  },
];

export const projects = [
  {
    id: 1,
    title: "Flosscap",
    des: "E-commerce website and admin dashboard. Developed using HTML5, CSS3, JavaScript, Bootstrap5, PHP, and MySQL.",
    img: "/flosscap.png",
    iconsList: ["/html.svg", "/css.svg", "/js.svg", "/bootstrap-4.svg", "/php-svgrepo-com.svg"],
    link: "https://flosscap.net/ar",
    sourceCode: "https://github.com/Amrabdo74",
  },
  {
    id: 2,
    title: "Gulf International",
    des: "Website and admin dashboard. Developed using HTML5, CSS3, JavaScript, Bootstrap5, PHP, and MySQL.",
    img: "/gulfinternational.png",
    iconsList: ["/html.svg", "/css.svg", "/js.svg", "/bootstrap-4.svg", "/php-svgrepo-com.svg"],
    link: "https://gulfinternational.sa/ar",
    sourceCode: "https://github.com/Amrabdo74",
  },
  {
    id: 3,
    title: "Nourgy",
    des: "E-commerce website and admin dashboard. Developed using HTML5, CSS3, JavaScript, Bootstrap5, PHP, and MySQL.",
    img: "/nourgy.png",
    iconsList: ["/html.svg", "/css.svg", "/js.svg", "/bootstrap-4.svg", "/php-svgrepo-com.svg"],
    link: "https://nourgy.com/ar",
    sourceCode: "https://github.com/Amrabdo74",
  },
  {
    id: 4,
    title: "Higher Institute of Management and Information Technology in Kafr El-Sheikh",
    des: "Platform for viewing staff data, institute information, and a blog for students. Developed using React, React Router, Context API, Axios, Redux, i18next, Bootstrap, React Helmet, React Query, React Toastify, React Share, Swiper, Recharts, React Floating WhatsApp, FullCalendar, and AOS.",
    img: "/himit.png",
    iconsList: ["/react.svg", "/js.svg", "/bootstrap-4.svg", "/redux.svg"],
    link: "https://himit-kfs.edu.eg/",
    sourceCode: "https://github.com/Amrabdo74",
  },
  {
    id: 5,
    title: "Grocery-App",
    des: "E-commerce website and admin dashboard. Developed using React, React Router, Axios, Redux Toolkit, and Bootstrap.",
    img: "/grocery-app.png",
    iconsList: ["/react.svg", "/js.svg", "/bootstrap-4.svg", "/redux.svg"],
    link: "https://grocery-hxgr.vercel.app/",
    sourceCode: "https://github.com/Amrabdo74/GroceryStore",
  },
  {
    id: 6,
    title: "LinkedIn-Clone",
    des: "LinkedIn website clone with the ability to post images, text, and video. Developed using React, React Router, Redux Toolkit, Bootstrap, and Firebase.",
    img: "/linkedin-clone.png",
    iconsList: ["/react.svg", "/js.svg", "/bootstrap-4.svg", "/redux.svg", "/firebase.svg"],
    link: "https://linkedin-gamma-dun.vercel.app/",
    sourceCode: "https://github.com/Amrabdo74/Linkedin",
  },
  {
    id: 7,
    title: "Netflix-Clone",
    des: "Netflix website clone showcasing Trending, Popular, Top Rated, and Upcoming movies. Developed using React, React Router, Redux, Bootstrap, and Firebase.",
    img: "/netflix-clone.png",
    iconsList: ["/react.svg", "/js.svg", "/bootstrap-4.svg", "/redux.svg", "/firebase.svg"],
    link: "https://netflex-536e3.web.app/",
    sourceCode: "https://github.com/Amrabdo74/netflex",
  },
  // {
  //   id: 8,
  //   title: "CRUD-APP",
  //   des: "Website for creating, reading, updating, and deleting data. Developed using React, React Router, Redux, and Bootstrap.",
  //   img: "/crud-app.png",
  //   iconsList: ["/react.svg", "/js.svg", "/bootstrap-4.svg", "/redux.svg"],
  //   link: "",
  //   sourceCode: "https://github.com/Amrabdo74",
  // },
  {
    id: 9,
    title: "Plants-APP",
    des: "Website for plants. Developed using Bootstrap4, HTML5, CSS3, and OwlCarousel.",
    img: "/plants-app.png",
    iconsList: ["/html.svg", "/css.svg", "/js.svg", "/bootstrap-4.svg"],
    link: "",
    sourceCode: "https://github.com/Amrabdo74/plants_temp",
  },
];
const date = new Date();
const yearsOfExperience = date.getFullYear() - 2023;
const projectsCompleted = 15;
const clients = 5;

export const aboutData = [
  {
    number: yearsOfExperience,
    text: "Years of Experience",
  },
  {
    number: projectsCompleted,
    text: "Project Completed",
  },
  {
    number: clients,
    text: "Clients",
  },
];

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const skills = [
  { id: 1, icon: <SiNextdotjs />, text: "Next.js" },
  { id: 2, icon: <SiTypescript />, text: "TypeScript" },
  { id: 3, icon: <FaReact />, text: "React.js" },
  { id: 4, icon: <FaJsSquare />, text: "JavaScript" },
  { id: 5, icon: <FaHtml5 />, text: "HTML" },
  { id: 6, icon: <FaCss3 />, text: "CSS" },
  { id: 7, icon: <SiSass />, text: "Sass" },
  { id: 8, icon: <SiTailwindcss />, text: "Tailwind CSS" },
  { id: 9, icon: <SiBootstrap />, text: "Bootstrap" },
  { id: 10, icon: <SiStyledcomponents />, text: "Styled Components" },
  { id: 11, icon: <SiFramer />, text: "Framer Motion" },
  { id: 12, icon: <SiRedux />, text: "Redux Toolkit" },
  { id: 13, icon: <SiAxios />, text: "Axios" },
  { id: 14, icon: <FaGitAlt />, text: "Git & Github" },
  { id: 15, icon: <AiOutlineApi />, text: "REST APIs" },
  { id: 16, icon: <SiGraphql />, text: "GraphQL" },
  { id: 17, icon: <FaSearch />, text: "SEO Best Practices" },
  { id: 18, icon: <MdOutlineSpeed />, text: "Web Performance Optimization" },
  { id: 19, icon: <FaMobileAlt />, text: "Responsive Design" },
  { id: 20, icon: <AiOutlineGlobal />, text: "Cross-Browser Compatibility" },
];

export const socialMedia = [
  {
    id: 1,
    link: "https://github.com/Amrabdo74",
    icon: <FaGithub />,
  },
  {
    id: 2,
    link: "https://www.linkedin.com/in/amr-abdo74/",
    icon: <FaLinkedin />,
  },
  {
    id: 3,
    link: "https://www.facebook.com/profile.php?id=100007260193308",
    icon: <FaFacebook />,
  },
  {
    id: 4,
    link: "https://wa.me/+201021798849",
    icon: <FaWhatsapp />,
  },
  {
    id: 5,
    link: "https://www.instagram.com/amr__abdo74/",
    icon: <FaInstagram />,
  },
];

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(255, { message: "First name is too long" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(4, { message: "Phone number is too short" })
    .regex(
      /^\+\d{1,3}\d{4,14}$/,
      "Phone Number Format: +[country code][number] (e.g., +1234567890)"
    ),
  subject: z.string(),
  message: z.string().min(1, { message: "Message is required" }),
});
