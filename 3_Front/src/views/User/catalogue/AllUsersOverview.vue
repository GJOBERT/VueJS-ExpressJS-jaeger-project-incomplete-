<template lang="html">
    <div class="main_container">
        <p class="display-4">Catalogue</p>
        <p class="display-2 font-weight-thin">Catalogue général</p>

        <div class="rack" v-if="user !== null && isLoggedIn === true">
            <router-link :to="{ name: 'UserProfile', params: {id:user.card_id} }">
                <v-btn color="green" class="white--text pl-0" @click="loader = 'loading3'" text>
                Accéder à votre profil
                <v-icon right dark medium>fa-address-card</v-icon>
                </v-btn>
            </router-link>
        </div>

        <div class="SearchBar">
            
            <v-text-field
            v-model="search_input"
            class="SearchInput"
            label="Titre, auteur, cote, isbn..."
            value="Rechercher un livre"
            hint="For example, flowers or used cars"
            >
            </v-text-field>

            <v-btn @click="resetSearch" outlined color="brown darken-4" class="init_button"  x-large text>
                Réinitialiser
                <v-icon right dark>autorenew</v-icon>
            </v-btn>

            <p class="result_number headline font-weight-light" v-if="AllBooks !== undefined && AllBooks.length > 1">{{AllBooks.length}} resultats</p>
            <p class="result_number headline font-weight-light" v-if="AllBooks !== undefined && AllBooks.length === 1">{{AllBooks.length}} resultat</p>

            <div class="filterbox">
                <v-select
                class="filter"
                :items="ordres"
                item-text="name"
                item-value="id"
                label="Trier les résultats par"
                v-model="search_body.col"
                solo
                ></v-select>

                <v-select
                class="filter"
                :items="categories"
                item-text="name"
                item-value="id"
                label="Filtrer par catégorie"
                v-model="search_body.category_id"
                solo
                ></v-select>

                <v-select
                class="filter"
                :items="disponibilite"
                item-text="name"
                item-value="id"
                label="Disponibilité"
                v-model="search_body.is_borrowed"
                solo
                ></v-select>
            </div>
        </div>


        <div class="action_grid">
            <ComponentCard v-for="book in mini_list_of_books" :key="book.id"
            :bookId="book"
            @refresh_books="refresh_books()"
            />
        </div>
    </div>
</template>

<script>
import ComponentCard from '@/views/User/catalogue/components/ComponentCard.vue';
import { mapState } from 'vuex';
import jagAPI from '@/api/jagAPI';

