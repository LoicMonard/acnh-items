<template>
  <div class="navbar">
    <div class="wrapper">
      <div class="left">
        <img src="../assets/item.png">
        <router-link tag="h3" to="">ACNH Items</router-link>
      </div>
      <div class="right">
        <button>Connexion</button>
        <button class="filled">Inscription</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: {
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
  }
}
</style>
