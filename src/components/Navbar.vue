<template>
  <div class="navbar">
    <div class="wrapper">
      <div class="left">
        <img src="../assets/item.png">
        <router-link tag="h3" to="">ACNH Items</router-link>
      </div>
      <div class="right">
        <button 
          v-if="!user"
          class="filled"
          @click="googleRegister()">
          Connexion
        </button>
        <div class="connected">
          Bienvenue <span class="user-display-name">{{ user }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, authObj } from '../firebase/firebase'

export default {
  name: 'navbar',
  props: {
  },
  computed: {
    user() {
      return this.$store.state.user.displayName
    }
  },
  methods: {
    googleRegister() {
      const provider = new authObj.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(data => {
        })
        .catch(err => {
          console.error(err.message);
        });
    },
  }
}
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background: #fff;
  display: flex;
  justify-content: center;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    .left, .right {
      display: flex;
      align-items: center;
      img {
        height: 30px;
        margin: 0 4px;
      }
      button {
        margin: 0 4px;
      }
    }
    .right {
      .connected {
        font-style: italic;
        .user-display-name {
          font-weight: 500;
        }
      }
    }
  }
}
</style>
