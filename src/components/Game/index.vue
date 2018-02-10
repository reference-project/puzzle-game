<template>
    <div class="m-puzzle-wrapper">
        <div class="puzzle-wrapper"></div>
        <div class="puzzle-time"
            v-show="start">{{time}}</div>
        <div class="puzzle-mask"
            v-if="!start"></div>
    </div>
</template>

<script>

import Vue from 'vue'
export default {
    name: 'game',
    data() {
        return {
            time: '0.0',
            start: false,
            startTime: 0,
            endTime: 0
        }
    },
    props: {
        image: {
            type: String,
            default: null
        }
    },
    mounted() {
        const $puzzle = document.querySelector('.puzzle-wrapper');
        let length = 1;
        let inner = '';
        while (length <= 9) {
            inner += `<div class="puzzle-pic" data-index='${length}'></div>`;
            length++;
        }
        $puzzle.innerHTML = inner;
        this.enableTransationEnd = false;
        this.$nextTick(() => {
            this.bindEvent();
            this.runTimer();
        })
    },
    beforeDestory() {
        this.removeEvent();
    },
    watch: {
        image() {
            //图片改变之后 重新设置
            //首先设置背景
            this.start = false;
            this.enableTransationEnd = false;
            this.time = '0.00';
            this.setImage();
            this.runTimer();
        }
    },
    methods: {
        bindEvent() {
            const $puzzle = document.querySelector('.puzzle-wrapper');
            this.width = $puzzle.clientWidth;
            this.height = $puzzle.clientHeight;
            this.picWidth = this.width / 3;
            this.picHeight = this.height / 3;
            this.picEl = Array.prototype.slice.call(document.querySelectorAll('.puzzle-pic'), 0);
            this.setImage();
            this.bindPuzzleImage();
        },
        bindPuzzleImage() {
            const that = this;
            const $puzzle = document.querySelector('.puzzle-wrapper');
            var dx, dy, newLeft, newtop;
            const picboxWidth = $puzzle.offsetWidth;
            const picboxHeight = $puzzle.offsetHeight;
            for (let i = 0; i < this.picEl.length; i++) {
                this.picEl[i].addEventListener('touchstart', function (e) {
                    this.style.zIndex = 100; //设置拖拽元素的z-index值，使其在最上面。
                    dx = e.targetTouches[0].pageX - this.offsetLeft; //记录触发拖拽的水平状态发生改变时的位置
                    dy = e.targetTouches[0].pageY - this.offsetTop; //记录触发拖拽的垂直状态发生改变时的位置
                    this.startX = this.offsetLeft;//记录当前初始状态水平发生改变时的位置
                    this.startY = this.offsetTop;//offsetTop等取得的值与this.style.left获取的值区别在于前者不带px,后者带px
                    this.style.transition = 'none';
                    this.setAttribute('origin-left', this.style.left);
                    this.setAttribute('origin-top', this.style.top);
                });
                this.picEl[i].addEventListener('touchmove', function (e) {
                    newLeft = e.targetTouches[0].pageX - dx; //记录拖拽的水平状态发生改变时的位置
                    newtop = e.targetTouches[0].pageY - dy;
                    if (newLeft <= -this.picWidth / 2) { //限制边界代码块，拖拽区域不能超出边界的一半
                        newLeft = -this.picWidth / 2;
                    } else if (newLeft >= (picboxWidth - this.picWidth / 2)) {
                        newLeft = (picboxWidth - this.picWidth / 2);
                    }
                    if (newtop <= -this.picHeight / 2) {
                        newtop = -this.picHeight / 2;
                    } else if (newtop >= (picboxHeight - this.picHeight / 2)) {
                        newtop = (picboxHeight - this.picHeight / 2);
                    }
                    this.style.left = newLeft + 'px';
                    this.style.top = newtop + 'px'; //设置目标元素的left,top
                    e.preventDefault();
                });
                this.picEl[i].addEventListener('touchend', function (e) {
                    this.style.zIndex = 0;
                    this.style.transition = 'all 0.5s ease 0s'; //添加css3动画效果
                    this.endX = e.changedTouches[0].pageX - dx;
                    this.endY = e.changedTouches[0].pageY - dy; //记录滑动结束时的位置，与进入元素对比，判断与谁交换
                    let obj = that.changePuzzleImage(e.target, this.endX, this.endY); //调用交换函数
                    if (obj == e.target) { //如果交换函数返回的是自己
                        obj.style.left = this.startX + 'px';
                        obj.style.top = this.startY + 'px';
                    } else { //否则
                        let _left = obj.style.left;
                        obj.style.left =   this.getAttribute('origin-left');
                        this.style.left = _left;
                        let _top = obj.style.top;
                        obj.style.top = this.getAttribute('origin-top');
                        this.style.top = _top;
                        let _index = obj.getAttribute('data-index');
                        obj.setAttribute('data-index', this.getAttribute('data-index'));
                        this.setAttribute('data-index', _index); //交换函数部分，可提取
                    }
                });
                this.picEl[i].addEventListener('transitionend', function () {
                    if (that.isSuccess()) {
                        that.endTime = Date.now()
                        that.$emit('onEnd', {
                            time: that.time,
                            interval: that.endTime - that.startTime - 100
                        });
                        $puzzle.style['background'] = that.imageURL;
                        $puzzle.style['background-size'] = "100% 100%";
                    } else {
                    }
                })
            }
        },
        isSuccess() {
            let str = ''
            for (let i = 0; i < this.picEl.length; i++) {
                str += this.picEl[i].getAttribute('data-index');
            }
            if (this.enableTransationEnd && str === '123456789') {
                this.start = false;
                this.enableTransationEnd = false;
                return true;
            }
            return false;
        },
        setImage() {
            const $puzzle = document.querySelector('.puzzle-wrapper');
            this.imageURL = `url("${this.image}")`;
            $puzzle.style['background'] = `${this.imageURL}`;
            $puzzle.style['background-size'] = "100% 100%";
            this.picEl.forEach(item => {
                const _index = item.getAttribute("data-index");
                const topN = Math.floor((_index - 1) / 3);
                const leftN = (_index - 1) % 3;
                const left = leftN * this.picWidth;
                const top = topN * this.picHeight;
                item.style.left = left + 'px';
                item.style.top = top + 'px';
                item.style.width = this.picWidth + 'px';
                item.style.height = this.picHeight + 'px';
                item.style['background'] = `${this.imageURL}`;
                item.style['background-size'] = `${this.width}px ${this.height}px`;
                item.style['background-position'] = `-${left}px -${top}px`;
            })
        },
        randomPuzzleImage() {
            this.start = true;
            this.enableTransationEnd = true;
            this.time = '0.0';
            for (let i = 0; i < 20; i++) { //随机打乱
                let a = Math.floor(Math.random() * 9);
                let b = Math.floor(Math.random() * 9);
                if (a != b) {
                    this.setPuzzleImage(a, b, this.picEl);
                }
            }
            setTimeout(() => {
                this.startTime = Date.now();
                this.startTimmer()
            }, 1000);
        },
        changePuzzleImage(obj, x, y) {
            for (let i = 0; i < this.picEl.length; i++) { //还必须判断是不是当前原素本身。将自己排除在外
                if (Math.abs(this.picEl[i].offsetLeft - x) <= this.picWidth / 2 && Math.abs(this.picEl[i].offsetTop - y) <= this.picHeight / 2 && this.picEl[i] !== obj)
                    return this.picEl[i];
            }
            return obj; //返回当前
        },
        setPuzzleImage(a, b, pic) {
            let aEle = pic[a];
            let bEle = pic[b];
            let _left;
            _left = aEle.style.left;
            aEle.style.left = bEle.style.left;
            bEle.style.left = _left;
            let _top;
            _top = aEle.style.top;
            aEle.style.top = bEle.style.top;
            bEle.style.top = _top;
            let _index;
            _index = aEle.getAttribute("data-index");
            aEle.setAttribute("data-index", bEle.getAttribute("data-index"));
            bEle.setAttribute("data-index", _index);
        },
        runTimer() {
            setTimeout(() => {
                this.randomPuzzleImage();
                //设置背景图片为空
                const $puzzle = document.querySelector('.puzzle-wrapper');
                $puzzle.style['background'] = `none`;
                this.enableTransationEnd = true;
            }, 3000)
        },
        startTimmer() {
            setTimeout(() => {
                if (this.start) {
                    this.time = (+this.time + 0.1).toFixed(1);
                    this.startTimmer();
                }
            }, 100)
        },
        removeEvent() {
            this.picEl.forEach(el => {
                //清楚所有的事件 redo ↑抽出事件
            })
        }
    }
}
</script>

<style lang="scss">
.m-puzzle-wrapper {
  width: 100%;
  height: 100%;
}
.puzzle-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  background-size: 100% 100%;
  text-align: center;
}
.puzzle-time {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 32px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
}

.puzzle-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0;
  z-index: 999;
}

.puzzle-pic {
  float: left;
  position: absolute;
  transition: all 0.5s ease 0s;
}

.controller {
  text-align: center;
  position: relative;
}

.timer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: #fff;
  z-index: 9999;
}
</style>
