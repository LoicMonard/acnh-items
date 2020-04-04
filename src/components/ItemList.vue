<template>
  <div class="item-list">
    <h1>Items</h1>
    <input type="text" v-model="search"/>
    <div class="items">
      <transition-group name="list" tag="div" class="container">
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
  }
}
</script>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  h1 {
    text-align: left;
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