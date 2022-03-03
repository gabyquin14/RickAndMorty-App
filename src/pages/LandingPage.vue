<template>
  <div class="LandingPage">
    <img src="../assets/Suazo.png" alt="Suazo-logo" />
    <img
      class="main-title"
      src="../assets/rick-and-morty.png"
      alt="rick-and-morty-titulo"
    />
    <h1>Bienvenido a Rick and Morty</h1>
    <p>
      En esta prueba, evaluaremos su capacidad para construir la aplicación
      mediante el análisis de código y la reproducción del siguiente diseño.
    </p>

    <button @click="goToHomePage">Continuar</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "LandingPage",
  computed: {
    ...mapState({
      pagination: (state) => state.characters.pagination,
      status: (state) => state.characters.status,
      gender: (state) => state.characters.gender,
    }),
  },
  methods: {
    ...mapActions({
      setPagination: "characters/setPagination",
      setFilters: "characters/setFilters",
    }),
    goToHomePage() {
      this.setPagination(1);
      this.setFilters({ gender: "all", status: "all" });
      this.$router.push({
        path: "/home",
        query: {
          page: this.pagination,
          gender: this.gender,
          status: this.status,
        },
      });
    },
  },
};
</script>

<style scoped>
.LandingPage {
  background: linear-gradient(0deg, #00000075, #00000075),
    url("../assets/bg-photo.png");
  height: 100vh;
  width: 100vw;
  background-color: black;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}
.main-title {
  height: auto;
  width: 670px;
}
h1 {
  font-size: 36px;
  margin-bottom: 10px;
}
p {
  font-size: 18px;
  max-width: 850px;
  text-align: center;
  margin-bottom: 15px;
}
button {
  font-size: 18px;
  background-color: #11555f;
  border-radius: 60px;
  padding: 10px;
  outline: none;
  border: #11555f;
  color: white;
  cursor: pointer;
}
</style>
