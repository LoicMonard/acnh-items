<template>
  <div id="app">
    <img src="./assets/header.png"/>
    <Navbar/>
    <Modal v-if="showDetailsModal"/>
    <ListModal v-if="showListModal"/>
    <CreateListModal v-if="showCreateListModal"/>
    <div class="wrapper">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Modal from '@/components/Modal.vue'
import ListModal from '@/components/ListModal.vue'
import CreateListModal from '@/components/CreateListModal.vue'
import store from './store/index'
import { mapGetters } from 'vuex'
import { auth } from './firebase/firebase'

export default {
  name: 'app',
  data: () => ({
  }),
  computed: {
    showDetailsModal() {
      return this.$store.state.showDetailsModal;
    },
    showListModal() {
      return this.$store.state.showListModal;
    },
    showCreateListModal() {
      return this.$store.state.showCreateListModal;
    }
  },
  components: {
    Navbar,
    Modal,
    ListModal,
    CreateListModal,
    Footer
  },
  methods: {
  },
  mounted() {
    this.$store.dispatch('getAllItems');
    auth.onAuthStateChanged(function(user) {
      if (user) {
        store.dispatch("fetchUser", user);
      } else {
        store.dispatch("fetchUser", user);
      }
    });
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
}

#app {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  > img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-top: 64px;
  }
  > .wrapper {
    width: 70%;
    height: 100%;
    padding-bottom: 84px;
    display: flex;
    box-sizing: border-box;
  }
}

@media only screen and (max-width: 1300px)  {
  #app .wrapper {
    width: 95%;
  }  
}

input[type=text], input[type=email], input[type=password], input[type=number] {
  border: 1px solid rgb(218, 218, 218);
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  outline: inherit;
  background-color: #f3f3f3;
  font-size: 16px;
  font-weight: 400;
  transition: all .3s ease;
  color: rgb(65, 65, 65);
  &:hover {
    border: 1px solid #429D50;
  }
  &:focus {
    outline: none;
    border: 1px solid #429D50;
  }
  &::placeholder {
    color: #696969;
    font-style: italic;
    font-size: 12px;
  }
}
label {
  font-family: niveau-grotesk-small-caps, sans-serif;
  margin: 6px 0;
  text-align: left;
  color: #5f5f5f;
  font-size: 14px;
}

button {
  height: 40px;
  border: 1px solid rgb(4, 173, 4);
  border-radius: 4px;
  color: rgb(4, 173, 4) !important;
  padding: 8px 20px;
  font-size: 16px;
  outline: inherit;
  color: inherit;
  background-color: inherit;
  font-family: niveau-grotesk-small-caps, sans-serif;
  font-weight: 400;
  font-style: normal;
  cursor: pointer;
  transition: all .2s ease;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 14px;
    margin-left: 4px;
  }
}
button.rounded {
  border-radius: 16px;
}
button.filled {
  background-color: rgb(4, 173, 4);
  color: #fff !important;
}
button:hover {
  background: rgb(4, 173, 4);
  color: #fff !important;
}
button.filled:hover {
  background: inherit;
  color: rgb(4, 173, 4) !important;
}
.colored {
  color: #ff7675;
}

@media only screen and (max-width: 425px)  {
  button {
    font-size: 14px;
    padding: 4px 10px;
  }
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #04ad04; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #048504; 
}
</style>
