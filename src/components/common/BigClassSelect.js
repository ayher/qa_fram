import React from 'react';
import {Select} from 'antd';

const Option = Select.Option;

/**
 * 统一大分类的select，可以直接调用组件，可以重写onchange方法，可以参照home.js
 */
class BigClassSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 大分类数据
            bigClassScript: [],
        }
    }

    /**
     * 获取sessionStorage中的数据
     */
    componentDidMount() {
        let bigClassData = JSON.parse(sessionStorage.getItem('bigClass'));
        let bigClassScriptTest = this.state.bigClassScript;
        for (let i = 0; i < bigClassData.length; i++) {
            bigClassScriptTest.push(
                <Option key={bigClassData[i].id}>{bigClassData[i].name}</Option>
            )
        }
        this.setState({
            bigClassScript: bigClassScriptTest
        })
    }

    render() {
        return (
            <Select style={{width: '60%'}} onChange={this.props.onChange}
                    defaultValue={this.props.defaultValue + ""}>
                {this.state.bigClassScript}
            </Select>
        )
    }
}

export default BigClassSelect;
