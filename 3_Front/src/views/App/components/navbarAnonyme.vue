<template lang="html">
<div class="mb-0">
  <v-app-bar

    app
    color="white"
    class="navbar"
    light


    >
    <v-app-bar-nav-icon color="black"></v-app-bar-nav-icon>
    <router-link :to="{ name: 'Home', params: {} }">
      <div class="cartouche mr-2">
        <span class="namebibli">Bibliothèque Katy Perry</span>
        <span class="cartouchesubtitle">Ville de Bordeaux | Liberté | Egalité | Fraternité</span>
      </div>

    </router-link>



    <router-link :to="{ name: 'AllUsersOverview', params: {} }">
      <v-btn class="ma-2"
      text
      color="black"
      >
        <v-icon class="mr-2" light>search</v-icon>
        Catalogue
      </v-btn>
    </router-link>

    <router-link :to="{ name: 'Home', params: {} }">
      <v-btn class="ma-2"
      text
      color="black"
      >
        <v-icon class="mr-2" light>home</v-icon>
        Accueil
      </v-btn>
     </router-link>


     <router-link :to="{ name: 'About', params: {} }">
       <v-btn class="ma-2"
       text
       color="black"
       >
         <v-icon class="mr-2" light>help_outline</v-icon>
         A propos
       </v-btn>
      </router-link>




    <v-spacer></v-spacer>

    <router-link :to="{ name: 'JAG', params: {} }">
      <v-btn class="ma-2"
      text
      color="black"
      >
        <v-icon class="mr-2" light>stars</v-icon>
        Team JAG
      </v-btn>

    </router-link>


    <router-link :to="{ name: 'Lacarte', params: {} }">
      <v-btn class="ma-2"
      text
      color="black"
      >
        <v-icon class="mr-2" light>style</v-icon>
        La Carte
      </v-btn>
    </router-link>






    <router-link :to="{ name: 'Login_bibliothecaire', params: {} }">
      <v-btn class="ma-2"
      outlined
      color="black">
      <v-icon>vpn_key</v-icon>
        login
      </v-btn>
    </router-link>
  </v-app-bar>
</div>

</template>

<script>
export default {
  name:'navbarAnonyme',
  methods:{
    logout(){
      this.$store.dispatch('LogOut');

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
  color: white;
  font-family: 'Pacifico', cursive;
  font-size: 1.8em;
  animation: glow 1s ease-in-out infinite alternate;
  min-width:405px;
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
    text-shadow: 0 0 10px rgb(255, 255, 255), 0 0 20px rgb(201, 115, 207), 0 0 30px rgb(216, 159, 221), 0 0 40px rgb(214, 197, 192), 0 0 50px rgb(221, 53, 107), 0 0 100px rgb(221, 53, 107), 0 0 70px rgb(255, 255, 255)
  }
}
</style>
