function generateSalt() {
  var tab = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var result = '';

  for (var i=0; i<16; i++) {
    result += tab[Math.floor(Math.random() * tab.length)];
  }

  return result;
}

document.addEventListener("DOMContentLoaded", function() {
  var textField = document.getElementById("password");
  var cryptField = document.getElementById("crypt");
  var crypt = '';
  var timer;

  var setCrypt = function(newCrypt) {
    crypt = newCrypt;
    cryptField.value = crypt;
  };

  textField.addEventListener("input", function() {
    if (timer) {
      clearTimeout(timer);
    }

    if (!textField.value) {
      setCrypt('');
      return;
    }

    setCrypt('...');

    timer = setTimeout(function() {
      timer = null;
      var salt = generateSalt();
      setCrypt(sha512crypt(textField.value, salt));
    }, 500);
  });

  cryptField.addEventListener("focus", function() {
    cryptField.select();
  });

  cryptField.addEventListener("input", function() {
    cryptField.value = crypt;
  });

  document.getElementById("password-visible").addEventListener("change", function() {
    textField.type = this.checked ? "text" : "password";
  });
});
