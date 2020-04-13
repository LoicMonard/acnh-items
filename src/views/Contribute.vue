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
        avant d'être publiée. Par respect de la communauté, nous vous demandons d'être le plus précis sur les informations que vous publiez.
      </p>
    </div>
    <div class="drag-zone">
      <label>Reconnaître un meuble à l'aide d'une image</label>
      <div class="warning">L'analyse du texte de l'image peut s'avérer aléatoire et demande une vérification de votre part.</div>
      <input 
      ref="input"
      type="file"
      accept="image/*"
      @change="setImage">
      <div>
        <div v-if="imgSrc">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="1/1"
            :src="imgSrc"
            preview=".preview"
          />
          <div class="multiple-input">
            <button 
              @click="cropImage()"
              class="filled">
              Redimensionner l'image
            </button>
            <button 
              @click="recognizeMultiple()"
              class="filled">
              Analyser
            </button>
            <ClipLoader :loading="loading"></ClipLoader>
          </div>
        </div>
      </div>
    </div>
    <label>
      Type de l'objet
    </label>
    <div class="multiple-input type">
      <div 
        class="multiple-input"
        v-for="type in types"
        :key="type.name"
        @click="item.type = type.type">
        <i 
          class="material-icons"
          v-if="item.type !== type.type">
          radio_button_unchecked
        </i>
        <i 
          class="material-icons"
          v-else>
          radio_button_checked
        </i>
        <span>{{ type.name }}</span>
      </div>
    </div>
    <label>
      Nom de l'objet
      <span class="colored">{{ nameError }}</span>
    </label>
    <input 
      type="text"
      v-model="item.name">
    <label>Image de l'objet</label>
    <input 
      type="text"
      placeholder="Url"
      v-model="item.image">
    <img 
      class="preview"
      v-if="item.image"
      :src="item.image">
    <label>Prix de l'objet</label>
    <input 
      type="number"
      v-model="item.price"
      min="0">
    <label>Moyen d'obtention de l'objet</label>
    <input 
      type="text"
      v-model="item.obtention">
    <label>Taille de l'objet</label>
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
      <label>Recette de l'objet</label>
      <div 
        class="items-in-recipe"
        v-for="(item, index) in item.recipeItems"
        :key="item.name">
        <div class="wrapper">
          <span><input type="text" v-model="item.name"></span>
          <span class="quantity">
             <span class="separator">x</span><input type="number" v-model="item.quantity" min="1">
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
            v-model="recipe.name"
            autocomplete="news">
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
    <div class="multiple-input">
      <button @click="resetForm()">
        Réinitialiser le formulaire
      </button>
      <button 
        @click="checkUser()"
        class="submit">
        Ajouter ma contribution
      </button>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase/firebase.js'
