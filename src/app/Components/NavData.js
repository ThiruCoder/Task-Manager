import { BadgeInfo, Home, LayoutDashboard, LayoutList } from "lucide-react";

export const navItems = [
    { icon: <Home size={20} />, title: 'Home', link: '/', tool: 'Home' },
    { icon: <LayoutList size={20} />, title: 'Task Manager', link: '/TaskManagement', tool: 'Task Management' },
    { icon: <BadgeInfo />, title: 'About', link: '/About', tool: 'About' },
    { icon: <LayoutDashboard />, title: 'Dashboard', link: '/Dashboard', tool: 'Dashboard' }
];