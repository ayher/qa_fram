import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {message} from 'antd'

/**
 * 通过jwt判断登录是否过期。
 * @param jwt token
 * @return bool true表示没过期，false表示过期
 */
export const judgeJwt = (jwt) => {
    //对token就行分组取第二个，这个有时间信息
    const payload = jwt.split('.')[1];
    //atob恢复解码
    let {exp} = JSON.parse(atob(payload));
    //获取当前时间
    let now_time = Number.parseInt(Date.now() / 1000);
    //返回时间是否超过
    return now_time < exp;
};

class AuthHandler extends Component {
    componentDidMount() {
        //判断jwt是否失效
        const jwt = localStorage.getItem('Authorization');
        // @todo 当jwt的'Authorization'不存在时出错
        if (jwt) {
            if (!judgeJwt(jwt)) {
                message.info("哦哦! 登录过期了,请重新登录!");
                //清除localStorage
                localStorage.clear();
                this.props.history.push('/#');
            }
        }
    }

    render() {
        return null
    }
}

export default withRouter(AuthHandler)