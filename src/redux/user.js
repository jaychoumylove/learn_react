import axios from 'axios';
import {getRedirectrPath} from "../util";

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const ERROR_MSG = 'ERROR_MSG';
const LOG_OUT = 'LOG_OUT';

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
};

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectrPath(action.payload), ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload, redirectTo: getRedirectrPath(action.payload)};
        case ERROR_MSG:
            return {...state, msg: action.msg};
        case LOG_OUT:
            return {...initState, redirectTo: '/login'};
        default:
            return state;
    }
}

function authSuccess(obj) {
    const {pwd, ...data} = obj;
    return {type: AUTH_SUCCESS, payload: data}
}

function errorMsg(msg) {
    return {msg, type: ERROR_MSG};
}

export function userRegister({user, pwd, repeatPwd, type}) {
    if (!user || !pwd) return errorMsg('用户名密码必须输入');

    if (pwd !== repeatPwd) return errorMsg('两次输入密码不一致');

    return dispatch => {
        axios.post('user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    localStorage.setItem('user_id', res.data.data._id);
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            });
    }
}

export function userLogin({user, pwd}) {
    if (!user || !pwd) return errorMsg('用户名密码必须输入');

    return dispatch => {
        axios.post('user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    localStorage.setItem('user_id', res.data.data._id);
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            });
    }
}

export function update(data) {
    // if (!data.avatar) return errorMsg('请选择自己的头像');
    data.user_id = localStorage.getItem('user_id');

    return dispatch => {
        axios.post('user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function loadData(userInfo) {
    return {type: LOAD_DATA, payload: userInfo}
}

export function logoutSubmit() {
    return {type: LOG_OUT}
}