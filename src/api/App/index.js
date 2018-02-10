/**
 * Created by cuss on 2018/2/6.
 */
import axios from 'axios'
import APPConfig from '@/config'
import Cookie from 'js-cookie'
const urls = {
    fetchUserToken: APPConfig.apiPath + '/active/index',
    fetchUserInfo: APPConfig.apiPath + '/active/person-info',
    fetchWXConfig: APPConfig.apiPath + '/active/get-sign',
    shareCount: APPConfig.apiPath + '/active/success-share'
}
//没有的时候 进行跳转 获取对应的用户信息
export function fetchUserToken() {
    //微信认证跳转
    const userid = Cookie.get('uid')
    if (!userid) {
        location.href = urls.fetchUserToken
        return false
    } else {
        return true
    }
}
//获取用户信息
export function fetchUserInfo() {
    if (APPConfig.DEV) {
        return new Promise((resolve) => {
            //从cookie里面读取
            const nick_name = Cookie.get('nick_name') || ''
            const headimg_url = Cookie.get('headimg_url') || ''
            const time = Cookie.get('time') || 0;
            resolve({
                data: {
                    nick_name,
                    headimg_url,
                    time,
                },
            })
        })
    } else {
        return axios.get(urls.fetchUserInfo, {
            params: {
                uid: Cookie.get('uid')
            }
        })
    }
}
//获取sdk配置
export function fetchWXConfig() {
    return axios.get(urls.fetchWXConfig, {
        params: Object.assign({ url: location.href.split('#')[0] }),
    }, Object.assign({}, APPConfig.axoisConfig))
}
// 分享次数计数
export function shareCount() {
    return axios.get(urls.shareCount)
}
export default {
    fetchUserToken,
    fetchUserInfo,
    fetchWXConfig,
    shareCount
}
