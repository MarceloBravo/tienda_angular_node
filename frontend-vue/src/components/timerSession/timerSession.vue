<template>
    <div v-if="isRememberMe === false" className="session-info">
        <label v-if="countDown !== null" className="session-info-label">
            La sessión expira en {{ (new Date(this.countDown * 1000)).toISOString().substr(11, 8) }} segs.
        </label>
    </div>
</template>

<script>
    import TimerSession from './timerSession';
    export default TimerSession;
</script>

<style lang="scss">
    @import './timerSession.scss';
</style>