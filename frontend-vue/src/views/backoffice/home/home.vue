<template>
    <div class="content-app">
        <AdminLeftMenu></AdminLeftMenu>
        <div class="mnu-is-open">
            <AdminTopMenu></AdminTopMenu>
            Este es home.
        </div>
    </div>
</template>

<style lang="scss">
    @import './home.scss';
</style>

<script>
    import AdminLeftMenu from '@/components/adminLeftMenu/adminLeftMenu.vue';
    import AdminTopMenu from '@/components/adminTopMenu/adminTopMenu.vue';

    export default {
        name: 'homePage',

        components:{
            AdminLeftMenu,
            AdminTopMenu
        }
    }

</script>