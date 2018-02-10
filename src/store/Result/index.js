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
        scores: [] //当前的排名
    },
    mutations,
    getters,
    actions
}
