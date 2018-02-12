<template>
    <div id="app-container">
        <!-- 背景音乐 -->
        <audio id="bgm"
            src="http://m128.xiami.net/169/7169/2102685434/1795493856_1485311964817.mp3?auth_key=1518836400-0-0-29a0fe20e13bba05995b1f02751f3c85"
            type="audio/mpeg"
            autoplay="autoplay"
            loop="loop"></audio>
        <div class="view"
            v-if='loading && auth && wxConfigState'>
            <transition name="fade"
                mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <Loading id="loading"
            v-if='!loading || !auth || !wxConfigState'></Loading>
    </div>

</template>

<script>
import API from './api/App/index.js';
import APPConfig from '@/config.js'
import Loading from '@/components/Loading'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Types as T } from './store/index'
import { LoadingPlugin, AlertPlugin, ToastPlugin } from 'vux';
import Vue from 'vue';
Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
export default {
    name: 'App',
    created() {
        this.loadingImages();
        //开发的时候 不需要验证
        if (!APPConfig.DEV) {
            if (API.fetchUserToken()) {
                this.fetchUser()
            }
        } else {
            this.fetchUser()
        }
    },
    data() {
        return {
            loading: false
        }
    },
    components: {
        Loading,
    },
    computed: {
        ...mapGetters({
            'auth': T.GET_AUTH,
            'wxConfigState': T.GET_WX_CONFIG_STATE,
        })
    },
    mounted() {
        if (!APPConfig.DEV) {
            this.checkWxConfig()
        } else {
            this.setWxConfig(true)
        }
        this.autoPlay()
    },
    methods: {
        ...mapMutations({
            'setAuth': T.SET_AUTH,
            'setWxConfig': T.SET_EX_CONFIG_STATE,
        }),
        ...mapActions({
            'fetchUserInfo': T.FETCH_USER_INFO
        }),
        loadingImages() {
            const that = this;
            const images = APPConfig.images;
            const promiseAll = images.map(image => this.loadingImage(image));
            Promise.all(promiseAll).then(function (values) {
                that.loading = true;
            });
        },
        loadingImage(image) {
            return new Promise((reolve, reject) => {
                const imageEl = new Image();
                imageEl.onload = function () {
                    reolve();
                }
                imageEl.onerror = function () {
                    reolve();
                }
                imageEl.src = image;
            })
        },
        checkWxConfig() {
            const that = this;
            API.fetchWXConfig().then(response => {
                //配置对应的微信 jsconfig
                if (response.data && window.wx) {
                    window.wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: response.data.appId, // 必填，公众号的唯一标识
                        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
                        signature: response.data.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    window.wx.ready(function () {
                        that.setWxConfig(true)
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                        window.wx.checkJsApi({
                            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: function (res) {
                                // 以键值对的形式返回，可用的api值true，不可用为false
                                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                console.log('设置微信接口配置成功' + res.checkResult);
                                if (res.checkResult !== '{}') {
                                    window.wx.config({
                                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                        appId: response.data.appId, // 必填，公众号的唯一标识
                                        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                                        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
                                        signature: response.data.signature,// 必填，签名，见附录1
                                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                                    });
                                }
                            }
                        });
                    });
                    window.wx.error(function (res) {
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        console.log('设置微信接口配置失败');
                    });
                } else {
                    this.$vux.toast.text('获取微信配置失败', 'bottom');
                }
            }, () => {
                this.$vux.toast.text('获取微信配置失败', 'bottom');
            });
        },
        fetchUser() {
            this.fetchUserInfo().then(() => {
            }, () => {
                this.$vux.toast.text('获取用户信息失败', 'bottom')
            });
        },
        autoPlay() {
            document.addEventListener('DOMContentLoaded', function () {
                function audioAutoPlay() {
                    const audio = document.getElementById('bgm');
                    audio.play();
                    document.addEventListener("WeixinJSBridgeReady", function () {
                        audio.play();
                    }, false);
                }
                audioAutoPlay();
            });
        }
    }
}
</script>

<style lang="scss">
@import "styles/reset.scss";
@import "../node_modules/flex.css/dist/flex.css";
#app-container,
.view {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
  transform: translateZ(0);
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateZ(0);
}
</style>
