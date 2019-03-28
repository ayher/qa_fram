import React, {Component} from 'react';
import {Icon, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import AdminRouter from '../../routes/AdminRouterData'
import './navMenu.less';

const {Sider} = Layout;

// 侧边导航组件
class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 导航栏默认选择
            SiderDefaultSelectedKey: '',
            // 导航栏脚本数组
            routerScript: [],
        };
        this.onclickMenu = this.onclickMenu.bind(this)
    }

    onclickMenu(e) {
        this.setState({
            SiderDefaultSelectedKey: e.key
        })
    }

    /**
     * 根据路由组件的信息更改选择栏
     */
    componentWillMount() {
        let routerScriptTest = [];
        for (let i = 0; i < AdminRouter.length; i++) {
            routerScriptTest.push(
                <Menu.Item key={AdminRouter[i].key}>
                    <Link to={AdminRouter[i].key}>
                        <Icon type={AdminRouter[i].icon}/>
                        <span className="dataShow">{AdminRouter[i].title}</span>
                    </Link>
                </Menu.Item>
            )
        }
        this.setState({
            routerScript: routerScriptTest,
            // 根据url选择不同的状态栏
            SiderDefaultSelectedKey: window.location.href.substring(window.location.href.indexOf('#') + 1)
        })
    }

    render() {
        return (
            <Sider style={{
                overflow: 'auto', minHeight: '89vh',
            }}
            >
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.SiderDefaultSelectedKey + ""]}
                      onClick={this.onclickMenu}>
                    {this.state.routerScript}
                </Menu>
            </Sider>
        );
    }
}

export default NavMenu;
