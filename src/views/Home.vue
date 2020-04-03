<template>
  <div class="home">
    <img src="../assets/header.png"/>
    <div class="wrapper">
      <ItemList/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import ItemList from '@/components/ItemList.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    ItemList
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  img {
    width: 100%;
  }
  .wrapper {
    width: 70%;
    display: flex;
    
  }
}
</style>