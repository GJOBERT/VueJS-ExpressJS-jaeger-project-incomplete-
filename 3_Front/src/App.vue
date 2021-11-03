<template>
  <v-app class="mb-0" >
    <navbarAnonyme v-if="loginType === 'anonyme'"></navbarAnonyme>
    <navbarLecteur v-if="loginType === 'lecteur'"></navbarLecteur>
    <navbarBibliothecaire v-if="loginType === 'bibliothecaire'"></navbarBibliothecaire>

<v-main class="mt-0 vmain">
  <transition name="fade" mode="out-in">

  <router-view></router-view>
</transition>
</v-main>

    <generalFooter></generalFooter>

</v-app>



</template>

<script>
// import HelloWorld from './components/HelloWorld';
import navbarAnonyme from './views/App/components/navbarAnonyme.vue'
import navbarBibliothecaire from './views/App/components/navbarBibliothecaire.vue'
import navbarLecteur from './views/App/components/navbarLecteur.vue'
import generalFooter from './views/App/components/generalFooter.vue'
// import jagAPI from '@/api/jagAPI.js'

export default {
  name: 'App',


  components: {
    // HelloWorld,
    navbarAnonyme,
    navbarBibliothecaire,
    navbarLecteur,
    generalFooter
  },

  data(){
    return{

    }
  },

  computed:{
      loginType(){
        if(this.$store.state.isLoggedIn === false || this.$store.state.isLoggedIn === false ||  this.$store.state.user === null ){
          return 'anonyme'
        }else{
          if(this.$store.state.user.isAdmin === 1){
            return 'bibliothecaire'
          }else{
            return 'lecteur'
          }
      }
    }
  },


  mounted(){

  },

  methods:{


    logout(){
      this.$store.dispatch('LogOut');
    }
  },



}

</script>

<style media="screen">

html {
  min-width:1295px;

}

.logofilter{
  filter: invert();
}

.v-main{
  margin-top:10px;
  margin-bottom:50px;
}

.v-footer{
  width:100%;
}
.footercard{
  width:100%;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

a{
  text-decoration: none;
}
</style>
