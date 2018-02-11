<template>
    <div class="result-view">
        <ul class="rank-content">
            <li v-for="(item, index) in scores"
                :key="index">
                <span class="rank" :class="{redColor: index === 0 || index === 1 || index === 2}">
                    {{item.ranking}}
                </span>
                <span class="detail">
                    <span class="avatar"><img :src="item.headimg_url"></span>
                    <span class="name">{{item.nick_name}}</span>
                    <span class="score">{{item.time}}</span>
                </span>
            </li>
        </ul>
        <div class="qrcode">
            <img src="../assets/images/img_qrcode-yunkongjian.jpeg"
                alt="">
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import API from '../api/App/index.js';
import { XButton } from 'vux';
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { Types as T } from '@/store/index'
import { timeLineShare, shareAppMessage } from '@/utils/wxUtils'
import AppConfig from '@/config'

export default {
    name: 'Result',
    computed: {
        ...mapGetters({
            'scores': T.GET_SCORES,
            'user': T.GET_USER
        })
    },
    // data() {
    //     return {
    //         mock: [
    //             { ranking: 1, headimg_url: '123', nick_name: '123', time: '123' },
    //             { ranking: 10, headimg_url: '123', nick_name: '123', time: '123' },
    //         ]
    //     }
    // },
    mounted() {
        const { title, link, imgUrl } = AppConfig.share
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
            desc: `哈哈哈...我太棒了！拼图拜年我只用了${that.user.time}！你要不要也来玩一下！有大奖哦！`,
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
        this.getRankingList()
    },
    components: {
        XButton,
    },
    methods: {
        ...mapActions({
            'getRankingList': T.GET_RANKING_LIST,
            'shareCount': T.SHARE_COUNT
        })
    }
}
</script>

<style lang="scss" scoped>
.result-view {
  width: 100%;
  height: 100%;
  background: url("../assets/images/img_bg-ranking.png") no-repeat center;
  background-size: 100% 100%;
  padding: 160px 100px 90px;
  .rank-content {
    padding: 20px;
    height: 100%;
    overflow: scroll;
    li {
      display: flex;
      align-items: center;
      font-size: 28px;
      span {
        display: inline-block;
      }
      .rank {
        width: 38px;
        font-size: 40px;
        color: rgb(222, 199, 150);
      }
      .rank.redColor {
        color: rgb(201, 49, 54);
      }
      .detail {
        width: 100%;
        height: 100px;
        line-height: 100px;
        border-bottom: 2px solid rgba(222, 199, 150, 0.4);
        .avatar {
          width: 80px;
          height: 80px;
          margin: 0 25px;
          vertical-align: middle;
          img {
            border-radius: 8px;
            width: 100%;
          }
        }
        .score {
          color: rgb(155, 155, 155);
          float: right;
        }
      }
    }
  }
  .qrcode {
    z-index: 999;
    position: absolute;
    width: 116px;
    height: 116px;
    bottom: 20px;
    right: 20px;
    img {
      width: 100%;
    }
  }
}
</style>
