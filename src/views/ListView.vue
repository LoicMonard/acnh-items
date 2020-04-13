<template>
  <div class="list-view">
    <div 
      class="lists"
      v-if="user.email">
      <p class="advertising">Selectionnez une liste et copiez l'url pour partager votre liste à un autre joueur</p>
    </div>
    <ItemList 
      mode="list"/>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
  name: 'list-view',
  components: {
    ItemList
  },
  data: () => ({
    selectedList: ''
  }),
  computed: {
    lists() {
      if (this.$store.state.lists.length) {
        return this.$store.state.lists;
      }
    },
    user() {
      return this.$store.state.user;
    },
    currentList() {
      return this.$store.state.currentList;
    },
  },
}
</script>

<style lang="scss" scoped>
.list-view {
  h3 {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      height: 24px;
      margin-right: 4px;
    }
  }
  .lists {
    display: flex;
    .advertising {
      background-color: #f5f5f5;
      padding: 10px 18px;
      margin: 10px 0;
      border-radius: 4px;
      margin: 20px 0;
      text-align: left;
      box-sizing: border-box;
      border-left: 3px solid rgb(4, 173, 4);
      color: rgb(44, 44, 44);
    }
    .list {
      display: flex;
      align-items: center;
      padding: 4px 0;
      i {
        margin-top: 2px;
        margin-right: 4px;
        font-size: 20px;
        cursor: pointer;
      }
    }
}
}
</style>