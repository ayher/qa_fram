import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, Select, Table} from 'antd';
import {connect} from 'react-redux';
import './user.less';
import {addUser, adminUpdateUserInfo, getUserList,} from '../../redux/action/adminUser';
import {toMd5} from '../common/toMd5';

const FormItem = Form.Item;
const Option = Select.Option;

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //存储所有用户信息
            userList: [],
            //存储每一行的用户信息
            userInfoRow: {},
            //新添加用户的角色ID
            addRoleId: '',
            changeUserModal: false,
            //修改用户弹出框是否显示
            addUserModal: false
        }
    }

    /**
     *页面第一次渲染时请求10条用户信息
     */
    componentDidMount() {
        this.props.dispatch(getUserList({
            page: 1,
            rows: 10,
        })).then(() => {
            if (!!this.props.adminUser.getUserList) {
                this.setState({
                    userList: this.props.adminUser.getUserList.data,
                })
            }
        });
    }

    /**
     * 分页请求数据
     * @param page
     */
    getUserList = (page) => {
        this.props.dispatch(getUserList(
            {
                page: page,
                rows: 10,
            })).then(() => {
            if (!!this.props.adminUser.getUserList) {
                this.setState({
                    userList: this.props.adminUser.getUserList.data,
                })
            }
        });
    }
    /**
     * 点击添加用户按钮调用，弹出添加用户的对话框
     */
    showAddUserInfo = () => {
        this.setState({
            addUserModal: true,
        })
    }
    /**
     * 点击ok按钮时调用，关闭对话框,将对话框中数据传给后台
     * @param e
     */
    changeUserInfoOk = (e) => {
        this.props.dispatch(adminUpdateUserInfo({
            id: document.getElementById("id").value,
            nickname: document.getElementById("nickname").value,
            username: document.getElementById("username").value,
            studentId: document.getElementById("studentId").value,
            clas: document.getElementById("clas").value,
            institute: document.getElementById("institute").value,
            roleId: this.state.roleId,
            password: toMd5(document.getElementById("password").value)
        })).then(() => {
            if (!!this.props.adminUser.adminUpdateUserInfo) {
                if (this.props.adminUser.adminUpdateUserInfo.status === 200) {
                    message.success("修改信息成功！");
                }
                else {
                    message.error("修改信息失败，请稍后再试！");
                }
            }
        });
        this.setState({
            changeUserModal: false,
        });
    }
    /**
     * 点击对话框外或者cancel调用，关闭对话框
     * @param e
     */
    changeUserInfoCancel = (e) => {
        this.setState({
            changeUserModal: false,
        });
    }
    /**
     * 点击添加用户对话框的提交按钮调用，讲新添加的用户信息传给后台,关闭对话框
     *  @param e
     */
    addUserInfoOk = (e) => {
        this.props.dispatch(addUser({
            avatar: localStorage.avatar,
            nickname: document.getElementById("addNickname").value,
            username: document.getElementById("addUsername").value,
            roleId: this.state.addRoleId,
            password: document.getElementById("addPassword").value,
            sex: true
        })).then(() => {
            if (!!this.props.adminUser.addUser) {
                if (this.props.adminUser.addUser.status === 200) {
                    message.success("添加用户成功！");
                }
                else {
                    message.error("添加用户失败，请稍后再试！");
                }
            }
        });
        this.setState({
            addUserModal: false,
        });
    }
    /**
     * 点击添加用户对话框外或者cancel调用，关闭对话框
     * @param e
     */
    addUserInfoCancel = (e) => {
        this.setState({
            addUserModal: false,
        });
    }
    onRowChange = (e) => {
        this.setState({
            userInfoRow: e,
            changeUserModal: true,
        })
    }
    changeNickname = (e = 1 || window.event) => {
        let {userInfoRow} = this.state;
        userInfoRow.nickname = e.target.value;
        this.setState({
            userInfoRow
        })
    }
    changeUsername = (e = 1 || window.event) => {
        let {userInfoRow} = this.state;
        userInfoRow.username = e.target.value;
        this.setState({
            userInfoRow
        })
    }
    changePassword = (e = 1 || window.event) => {
        let {userInfoRow} = this.state;
        userInfoRow.password = e.target.value;
        this.setState({
            userInfoRow
        })
    }
    changeStudentId = (e = 1 || window.event) => {
        let {userInfoRow} = this.state;
        userInfoRow.studentId = e.target.value;
        this.setState({
            userInfoRow
        })
    }
    changeInstitute = (e = 1 || window.event) => {
        let {userInfoRow} = this.state;
        userInfoRow.institute = e.target.value;
        this.setState({
            userInfoRow
        })
    }
    changeClas = (e = 1 || window.event) => {
        let {userInfoRow} = this.state;
        userInfoRow.clas = e.target.value;
        this.setState({
            userInfoRow
        })
    }
    changeRoleId = (value) => {
        const temp = this.state.userInfoRow;
        temp.roleId = value;
        this.setState({
            userInfoRow: temp,
            roleId: value
        })
    }
    handleAddRoleId = (value) => {
        this.setState({
            addRoleId: value
        })
    }

    render() {
        // 一种响应式布局，antd自带的例子
        const formItemLayout = {
            labelCol: {
                xs: {span: 32},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        const columns = [{
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        }, {
            title: '角色',
            dataIndex: 'roleId',
            key: 'roleId',
            render: (text, record) => {
                return (
                    text === 1 ? '用户' : '管理员'
                )
            }
        }, {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: '班级',
            dataIndex: 'clas',
            key: 'clas',
        }, {
            title: '专业',
            dataIndex: 'institute',
            key: 'institute',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                return (
                    <Button type="primary" onClick={() => {
                        this.onRowChange(record)
                    }}>修改</Button>
                )
            },
        }];
        return (
            <div>
                {/*此处的actionBar样式写在了answer.less上面*/}
                <div className="actionBar">
                    <Button size="large" type="primary" onClick={this.showAddUserInfo}>添加用户</Button>
                </div>
                <Table bordered
                       pagination={{
                           total: this.state.userList.total,
                           onChange: this.getUserList,
                           showTotal: () => '共' + this.state.userList.total + '条数据',
                       }}
                       rowKey={(record, index) => `complete${record.id}${index}`}
                       columns={columns} dataSource={this.state.userList.data}
                />
                <Modal id="changeUserInfo" title="修改用户信息" visible={this.state.changeUserModal}
                       onCancel={this.changeUserInfoCancel}
                       onOk={this.changeUserInfoOk}
                       cancelText="取消"
                       okText="提交"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="ID：" required="true">
                            <Input disabled id="id" value={this.state.userInfoRow.id}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="昵称：" required="true">
                            <Input value={this.state.userInfoRow.nickname} id="nickname"
                                   onChange={this.changeNickname}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="用户名：" required="true">
                            <Input value={this.state.userInfoRow.username} id="username"
                                   onChange={this.changeUsername}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码：" required="true">
                            <Input id="password" value={this.state.userInfoRow.password}
                                   onChange={this.changePassword}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="学号：" required="true">
                            <Input value={this.state.userInfoRow.studentId} id="studentId"
                                   onChange={this.changeStudentId}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="班级：" required="true">
                            <Input value={this.state.userInfoRow.clas} id="clas" onChange={this.changeClas}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="学院：" required="true">
                            <Input value={this.state.userInfoRow.institute} id="institute"
                                   onChange={this.changeInstitute}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="角色：">
                            <Select defaultValue={this.state.userInfoRow.roleId === 1 ? "用户" : "管理员"}
                                    id="roleId" style={{width: '120px'}} onChange={this.changeRoleId}>
                                <Option value="2">管理员</Option>
                                <Option value="1">用户</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
                <Modal id="changeUserInfo" title="添加用户" visible={this.state.addUserModal}
                       onCancel={this.addUserInfoCancel}
                       onOk={this.addUserInfoOk}
                       cancelText="取消"
                       okText="提交"
                >
                    <Form>
                        <FormItem {...formItemLayout} label="昵称：" required="true">
                            <Input id="addNickname"/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="用户名：" required="true">
                            <Input id="addUsername"/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码：" required="true">
                            <Input id="addPassword"/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="角色：">
                            <Select defaultValue="选择角色" id="addRoleId" style={{width: '120px'}}
                                    onChange={this.handleAddRoleId}>
                                <Option value="2">管理员</Option>
                                <Option value="1">用户</Option>
                            </Select>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
            ;
    }
}

const mapStateToProps = state => {
    return {adminUser: state.adminUser};
};
User = connect(mapStateToProps)(User)
export default User;

