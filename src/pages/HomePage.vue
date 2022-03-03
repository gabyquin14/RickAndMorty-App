<template>
  <div style="overflow-x: hidden; position: relative">
    <px-header />
    <px-navbar />
    <div class="container">
      <div class="topbar">
        <section class="sect-fav">
          <span>Mostrar favoritos: </span>
          <px-fav-button @toggleStar="showFav = !showFav" :showFav="showFav" />
        </section>
        <section v-show="!showEmpty">
          <button
            @click="() => watchPagination(1)"
            :disabled="pagination >= maxPages"
          >
            Next
          </button>
          <button
            @click="() => watchPagination(-1)"
            :disabled="pagination <= 1"
          >
            Previous
          </button>
        </section>
      </div>

      <div class="cards" v-show="!showEmpty">
        <px-char-card
          v-for="(character, index) in displayTheseCharacter"
          :key="character.id"
          :character="character"
          @showModal="updateModal(character, index)"
        />
      </div>
      <px-char-modal
        :isCardModalActive="showModal"
        @close-modal="(val) => (showModal = false)"
        v-if="showModal"
        :currentCharacter="currentCharacter"
        :interestingCharacters="interestingCharacters"
      />
    </div>
    <px-empty-page v-if="showEmpty" />
    <px-footer />
  </div>
</template>

<script>
import PxHeader from "@/components/PxHeader";
import PxNavbar from "@/components/PxNavbar";
import PxFooter from "@/components/PxFooter";
import PxCharCard from "@/components/PxCharCard";
import PxEmptyPage from "@/components/PxEmptyPage";
import PxCharModal from "@/components/PxCharModal";
import PxFavButton from "@/components/PxFavButton";
import { mapActions, mapState } from "vuex";

export default {
  name: "HomePage",
  components: {
    PxHeader,
    PxNavbar,
    PxFooter,
    PxCharCard,
    PxEmptyPage,
    PxCharModal,
    PxFavButton,
  },
  data() {
    return {
      showFav: false,
      page: 1,
      showModal: false,
      interestingCharacters: [],
    };
  },
  computed: {
    ...mapState({
      displayTheseCharacter: (state) => state.characters.displayTheseCharacter,
      pagination: (state) => state.characters.pagination,
      showEmpty: (state) => state.characters.showEmpty,
      maxPages: (state) => state.characters.maxPages,
      gender: (state) => state.characters.gender,
      status: (state) => state.characters.status,
    }),
  },
  mounted() {
    if (this.$route.query.name) {
      this.fetchThisCharacter(this.$route.query.name);
    } else {
      this.setFilters({
        gender: this.$route.query.gender || "all",
        status: this.$route.query.status || "all",
      });
      this.setPagination(parseInt(this.$route.query.page) || 1);
      this.fetchCharacters();
    }
  },

  methods: {
    ...mapActions({
      fetchCharacterEpisodes: "episodes/fetchCharacterEpisodes",
      updateModal: "episodes/updateModal",
      fetchCharacters: "characters/fetchCharacters",
      setPagination: "characters/setPagination",
      setFilters: "characters/setFilters",
      fetchThisCharacter: "characters/fetchThisCharacter",
    }),
    showFavorites() {},
    watchPagination(num) {
      this.setPagination(this.pagination + num);
      this.fetchCharacters();
      this.redirect();
    },
    redirect() {
      const fullPath = `/home?page=${this.pagination}&gender=${this.gender}&status=${this.status}`;
      if (this.$route.fullPath !== fullPath) this.$router.push(fullPath);
    },
    updateModal(character, index) {
      this.showModal = true;
      window.scrollTo(0, 0);
      this.currentCharacter = character;

      this.interestingCharacters = [
        this.displayTheseCharacter[index + 1],
        this.displayTheseCharacter[index + 2],
        this.displayTheseCharacter[index + 3],
      ];

      character.episode.forEach((episode) => {
        this.fetchCharacterEpisodes(episode);
      });
    },
  },
};
</script>

<style scoped>
.container {
  margin: 20px 10%;
}
.topbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.cards {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.sect-fav {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
