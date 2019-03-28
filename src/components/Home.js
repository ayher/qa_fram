import React from 'react';
import './home.less'
import {Button, Form, Icon, Input, message} from 'antd';
import swustImg from '../images/swust.jpg';
import logoutImg from '../images/logout.png';
import {connect} from 'react-redux';
import {
    getCommonQuestion,
    getHomeDatas,
    getQuestionAnswer,
    putQueationAppraise,
    putQuestionAnswer
} from '../redux/action/home';
import RichEditorModal from './common/RichEditorModal'
import BigClassSelect from './common/BigClassSelect'
import SmallClassSelect from './common/SmallClassSelect'
// 富文本中正在修改提问的问题
var changeingQuestion = "";
const FormItem = Form.Item;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 用了保存聊天框
            chatChat: [],
            // 常见问题标签存放
            commonQuestionScript: [],
            // 常见问题
            commonQuestion: [],
            // 提问总数
            askAllCount: '',
            // 问题条目
            questionAllCount: '',
            // 用户数
            userAllCount: '',
            // 用户提交问题的富文本弹出框的显示控制
            userPutQuestionModalVisible: false,
            // 富文本中的内容
            editorContent: '请对你的问题进行详细补充说明:',
            // 富文本中问题类型
            editorQuestionType: 1,
            editorQuestionFormId: 1,
        };
        this.sendQuestion = this.sendQuestion.bind(this);
        this.fedBackClick = this.fedBackClick.bind(this);
        this.putUserQuestionButton = this.putUserQuestionButton.bind(this);
        this.handleEditorContentChange = this.handleEditorContentChange.bind(this);
        this.editorButtonOk = this.editorButtonOk.bind(this);
        this.setImgPreview = this.setImgPreview.bind(this);
    };

    /**
     * 用户点击图片后，预览图片
     */
    setImgPreview(event) {
        let motai = document.getElementById('previewImgDiv');
        let moimg = document.getElementById("previewImg");
        motai.style.display = "block";
        moimg.src = event.target.src;
        let span = document.getElementById("previewCloseSpan");
        span.onclick = function () {
            motai.style.display = "none";
        }
    }

    /**
     * 组件加载完后加载数据，用于ajax请求
     *
     */
    componentDidMount() {
        this.getCommonQuestion();
        // 请求主页的三个数据
        this.props.dispatch(getHomeDatas()).then(() => {
            if (!!this.props.home.getHomeDatas) {
                if (this.props.home.getHomeDatas.status === 200) {
                    this.setState({
                        askAllCount: this.props.home.getHomeDatas.data.askAllCount,
                        questionAllCount: this.props.home.getHomeDatas.data.questionAllCount,
                        userAllCount: this.props.home.getHomeDatas.data.userAllCount,
                    })
                }
                else message.error(this.props.home.getHomeDatas.msg)
            }
            else message.error("出现异常!")

        });
    }

    /**
     * 用于调用获取后台常见数据的接口
     */
    getCommonQuestion = () => {
        this.props.dispatch(getCommonQuestion()).then(() => {
            if (!!this.props.home.getCommonQuestion) {
                if (this.props.home.getCommonQuestion.status === 200) {
                    let commonQuestionScriptTest = [];
                    for (let i = 0; i < this.props.home.getCommonQuestion.data.length; i++) {
                        commonQuestionScriptTest.push(
                            <div className="cardQuestion" key={i}
                                 onClick={(e) => this.sendQuestion(e.target.textContent)}>
                                <span>{this.props.home.getCommonQuestion.data[i].name}</span>
                            </div>
                        )
                    }
                    this.setState({commonQuestionScript: commonQuestionScriptTest})
                }
                else message.error(this.props.home.getCommonQuestion.msg)
            }
            else message.error("出现异常!")

        });
    };

    /**
     * 处理用户对问题进行评价，向后台发送请求
     */
    fedBackClick(e) {
        this.props.dispatch(putQueationAppraise({
            askId: document.getElementById('questionAppraise').getAttribute('answerid'),
            feedbackId: e.target.getAttribute("feedbacktype")
        })).then(() => {
            if (!!this.props.home.putQueationAppraise) {
                if (this.props.home.putQueationAppraise.status === 200) {
                    message.success(this.props.home.putQueationAppraise.msg)
                }
                else message.error(this.props.home.putQueationAppraise.msg)
            }
            else message.error("出现异常!")
        });
    }

    /**
     * 组件准备渲染，修改滑动条
     *
     */
    componentWillUpdate() {
        // 提问后使滚动条滑到最低
        setTimeout(function () {
            document.getElementById('box').scrollTop = document.getElementById('box').scrollHeight;
        }, 500);
    }

    /**
     * 用户反馈问题填写完成，点击提交按钮是调用
     */
    editorButtonOk() {
        this.props.dispatch(putQuestionAnswer({
            userId: localStorage.id,
            typeId: this.state.editorQuestionType,
            fromId: this.state.editorQuestionFormId,
            content: this.state.editorContent,
            question: changeingQuestion,
            status: 0
        })).then(() => {
            if (!!this.props.home.putQuestionAnswer) {
                if (this.props.home.putQuestionAnswer.status === 200) {
                    message.success(this.props.home.putQuestionAnswer.msg)
                }
                else message.error(this.props.home.putQuestionAnswer.msg)
            }
            else message.error("出现异常!")
        });
        this.setState({userPutQuestionModalVisible: false})
    }

    /**
     * 用户对答案不满意，提供答案
     */
    putUserQuestionButton(e) {
        changeingQuestion = e;
        this.setState({
            userPutQuestionModalVisible: true
        })
    }


    /**
     * 富文本内容改变时调用
     * @param html
     */
    handleEditorContentChange(html) {
        this.setState({editorContent: html})
    }

    /**
     * 当点击发送时调用此函数，用于构造发送和回答框,调用ajax请求后台数据，添加到回答框。
     *@param questionText 是提问的问题。
     */
    sendQuestion = (questionText) => {
        if (questionText === "") {
            message.error("输入问题不能为空!")
        }
        else {
            let charChat = this.state.chatChat;
            charChat.push(
                // 用户提问框
                <div className="chatUser" key={questionText + "提问"}>
                    {localStorage.avatar ?
                        <img src={localStorage.avatar} alt="登录"/> :
                        <img src={logoutImg} alt="用户头像"/>}
                    <div className="userchatBox">{questionText}</div>
                </div>
            )
            this.props.dispatch(getQuestionAnswer({
                question: questionText,
            })).then(() => {
                if (!!this.props.home.getQuestionAnswer) {
                    if (this.props.home.getQuestionAnswer.status === 200) {
                        charChat.push(
                            // 管理员回答框
                            <div className="chatAdmin" key={questionText + "回答"}>
                                <img src={swustImg} className="adminlogo" alt="管理员头像"/>
                                <div className="adminchatBox" id="adminchatBox">
                                    <span dangerouslySetInnerHTML={{
                                        __html: this.props.home.getQuestionAnswer.data.answerList[0].content
                                            .replace("<table", '<table border="1"').replace("<p>", "<p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp")
                                    }}/>
                                    <span style={{fontWeight: 'bold '}}><br/>以上回答对你是否有帮助？<br/><br/></span>
                                    <p id="questionAppraise"
                                       answerid={this.props.home.getQuestionAnswer.data.askId}><span
                                        className="feedBackText"
                                        feedbacktype="1"
                                        onClick={this.fedBackClick}>
                                        很有帮助</span>
                                        <span className="feedBackText" feedbacktype="2" onClick={this.fedBackClick}>
                                        有点用</span>
                                        <span className="feedBackText" feedbacktype="3" onClick={this.fedBackClick}>
                                        完全没用</span></p>
                                    <Button onClick={() => this.putUserQuestionButton(questionText)}
                                            className="userPutQuestionButton">提交问题给管理员</Button>
                                </div>
                            </div>
                        )
                        this.setState({chatChat: charChat})
                    }
                }
                else message.error("出现异常!")
            });
            document.getElementById("questionText").value = "";
        }
    };

    // 监听问题回答中的图片，点击就放大预览
    componentDidUpdate() {
        var imgcard = document.getElementById("adminchatBox");
        if (imgcard) {
            var img = imgcard.querySelector("img");
            if (img) {
                img.onclick = this.setImgPreview
            }
        }
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
        // 富文本弹出框的id
        let editorIdPutQuestion = 'editorIdPutQuestion-' + new Date().getTime();
        return (
            <div className="homeBackground">
                {/*图片预览*/}
                <div id="previewImgDiv">
                    <span id="previewCloseSpan">X</span>
                    <img id="previewImg" alt="没有图片"/>
                </div>
                {/*聊天框*/}
                <div className="chatBox">
                    <div className="box" id="box">
                        {this.state.chatChat}
                    </div>
                    <div className="answer">
                        <input className="questionInput" onKeyDown={(event) => {
                            if (event.keyCode === 13) {
                                event.preventDefault();
                                let questionText = document.getElementById("questionText").value;
                                this.sendQuestion(questionText)
                            }
                        }} type="text" placeholder="请输入问题!" id="questionText"/>
                        <Button className="sendButton" type="primary"
                                onClick={() => {
                                    let questionText = document.getElementById("questionText").value;
                                    this.sendQuestion(questionText)
                                }}>发送
                        </Button>
                    </div>
                </div>
                {/*信息展示*/}
                <div className="chatMessage">
                    <div className="dataShow">
                        <DataScript type={"user"} count={this.state.userAllCount} name={"用户数"}/>
                        <DataScript type={"search"} count={this.state.askAllCount} name={"提问数"}/>
                        <DataScript type={"file"} count={this.state.questionAllCount} name={"知识条目"}/>
                    </div>
                    <div className="commonQuestion">
                        <h1>常见问题</h1>
                        <div className="theQuestion">
                            {this.state.commonQuestionScript}
                        </div>
                        <input value="换一组" className="changeQuestion" type="button" onClick={this.getCommonQuestion}/>
                    </div>
                </div>
                {/*用户提交问题弹出框*/}
                <RichEditorModal
                    title="提交反馈"
                    visible={this.state.userPutQuestionModalVisible}
                    onOk={this.editorButtonOk}
                    onCancel={() => this.setState({userPutQuestionModalVisible: false})}
                    cancelText="取消"
                    okText="提交"
                    content={this.state.editorContent}
                    editorId={editorIdPutQuestion}
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
                    onChange={(html) => this.handleEditorContentChange(html)}
                >
                    <Form>
                        <FormItem {...formItemLayout} label="问题描述：">
                            <Input value={changeingQuestion}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="问题类型：">
                            <BigClassSelect defaultValue="1" onChange={(e) => {
                                this.setState({editorQuestionType: e})
                            }}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="问题小分类：">
                            <SmallClassSelect defaultValue="1" onChange={(e) => {
                                this.setState({editorQuestionFormId: e})
                            }}/>
                        </FormItem>
                        <span>补充说明:</span>
                        <div>
                            <div id={editorIdPutQuestion}></div>
                        </div>
                    </Form>
                </RichEditorModal>
            </div>
        )
    }
}

/*
*展示数据的小组件，从父组件继承三个属性
* @param 1.type：图标的类型，2.count数据的值，3.name数据的名称
 */
class DataScript extends React.Component {
    render() {
        return (
            <div className="dataScript">
                <Icon type={this.props.type} className="icon"/>
                <p className="count">{this.props.count}</p>
                <p className="value">{this.props.name}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {home: state.home};
};
Home = connect(mapStateToProps)(Home);
export default Home;