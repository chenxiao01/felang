<template>
    <div class="team-score">
        <div class="js_dialog" id="dialogConfirm" style="display:none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">温馨提示</strong></div>
                <div class="weui-dialog__bd">确定打分吗？确定后则不能修改。</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="cancelClick">取消</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="scoreSubmit">确定</a>
                </div>
            </div>
        </div>
        <div v-if="isVoted">
            <div class="icon-box team-score-icon-container">
                <i class="weui-icon-success weui-icon_msg"></i>
                <div class="icon-box__ctn">
                    <h3 class="icon-box__title">您已经为团队打过分了~</h3>
                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="page__title">请为双方打分</h2>
            <div v-for="(nameArr, key, index) in teamInfo.teams">
                <div class="weui-cells__title">{{titleTip[index]}}{{key}}</div>
                <div class="weui-cells">
                    <div class="weui-cell weui-slider-box" 
                        v-for="(initScore, itemKey, itemIndex)  in teamInfo.items">
                        <label class="weui-label">{{itemKey}}</label>
                        <div class="weui-slider">
                            <div class="weui-slider__inner">
                                <div style="width: 0;" class="weui-slider__track"></div>
                                <div style="left: 0;" class="weui-slider__handler"
                                    @touchstart="touchstart"
                                    @touchmove="touchmove"
                                    :score="initScore"
                                    :index="index"
                                    :itemIndex="itemIndex"
                                ></div>
                            </div>
                        </div>
                        <div class="weui-slider-box__value">{{score[index][itemIndex]}}</div>
                    </div>
                </div>
            </div>
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="scoreClick">确认打分</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ['teamInfo'],
    data() {
        return {
            isVoted: false,
            titleTip: {
                0: '正方：',
                1: '反方：'
            },
            score: {
                0: [0, 0, 0, 0, 0],
                1: [0, 0, 0, 0, 0]
            }
        }
    },
    mounted: function () {
        // this.totalLen = parseInt($('.weui-slider__inner').css('width'));
        $.get('vote/score/team?username=' + localStorage.getItem('user'), resp => {
            this.isVoted = resp.isVoted;
        });
    },
    methods: {
        scoreSubmit: function () {
            $.post('vote/score/team?username=' + localStorage.getItem('user'), {
                '正方': this.score[0],
                '反方': this.score[1]
            }, resp => {
                this.isVoted = true;
                $('#dialogConfirm').css('display', 'none');
            });
        },
        scoreClick() {
            $('#dialogConfirm').css('display', 'block');
        },
        cancelClick() {
            $('#dialogConfirm').css('display', 'none');
        },
        touchstart: function (e) {
            this.totalLen = parseInt($('.weui-slider__inner').css('width'));
            window.startLeft = parseInt(e.target.style.left) * this.totalLen / 100;
            window.startX = e.changedTouches[0].clientX;
        },
        touchmove: function(e){
            let dist = window.startLeft + e.changedTouches[0].clientX - window.startX,
                percent;
                debugger
            dist = dist < 0 ? 0 : dist > this.totalLen ? this.totalLen : dist;
            percent =  parseInt(dist / this.totalLen * 100);
            $(e.target).prev().css('width', percent + '%');
            $(e.target).css('left', percent + '%');
            const singleScore = parseInt((+e.target.getAttribute('score'))*percent/100);
            this.score[e.target.getAttribute('index')][e.target.getAttribute('itemIndex')] = singleScore;
            $(e.target).parent().parent().next().text(singleScore);
            e.preventDefault();
        }

    }
}
</script>