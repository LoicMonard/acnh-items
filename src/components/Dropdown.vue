<template>
    <div 
      class="dropdown"
      v-bind:class="{active: toggle}">
      <div 
        class="dropdown-header"
        @click="toggle = !toggle">
        <span>Mes listes</span>
        <i class="material-icons">expand_more</i>
      </div>
      <transition name="fade">
        <div 
          class="dropdown-wrapper"
          v-if="toggle">
          <div class="item-list">
            <div 
              class="dropdown-item"
              v-for="item in data"
              :key="item.id"
              @click="checkUser(item)">
              {{ item.name }}
            </div>
          </div>
          <div class="separator">
            &nbsp;
          </div>
          <div class="dropdown-footer">
            <button 
              class="filled"
              @click="showCreateListModal()">
              Créer une nouvelle liste
            </button>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { auth, authObj } from '../firebase/firebase'

export default {
  name: 'dropdown',
  data: () => ({
    toggle: false
  }),
  props: [
    'data'
  ],
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    goToLists() {
      this.$router.push({ path: '/lists' });
    },
    pickList(list) {
      this.selectedList = list;
      this.$store.dispatch('setCurrentList', list)
      this.$router.push({ path: `/lists/${list.id}`})
    },
    checkUser(data) {
      if (!this.user.email) {
        const provider = new authObj.GoogleAuthProvider();
        auth
          .signInWithPopup(provider)
          .then(data => {
            this.goToLists();
          })
          .catch(err => {
            console.error(err.message);
          });
      } else {
        this.pickList(data);
      }
    },
    showCreateListModal() {
      this.$store.dispatch('setCreateListModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  .dropdown-header {
    display: flex;
    font-weight: 500;
    cursor: pointer;
    i {
      transform: rotate(-90deg);
      transition: all .3s ease;
      font-size: 20px;
      margin: 0 4px;
    }
  }
  .dropdown-wrapper {
    max-width: 300px;
    width: max-content;
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid rgb(219, 219, 219);
    border-radius: 8px;
    transition: all .3s ease;
    .dropdown-item {
      padding: 4px 12px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        background-color: rgb(245, 245, 245);;
      }
      &:first-child {
        margin-top: 10px;
      }
      &:last-child {
        margin-bottom: 10px;
      }
    }
    .item-list {
      max-height: 150px;
      overflow-y: auto;
    }
    .separator {
      border-top: 1px solid rgb(207, 207, 207);
    }
    .dropdown-footer {
      padding: 4px 12px;
      button {
        font-size: 14px;
        margin: 4px 0;
        padding: 4px 8px;
        flex: 1;
        height: inherit;
      }
    }
  }
}
.dropdown.active {
  i {
    transform: rotate(0);
  }
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.fade-leave-active {
  position: absolute;
}
</style>