<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3><img src="../assets/item.png">Créer une nouvelle liste</h3>
          </div>
          <div class="modal-body">
            <label>Nom de la liste</label>
            <div class="multiple-input">
              <input
                type="text"
                v-model="listName">
            </div>
          </div>
          <div class="modal-footer">
            <button 
              class="filled"
              @click="closeModal()">
              Annuler
            </button>
            <button 
              class="filled"
              @click="checkUser()">
              Créer
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
  },
  methods: {
    closeModal() {
      this.$store.dispatch('setCreateListModal');
    },
    createList() {
      this.$store.dispatch('createList', { name: this.listName, author: this.user, id: 0 }).then(res => {
        this.$toasted.success('Liste créée', { duration: 3000, position: 'bottom-right', fitToScreen: true});
      }, error => {

      })
    },
    checkUser() {
      if (!this.user.email) {
        const provider = new authObj.GoogleAuthProvider();
        auth
          .signInWithPopup(provider)
          .then(data => {
            this.createList();
            this.$store.dispatch('setCreateListModal')

          })
          .catch(err => {
            console.error(err.message);
          });
      } else {
        this.createList();
        this.$store.dispatch('setCreateListModal')
      }
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