const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

// http://172.104.205.227

export default {
  // R-Slane
  async sendLogin(data={}) {
    const response = await fetch('http://localhost:3333/api/user/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
    console.log("Login | Databody sent out ");
    console.log(data);
    return response.json();
  },

  async getUserDetails(id, token) {
    const response = await fetch('http://localhost:3333/api/user/'+id, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });

    return response.json();

  },

  async getUserDetailsSpecial(id, token) {
    const response = await fetch('http://localhost:3333/api/user/edit/'+id, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });

    return response.json();

  },

  async getListofAllUsers(token){
    const response = await fetch('http://localhost:3333/api/user/all', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  async getListofAllBooks(token){
    const response = await fetch('http://localhost:3333/api/book/all', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  async getSingleBookDetails(id){
    const response = await fetch('http://localhost:3333/api/book/'+id, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.json();
  },

  async modifyBook(token, book_id, data={}) {
    const response = await fetch('http://localhost:3333/api/book/'+book_id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data, this.replacer)
    });
    return response.json();
  },

  replacer(key, value) {

    if ( value instanceof Blob) {
      let output=''
      var reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = async function () {
        console.log("Replacer : I have been called on  key :"+key+" for value "+value );

        var b64 =  await reader.result
        console.log("Replacer : result");
        console.log(b64);
        this.output = b64.toString()
      }
      console.log("Replacer final output:");
      console.log(output);
      console.log("Type");
      if(typeof output === "string"){
        console.log("Type is string");
      }else{
        console.log("Type is not string");
      }
      return output


    }
      return value;
    },

  async searchBookByTitle(searchTerm){
      const response = await fetch('http://localhost:3333/api/book/search/'+searchTerm, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.json();

    },

  async newSearchBook(data={}){
    const response = await fetch('http://localhost:3333/api/book/search/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        // 'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log("jagAPI | body sent out ");
    console.log(data);
    return response.json();

  },

  async newSearchUser(token, data={}){
    const response = await fetch('http://localhost:3333/api/user/search/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log("jagAPI | body sent out ");
    console.log(data);
    return response.json();
  },

  async getListOfCategories(token){
    const response = await fetch('http://localhost:3333/api/category', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },


  async modifyUser(token, card_id, data={}){
    const response = await fetch('http://localhost:3333/api/user/'+card_id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async borrowBook(token, book_id, data={}) {

    const response = await fetch('http://localhost:3333/api/book/update/'+book_id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response.json();
  },

  async rendreBook(token, book_id) {
    const response = await fetch('http://localhost:3333/api/book/update/'+book_id, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        borrowed_by : '0',
        is_borrowed : '0',
        date_begin : '1000-01-01',
        date_end : '1000-01-01'
      })
    });
    return response.json();
  },

  async createBook(token, new_book) {
    const response = await fetch('http://localhost:3333/api/book/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_book)
    });
    return response.json();
  },

  async deleteBook(token, book_id){
    const response = await fetch('http://localhost:3333/api/book/'+book_id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },

    });
    return response.json();
  },

  async createUser(token, new_user){
    const response = await fetch('http://localhost:3333/api/user/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_user)
    });
    return response.json();

  },

  async deleteUser(token, user_id){
    const response = await fetch('http://localhost:3333/api/user/'+user_id, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },

    });
    return response.json();
  },

  async getAllRetards(token){

    const response = await fetch('http://localhost:3333/api/book/retard/all', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });
    return response.json();

  },

  async  FileToString (file) {

          let res = await file.raw.text();
          return res;

},

  async checkMail(token,email_string){
    let data={
      email:''
        }

    data.email = email_string

    const response = await fetch('http://localhost:3333/api/user/check/mail/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    return response.json();

  },

  async getBorrowCount(token){

    const response = await fetch('http://localhost:3333/api/book/stats/library/emprunt/count', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });
    return response.json();

  },

  async getLecteurSimpleCount(token){

    const response = await fetch('http://localhost:3333/api/user/stats/emprunteurs/countSimple', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });
    return response.json();

  },

  async getAuthorCount(token){

    const response = await fetch('http://localhost:3333/api/book/stats/library/author/count', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer '+token,
        'Content-Type': 'application/json'
      }
    });
    return response.json();

  },


  wait(ms){
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
},


toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
},

async getCart(token, id) {
  const response = await fetch('http://localhost:3333/api/user/getbooks/'+id, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    }
  });

  return response.json();

},

async getAverageRetards(token){

      const response = await fetch('http://localhost:3333/api/book/retard/moyenne', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        }
      });
      return response.json();

},

async getCountRetards(token){

      const response = await fetch('http://localhost:3333/api/book/retard/nombre', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        }
      });
      return response.json();

},

async getCountAllBooks(token){

        const response = await fetch('http://localhost:3333/api/book/stats/library/count', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
          }
        });
        return response.json();
},

async getCountAllUsers(token){
        const response = await fetch('http://localhost:3333/api/user/stats/count', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
          }
        });
        return response.json();
},

async getCountRetardsById(token,user_id){
        const response = await fetch('http://localhost:3333/api/book/retard/nombre/'+user_id, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
          }
        });
        return response.json();
},

async createCategory(token,data={}){
  const response = await fetch('http://localhost:3333/api/category/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
},




  // Padawan

  getAllBooks () {
      return new Promise((resolve, reject) => {
          fetch('http://localhost:3333/api/book', {

            method: 'GET',
            headers: DEFAULT_HEADERS
          })
          .then(response => response.json())
          .then((data) => resolve(data.result))
          .catch(reject)
      })
  },

  getBook (id) {
      return new Promise((resolve, reject) => {
          fetch(`http://localhost:3333/api/book/${id}`, {

            method: 'GET',
            headers: DEFAULT_HEADERS
          })
          .then(response => response.json())
          .then((data) => resolve(data.result))
          .catch(reject)
      })
  },

  getBooksByCategory (category_id) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3333/api/book/category/${category_id}`, {

        method: 'GET',
        headers: DEFAULT_HEADERS
      })
      .then(response => response.json())
      .then(data => resolve(data.result))
      .catch(reject);
    })
  },

  getBooksByCategoryRecommandations (category_id) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3333/api/book/recommandations/${category_id}`, {

          method: 'GET',
          headers: DEFAULT_HEADERS
        })
        .then(response => response.json())
        .then(data => resolve(data.result))
        .catch(reject);
    })
  },

  updateBook (id, book, token) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3333/api/book/update/${id}`, {

          method: 'PUT',
          mode: 'cors',
          headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
          },
          body: book
        })
        .then(response => response.json())
        .then(data => resolve(data.result))
        .catch(reject)
    })
  },

  searchBooks (search, token) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3333/api/book/search`, {

        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        },
        body: search
      })
      .then(response => response.json())
      .then(data => resolve(data.results))
      .catch(reject)
    })
  },

  searchBooksbis (search) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3333/api/book/searchbis`, {

        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: search
      })
      .then(response => response.json())
      .then(data => resolve(data.results))
      .catch(reject)
    })
  },

  // USER

  getUserBooks (id, token) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3333/api/user/getbooks/${id}`, {

          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then((data) => resolve(data.results))
        .catch(reject)
    })
  },

  getDroitsEmprunt (id, token) {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3333/api/user/borrow/${id}`, {

        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer '+token,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data) => resolve(data.result))
      .catch(reject)
    })
  },

  updateUser (id, user, token) {
      return new Promise((resolve, reject) => {
          fetch(`http://localhost:3333/api/user/${id}`, {

            method: 'PUT',
            mode: 'cors',
            headers: {
              'Authorization': 'Bearer '+token,
              'Content-Type': 'application/json'
            },
            body: user
          })
          .then(response => response.json())
          .then(data => resolve(data.result))
          .catch(reject)
      })
  },
  getEditUser (id, token) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3333/api/user/edit/${id}`, {

          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => resolve(data.result))
        .catch(reject);
    })
  },
}
