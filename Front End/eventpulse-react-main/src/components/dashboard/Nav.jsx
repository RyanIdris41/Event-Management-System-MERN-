import { useState, useEffect } from 'react';
import { getUser } from '../../helpers/utils';

import { Input } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const { Search } = Input;

const Nav = () => {
    const [user, setUser] = useState(getUser());
    const firstName = user && user.name ? user.name.split(' ')[0] : '';

    return (
        <div className="flex items-center justify-between flex-wrap gap-3 py-4 px-2">
            <div>
                <h2 className="text-2xl font-semibold">
                    Welcome, <span className="text-primary capitalize">{firstName}</span>
                </h2>
            </div>
            <div>
                <Search placeholder="Search" className="lg:w-[500px] items-center flex" />
            </div>
            <div>
                <BellOutlined className="text-2xl bg-gray-100 p-3 rounded-full text-gray-600" />
            </div>
        </div>
    );
};

export default Nav;
