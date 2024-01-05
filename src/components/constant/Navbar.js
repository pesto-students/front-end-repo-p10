export const NAVBAR_ITEM_LIST = [
    {
        label: "Dashboard",
        icon: "/images/navbar/dashboard.svg",
        key: "DASHBOARD",
        route: "/dashboard",
        isAccessAllowed: true,
    },
    {
        label:"Interviews",
        icon: "/images/navbar/interview.svg",
        key: "INTERVIEWS",
        route: "/interviews",
        isAccessAllowed: true,
    },
    {
        label:"Question Bank",
        icon: "/images/navbar/question_bank.svg",
        key: "QUESTION_BANK",
        route: "/question-bank",
        isAccessAllowed: true,
    },
    {
        label:"Clients",
        icon: "/images/navbar/clients.svg",
        key: "CLIENTS",
        route: "/clients",
        isAccessAllowed: false,
    },
    {
        label:"Profile",    
        icon: "/images/navbar/profile.svg",
        key: "PROFILE",
        route: "/profile",
        isAccessAllowed: true,
    }
];