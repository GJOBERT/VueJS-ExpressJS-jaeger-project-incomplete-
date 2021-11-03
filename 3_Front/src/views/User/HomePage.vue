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
      class="mt-0 animate__animated animate__fadeInDown"
    >
      <v-carousel-item
      >
        <v-sheet
          color="blue"
          height="100%"
          class="slide_1_background"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="left"
          >
          <div class="display-3 font-weight-thin  slide_inner_text ">
            A présent ouverte le dimanche
            <div class="text-h6 ">
              Faites chauffer la carte ! C'est gratuit :-)
            </div>
          </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>


      <v-carousel-item
      >
        <v-sheet
          color="orange"
          height="100%"
          class="slide_3_background"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="left"
          >
            <div class="display-3 font-weight-thin  slide_inner_text">
              Revivez l'evenement
              <div class="text-h6 ">
                Samedi dernier, son Altesse Spirituelle le Dalaï Lama et un prêtre ont convenu de déjeuner à Burger King.
              </div>
            </div>


          </v-row>
        </v-sheet>
      </v-carousel-item>

      <v-carousel-item
      >
        <v-sheet
          color="orange"
          height="100%"
          class="slide_2_background"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="left"
          >
            <div class="display-3 font-weight-thin  slide_inner_text">
              Célébration des 36 ans de Katy Perry
              <div class="text-h6 ">
                Une cérémonie spéciale aura lieu dans l'amphithéâtre Joe Dona, en présence de Monsieur Orlando Bloom.
              </div>
            </div>


          </v-row>
        </v-sheet>
      </v-carousel-item>




    </v-carousel>

    <div class="main_container">


        <div class="subimage_title ma-5 mb-0  animate__animated animate__fadeInLeft">
        <span class="text-h3 font-weight-thin ">Site officiel de la bibliothèque </span>
        <span class="namebibli2 animate__animated animate__zoomInDown">Katy Perry </span>
        </div>

        <div class="subimage_subtitle ml-5 mt_0">
        <span class="text-h5 font-weight-thin ">Etablie en 1897 par son Altesse Sérénissime le Dalaï Lama</span>

        </div>

        <div class="action_grid mt-5 animate__animated animate__fadeInUp">
        <div class="column_1 pa-5">

            <span class="text-h6 font-weight-thin">On parle de nous sur les <span class="text-h6 font-weight-bold"> réseaux!</span></span>
            <v-divider class="ma-2"></v-divider>

              <v-card
                  class="mx-auto twitter_card"
                  color="#26c6da"
                  dark
                  max-width="400"
                  >
                    <v-card-title>
                      <v-icon
                      large
                      left
                      >
                      mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                  </v-card-title>

                  <v-card-text class="headline font-weight-bold">
                    "La bibliothèque Katy Perry est la meilleure bibliothèque du monde. Je le jure !"
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-list-item-avatar color="grey darken-3">
                        <v-img
                        class="elevation-6"
                        alt=""
                        src="https://media.giphy.com/media/l2JhIUyUs8KDCCf3W/giphy-downsized.gif"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>D.J. Trump </v-list-item-title>
                      </v-list-item-content>

                      <v-row
                      align="center"
                      justify="end"
                      >
                      <v-icon class="mr-1">
                        mdi-heart
                      </v-icon>
                      <span class="subheading mr-2">256</span>
                      <span class="mr-1">·</span>
                      <v-icon class="mr-1">
                        mdi-share-variant
                      </v-icon>
                      <span class="subheading">45</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>

              <v-card
                  class="mx-auto twitter_card mt-10"
                  color="rgb(222, 18, 177)"
                  dark
                  max-width="400"
                  >
                    <v-card-title>
                      <v-icon
                      large
                      left
                      >
                      mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                  </v-card-title>

                  <v-card-text class="headline font-weight-bold">
                    "T'es un intello et t'as pas de carte de bibliothèque? Allo, mais allo quoi !"
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-list-item-avatar color="grey darken-3">
                        <v-img
                        class="elevation-6"
                        alt=""
                        src="https://media.giphy.com/media/dngjQ0S9urtejWtd1u/giphy.gif"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Nabilla </v-list-item-title>
                      </v-list-item-content>

                      <v-row
                      align="center"
                      justify="end"
                      >
                      <v-icon class="mr-1">
                        mdi-heart
                      </v-icon>
                      <span class="subheading mr-2">256</span>
                      <span class="mr-1">·</span>
                      <v-icon class="mr-1">
                        mdi-share-variant
                      </v-icon>
                      <span class="subheading">45</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>


              <v-card
                  class="mx-auto twitter_card mt-10"
                  color="rgb(66, 9, 16)"
                  dark
                  max-width="400"
                  >
                    <v-card-title>
                      <v-icon
                      large
                      left
                      >
                      mdi-twitter
                    </v-icon>
                    <span class="title font-weight-light">Twitter</span>
                  </v-card-title>

                  <v-card-text class="headline font-weight-bold">
                    "Si fier de ce qu'est devenu cette petite librairie de quartier..."
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-list-item-avatar color="grey darken-3">
                        <v-img
                        class="elevation-6"
                        alt=""
                        src="https://media.giphy.com/media/12Y4XnMPSWr9W8/giphy.gif"
                        ></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Katy Perry </v-list-item-title>
                      </v-list-item-content>

                      <v-row
                      align="center"
                      justify="end"
                      >
                      <v-icon class="mr-1">
                        mdi-heart
                      </v-icon>
                      <span class="subheading mr-2">256</span>
                      <span class="mr-1">·</span>
                      <v-icon class="mr-1">
                        mdi-share-variant
                      </v-icon>
                      <span class="subheading">45</span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>





        </div>

        <div class="column_2 pa-5">

          <span class="text-h6 font-weight-thin">Nous <span class="text-h6 font-weight-bold"> retrouver</span></span>
          <v-divider class="ma-2"></v-divider>



          <v-card
            class="mb-5"
           color="#385F73"
           dark
         >
           <v-card-title class="headline">
             Bibliothèque Katy Perry
           </v-card-title>

           <v-card-subtitle>85 Cours Maréchal Juin, 33000 Bordeaux</v-card-subtitle>
           <v-card-subtitle><v-icon class="mr-5">call</v-icon>+33 5 56 10 30 00</v-card-subtitle>

           <v-card-actions>
             <a href="https://www.google.com/maps/place/Library+M%C3%A9riadeck/@44.8350716,-0.5911034,15.79z/data=!4m5!3m4!1s0xd5527e958401f3b:0x97f0a370e17a622c!8m2!3d44.8352193!4d-0.5865387">
             <v-btn text>
               <v-icon class="mr-2">room</v-icon>Google Maps
             </v-btn>
           </a>
           </v-card-actions>
         </v-card>

         <a href="https://www.google.com/maps/place/Library+M%C3%A9riadeck/@44.8350716,-0.5911034,15.79z/data=!4m5!3m4!1s0xd5527e958401f3b:0x97f0a370e17a622c!8m2!3d44.8352193!4d-0.5865387"><v-img class="column_image map" src="@/assets/bookart/map.png"></v-img></a>


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
    name:'HomePage',
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
.namebibli2{
  color: white;
  font-family: 'Pacifico', cursive;
  font-weight: thin;
  font-size: 4em;
  animation: glow 1s ease-in-out infinite alternate;
}

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

@keyframes glow {
  from {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
  }
  to {
    text-shadow: 0 0 10px rgb(255, 255, 255), 0 0 20px rgb(201, 115, 207), 0 0 30px rgb(216, 159, 221), 0 0 40px rgb(214, 197, 192), 0 0 50px rgb(221, 53, 107), 0 0 100px rgb(221, 53, 107), 0 0 70px rgb(255, 255, 255)
  }
}
</style>
