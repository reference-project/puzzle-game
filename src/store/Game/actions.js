/**
 * Created by cuss on 2018/2/6.
 */
import T from './types';
import API from '@/api/index'

export default {
    //保存用户的分数
    [T.SAVE_USER_SCORE]({ commit }, payload) {
        return new Promise((resolve, reject) => {
            API.saveUserScore(payload).then(r => {
                if (r.data) {
                    resolve(r.data);
                } else {
                    reject({ error: true, data: r.data });
                }
            }).catch(e => {
                reject({ error: true, data: e.data });
            })
        });
    }
}
