<template>
  <div style="position: relative">
    <div class="card" @click="$emit('showModal')">
      <div class="profile-photo">
        <img :src="character.image" alt="character-photo" />
        <div class="fav-button">
          <px-fav-button :showFav="false" />
        </div>
      </div>

      <div class="card-content">
        <div class="currentstatus">
          <span
            class="status"
            :class="character.status === 'Alive' ? 'alive' : 'dead'"
          ></span>
          <h4>{{ character.status }} - {{ character.species }}</h4>
        </div>

        <h3 class="char-name">{{ character.name }}</h3>
        <h4 class="subtitle">Last known location</h4>
        <span class="resp">{{ character.location.name }}</span>
        <h4 class="subtitle">First seen in:</h4>
        <span class="resp">{{ firstSeen }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PxFavButton from "./PxFavButton";
export default {
  components: { PxFavButton },
  props: ["character"],
  mounted() {
    this.episodes(this.character.episode[0]);
  },
  data() {
    return {
      firstSeen: "",
    };
  },
  methods: {
    async episodes(url) {
      try {
        const resp = await axios.get(url);
        if (resp.data.name != "" || resp.data.name != " ") {
          this.firstSeen = resp.data.name;
        } else {
          this.firstSeen = "Unknown";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.fav-button {
  position: absolute;
  bottom: 5px;
  right: 5px;
  z-index: 1;
}
.card {
  width: 370px;
  height: 160px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  margin-right: 20px;
  margin-bottom: 40px;
  box-shadow: 10px 10px 20px -2px rgba(0, 0, 0, 0.18);
}
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 0 15px;
  text-align: left;
}
.profile-photo {
  width: 140px;
  min-width: 140px;
  height: auto;
  position: relative;
}
.profile-photo img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.currentstatus {
  display: flex;
  align-items: baseline;
  font-size: 12px;
}
.status {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 8px;
}
.char-name {
  font-size: 16px;
}
.subtitle {
  color: #828282;
  font-size: 11px;
}
.resp {
  font-size: 13px;
}
.alive {
  background-color: #27ae60;
}
.dead {
  background-color: #eb5757;
}
</style>
