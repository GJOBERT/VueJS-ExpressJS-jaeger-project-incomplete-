<h1>Project JAEGER</h1>
<h2>Projet de fin de formation Coding Academy</h2>

<h3>Live demo</h3>
<a href="http://jag-biblio.fr">jag-biblio.fr</a>


<h3>Installation</h3>
Ce projet est livré sous Docker Compose.

<ol>
<br>
<li>
Veuillez installer Docker et Docker sur votre poste de travail.
<a>https://docs.docker.com/get-docker/</a>
<a>https://docs.docker.com/compose/install/</a>
</li>
<br>
<li>Après avoir installé Docker et Docker Compose sur votre poste de travail, téléchargez le fichier docker-compose.yml dans un dossier de votre poste de travail.
</li>

<br>
<li>
Ouvrez un terminal dans ce dossier, puis executez la commande suivante:
<h6>docker-compose up</h6>
</li>


<br>
<li>
Docker va charger et installer les différentes images nécessaires au projet. Le process peut prendre quelques minutes, et s'achèvera lorsque le terminal affichera:"Server is up and ready. Enjoy your app at port 99"
</li>


<br>
<li>
L'appli est prête. Rendez-vous dans votre navigateur préféré (nous recommandons Mozilla Firefox), à l'adresse suivante:
<a>http://localhost:99</a>
</li>

<br>
<li>
Mission accomplie!
</li>

</ol>

<h3>Ports par défaut</h3>
L'application est configurée pour utiliser par défaut les ports suivants de la machine Host:
<ul>
<li>Database: port 3305</li>
<li>API: port 3333</li>
<li>Front: port 99</li>
</ul>

Vous pouvez modifier ces éléments directement dans le fichier docker-compose.yml

<h3>Structure de l'application</h3>
Le projet est construit autour des trois containers suivants:
<ol>
<br>
<li>Database: image basée sur l'image officielle MySql. Une base de données pré-remplie est fournie pour votre comfort.</li>
<br>
<li>API: image basée sur l'image officielle NodeJS. Back-end Express faisant l'intermédiaire entre la database et le front.</li>
<br>
<li>Front: image basée sur l'image officielle NGINX. Application front-end écrite en Vue.JS, permettant à l'utilisateur d'interroger la base de donnée par l'intermédiaire de l'API. </li>
</ol>
