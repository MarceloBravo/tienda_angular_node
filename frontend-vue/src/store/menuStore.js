const state = {
    data:{
        rows: [],
        count: 0
    },
    showLeftAdminMenu: true
}

const getters = {
    getMenu: (state) => {
        return state.data;
    },

    getShowLeftAdminMenu: (state) => {
        return state.showLeftAdminMenu;
    }
}

const mutations = {
    setMenu: (state, data) => {
        state.data = data;
    },

    setShowLeftAdminMenu: (state, data) => {
        state.showLeftAdminMenu = data
    }
}

const actions = {
    menu: (context, data) => context.commit('setMenu', data),

    toggleLeftAdminMenu: (context, data) => context.commit('setShowLeftAdminMenu', data)
 }

 export default { 
    state,
    getters,
    mutations,
    actions
 };