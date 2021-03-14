import { useContext } from 'react'
import { Menu, Dropdown, Button, Spin } from 'antd';
import { DownOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';

import { AppContext } from '../contexts/AppContext'

import { CardContainer } from './Card'

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const SelectUser = () => {
    const { users, changeUser, selectedUser, usersLoaded } = useContext(AppContext)

    const handleMenuClick = (e) => {
        console.log(e);
        if (e && e.key && users.includes(e.key)) {
            changeUser(e.key)
        }
    }

    const userMenu = () => {
        if (!users) return <Menu onClick={handleMenuClick}></Menu>

        return <Menu onClick={handleMenuClick}>
            {users.map(user =>
                <Menu.Item key={user} icon={<UserOutlined />}>
                    {user}
                </Menu.Item>
            )}
        </Menu>
    }


    return (
        <CardContainer>
            {
                !usersLoaded
                    ?
                        <p><Spin className='StatsIndicator' indicator={loadingIcon} /> Loading Users</p>
                    :
                    <Dropdown overlay={userMenu}>
                        <Button className='DropdownButton'>
                            {selectedUser} <DownOutlined />
                        </Button>
                    </Dropdown>
            }
        </CardContainer>
    )
}
