<template>
    <div class="best-speaker">
        <div class="weui-toptips weui-toptips_warn js_tooltips"
            :style="{'display': validTip !== '' ? 'block' : 'none'}">
            {{validTip}}
        </div>
        <div v-if="isVoted">
            <div class="icon-box best-speaker-icon-container">
                <i class="weui-icon-success weui-icon_msg"></i>
                <div class="icon-box__ctn">
                    <h3 class="icon-box__title">您已经为最佳辩手投过票了~</h3>
                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="page__title">请为你最喜欢的辩手投票</h2>
            <div v-for="(nameArr, key, index) in teamInfo.teams">
                <div class="weui-cells__title">{{titleTip[index]}}{{key}}</div>
                <div class="weui-cells weui-cells_radio">
                    <label class="weui-cell weui-check__label" v-for="name in nameArr" :for="name">
                        <div class="weui-cell__bd">
                            <p>{{name}}</p>
                        </div>
                        <div class="weui-cell__ft">
                            <input type="radio" class="weui-check" :name="index" :id="name"
                                @click="speakerHandler" :checked="competitor[index] === name" />
                            <span class="weui-icon-checked"></span>
                        </div>
                    </label>
                </div>
            </div>
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="voteSubmit">确认投票</a>
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
            competitor: {
                0: '',
                1: ''
            },
            validTip: ''
        }
    },
    mounted: function () {
        $.get('vote/score/competitor?username=' + localStorage.getItem('user'), resp => {
            this.isVoted = resp.isVoted;
        });
    },
    methods: {
        speakerHandler: function (e) {
            this.competitor[e.target.name] = e.target.id;
            if (this.competitor[0] !== '' && this.competitor[1] !== '') {
                this.validTip = '';
            }
        },
        voteSubmit: function () {
            if (this.competitor[0] === '' || this.competitor[1] === '') {
                this.validTip = '正方与反方均需选择一名最佳辩手';
                return;
            }
            $.post('vote/score/competitor?username=' + localStorage.getItem('user'),
            {
                // params: JSON.stringify({users: [this.competitor[0], this.competitor[1]]})
                users: [this.competitor[0], this.competitor[1]]
            }, resp => {
                this.isVoted = true;
            });
        }
    }
}
</script>