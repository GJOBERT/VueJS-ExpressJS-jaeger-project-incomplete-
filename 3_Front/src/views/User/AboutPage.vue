<template lang="html">
<div class="mt-0">

    <div class="main_container">


        <div class="subimage_title ma-5 mb-0">
        <span class="text-h3 font-weight-thin ">100 ans </span>
        <span class="  animate__animated animate__fadeInUp namebibli">d'histoire </span>
        </div>

        <div class="subimage_subtitle ml-5 mt_0">
        <span class="text-h5 font-weight-thin ">Personne n'aurait jamais misé sur notre succès</span>

        </div>

        <div class="action_grid mt-5">
        <div class="column_1 pa-5">

            <img class="left_hero_image animate__animated animate__fadeInUp" src="https://media.giphy.com/media/BMPRCOQ4RSg0un5Olx/source.gif"><img>

        </div>

        <div class="column_2 pa-5  animate__animated animate__fadeInRight">

          <span class="text-h6 font-weight-thin">Comment tout a <span class="text-h6 font-weight-bold"> commencé</span></span>
          <v-divider class="ma-2"></v-divider>
          <div class="main_story">
            <p class="font-weight-thin">En 1897, Katy Perry vit qu'un exemplaire de Télé Z trainait sur sa table de salon, inutilisé.
            Elle se dit alors: pourquoi ne pas en faire profiter le monde entier?
            La chanteuse de renommée internationale prit le programme TV, le mit dans une vitrine achetée chez Ikea, et tadam!</p>
            <br><span class="namebibli2">La bibliothèque Katy Perry était née.</span>
            <br><p class="font-weight-thin">Ne restait plus qu'à attirer l'attention des masses incultes. Hélas, jusqu'alors, Katy n'avait pas toujours été synonyme de culture.
            Niveau communication, il lui fallait trouver un parternariat canon. Il fallait frapper fort. </p>
            <br><p class="font-weight-thin">L'éclair frappa par un terne jour d'hiver, dans la tiédeur d'un Starbucks. Katy y savourait son Latte dominical, quand vint s'asseoir à côté d'elle, de manière tout à fait inopinée :  </p>
                <br><span class="namebibli2 ">Son Altesse Spirituelle et Sérénissime, le Dalaï Lama ! </span>
                <v-img contain class="mt-2 mb-2 right_image" src="https://media.giphy.com/media/l0HlO4vdchLBZNxYc/source.gif"></v-img>
            <p class="font-weight-thin">Le courant passa tout de suite entre les deux passionés de culture. Ils conclurent un deal, aux termes duquel la pop star s'engagerait à offrir au monastère de Shambhala, chaque année, l'équivalent d'un sac de riz;
              ceci en échange de la caution morale perétuelle de sa Pontive Magnificence. </p>
              <br><p class="namebibli2">Voila en deux mots l'histoire de notre chère bibliothèque. </p>

          </div>

        </div>


        </div>







    </div>











</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name:'AboutPage',
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
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.namebibli{
  color: white;
  font-family: 'Pacifico', cursive;
  font-size: 4em;
  animation: glow 1s ease-in-out infinite alternate;
}

.namebibli2{
  color: white;
  font-family: 'Pacifico', cursive;
  font-size: 2em;
  animation: glow 1s ease-in-out infinite alternate;
}

.main_container{
  width:90%;
  margin:auto;
}
.action_grid{
  display:grid;
  min-width:1300px;
  padding:15Px;
  grid-template-columns: 33% 33% 33%;
  grid-template-areas:
            "side main main"
            ;

}
.slide_1_background{
  background-image: url('https://media.giphy.com/media/LwzBicG26gz0pGI0ro/giphy.gif');
  background-size:cover;

}


.slide_2_background{
  background-image: url('../../assets/bookart/katy3.jpg');
  background-position: 80% 25%;
  object-fit: none;

}

.slide_3_background{
  background-image: url('https://media.giphy.com/media/l0HlESHUjqcu3mvw4/source.gif');
  background-size:cover;

}




.slide_inner_text{
  background-color:rgba(255, 255, 255, 0.63);
  color:rgb(36, 35, 36);
  padding:20px;

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

.column_2{
  grid-area: main;
}

.left_hero_image{
  border:solid 10px;
  border-radius:10px;
}

.right_image{
  border:solid 10px;
  border-radius:10px;
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
