
// layout components

interface State {
  menuCollapse: boolean;
}

const state = {
  menuCollapse: false
}

const mutations = {
  SET_MENUCOLLAPSE: (state: State) => {
    const dom = Object.freeze(document.getElementById('aside')!)
    if (!state.menuCollapse) {
      dom.style.width = 'auto'
    } else {
      dom.style.width = '201px'
    }
    state.menuCollapse = !state.menuCollapse;
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}