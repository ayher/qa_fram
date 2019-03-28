import React from 'react';
import {Select} from 'antd';

const Option = Select.Option;

/**
 * 统一大分类的select，可以直接调用组件。
 */
class SmallClassSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 小分类数据
            smallClassScript: [],
        }
    }

    /**
     * 获取sessionStorage中的数据
     */
    componentDidMount() {
        let smallClassData = JSON.parse(sessionStorage.getItem('smallClass'));
        let smallClassScriptTest = this.state.smallClassScript;
        for (let i = 0; i < smallClassData.length; i++) {
            smallClassScriptTest.push(
                <Option key={smallClassData[i].id}>{smallClassData[i].name}</Option>
            )
        }
        this.setState({
            smallClassScript: smallClassScriptTest
        })
    }

    render() {
        return (
            <Select style={{width: '60%'}} onChange={this.props.onChange} defaultValue={this.props.defaultValue + ""}>
                {this.state.smallClassScript}
            </Select>
        )
    }
}

export default SmallClassSelect;
