import React, { useState } from 'react';
import SideNav from '../components/SideNav.jsx';
import { Layout } from 'antd';
import MenuIcon from '@mui/icons-material/Menu';

const { Header, Footer, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
    const [open, setOpen] = useState(false);
    const toggleSidebar = () => {
        setOpen(!open);
    };
    return (
        <Layout>
            <Sider width={265} className="px-4 h-[100vh] hidden lg:block">
                <SideNav setOpen={setOpen} />
            </Sider>

            {/* small screen sider */}
            {open ? (
                <div className="absolute  top-0 z-20">
                    <Sider width={265} className="px-4 h-[100vh] block lg:hidden ">
                        <SideNav setOpen={setOpen} />
                    </Sider>
                </div>
            ) : (
                <div className="block lg:hidden" onClick={() => setOpen(true)}>
                    <MenuIcon className="mt-5 ml-3 font-bold text-primary " />
                </div>
            )}

            <Content className="max-h-[100vh] overflow-y-auto px-8">{children}</Content>
        </Layout>
    );
};

export default DashboardLayout;
