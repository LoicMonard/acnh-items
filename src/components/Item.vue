<template>
  <div 
    class="item"
    v-bind:class="[{ selected: selected }, data.type]">
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
        <div
          class="price"
          v-if="data.price">
          <img src="../assets/money.png">
          <div class="price-overlay">
            <span>{{ data.price }}</span>
          </div>
        </div>
        <img 
          src="../assets/recipe.png"
          v-if="hasRecipe()">
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
    hasRecipe() {
      if (this.data.recipeItems) {
        if (this.data.recipeItems.length) {
          return true;
        }
      } else {
        return false
      }
    },
    selectItem() {
      this.selected = !this.selected;
      this.$store.dispatch('selectItem', this.data.id);
    },
    getItemDetails(item) {
      this.$store.dispatch('getItemById', { id :item.id });
      this.$store.dispatch('setDetailsModal');
    }
  },
}
</script>

<style lang="scss" scoped>
.item.selected {
  border: 10px green;
  color: green;
}
.resource {
  display: none !important;
}
.item {
  margin: 20px 20px 0 0;
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
    background-size: cover;
    display: flex;
    position: relative;
    overflow: hidden;
  }
  &:hover {
    .left-menu .icons {
      transform: translateX(0px);
      opacity: 1;
    }
    .price:hover {
      .price-overlay > span {
        opacity: 1;
      }
    }
  }
  .price {
    position: relative;
    .price-overlay > span {
      position: absolute !important;
      left: -46px;
      top: 5px;
      opacity: 0;
      padding: 4px;
      color: #fff;
      background-color: #000;
      transition: all .3s ease;;
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
    background-color: #fff;
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

@media only screen and (max-width: 1024px)  {
  .item {
    width: 150px;
    height: 150px;
  }
}

@media only screen and (max-width: 425px)  {
  .item {
    width: 100px;
    height: 100px;
    margin: 5px;
    .overlay {
      font-size: 12px;
    }
    .left-menu {
      top: 4px;
      right: 4px;
      i {
        font-size: 16px;
      }
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}

</style>