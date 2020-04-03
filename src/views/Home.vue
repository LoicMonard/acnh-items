<template>
  <div class="home">
    <img src="../assets/header.png"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>