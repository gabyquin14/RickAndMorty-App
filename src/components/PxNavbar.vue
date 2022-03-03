<template>
  <nav>
    <div class="dropdown">
      <div>
        <span>Status</span>
      </div>
      <div class="status-dropdown">
        <span @click="status = ''" :class="status === '' ? 'active' : ''"
          >All</span
        >
        <span
          @click="status = 'alive'"
          :class="status === 'alive' ? 'active' : ''"
          >Alive</span
        >
        <span
          @click="status = 'dead'"
          :class="status === 'dead' ? 'active' : ''"
          >Dead</span
        >
        <span
          @click="status = 'unknown'"
          :class="status === 'unknown' ? 'active' : ''"
        >
          Unknown</span
        >
      </div>
    </div>

    <div class="dropdown">
      <div>
        <span>Gender</span>
      </div>
      <div class="gender-dropdown">
        <span @click="gender = ''" :class="gender === '' ? 'active' : ''"
          >All</span
        >
        <span
          @click="gender = 'unknown'"
          :class="gender === 'unknown' ? 'active' : ''"
          >Unknown</span
        >
        <span
          @click="gender = 'female'"
          :class="gender === 'female' ? 'active' : ''"
          >Female</span
        >
        <span
          @click="gender = 'male'"
          :class="gender === 'male' ? 'active' : ''"
          >Male</span
        >
        <span
          @click="gender = 'genderless'"
          :class="gender === 'genderless' ? 'active' : ''"
          >Genderless</span
        >
      </div>
    </div>
    <button @click="applyFilters">Apply filters</button>
    <button @click="getRandomCharacters">Get multiple characters</button>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PxNavbar",
  data() {
    return {
      gender: this.$route.query.gender || "all",
      status: this.$route.query.status || "all",
    };
  },
  computed: {
    ...mapState({
      pagination: (state) => state.characters.pagination,
    }),
  },
  methods: {
    ...mapActions({
      fetchCharacters: "characters/fetchCharacters",
      setFilters: "characters/setFilters",
      setPagination: "characters/setPagination",
      randomCharacters: "characters/randomCharacters",
    }),
    getRandomCharacters() {
      this.setFilters({ gender: "all", status: "all" });
      this.setPagination(1);
      this.randomCharacters();
      this.redirect();
    },
    applyFilters() {
      this.setFilters({ gender: this.gender, status: this.status });
      this.setPagination(1);
      this.fetchCharacters();
      this.redirect();
    },
    redirect() {
      let currentGender = this.gender === "" ? "all" : this.gender;
      let currentStatus = this.status === "" ? "all" : this.status;
      const fullPath = `/home?page=${this.pagination}&gender=${currentGender}&status=${currentStatus}`;
      if (this.$route.fullPath !== fullPath) this.$router.push(fullPath);
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #f2f2f2;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dropdown {
  width: 162px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.dropdown:hover {
  background-color: #e7e4e4;
}
.status-dropdown,
.gender-dropdown {
  display: none;
  position: absolute;
  flex-direction: column;
  top: 80px;
  background-color: #ffffff;
  width: 160px;
  z-index: 10;
}
.dropdown:hover .status-dropdown {
  display: flex;
}
.dropdown:hover .gender-dropdown {
  display: flex;
}
.dropdown:hover .status-dropdown span,
.dropdown:hover .gender-dropdown span {
  padding: 8px 15px;
  cursor: pointer;
}
.dropdown:hover .status-dropdown span:hover,
.dropdown:hover .gender-dropdown span:hover,
.active {
  background-color: #e7e4e4;
}
</style>
