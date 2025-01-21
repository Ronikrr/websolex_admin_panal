import React, { useState, useEffect } from "react";
import { FaAngleUp, FaAngleDown, FaChartBar, FaChartLine, FaBullhorn, FaUserCheck, FaCrown, FaPen, FaUsers } from "react-icons/fa";
import { MdDashboard, MdBusiness } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { RiContactsFill, RiCustomerService2Fill } from "react-icons/ri";
import { MdContactPage } from "react-icons/md";
import { FaUserNinja } from "react-icons/fa6";

function Sidebar({ isopensidebar, closeslidebar }) {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [activeSubSubMenu, setActiveSubSubMenu] = useState(null);
    const location = useLocation();

    const menuItems = [
        {
            id: 1,
            icon: <MdDashboard />,
            label: "Dashboard",
            subMenu: [
                {
                    id: 1,
                    icon: <MdBusiness />,
                    label: "Websolex",
                    subsubmenu: [
                        { id: 1, icon: <FaChartBar />, label: "Websolex Home", link: "/websolex" },
                        { id: 2, icon: <FaCrown />, label: "team page", link: "/websolex/teampage" },
                        { id: 3, icon: <FaHandshake />, label: "Trusted Bond", link: "/websolex/valuedclient" },
                        { id: 4, icon: <MdOutlineWorkspacePremium />, label: "Our work", link: "/websolex/latestworkadd" },
                        { id: 5, icon: <FaUserCheck />, label: "client rate", link: "/websolex/clientrate" },
                        { id: 6, icon: <RiCustomerService2Fill />, label: "service page", link: "/websolex/servicepage" },
                        { id: 7, icon: <FaPen />, label: "blog page", link: "/websolex/blogpage" },
                        { id: 8, icon: <MdContactPage />, label: "contact details", link: "/websolex/contactdetails" },
                        { id: 9, icon: <RiContactsFill />, label: "contact & subscribe", link: "/websolex/contactform" },
                        { id: 10, icon: <FaUsers />, label: "logined users", link: "/userlogined" },
                        { id: 11, icon: <FaUserNinja />, label: "emplyee", link: "/websolex/emmangement" },
                        { id: 12, icon: <FaUserNinja />, label: "users chat", link: "/websolex/userschat" },
                    ],
                },
                {
                    id: "crm", icon: <FaChartLine />, label: "CRM",
                    subsubmenu: [
                        { id: 1, icon: <FaChartBar />, label: "CRM Home", link: "/crm" },
                    ],
                },
                {
                    id: "Marketing", icon: <FaBullhorn />, label: "Marketing",
                    subsubmenu: [
                        { id: 1, icon: <FaChartBar />, label: "Marketing Home", link: "/marketing" },
                    ]
                },
            ],
        },
    ];

    // useEffect(() => {
    //     menuItems.forEach(menu => {
    //         menu.subMenu.forEach(subMenu => {
    //             if (location.pathname.startsWith(subMenu.subsubmenu[0].link)) {
    //                 setActiveMenu(menu.id);
    //                 setActiveSubMenu(subMenu.id);
    //             }
    //             subMenu.subsubmenu.forEach(subsubmenu => {
    //                 if (location.pathname === subsubmenu.link) {
    //                     setActiveMenu(menu.id);
    //                     setActiveSubMenu(subMenu.id);
    //                     setActiveSubSubMenu(subsubmenu.id);
    //                 }
    //             });
    //         });
    //     });
    // }, [location.pathname, menuItems]);

    const handleMenuClick = (menuId) => {
        if (menuId === activeMenu) {
            setActiveMenu(null);
            setActiveSubMenu(null);
            setActiveSubSubMenu(null);
        } else {
            setActiveMenu(menuId);
            setActiveSubMenu(null);
            setActiveSubSubMenu(null);
        }
    };

    const handleSubMenuClick = (subMenuId) => {
        if (subMenuId === activeSubMenu) {
            setActiveSubMenu(null);
            setActiveSubSubMenu(null);
        } else {
            setActiveSubMenu(subMenuId);
            setActiveSubSubMenu(null);
        }
    };

    const handleSubSubMenuClick = (subSubMenuId) => {
        setActiveSubSubMenu(subSubMenuId === activeSubSubMenu ? null : subSubMenuId);
    };

    return (
        <div className="relative">
            <div className={`flex-col hidden overflow-y-scroll box_container md:flex md:w-[289.9px] main_class h-full text-white bg-[#1C2434] transition-all duration-500 ease-in-out`}>
                <div className="flex items-center p-6 space-x-2 text-2xl font-bold">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                        <span className="text-lg font-bold text-white">T</span>
                    </div>
                    <span>TailAdmin</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-4">
                    {menuItems.map((menu) => (
                        <div key={menu.id}>
                            <div
                                className={`flex items-center p-3 justify-between rounded cursor-pointer`}
                                onClick={() => handleMenuClick(menu.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <span>{menu.icon}</span>
                                    <span className="font-semibold">{menu.label}</span>
                                </div>
                            </div>

                            <ul className="mt-2 space-y-2">
                                {menu.subMenu.map((subMenu) => (
                                    <li key={subMenu.id}>
                                        <div
                                            className={`flex items-center p-2 justify-between rounded cursor-pointer ${activeSubMenu === subMenu.id ? "bg-gray-700" : "bg-gray-900"}`}
                                            onClick={() => handleSubMenuClick(subMenu.id)}
                                        >
                                            <div className="flex items-center gap-3 capitalize">
                                                {subMenu.icon}
                                                {subMenu.label}
                                            </div>
                                            {subMenu.subsubmenu && (activeSubMenu === subMenu.id ? <FaAngleUp /> : <FaAngleDown />)}
                                        </div>
                                        {activeSubMenu === subMenu.id && subMenu.subsubmenu && (
                                            <ul className="pl-8 mt-2 space-y-2">
                                                {subMenu.subsubmenu.map((subsubmenu) => (
                                                    <li key={subsubmenu.id}>
                                                        <Link to={subsubmenu.link}
                                                            className={`flex items-center capitalize p-2 gap-3 rounded cursor-pointer hover:bg-gray-700 z-10 ${activeSubSubMenu === subsubmenu.id ? "bg-gray-700 relative after:absolute after:w-[30px] after:h-[40px] after:rounded-l-full after:bg-[rgb(243,244,246)] after:shadow-l-xl z-0 after:-right-[16px]" : "bg-gray-900"}`}
                                                            onClick={() => handleSubSubMenuClick(subsubmenu.id)}
                                                        >
                                                            {subsubmenu.icon}
                                                            {subsubmenu.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
            <div className={`flex-col absolute z-20 h-full flex md:hidden md:w-[289.9px] text-white h-full bg-[#1C2434] transition-all duration-500 ease-in-out ${isopensidebar ? 'block' : 'hidden'}`}>
                <div className="flex items-center px-6 py-4 space-x-2 text-2xl font-bold">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                        <span className="text-lg font-bold text-white">T</span>
                    </div>
                    <span>TailAdmin</span>
                    <IoMdClose onClick={closeslidebar} />
                </div>

                <nav className="flex-1 px-4 py-6 space-y-4 ">
                    {menuItems.map((menu) => (
                        <div key={menu.id}>
                            <div
                                className={`flex items-center p-3 justify-between rounded cursor-pointer ${activeMenu === menu.id ? "bg-gray-900" : "bg-gray-800"
                                 } `}
                                onClick={() => handleMenuClick(menu.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <span>{menu.icon}</span>
                                    <span className="font-semibold">{menu.label}</span>
                                </div>
                               
                            </div>

                            {activeMenu === menu.id && menu.subMenu && (
                                <ul className="mt-2 space-y-2 ">
                                    {menu.subMenu.map((subMenu) => (
                                        <li key={subMenu.id}>
                                            <div
                                                className={`flex items-center p-2 justify-between rounded cursor-pointer ${activeSubMenu === subMenu.id ? "bg-gray-700" : "bg-gray-900"}`}
                                                onClick={() => handleSubMenuClick(subMenu.id)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span>{subMenu.icon}</span>
                                                    <span>{subMenu.label}</span>
                                                </div>
                                                {subMenu.subsubmenu && (activeSubMenu === subMenu.id ? <FaAngleUp /> : <FaAngleDown />)}
                                            </div>
                                            {activeSubMenu === subMenu.id && subMenu.subsubmenu && (
                                                <ul className="pl-2 mt-2 space-y-2">
                                                    {subMenu.subsubmenu.map((subsubmenu) => (
                                                        <li key={subsubmenu.id}>
                                                            <Link to={subsubmenu.link || "#"} className={`flex items-center p-2 space-x-3 rounded cursor-pointer ${activeSubSubMenu === subsubmenu.id ? "bg-gray-700" : "bg-gray-900"}`}>
                                                                <span>{subsubmenu.icon}</span>
                                                                <span>{subsubmenu.label}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;