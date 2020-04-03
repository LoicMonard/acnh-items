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

</style>
