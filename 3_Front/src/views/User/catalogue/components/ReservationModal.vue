<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          RESERVER
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Emprunt de livre</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Titre du livre"
                  :value="book.title"
                  disabled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Auteur"
                  :value="book.author"
                  disabled
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                color="black"
                label="Prénom de l'utilisateur"
                :value='user.firstname'
                disabled
                ></v-text-field>
                <v-text-field
                color="black"
                label="Nom de l'utilisateur"
                :value="user.lastname"
                disabled
                ></v-text-field>
                <v-text-field
                color="black"
                label="Email de l'utilisateur"
                :value='user.email'
                disabled
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-btn
            v-if="date_retour === '' && emprunt_conf === false"
            class="reservation_button"
            color="indigo"
            elevation="2"
            outlined
            x-large
            @click="emprunter_conf()"
          >
            RESERVER
          </v-btn>
           <v-sheet
          v-if="date_retour === '' && emprunt_conf === true"
          :rounded="true"
          class="mx-auto sheet_conf"
          elevation="1"
          >
          <p class="emprunt_conf">Etes vous sûr de vouloir emprunter ce livre ?</p>
          <span class="button_div">
            <v-btn color="primary" 
            class="mx-4"
            outlined 
            @click="emprunter()">OUI</v-btn>
            <v-btn color="error" 
            class="mx-4"
            outlined 
            @click="emprunt_conf = false">NON</v-btn>
          </span>
          </v-sheet>
          <v-sheet
          v-if="date_retour !== ''"
          :rounded="true"
          class="mx-auto retour_message"
          elevation="1"
          >
          <p class="retour_confirmation">Livre réservé ! Venez le récupérer en bibliothèque n'importe quand pandant les horaires d'ouvertures</p>
          <p class="retour_title">Date de retour: </p>
          <span class="retour_text">Merci de rendre ce livre avant le </span><span class="retour_date">{{date_retour}}</span>
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close_modal()"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import { mapState } from 'vuex';
import jagAPI from '@/api/jagAPI';

export default {
  name: "ReservationModal",
  data: () => ({
    dialog: false,
    date_retour: '',
    emprunt_conf: false
  }),
  props: {
      book: {
          type: Object,
          required: true
      }
  },
  computed: {
    ...mapState([
      'token',
      'user',
      'isLoggedIn',
      'isLoadingPending'
    ])
  },
  methods: {
    emprunter_conf () {
      this.emprunt_conf = true;
    },
      emprunter () {
        
        var date_end = new Date();
        var date_begin = new Date();
        date_begin = date_begin.toISOString().substr(0,10);
        date_end.setDate(date_end.getDate() + 28);
        date_end = date_end.toISOString().substr(0,10);
        this.date_retour = date_end;

        var updateBook = {
          borrowed_by: this.user.card_id,
          is_borrowed: 1,
          date_begin: date_begin,
          date_end: date_end
        };
        console.log(updateBook)
        updateBook = JSON.stringify(updateBook);

        jagAPI.updateBook(this.book.id, updateBook, this.token)
            .then(() => {
              jagAPI.getDroitsEmprunt(this.user.card_id, this.token)
                .then((response) => {
                  if (response[0].BookCounter > 15) {
                    this.$store.commit('setUserEmprunt');
                  }
                })
            })
            .catch(err => console.log(err));
      },
      close_modal () {
        this.date_retour = '';
        this.$emit('refresh_book');
        this.dialog = false;
      }
  },
}
</script>

<style lang="css" scoped>

.button_div {
  padding-left: 6rem;
}

.emprunt_conf {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size: 1.5rem;
  color:#3F51B5;
  padding-top: 3vh;
  padding-left: 2vw;
}

.sheet_conf {
  width: 75%;
  height: 150px;
}
.reservation_button {
  background-color: #E8EAF6;
  margin-left: 12rem;
}

.retour_message {
  height: 200px;
  width: 88%;
}

.retour_title {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size: 1.5rem;
  color:#3F51B5;
  padding: 1vh;
}

.retour_confirmation {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  color: #3F51B5;
  word-break: break-word;
  padding: 1vh;
}

.retour_text {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #3F51B5;
  word-break: break-word;
  padding: 1vh;
}

.retour_date {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  color: #E040FB;
  padding: 1vh;
}

</style>