<template>
    <div class="login-container">
        <div class="weui-cells__title">登录页面</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">用户名</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-model="username" type="text" placeholder="请报上大名">
                </div>
            </div>
            <a href="javascript:;" class="weui-btn weui-btn_primary" @click="handleSubmit">login</a>
        </div>
    </div>
</template>
<style>
.login-container {
    padding: 0 15px;
}
</style>
<script>
    export default {
        data () {
            return {
                username: '',
                ruleInline: {
                    username: [
                        { required: true, message: '请报上大名', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted () {
            if (localStorage.getItem('user')) {
                this.$router.push('/index');
            }
        },
        methods: {
            handleSubmit() {
                //this.$refs[name].validate((valid) => {
                    //if (valid) {
                        $.post('vote/login', {username: this.username}, resp => {
                            localStorage.setItem('user', this.username);
                            this.$router.push('/index');
                        })
                    //}
                    //else {
                        // TODO 名称重复怎么办
                    //}
                //})
            }
        }
    }
</script>