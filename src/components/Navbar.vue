<template>
  <div class="navbar">
    <div class="wrapper">
      <div class="left">
        <router-link 
          to="/items"
          tag="div">
          <img src="../assets/item.png">
          <h3>ACNH Items</h3>
        </router-link>
        <div>
          <Dropdown v-bind:data="lists"/>
        </div>
        <button 
          class="filled"
          @click="contribute()"
          >
          Contribuer
        </button>
      </div>
      <div class="right">
        <button 
          v-if="!user.email"
          class="filled"
          @click="googleRegister()">
          Connexion
        </button>
        <div 
          class="connected"
          v-else>
          <span>Bienvenue</span>
          <span class="user-display-name"> {{ user.displayName }}</span>
          <i 
            class="material-icons"
            @click="signOut()">
            power_settings_new
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, authObj } from '../firebase/firebase'
import Dropdown from '@/components/Dropdown.vue'

export default {
  name: 'navbar',
  props: {
  },
  components: {
    Dropdown
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    lists() {
      return this.$store.state.lists
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
    signOut() {
      const provider = new authObj.GoogleAuthProvider();
      auth
        .signOut()
        .then(() => {
          this.$router.replace({
            path: ""
          });
        });
    },
    contribute() {
      this.$router.push('/contribute');
    },
  }
}
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100vw;
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
        padding: 4px 16px !important;
        height: 33px;
        font-size: 14px;
      }
    }
    .left > div {
      display: flex;
      align-items: center;
      margin-right: 4px;
      cursor: pointer;
    }
    .right {
      .connected {
        font-style: italic;
        display: flex;
        .user-display-name {
          font-weight: 500;
          margin: 0 4px;
        }
        i {
          cursor: pointer;
        }
      }
    }
  }
}

@media only screen and (max-width: 600px)  {
  .navbar {
    .wrapper {
      .left {
        h3 {
          display: none;
        }
      }
    }
  }
}
</style>
