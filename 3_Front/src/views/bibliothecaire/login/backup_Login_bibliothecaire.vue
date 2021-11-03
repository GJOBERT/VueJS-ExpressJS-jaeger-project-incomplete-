<template lang="html">
    <div class="main_container" >
      <div class="left_side">
        <v-icon class="iconic" x-large>login</v-icon>
        <p class="display-3">Login bibliothécaire</p>
        <v-icon>mdi-vpn_key</v-icon>
        <div class="">
          <span class="subheading font-weight-thin">Bibliothèque municipale</span> <span class="subheading font-weight-bold"> Katy Perry</span>
        </div>
      </div>

      <div class="right_side">

        <v-form
        ref="loginform"
        v-model="formvalid"
        lazy-validation
        >

        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        ></v-text-field>

        <v-text-field
        v-model="password"
        :counter="10"
        label="Password"
        :type="'password'"
        required
        ></v-text-field>


        <v-btn
        :disabled="!formvalid"
        color="success"
        @click="validate"
        >
        Validate
      </v-btn>

    </v-form>
  </div>

  <v-snackbar
  v-model="snackbar"
  :bottom="y === 'bottom'"
  :left="x === 'left'"
  :right="x === 'right'"
  :top="y === 'top'"
  >
  {{ snackbartext }}

  <template v-slot:action="{ attrs }">
    <v-btn
    color="pink"
    text
    v-bind="attrs"
    @click="snackbar = false"
    >
    Close
  </v-btn>
  </template>
  </v-snackbar>

  </div>

</template>

<script>
import jagAPI from '@/api/jagAPI.js'

export default {
  name:'Login_bibliothecaire',
  data(){
    return{
      email:'',
      password:'',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      formvalid:true,
      snackbar:false,
      snackbartext:'',
      x: null,
      y: 'top',
    }
  },

  methods:{


    validate(){
      if(this.$refs.loginform.validate()){

        console.log("Login view | Sending : "+this.email+" "+this.password+" ...");

        const payload = {
          email: this.email,
          password: this.password
        };

        //Ici on récupère les données de base, requête de login qui ne retournera qu'un id, un token
        //La réponse de l'API est traitée par une fonction dédiée

        jagAPI.sendLogin(JSON.stringify(payload))
        .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
          this.handleResponse(data);
        });

      }
    },

    async handleResponse(response){
      if ('Error' in response){

        this.snackbar=true;
        this.snackbartext="Mauvais identifiants. Veuillez retenter votre chance."
      }
      else{
        this.snackbar=true;
        this.snackbartext="Connexion réussie."

        this.$store.commit("save_user", response);

        localStorage.setItem('isAdmin', await response.isAdmin)
        localStorage.setItem('token', await this.$store.state.token)

        const userDetails_raw= await jagAPI.getUserDetails(this.$store.state.user.card_id, this.$store.state.token)
        const userDetails = userDetails_raw.user

        await this.$store.commit("retrieveUserDetails", userDetails);


        //Redirection en fonction du type d'utilisateur inscrit.
        console.log("User privileges in store : ");
        console.log(this.$store.state.isAdmin);
        if (this.$store.state.isAdmin === 1) {
          this.$router.push({ name: 'Portail_bibliothecaire', params: {} });

        }else{
          this.$router.push({ name: 'UserProfile', params: {'id':this.$store.state.card_id} })

        }


      }
    },

    reset(){
      this.$refs.loginform.reset()
    },

    resetValidation(){
      this.$refs.loginform.resetValidation()
    }

  }

}

</script>

<style lang="css" scoped>
.main_container{

  width:80%;
  margin:auto;
  margin-top:100px;

  display: flex;
  flex-wrap:wrap;
  justify-content: space-evenly;
}

.left_side{
  flex-basis:30%;
  display:flex;
  flex-direction:column;
  justify-content: center;

}

.right_side{
  background-color:white;
  padding:20px;
  flex-basis:40%;
}

.iconic{
  justify-content:flex-start;
}


</style>
