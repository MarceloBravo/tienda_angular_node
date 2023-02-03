export default {
    name: 'AlertComponent',

    props: {
        titulo: {type: String},
        mensaje: {type: String},
        tipo: {type: String},
        isItem: {type: Boolean},
        duracion: {type: Number }
    },

    data(){
        return {
            tiempo: this.duracion ? this.duracion : 30,
            interval: null,
            mostrar: true
        }
    },

    methods: {
        restTimer: function(){
            this.interval = setInterval(()=>{
                this.tiempo--
            },1000);
        },

        cerrar: function(){
            clearInterval(this.interval);
            this.mostrar = false;
        }
    },

    watch:{
      tiempo:function(){
        if(this.tiempo <=0){
            this.cerrar();
        }
      }  
    },

    mounted(){
        this.restTimer();
    }
}