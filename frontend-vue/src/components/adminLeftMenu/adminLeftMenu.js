import { mapGetters } from 'vuex';
import { loadMenu } from '../../axios/adminLeftMenu';
import { config } from '@/shared/global';
import AdminSubMenu from '@/components/adminSubMenu/adminSubMenu.vue';

export default {
    name: 'AdminLeftMenu',

    components:{
        AdminSubMenu
    },

    props: {

    },

    data(){
        return {
            isMenuVisible: true,
            menus: [],
            srcImages: config.imagesStorage + '/menus/'
        }
        
    },

    computed:{
        ...mapGetters(['getMenu'])
    },


    methods:{
        expandMenu:(e)=>{
            console.log('Expandiendo el menu con ID:',e.srcElement.attributes.class.value);
            let className = e.srcElement.attributes.class.value;
            if(className.includes('open')){
                className = className.replace('open','closed');
            }else{
                className = className.replace('closed','open');
            }
            e.srcElement.attributes.class.value = className;
        }
    },

    watch:{
        getMenu: function(){
            if(this.getMenu && this.getMenu.count > 0){
                this.menus = this.getMenu.rows;
            }
        }
    },

    mounted(){
        loadMenu(this.$store, null, true);
    }

}