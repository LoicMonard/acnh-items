<template>
  <div class="item">
    <div class="card" v-bind:style="{'background-image': 'url(' + data.image + ')'}">
      <div class="overlay">
        <span class="name">
          {{ data.name }}
        </span>
      </div>
      <div class="left-menu">
        <img src="../assets/item.png">
        <img src="../assets/money.png">
        <img src="../assets/recipe.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: [ 'data' ]
}
</script>

<style lang="scss" scoped>
.item {
  margin: 10px 20px 0 0;
  display: flex;
  width: 200px;
  height: 200px;
  transition: all 1s;
  cursor: pointer;
  .card {
    width: 100%;
    padding: 12px;
    box-shadow: 9px 7px 40px -6px;
    background-position: center;
    background-size: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    &:hover {
      .left-menu {
        transform: translateX(-12px);
        opacity: 1;
      }
    }
    .overlay {
      position: absolute;
      width: 100%;
      bottom: 0px;
      left: 0;
      box-sizing: border-box;
      padding: 4px;
      opacity: 0.7;
      box-shadow: 9px 7px 40px -6px;
      .name {
        font-weight: bold;
        left: -10px;
        bottom: 20px;
      }
    }
    .left-menu {
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 0;
      transform: translateX(36px);
      transition: all .3s ease;
      opacity: 0;
      img {
        padding: 8px 0;
      }
    }
  }
}
</style>