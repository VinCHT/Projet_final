var Station = {
  
    nom : null, 
    adresse : null,
    etat : null, 
    nbVelo : null,
    nbAttache : null, 
    emplacementDonnees : document.getElementById("listeInfo"),
    autorisation : null, 
    conclusionElt : document.getElementById("conclusion"),
    formulaireElt : document.getElementById("formulaire"),
    stationInfo : document.getElementById("stationInfo"),
    blocBas : document.getElementById("blocBas"),
    adresseElt: document.getElementById("adresseStation"),
    champsV : sessionStorage.getItem("adresseStation"),
    recupNom : localStorage.getItem("Nom"),
    recupPrenom : localStorage.getItem("Prenom"),
  
   
    ajaxGet : function(url, callback) {
        req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", function() {
            if (req.status >= 200 && req.status < 400) {
         
                callback(req.responseText);
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function() {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    },

   
    traitementDonneesStation : function(donneesStation) {
        
        this.nom = donneesStation.name;
      
        this.adresse = donneesStation.address;
        
      
        this.etat = donneesStation.status;
       
        this.nbAttache = donneesStation.available_bike_stands;
        this.capacite = donneesStation.bike_stands;
        this.nbVelo = donneesStation.available_bikes;
       
       
    },

  
    insertionDonneesStation : function() {
       
        document.getElementById("nomStation").innerHTML = this.nom;
        document.getElementById("adresseStation").innerHTML = this.adresse;
        document.getElementById("status").innerHTML = this.etat;
        document.getElementById("veloDispo").innerHTML = this.nbVelo;
        document.getElementById("attacheDispo").innerHTML = this.nbAttache;
        document.getElementById("capacite").innerHTML = this.capacite;

    },

    initLancement : function() {
        document.getElementById("conclusion").style.display = "none";
        document.getElementById("formulaire").style.display = "none";
        document.getElementById("stationInfo").style.display = "none";
        document.getElementById("blocBas").style.display = "none";
        document.getElementById("reserver").style.display = "none"; 
        Station.takeLocalData();

    },
 


    takeLocalData : function() {
    Station.init();
    Station.onSavePressed();
      
   },


   init : function() {
      
      if (localStorage.Nom && localStorage.Prenom) {
          document.getElementById("inpNom").value = localStorage.Nom;
          document.getElementById("inpPrenom").value = localStorage.Prenom;
      }
     
     if (sessionStorage.getItem("autosave")) {
        champ.value = sessionStorage.getItem("autosave");
      }

      champ.addEventListener("change", function() {
      sessionStorage.setItem("autosave", champ.value);
      });
      

    },
    
    onSavePressed : function () {
     
      localStorage.Nom = document.getElementById("inpNom").value;
      localStorage.Prenom = document.getElementById("inpPrenom").value;
      document.getElementById("reservation").style.display = "block"; 
      MonTimer.stop();
      annulerReservation.innerHTML = 'Annulez votre réservation';
    },

    annulerReservation : function () {
            annulerReservation.innerHTML = 'Vous avez annulé votre réservation';
            MonTimer.stop();
            monCanvas.effacer();
        
    },

    
    autorisationReservation : function() {
        if(this.etat === "CLOSED" || this.nbVelo === 0) { 
            this.etat = "FERMER";
            btnInsert.disabled = true;  
            Station.insertionDonneesStation();
            document.getElementById("formulaire").style.display = "none";
            document.getElementById("blocBas").style.display = "none";
            document.getElementById("stationInfo").style.display = "block";
           
        } else if(this.etat === "OPEN") { 


            btnInsert.disabled = false;  

            Station.insertionDonneesStation();
            this.etat = "OUVERT";
            document.getElementById("stationInfo").style.display = "block";
            document.getElementById("formulaire").style.display = "block";         
            isOutput.innerHTML = `Merci ${this.recupPrenom} ${this.recupNom}  , votre vélo est réservé à la station : ${this.nom}  `;
  
          
        }
       
    }
};

// Appel de la méthode Ajax et récupération de la liste des stations
Station.ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=b3f3dffd90d017cc424e6b909d8b33d30b8d61ff", function(reponse) {
    listeStations = JSON.parse(reponse);
 
    // Parcours les données des stations
    listeStations.forEach(function(reponseInfoStation) {

        
        
        // Appel de la méthode d'attribution d'une icône de marqueur
        Maps.iconMarqueur(reponseInfoStation.status);

        // Appel de la méthode initMarqueur pour positionner les marqueurs sur la carte
        Maps.initMarqueur(reponseInfoStation.position);

        // Ajoute un événement lors du clic sur un marqueur
        google.maps.event.addListener(marker, "click", function() {
          
            sessionStorage.setItem('Adresse', reponseInfoStation.address);
            // Insertion des données dans l'objet "station"
            Station.traitementDonneesStation(reponseInfoStation);

            // Station.autorisationReservation();
            document.getElementById("conclusion").style.display = "none";
          
            Station.autorisationReservation();
        
         
            

        }); // Fin événement clic marqueur
    }); // Fermeture de la boucle pour le parcours des données des stations







   

    // Appel de la méthode "marker Clusterer"
    Maps.regroupementMarqueurs();
});
