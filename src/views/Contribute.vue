<template>
  <div class="contribute">
    <h1>
      <img src="../assets/item.png"/>
      Contribuer
    </h1>
    <div class="advertising">
      <p>
        ACNH Items est un site fait à base de contributions, la liste des meubles n'étant pas exhaustive, nous vous invitons à contribuer au 
        maximum pour améliorer le catalogue. 
        <br>Afin de ne pas collecter des informations éronnées, chaque contribution fera l'objet d'une vérification
        avant d'être publiée. Par respect de la communauté, nous vous demandons d'être au maximum certain des informations que vous publiez.
      </p>
    </div>
    <label>
      Nom du meuble
      <span class="colored">{{ nameError }}</span>
    </label>
    <input 
      type="text"
      v-model="item.name">
    <label>Image du meuble</label>
    <input 
      type="text"
      placeholder="Url"
      v-model="item.image">
    <label>Prix du meuble</label>
    <input 
      type="number"
      v-model="item.price"
      min="0">
    <label>Moyen d'obtention du meuble</label>
    <input 
      type="text"
      v-model="item.obtention">
    <label>Taille du meuble</label>
    <div class="multiple-input">
      <input 
        type="number"
        placeholder="Longueur"
        v-model="item.size.length">
      <input 
        type="number"
        placeholder="Largeur"
        v-model="item.size.width">
    </div>
    <div class="recipe">
      <label>Recette du meuble</label>
      <div 
        class="items-in-recipe"
        v-for="(item, index) in item.recipeItems"
        :key="item.name">
        <div class="wrapper">
          <span>{{ item.name }}</span>
          <span class="quantity">
            x {{ item.quantity }}
          </span>
        </div>
        <i 
          class="material-icons"
          @click="removeRecipeItem(index)">
          clear
        </i>
      </div>
      <div class="multiple-input">
        <div class="autocomplete">
          <input 
            type="text"
            placeholder="Nom de l'ingrédient"
            @blur="toggle = false" 
            @focus="toggle = true"
            v-model="recipe.name">
          <div class="results" v-if="toggle">
            <div class="result"
              v-for="item in items"
              :key="item.name"
              @click="selectResult(item)" @mousedown.prevent>
              <span>
                {{ item.name }}
              </span>
            </div>
          </div>
        </div>
        <input 
          type="number"
          placeholder="Quantité"
          min="1"
          v-model="recipe.quantity">
        <button 
          class="filled"
          @click="addToRecipe()">
          Ajouter
        </button>
      </div>
    </div>
    <button @click="sendContribution()">
      Ajouter ma contribution
    </button>
  </div>
</template>

<script>
import { db } from '../firebase/firebase.js'

export default {
  name: 'contribute',
  data: () => ({
    toggle: false,
    item: {
      name: '',
      image: '',
      price: null,
      obtention: null,
      size: {
        length: null,
        width: null
      },
      recipeItems: []
    },
    recipe: {
      name: '',
      quantity: 1
    }
  }),
  methods: {
    selectResult(item) {
      this.recipe.name = item.name;
      this.toggle = false;
    },
    addToRecipe() {
      if (!this.item.recipeItems.find(item => item.name === this.recipe.name) && this.recipe.name) {
        this.item.recipeItems.push({name: this.recipe.name, quantity: this.recipe.quantity});
      }
    },
    removeRecipeItem(index) {
      this.item.recipeItems.splice(index, 1)
    },
    sendContribution() {
      db.collection('contributions')
        .add(this.item)
        .then(res => {
          console.log('ok');
        })
    }
  },
  computed: {
    items() {
      if (this.$store.state.items.length) {
        return this.$store.state.items.filter(item => item.name.toLowerCase().includes(this.recipe.name.toLowerCase())).slice(0, 3);
      }
    },
    nameError() {
      return this.item.name ? "" : "Ce champ est obligatoire";
    }
  }
}
</script>

<style lang="scss" scoped>
.contribute {
  width: 100%;
  text-align: start;
  display: flex;
  flex-direction: column;
  .advertising {
    box-sizing: border-box;
    color: #fff;
    border-radius: 8px;
    > p {
      background-color: #202020;
      padding: 10px 18px;
      margin: 10px 0;
      border-radius: 4px;
      margin: 20px 0;
      text-align: left;
      box-sizing: border-box;
      border-left: 3px solid rgb(4, 173, 4);
      color: rgb(223, 223, 223);
    }
  }
  .multiple-input {
    display: flex;
    input, > button {
      margin-right: 4px;
    }
    .autocomplete {
      position: relative;
      .results {
        position: absolute;
        top: 40px;
        width: 100%;
        background: #fff;  
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        .result {
          padding:  8px;
          box-sizing: border-box;
          font-size: 14px;
          &:hover {
            background: #efefef;
          }
        }
      }
    }
  }
  .recipe {
    label {
      padding: 10px 0 !important;
    }
    .items-in-recipe {
      max-width: 400px;
      padding: 4px 8px;
      margin: 6px 0;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
      background: #202020;  
      color: rgb(235, 235, 235);
      font-style: italic;
      border-left: 3px solid rgb(4, 173, 4);
      i {
        align-self: flex-end;
        cursor: pointer;
      }
    }
  }
}
</style>