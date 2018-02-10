/**
 * Created by cuss on 2018/2/6.
 */
import axios from 'axios'
import APPConfig from '@/config'

const urls = {
    saveUserScore: APPConfig.apiPath + '/active/save',
};

//保存用户的时间
export function saveUserScore(params) {
    return axios.post(urls.saveUserScore, params, APPConfig.axoisConfig);
}

export default {
    saveUserScore
}
