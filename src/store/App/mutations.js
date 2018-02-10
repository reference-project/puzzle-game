/**
 * Created by cuss on 2018/2/6.
 */
import T from './types';

export default {
    //设置用户的信息
    [T.SET_USER](state, payload) {
        Object.assign(state.user, payload);
        state.auth = true;
    },
    [T.SET_AUTH](state, payload) {
        state.auth = payload.data;
    },
    [T.SET_EX_CONFIG_STATE](state, payload) {
        state.wxConfigState = payload;
    }
}
