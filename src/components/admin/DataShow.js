import React, {Component} from 'react';
import {Tabs, message} from 'antd';
import {connect} from 'react-redux';
import './dataShow.less'
import {getSmallClassData, getBigClassData, getAnswerData} from '../../redux/action/adminDataShow';

var echarts = require('echarts');
const TabPane = Tabs.TabPane;

class DataShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 小分类柱状图的数据
            smallClassData: [],
            // 大分类饼状图数据
            bigClassData: [],
            // 提问数据
            answerData: [],
        };
        this.changeTabs = this.changeTabs.bind(this)
    }

    /**
     * 当点击到查看大分类时，请求大分类数据
     */
    changeTabs() {
        this.props.dispatch(getAnswerData()).then(() => {
            if (!!this.props.adminDataShow.getAnswerData) {
                if (this.props.adminDataShow.getAnswerData.status === 200) {
                    this.setState({answerData: this.props.adminDataShow.getAnswerData.data})
                }
                else message.error(this.props.adminDataShow.getAnswerData.msg)
            }
            else message.error("出现异常!")
        });
    }

    /**
     * 请求数据
     */
    componentDidMount() {
        this.props.dispatch(getSmallClassData()).then(() => {
            if (!!this.props.adminDataShow.getSmallClassData) {
                if (this.props.adminDataShow.getSmallClassData.status === 200) {
                    this.setState({smallClassData: this.props.adminDataShow.getSmallClassData.data})
                }
                else message.error(this.props.adminDataShow.getSmallClassData.msg)
            }
            else message.error("出现异常!")
        });
        this.props.dispatch(getBigClassData()).then(() => {
            if (!!this.props.adminDataShow.getBigClassData) {
                if (this.props.adminDataShow.getBigClassData.status === 200) {
                    this.setState({bigClassData: this.props.adminDataShow.getBigClassData.data})
                }
                else message.error(this.props.adminDataShow.getBigClassData.msg)
            }
            else message.error("出现异常!")
        });
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.changeTabs}>
                <TabPane tab="知识概览" key="1">
                    <CharBar smallClassData={this.state.smallClassData}/>
                    <BigClassChar bigClassData={this.state.bigClassData}/>
                </TabPane>
                <TabPane tab="提问概览" key="2">
                    <CharPie answerData={this.state.answerData}/>
                </TabPane>
            </Tabs>
        )
    }
}

/**
 * 小分类组件
 */
class CharBar extends Component {
    componentDidUpdate() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('mainBar'));
        // 绘制图表
        let dataAxis = []
        let data = []
        let data1 = this.props.smallClassData;
        for (let i = 0; i < data1.length; i++) {
            dataAxis.push(data1[i].name)
            data.push(data1[i].value)
        }
        myChart.setOption({
            title: {
                text: '小分类总览',
                x: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: '#000'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'rgba(0,0,0,0.05)'}
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#188df0'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    },
                    data: data
                }
            ]
        });
        var zoomSize = 6;
        myChart.on('click', function (params) {
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });

    }

    render() {
        return (<div id="mainBar">柱状图</div>)
    }

}

/**
 * 大分类组件
 */
class BigClassChar extends Component {

    componentDidUpdate() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('mainPie'));
// 绘制图表
        const data = this.props.bigClassData;
        let title = [];
        for (let i = 0; i < data.length; i++) {
            title.push(data[i].name);
        }
        myChart.setOption({
            title: {
                text: '大分类概览',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: title
            },
            series: [
                {
                    name: '类型',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });

    }

    render() {
        return (<div id="mainPie">饼状图</div>)
    }
}

/**
 * 提问概览组件
 */
class CharPie extends Component {

    componentDidUpdate() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('answerChar'));
// 绘制图表
        let data = this.props.answerData;
        let tdata = [];
        let innerpie = [];
        let outpie = [];
        // 圆心
        let yuanxin = ['60%', '50%'];
        for (let i = 0; i < data.length; i++) {
            let p = {name: data[i].type, value: data[i].value};
            let j;
            for (j = 0; j < innerpie.length; j++) {
                if (innerpie[j].name === p.name) {
                    innerpie[j].value += p.value;
                    break;
                }
            }
            if (j === innerpie.length) {
                innerpie.push(p);
                tdata.push(p.name)
            }
        }
        for (let j = 0; j < innerpie.length; j++) {
            for (let k = 0; k < data.length; k++) {
                if (data[k].type === innerpie[j].name) {
                    outpie.push({name: data[k].name, value: data[k].value});
                    tdata.push(data[k].name)
                }
            }
        }
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: tdata
            },
            series: [
                {
                    name: '类型',
                    type: 'pie',
                    center: yuanxin,
                    selectedMode: 'single',
                    radius: [0, '50%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: innerpie
                },
                {
                    name: '类型',
                    type: 'pie',
                    radius: ['60%', '75%'],
                    center: yuanxin,
                    data: outpie
                }
            ]
        });

    }

    render() {
        return (<div id="answerChar">饼状图</div>)
    }
}

const mapStateToProps = state => {
    return {adminDataShow: state.adminDataShow};
};
DataShow = connect(mapStateToProps)(DataShow);
export default DataShow;