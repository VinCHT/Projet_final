
var Maps = {
    lat : 45.757,
    lng : 4.85, 
    iconDefault : "./images/orange.png", 
    markers : [], 

    initMap : function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(this.lat, this.lng),
            zoom : 13 
        });
    },

    iconMarqueur : function(statusStation) {
        return statusStation === "OPEN" ? this.iconDefault = "./images/green.png" : this.iconDefault = "./images/red.png";
    },
    
    initMarqueur : function(positionStation) {
        marker = new google.maps.Marker({
            map : map,
            icon: this.iconDefault,
            position : positionStation 
        });
        this.markers.push(marker);
    },

    // Méthode pour le regroupement de marqueurs
    regroupementMarqueurs : function() {
        marqueurCluster = new MarkerClusterer(map, this.markers,
        {
            imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        });
    },

    surligne:function(champ, erreur)
    {
     if(erreur)
        champ.style.backgroundColor = "#fba";
     else
        champ.style.backgroundColor = "";
    },
  
  
  verifPseudo:function (champ) {
   
   if(champ.value.length < 2 || champ.value.length > 25)
   {
    Maps.surligne(champ, true);
      return false;
   }
   else
   {
    Maps.surligne(champ, false);
      return true;
   }
  },
  
  
  verifPrenom:function (champ)
  {
   if(champ.value.length < 2 || champ.value.length > 25)
   {
    Maps.surligne(champ, true);
      return false;
   }
   else
   {
    Maps.surligne(champ, false);
      return true;
   }
  },
  
  verifForm :function (f)
  {
   
   let pseudoOk = Maps.verifPseudo(f.pseudo);
   let prenomOk = Maps.verifPseudo(f.prenom);
   
   if(pseudoOk && prenomOk) {
     
      blocBas.style.display="block";
    return true;
   }
    
   else
   {
  
      return false;
    
   }
  
  },


};




