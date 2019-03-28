import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Page from './Page'
import reducer from './redux/reducer'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const middleware = [thunk];
// 数据仓库
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
));
ReactDOM.render(
        <Provider store={store}>
            <Page />
        </Provider>
    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
