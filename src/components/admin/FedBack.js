import React, {Component} from 'react';
import './fedBack.less'
import {Button, message, Table, Tabs} from 'antd';
import RichEditorModal from "../common/RichEditorModal";
import {connect} from 'react-redux';
import {getNotsolveQuestion, getSolveQuestion, putAnswer,} from '../../redux/action/adminFedback';
import QuestionClassificationMap from "../common/QuestionClassificationMap";

const TabPane = Tabs.TabPane;

class FedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //查看已解决问题弹出框是否显示
            questionSovledModal: false,
            //查看未解决问题弹出框是否显示
            questionNotSovledModal: false,
            //存放未解决的全部数据
            notSolvedData: [],
            //存储每一行的未解决问题信息
            notSolvedDataRow: {},
            //存放已解决的全部数据
            solvedData: [],
            //存储每一行的已解决问题信息
            solvedDataRow: {userAnswer: {}},
        };
        this.showQuestionNotSovledModal = this.showQuestionNotSovledModal.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(getSolveQuestion({'page': 1, 'rows': 10})).then(() => {
            if (!!this.props.adminFedback.getSolveQuestion) {
                this.setState({
                    solvedData: this.props.adminFedback.getSolveQuestion.data == null ? {} : this.props.adminFedback.getSolveQuestion.data
                })
            }
        })
    }

    /**
     * 根据用户点击Tabs来调用相关函数，加载数据
     * @param e
     */
    changeTabs = (e) => {
        if (e === '2' && this.state.notSolvedData.length === 0) {
            this.props.dispatch(getNotsolveQuestion({'page': 1, 'rows': 10})).then(() => {
                if (!!this.props.adminFedback.getNotsolveQuestion) {
                    this.setState({
                        notSolvedData: this.props.adminFedback.getNotsolveQuestion.data == null ? {} : this.props.adminFedback.getNotsolveQuestion.data
                    })
                }
            })
        }
    };
    /**
     * 分页请求已解决问题的数据
     * @param page
     */
    changeSovledPage = (page) => {
        this.props.dispatch(getSolveQuestion({'page': page, 'rows': 10})).then(() => {
            if (!!this.props.adminFedback.getSolveQuestion) {
                this.setState({
                    solvedData: this.props.adminFedback.getSolveQuestion.data == null ? {} : this.props.adminFedback.getSolveQuestion.data
                })
            }
        });
    };
    /**
     * 分页请求未解决问题的数据
     * @param page
     */
    changeNotSovledPage = (page) => {
        this.props.dispatch(getNotsolveQuestion({'page': page, 'rows': 10})).then(() => {
            if (!!this.props.adminFedback.getNotsolveQuestion) {
                this.setState({
                    notSolvedData: this.props.adminFedback.getNotsolveQuestion.data == null ? {} : this.props.adminFedback.getNotsolveQuestion.data
                })
            }
        });
    };
    showQuestionSovledModal = (e) => {
        this.setState({
            solvedDataRow: e,
            questionSovledModal: true,
        })
    };
    showQuestionNotSovledModal = (e) => {
        this.setState({
            notSolvedDataRow: e,
            questionNotSovledModal: true,
        });
    };
    changeNotSovledOk = () => {
        this.props.dispatch(putAnswer({
            userQuestionId: this.state.notSolvedDataRow.id,
            content: this.state.notSolvedDataRow.content,
        })).then(() => {
            if (this.props.adminFedback.putAnswer != null && this.props.adminFedback.putAnswer.status === 200) {
                message.success('反馈答案成功');
            } else {
                message.error("修改答案失败，请稍后再试！");
            }
        });
        this.setState({
            questionNotSovledModal: false,
        });
    };
    changeSovledCancel = () => {
        this.setState({
            questionSovledModal: false,
        })
    };
    changeSovledOk = () => {
        this.setState({
            questionSovledModal: false,
        })
    };
    changeNotSovledCancel = () => {
        this.setState({
            questionNotSovledModal: false,
        })
    };

    render() {
        let editorIdNotSovledQuestion = 'editorIdNotSovledQuestion-' + new Date().getTime();
        let editorIdSovledQuestion = 'editorIdSovledQuestion-' + new Date().getTime();
        const solvedDataColumns = [
            {
                title: '问题ID',
                dataIndex: 'userQuestion.id',
                key: 'id',

            }, {
                title: '用户ID',
                dataIndex: 'userQuestion.userId',
                key: 'userId',
            }, {
                title: '管理员ID',
                dataIndex: 'userAnswer.userId',
                key: 'adminId',
            }, {
                title: '问题类型',
                dataIndex: 'userQuestion.typeId',
                key: 'typeId',
                render: (typeId) => {
                    return QuestionClassificationMap.typeId2TypeName(typeId);
                }
            }, {
                title: '小分类',
                dataIndex: 'userQuestion.fromId',
                key: 'fromId',
                render: (fromId) => {
                    return QuestionClassificationMap.fromId2FromName(fromId);
                }
            }, {
                title: '问题描述',
                dataIndex: 'userQuestion.question',
                key: 'question',
                width: '50%',
            }, {
                title: '反馈',
                dataIndex: 'userAnswer.feedback',
                key: 'status',
                render: (text, record) => {
                    if (text === 0) text = "未评价";
                    else if (text === 1) text = "很有用";
                    else if (text === 2) text = "有点用";
                    else text = "完全没用";
                    return text;
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: '10%',
                render: (text, record) => {
                    return (
                        <Button type="primary" onClick={() => {
                            this.showQuestionSovledModal(record)
                        }}>查看答案</Button>
                    )
                },
            }];
        const notSolvedDataColumns = [
            {
                title: '问题ID',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
            }, {
                title: '用户ID',
                dataIndex: 'userId',
                key: 'userId',
                width: '10%',
            }, {
                title: '问题类型',
                dataIndex: 'typeId',
                key: 'typeId',
                render: (typeId) => {
                    return QuestionClassificationMap.typeId2TypeName(typeId);
                }
            }, {
                title: '小分类',
                dataIndex: 'fromId',
                key: 'fromId',
                render: (fromId) => {
                    return QuestionClassificationMap.fromId2FromName(fromId);
                }
            }, {
                title: '问题描述',
                dataIndex: 'question',
                key: 'question',
                width: '50%',
            }, {
                title: '来源',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                    if (text === 0) text = "新增反馈";
                    else if (text === 2) text = "二次反馈";
                    else text = "未知";
                    return text;
                }
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                width: '10%',
                render: (text, record) => {
                    return (
                        <Button type="primary" onClick={() => {
                            this.showQuestionNotSovledModal(record)
                        }}>回答问题</Button>
                    )
                },
            }];
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.changeTabs}>
                    <TabPane tab="已解决" key="1">
                        <Table bordered columns={solvedDataColumns}
                               pagination={{  // 分页
                                   total: this.state.solvedData.total,
                                   pageSize: 10,
                                   onChange: this.changeSovledPage,
                                   showTotal: () => '共' + this.state.solvedData.total + '条数据',
                               }}
                               rowKey={(record, index) => `complete${record.id}${index}`}
                               dataSource={this.state.solvedData.data}
                        />
                        <RichEditorModal width={'40%'}
                                         title="查看答案"
                                         visible={this.state.questionSovledModal}
                                         onOk={this.changeSovledOk}
                                         onCancel={this.changeSovledCancel}
                                         cancelText="取消"
                                         editorId={editorIdSovledQuestion}
                                         okText="提交"
                                         onChange={(html) => {
                                             let solvedDataRowtest = this.state.solvedDataRow;
                                             solvedDataRowtest.userAnswer.content = html;
                                             this.setState({
                                                 solvedDataRow: solvedDataRowtest
                                             })
                                         }}
                                         content={this.state.solvedDataRow.userAnswer.content}
                                         menus={['bold',  // 粗体
                                             'fontSize',  // 字号
                                             'link',  // 插入链接
                                             'list',  // 列表
                                             'justify',  // 对齐方式
                                             'emoticon',  // 表情
                                             'image',  // 插入图片
                                             'table',  // 表格
                                             'video',  // 插入视频
                                             'code',  // 插入代码
                                             'undo',  // 撤销
                                             'redo'  // 重复
                                         ]}
                        >
                            <div className="modal_label">
                                <label>
                                    问题：
                                </label>
                                {this.state.solvedDataRow.userQuestion == null ? '' : this.state.solvedDataRow.userQuestion.question}
                            </div>
                            <div className="modal_label">
                                <label>
                                    反馈用户：{this.state.solvedDataRow.userAnswer == null ? '' : this.state.solvedDataRow.userAnswer.userId}
                                </label>
                            </div>
                            <div className="modal_label">
                                <label>
                                    答案：
                                </label>
                            </div>
                            <div id={editorIdSovledQuestion}></div>
                        </RichEditorModal>
                    </TabPane>
                    <TabPane tab="未解决" key="2">
                        <Table bordered columns={notSolvedDataColumns}
                               pagination={{  // 分页
                                   total: this.state.notSolvedData.total,
                                   pageSize: 10,
                                   onChange: this.changeNotSovledPage,
                                   showTotal: () => '共' + this.state.notSolvedData.total + '条数据',
                               }}
                               rowKey={(record, index) => `complete${record.id}${index}`}
                               dataSource={this.state.notSolvedData.data}
                        />
                        <RichEditorModal width={'40%'}
                                         title="提交反馈"
                                         visible={this.state.questionNotSovledModal}
                                         onOk={this.changeNotSovledOk}
                                         onCancel={this.changeNotSovledCancel}
                                         cancelText="取消"
                                         editorId={editorIdNotSovledQuestion}
                                         okText="提交"
                                         onChange={(html) => {
                                             let solvedDataRowtest = this.state.notSolvedDataRow;
                                             solvedDataRowtest.content = html;
                                             this.setState({
                                                 notSolvedDataRow: solvedDataRowtest
                                             })
                                         }}
                                         content={this.state.notSolvedDataRow.content}
                                         menus={['bold',  // 粗体
                                             'fontSize',  // 字号
                                             'link',  // 插入链接
                                             'list',  // 列表
                                             'justify',  // 对齐方式
                                             'emoticon',  // 表情
                                             'image',  // 插入图片
                                             'table',  // 表格
                                             'video',  // 插入视频
                                             'code',  // 插入代码
                                             'undo',  // 撤销
                                             'redo'  // 重复
                                         ]}
                        >
                            <div>
                                <label className="modal_label">
                                    问题：
                                </label>
                                {this.state.notSolvedDataRow.question}
                            </div>
                            <div>
                                <label className="modal_label">
                                    反馈：（请在此键入你的回答）
                                </label>
                            </div>
                            <div id={editorIdNotSovledQuestion}></div>
                        </RichEditorModal>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {adminFedback: state.adminFedback};
};
FedBack = connect(mapStateToProps)(FedBack);
export default FedBack;