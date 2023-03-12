import { mapGetters } from 'vuex';
import { extendSession } from '@/axios/login/';
import { clearTokens } from '@/shared/functions';


export default {
    name: 'TimerSession',

    data(){
        return {
            seconds: 0,
            countDown: null,
            timerObj: null,
            isRememberMe: false
        }
    },

    computed:{
        ...mapGetters(['getDataLogin','getRememberMe'])
    },

    watch: {
        getDataLogin:function(){          
            this.iniciarSession();
        }
    },

    methods:{
        temporizador(){
            if (this.countDown !== null && this.countDown > 0) {
                this.timerObj = setTimeout(() => {
                    this.countDown -= 1;
                    this.temporizador();
                }, 1000)
            }else if(this.countDown !== null && this.countDown <= 0){
                this.finalizarSession();
            }
        },

        finalizarSession(){
            if(this.isRememberMe){
                extendSession(this.$store, this.isRememberMe)
            }else{
                clearTimeout(this.timerObj);
                this.$store.dispatch('setLogout');
                clearTokens();
                this.$router.push('/login');
            }
        },

        calcularTiempo(exp){
            if(exp.toString().length < (new Date()).getTime()?.toString().length){
                this.countDown = (exp - parseInt((new Date()).getTime().toString().substr(0,exp.toString().length)))+1;
            }else if(exp.toString().length > (new Date()).getTime()?.toString().length){
                this.countDown = ((parseInt(exp.toString().substr(0, (new Date()).getTime().toString().length)) - (new Date().getTime()))+1);
            }else{        
                this.countDown = ( exp-(new Date()).getTime()+1);
            }
        },

        iniciarSession(){
            clearTimeout(this.timerObj);
            this.calcularTiempo(this.getDataLogin.exp);
            this.temporizador();
        }
    },

    mounted(){
        this.isRememberMe = this.getRememberMe;
        this.iniciarSession();
    }
}