import {combineReducers} from 'redux';
import home from './home';
import head from './head';
import questionRecord from './questionRecord';
import userHome from './userHome';
import adminAnswer from './adminAnswer';
import adminFedback from './adminFedback';
import adminUser from './adminUser';
import classData from './common/classData';
import adminDataShow from './adminDataShow';
import adminRepository from './adminRepository';

export default combineReducers({
    home,
    head,
    questionRecord,
    userHome,
    adminAnswer,
    adminFedback,
    adminUser,
    classData,
    adminDataShow,
    adminRepository,
});