import Alert from '../alert/alert.vue';

export default {
    name: 'grupoAlertasComponent',

    components:{
        Alert
    },

    props:{
        alertas: {type: Array, default: ()=>[]}
    }
}