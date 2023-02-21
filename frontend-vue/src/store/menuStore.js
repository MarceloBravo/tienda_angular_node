const state = {
    data:{
        rows: [],
        count: 0
    }
}

const getters = {
    getMenu: (state) => {
        return state.data;
    }
}

const mutations = {
    setMenu: (state, data) => {
        state.data = data;
    }
}

const actions = {
    menu: (context, data) => context.commit('setMenu', data)
 }

 export default { 
    state,
    getters,
    mutations,
    actions
 };