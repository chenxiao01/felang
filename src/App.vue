<template>
    <div id="app" class="page">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  mounted() {
    if (!localStorage.getItem('user')) {
        this.$router.push('/');
    }
  }
}
</script>

<style lang="scss">
  @import "./style/style";
</style>
