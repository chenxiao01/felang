<template>
    <div>
        <h2 class="page__title">
            正方<span style="font-style: italic;">VS</span>反方
            {{teamResult['正方']}} : {{teamResult['反方']}}</h2>
        <div>
            <div class="weui-cells__title">个人得分:</div>
            <div class="weui-cell" v-for="(value, key) in userResult">
                <div class="weui-cell__hd">
                    <label class="weui-label">{{key}}</label>
                </div>
                <div class="weui-cell__bd">
                    {{value}}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: ['teamInfo'],
    data() {
        return {
            teamResult: {},
            userResult: {}
        }
    },
    mounted: function () {
        $.get('vote/summery', resp => {
            this.teamResult = resp.teamResult;
            this.userResult = resp.userResult;
        });
    }
}
</script>