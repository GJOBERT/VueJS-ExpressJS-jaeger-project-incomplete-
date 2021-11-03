<template lang="html">
<div class="main_container">
  <div class="headerblock mt-5">
    <span class="text-h2 font-weight-thin">Bienvenue sur</span><span class="text-h2 blue--text text--lighten-1 font-weight-bold "> UserStats ! </span>
    <div class="subheader">
        <span class="text-h5 font-weight-thin">Des KPI prêts à consommer pour vos rendements de compte...</span>
    </div>
  </div>
<v-img lazy-src="https://media.giphy.com/media/nIUav1AOaK06s/source.gif" class="hero_image mt-5" alt=""></v-img>
<div class="headerblock mt-5">
<span class="text-h4 font-weight-bold">Cette page est </span><span class="text-h4 blue--text text--lighten-3 font-weight-thin "> en cours de construction...</span>
</div>
<div class="headerblock mt-5">
<span class="text-h6 font-weight-thin">💤Juste le temps pour nos équipes de récupérer un peu de leur sommeil en retard...</span>
</div>


</div>



</template>

<script>
import jagAPI from "@/api/jagAPI.js"
export default {
  name:'UserStats',
  data(){
    return{
      nombre_total_de_livres:'',
      nombre_de_livres_empruntes:'',
      nombre_de_livres_en_retard:'',
      nombre_total_de_auteurs:'',
      nombre_total_de_categories:'',
      nombre_total_de_utilisateurs:'',
      nmobre_total_de_lecteurs_simples:'',
      retard_moyen:'',
      percentage_late:'',
    }
  },

  mounted(){
    this.getRetardMoyen();
    this.getRetardNombre();
    this.getPercentageLate();
    this.getNombreDeLivresEmpruntes();
    this.getNombreDeLecteursSimples();
    this.getUsersNombre();
    this.countCategories();
    this.getAuthorCount();

    },

    computed:{
      panier_moyen(){
        let numerateur = this.nombre_de_livres_empruntes;
        let denominateur = this.nombre_total_de_utilisateurs;
        let output = (numerateur / denominateur).toFixed(2)
        return output

      }
    },

    methods:{
      async getRetardMoyen(){
        let average_retard_raw = await jagAPI.getAverageRetards(this.$store.state.token)
        this.retard_moyen = average_retard_raw.results[0].moyenne;
      },

      async getRetardNombre(){
        let count_retard_raw = await jagAPI.getCountRetards(this.$store.state.token)
        this.nombre_de_livres_en_retard = count_retard_raw.results[0].nombre;
      },

      async getPercentageLate(){
        let library_count_raw = await jagAPI.getCountAllBooks(this.$store.state.token)
        this.nombre_total_de_livres = library_count_raw.results[0].nombre;
        this.percentage_late = (100*this.nombre_de_livres_en_retard / this.nombre_total_de_livres).toFixed(2)
      },

      async getNombreDeLivresEmpruntes(){
        let library_count_raw = await jagAPI.getBorrowCount(this.$store.state.token)
        this.nombre_de_livres_empruntes = library_count_raw.results[0].nombre;
      },

      async getNombreDeLecteursSimples(){
        let library_count_raw = await jagAPI. getLecteurSimpleCount(this.$store.state.token)
        this.nombre_de_lecteurs_simples = library_count_raw.results[0].nombre;
      },

      async getUsersNombre(){
        let count_users_raw = await jagAPI.getCountAllUsers(this.$store.state.token)
        this.nombre_total_de_utilisateurs = count_users_raw.results[0].nombre;
      },

      async countCategories(){
        const listFromAPI_raw = await jagAPI.getListOfCategories(this.$store.state.token);
        this.nombre_total_de_categories=listFromAPI_raw.result.length;
      },

      async getAuthorCount(){
        const listFromAPI_raw = await jagAPI.getAuthorCount(this.$store.state.token);
        this.nombre_total_de_auteurs=listFromAPI_raw.results[0].nombre;
      }
  }
}

</script>

<style lang="css" scoped>

.main_container{
  width:90%;
  margin-left:auto;
  margin-right:auto;
  /* background-color:rebeccapurple; */
  display:flex;
  flex-direction: column;
}

.hero_image{
  width:100%;
  height:200px;
  object-fit: cover;
}
.action_grid{
  display:grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  column-gap:20px;
  row-gap:20px;

}

.stat_square{
  display:flex;  flex-direction: column;

}
</style>
