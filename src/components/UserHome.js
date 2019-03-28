import React from 'react';
import './userHome.less';
import {Avatar, Tabs, Input, Button, Form, message} from 'antd';
import {connect} from 'react-redux';
import {
    updateUserInfo,
    getUserInfo,
    updateUserPassword
} from '../redux/action/userHome';
import {toMd5} from './common/toMd5'

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class UserHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickChangePasswordButton = this.onClickChangePasswordButton.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getUserInfo()).then(() => {

            if (!!this.props.userHome.getUserInfo) {
                if (this.props.userHome.getUserInfo.status === 200) {
                    this.setState({
                        userData: this.props.userHome.getUserInfo.data,
                    })
                }
                else message.error(this.props.userHome.getUserInfo.msg)
            }
            else message.error("出现异常!")
        });
    }

    /**
     * 用户点击修改按钮，向后台更新用户基本信息
     */
    handleSubmit() {
        this.props.dispatch(updateUserInfo(
            document.querySelector('form')
        )).then(() => {
            // 首先判断是否有此reducer
            if (!!this.props.userHome.updateUserInfo) {
                // 接着判断返回的数据的是否成功
                if (this.props.userHome.updateUserInfo.status === 200) {
                    // 内部处理
                    message.success('修改成功！')
                }
                // 不成功就打印返回数据的错误
                else message.error(this.props.userHome.updateUserInfo.msg)
            }
            // 没有reducer就报异常
            else message.error("出现异常!")
        });
    }

    /**
     * 改变用户名输入框中的值
     * @param e
     */
    userNameChange = (e = 1 || window.event) => {
        let data = this.state.userData;
        data.userName = e.target.value;
        this.setState({
            userData: data
        })
    };
    /**
     * 改变昵称输入框中的值
     * @param e
     */
    nickNameChange = (e = 1 || window.event) => {
        let data = this.state.userData;
        data.nickname = e.target.value;
        this.setState({
            userData: data
        })
    };
    /**
     * 改变班级输入框中的值
     * @param e
     */
    clasChange = (e = 1 || window.event) => {
        let data = this.state.userData;
        data.clas = e.target.value;
        this.setState({
            userData: data
        })
    };
    /**
     * 改变学号输入框中的值
     * @param e
     */
    studentIdChange = (e = 1 || window.event) => {
        let data = this.state.userData;
        data.studentId = e.target.value;
        this.setState({
            userData: data
        })
    };

    /**
     * 用户点击了修改密码的按钮
     */
    onClickChangePasswordButton() {
        let originPassword = document.getElementById('originPassword').value;
        let newPassword = document.getElementById('newPassword').value;
        let ensurePassword = document.getElementById('ensurePassword').value;
        if (newPassword === "") {
            message.error("密码不能为空!");
            return;
        }
        if (newPassword.length < 6) {
            message.error("密码不能小于6位!");
            return;
        }
        if (newPassword.length > 16) {
            message.error("密码不能大于16位!");
            return;
        }
        if (newPassword === ensurePassword) {
            // 向后台修改密码
            this.props.dispatch(updateUserPassword({
                oldPassword: toMd5(originPassword),
                newPassword: toMd5(newPassword),
            })).then(() => {
                if (!!this.props.userHome.updateUserPassword) {
                    if (this.props.userHome.updateUserPassword.status === 200) {
                        message.success(this.props.userHome.updateUserPassword.msg)
                    }
                    else message.error(this.props.userHome.updateUserPassword.msg)
                }
                else message.error("出现异常!")
            });
        }
        else {
            message.error('确定的密码不一致哦~');
        }
    }

    /**
     * 改变学院输入框中的值
     * @param e
     */
    instituteChange = (e = 1 || window.event) => {
        let data = this.state.userData;
        data.institute = e.target.value;
        this.setState({
            userData: data
        })
    };
    /**
     * 改变专业输入框中的值
     * @param e
     */
    majorChange = (e = 1 || window.event) => {
        let data = this.state.userData;
        data.major = e.target.value;
        this.setState({
            userData: data
        })
    };
    /**
     * 改变前签名输入框中的值
     * @param e
     */
    signatureChange = (e = 1 || window.event) => {
        let data = this.state.userData;
        data.signature = e.target.value;
        this.setState({
            userData: data
        })
    };

    render() {
        //一种响应式布局，antd自带的例子
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
        };
        return (
            <div className="userHome">
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<Avatar size={40} src={this.state.userData.avatar}/>} disabled key="3"/>
                    <TabPane tab="修改个人信息" key="1">
                        <h1>我的基本信息</h1>
                        <Form>
                            <FormItem {...formItemLayout} label="用户名：">
                                <Input size="large" value={this.state.userData.username}
                                       onChange={this.userNameChange}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="昵称：">
                                <Input size="large" name="nickname" value={this.state.userData.nickname}
                                       onChange={this.nickNameChange}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="学号：">
                                <Input size="large" name="studentId" value={this.state.userData.studentId}
                                       onChange={this.studentIdChange}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="学院：">
                                <Input size="large" name="institute" value={this.state.userData.institute}
                                       onChange={this.instituteChange}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="专业：">
                                <Input size="large" name="major" value={this.state.userData.major}
                                       onChange={this.majorChange}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="班级：">
                                <Input size="large" name="clas" value={this.state.userData.clas}
                                       onChange={this.clasChange}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="签名：">
                                <Input size="large" name="signature" value={this.state.userData.signature}
                                       onChange={this.signatureChange}/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="性别：">
                                <select style={{width: '120px'}} name="sex">
                                    <option value="true">男</option>
                                    <option value="false" defaultValue={!this.state.userData.sex}>女</option>
                                </select>
                            </FormItem>
                        </Form>
                        <Button className="userHomeButton" type="primary" size="large"
                                onClick={this.handleSubmit}>提交</Button>
                    </TabPane>
                    <TabPane tab="修改密码" key="2">
                        <h1>修改密码</h1>
                        <Form>
                            <FormItem {...formItemLayout} label="原密码">
                                <Input size="large" type="password" placeholder="请输入原密码" id="originPassword"/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="新密码">
                                <Input size="large" type="password" placeholder="请输入新密码" id="newPassword"/>
                            </FormItem>
                            <FormItem {...formItemLayout} label="确认密码">
                                <Input size="large" type="password" placeholder="请重新输入新密码" id="ensurePassword"/>
                            </FormItem>
                        </Form>
                        <Button className="userHomeButton" size="large" type="primary"
                                onClick={this.onClickChangePasswordButton}>提交</Button>
                    </TabPane>
                </Tabs>
            </div>

        )
    }
}

// 关联组件
const mapStateToProps = state => {
    return {userHome: state.userHome};
};
UserHome = connect(mapStateToProps)(UserHome);
export default UserHome;