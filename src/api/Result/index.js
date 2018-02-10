/**
 * Created by cuss on 2018/2/6.
 */
import axios from 'axios'
import APPConfig from '@/config'

const urls = {
    getRankingList: APPConfig.apiPath + '/active/ranking-list',
};

// 获取排行榜
export function getRankingList(params) {
    return axios.get(urls.getRankingList);
}

export default {
    getRankingList,
}
