import { config } from '@/shared/global';

export default {

    name: 'AdminSubMenu',

    props:{
        subMenu: []
    },
    
    data(){
        return {
            srcImages: config.imagesStorage + '/menus/'
        }

    },

    computed:{

    },

    methods: {
        expandMenu: ($e)=>{
            console.log('expandMenu',$e);
        },

        redirectTo:($e) => {
            console.log('redirectTo',$e);
        }
    },

    watch:{

    },

    mounted(){

    }

}