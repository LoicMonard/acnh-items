<template>
  <div class="item-details">
    <div class="wrapper">
      <img :src="item.image"/>
      <div class="details">
        <h3>{{ item.name }}</h3>
        <div class="recipe">
          <div class="wrapper">
            <img src="../assets/recipe.png">
            <h4>Recette de craft</h4>
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
            <h4>Prix du catalogue</h4>
          </div>
          <div class="item-price">
            <span class="item-price">{{ item.price }} clochettes</span>
          </div>
        </div>
        <div class="obtention">
          <div class="wrapper">
            <img src="../assets/item.png">
            <h4>Moyen d'obtention</h4>
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
        padding: 24px;
        text-align: left;
        h3 {
          margin-top: 0;
          margin-bottom: 12px;
        }
        h4 {
          margin: 12px 0;
        }
        .recipe, .price, .obtention {
          width: 100%;
          display: flex;
          flex-direction: column;
          .wrapper {
            align-items: center;
          }
          img {
            width: 18px;
            height: 18px;
            margin-right: 4px;
          }
        }
      }
    }
}
</style>