<template>
  <div id="app">
    <Navbar/>
    <Modal v-if="showDetailsModal"/>
    <ListModal v-if="showListModal"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/Modal.vue'
import ListModal from '@/components/ListModal.vue'
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
    }
  },
  components: {
    Navbar,
    Modal,
    ListModal
  },
  methods: {
    // ...mapActions(['getAllItems'])
  },
  mounted() {
    this.$store.dispatch('getAllItems');
    this.$store.dispatch('getAllLists');
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
  text-align: center;
  color: #2c3e50;
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
</style>
