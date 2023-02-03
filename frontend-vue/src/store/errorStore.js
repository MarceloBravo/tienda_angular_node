const state = {
    error: null
}

const getters = {
    getError: (state) => {
        return state.error
    }
}

const mutations = {
    setError: (state, data) => {
        state.error = data
    }
}

const actions = {
    error: (context, data) => context.commit('setError', data)
}

const modules = {}

export default {
    state,
    getters,
    mutations,
    actions,
    modules
}