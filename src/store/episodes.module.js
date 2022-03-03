import axios from "axios";
const episodes = {
  namespaced: true,
  state: () => ({
    episodes: [],
  }),
  mutations: {
    FETCH_EPISODES(state, episode) {
      state.episodes.push(episode);
      state.episodes.sort();

      function compare(a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      }
      state.episodes.sort(compare);
      state.episodes = state.episodes.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.id === thing.id)
      );
    },
  },
  actions: {
    async fetchCharacterEpisodes({ commit }, episode) {
      try {
        const resp = await axios.get(episode);
        commit("FETCH_EPISODES", resp.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default episodes;
