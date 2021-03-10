var hasBone = ["boneless", "bone"];
    var bone = ["fish", "amphibians", "reptile", "bird", "mammal"];
    var boneless = ["molluscs", "arthropods", "worm", "sponge", "jellyfish"];
    var eatMeat = ["noMeat", "eatMeat"];
    var liveWhere = ["river", "sea", "ground"];

    var list = {
      bone: {
        fish: {
          noMeat: {
            river: ["carp", "snakehead", "trout", "bass", "perch", "snapper"],
            sea: ["manta ray", "puffer fish", "tuna", "mackerel", "herring"],
          },
          eatMeat: {
            river: ["piranha", "cod", "sardine"],
            sea: ["shark", "hammerhead", "flounder"],
          },
        },
        amphibians: {
          noMeat: {
            river: ["frog", "toad", "newt", "caecilian"],
            ground: ["salamander", "turtle", "iguana"],
          },
        },
        reptile: {
          eatMeat: {
            river: [
              "crocodile",
              "alligator",
              "saltwater crocodile",
              "sea snake",
            ],
            ground: ["tyranosaurus", "dinosaur", "spinosaurus"],
          },
        },
        bird: {
          noMeat: {
            river: ["spoonbill", "ostrich", "turkey", "toucan"],
            sea: ["chicken", "rooster", "peacock"],
            ground: ["canary", "sparrow", "parot", "flamingo"],
          },
          eatMeat: {
            river: ["panda", "swan", "mole", "fox", "chipmunk"],
            ground: ["eagle", "falcon", "vulture", "hawk", "kestrel", "owl"],
          },
        },
        mammal: {
          noMeat: {
            river: [
              "otter",
              "hippopotamus",
              "otter",
              "seal",
              "capypara",
              "duck",
            ],
            sea: [
              "sea lion",
              "seacow",
              "walrus",
              "manatee",
              "turkey",
              "goose",
              "squirrel",
            ],
            ground: [
              "elephant",
              "dog",
              "rabbit",
              "hare",
              "horse",
              "cow",
              "panda",
            ],
          },
          eatMeat: {
            river: ["goat", "rhinoceros", "whale", "killer whale", "orca"],
            ground: ["lion", "tiger", "bear", "wolf", "panther", "leopath"],
          },
        },
      },
      boneless: {
        molluscs: "",
        arthropods: "",
        worm: "",
        sponge: ["sponge"],
        jellyfish: ["jellyfish", "astrpecten"],
      },
    };
    var word = getWord();

    var counter = 5;

    var pressed = [];

    var end = false;

    var win = false;

    var inputField = document.getElementById("inputChar");

    var newGame = document.getElementById("new");

    var again = document.getElementById("again");

    var inputChar;

    var guessWords = getHiddenWords(word);

    var guess = guessWords.join(" ");

    document.getElementById("counter").innerHTML = counter;

    document.getElementById("guess").innerHTML = guess;

    again.addEventListener("click", reset);

    newGame.addEventListener("click", aNewGame);

    inputField.addEventListener("keydown", function () {
      if (!end) {
        if (event.keyCode == 13) {
          if (
            pressed.indexOf(inputField.value) < 0 &&
            RegExp("[a-zA-Z]").test(inputField.value)
          ) {
            document.getElementById("error").innerHTML = "";
            inputChar = inputField.value.toLowerCase();
            pressed.push(inputChar);
            if (word.indexOf(inputChar) < 0) {
              counter--;
              document.getElementById("counter").innerHTML = counter;
              if (counter == 0) {
                end = true;
                win = false;
                document.getElementById("count").innerHTML =
                  "You lose. Press any key to restart";
              }
              if (counter == 1) {
                document.getElementById("timer").innerHTML = " time more";
              }
            } else {
              for (i = 0; i < guessWords.length; i++) {
                var index = word.indexOf(inputChar, i);
                guessWords[index] = inputChar;
                if (index >= 0) i = index;
                else break;
              }
              updateHiddenWord();
              if (guessWords.indexOf("_") < 0) {
                end = true;
                win = true;
                document.getElementById("count").innerHTML =
                  "You win. Play more?";
              }
            }
          } else if (pressed.indexOf(inputField.value) >= 0) {
            document.getElementById("error").innerHTML =
              "You have already entered this character";
          } else document.getElementById("error").innerHTML = "Not a character";
          inputField.value = "";
        }
      } else win ? aNewGame() : reset();
    });
    function getWord() {
      var type = Math.floor(Math.random() * 10) % 5;
      var listForType = list.bone[bone[type]];
      var listForFood;
      var count = 0;
      while (listForFood == undefined) {
        listForFood = listForType[eatMeat[Math.floor(Math.random() * 10) % 2]];
      }

      var listForLiving;
      while (listForLiving == undefined) {
        listForLiving =
          listForFood[liveWhere[Math.floor(Math.random() * 10) % 3]];
      }
      var animal;
      while (animal == undefined) {
        animal =
          listForLiving[Math.floor(Math.random() * 20) % listForLiving.length];
      }
      return animal;
    }

    function getHiddenWords(resultWord) {
      var temp;
      temp = resultWord.split("").map((e) => {
        if (e != " ") return "_";
        else return "\n";
      });
      return temp;
    }
    function updateHiddenWord() {
      guess = guessWords.join(" ");
      document.getElementById("guess").innerHTML = guess;
    }

    function reset() {
      end = false;
      counter = 5;
      guessWords = getHiddenWords(word);
      pressed = [];
      document.getElementById("count").innerHTML =
        '<span>You can guess </span><span id="counter"></span><span id="timer"> times left</span>';
      updateHiddenWord();
      document.getElementById("counter").innerHTML = counter;
      document.getElementById("error").innerHTML = "";
    }

    function aNewGame() {
      word = getWord();
      reset();
    }
    /*
  co xuong va khong xuong : 0 , 1
  co xuong: ca, luong cu, bo sat, chim , co vu : 0-4
  khong xuong: than mem, chan khop, giun, bot bien, sua: 0-4
  
  */