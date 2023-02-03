const state = {
    data: {
        user: null,
        rolIdaddress: '',
        iat: '',
        exp: '',
        iss: ''
    }
}

const getters = {
    getDataLogin: (state) => {
        return state.data;
    }
}

const mutations = {
    setDataLogin: (state, data) => {
        state.data = data;
    }
}

const actions = {
    login: (context, data) => context.commit('setDataLogin', data)
}

const modules = {}

export default {
    state, 
    getters,
    mutations,
    actions,
    modules
}