import { auth, authObj } from '../firebase/firebase'
import axios from 'axios'
import VueCropper from 'vue-cropperjs';
import { createWorker, createScheduler, PSM, OEM } from 'tesseract.js';
import Toasted from 'vue-toasted'
import 'cropperjs/dist/cropper.css';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'contribute',
  data: () => ({
    toggle: false,
    loading: false,
    imgSrc: '',
    croppedImgSrc: '',
    item: {
      type: 'object',
      name: '',
      image: '',
      price: null,
      obtention: null,
      size: {
        length: null,
        width: null
      },
      recipeItems: [],
    },
    recipe: {
      name: '',
      quantity: 1
    },
    types: [
      { name: 'Objet', type: 'object' },
      { name: 'Ressource', type: 'resource' },
      { name: 'Fossile', type: 'fossil' },
      { name: 'Outil', type: 'tool' },
      { name: 'Sol', type: 'floor' },
      { name: 'Mur', type: 'wall' },
      { name: 'Clotûre', type: 'fence' },
      { name: 'Vêtement', type: 'clothing' },
      { name: 'Consommable', type: 'consumable' }
    ]
  }),
  components: {
    VueCropper,
    ClipLoader
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    items() {
      if (this.$store.state.items.length) {
        const subset = this.$store.state.items.filter(item => item.type == "resource");
        return subset.filter(item => item.name.toLowerCase().includes(this.recipe.name.toLowerCase()));
      }
    },
    nameError() {
      return this.item.name ? "" : "Ce champ est obligatoire";
    }
  },
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
    checkUser() {
      if (!this.user.email) {
        const provider = new authObj.GoogleAuthProvider();
        auth
          .signInWithPopup(provider)
          .then(data => {
            this.sendContribution();
          })
          .catch(err => {
            console.error(err.message);
          });
      } else {
        this.sendContribution();
      }
    },
    sendContribution() {
      if (!this.item.name) {
        this.$toasted.error("Veuillez remplir le champ nom de l'objet", { duration: 3000, position: 'bottom-right', fitToScreen: true});
      } else {
        db.collection('contributions')
        .add(this.item)
        .then(res => {
          this.$toasted.success('Contribution envoyée', { duration: 3000, position: 'bottom-right', fitToScreen: true});
        })
      }
    },
    setImage(e) {
      const file = e.target.files[0];

      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      const dataUrl = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.uploadImage(dataUrl);
    },
    uploadImage(data) {
      let that = this;
      axios.post('https://api.imgur.com/3/image', 
      {
        image: data.replace("data:image/png;base64,", ""),
        type: 'base64'
      },
      { headers: { Authorization: "Client-ID 3945587cfaf0961"}} )
      .then(function (response) {
        console.log(response.data.data.link);
        that.item.image = response.data.data.link;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    async recognizeMultiple() {
      this.loading = !this.loading;
      const img = document.querySelector('.cropper-hidden');
      const scheduler = createScheduler();
      const worker1 = createWorker();
      const worker2 = createWorker();
      const name = { left: 130, top: 68, width: 450, height: 101 };
      const recipe = { left: 736, top: 144, width: 1000, height: 432 };
      const rectangles = [name, recipe]
      await worker1.load();
      await worker2.load();
      await worker1.loadLanguage('eng+fra');
      await worker2.loadLanguage('eng+fra');
      await worker1.initialize('eng+fra');
      await worker2.initialize('eng+fra');
      scheduler.addWorker(worker1);
      scheduler.addWorker(worker2);
      const results = await Promise.all(rectangles.map((rectangle) => (
        scheduler.addJob('recognize', img, { rectangle })
      )));
      await scheduler.terminate();
      this.cleanResults(results);
    },
    cleanResults(results) {
      for(let i = 0; i < results.length; i++) {
        if (i === 0) {
          this.item.name = results[i].data.lines[0].text.replace(/[^a-zA-Z-éàêèÉ ]/g, '')
          const sizeSubstring = results[i].data.lines[1].text.replace(/[^x0-9]/g, "");

          this.item.size.length = sizeSubstring.substring(0, sizeSubstring.indexOf('x'))
          this.item.size.width = sizeSubstring.substring(sizeSubstring.indexOf('x') + 1, sizeSubstring.length)
        }
        if(i === 1) {
          this.item.recipeItems = [];
          results[i].data.lines.forEach(elem => {
            if(elem.text.match(/^([a-zA-Z]{3})/)) {
              this.recipe.name = elem.text.replace(/[^a-zA-Z-éàêèÉ ]/g, '').replace(/[@_ $0-9A-Z-]+$/, "")
              const recipeQuantity = elem.text.replace(/[^\/0-9]/g, "")
              this.recipe.quantity = recipeQuantity.substring(recipeQuantity.indexOf('/') + 1, recipeQuantity.length);
              this.addToRecipe();
              this.recipe.name = "",
              this.recipe.quantity = 1;
            }
          })
        }
      }
      this.loading = !this.loading;
    },
    resetForm() {
      this.item.name = '';
      this.item.image = '';
      this.item.price = null;
      this.item.obtention = '';
      this.item.size = { length: null, width: null};
      this.item.recipeItems = [];
      this.recipe.name = "",
      this.recipe.quantity = 1;
    }
  },
}
</script>

<style lang="scss" scoped>
.contribute {
  width: 100%;
  text-align: start;
  display: flex;
  flex-direction: column;
  .drag-zone {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
    .warning {
      background-color: #eeeeee;
      padding: 6px 10px;
      font-size: 14px;
      border-radius: 4px;
      margin: 4px 0;
      text-align: left;
      box-sizing: border-box;
      border-left: 3px solid rgb(233, 212, 24);
    }
    .multiple-input {
      margin-top: 4px;
    }
  }
  .preview {
    max-width: 200px;
    height: 200px;
  }
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
    flex-wrap: wrap;
    input, > button {
      margin-right: 4px;
    }
    .autocomplete {
      position: relative;
      .results {
        position: absolute;
        z-index: 10;
        top: 40px;
        width: 100%;
        max-height: 300px;
        overflow: auto;
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
      max-width: 600px;
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
      .separator {
        margin: 0 4px;
      }
      input {
        height: 20px;
        margin: 0;
        padding: 4px;
        background-color:#202020;
        color: #fff;
      }
      input[type=number] {
        width: 40px;
      }
    }
  }
  .type {
    margin: 0 4px 10px 0;
    cursor: pointer;
    > div { 
      margin-right: 4px;
      i {
        margin-right: 4px;
      }
    }
  }
  > .multiple-input {
    .submit {
      flex: 1;
    }
    .reset {
    }
  }
}
</style>