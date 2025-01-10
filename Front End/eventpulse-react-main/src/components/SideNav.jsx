import React, { useState } from 'react';
import { Menu } from 'antd';
import { BranchesOutlined, GlobalOutlined, LikeOutlined, LogoutOutlined } from '@ant-design/icons';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { DoneOutlined, House, MyLocationOutlined, SettingsOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { TbCalendarUser } from 'react-icons/tb';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { getInitials, getUser } from '../helpers/utils.js';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Overview', 'overview', <DashboardIcon />),
    getItem('Events', 'events', <EventIcon />, [
        getItem('Create Event', 'new-event', <EditCalendarIcon />),
        getItem('Create Event Track', 'new-event-track', <BranchesOutlined />),
        getItem('Create Venue', 'new-venue', <House />),
        getItem('My Events', 'my-events', <TbCalendarUser />),
        getItem('Registered Events', 'registered-events', <DoneOutlined />),
        getItem('Recommended', 'recommended', <LikeOutlined />, [
            getItem('Local', 'recommended-local', <MyLocationOutlined />),
            getItem('International', 'recommended-international', <GlobalOutlined />),
        ]),
    ]),
    getItem('Settings', 'settings', <SettingsOutlined />),
    getItem('logout', 'logout', <LogoutOutlined />),
];

const SideNav = ({ setOpen }) => {
    const user = getUser();
    const loc = window.location.pathname.split('/')[2] || 'overview';
    const onClick = (menu) => {
        if (menu.key === 'logout') {
            localStorage.removeItem('user');
            window.location = '/';
        } else {
            window.location = `/dashboard/${menu.key === 'overview' ? '' : menu.key}`;
        }
    };

    return (
        <div
            className={`sidenav ${open ? 'open' : 'closed'}`}
            style={{ position: 'absolute', zIndex: 1000 }}
        >
            {/* Toggle Button */}
            {/*<IconButton*/}
            {/*    onClick={toggleSidebar}*/}
            {/*    style={{ position: 'absolute', top: 10, left: open ? 240 : 10 }}*/}
            {/*>*/}
            {/*    {open ? <CloseIcon /> : <MenuIcon />}*/}
            {/*</IconButton>*/}
            <div className="min-h-[86vh]">
                <div className="brand mt-6 mb-6 flex items-center justify-between">
                    <Link to="/">
                        <img src={Logo} alt="EventPulse" className="w-[180px]" />
                    </Link>
                    <div className="block lg:hidden" onClick={() => setOpen(false)}>
                        <MenuIcon className="text-white block " />
                    </div>
                </div>
                <hr />
                <Menu
                    className="w-full mt-10 bg-transparent text-white hover:text-white"
                    onClick={onClick}
                    defaultSelectedKeys={[loc]}
                    defaultOpenKeys={['events', 'recommended']}
                    mode="inline"
                    items={items}
                />
            </div>
            <hr />
            <div className="grid grid-cols-2 grid-flow-col text-white mt-4 cursor-pointer">
                <span className="mt-2 font-bold">
                    <span className="text-sm mr-2 bg-red-700 p-3 rounded-full">
                        {getInitials()}
                    </span>
                </span>
                <br />
                <span className="mr-10 leading-4">
                    <span className="text-nowrap">{user?.name}</span>
                    <br />
                    <span className="text-xs">{user?.email}</span>
                </span>
            </div>
        </div>
    );
};

export default SideNav;
