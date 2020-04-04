<template>
  <div id="app">
    <Navbar/>
    <Modal v-if="showModal"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Modal from '@/components/Modal.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data: () => ({
  }),
  computed: {
    showModal() {
      return this.$store.state.showModal;
    }
  },
  components: {
    Navbar,
    Modal
  },
  methods: {
    // ...mapActions(['getAllItems'])
  },
  created() {
    this.$store.dispatch('getAllItems');
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

input[type=text], input[type=email], input[type=password] {
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

</style>
