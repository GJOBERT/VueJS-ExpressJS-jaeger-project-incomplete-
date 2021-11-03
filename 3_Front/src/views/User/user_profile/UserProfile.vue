<template lang="html">
    <div class="main_container">
       
        <v-btn
        @click="goback"
        class="ma-3 back_button"
        color="orange darken-2"
        dark
        >
            <v-icon
            dark
            left
            >
            mdi-arrow-left
            </v-icon>Retour
        </v-btn>
       

        <h1 class="display-4">Profil de {{this.$store.state.user.firstname}} {{this.$store.state.user.lastname}}</h1>

        <div class="rack">
            <router-link :to="{ name: 'UserAccountInfo', params: {id:user.card_id} }">
                <v-btn color="green" class="white--text pl-0" @click="loader = 'loading3'" text>
                Compte utilisateur
                <v-icon right dark medium>fa-address-card</v-icon>
                </v-btn>
            </router-link>
        </div>
        <br>
        <h2 class="display-1" v-if="UserEmprunt === false">Vous avez atteint le nombre maximum d'emprunts</h2>

        <v-card
        v-if="retard_counter !== 0"
        class="mx-auto retards"
        elevation="7"
        outlined
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">
                    RETARD
                    </div>
                    <v-list-item-title class="headline mb-1" v-if="retard_counter === 0">
                    Vous n'avez pas de livres en retard
                    </v-list-item-title>
                    <v-list-item-title class="headline mb-1" v-if="retard_counter === 1">
                    Vous avez {{retard_counter}} livre en retard
                    </v-list-item-title>
                    <v-list-item-title class="headline mb-1" v-if="retard_counter > 1">
                    Vous avez {{retard_counter}} livres en retard
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-card-actions>
                <v-btn
                class="retard_button"
                outlined
                text
                @click="display_late_books()"
                v-if="late_books.length !== 0"
                >
                Details
                </v-btn>
                <v-btn
                class="retard_button"
                outlined
                text
                color="error"
                v-if="button_close === true"
                @click="close_late_books()"
                >
                Close
                </v-btn>
            </v-card-actions>
        </v-card>
        <div class="action_grid" v-if="show_late_books === true">
            <ComponentCard v-for="late_book in late_books" :key="late_book.id"
            :bookId="late_book"
            @refresh_profile="display_profile()"
            />
        </div>

        <h2 v-if="UserBooks.length === 1" class="display-2 font-weight-regular">1 livre en cours d'emprunt</h2>
        <h2 v-if="UserBooks.length > 1" class="display-2 font-weight-regular">{{UserBooks.length}} livres en cours d'emprunt</h2>
        <h2 v-if="UserBooks.length === 0" class="display-2 font-weight-regular">Aucun livre en cours d'emprunt</h2>

        <div class="action_grid">
            <ComponentCard v-for="book in UserBooks" :key="book.id"
            :bookId="book"
            @refresh_profile="display_profile()"
            />
        </div>

        <h3 class="display-2 font-weight-regular reco_h3" v-if="BooksRecommandations.length !== 0">Recommendations</h3>
        <h3 class="display-1 font-weight-light reco_sorry" v-if="BooksRecommandations.length === 0">
            Nous n'avons pas encore de recommandations pour vous.
            Essayez d'emprunter un livre pour qu'on vous connaisse mieux !
        </h3>

        <v-sheet
        class="reco_slide"
        elevation="8"
        v-for="(book_array, index) in BooksRecommandations"
        :key="index"
        >
            <h4 class="display-1 font-weight-medium reco_title">{{book_array[0].category}}</h4>
            <v-slide-group
            v-model="model"
            class="pa-4"
            show-arrows
            >
                <v-slide-item
                v-for="book in book_array" :key="book.id"
                class="mx-4 slide_item"
                >
                    <ComponentCard :bookId="book"
                    @refresh_profile="display_profile()"
                    />
                </v-slide-item>
            </v-slide-group>
        </v-sheet>

    </div>

</template>

<script>
import ComponentCard from '@/views/User/catalogue/components/ComponentCard.vue';
import { mapState } from 'vuex';
import jagAPI from '@/api/jagAPI';

