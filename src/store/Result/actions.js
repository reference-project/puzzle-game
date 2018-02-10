/**
 * Created by cuss on 2018/2/6.
 */
import T from './types';
import API from '@/api/index'

export default {
    //获取排行榜
    [T.GET_RANKING_LIST]({ commit }, payload) {
        return new Promise((resolve, reject) => {
            API.getRankingList(payload).then(r => {
                if (r.data) {
                    resolve(r.data.data);
                    commit(T.SET_SCORES, r.data.data);
                } else {
                    reject({ error: true, data: r.data.data });
                }
            }).catch(e => {
                reject({ error: true, data: e.data });
            })
        });
    }
}
