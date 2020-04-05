<template>
  <div class="item-details">
    <div class="wrapper">
      <img :src="item.image"/>
      <div class="details">
        <h3>{{ item.name }}</h3>
        <div 
          class="recipe"
          v-if="item.recipeItems">
          <div class="wrapper">
            <h4>Recette de craft</h4>
          </div>
          <div
            class="recipe-list"
            v-for="recipe in item.recipeItems"
            :key="recipe.name">
            <span class="item-name">{{ recipe.name }}</span>
            <span class="item-quantity">{{ recipe.quantity }}</span>
          </div>
        </div>
        <div 
          class="price"
          v-if="item.price">
          <div class="wrapper">
            <h4>Prix du catalogue</h4>
          </div>
          <div class="item-price">
            <span class="item-price">{{ item.price }} clochettes</span>
          </div>
        </div>
        <div class="obtention">
          <div class="wrapper">
            <h4>Moyen d'obtention</h4>
          </div>
          <div class="item-obtention">
            <span class="item-obtention">{{ item.obtention }}</span>
          </div>
        </div>
        <div class="size">
          <div class="wrapper">
            <h4>Taille</h4>
          </div>
          <span>{{ item.size.length }} x {{ item.size.width }}</span>
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
    > .wrapper {
      display: flex;
      width: 100% !important;
      .details {
        display: flex;
        flex-direction: column;
        flex: 1;
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
        .recipe {
          .recipe-list {
            max-width: 400px;
            padding: 4px 8px;
            margin: 2px 0;
            border-radius: 4px;
            display: flex;
            justify-content: space-between;
            background: #e9e9e9;  
            color: #000;
            font-style: italic;
            border-left: 3px solid rgb(4, 173, 4);
            i {
              align-self: flex-end;
              cursor: pointer;
            }
          }
        }
      }
    }
}
</style>