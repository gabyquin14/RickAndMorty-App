import Vue from "vue";
import Vuex from "vuex";
import characters from "./characters.module";
import episodes from "./episodes.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    characters,
    episodes,
  },
});
