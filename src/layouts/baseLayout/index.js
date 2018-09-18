import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import styles from './baseLayout.less';
import MenuComponent from './menu';
import HeaderComponent from './header';
import router from 'umi/router';
import intl from 'react-intl-universal';
import { checkLogin } from '../init';
import locales from '../../locales';
const { Header, Content, Footer, Sider } = Layout;

class BaseLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      initDone: false,
    }
    // 检测是否登录
    const isLogin  = checkLogin();
    if (!isLogin) {
      router.push('login');
    }
  }

  componentDidMount = () => {
    this.loadLocales();
  }

  loadLocales() {
    intl.init({
      currentLocale: 'en-US', // TODO: determine locale here
      locales,
    })
    .then(() => {
      // After loading CLDR locale data, start to render
	    this.setState({initDone: true});
    });
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo} />
          <MenuComponent />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeaderComponent />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BaseLayout;
