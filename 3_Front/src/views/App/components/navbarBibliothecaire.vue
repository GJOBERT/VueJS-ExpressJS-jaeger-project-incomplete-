<template lang="html">
<div class="">

        <v-app-bar

          app
          color="blue-grey darken-4"
          class="navbar"
          dark
          >
          <router-link :to="{ name: 'Portail_bibliothecaire', params: {} }">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </router-link>

          <router-link :to="{ name: 'Home', params: {} }">
            <div class="cartouche">
              <span class="namebibli">Bibliothèque Katy Perry</span>
              <span class="cartouchesubtitle">Ville de Bordeaux | Liberté | Egalité | Fraternité</span>
            </div>

          </router-link>



          <v-menu
          open-on-hover
          offset-y
          min-width="200px"
          height="200px"
            dark
          >
               <template v-slot:activator="{ on, attrs }">
                 <v-btn class="ma-2"
                 text
                 color="white"
                 x-small
                 v-bind="attrs"
                 v-on="on"
                 >
                   <v-icon class="mr-2" light>import_contacts</v-icon>Mes livres  <v-icon class="ml-2" light>arrow_drop_down</v-icon>
                 </v-btn>
               </template>
               <v-list>
                 <router-link :to="{ name: 'Catalogue_overview', params: {} }">
                   <v-list-item-title class="white--text"><v-icon right >collections</v-icon> Catalogue</v-list-item-title>
                 </router-link>

                 <router-link :to="{ name: 'Add_livre', params: {} }">
                   <v-list-item-title class="mt-5 white--text"><v-icon right >person_add</v-icon> Ajouter un livre</v-list-item-title>
                 </router-link>



               </v-list>
           </v-menu>




          <v-menu
          open-on-hover
          offset-y
          min-width="200px"
            dark
          >
               <template v-slot:activator="{ on, attrs }">
                 <v-btn class="ma-2"
                 text
                 color="white"
                 x-small
                 v-bind="attrs"
                 v-on="on"
                 >
                   <v-icon class="mr-2" light>person_outline</v-icon>Mes lecteurs   <v-icon class="ml-2" light>arrow_drop_down</v-icon>
                 </v-btn>
               </template>
               <v-list>

                <router-link :to="{ name: 'Trombinoscope', params: {} }">
                  <v-list-item-title class="white--text"><v-icon right >groups</v-icon> Trombinoscope</v-list-item-title>
                </router-link>

                 <router-link :to="{ name: 'Add_lecteur', params: {} }">
                   <v-list-item-title class="mt-5 white--text"><v-icon right >person_add</v-icon> Inscrire un lecteur   </v-list-item-title>
                 </router-link>


               </v-list>
          </v-menu>


          <v-menu
          open-on-hover
          offset-y
          min-width="200px"
            dark
          >
               <template v-slot:activator="{ on, attrs }">
                 <v-btn class="ma-2"
                 text
                 color="white"
                 x-small
                 v-bind="attrs"
                 v-on="on"
                 >
                      <v-icon class="mr-2" light>all_inclusive</v-icon>Mes flux <v-icon class="ml-2" light>arrow_drop_down</v-icon>

                 </v-btn>
               </template>
               <v-list>

                <router-link :to="{ name: 'Retardataires', params: {} }">
                  <v-list-item-title class="white--text"><v-icon right >security </v-icon> Livres en retard</v-list-item-title>
                </router-link>




               </v-list>
          </v-menu>

          <v-menu
          open-on-hover
          offset-y
          min-width="200px"
            dark
          >
               <template v-slot:activator="{ on, attrs }">
                 <v-btn class="ma-2"
                 text
                 color="white"
                 x-small
                 v-bind="attrs"
                 v-on="on"
                 >
                   <v-icon class="mr-2" light>equalizer</v-icon> Statistiques <v-icon class="ml-2" light>arrow_drop_down</v-icon>
                 </v-btn>
               </template>
               <v-list>

                  <router-link :to="{ name: 'BookStats', params: {} }">
                    <v-list-item-title class="white--text"><v-icon right >insights </v-icon> Livres</v-list-item-title>
                  </router-link>

                  <router-link :to="{ name: 'UserStats', params: {} }">
                    <v-list-item-title class="white--text"><v-icon right >insights </v-icon> Utilisateurs</v-list-item-title>
                  </router-link>







               </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <router-link :to="{ name: 'Page_lecteur', params: {id: this.$store.state.user.card_id} }">

          <v-avatar
               size="36px"
             >
               <img
                 class="avatarpic"
                 v-bind:src="image_preview_url"
                 alt="Avatar"
               >

             </v-avatar>
             </router-link>


             <div class="persona_cartouche">
               <span class="font-weight-bold ml-4 mr-4"> Welcome {{this.$store.state.user.firstname}} {{this.$store.state.user.lastname}}</span>
               <span class="subtitle ml-4 mr-4">Card Id : {{this.$store.state.user.card_id}} </span>
             </div>





            <v-btn class="ma-2"
            outlined
            color="white"
            v-on:click="logout">
              logout
            </v-btn>

        </v-app-bar>
</div>


</template>

<script>
import jagAPI from '@/api/jagAPI.js'
export default {
  name:'navbarBibliothecaire',
  data(){
    return{
      current_avatar_src:'',
      image_preview_url:'',
      target_user:'',

    }
  },

  async mounted(){
    this.fetchAvatar();

  },

  methods:{
    logout(){
      this.$store.dispatch('LogOut');
    },

    async fetchAvatar(){
      const user_details_raw =  await jagAPI.getUserDetails(this.$store.state.user.card_id, this.$store.state.token);
      const user_details = user_details_raw.user;
      this.target_user = user_details;
      this.image_preview_url = Buffer.from(this.target_user.avatar);

    }
  }
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

.navbar{
  opacity:0.90;
}

.namebibli{
  color: #fff;
  font-family: 'Pacifico', cursive;
  font-size: 1.25em;
  animation: glow 1s ease-in-out infinite alternate;
}

.cartouchesubtitle{
  font-size: 0.5em;
}
.cartouche{
  display:flex;
  flex-direction: column;
}

.avatarpic{
  object-fit:cover;

}

.persona_cartouche{
  display:flex;
  flex-direction: column;
}

@keyframes glow {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
  }
  to {
    text-shadow: 0 0 10px rgb(221, 53, 107), 0 0 20px rgb(221, 53, 107), 0 0 30px rgb(221, 53, 107), 0 0 40px rgb(221, 53, 107), 0 0 50px rgb(221, 53, 107), 0 0 100px rgb(221, 53, 107), 0 0 70px #0073e6;
  }
}
</style>
