/**
 * Created by cuss on 2018/2/6.
 */
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import T from './types';
export const Types = {
    ...T
}
export default {
    state: {
        user: {
            time: 0, //操作的时间
            rankingList: []
        }, //用户信息
        auth: false, //是否验证通过
        wxConfigState: false, //sdk配置是否通过
    },
    mutations,
    getters,
    actions
}
