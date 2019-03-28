import React, {Component} from 'react';
import {Button, Form, Icon, Input, List, message, Table, Tabs} from 'antd';
import {getUserSolveNotQ, getUserSolveQ, saveQuestion, updateSolveNotQuestion,} from '../redux/action/questionRecord'
import {connect} from 'react-redux';
import {TimeStampToTime} from "./common/TimeStampToTime"
import RichEditorModal from './common/RichEditorModal'
import BigClassSelect from './common/BigClassSelect'
import SmallClassSelect from './common/SmallClassSelect'
import QuestionClassificationMap from './common/QuestionClassificationMap';
import './questionRecord.less'

const FormItem = Form.Item;

class QuestionRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 问题已解决数据
            userSolvedQuestion: [],
            // 问题未解决数据
            userNotSolvedQuestion: [],
            // 添加回答弹出框状态
            addQuestionModalVisible: false,
            // 暂时保存已解决问题的某一行
            changeSolveRow: {},
            // 暂时保存未解决问题的某一行
            changeNotSolveRow: {},
            // 页数标记
            nowPage: 1,
        };
        this.getUserSolveQCurrently = this.getUserSolveQCurrently.bind(this);
        this.getUserSolveNotQCurrently = this.getUserSolveNotQCurrently.bind(this);
    }

    /**
     * 组件加载完后加载数据，用于ajax请求
     */
    componentDidMount() {
        //请求用户已解决问题列表
        this.props.dispatch(getUserSolveQ({
            page: 1,
            rows: 10,
        })).then(() => {
            if (!!this.props.questionRecord.getUserSolveQ) {
                if (this.props.questionRecord.getUserSolveQ.status === 200) {
                    this.setState({
                        userSolvedQuestion: this.props.questionRecord.getUserSolveQ.data,
                    })
                }

                else message.error(this.props.questionRecord.getUserSolveQ.msg)
            }
            else message.error("出现异常!")
        });
        //请求用户未解决问题列表
        this.props.dispatch(getUserSolveNotQ({
            page: 1,
            rows: 10,
        })).then(() => {
            if (!!this.props.questionRecord.getUserSolveNotQ) {
                if (this.props.questionRecord.getUserSolveNotQ.status === 200) {
                    this.setState({
                        userNotSolvedQuestion: this.props.questionRecord.getUserSolveNotQ.data,
                    })
                }

                else message.error(this.props.questionRecord.getUserSolveNotQ.msg)
            }
            else message.error("出现异常!")
        });
    }

    /**
     * 当页码改变时,请求新一页已解决的问题列表
     * @param page   页码
     */
    getUserSolveQCurrently(page) {
        this.props.dispatch(getUserSolveQ({
            page: page,
            rows: 10,
        })).then(() => {
            if (!!this.props.questionRecord.getUserSolveQ) {
                if (this.props.questionRecord.getUserSolveQ.status === 200) {
                    this.setState({
                        userSolvedQuestion: this.props.questionRecord.getUserSolveQ.data,
                        nowPage: page
                    })
                }

                else message.error(this.props.questionRecord.getUserSolveQ.msg)
            }
            else message.error("出现异常!")
        });
    }

    /**
     * 当页码发生变化时请求新一页未解决问题的列表
     * @param page   页码
     */
    getUserSolveNotQCurrently(page) {
        this.props.dispatch(getUserSolveNotQ({
            page: page,
            rows: 10,
        })).then(() => {
            if (!!this.props.questionRecord.getUserSolveNotQ) {
                if (this.props.questionRecord.getUserSolveNotQ.status === 200) {
                    this.setState({
                        userNotSolvedQuestion: this.props.questionRecord.getUserSolveNotQ.data,
                    })
                }
                else message.error(this.props.questionRecord.getUserSolveNotQ.msg)
            }
            else message.error("出现异常!")
        });
    }

    /**
     * 用户对答案的评价
     * @param text
     * @param id
     */
    saveAnswerStatus = (text, id) => {
        let aStatus = 0;
        if (text === "很有帮助") aStatus = 1;
        else if (text === "有点用") aStatus = 2;
        else aStatus = 3;
        this.props.dispatch(saveQuestion({
            id: id,
            status: aStatus
        })).then(() => {
            if (this.props.questionRecord.saveQuestion.status === 200) {
                message.success("反馈成功");
                this.getUserSolveQCurrently(this.state.nowPage);
            }
            else message.error("反馈失败");
        });
        if (!!this.props.questionRecord.getUserSolveQ) {
            if (this.props.questionRecord.getUserSolveQ.status === 200) {
                this.setState({
                    userSolvedQuestion: this.props.questionRecord.getUserSolveQ.data,
                })
            }
            else message.error(this.props.questionRecord.getUserSolveQ.msg)
        }
        else message.error("出现异常!")

    };
    /**
     * 点击补充说明弹出框的提交按钮时 将此时弹出框的数据传给后台
     */
    updateQuestionOk = () => {
        this.props.dispatch(updateSolveNotQuestion({
                id: this.state.changeNotSolveRow.id,
                userId: this.state.changeNotSolveRow.userId,
                typeId: this.state.changeNotSolveRow.typeId,
                fromId: this.state.changeNotSolveRow.fromId,
                question: this.state.changeNotSolveRow.question,
                content: this.state.editorContent,
            }
        )).then(() => {
            if (!!this.props.questionRecord) {
                if (this.props.questionRecord.updateSolveNotQuestion.status === 200) {
                    message.success("修改补充说明成功!");
                }
                else message.error("修改问题失败，请稍后再试！");
            }
            else {
                message.error("修改问题失败，请稍后再试！");
            }
        });
        this.setState({
            addQuestionModalVisible: false
        })
    };
    /**
     * 修改问题
     * @param e
     */
    changeQuestion = (e = 1 || window.event) => {
        let {changeNotSolveRow} = this.state;
        changeNotSolveRow.question = e.target.value;
        this.setState({
            changeNotSolveRow
        })
    };
    /**
     * 修改问题分类
     * @param e
     */
    changeQuestionTypeId = (e = 1 || window.event) => {
        let {changeNotSolveRow} = this.state;
        changeNotSolveRow.typeId = e;
        this.setState({
            changeNotSolveRow
        })
    };
    /**
     * 修改问题小分类
     * @param e
     */
    changeQuestionFormId = (e = 1 || window.event) => {
        let {changeNotSolveRow} = this.state;
        changeNotSolveRow.fromId = e;
        this.setState({
            changeNotSolveRow
        })
    };
    /**
     * 设置'补充说明'按钮的状态
     */
    showAddInfo = (e) => {
        this.setState({
            changeNotSolveRow: e,
            addQuestionModalVisible: true
        })
    };

    /**
     * 富文本框的api
     * @param html
     */
    handleEditorContentChange(html) {
        this.setState({editorContent: html})
    }

    render() {
        //一种响应式布局，antd自带的例子
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        const TabPane = Tabs.TabPane;
        // 用户评价
        const IconText = ({type, text, color, id}) => (
            <span style={{color: color}} onClick={this.saveAnswerStatus.bind(this, text, id)}>
                    <Icon type={type} style={{marginRight: 8}}/>
                {text}
                 </span>
        );
        // 表格列图
        const columns = [{
            title: '问题ID',
            dataIndex: 'id',
            key: 'id',
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
            title: '问题',
            dataIndex: 'question',
            key: 'question',
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            sortDirections: ['descend', 'ascend'],
            render: (t) => {
                return TimeStampToTime(t)
            }
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                return (
                    <Button type="primary" onClick={() => {
                        this.showAddInfo(record)
                    }}>补充说明</Button>
                )
            },
        }];
        // 富文本框弹出的id
        let editorId = 'editor-' + new Date().getTime();
        return (
            <div>
                <Tabs defaultActiveKey="1" className="questionRecordTab">
                    {/*已解决*/}
                    <TabPane tab="已解决" key="1">
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                showQuickJumper: true,
                                total: this.state.userSolvedQuestion.total,
                                pageSize: 10,
                                defaultCurrent: 1,
                                showTotal: () => '共' + this.state.userSolvedQuestion.total + '条数据',
                                onChange: this.getUserSolveQCurrently
                            }}
                            dataSource={this.state.userSolvedQuestion.data}
                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                    actions={
                                        [
                                            <IconText type="smile-o" text="很有帮助" id={item.userAnswer.id} name="x"
                                                      color={item.userAnswer.feedback === 1 ? "#0000CD" : "#bcbcbc"}
                                            />,
                                            <IconText type="meh-o" text="有点用" id={item.userAnswer.id}
                                                      color={item.userAnswer.feedback === 2 ? "#0000CD" : "#bcbcbc"}
                                            />,
                                            <IconText type="frown-o" text="完全没用" id={item.userAnswer.id}
                                                      color={item.userAnswer.feedback === 3 ? "#0000CD" : "#bcbcbc"}
                                            />
                                        ]
                                    }
                                >
                                    <List.Item.Meta
                                        title={
                                            <div>
                                                <p>问题：{item.userQuestion.question}</p>
                                                <span style={{fontSize: "smaller"}}>
                                                    反馈者：{item.userAnswer.userId}<br/>
                                                    反馈时间：{TimeStampToTime(item.userQuestion.time)}<br/>
                                                    状态：{item.userQuestion.status === 2 ? '二次反馈中' : '已反馈并回答'}
                                                    </span>
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <span dangerouslySetInnerHTML={{__html: item.userAnswer.content}}/>
                                            </div>
                                        }
                                    />
                                </List.Item>

                            )}
                        />
                    </TabPane>
                    {/*未解决*/}
                    <TabPane tab="未解决" key="2">
                        <Table
                            rowKey={record => record.id}
                            pagination={{
                                showQuickJumper: true,
                                total: this.state.userNotSolvedQuestion.total,
                                pageSize: 10,
                                defaultCurrent: 1,
                                showTotal: () => '共' + this.state.userNotSolvedQuestion.total + '条数据',
                                onChange: this.getUserSolveNotQCurrently
                            }}
                            columns={columns} dataSource={this.state.userNotSolvedQuestion.data}/>
                        <RichEditorModal
                            title="答案补充"
                            visible={this.state.addQuestionModalVisible}
                            onOk={this.updateQuestionOk}
                            onCancel={() => this.setState({addQuestionModalVisible: false})}
                            cancelText="取消"
                            okText="提交"
                            editorId={editorId}
                            onChange={(html) => this.handleEditorContentChange(html)}
                            content={this.state.changeNotSolveRow.content}
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
                            <Form>
                                <FormItem {...formItemLayout} label="问题:">
                                    <Input value={this.state.changeNotSolveRow.question}
                                           onChange={this.changeQuestion}/>
                                </FormItem>
                                {this.state.addQuestionModalVisible ?
                                    <FormItem {...formItemLayout} label="问题类型:">
                                        <BigClassSelect onChange={this.changeQuestionTypeId}
                                                        defaultValue={QuestionClassificationMap.typeId2TypeName(this.state.changeNotSolveRow.typeId)}/>
                                    </FormItem>
                                    : ''} {this.state.addQuestionModalVisible ?
                                <FormItem {...formItemLayout} label="问题小分类：">
                                    <SmallClassSelect onChange={this.changeQuestionFormId}
                                                      defaultValue={QuestionClassificationMap.fromId2FromName(this.state.changeNotSolveRow.fromId)}/>
                                </FormItem>
                                : ''}
                                <span>补充说明:</span>
                                <div id={editorId}/>
                            </Form>
                        </RichEditorModal>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

//组件关联
const mapStateToProps = state => {
    return {questionRecord: state.questionRecord};
};
QuestionRecord = connect(mapStateToProps)(QuestionRecord);
export default QuestionRecord;
