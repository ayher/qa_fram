import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthHandler from './common/AuthHandler'
import App from './App';
// 配置路由
export default () => (
    <Router>
        <div>
            {/*判断登录过期*/}
            <AuthHandler/>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/home/index" push />} />
                <Route path="/app" component={App} />
                {/*start with /app*/}
            </Switch>
        </div>
    </Router>
)