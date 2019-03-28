import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminUser from '../components/admin/User'
import AdminFedBack from '../components/admin/FedBack'
import UserHome from '../components/UserHome'
import QuestionRecord from '../components/QuestionRecord'
import Home from  '../components/Home'
import DataShow from  '../components/admin/DataShow'
import NavMenu from '../components/admin/NavMenu'
import Repository from '../components/admin/Repository'
import {Layout} from 'antd';
const {Content} = Layout;
export default class CRouter extends Component {
    render() {
        return (
            <Switch>
                <Route component={Home} path="/app/home/index" />
                <Route component={UserHome} path="/app/userHome/index" />
                <Route component={QuestionRecord} path="/app/home/questionRecord" />
                <Route path="/app/admin/" render={
                    ()=><Layout>
                        <NavMenu />
                        <Content style={{width:'200px',float:'right'}}>
                            <Switch>
                                <Route component={DataShow} path="/app/admin/dataShow" />
                                <Route component={AdminUser} path="/app/admin/user" />
                                <Route component={AdminFedBack} path="/app/admin/fedBack" />
                                <Route component={Repository} path="/app/admin/repository" />
                            </Switch>
                        </Content>
                    </Layout>
                }
                />
            </Switch>
        )
    }
}