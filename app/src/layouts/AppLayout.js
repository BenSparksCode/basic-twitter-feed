import { Layout } from 'antd';

const { Header, Content } = Layout;

export const AppLayout = (props) => {
    return (
        <Layout className="layout">
            <Header>
                <h1 className='Title'>Twitter</h1>
            </Header>
            <Content style={{ padding: '40px' }}>
                <div className="site-layout-content">
                    {props.children}
                </div>
            </Content>
        </Layout>
    )
}