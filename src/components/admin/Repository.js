import React, {Component} from 'react';
import {Button, Form, Input, message, Modal, Switch, Table} from 'antd';
import './repository.less'
//引入富文本编辑器
import RichEditorModal from "../common/RichEditorModal";
import {connect} from 'react-redux';
import {
    addKnowledge,
    changeQuestion,
    getRepositoryList,
    putKnowledge,
    searchKnowledge,
    uploadRepository,
} from '../../redux/action/adminRepository';
import SmallClassSelect from '../common/SmallClassSelect';
import BigClassSelect from '../common/BigClassSelect';
import QuestionClassificationMap from "../common/QuestionClassificationMap";
import * as XLSX from 'xlsx';

const FormItem = Form.Item;

class Repository extends Component {
    //每页数据条数
    static PAGE_SIZE = 10;
    static KEYWORDS = "";

    constructor(props) {
        super(props);
        this.state = {
            //修改问题弹出框是否显示
            changeQuestionModal: false,
            //添加问题弹出框是否显示
            addQuestionModal: false,
            //推送知识库提示窗口
            pushRepositoryVisible: false,
            //问题列表（多种问法）
            //获取知识库列表
            repositoryList: [],
            //获取每一行的数据
            changeDateRow: {},
            //问题问法输入框组,是几个输入框dom
            questionDpArray: [],
            //问题问法输入框id
            idNum: 2,
            //记录当前页数
            nowPage: 1,
            //记录添加问题对话框中的问题
            askMethodList: [],
            //记录添加问题对话框中的问题框的id
            askMethodId: 2,
            //上传文件按钮的状态
            upFile: false,
            //问题库数据
            data: null,
            // 保存是否覆盖
            ifCover: true,
        };
        this.showChangeQuestion = this.showChangeQuestion.bind(this);
        this.showAddQuestion = this.showAddQuestion.bind(this);
        this.showPushRepository = this.showPushRepository.bind(this);
        this.switchCover = this.switchCover.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getRepositoryList({
            keyWords: "",
            page: 1,
            rows: Repository.PAGE_SIZE,
        })).then(() => {
            if (!!this.props.adminRepository.getRepositoryList) {
                // 把后端传过来的字符数据转为数组数据
                let datatest = this.props.adminRepository.getRepositoryList.data;
                for (var i = 0; i < datatest.data.length; i++) {
                    datatest.data[i].question = JSON.parse(datatest.data[i].question)
                }
                this.setState({
                    repositoryList: datatest,
                })
            }
        });
    }

    /**
     * 分页请求数据，此时需要记录当前的页数
     * @param page
     */
    getRepositoryList = (page) => {
        this.props.dispatch(getRepositoryList(
            {
                keyWords: "",
                page: page,
                rows: Repository.PAGE_SIZE,
            })).then(() => {
            if (!!this.props.adminRepository.getRepositoryList) {
                let datatest = this.props.adminRepository.getRepositoryList.data;
                for (var i = 0; i < datatest.data.length; i++) {
                    datatest.data[i].question = JSON.parse(datatest.data[i].question)
                }
                this.setState({
                    repositoryList: this.props.adminRepository.getRepositoryList.data,
                    nowPage: page
                })
            }
        });
    };

    /**
     * 点击查看按钮调用，弹出修改答案的对话框框
     * 将问题描述的问题列表添加到状态数组
     */
    showChangeQuestion = (e) => {
        let qs = [];
        if (!!e.question) {
            for (var i = 0; i < this.state.changeDateRow.question.length; i++) {
                let questionName = "question" + (i + 1);
                qs.push(<Input name={questionName} key={i} mark={i} value={this.state.changeDateRow.question[i]}
                               onChange={this.changeDateQuestion}/>)
            }
        }
        let changeDateRowtest = this.state.changeDateRow;
        changeDateRowtest.question = qs;
        this.setState({
            changeDateRow: changeDateRowtest,
            idNum: this.state.changeDateRow.question.length + 1,
            changeQuestionModal: true,
        })
    };
    /**
     * 点击添加时调用，此时给addTypeId一个初始值
     */
    showAddQuestion = () => {
        this.setState({
            askMethodList: [],
            addQuestionModal: true,
            //点击时给addTypeId赋初始值
            addTypeId: 1,
            addFormId: 1,
        })
    };
    /**
     * 显示推送知识库窗口
     */
    showPushRepository = () => {
        this.setState({
            pushRepositoryVisible: true
        })
    };

    /**
     * 显示上传文件对话框
     */
    showUpFileModal = () => {
        this.setState({
            upFile: true,
        });
    }

    /**
     * 隐藏上传文件对话框
     * @param e
     */
    hideUpFileModal = (e) => {
        this.setState({
            upFile: false,
        })
    }

    /**
     * 鼠标点击取消或者非对话框区域时调用，隐藏对话框
     * @param e
     */
    changeQuestionCancel = (e) => {
        this.checkDate(this.state.nowPage);
        this.setState({
            changeQuestionModal: false,
        });
    };
    /**
     * 点击修改按钮时触发，隐藏对话框
     * @param e
     */
    changeQuestionOk = (e) => {
        let dataTest = this.state.changeDateRow;
        // 把数组编程字符串，提交到后台
        let arr = [];
        for (let i = 0; i < this.state.changeDateRow.question.length; i++) {
            arr.push(this.state.changeDateRow.question[i].props.value);
        }
        dataTest.question = JSON.stringify(arr);
        dataTest.answer = dataTest.content;
        this.props.dispatch(changeQuestion(
            dataTest
        )).then(() => {
            if (!!this.props.adminRepository) {
                if (this.props.adminRepository.changeQuestion.status === 200) {
                    message.success("修改问题成功！");
                    this.checkDate(this.state.nowPage);
                }
                else message.error("修改问题失败，请稍后再试！");
            }
            else message.error("修改问题失败，请稍后再试！");
        });
        this.setState({
            changeQuestionModal: false,
        });
    };
    addQuestionOk = (e) => {
        //处理要传的question字段
        let addQuestionList = [];
        addQuestionList.push(document.getElementById("addQuestion1").value)
        if (addQuestionList[0] === "") {
            message.error("问题不能为空");
            return;
        }
        for (var i = 0; i < this.state.askMethodList.length; i++) {
            let askId = "addQuestion" + (i + 2).toString();
            var x = document.getElementById(askId).value;
            addQuestionList.push(x);
        }
        //传输添加的数据给后台
        this.props.dispatch(addKnowledge({
                typeId: this.state.addTypeId,
                fromId: this.state.addFormId,
                question: JSON.stringify(addQuestionList),
                questionKeywords: document.getElementById("addQuestionKeywords").value,
                answer: this.state.addAnswer
            }
        )).then(() => {
            if (!!this.props.adminRepository) {
                if (this.props.adminRepository.addKnowledge.status === 200) {
                    message.success("添加问题成功！");
                }
                else message.error("添加问题失败，请稍后再试！");
            }
            else message.error("添加问题失败，请稍后再试！");
        });
        this.setState({
            addQuestionModal: false,
        });
    };
    /**
     * 添加问题弹出框的关闭
     * @param e
     */
    addQuestionCancel = (e) => {
        this.setState({
            addQuestionModal: false,
        });
    };
    /**
     * 推送知识库：触发推送
     * @param e
     */
    pushRepositoryOk = (e) => {
        this.props.dispatch(putKnowledge()).then(() => {
            console.log(this.props.adminRepository.putKnowledge)
            // if (!!this.props.adminRepository) {
            //     if (this.props.adminRepository.putKnowledge.status === 200) {
            //         message.success("添加问题成功！");
            //     }
            //     else message.error("添加问题失败，请稍后再试！");
            // }
            // else message.error("添加问题失败，请稍后再试！");
        });

        this.setState({
            pushRepositoryVisible: false,
        });
    };
    /**
     * 推送知识库：取消
     * @param e
     */
    pushRepositoryCancel = (e) => {
        this.setState({
            pushRepositoryVisible: false,
        });
    };


    /**
     * 改变修改知识的TypeId
     * @param value
     */
    changeDateTypeId = (value) => {
        const temp = this.state.changeDateRow;
        temp.typeId = value;
        this.setState({
            changeDateRow: temp,
            typeId: value
        })
    };
    /**
     * 添加问题弹出框的TypeId
     * @param value
     */
    changeAddDateTypeId = (value) => {
        this.setState({
            addTypeId: value
        })
    };
    changeAddDateFormId = (value) => {
        this.setState({
            addFormId: value
        })
    }
    /**
     * 修改问题弹出框的FormId
     * @param e
     */
    changeDateFormId = (e = 1 || window.event) => {
        let {changeDateRow} = this.state;
        changeDateRow.fromId = e;
        this.setState({
            changeDateRow
        })
    };
    /**
     * 修改问题弹出框的keyWords
     * @param e
     */
    changeDateKeywords = (e = 1 || window.event) => {
        let {changeDateRow} = this.state;
        changeDateRow.questionKeywords = e.target.value;
        this.setState({
            changeDateRow
        })
    };
    /**
     * 修改问题弹出框的修改问题
     * @param e
     */
    changeDateQuestion = (e = 1 || window.event) => {
        let changeDateRowtest = this.state.changeDateRow;
        changeDateRowtest.question[e.target.getAttribute('mark')] =
            <Input value={e.target.value} mark={e.target.getAttribute('mark')}
                   key={e.target.getAttribute('mark')} onChange={this.changeDateQuestion}
            />;
        this.setState({
            changeDateRow: changeDateRowtest
        })
    };
    /**
     * 点击搜索时调用，获取搜索的数据
     */
    onSearch = () => {
        Repository.KEYWORDS = document.getElementById("search").value;
        if (Repository.KEYWORDS !== "") {
            this.props.dispatch(searchKnowledge({
                keyWords: Repository.KEYWORDS,
                page: 1,
                rows: Repository.PAGE_SIZE,
            })).then(() => {
                if (!!this.props.adminRepository.searchKnowledge) {
                    // 把后端传过来的字符数据转为数组数据
                    var res = this.props.adminRepository.searchKnowledge.data;
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].question = JSON.parse(res.data[i].question)
                    }
                    this.setState({
                        repositoryList: res,
                        nowPage: 1
                    })
                }
            });
        }
    };
    /**
     * 搜索返回结果的分页
     * @param page
     */
    getSearchList = (page) => {
        this.props.dispatch(searchKnowledge(
            {
                keyWords: Repository.KEYWORDS,
                page: page,
                rows: Repository.PAGE_SIZE,
            })).then(() => {
            if (!!this.props.adminRepository.searchKnowledge) {
                // 把后端传过来的字符数据转为数组数据
                var res = this.props.adminRepository.searchKnowledge.data;
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].question = JSON.parse(res.data[i].question)
                }
                this.setState({
                    repositoryList: res,
                    nowPage: page,
                })
            }
        });
    };

    /**
     * 添加问题问法
     * @param qs 问题输入框
     * @param num 问题输入框id号
     */
    addQuestionDp(qs, num) {
        let questionName = "question" + num.toString();
        let question = <Input name={questionName} key={this.state.changeDateRow.question.length}
                              mark={this.state.changeDateRow.question.length} onChange={this.changeDateQuestion}/>
        qs.push(question);
        num++;
        let {changeDateRow} = this.state;
        changeDateRow.question = qs;
        this.setState({
            changeDateRow,
            idNum: num,
        })
    };

    /**
     * 删除问题问法
     * @param qs
     * @param num
     */
    deleteQuestionDp(qs, num) {
        qs.pop();
        num--;
        let {changeDateRow} = this.state;
        changeDateRow.question = qs;
        this.setState({
            changeDateRow,
            idNum: num,
        })
    };

    /**
     * 添加知识库弹出框的添加问法按钮
     * @param num
     */
    addAskMethod = (num) => {
        let askId = "addQuestion" + num.toString();
        let askMethod = <Input id={askId} key={num} onChange={this.changeAskMethod}/>
        let {askMethodList} = this.state;
        askMethodList.push(askMethod);
        num++;
        this.setState({
            askMethodList,
            askMethodId: num,
        })
    };
    /**
     * 添加知识库弹出框的删除问法按钮
     * @param num
     */
    deleteAskMothod = (num) => {
        let {askMethodList} = this.state;
        askMethodList.pop();
        num--;
        this.setState({
            askMethodList,
            askMethodId: num,
        })
    };

    /**
     * 判断Table的data应该用哪个
     * @param page
     */
    checkDate = (page) => {
        if (document.getElementById("search").value === "") {
            this.getRepositoryList(page);
        }
        else {
            this.getSearchList(page);
        }
    }

    /**
     * 获取Excil文件单元格内容
     * @param file
     */
    onImportExcel = (file) => {
        const {files} = file.target;
        const fileReader = new FileReader();
        fileReader.onload = event => {
            const {result} = event.target;
            const workbook = XLSX.read(result, {type: 'binary'});
            let data = [];
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    //封装数据
                    let format = [];
                    for (let i in data) {
                        let row = data[i];
                        let rowGet = {};
                        rowGet['id'] = row['知识ID'];
                        rowGet['typeId'] = row['问题类型ID'];
                        rowGet['fromId'] = row['小分类ID'];
                        rowGet['question'] = [];
                        rowGet['question'].push(row['问题描述']);
                        for (let q in row) {
                            if (q.indexOf("问题扩展") !== -1) {
                                rowGet['question'].push(row[q]);
                            }
                        }
                        rowGet['question'].push(row['验证问题']);
                        rowGet['question'] = JSON.stringify(rowGet['question']);
                        //构建答案
                        rowGet['answer'] = row['答案'];
                        rowGet['questionKeywords'] = "";
                        rowGet['time'] = new Date().getTime();
                        format.push(rowGet);

                    }
                    data = format;
                    this.setState({
                        data: data,
                    })
                }
            }
        };
        fileReader.readAsBinaryString(files[0]);
    }

    // 是否覆盖按钮点击时调用
    switchCover(e) {
        this.setState({
            ifCover: e,
        })
    }


    uploadFile = () => {
        this.props.dispatch(uploadRepository({
            "total": this.state.data.length,
            "mode": this.state.ifCover ? 0 : 1,
            "repositoryList": this.state.data,
        })).then(() => {
            console.log(this.state.data)
            console.log(this.props.adminRepository)
        });
    }
    // //传输数据到后台接口
    // upDataLibrary = () =>{

    // }

    render() {
        //赋予富文本编辑器一个id
        let editorIdChangeQuestion = 'editorIdChangeQuestion-' + new Date().getTime();
        let editorIdAddQuestion = 'editorIdAddQuestion-' + new Date().getTime();
        //一种响应式布局，antd自带的例子
        const formItemLayout = {
            labelCol: {
                xs: {span: 32},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        const columnsQuestion = [
            {
                title: '问题ID',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
            }
            , {
                title: '问题类型',
                dataIndex: 'typeId',
                key: 'typeId',
                width: '10%',
                render: (typeId) => {
                    return QuestionClassificationMap.typeId2TypeName(typeId)
                },
            },
            {
                title: '小分类',
                dataIndex: 'fromId',
                key: 'fromId',
                width: '10%',
                render: (formId) => {
                    return QuestionClassificationMap.fromId2FromName(formId)

                },
            }
            , {
                title: '问题描述',
                dataIndex: 'question',
                width: '60%',
                key: 'question',
                render: (text, record) => {
                    return (
                        <span>{text[0]}</span>
                    )
                },
            }
            , {
                title: '查看答案',
                dataIndex: 'operation',
                key: 'operation',
                width: '5%',
                render: (text, record) => {
                    return (
                        <Button type="primary" onClick={() => {
                            this.setState({
                                changeDateRow: record,
                            })
                            setTimeout(() => {
                                this.showChangeQuestion(record)
                            }, 100)
                        }}>查看
                        </Button>
                    )
                },
            }
            ,];

        const questionLibrary = [
            {
                title: '知识ID',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
            }
            , {
                title: '小分类ID',
                dataIndex: 'fromId',
                key: 'fromId',
                width: '10%',
            },
            {
                title: '问题类型ID',
                dataIndex: 'typeId',
                key: 'typeId',
                width: '20%',
                render: (formId) => {
                    return QuestionClassificationMap.fromId2FromName(formId)

                },
            }
            , {
                title: '问题描述',
                dataIndex: 'question',
                width: '30%',
                key: 'question',
            }
            , {
                title: '答案',
                dataIndex: 'answer',
                key: 'answer',
                width: '25%',
            }
            ,];

        return (
            <div>
                <div className="actionBar">
                    <Button size="large" type="primary" onClick={this.showAddQuestion}>添加问题</Button>
                    <span>     </span>
                    <Button size="large" type="danger" onClick={this.showPushRepository}>推送知识库</Button>
                    <Input size="large" id="search" placeholder={'搜索问题'} onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            event.preventDefault();
                            this.onSearch();
                        }
                    }}/>
                    <Button size="large" icon="search" onClick={this.onSearch}>查找</Button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <Button size="large" type="primary" onClick={this.showUpFileModal}>上传文件</Button>
                    <Modal
                        title="上传文件"
                        visible={this.state.upFile}
                        onOk={this.hideUpFileModal}
                        onCancel={this.hideUpFileModal}
                        okText={"确认"}
                        cancelText={"取消"}
                        width={1200}
                    >
                        <p>请选择您所要上传的文件</p>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <button className="file">选择文件
                            <input type='file' accept='.xlsx, .xls' onChange={this.onImportExcel}/>
                        </button>
                        <p>&nbsp;</p>
                        <p>文件内容展示</p>
                        <Table columns={questionLibrary} dataSource={this.state.data}/>
                        <span style={{marginRight: '10px'}}>是否覆盖</span><Switch checkedChildren="是" unCheckedChildren="否"
                                                                               defaultChecked
                                                                               onClick={this.switchCover}/>
                        <br/>
                        <br/>
                        <Button size="large" type="primary" onClick={this.uploadFile}>确认上传</Button>
                    </Modal>

                </div>
                <Table bordered
                       locale={{emptyText: "没有找到数据！"}}
                       pagination={{
                           total: this.state.repositoryList.total,
                           onChange: this.checkDate,
                           pageSize: Repository.PAGE_SIZE,
                           showTotal: () => '共' + this.state.repositoryList.total + '条数据',
                       }}
                       rowKey={(record, index) => `complete${record.id}${index}`} columns={columnsQuestion}
                       dataSource={this.state.repositoryList.data}
                />
                <RichEditorModal width={'40%'} title="查看答案"
                                 visible={this.state.changeQuestionModal}
                                 onOk={this.changeQuestionOk}
                                 onCancel={this.changeQuestionCancel}
                                 cancelText="取消"
                                 editorId={editorIdChangeQuestion}
                                 okText="修改"
                                 onChange={(html) => {
                                     let changeDateRowtest = this.state.changeDateRow;
                                     changeDateRowtest.content = html;
                                     this.setState({
                                         changeDateRow: changeDateRowtest
                                     })
                                 }}
                                 content={this.state.changeDateRow.answer}
                                 menus={
                                     [
                                         'bold',  // 粗体
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
                                     ]
                                 }
                >
                    <Form className="questionForm" id="form">
                        {this.state.changeQuestionModal ?
                            <FormItem {...formItemLayout} label="问题类型：">
                                <BigClassSelect onChange={this.changeDateTypeId}
                                                defaultValue={QuestionClassificationMap.typeId2TypeName(this.state.changeDateRow.typeId)}/>
                            </FormItem>
                            : ''}{this.state.changeQuestionModal ?
                        <FormItem {...formItemLayout} label="问题小分类：">
                            <SmallClassSelect onChange={this.changeDateFormId}
                                              defaultValue={QuestionClassificationMap.fromId2FromName(this.state.changeDateRow.fromId)}/>
                        </FormItem> : ''}
                        <FormItem {...formItemLayout} label="问题关键词：">
                            <Input name="questionKeywords" value={this.state.changeDateRow.questionKeywords}
                                   onChange={this.changeDateKeywords}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="问题描述：">
                            {this.state.changeDateRow.question}
                            <Button htmlType={"button"} onClick={() =>
                                this.addQuestionDp(this.state.changeDateRow.question, this.state.idNum)}>添加问法</Button>
                            <Button htmlType={"button"} onClick={() =>
                                this.deleteQuestionDp(this.state.changeDateRow.question, this.state.idNum)}>删除问法</Button>
                        </FormItem>
                        <FormItem>
                            <div id={editorIdChangeQuestion}/>
                        </FormItem>
                    </Form>
                    {/*<div className="RichEditor">*/}
                    {/**/}
                    {/*</div>*/}
                </RichEditorModal>

                <RichEditorModal width={'40%'}
                                 title="添加问题"
                                 visible={this.state.addQuestionModal}
                                 onOk={this.addQuestionOk}
                                 onCancel={this.addQuestionCancel}
                                 cancelText="取消"
                                 editorId={editorIdAddQuestion}
                                 onChange={(html) => {
                                     this.setState({
                                         addAnswer: html
                                     })
                                 }}
                                 okText="提交"
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
                    <Form className="questionForm" id="form2">
                        <FormItem {...formItemLayout} label="问题类型：">
                            <BigClassSelect defaultValue={"1"} onChange={this.changeAddDateTypeId}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="问题小分类：">
                            <SmallClassSelect onChange={this.changeAddDateFormId} defaultValue={1}/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="问题关键词：">
                            <Input id="addQuestionKeywords"/>
                        </FormItem>
                        <FormItem {...formItemLayout} label="问题描述：">
                            <Input id="addQuestion1"/>
                            {this.state.askMethodList}
                            <Button onClick={() => this.addAskMethod(this.state.askMethodId)}>添加问法</Button>
                            <Button onClick={() => this.deleteAskMothod(this.state.askMethodId)}>删除问法</Button>
                        </FormItem>
                        <FormItem>
                            <div id={editorIdAddQuestion}/>
                        </FormItem>
                    </Form>
                </RichEditorModal>

                <Modal width={'30%'}
                       title="推送知识库"
                       visible={this.state.pushRepositoryVisible}
                       onOk={this.pushRepositoryOk}
                       onCancel={this.pushRepositoryCancel}
                       cancelText="取消"
                       okText="确认推送"
                >
                    此操作将会使用网站知识库覆盖问答服务知识库，请确保网站知识库的正确性！<br/>
                    注意：此操作十分钟内只能执行一次，执行后问答服务集群会在十分钟内随机更新，剩余服务将在第二天凌晨更新。<br/>
                    此操作为危险操作，确定推送知识库？
                </Modal>
            </div>
        )
            ;
    }
}

const mapStateToProps = state => {
    return {adminRepository: state.adminRepository};
};

Repository = connect(mapStateToProps)(Repository)
export default Repository;
