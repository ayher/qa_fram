import React from 'react';
import './head.less';
import logo from "../images/logo.png";
import question from "../images/question.png";
import {withRouter} from 'react-router-dom';
import QQ from "../images/QQ.png";
import WC from "../images/WC.png";
import WB from "../images/WB.png";
import {Menu, Icon, Tooltip, Button, Modal, Form, Input, Checkbox, message} from 'antd';
import {Link} from 'react-router-dom';
import {
    getCaptcha,
    login,
    otherLogin,
} from '../redux/action/head';
import {toMd5} from './common/toMd5'
import {
    connect
} from 'react-redux';

// 微博，qq回调地址
const WBUrl = "https://api.weibo.com/oauth2/authorize?client_id=3081365058&response_type=code&redirect_uri=http://qa.ksust.com/%23/app/home/index";
const Qq = "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101514447&redirect_uri=http%3a%2f%2fqa.ksust.com%2f%23%2fapp%2fhome%2findex&state=QQ1R33E6ldD35SErRr";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //密码输入提示框
            passwordFormat: "none",
            // 登陆弹出框的状态，最初为false
            loginModal: false,
            // 验证码
            captcha: {
                // 验证码图片
                captchaImage: '',
                // token
                token: ''
            },
        }
    }

    /**
     * 登陆成功后数据的对应
     * @param data
     */
    handleLoginSuccess = (data) => {
        if (data.status === 200) {
            message.success('登录成功');
            localStorage.userName = data.data.username;
            localStorage.Authorization = data.data.authorization;
            localStorage.roleId = data.data.roleId;
            localStorage.avatar = data.data.avatar;
            localStorage.studentId = data.data.studentId;
            localStorage.nickName = data.data.nickname;
            localStorage.id = data.data.id;
            this.props.history.push('/');
        }
        else {
            message.error(data.msg);
        }
    };

    componentWillMount() {
        var url = this.props.location.search;
        //第三方登录解析返回url
        if (url !== "") {
            this.props.location.search = "";
            var codeurl = "code";
            var stateurl;
            var countcode = url.indexOf(codeurl);
            var countand = url.indexOf('&');
            if (countand === -1) {
                codeurl = url.substring(countcode + 5);
                stateurl = null;
            }
            else {
                codeurl = url.substring(countcode + 5, countand);
                stateurl = url.substring(countand + 7);
            }
            this.props.dispatch(otherLogin({
                code: codeurl,
                state: stateurl,
            })).then(() => {
                if (!!this.props.head.otherLogin) {
                    this.handleLoginSuccess(this.props.head.otherLogin);
                }
            });
        }
    }

    /**
     * 点击验证码的时候调用，更换验证码，登陆弹出框打开时也会调用，获取验证码
     */
    resetPic = () => {
        // 获取验证码
        this.props.dispatch(getCaptcha("")).then(() => {
            if (this.props.head.getCaptcha) {
                if (this.props.head.getCaptcha.status === 200) {
                    let captchatest = {
                        captchaImage: this.props.head.getCaptcha.data.captchaImage,
                        token: this.props.head.getCaptcha.data.token
                    }
                    this.setState({captcha: captchatest})
                }
            }
        })
    };
    /**
     * 点击Menu中的选项时，根据用户的选择调用函数
     * @param e
     */
    menuClick = e => {
        e.key === 'logout' && this.logout();
        e.key === 'login' && this.showModal();
    };
    /**
     * 点击退出登陆时调用，清空用户登陆信息
     */
    logout = () => {
        localStorage.token = '';
        localStorage.removeItem('userName');
        localStorage.removeItem('roleId');
        localStorage.authorization = '';
        localStorage.avatar = '';
    };
    /**
     * 点击登陆选项时，弹出登陆框
     */
    showModal = () => {
        this.resetPic();
        this.setState({
            loginModal: true,
        });
    };
    /**
     * 点击登陆弹出框的关闭按钮或者点击框外时触发，关闭登陆框
     * @param e
     */
    handleCancel = (e) => {
        this.setState({
            loginModal: false,
        });
    };
    /**
     * 限制密码格式
     * @param value  密码值
     * @param passwordFormat  提示信息是否显示
     */
    limitPasswordFormat = (value, passwordFormat) => {
        if (value.length < 6 || value.length > 16 || value.indexOf(" ") >= 0) {
            this.setState({
                passwordFormat: "inline"
            })
        }
        else {
            this.setState({
                passwordFormat: "none"
            })
        }
    };
    /**
     * 点击登陆按钮时触发，提交登陆数据,关闭登陆弹出框，刷新页面
     * @param e
     */
    handleLogin = (e) => {
        // 登录
        this.props.dispatch(login({
                username: document.getElementById('username').value,
                // md5加密
                password: toMd5(document.getElementById('password').value),
                captcha: document.getElementById('captcha').value,
                token: this.state.captcha.token
            }
        )).then(() => {
            if (!!this.props.head.login) {
                this.handleLoginSuccess(this.props.head.login)
            }
        });
        this.setState({
            loginModal: false,
        });
    };

    render() {
        const formItemLayout = {//一种响应式布局，antd自带的例子
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 17},
            },
        };
        return (
            <div className="header">
                <div className="Logo">
                    <Link to="/app/home/index">
                        <img src={logo} onClick={this.showHome} title="返回首页" style={{cursor: 'pointer'}} alt="logo"/>
                    </Link>
                    <Tooltip placement="topLeft"
                             title="本系统利用自然语言理解的技术，将西南科技大学校园内涉及学生、教师在学习和生活中的各种问题构建问题知识库。信息获取渠道主要为西南科技大学官方网站、西南科技大学教务处、西南科技大学图书馆等网站和能够解答这类问题的专业人员。提供在线、统一、准确并有针对性的解答服务。 并且在实际应用中，还能为师生提供反馈信息的功能，希望能够更好地为您服务！">
                        <img src={question} alt="没有图片"/>
                    </Tooltip>
                    <div className="menu">
                        <Menu mode="horizontal" onClick={this.menuClick}>
                            <SubMenu className="subMenu" title={
                                <span>
                                    {
                                        localStorage.userName ? <img src={localStorage.avatar} alt="头像"/> :
                                            <span>未登录</span>
                                    }
                                </span>
                            }
                            >
                                <MenuItemGroup className="menuItemGroup">
                                    {
                                        localStorage.userName ?
                                            <Menu.Item className="imgGroupinner">
                                                <Link to="/app/userHome/index">
                                                    <span>{localStorage.nickName}</span>
                                                </Link>
                                            </Menu.Item>
                                            : null
                                    }
                                    {
                                        localStorage.userName ?
                                            <Menu.Item key="1">
                                                <Link to="/app/home/questionRecord">
                                                    <span>查看问题记录</span>
                                                </Link>
                                            </Menu.Item> : null
                                    }
                                    {
                                        localStorage.userName &&
                                        <Menu.Item key="logout" className="imgGroupinner">
                                            <Link to="/">
                                                <span>退出登陆</span>
                                            </Link>
                                        </Menu.Item>
                                    }
                                    {
                                        !localStorage.userName &&
                                        <Menu.Item key="login" className="menuItem"><span>登录</span></Menu.Item>
                                    }
                                    {
                                        localStorage.userName && localStorage.roleId === "2" &&
                                        <Menu.Item key="admin" className="imgGroupinner">
                                            <Link to="/app/admin/dataShow">
                                                <span>管理员页面</span>
                                            </Link>
                                        </Menu.Item>
                                    }
                                </MenuItemGroup>
                            </SubMenu>
                        </Menu>
                    </div>
                </div>
                {/*登录弹出框*/}
                <Modal id="modal" title="登录" footer={null} visible={this.state.loginModal}
                       onCancel={this.handleCancel}>
                    <Form>
                        <FormItem {...formItemLayout} label="用户名">
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                   placeholder="请输入用户名" id="username"/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="密&nbsp;&nbsp;&nbsp;码">
                            <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                   placeholder="请输入密码" id="password" onChange={() =>
                                this.limitPasswordFormat(document.getElementById('password').value
                                    , this.state.passwordFormat)}/>
                            <p style={{display: this.state.passwordFormat, color: "red"}}>
                                请输入6-16位密码,区分大小写,不能用空格</p>
                        </FormItem>
                        <FormItem {...formItemLayout} label="验证码" className="captchaItem">
                            <Input id="captcha" onPressEnter={this.handleLogin}/>
                            <img src={this.state.captcha.captchaImage} onClick={this.resetPic} alt="验证码"/>
                        </FormItem>
                        <FormItem className="fromItem">
                            <Checkbox>记住我</Checkbox>
                            <a href="http://qa.ksust.com/#/app/home/index">忘记密码</a>
                            <Button type="primary" onClick={this.handleLogin}>
                                登录
                            </Button>
                        </FormItem>
                        <FormItem className="fromItem">
                            <p>第三方登录</p>
                            <div style={{textAlign: 'center'}}>
                                <a style={{width: '33%', float: "left"}} href={Qq}> <img style={{width: '50'}} src={QQ}
                                                                                         alt="没有图片"/></a>
                                <a style={{width: '33%', float: "left"}}
                                   href="http://qa.ksust.com/#/app/home/index"><img style={{width: '50'}} src={WC}
                                                                                    alt="没有图片"/></a>
                                <a style={{width: '33%', float: "left"}} href={WBUrl}> <img style={{width: '50'}}
                                                                                            src={WB} alt="没有图片"/></a>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

//在store树中加入head
const mapStateToProps = state => {
    return {head: state.head};
};
Head = connect(mapStateToProps)(Head);
export default withRouter(Head);