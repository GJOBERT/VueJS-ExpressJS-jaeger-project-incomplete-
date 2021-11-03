<template lang="html">
<div class="mt-0">

  <v-carousel
      cycle
      interval="3000"
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
      reverse-transition="fade-transition"
      transition="fade-transition"
      class="mt-0"
    >

    <v-carousel-item
    >
      <v-sheet
        :color="orange"
        height="100%"
        class="slide_2_background"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="left"
        >
          <div class="display-3 font-weight-thin  slide_inner_text">
            Empruntez sans compter (ou presque)
            <div class="text-h6 ">
               15 documents pour 4 semaines, c'est large quand même.
            </div>
          </div>


        </v-row>
      </v-sheet>
    </v-carousel-item>

    <v-carousel-item
    >
      <v-sheet
        :color="orange"
        height="100%"
        class="slide_3_background"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="left"
        >
          <div class="display-3 font-weight-thin  slide_inner_text">
            Zéro paperasse
            <div class="text-h6 ">
              Une pièce d'identité et c'est parti !
            </div>
          </div>


        </v-row>
      </v-sheet>
    </v-carousel-item>


      <v-carousel-item
      >
        <v-sheet
          :color="blue"
          height="100%"
          class="slide_1_background"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="left"
          >
          <div class="display-3 font-weight-thin  slide_inner_text">
            Complètement gratuite
            <div class="text-h6 ">
              Promis, pas de conditions cachées ni d'exceptions tordues ;-)
            </div>
          </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>





    </v-carousel>

    <div class="main_container">


        <div class="subimage_title ma-5 mb-0">
        <span class="text-h3 font-weight-thin ">Et si vous passiez à </span>
        <span class="text-h3 font-weight-bold pink--text">la Carte?</span>
        </div>

        <div class="subimage_subtitle ml-5 mt_0">
        <span class="text-h5 font-weight-thin ">Demandez à l'un de nos bibliothécaires de vous inscire, et vous pourrez emporter chez vous l'ensemble de notre catalogue!</span>
        <br><span class="text-subtitle-1 pink--text font-weight-thin ">...enfin, pas une fois, on est d'accord?</span>

        </div>

        <div class="action_grid mt-5">
        <div class="column_1 pa-5">

            <span class="text-h6 font-weight-thin">S'inscrire <span class="text-h6 font-weight-bold"> c'est simple.</span></span>
            <v-divider class="ma-2"></v-divider>

            <div class="inscription_details mb-5">
              <span>La carte lecteur  est complètement gratuite.</span>
              <br><span>Pour vous inscrire, il vous suffit de présenter à notre bibliothécaire:</span>
              <br><ol>
                <li>Une pièce d'identité</li>
                <li>Une autorisation parentale pour les moins de 18 ans</li>
              </ol>
              <br>
              <br><span>Et c'est tout.</span>
            </div>


            <span class="text-h6 font-weight-thin">Votre <span class="text-h6 font-weight-bold"> propre carte.</span></span>
            <v-divider class="ma-2"></v-divider>
            <v-img src="https://pbs.twimg.com/media/DmDVfvsW0AE-C0g.jpg" class="carte_image"></v-img>

            <div class="presentation_carte_plastique mt-2 mb-5">
              <span>Une jolie carte faite d'un plastique de très bonne qualité.</span>
              <br><span>Evidemment, nominative et non cessible.</span>
              <br><span>Ne la perdez pas trop souvent...</span>
              <br><span>Le duplicata est à €10 plus frais de dossier</span>
            </div>

        </div>

        <div class="column_2 pa-5">

          <span class="text-h6 font-weight-thin">Emprunter <span class="text-h6 font-weight-bold"> tout de suite</span></span>
          <v-divider class="ma-2"></v-divider>

          <v-img contain class="big_number mb-5" src="https://lettersandnumbers.org/army-type/numbers/army-number-15.jpg"></v-img>

          <span>Vous pouvez emprunter jusqu'à 15 documents simultanément.</span>


            <v-img contain class="big_number mb-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Paris_metro_line_4_symbol.svg/768px-Paris_metro_line_4_symbol.svg.png"></v-img>



            <span>4 semaines, c'est le temps que vous avez pour nous restituer les documents.</span>
            <br><br><span>Lisez bien, lisez vite ! </span>

        </div>

        <div class="column_3 pa-5">
          <span class="text-h6 font-weight-thin">Nos <span class="text-h6 font-weight-bold"> horaires </span></span>
          <v-divider class="ma-2"></v-divider>

          <v-img class="column_image" src="@/assets/bookart/Bibliotheque.jpg"></v-img>

                  <v-card
                  class="mx-auto horaires_card"
                  max-width="400"
                  tile
                  dark
                  >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Horaires de Septembre 2020 à Juin 2021</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Lundi</v-list-item-title>
                      <v-list-item-subtitle>9h00 - 18h00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Mardi</v-list-item-title>
                      <v-list-item-subtitle>9h00 - 18h00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>


                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Mercredi</v-list-item-title>
                      <v-list-item-subtitle>9h00 - 18h00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Jeudi</v-list-item-title>
                      <v-list-item-subtitle>9h00 - 18h00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title>Vendredi</v-list-item-title>
                      <v-list-item-subtitle>9h00 - 18h00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title><v-icon class="mr-2">fiber_new</v-icon>Samedi</v-list-item-title>
                      <v-list-item-subtitle>9h00 - 18h00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>


                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title><v-icon class="mr-2">fiber_new</v-icon>Dimanche</v-list-item-title>
                      <v-list-item-subtitle>14h00 - 18h00</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>


                </v-card>



        </div>

        </div>







    </div>











</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name:'CartePage',
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

.main_container{
  width:90%;
  margin:auto;
}
.action_grid{
  display:grid;
  padding:15Px;
  grid-template-columns: 33% 33% 33%;

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

</style>
