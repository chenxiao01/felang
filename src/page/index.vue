<template>
    <div class="weui-tab">
        <div class="weui-tab__panel">
            <team v-if="currentPage === 0" :teamInfo="teamInfo"></team>
            <bestSpeaker v-else-if="currentPage === 1" :teamInfo="teamInfo"></bestSpeaker>
            <result v-else-if="currentPage === 2" :teamInfo="teamInfo"></result>
        </div>
        <div class="weui-tabbar index-tab-footer">
            <a href="javascript:;" class="weui-tabbar__item"
                v-bind:class="{'weui-bar__item_on': currentPage === 0}"
                @click="navClick(0)">
                <span class="font-icon icon-organization" />
                <p class="weui-tabbar__label">团队打分</p>
            </a>
            <a href="javascript:;" class="weui-tabbar__item"
                v-bind:class="{'weui-bar__item_on': currentPage === 1}"
                @click="navClick(1)">
                <span class="font-icon icon-like" />
                <p class="weui-tabbar__label">最佳辩手</p>
            </a>
            <a href="javascript:;" class="weui-tabbar__item"
                v-bind:class="{'weui-bar__item_on': currentPage === 2}" @click="navClick(2)">
                <span class="font-icon icon-megaphone" />
                <p class="weui-tabbar__label">最终结果</p>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    components: {
        team: () => import('./team'),
        bestSpeaker: () => import('./bestSpeaker'),
        result: () => import('./result')
    },
    data() {
        return {
            currentPage: 0,
            teamInfo: {},
        }
    },
    mounted: function () {
        $.get('vote/teams?username=' + localStorage.getItem('user'), resp => {
            this.teamInfo = resp;
        });
    },
    methods: {
        navClick: function(index) {
            this.currentPage = index;
        }
    }

}
</script>