<template>
    <nav class="navbar navbar-expand navbar-light navbar-bg">
            
            <div :class="'menu ' + (showLeftMenu ? 'change' : '')" @click="togleMenu">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>

            <div class="navbar-info">      
                <ul class="navbar-nav navbar-align">
                    <TimerSession />
                
                    <li class="nav-item dropdown">
                        <label class="nav-icon dropdown-toggle d-inline-block d-sm-none" href="#" data-bs-toggle="dropdown">
                            <i class="align-middle" data-feather="settings"></i>
                        </label>

                        <label id="menuPerfil" v-if="usuario" class="nav-link dropdown-toggle d-none d-sm-inline-block" data-bs-toggle="dropdown" @click="menuPerfilToggle">
                            <img :src="imagesPath+'/avatars/avatar.jpg'" class="avatar img-fluid rounded me-1" alt="" />
                             <span class="text-dark">{{ usuario.nombres }} {{ usuario.apellido1 }}</span>
                        </label>
                        
                        <div v-if="togleMenuPerfil" class="dropdown-menu dropdown-menu-end">
                            <label class="dropdown-item" ><i class="align-middle me-1" data-feather="user"></i> Perfil</label>
                            <div class="dropdown-divider"></div>
                            <label class="dropdown-item" ><i class="align-middle me-1" data-feather="settings"></i> Ir a la tienda</label>
                            <label class="dropdown-item" @click="logout">Cerrar sessión</label>
                        </div>
                        
                    </li>
                </ul>
            </div>
        </nav>
</template>

<script>
import { config } from '@/shared/global';
import { mapGetters } from 'vuex';
import TimerSession from '@/components/timerSession/timerSession.vue';
import { clearTokens } from '@/shared/functions';

export default {
    name: "AdminTopMenu",
    
    data(){
        return {
            togleMenuPerfil: false,
            imagesPath: config.imagesStorage,
            usuario: null,
            showLeftMenu: true
        }
    },

    components:{
        TimerSession
    },

    computed:{
        ...mapGetters(['getDataLogin'])
    },

    methods: {
        togleMenu: function(){
            this.showLeftMenu = !this.showLeftMenu;
            this.$store.dispatch('toggleLeftAdminMenu',this.showLeftMenu);
        },

        menuPerfilToggle: function(){
            this.togleMenuPerfil = !this.togleMenuPerfil;
        },

        hidePerfilMenu:function(e){
            if(this.togleMenuPerfil && e.target.parentElement.id !== 'menuPerfil'){
                this.togleMenuPerfil = !this.togleMenuPerfil;
            }
        },

        logout: function(){
            this.$store.dispatch('setLogout');
            clearTokens();
            this.$router.push('/login');
        }
    },

    watch:{
        getDataLogin: function(){
            if(this.getDataLogin?.user){
                this.usuario = this.getDataLogin.user;
            }
        }
    },

    mounted(){
        this.usuario = this.getDataLogin.user;
        document.body.addEventListener('click', this.hidePerfilMenu)
    }
}
</script>

<style lang="scss">
    @import './adminTopMenu.scss';
</style>