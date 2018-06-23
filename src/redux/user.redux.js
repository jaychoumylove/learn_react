import axios from 'axios';
import {getRedirectrPath} from "../util";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    redirectTo: '',
    msg: '',
    isAuth: false,
    user: '',
    type: ''
};

export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectrPath(action.payload), isAuth: true, ...action.payload};
        case LOGIN_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectrPath(action.payload), isAuth: true, ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        default:
            return state;
    }
}

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

function loginSuccess(data) {
    return {type: LOGIN_SUCCESS, payload: data}
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG};
}

export function userRegister({user, pwd, repeatPwd, type}) {
    if (!user || !pwd) return errorMsg('用户名密码必须输入');

    if (pwd !== repeatPwd) return errorMsg('两次输入密码不一致');

    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            });
    }
}

export function userLogin({user, pwd}) {
    if (!user || !pwd) return errorMsg('用户名密码必须输入');

    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(loginSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            });
    }
}

export function loadData(userInfo) {
    return {type:LOAD_DATA,payload:userInfo}
}