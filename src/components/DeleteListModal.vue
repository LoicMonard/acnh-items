<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3><img src="../assets/item.png">Supprimer une liste</h3>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sur de vouloir supprimer la liste <span class="listName">{{ currentList.name }}</span> ?</p>
          </div>
          <div class="modal-footer">
            <button 
              class="filled"
              @click="closeModal()">
              Annuler
            </button>
            <button 
              class="filled"
              @click="deleteList(list)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ItemDetails from '@/views/ItemDetails.vue';
import { db } from '../firebase/firebase.js'
import { auth, authObj } from '../firebase/firebase'

export default {
  name: 'modal',
  data: () => ({
    listName: ''
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
    currentList() {
      return this.$store.state.currentList;
    }
  },
  methods: {
    closeModal() {
      this.$store.dispatch('setDeleteListModal');
    },
    deleteList(list) {
      this.$store.dispatch('deleteList').then(res => {
        this.$router.push('/items');
        this.$toasted.success('Liste supprimée', { duration: 3000, position: 'bottom-right', fitToScreen: true});
        this.$store.dispatch('setDeleteListModal');
      }, error => {

      })
    },
  },
  components: {
    ItemDetails
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  padding: 24px;
  box-sizing: border-box;

}

.modal-header h3 {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0;
  img {
    height: 24px;
    margin-right: 4px;
  }
}

.modal-body {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  h4 {
    margin: 10px 0;
  }
  .listName {
    font-weight: 500;
    font-style: italic;
  }
  .multiple-input {
    display: flex;
    button {
      margin-left: 4px;
    }
  }
  .lists {
    .list {
      display: flex;
      align-items: center;
      padding: 4px 0;
      i {
        margin-top: 2px;
        margin-right: 4px;
        font-size: 20px;
      }
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: 4px;
  }
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>