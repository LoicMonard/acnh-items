<template>
  <div class="list-view">
    <div 
      class="lists"
      v-if="user.email">
      <h3><img src="../assets/item.png">Mes listes</h3>
      <p class="advertising">Selectionnez une liste et copiez l'url pour partager votre liste à un autre joueur</p>
      <div 
        class="list"
        v-for="list in lists"
        :key="list.name">
        <i 
          class="material-icons"
          @click.prevent="pickList(list)"
          v-if="list.name == selectedList.name">
          radio_button_checked
        </i>
        <i 
          class="material-icons"
          @click.prevent="pickList(list)"
          v-else>
          radio_button_unchecked
        </i>
        <span class="list-name">
          {{ list.name }}
        </span>
      </div>
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
  methods: {
    pickList(list) {
      this.selectedList = list;
      this.$store.dispatch('setCurrentList', list)
      this.$router.push({ path: `/lists/${list.id}`})
    }
  }
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