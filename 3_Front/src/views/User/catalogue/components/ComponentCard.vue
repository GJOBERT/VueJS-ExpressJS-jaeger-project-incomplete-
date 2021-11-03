<template lang="html">
    <v-card class="mx-auto animate__animated animate__fadeIn card">
        <div class="image_container">
          <img v-if="!is_image_loading"
          v-bind:src="current_image_src"
          class="card_photo"
          >

          <!-- <v-progress-circular
          v-if="is_image_loading"
          indeterminate
          size="150"
          color="primary"
          ></v-progress-circular> -->

          <img v-if="is_image_loading"
          src="https://media.giphy.com/media/MDrmyLuEV8XFOe7lU6/giphy.gif"
          class="card_photo_placeholder"
          >

        </div>

        <v-card-title >
        {{book_object.title}}
        </v-card-title>

        <v-card-subtitle>
        {{book_object.author}}
        </v-card-subtitle>

        <v-card-text class="mt-2 card_text">
          <div class="">
              <span class="emprunt font-weight-medium" v-if="user !== null && book_object.is_borrowed === 1 && book_object.borrowed_by === user.card_id">Vous empruntez ce livre<br></span>
              <span class="font-weight-light">Cote : {{book_object.cote}}</span><br>
              <span class="font-weight-medium" v-if="user !== null && book_object.borrowed_by === user.card_id && user_retard === false">À retourné avant le: <br></span>
              <span class="retour_date" v-if="user !== null && book_object.borrowed_by === user.card_id && user_retard === false">{{retour_date}}</span>
              <span class="font-weight-medium mt-2" v-if="user !== null && user_retard === true && book_object.borrowed_by === user.card_id">ATTENTION RETARD: <br></span>
              <span class="retard" v-if="user !== null && user_retard === true && jours_retards > 1 && book_object.borrowed_by === user.card_id">{{jours_retards}} jours</span>
              <span class="retard" v-if="user !== null && user_retard === true && jours_retards === 1 && book_object.borrowed_by === user.card_id">{{jours_retards}} jour</span>
              <span class="font-weight-light" v-if="user !== null && book_object.borrowed_by !== user.card_id">Disponibilite: {{disponibilite}}</span><br>
              <span class="font-weight-light" v-if="isLoggedIn === false">Disponibilite: {{disponibilite}}</span><br>
          </div>
        </v-card-text>

        <v-card-actions>
            <router-link :to="{ name: 'Book', params: {id:bookId.id} }">
            <v-btn
            color="green lighten-2"
            text
            >
            Détails
            </v-btn>
            </router-link>

            <ReservationModal v-if="user !== null && isLoggedIn === true && book_object.is_borrowed === 0 && UserEmprunt === true"
            :book="book_object"
            @refresh_book="refresh_book()"
            />

            <v-spacer></v-spacer>
        </v-card-actions>

    </v-card>

</template>

<script>
import ReservationModal from '@/views/User/catalogue/components/ReservationModal';
import { mapState } from 'vuex';
import jagAPI from '@/api/jagAPI';

export default {

  name:'ComponentCard',
  props: {
    bookId: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      show: false,
      book_object: {},
      current_image_src: '',
      is_image_loading: true,
      retour_date: '',
      user_retard: false,
      jours_retards: '',
    }
  },
  methods: {
    difference_date (a, b) {
      return Math.floor(a - b);
    },
    refresh_book () {
      this.$emit('refresh_profile');
      this.getBook();
    },
    getBook() {
      jagAPI.getBook(this.bookId.id)
        .then((response) => {
          this.book_object = response[0];
          this.current_image_src = Buffer.from(this.book_object.image);
          this.is_image_loading = false;
          if (this.book_object.is_borrowed === 1) {
            this.retour_date = this.book_object.date_end.substring(0, 10);
            let a = new Date(this.book_object.date_end);
            let b = new Date();
            var difference = this.difference_date(a, b);
            let sign = Math.sign(difference);
            if (sign === -1) {
              this.user_retard = true;
              this.jours_retards = Math.abs(difference / (1000*60*60*24));
              this.jours_retards = Math.round(this.jours_retards);
            }
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed:{
    disponibilite () {
      if(this.book_object.is_borrowed === 0){
        return "disponible"
      }else{
        return "indisponible"
      }
    },
    ...mapState([
      'token',
      'user',
      'isLoggedIn',
      'isLoadingPending',
      'UserEmprunt'
    ])
  },
  components: {
    ReservationModal
  },
  mounted () {
    this.getBook();
  }
}
</script>

<style lang="css" scoped>
.card_text {
  padding-bottom: 0 !important;
}

.retard {
  font-family: "Raleway", sans-serif;
  font-size: 1.5rem;
  font-weight: 550;
  color:  #FF5252;
}

.emprunt {
  color: #E040FB;
}

.retour_date {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size: 1.5rem;
  color: #E040FB;
}

.card{
  width:100%;
}
.v-card__title{
  word-break: normal;
  font-size:0.85em;
  line-height: 1rem;
  height:64px;

}

.image_container{
  width:100%;
  height:200px;
  display:flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;

  padding:2%;
  background-color:black;
}

.card_photo{
  width:100%;
  height:100%;
  object-fit:contain;
  background-color:black;
}

.card_photo_placeholder{
  width:100%;
  height:100%;
  object-fit:cover;
  background-color:black;
}
</style>
