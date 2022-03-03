<template>
  <div class="empty">
    <h1 class="maintitle">¡Uh-oh!</h1>
    <span class="subtitle">¡Pareces perdido en tu viaje!</span>
    <button @click="eliminarFiltros">Eliminar filtros</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      setPagination: "characters/setPagination",
      setFilters: "characters/setFilters",
      showEmptyPage: "characters/showEmptyPage",
    }),
    eliminarFiltros() {
      this.setPagination(1);
      this.setFilters({ gender: "all", status: "all" });
      this.showEmptyPage(false);
    },
  },
};
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
}
.maintitle {
  color: #353535;
  font-size: 36px;
  margin-bottom: 15px;
}
.subtitle {
  color: #5e5e5e;
  font-size: 18px;
  margin-bottom: 15px;
}
.button {
  background-color: #11555f;
  font-size: 18px;
}
</style>
