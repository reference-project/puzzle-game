/**
 * Created by cuss on 2018/2/6.
 */
const DEV = process.env.NODE_ENV !== 'production';

export default {
    //apiPath:'http://rap2api.taobao.org/app/mock/5561',
    apiPath: 'https://active.myfuwu.com.cn',
    DEV,
    images: [
        'http://zuoh.img-cn-hongkong.aliyuncs.com/active/huiyuan.png',
        'http://zuoh.img-cn-hongkong.aliyuncs.com/active/zulin.png',
        'http://zuoh.img-cn-hongkong.aliyuncs.com/active/zulin-zhaoshang.png',
        'http://zuoh.img-cn-hongkong.aliyuncs.com/active/wuye.png'
    ],
    axoisConfig: {
        baseURL: '',
        timeout: 4000,
    },
    share: {
        title: '狗年大吉！明源云空间给您拜年啦！',
        link: 'https://active.myfuwu.com.cn/static/index',
        imgUrl: 'http://rental.myfuwu.com.cn/static/assets/images/logo.png',
        desc: '明源云空间给您拜年了！恭喜发财！拼图拜年，赢大奖！快来玩吧！'
    }
}
