/**
 * Created by cuss on 2018/2/6.
 */
import T from './types';
export default {
    [T.GET_USER](state){
        return state.user;
    },
    [T.GET_AUTH](state) {
        return state.auth;
    },
    [T.GET_WX_CONFIG_STATE](state) {
        return state.wxConfigState;
    }
}
