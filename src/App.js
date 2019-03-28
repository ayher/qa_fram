import React, {Component} from 'react';
import './App.less';
import Head from './components/Head'
import Routes from './routes';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import {getBigClass, getSmallClass} from './redux/action/common/classData'
import {message} from 'antd';

class App extends Component {
    // 获取分类的数据，存到sessionStorage中
    componentDidMount() {
        // 调用获取大分类接口，以免后面重复获取
        this.props.dispatch(getBigClass()).then(() => {
            if (!!this.props.classData.getBigClass) {
                if (this.props.classData.getBigClass.status === 200) {
                    sessionStorage.setItem('bigClass', JSON.stringify(this.props.classData.getBigClass.data));
                }
                else message.error(this.props.classData.getBigClass.msg)
            }
            else message.error("出现异常!")
        });
        // 调用获取小分类接口，以免后面重复获取
        this.props.dispatch(getSmallClass()).then(() => {
            if (!!this.props.classData.getSmallClass) {
                if (this.props.classData.getSmallClass.status === 200) {
                    sessionStorage.setItem('smallClass', JSON.stringify(this.props.classData.getSmallClass.data));
                }
                else message.error(this.props.classData.getSmallClass.msg)
            }
            else message.error("出现异常!")
        });
    }
    render() {
        return (
            <div>
                <Head/>
                <Routes/>
                <p className="footer">
                    ©2018-2019 西南科技大学计算机科学与技术学院 知识工程实验室
                </p>
            </div>
        );
    }
}
// 添加到store
const mapStateToProps = state => {
    return {classData: state.classData};
};
App = connect(mapStateToProps)(App);
export default App;
