<template>
  <div class="item-details">
    <h1>{{ item.name }}</h1>
    <div class="wrapper">
      <img :src="item.image"/>
      <div class="details">
        <div class="recipe">
          <div class="wrapper">
            <img src="../assets/recipe.png">
            <h3>Recette de craft</h3>
          </div>
          <div
            class="recipe-list"
            v-for="item in recipe"
            :key="item.name">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-quantity">{{ item.quantity }}</span>
          </div>
        </div>
        <div class="price">
          <div class="wrapper">
            <img src="../assets/money.png">
            <h3>Prix du catalogue</h3>
          </div>
          <div class="item-price">
            <span class="item-price">{{ item.price }} clochettes</span>
          </div>
        </div>
        <div class="obtention">
          <div class="wrapper">
            <img src="../assets/item.png">
            <h3>Moyen d'obtention</h3>
          </div>
          <div class="item-obtention">
            <span class="item-obtention">{{ item.obtention }} Cadeau</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'item-details',
  data: () => ({
    recipe: [
      { name: "Bambou", quantity: 3, price: 3000 }
    ]
  }),
  computed: {
    item() {
      return this.$store.state.currentItem;
    }
  },
}
</script>

<style lang="scss" scoped>
.item-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
    .wrapper {
      display: flex;
      width: 100%;
      .details {
        width: 100%;
        margin-left: 24px;
        text-align: left;
        .recipe, .price, .obtention {
          width: 100%;
          display: flex;
          flex-direction: column;
          .wrapper {
            align-items: center;
          }
          img {
            width: 24px;
            height: 24px;
          }
        }
      }
    }
}
</style>