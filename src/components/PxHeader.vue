<template>
  <div class="header">
    <img class="main-title" src="../assets/rick-and-morty.png" alt="" />
    <div class="input-field">
      <img class="lupa" src="../assets/lupa.png" alt="Search-icon" />
      <input
        type="text"
        placeholder="Buscar personaje..."
        v-model="searchThisCharacter"
        v-on:keyup.enter="onSearchCharacter"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PxHeader",
  data() {
    return {
      searchThisCharacter: this.$route.query.name || "",
    };
  },
  mounted() {
    if (this.$route.query.name !== "")
      this.fetchThisCharacter(this.searchThisCharacter);
  },
  computed: {
    ...mapState({
      showEmpty: (state) => state.characters.showEmpty,
    }),
  },
  methods: {
    ...mapActions({
      fetchThisCharacter: "characters/fetchThisCharacter",
    }),
    onSearchCharacter() {
      this.fetchThisCharacter(this.searchThisCharacter);

      this.$router.push({
        path: "/home",
        query: { name: this.searchThisCharacter },
      });
      this.searchThisCharacter = ""; //this.redirect();
    },
    // redirect() {
    //   // const fullPath = `/home?name=${this.searchThisCharacter}`;
    //   // if (this.$route.fullPath !== fullPath) this.$router.push(fullPath);
    //   this.$router.replace({
    //     path: "/home",
    //     query: {
    //       name: this.searchThisCharacter,
    //     },
    //   });
    // },
  },
};
</script>

<style scoped>
.header {
  background: linear-gradient(0deg, #00000075, #00000075),
    url("../assets/bg-photo.png");
  height: 455px;
  width: 100vw;
  background-color: black;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.main-title {
  height: 122px;
  width: 348px;
}
.input-field {
  background-color: #081f32;
  border: 1px solid white;
  width: 500px;
  padding: 12px;
  border-radius: 6px;
  display: flex;
}
.lupa {
  height: 28px;
  width: 28px;
  margin-right: 12px;
}
input {
  outline: none;
  width: 100%;
  background-color: #081f32;
  color: white;
  border: none;
}
</style>
