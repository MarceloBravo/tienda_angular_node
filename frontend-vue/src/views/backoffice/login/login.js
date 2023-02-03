import { login } from '../../../axios/login.js';
import GrupoAlertasComponent from '../../../components/grupoAlertas/grupoAlertas.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'BackOfficeLogin', 

    components: {
        GrupoAlertasComponent
    },

    data(){
        return {
            email: '',
            password: '',
            remember: false,
            alertas: []
        }
    },

    computed: {
        ...mapGetters(['getDataLogin','getError'])
    },

    methods:{
        rememberChange($event){
            $event.preventDefault();
            
        },

        loginClick(){
            if(this.email.length > 0 && this.password.length > 0){
                login(this.$store, this.email, this.password, this.remember);
            }else{
                console.log('Datos incompletos.');
            }
            
        }
    },

    watch:{
        getDataLogin:function(){
            if(this.getDataLogin.user !== null){
                this.$router.push('/home');
            }else{
                this.alertas.push({titulo:'Error', mensaje: 'Error desconocido.', tipo:'danger'});
                console.log('Error desconocido.');
            }
        },

        getError: function(){
            this.alertas.push({titulo:'Error', mensaje: this.getError.mensaje, tipo:'danger'});
            console.log('Error',this.getError.mensaje);
        }

    
    }
}