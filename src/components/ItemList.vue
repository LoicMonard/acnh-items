<template>
  <div class="item-list">
    <h1>
      <img src="../assets/item.png"/>
      {{ title }}
    </h1>
    <div class="actions">
      <div class="input-wrapper">
        <label>Rechercher par nom</label>
        <input 
          type="text" 
          v-model="search"/>
      </div>
      <button 
        class="filled"
        @click="contribute()"
        >
        Contribuer
      </button>
      <button 
        class="filled"
        @click="addToList()"
        >
          Ajouter à une liste
      </button>
    </div>
    <div class="legend">
      <img src="../assets/item.png">
      <label>Objet</label>
      <img src="../assets/recipe.png">
      <label>Craftable</label>
      <img src="../assets/money.png">
      <label>Prix en clochettes</label>
    </div>
    <div class="items">
      <transition-group
        name="list" 
        tag="div" 
        class="container">
        <Item 
          class="item"
          v-for="item in items"
          :key="item.name"
          v-bind:data="item"/>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item.vue'
import { db } from '../firebase/firebase.js'
import router from 'vue-router'
import { mapGetters } from 'vuex'

export default {
  name: 'items',
  components: {
    Item
  },
  data: () => ({
    search: '',
    defaultTitle: 'Liste de meubles'
  }),
  props: ["mode"],
  computed: {
    currentList() {
      return this.$store.state.currentList;
    },
    items() {
      if (this.mode === "list" && this.$store.state.items.length && this.$store.state.currentList) {
        return this.$store.state.items.filter(item => this.currentList.items.includes(item.id)).filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
      }
      else if (this.$store.state.items.length) {
        return this.$store.state.items.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
      }
    },
    title() {
      if ( this.mode === "list" && this.currentList.name) {
        return this.currentList.name;
      } else {
        return this.defaultTitle
      }
    }
  },
  methods: {
    getItemDetails(item) {
      this.$store.dispatch('getItemById', { id: item.id });
      this.$store.dispatch('setDetailsModal');
      // const itemId = this.items.find(x => x.name === 'Bambou').id;
      // this.$router.push({ path: `/details/${itemId}`, params: item})
    },
    contribute() {
      this.$router.push('/contribute');
    },
    addToList() {
      this.$store.dispatch('setListModal');
    }
  },
  mounted() {
    if (!this.currentList && this.mode === "list" && this.$route.params.id) {
      this.$store.dispatch('getCurrentList', { id: this.$route.params.id })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    width: 200px;
  }
  h1 {
    text-align: left;
    display: flex;
    align-items: center;
    img {
      margin-right: 8px;
    }
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    > * {
      margin-right: 8px;
    }
    .input-wrapper {
      display: flex;
      flex-direction: column;
    }
    button {
      margin-bottom: 10px;
    }
  }
  .legend {
    display: flex;
    align-items: center;
    img {
      height: 16px;
      margin-right: 4px;
    }
    label {
      margin-right: 8px;
    }
  }
  .items {
    display: flex;
    .container {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }
  }
}
.item {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}
.list-leave-active {
  position: absolute;
}
</style>