const state = {
    data: {
        user: null,
        rolIdaddress: '',
        iat: '',
        exp: '',
        iss: ''
    },

    rememberMe: false
}

const getters = {
    getDataLogin: (state) => {
        return state.data;
    },

    getRememberMe: (state) => {
        return state.rememberMe;
    }
}

const mutations = {
    setDataLogin: (state, data) => {
        state.data = data;
    },

    setLogout: (state) => {
        state.data = {user: null, rolIdaddress: '', iat: '', exp: '', iss: ''};
    },

    setRememberMe: (state, data) =>{
        state.rememberMe = data;
    }

}

const actions = {
    login: (context, data) => context.commit('setDataLogin', data),

    remember: (context, data) => context.commit('setRememberMe', data)
}

const modules = {}

export default {
    state, 
    getters,
    mutations,
    actions,
    modules
}

