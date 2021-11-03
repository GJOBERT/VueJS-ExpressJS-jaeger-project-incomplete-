<template lang="html">
  <div class="main_container">

     <v-btn
    @click="goback"
    class="ma-3 back_button"
    color="orange darken-2"
    dark
    >
        <v-icon
        dark
        left
        >
        mdi-arrow-left
        </v-icon>Retour
    </v-btn>

    <h1 class="display-4">Livre</h1>
    <h2 class="display-2 font-weight-thin">Page de détail d'un livre</h2>

    <div class="rack" v-if="user !== null && isLoggedIn === true">
      <router-link :to="{ name: 'UserProfile', params: {id:user.card_id} }">
          <v-btn color="green" class="white--text pl-0" @click="loader = 'loading3'" text>
          Vers profil
          <v-icon right dark medium>fa-address-card</v-icon>
          </v-btn>
      </router-link>
    </div>
    <div class="rack">
      <router-link :to="{ name: 'AllUsersOverview', params: {} }">
          <v-btn color="green" class="white--text pl-0" @click="loader = 'loading3'" text>
          Vers catalogue
          <v-icon right dark medium>fa-home</v-icon>
          </v-btn>
      </router-link>
    </div>

    <h3 class=".font-weight-bold display-2 youarelate" v-if="diff === 1 && retard === true">Retour: {{diff}} jour de retard</h3>
    <h3 class=".font-weight-bold display-2 youarelate" v-if="diff > 1 && retard === true">Retour: {{diff}} jours de retard</h3>

    <div class="info_block">

      <div class="left_side">
          <img class="Book_illustration" v-bind:src="image_preview_url">

          <div class="mt-4">
            <p>Status emprunt</p>
            <hr>
            <div class="mt-4 loan_status" v-if="book.is_borrowed === 0">
              <span>Status</span>
              <span>Disponible</span>

            </div>
            <div class="mt-4 loan_status"  v-if="book.is_borrowed === 1 && book.borrowed_by !== user.card_id">
              <span>Status</span>
              <span>Indisponible</span>
              <span>Date de retour</span>
              <span>{{retour_date}}</span>
            </div>
            <div class="mt-4 loan_status"  v-if="book.is_borrowed === 1 && book.borrowed_by === user.card_id">
              <span>Status</span>
              <span>Vous empruntez ce livre</span>
              <span>Date de retour</span>
              <span>{{retour_date}}</span>
            </div>

          </div>

      </div>

      <div class="right_side">

        <p class="bookProperty">Title</p>
        <p class="summmary">{{book.title}}</p>

        <p class="bookProperty">Author</p>
        <p class="summmary">{{book.author}}</p>


        <p class="bookProperty">Category</p>
        <p class="summmary">{{book.category}}</p>

        <p class="bookProperty">Year</p>
        <p class="summmary">{{book.year}}</p>

        <p class="bookProperty">Cote</p>
        <p class="summmary">{{book.cote}}</p>

        <p class="bookProperty">Summary</p>
        <p class="summmary">{{book.summary}}</p>

        <p v-if="book.is_borrowed === 1" class="non_dispo">Non disponible</p>
        <p v-if="book.is_borrowed === 0" class="dispo">Disponible</p>

        <br>
        <div class="modal_div">
          <span class="clickhere font-weight-medium" v-if="(user !== null && isLoggedIn === true) && book.is_borrowed === 0 && UserEmprunt === true">
            Cliquez ici pour réserver ce livre avant de venir l'emprunter
          </span>
          <span class="modal" v-if="(user !== null && isLoggedIn === true) && book.is_borrowed === 0 && UserEmprunt === true">
          <ReservationModal 
          :book="book"
          @refresh_book="refresh_book()"
          />
          </span>
        </div>
        <router-link :to="{ name: 'Login_bibliothecaire', params: {} }" v-if="(user === null || isLoggedIn === false) && book.is_borrowed === 0 && UserEmprunt === true">
          <v-btn x-large color="primary" dark>Connectes toi pour réserver ce livre !</v-btn>
        </router-link>
        <v-btn x-large disabled v-if="UserEmprunt === false">Vous avez atteint le maximum d'emprunts !</v-btn>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import jagAPI from '@/api/jagAPI';
import ReservationModal from '@/views/User/catalogue/components/ReservationModal';

export default {
  name:'Book',
  data () {
    return {
      book_id:'',
      book: {},
      retard: false,
      diff: 0,
      image_preview_url: '',
      retour_date: ''
    }
  },
  computed: {
    ...mapState([
      'token',
      'user',
      'isLoggedIn',
      'isLoadingPending',
      'UserEmprunt'
    ])
  },
  methods: {
    goback(){
      this.$router.go(-1);
    },
    difference_date (a, b) {
      return Math.floor(a - b);
    },
    getBook(id) {
      jagAPI.getBook(id)
        .then((response) => {
          this.book = response[0];
          this.image_preview_url = Buffer.from(this.book.image);
          if (this.user !== null && this.isLoggedIn === true && this.book.borrowed_by === this.user.card_id) {
            let a = new Date(this.book.date_end);
            let b = new Date();
            let difference = this.difference_date(a, b);
            this.diff = Math.abs(difference / (1000*60*60*24));
            this.diff = Math.round(this.diff);
            let sign = Math.sign(difference);
            if (sign === -1) {
              this.retard = true; 
            }
          }
          this.retour_date = this.book.date_end.substring(0, 10);
        })
        .catch(err => console.log(err));
    },
    refresh_book() {
      this.getBook(this.book_id);
    }
  },
  mounted() {
    this.book_id = parseInt(this.$route.params.id, 10);
    this.getBook(this.book_id);
  },
  components: {
    ReservationModal
  }
  
}
</script>

<style lang="css" scoped>
.clickhere {
  width: 50%;
  padding-top: 8px;
}
.modal {
  width: 15%;
}

.modal_div {
  display: flex;
  justify-content: left;
}

.loan_status{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 20px;
}

.youarelate {
  color: rgb(189, 52, 52);
  padding: 1rem;
}

.bookProperty {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size: 1.5rem;
  padding-top: 1vh;
  margin: 0;
  word-break: break-word;
}

.bookText {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  width: 85%;
  word-break: break-word;
}

.non_dispo {
  color: #C62828;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
}

.dispo {
  color: #00C853;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
}

.main_container{
  width:80%;
  margin-left:auto;
  margin-right:auto;
  /* background-color:rebeccapurple; */
  display:flex;
  flex-direction: column;
}

.info_block{
  /* background-color: gold; */
  margin-top: 20px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}

.left_side{
  /* background-color: rebeccapurple; */
  flex-basis:30%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
}

.right_side{
  /* background-color: azure; */
  flex-basis:60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height:60%;
}

.Book_illustration{
  width:100%;
  height:500px;
  background-color:black;
  object-fit:contain;
}

.back_button {
  width: 150px;
}

</style>
