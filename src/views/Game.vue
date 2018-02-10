<template>
    <div class="game-view">
        <div class="game-inner">
            <PuzzleGame ref="game"
                @onEnd="puzzleEnd"
                :image="image"></PuzzleGame>
        </div>
        <div class="game-result"
            v-show="end">
            <div class="result">
                <p>本次用时</p>
                <p class="time">{{time}}</p>
            </div>
            <div class="rank">
                <ul>
                    <li v-for="(item, index) in rankingList"
                        :key="index">
                        <p class="num"
                            v-if="item.ranking">{{item.ranking}}</p>
                        <p class="avatar"
                            v-if="item.headimg_url"><img :src="item.headimg_url"
                                alt=""></p>
                        <p class="nickname"
                            v-if="item.nick_name">{{item.nick_name}}</p>
                        <p class="score"
                            v-if="item.time">{{item.time}}</p>
                    </li>
                </ul>
                <p class="see-all"
                    @click="toScore">查看全部排行</p>
            </div>
            <div class="restart">
                <!-- <span @click="randomSetImage">重新设置图片开始</span> -->
                <span @click="randomSetImage">
                    <img src="../assets/images/btn_onemore.png">
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Cookie from 'js-cookie'
import { XButton } from 'vux';
import PuzzleGame from '@/components/Game'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AppConfig from '@/config.js'
import { Types as T } from '@/store/index'
import { timeLineShare, shareAppMessage } from '@/utils/wxUtils';

export default {
    name: 'Game',
    components: {
        PuzzleGame,
    },
    computed: {
        ...mapGetters({
            'user': T.GET_USER,
        })
    },
    data() {
        return {
            image: null,
            end: false,
            time: '00:00:00',
            rankingList: []
        }
    },
    created() {
        //设置本地的image
        this.imageIndex = Math.floor(Math.random() * AppConfig.images.length);
        this.randomSetImage();
    },
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
    },
    methods: {
        ...mapMutations({
            'setUser': T.SET_USER,
        }),
        ...mapActions({
            'saveUserScore': T.SAVE_USER_SCORE,
            'shareCount': T.SHARE_COUNT
        }),
        randomSetImage() {
            this.end = false

            if (this.imageIndex >= AppConfig.images.length - 1) {
                this.imageIndex = 0;
            } else {
                this.imageIndex++;
            }
            this.image = AppConfig.images[this.imageIndex];
        },
        restart() {
            this.end = false
            if (this.$refs['game']) {
                console.log(this.$refs['game']);
                this.$refs['game'].randomPuzzleImage && this.$refs['game'].randomPuzzleImage();
            }
        },
        toScore() {
            this.$router.push({
                name: 'Result'
            })
        },
        format(data) {
            const t = data.interval + ''
            if (t.length === 4) {
                this.time = `00:0${t[0]}.${t[1]}${t[2]}`
            } else {
                let min = Math.floor((data.interval / 60000)) + ''
                let second = Math.floor((data.interval % 60000) / 1000) + ''
                let milsecond = Math.floor(data.interval % 60000 % 1000 / 10)
                if (min.length < 2) {
                    min = 0 + min
                }
                if (second.length < 2) {
                    second = 0 + second
                }
                this.time = `${min}:${second}.${milsecond}`
            }
        },
        puzzleEnd(data) {
            const that = this;
            this.format(data)
            console.log('puzzle end', data);
            //请求 设置拼图成功 ，跳转到查看结果
            that.saveUserScore({
                time: that.time,
                uid: Cookie.get('uid'),
                type: that.image
            }).then((data) => {
                that.end = true
                that.rankingList = data.ranking.ranking_list
                that.setUser({
                    time: that.time,
                    rankingList: that.rankingList
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.game-view {
  width: 100%;
  height: 100%;
}

.game-inner {
  width: 100%;
  height: 100%;
}

.game-result {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1024;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  padding: 95px 75px;
  text-align: center;
  color: #fff;
  .result {
    color: rgb(246, 233, 215);
    font-size: 32px;
    font-weight: 100;
    .time {
      margin-top: 34px;
      margin-bottom: 157px;
      font-size: 64px;
      font-weight: 400;
    }
  }
  .rank {
    width: 600px;
    height: 408px;
    border: 2px solid rgb(222, 199, 150);
    ul > li {
      display: inline-block;
      width: 32%;
      height: 100%;
      .num {
        font-size: 38px;
        color: rgba(222, 199, 150, 0.5);
        margin-top: 24px;
      }
      .avatar {
        margin: 26px auto 20px;
        width: 80px;
        height: 80px;
        img {
          width: 100%;
        }
      }
      .nickname {
        font-size: 28px;
        color: rbg(246, 233, 215);
        font-weight: 100;
        margin-bottom: 14px;
      }
      .score {
        font-size: 34px;
        color: rbg(246, 233, 215);
        font-weight: 100;
        margin-bottom: 30px;
      }
    }
    ul > li:nth-of-type(2) {
      border-right: 2px solid rgb(222, 199, 150);
      border-left: 2px solid rgb(222, 199, 150);
      .num {
        color: rgb(222, 199, 150);
      }
    }
    .see-all {
      height: 72px;
      line-height: 72px;
      font-size: 28px;
      color: rgb(222, 199, 150);
      border-top: 2px solid rgb(222, 199, 150);
    }
  }
  .restart {
    position: absolute;
    width: 100%;
    bottom: 95px;
    left: 0;
    text-align: center;
    img {
      width: 552px;
    }
  }
}
</style>
