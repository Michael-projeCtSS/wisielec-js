var passwords = [];
var currentPassword = '';

var length;
var ile_skuch = 0;

var yes = new Audio("/sounds/yes.wav");
var no = new Audio("/sounds/no.wav");

var password1 = "";

function sayPassword() {
  document.getElementById("board").innerHTML = password1;
}

window.onload = start;

var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

function start() {
  // Poproś użytkownika o wprowadzenie 3 haseł
  for (var i = 0; i < 3; i++) {
    var password = prompt("Podaj hasło " + (i + 1));
    passwords.push(password.toUpperCase());
  }

  // Losuj jedno password
  currentPassword = getRandomPassword();

  length = currentPassword.length;

  for (i = 0; i < length; i++) {
    if (currentPassword.charAt(i) == " ") password1 = password1 + " ";
    else password1 = password1 + "-";
  }

  var tresc_diva = "";

  for (i = 0; i <= 34; i++) {
    var element = "lit" + i;
    tresc_diva =
      tresc_diva +
      '<div class="letter" onclick="sprawdz(' +
      i +
      ')" id="' +
      element +
      '">' +
      letters[i] +
      "</div>";
    if ((i + 1) % 7 == 0) tresc_diva = tresc_diva + '<div style="clear:both;"></div>';
  }

  document.getElementById("abc").innerHTML = tresc_diva;

  sayPassword();
}

String.prototype.ustawZnak = function (miejsce, znak) {
  if (miejsce > this.length - 1) return this.toString();
  else return this.substr(0, miejsce) + znak + this.substr(miejsce + 1);
};

function getRandomPassword() {
  var randomIndex = Math.floor(Math.random() * passwords.length);
  return passwords[randomIndex];
}

function sprawdz(nr) {
  var trafiona = false;

  for (i = 0; i < length; i++) {
    if (currentPassword.charAt(i) == letters[nr]) {
      password1 = password1.ustawZnak(i, letters[nr]);
      trafiona = true;
    }
  }

  if (trafiona == true) {
    yes.play();
    var element = "lit" + nr;
    document.getElementById(element).style.background = "#003300";
    document.getElementById(element).style.color = "#00C000";
    document.getElementById(element).style.border = "3px solid #00C000";
    document.getElementById(element).style.cursor = "default";

    sayPassword();
  } else {
    no.play();
    var element = "lit" + nr;
    document.getElementById(element).style.background = "#330000";
    document.getElementById(element).style.color = "#C00000";
    document.getElementById(element).style.border = "3px solid #C00000";
    document.getElementById(element).style.cursor = "default";
    document.getElementById(element).setAttribute("onclick", ";");

    //skucha
    ile_skuch++;
    var obraz = "img/s" + ile_skuch + ".jpg";
    document.getElementById("gallows").innerHTML = '<img src="' + obraz + '" alt="" />';
  }

  //wygrana
  if (currentPassword == password1)
    document.getElementById("abc").innerHTML =
      "Tak jest! Podano prawidłowe hasło: " +
      currentPassword +
      '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';

  //przegrana
  if (ile_skuch >= 9)
    document.getElementById("abc").innerHTML =
      "Przegrana! Prawidłowe hasło: " +
      currentPassword +
      '<br /><br /><span class="reset" onclick="location.reload()">JESZCZE RAZ?</span>';
}
