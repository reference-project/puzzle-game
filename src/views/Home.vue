<template>
    <div class="home-view">
        <div class="start">
            <router-link to="/game">
                <img src="../assets/images/btn_start.png">
            </router-link>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { XButton } from 'vux';
import { timeLineShare, shareAppMessage } from '@/utils/wxUtils';
import { mapActions } from 'vuex'
import { Types as T } from '@/store/index'
import AppConfig from '@/config'

export default {
    name: 'Home',
    mounted() {
        const { title, link, imgUrl, desc } = AppConfig.share
        const that = this
        // 分享到朋友圈
        timeLineShare({
            title,
            link,
            imgUrl,
            success() {
                that.shareCount()
            },
            cancel() {

            }
        });
        // 分享给朋友
        shareAppMessage({
            title,
            desc,
            link,
            imgUrl,
            success() {
                console.log('success');
                that.shareCount()
            },
            cancel() {
                console.log('cancel');
            }
        })
    },
    components: {
        XButton,
    },
    methods: {
        ...mapActions({
            'shareCount': T.SHARE_COUNT
        })
    }
}
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: 100%;
  background: url("../assets/images/img_bg-cover.png") no-repeat center;
  background-size: 100% 100%;
  .start {
    position: absolute;
    width: 100%;
    bottom: 75px;
    text-align: center;
    img {
      width: 552px;
    }
  }
}
</style>