export default {

    name:'AllUsersOverview',
    components:{
        ComponentCard
    },
    data(){
        return {
            ordres: [
                {
                    name: 'Pas de filtre',
                    id: 'id'
                    
                },
                {
                    name: 'Titre',
                    id: 'title'
                },
                {
                    name: 'Auteur',
                    id: 'author'
                ,},
                {
                    name: 'Année',
                    id: 'year'
                }
            ],
            categories: [],
            disponibilite:[
                {
                name:"Toute disponibilité",
                id:''
                },
                {
                name:"Disponible",
                id:0
                },
                {
                name:"Indisponible",
                id:1
                },
            ],
            show: false,
            AllBooks: [],
            search_input: '',

            search_body:{
                input: '',
                is_borrowed:'',
                category_id:'',
                orderby:'ORDER BY',
                col:'id',
                order:'DESC',
            },

            // Infinite scroll
            mini_list_of_books:[],
            LCP: -1,
            is_started:false,
            is_finished:false,
            step: 14,

        }
    },
    created(){
        window.addEventListener('scroll', this.handleInfiniteScroll);
    },
    destroyed () {
        window.removeEventListener('scroll',  this.handleInfiniteScroll);
    },
    computed: {
        ...mapState([
            'token',
            'user',
            'isLoggedIn',
            'isLoadingPending'
        ]),
    },
    methods: {
        refresh_books() {
			this.AllBooks = [];
            this.mini_list_of_books = [];
			this.LCP = -1;
            this.getAllBooks();
        },
        async retrieveCategories () {
            var listFromAPI = await jagAPI.getListOfCategories(this.$store.state.token);
            listFromAPI.result.push({name: 'Toutes catégories', id: ''});
            this.categories = listFromAPI.result;
        },
        handleInfiniteScroll () {
            if ((window.scrollY + window.innerHeight) >= document.body.offsetHeight * 0.45) {
                if (this.is_started === true && this.is_finished === false) {
                    this.getMovie_cycler();
                }
            }
        },
		getAllBooks() {
			this.AllBooks = [];
			this.mini_list_of_books = [];

            var search = JSON.stringify(this.search_body)

            jagAPI.searchBooksbis(search)
                .then(response => {
					if (response !== undefined && response.length > 0) {
						this.AllBooks = response;

						this.is_started = true;
						this.is_finished = false;

						let borne_inferieure = 0;
						let borne_superieure = Math.min(borne_inferieure + this.step, this.AllBooks.length);
						this.mini_list_of_books = this.AllBooks.slice(borne_inferieure, borne_superieure);
						this.LCP = borne_superieure;
						if (this.mini_list_of_books.length === this.AllBooks.length) {
							this.is_finished = true;
						}
					} else {
						this.AllBooks = [];
						this.mini_list_of_books = []
					}
                })
                .catch(err => console.log(err));
        },
        getMovie_cycler() {
           
			if (this.is_started === true && this.is_finished === false) {
				if (this.AllBooks.length !== 0) {
					let borne_inferieure = this.LCP;
					let borne_superieure = Math.min(borne_inferieure + this.step, this.AllBooks.length);
					let intron = this.AllBooks.slice(borne_inferieure, borne_superieure);

					intron.forEach((element) => {
						this.mini_list_of_books.push(element);
					});

					if (borne_superieure < this.AllBooks.length) {
						this.is_finished = false;
						this.LCP = borne_superieure;

					} else {
						this.is_finished = true;
						this.LCP = this.AllBooks.length - 1;
					}
				}
      		}
        },
        resetSearch(){
            this.$store.commit('unset_search_object_user');
            this.search_input = '';
            this.search_body = {  
                input: '',
                is_borrowed:'',
                category_id:'',
                orderby:'ORDER BY',
                col:'id',
                order:'DESC',
            }
        },
    },
    mounted () {
		this.AllBooks = [];
		this.mini_list_of_books = [];
        this.search_body = this.$store.state.search_object_user_side;
        this.search_input = this.search_body.input;
        this.getAllBooks();
        this.retrieveCategories();
    },
    watch: {
        search_input: function () {
            if (this.search_input === '') {
                this.getAllBooks();

            } else {
        
                this.search_body.input = this.search_input;

                var search = this.search_body;
                this.$store.commit('set_search_object_user', search);

                search = JSON.stringify(search);

                jagAPI.searchBooksbis(search)
                    .then(response => {
                       if (response !== undefined && response.length > 0) {
							this.AllBooks = response;

							this.is_started = true;
							this.is_finished = false;

							let borne_inferieure = 0;
							let borne_superieure = Math.min(borne_inferieure + this.step, this.AllBooks.length);
							this.mini_list_of_books = this.AllBooks.slice(borne_inferieure, borne_superieure);
							this.LCP = borne_superieure;
							if (this.mini_list_of_books.length === this.AllBooks.length) {
								this.is_finished = true;
							}
						} else {
							this.AllBooks = [];
							this.mini_list_of_books = [];
						}
                    })
                    .catch(err => console.log(err));    
            }
        },
        search_body: {
            handler: function () { 
           
                this.search_body.input= this.search_input;

                var search = this.search_body;
                this.$store.commit('set_search_object_user', search);
                
                search = JSON.stringify(search);

                jagAPI.searchBooksbis(search)
                    .then(response => {
						if (response !== undefined && response.length > 0) {
							this.AllBooks = response;

							this.is_started = true;
							this.is_finished = false;

							let borne_inferieure = 0;
							let borne_superieure = Math.min(borne_inferieure + this.step, this.AllBooks.length);
							this.mini_list_of_books = this.AllBooks.slice(borne_inferieure, borne_superieure);
							this.LCP = borne_superieure;
							if (this.mini_list_of_books.length === this.AllBooks.length) {
								this.is_finished = true;
							}
						} else {
							this.AllBooks = [];
							this.mini_list_of_books = [];
						}
                    })
                    .catch(err => console.log(err)); 
            
            },
            deep: true

        } 
    }
}
</script>

<style lang="css" scoped>
.init_button {
    width: 200px;
    margin-bottom: 1vh;
}

.result_number {
    margin-bottom: 1vh;
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

</style>
