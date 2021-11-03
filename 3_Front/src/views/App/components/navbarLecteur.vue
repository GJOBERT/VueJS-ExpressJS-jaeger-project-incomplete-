<template lang="html">
<div class="">

    <v-app-bar
    app
    color="pink "
    class="navbar"
    dark
    >
      <router-link :to="{ name: 'Home', params: {} }">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </router-link>

      <router-link :to="{ name: 'Home', params: {} }">
        <div class="cartouche">
          <span class="namebibli">Bibliothèque Katy Perry</span>
          <span class="cartouchesubtitle">Ville de Bordeaux | Liberté | Egalité | Fraternité</span>
        </div>

      </router-link>

      <router-link :to="{ name: 'Home', params: {} }">
        <v-btn class="ma-2 nav_button"
          text
          color="white"
          x-small
          >
            <v-icon class="mr-2" light>home</v-icon>Acceuil
          </v-btn>
      </router-link>
      
        <router-link :to="{ name: 'AllUsersOverview', params: {} }">
          <v-btn class="ma-2 nav_button"
            text
            color="white"
            x-small
            >
              <v-icon class="mr-2" light>collections</v-icon>Catalogue
            </v-btn>
        </router-link>
  
        <router-link :to="{ name: 'UserProfile', params: {id:this.user.card_id} }">
          <v-btn class="ma-2 nav_button"
            text
            color="white"
            x-small
            >
              <v-icon class="mr-2" light>person_outline</v-icon>Profil
            </v-btn>
        </router-link>
    
        <router-link :to="{ name: 'UserAccountInfo', params: {id:this.user.card_id} }">
          <v-btn class="ma-2 nav_button"
            text
            color="white"
            x-small
            >
              <v-icon class="mr-2" light>person_outline</v-icon>Compte
            </v-btn>
        </router-link>
    
      <v-spacer></v-spacer>

      <v-avatar
      size="36px"
      >
        <img
        v-bind:src="image_preview_url"
        alt="Avatar"
        >

      </v-avatar>

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
import jagAPI from '@/api/jagAPI.js';
import { mapState } from 'vuex';

export default {
  name:'navbarBibliothecaire',
  data(){
    return{
      current_avatar_src:'',
      image_preview_url:'',
      target_user:'',

    }
  },
  computed: {
    ...mapState([
        'token',
        'isLoggedIn',
        'user'
      ])
  },

  async mounted(){
    this.fetchAvatar();
    localStorage.setItem('avatar', await this.$store.state.image_preview_url)
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
.navbar{
  opacity:0.90;
}

.nav_button {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 1rem;
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
  object-fit: cover;
}

.persona_cartouche{
  display:flex;
  flex-direction: column;
}

.persona_cartouche{
  display:flex;
  flex-direction: column;
}
</style>
