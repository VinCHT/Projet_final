let monCanvas = new Canvas(document.getElementById('canvas'),this.canvas.getContext('2d'),document.querySelector('input[name="penColor"]'),document.querySelector('input[name="penWidth"]'),false,10,10,document.querySelector('#annuler'),document.getElementById('reserver'),false,0,0);
monCanvas.evenement();

let MonSliders = new MonSlider(null,document.getElementById("playPause"),0,document.getElementsByClassName("contenuImages"),document.querySelector(".legende .legendeText"));
MonSliders.setTimer();
