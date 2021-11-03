<template lang="html">
    <div class="main_container" >
      <div class="left_side">
        <v-icon class="iconic" x-large>login</v-icon>
        <p class="display-3">Portail de connexion</p>
        <v-icon>mdi-vpn_key</v-icon>
        <div class="">
          <span class="subheading font-weight-thin">Bibliothèque municipale</span> <span class="subheading font-weight-bold purple--text"> Katy Perry</span>
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


    async validate(){
      if(this.$refs.loginform.validate()){

        const payload = {
          email: this.email,
          password: this.password
        };


        const data = await jagAPI.sendLogin(JSON.stringify(payload))


          if ('Unauthorized' in data){

            this.snackbar=true;
            this.snackbartext="Mauvais identifiants. Veuillez retenter votre chance."
          }
          else{
            this.snackbar=true;
            this.snackbartext="Connexion réussie."
            await this.$store.dispatch("LogIn", data);

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
