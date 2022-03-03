<template>
  <div class="modal" v-show="isCardModalActive">
    <div class="card">
      <div class="header-content">
        <div class="card-image"></div>
        <div class="box"></div>
        <button class="exit" @click="$emit('close-modal')">
          <img src="../assets/exit.png" alt="" />
        </button>
        <div class="profile-info">
          <img
            style="border: 3px solid white"
            :src="currentCharacter.image"
            alt="character"
          />
          <div class="fav-button">
            <px-fav-button :showFav="true" />
          </div>

          <span>
            {{ turnUppercase(currentCharacter.status) }}
          </span>
          <h2 class="maintitle">{{ currentCharacter.name }}</h2>
          <span>
            {{ turnUppercase(currentCharacter.species) }}
          </span>
        </div>
      </div>
      <br />
      <div class="content">
        <div class="information">
          <h1 class="subtitle">Información</h1>
          <div class="infoDisplay">
            <div class="minicard">
              <div class="cardheader">
                <img src="../assets/info.png" alt="" />
                <p>Gender</p>
              </div>

              <span class="episode">{{ currentCharacter.gender }}</span>
            </div>
            <div class="minicard">
              <div class="cardheader">
                <img src="../assets/info.png" alt="" />
                <p>Location</p>
              </div>
              <span class="episode">{{
                checkLocation(currentCharacter.location.name)
              }}</span>
            </div>
            <div class="minicard">
              <div class="cardheader">
                <img src="../assets/info.png" alt="" />
                <p>Type</p>
              </div>
              <span class="episode">{{
                checkType(currentCharacter.type)
              }}</span>
            </div>
          </div>
        </div>
        <div class="information">
          <h1 class="subtitle">Episodios</h1>
          <div class="episodeDisplay">
            <div class="minicard" v-for="item in episodes" :key="item.episode">
              <span class="cardheader">{{ item.name }}</span>
              <span class="episode">{{ item.episode }}</span>
              <span class="cardheader">{{
                returnEpisodeDate(item.created)
              }}</span>
            </div>
          </div>
        </div>
        <div class="information">
          <h1 class="subtitle">Personajes interesantes</h1>
          <div class="interestingCharacters">
            <px-char-card
              v-for="character in interestingCharacters"
              :key="character.id"
              :character="character"
            />
          </div>
        </div>

        <button class="share-btn">Compartir personaje</button>
      </div>
    </div>
  </div>
</template>

<script>
import PxCharCard from "./PxCharCard";
import PxFavButton from "./PxFavButton";
import { mapState } from "vuex";
import moment from "moment";

export default {
  components: { PxCharCard, PxFavButton },
  props: ["currentCharacter", "isCardModalActive", "interestingCharacters"],
  computed: {
    ...mapState({
      episodes: (state) => state.episodes.episodes,
    }),
  },
  methods: {
    turnUppercase(string) {
      return string.toUpperCase();
    },
    checkType(type) {
      if (type.toLowerCase() === "") {
        return "Unknown";
      } else {
        return type;
      }
    },
    checkLocation(location) {
      return location.split(" ")[0];
    },
    returnEpisodeDate(date) {
      var creationDate = moment(date);
      var dateComponent = creationDate.utc().format("MMMM DD, YYYY");

      return dateComponent.toUpperCase();
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 20;
  padding-top: 80px;
  background-color: #000000bd;
}
.header-content {
  position: relative;
}
.card {
  background-color: white;
  border-radius: 20px;
  width: 70%;
  max-height: 1500px;
  overflow: auto;
}
.card .box {
  background-color: #f2f2f2;
  height: 160px;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-image {
  background: linear-gradient(0deg, #00000075, #00000075),
    url("../assets/bg.png");
  height: 224px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.exit {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
}
.content {
  padding: 0 4%;
  overflow-x: hidden;
}
.profile-info {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 20px;
  width: 100%;
  margin: auto;
}
.profile-info img {
  border-radius: 100%;
  height: 150px;
  width: 150px;
  margin-bottom: 10px;
}
.profile-info span {
  font-size: 16px;
  margin: 5px 0;
}
.subtitle {
  text-align: left;
  font-size: 20px;
  color: #4f4f4f;
  margin-bottom: 20px;
}
.fav-button {
  position: absolute;
  bottom: 34%;
}

.maintitle {
  color: #081f32;
  font-size: 20px;
  font-weight: 600;
}
.information {
  display: flex;
  flex-direction: column;
  margin-bottom: 4%;
}
.minicard {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  border: 1px solid gray;
  width: 160px;
  height: 75px;
  max-width: 180px;
  max-height: 80px;
  border-radius: 12px;
  padding: 8px 2px 8px 8px;
  margin-bottom: 30px;
  font-size: 15px;
}
.minicard span {
  margin: auto 0;
  text-align: left;
}
.cardheader {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 10px;
  width: 138px;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
.cardheader p {
  margin-left: 6px;
}
.episode {
  font-size: 16px;
  color: #081f32;
  font-weight: 600;
}
.episodeDisplay {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 20px;
}
.infoDisplay {
  display: flex;
  justify-content: space-between;
}
.interestingCharacters {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.share-btn {
  outline: none;
  border: none;
  background-color: #11555f;
  color: white;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 40px;
  margin-left: auto;
}
</style>
