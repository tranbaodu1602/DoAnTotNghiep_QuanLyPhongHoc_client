import { call, put, takeLatest } from 'redux-saga/effects';
import httpHandler from '../../../util/HttpHandler';
import { commonAction } from '../../reducer/common/CommonReducer';
import { loginAction } from '../../reducer/login/LoginReducer';
import * as loginService from '../../../services/login/LoginService';
import * as TypesAction from '../../reducer/login/Types';
import * as TypesFetch from '../../../services/login/Types';

/**
 * Get data login
 * @param {object} action
 * @return {void}
 */
interface Payload {
    username: string;
    password: string;
}
// eslint-disable-next-line require-jsdoc
function* getDataLogin(action: TypesAction.ActionReqGetDataLogin) {
    try {
        const { username, password } = action.payload as Payload;
        const response: TypesFetch.ResFetchGetDataLogin = yield call(
            loginService.fetchGetDataLogin,
            username,
            password,
        );
        const statusCode = response.code;
        switch (statusCode) {
            case httpHandler.SUCCESS: {
                const { dataLogin } = response.data;
                yield put(loginAction.resGetDataLogin({ dataLogin }));
                break;
            }
            case httpHandler.FAIL:
                yield put(commonAction.displayError({ errorMsg: response.message }));
                break;
            case httpHandler.UNAUTHORIZED:
                yield put(commonAction.displayError({ errorMsg: response.message }));
                break;
            case httpHandler.SERVER_ERROR:
                yield put(commonAction.displayError({ errorMsg: response.message }));
                break;
            default:
                yield put(commonAction.displayError({ errorMsg: response.message }));
                break;
        }
    } catch (error) {
        yield put(commonAction.displayError({ errorMsg: (error as Error).message }));
    }
}
/**
 * Watch get data login
 * @return {void}
 */
export function* watchGetDataLogin() {
    yield takeLatest(loginAction.reqGetDataLogin.type, getDataLogin);
}

/**
 *
 * @param {event} action
 */
function getLogin(action: any) {
    console.log(action);
    // {userName: "dsds", password: "dsdsd"}
}

/**
 *
 */
export function* watchGetLogin() {
    yield takeLatest(loginAction.reqLogin.type, getLogin);
}
