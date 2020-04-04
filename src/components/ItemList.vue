<template>
  <div class="item-list">
    <h1>
      <img src="../assets/item.png"/>
      Liste des meubles
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
          v-bind:data="item"
          @click.native="getItemDetails(item)"/>
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
    search : ''
  }),
  computed: {
    items() {
      if (this.$store.state.items.length) {
        return this.$store.state.items.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));;
      }
    }
  },
  methods: {
    getItemDetails(item) {
      console.log(item.id);
      this.$store.dispatch('getItemById', { id :item.id });
      this.$store.dispatch('setModal');
      // const itemId = this.items.find(x => x.name === 'Bambou').id;
      // this.$router.push({ path: `/details/${itemId}`, params: item})
    },
    contribute() {
      this.$router.push('/contribute');
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
  .items {
    display: flex;
    .container {
      display: flex;
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