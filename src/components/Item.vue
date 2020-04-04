<template>
  <div class="item" v-bind:class="{ selected: selected }">
    <div 
      class="card" 
      v-bind:class="{ selected: selected }"
      v-bind:style="{'background-image': 'url(' + data.image + ')'}"
      @click="getItemDetails(data)">
    </div>
    <div class="overlay">
      <span class="name">
        {{ data.name }}
      </span>
    </div>
    <div class="left-menu">
      <i 
        class="material-icons"
        @click.prevent="selectItem()"
        v-if="!selected">
        radio_button_unchecked
      </i>
      <i 
        class="material-icons"
        @click.prevent="selectItem()"
        v-else>
        radio_button_checked
      </i>
      <div class="icons">
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
  data: () => ({
    selected: false
  }),
  props: [ 'data' ],
  methods: {
    selectItem() {
      this.selected = !this.selected;
      this.$store.dispatch('selectItem', this.data.id);
    },
    getItemDetails(item) {
      console.log(item.id);
      this.$store.dispatch('getItemById', { id :item.id });
      this.$store.dispatch('setDetailsModal');
      // const itemId = this.items.find(x => x.name === 'Bambou').id;
      // this.$router.push({ path: `/details/${itemId}`, params: item})
    }
  },
}
</script>

<style lang="scss" scoped>
.item.selected {
  border: 10px green;
  color: green;
}
.item {
  margin: 10px 20px 0 0;
  display: flex;
  width: 200px;
  height: 200px;
  transition: all 1s;
  position: relative;
  box-shadow: 5px 5px 20px -4px;
  overflow: hidden;
  cursor: pointer;
  &.selected {
    border: 10px green;
  }
  .card {
    &.selected {
      border: 10px green;
    }
    width: 100%;
    padding: 12px;
    box-shadow: 5px 5px 20px -4px;
    background-position: center;
    background-size: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
  }
  &:hover {
    .left-menu .icons {
      transform: translateX(0px);
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
    top: 12px;
    right: 12px;
    transition: all .3s ease;
    .icons {
      transform: translateX(48px);
      display: flex;
      flex-direction: column;
      transition: all .3s ease;
      
    }
    img {
      padding: 8px 0;
      width: 24px;
      height: 24px;
    }
  }
}
</style>