import zamplia from '../src/assets/images/zamplia-social.jpg'
import blog from '../src/assets/images/icashiq.webp'
import scrap from '../src/assets/images/scrap.webp'
import survey from '../src/assets/images/istockphoto-1208383663-612x612.jpg'
import myimg1 from '../src/assets/images/myimg1.jpg'
import myimg2 from '../src/assets/images/myimg2.jpg'
const logotext = "Niraj Pandey";
const meta = {
    title: "Niraj Pandey",
    description: "I’m Niraj Pandey Software engineer_ Full stack devloper,currently working in Noida",
};

const introdata = {
    title: "I’m Niraj",
    animated: {
        first: "I love coding",
        second: "I code cool websites",
        third: "I develop websites",
    },
    description: "Full-stack software engineer specializing in the MERN stack (React.js, Node.js, MySQL) with hands-on experience in Azure cloud, RDP cloud services, and CI/CD pipelines. Passionate about building scalable and efficient web applications.",
    // your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
    your_img_url: myimg2,
};

const dataabout = {
    title: "About my self",
    aboutme: "I am a passionate full-stack software engineer with expertise in the MERN stack (React.js, Node.js, MySQL) and experience in Azure cloud, RDP cloud services, and CI/CD pipelines. Over the years, I have developed a strong foundation in building scalable web applications, optimizing system performance, and working with cloud infrastructures. My focus is on delivering efficient and user-friendly solutions while continuously learning and staying updated with the latest technology trends.",
};
const worktimeline = [
    {
        jobtitle: "Software Engineer",
        where: "Pando india software consultant",
        date: "May-2022  to Present",
    },
    {
        jobtitle: "Devops Engineer",
        where: "Trayistats AI transformation pvt ltd ",
        date: "Jan - 2023 to Aug - 2024",
    },
];

const skills = [
    {
        name: "React.js",
        value: 90,
    },
    {
        name: "Node.js",
        value: 85,
    },
    {
        name: "Javascript",
        value: 90,
    },
    {
        name: "Mysql",
        value: 80,
    },
    {
        name: "Tailwind css",
        value: 85,
    },
    {
        name: "HTML",
        value: 95,
    },
    {
        name: "Azure Cloud",
        value: 75,
    },
    {
        name: "RDP Server(Linux , Windows)",
        value: 80,
    },
    {
        name: "CI/CD Pipeline",
        value: 80,
    },
];

const services = [
    {
        title: "Software Engineer",
        description: "Specializing in full-stack development with a focus on the MERN stack (React.js, Node.js, MySQL) and cloud integration using Azure. I build scalable, efficient, and user-friendly web applications tailored to meet business needs.",
    },
    {
        title: "Devops Engineer",
        description: "Experienced in setting up CI/CD pipelines, automating workflows, and ensuring seamless deployment. I optimize cloud infrastructures, manage resources efficiently on Azure, and enhance the overall development process through continuous integration and deployment.",
    },
];

const dataportfolio = [
    {
        img: zamplia,
        description: "Zamplia is a market research platform that provides surveys. My role and responsibility involve implementing new enhancement tools using React.js, Node.js, MySQL, and Azure.",
        link: "https://exchange.zamplia.com/",
    },
    {
        img: blog,
        description: "iCashIQ is a blog website where the admin uploads blogs related to market research and survey links.",
        link: "https://icashiq.com/",
    },
    {
        img: scrap,
        description: "Kabadijee is a scrap management website that connects vendors and admins. The platform is used for buying and selling scrap materials.",
        link: "https://kabadijee.com/",
    },
    {
        img: survey,
        description: "Zamplia Surveys is a platform where users can participate in surveys.",
        link: "https://zampliasurveys.com/",
    },
    // {
    //     img: "https://picsum.photos/400/300/?grayscale",
    //     description: "The wisdom of life consists in the elimination of non-essentials.",
    //     link: "#",
    // },
    // {
    //     img: "https://picsum.photos/400/700/?grayscale",
    //     description: "The wisdom of life consists in the elimination of non-essentials.",
    //     link: "#",
    // },
];

const contactConfig = {
    YOUR_EMAIL: "engg.niraj7499@gmail.com",
    YOUR_FONE: "+91 7499294207",
    description: "If you have any questions or want to discuss a project, feel free to get in touch! I'm always open to exploring new opportunities and collaborations.",
    // YOUR_SERVICE_ID: "service_6om6upu",
    // YOUR_TEMPLATE_ID: "template_id",
    // YOUR_USER_ID: "user_id",
};

const socialprofils = {
    github: "https://github.com/developnk",
    // facebook: "https://facebook.com",
    linkedin: "https://www.linkedin.com/in/niraj-pandey-670780222/",
    // twitter: "https://twitter.com",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};