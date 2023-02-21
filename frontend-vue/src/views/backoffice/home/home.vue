<template>
    <div class="content-app">
        <AdminLeftMenu></AdminLeftMenu>
        <div class="mnu-is-open">
            Este es home.
        </div>
    </div>
</template>

<style type="scss">
    @import './home.scss';
</style>

<script>
    import AdminLeftMenu from '@/components/adminLeftMenu/adminLeftMenu.vue';

    export default {
        name: 'homePage',

        components:{
            AdminLeftMenu
        }
    }

</script>