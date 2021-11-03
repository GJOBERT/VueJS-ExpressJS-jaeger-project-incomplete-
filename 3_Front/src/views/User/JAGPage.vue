<template lang="html">
<div class="mt-0">

    <div class="main_container">

        <div class="subimage_title ma-5 mb-0">
        <span class="text-h2 font-weight-bold">Notre équipe</span>
        <br><span class="text-h5 font-weight-thin ">  Sous vos applaudissements </span>
        </div>


      </div>

        <div class="action_grid mt-5 ">
        <div class="column_1 pa-5 ">

          <div class="coltitle_wrapper">
              <span class="text-h3 font-weight-bold">JaDona<span class="text-h6 font-weight-thin"> Games</span></span>
          </div>

            <v-divider class="ma-2"></v-divider>
          <v-img contain class="majora mb-5" src="https://4.bp.blogspot.com/-X8SKwqjKFQM/V1IFZtmYPnI/AAAAAAAAD-g/-HGH6wioAGEVCeC-MMQuJhcBglxQpItzwCLcB/s1600/691-Will-Turnerhhh.png"></v-img>

          <p class="font-weight-bold">L'homme qui savait programmer des jeux en langage assembleur. </p>
          <p class="font-weight-thin">Surdoué de la programmation vidéo-ludique, Joe adore passer son temps libre à faire des calculs algorithmiques.</p>
          <p class="font-weight-thin">Plusieurs fois champion national du Concours Kangourou, auteur de 225 jeux vidéos en langage 010101010, il n'a plus rien à prouver. Il est le meilleur.</p>
          <p class="font-weight-thin">Son goût du détail et, avouons-le, ses tendances un brin masochistes, en ont fait un Roi du Back-End.</p>


        </div>

        <div class="column_2 pa-5 ">

          <div class="coltitle_wrapper">
              <span class="text-h3 font-weight-bold hyperslane">R-Slane</span><span class="text-h6 font-weight-bold"> Studios <span class="text-caption">™️</span>  </span>
          </div>
          <v-divider class="ma-2"></v-divider>
          <v-img contain class="majora mb-5" src="https://cdn3.dualshockers.com/wp-content/uploads/2018/06/KH3_E32018_Character_Jack.jpg"></v-img>
          <p class="font-weight-bold">Au début de la Coding Academy, il n'y connaissait rien mais alors rien du tout au développement Web. </p>
          <p class="font-weight-thin">Après 10 ans de rapines au large des côtes de la Finance en Angleterre du Nord et en France, il entendit dire qu'il y avait du rhum et des femmes à flot dans l'industrie du développement Web.</p>
          <p class="font-weight-thin">Il ne lui en fallut pas davantage pour tout plaquer et se lancer à corps perdu dans la flibuste HTML, et la Coding, ce repaire de brigands.</p>


        </div>

        <div class="column_3 pa-5 " >
          <div class="coltitle_wrapper">
              <span class="text-h3 font-weight-bold">Padawan<span class="text-h6 font-weight-bold"> Industries</span></span>
          </div>
          <v-divider class="ma-2"></v-divider>

          <v-img contain class="majora mb-5" src="https://i.pinimg.com/736x/af/5b/2c/af5b2c4f49d474e15550e55306250e60.jpg"></v-img>

          <p class="font-weight-bold">La méthode Bovis, les cercles en couleur qui tournent très vite et vous prédissent l'avenir, vous connaissez? </p>
          <p class="font-weight-thin">Revenu d'une quête de près de dix ans aux confins du Vercors, où il tenta de percer le mystère de Bovis, Padawan veut aujourd'hui en découdre.</p>
          <p class="font-weight-thin">Convaincu que les mystérieux pouvoirs de l'INTERNET sauront briser le secret du Code Bovis, il a lui aussi tout plaqué pour suivre ses rêves...</p>
          <p class="font-weight-thin">...des rêves précisons-le aux antipodes des ignobles visions lubriques du vil Baron R-Slane ! </p>


        </div>





    </div>











</div>
</template>

<script>


import { mapState } from 'vuex';

export default {
    name:'JAGPage',
    components:{

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
}
</script>

<style lang="css" scoped>

.majora{
  height:500px;
}
.namebibli2{
  color: white;
  font-family: 'Pacifico', cursive;
  font-size: 4em;
  animation: glow 1s ease-in-out infinite alternate;
}

.hyperslane{
  color: white;
  font-size: 4em;
  animation: glow 1s ease-in-out infinite alternate;
}

.main_container{
  width:90%;
  margin:auto;
}

.subimage_title{
  text-align:center
}
.action_grid{
  display:grid;
  padding:15Px;
  grid-template-columns: 33% 33% 33%;
  min-width:1250px;

}
.slide_1_background{
  background-image: url('https://media.giphy.com/media/ZGH8VtTZMmnwzsYYMf/giphy.gif');
  background-size:cover;

}


.slide_2_background{
  background-image: url('https://media.giphy.com/media/7aPevwPAgsBkQ/source.gif');
  background-size:cover;


}

.slide_3_background{
  background-image: url('https://media.giphy.com/media/13bUdxDy4jJUR2/source.gif');
  background-size:cover;

}




.slide_inner_text{
  background-color:rgba(255, 255, 255, 0.63);
  color:rgb(36, 35, 36);
  padding:20px;

}

.coltitle_wrapper{
  text-align:center;
}
.column_image{
  max-width:100%;
  min-width:100%;
}

.map{
  border: solid 5px;
  border-color: #385f73;
  border-radius:10px;


}

.horaires_card{
  width:100%;
  min-width:100%;
}

.twitter_card{
  width:100%;
}

.carte_image{
  border-radius:15px;
}

.big_number{
  padding:5%;
  margin-bottom:5px;
  margin-top:5px;
  width:100%;
  max-width:100%;
  min-height:320px;
  max-height:320px;
  object-fit: contain;
}

.hero_video{
  width:100%;
  max-width:100%;
  padding:5%;
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
