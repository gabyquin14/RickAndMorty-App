import axios from "axios";
const characters = {
  namespaced: true,
  state: () => ({
    pagination: 1,
    maxPages: 1,
    displayTheseCharacter: [],
    showEmpty: false,
    status: "all",
    gender: "all",
  }),
  mutations: {
    FETCH_DATA(state, characters) {
      state.displayTheseCharacter = characters.results;
      state.maxPages = characters.info.pages;
    },
    FETCH_MULTIPLE_CHARACTERS(state, characters, info) {
      state.displayTheseCharacter = characters;
      state.maxPages = info.pages;
    },
    SHOW_EMPTY_PAGE(state, status) {
      state.showEmpty = status;
    },
    SEARCH_CHARACTER(state, character) {
      state.displayTheseCharacter = character;
    },
    SET_CURRENT_FILTERS(state, payload) {
      state.gender = payload.gender;
      state.status = payload.status;
    },
    UPDATE_PAGINATION(state, currentPage) {
      state.pagination = currentPage;
    },
  },
  actions: {
    async fetchCharacters({ commit, state }) {
      try {
        let gender = state.gender === "all" ? "" : state.gender;
        let status = state.status === "all" ? "" : state.status;
        const resp = await axios.get(
          `https://rickandmortyapi.com/api/character/`,
          { params: { page: state.pagination, gender, status } }
        );

        commit("FETCH_DATA", resp.data);
      } catch (error) {
        console.log(error);
      }
    },
    showEmptyPage({ commit }, status) {
      commit("SHOW_EMPTY_PAGE", status);
    },
    setFilters({ commit }, payload) {
      commit("SET_CURRENT_FILTERS", payload);
    },
    setPagination({ commit }, currentPage) {
      commit("UPDATE_PAGINATION", currentPage);
    },
    async fetchThisCharacter({ commit }, characterName) {
      try {
        const resp = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${characterName}`
        );
        commit("SEARCH_CHARACTER", resp.data.results, resp.data.info);
        commit("SHOW_EMPTY_PAGE", false);
      } catch (error) {
        commit("SHOW_EMPTY_PAGE", true);
        console.log(error);
      }
    },
    async randomCharacters({ commit }) {
      try {
        let randomArray = Array.from({ length: 100 }, () =>
          Math.floor(Math.random() * 100)
        );
        const resp = await axios.get(
          `https:rickandmortyapi.com/api/character/${randomArray}`
        );
        commit("FETCH_MULTIPLE_CHARACTERS", resp.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    returnCharacters(state) {
      return state.displayTheseCharacter;
    },
  },
};
export default characters;
