import { useContext } from 'react'
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { AppContext } from '../contexts/AppContext'

import { CardContainer } from './Card'

export const SelectUser = () => {
    const { users, changeUser, selectedUser } = useContext(AppContext)

    const handleMenuClick = (e) => {
        console.log(e);
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                1st menu item
          </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
                2nd menu item
          </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
                3rd menu item
          </Menu.Item>
        </Menu>
    );


    return (
        <CardContainer>
            <Dropdown overlay={menu}>
                <Button className='DropdownButton'>
                    {selectedUser} <DownOutlined />
                </Button>
            </Dropdown>
        </CardContainer>
    )
}
