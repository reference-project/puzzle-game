/**
 * Created by cuss on 2018/2/6.
 */
import T from './types';
import API from '@/api/index'

export default {
    //获取用户信息
    [T.FETCH_USER_INFO]({ commit }, payload) {
        return new Promise((resolve, reject) => {
            API.fetchUserInfo(payload).then(r => {
                if (r.data) {
                    resolve(r.data);
                    commit(T.SET_USER, r.data);
                } else {
                    reject({ error: true, data: r.data });
                }
            }).catch(e => {
                reject({ error: true, data: e.data });
            })
        });
    },
    [T.SHARE_COUNT]() {
        return new Promise((resolve, reject) => {
            API.shareCount().then(r => {
                if (r.data.result) {
                    resolve(r.data)
                } else {
                    reject({ error: true, data: r.data })
                }
            }).catch(e => {
                reject({ error: true, data: r.data })
            })
        })
    }
}
