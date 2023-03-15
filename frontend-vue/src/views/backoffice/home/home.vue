<template>
    <div class="content-app">
        <AdminLeftMenu></AdminLeftMenu>
        <div :class="isLeftMenuVisible ? 'mnu-is-open' : 'mnu-is-closed'">
            <AdminTopMenu></AdminTopMenu>
            Este es home.
        </div>
    </div>
</template>

<style lang="scss">
    @import './home.scss';
</style>

<script>
import { mapGetters } from 'vuex';
    import AdminLeftMenu from '@/components/adminLeftMenu/adminLeftMenu.vue';
    import AdminTopMenu from '@/components/adminTopMenu/adminTopMenu.vue';

    export default {
        name: 'homePage',

        data(){
            return{
                isLeftMenuVisible: true
            }
        },

        components:{
            AdminLeftMenu,
            AdminTopMenu
        },

        computed:{
            ...mapGetters(['getShowLeftAdminMenu'])
        },

        watch:{
            getShowLeftAdminMenu: function(){
                this.isLeftMenuVisible = this.getShowLeftAdminMenu;
            }
        }
        
    }

</script>