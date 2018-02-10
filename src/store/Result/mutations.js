/**
 * Created by cuss on 2018/2/6.
 */
import T from './types';

export default {
    //设置当前的用户的排名
    [T.SET_SCORES](state, payload) {
        state.scores = payload;
    },
}