export default {

    name:'UserProfile',
    components:{
        ComponentCard
    },
    data(){
        return {
            show: false,
            UserBooks: [],
            BooksRecommandations: [],
            late_books: [],
            retard_counter: 0,
            show_late_books: false,
            button_close: false,
            model: null,
        }
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
    methods: {
        goback(){
            this.$router.go(-1);
        },
        sorting (category_array) {
            for (let l = 0; l < category_array.length; l++) {
                category_array[l] = category_array[l].category_id;
            }
            for (let i = 0; i < category_array.length; i++) {

                var min_index = i;

                for (let j = i + 1; j < category_array.length; j++) {

                    if (category_array[j] < category_array[min_index]) {
                        min_index = j;
                    }
                }
                if (category_array[i] > category_array[min_index]) {
                    var c = category_array[i];
                    category_array[i] = category_array[min_index];
                    category_array[min_index] = c;
                }
            }
            return category_array;
        },
        display_late_books () {
            this.show_late_books = true;
            this.button_close = true;
        },
        close_late_books () {
            this.show_late_books = false;
            this.button_close = false;
        },
        display_profile () {
            this.BooksRecommandations = [];
            this.late_books = [];
            jagAPI.getUserBooks(this.user.card_id, this.token)
                .then((response) => {
                    this.UserBooks = response;
                    if (this.UserBooks.length >= 15) {
                        this.$store.commit('setUserEmprunt');
                    }
                    this.UserBooks.forEach(element => {
                        let a = new Date(element.date_end);
                        let b = new Date();
                        let difference = Math.floor(a - b);
                        let sign = Math.sign(difference);
                        if (sign === -1) {
                            this.retard_counter ++;
                            this.late_books.push(element);
                        }
                    });
                    var sliceBooks = [...this.UserBooks];
                    sliceBooks = this.sorting(sliceBooks);
                    var RecoArray = [];
                    for (let i = 1; i <= sliceBooks.length; i++) {
                        if (sliceBooks[i] !== undefined) {
                            if (sliceBooks[i] === sliceBooks[i-1]) {
                               //
                            } else {
                                RecoArray.push(sliceBooks[i-1]);
                            }
                        } else {
                            RecoArray.push(sliceBooks[i-1]);
                        }
                    }  
                    RecoArray.slice(0, 5).forEach(element => {
                        jagAPI.getBooksByCategoryRecommandations(element)
                            .then(response => {
                                if (response.length !== 0) {
                                    this.BooksRecommandations.push(response);
                                } 
                            })
                            .catch(err => console.log(err));
                    });
                    
                })
                .catch(err => console.log(err)); 
        }
    },
    mounted () {
        
        if (this.user === null || this.isLoggedIn !== true) {
            this.$router.push('/');
        } else {
            this.display_profile();
        }
    }
}
</script>

<style lang="css" scoped>
.retard_button {
    background-color: white;
}

.retards {
    max-width: 500px;
    margin-top: 2vh;
    margin-bottom: 2vh;
    /* background-color: rgba(216, 71, 71, 0.747); */
    background-color: #FF5252;
}

.reco_h3 {
    margin-top: 2vh;
}

.reco_title {
    padding-left: 1rem;
    padding-top: 1rem;
}

.mx-auto {
    margin-right: 16px;
    margin-left: 16px;
}

.slide_item {
    width: 240px;
    margin-right: 16px !important; 
    margin-left: 16px !important;
}

.reco_slide {
    margin-top: 2vh;
    margin-bottom: 2vh;
    max-width: 1200px;
    height: 530px;
    background-color: #E1BEE7;
}

.reco_sorry {
    width: 75%;
    word-break: break-word;
}

.main_container{
    width:80%;
    margin-left:auto;
    margin-right:auto;
    /* background-color:rebeccapurple; */
    display:flex;
    flex-direction: column;
}

.action_grid{
    /* background-color: gold; */
    margin-top:20px;
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    grid-row-gap: 20px;
    grid-column-gap: 20px;
}
.SearchBar{
    /* background-color:gold; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.SearchInput{
    margin-bottom:20px;
}
.filterbox{
    display:flex;
    flex-direction: row;
    column-gap: 20px;
    flex-wrap:wrap;
}

.filter{
    flex-basis:1/3;
}

.v-card__title{
    word-break: normal;
    font-size:0.85em;
    line-height: 1rem;
    height:64px;
}

.rack{
    display:flex;
    flex-direction: row;
    margin-bottom:20px;
}

.back_button {
    width: 150px;
}

</style>
