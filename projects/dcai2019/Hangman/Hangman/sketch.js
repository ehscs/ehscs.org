var url = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=15&api_key=2e287f44795857d46000603b0b00afa78ec280650f433265f"
var defURL; 
var word;
var count = 1;
var tries;
var guessed = [];
var g;
var inp;
var error;
var revealed = 0;
var displayGuess;
var def;
var wordType;

async function setup(){
  await getWord();
  await getDef();

  tries = createP("6 Tries Remaining");
    createCanvas(500,250);

    g = createSpan("<br><br>Guess: ");
    inp = createInput();
    inp.changed(guess);
    inp.attribute("type","text");
	inp.attribute("maxlength","1");
	inp.attribute("style","width: 32px");

    for(i=0; i<word.length; i++){
      x = i*25+10
      if(word.charAt(i)==="-"){
        line(x+3,215,x+17,215);
        revealed++;
      }
      else{
        line(x,225,x+20,225)
      }
    }


  line(50,175,175,175)
  line(100,175,100,25)
  line(100,25,140,25)
  line(140,25,140,40)

  error = createP("");
}


function getWord(x){
  return new Promise(resolve => {
    loadJSON(url, w => {
      word = w.word;
      defURL = `http://api.wordnik.com:80/v4/word.json/${word}/definitions?limit=1&includeRelated=true&useCanonical=true&includeTags=false&api_key=2e287f44795857d46000603b0b00afa78ec280650f433265f`;
      //console.log(word);
      resolve(x);
    });
  })
}

function getDef(x){
	return new Promise(resolve => {
    loadJSON(defURL, d => {
      def = d[0].text;
      wordType = d[0].partOfSpeech;
      //console.log(wordType);
      //console.log(def);
      resolve(x);
    });
  })
}

function guess(){
  error.html("");
  var letter = inp.value().toLowerCase();
  inp.value("");

  if(letter.charCodeAt(0)>122||letter.charCodeAt(0)<97) return error.html("Invalid Guess.");


  if(guessed.includes(letter)) return error.html("You already guessed that letter!");
  guessed.push(letter);

  

  if(word.toLowerCase().indexOf(letter)<0){

    tries.html(`${6-count} Tries Remaining`);
    textFont('Helvetica');
    textSize(18);
    text(guessed.join(" "),200,100);

    if(count===1) ellipse(140,53,25,25);
    if(count===2) line(140,65,140,115)
    if(count===3) line(140,77,165,90);
    if(count===4) line(140,77,115,90);
    if(count===5) line(140,115,115,150)
    if(count===6) line(140,115,165,150)


    if(6-count<1){
      tries.html(`You Lost!`);
      inp.remove();
      g.remove();

      if(def.length) createP(`${word}: ${wordType}; ${def}`);

      for(i=0; i<word.length; i++){
        x = i*25+10
        if(word.charAt(i)==="-"){

        }
        else{
          textSize(18);
          textFont('Helvetica');
          text(word.charAt(i), x+7, 220);
        }
      }

    }
    else{
      
    }
    
    count++;
  
  }
  else{
    textFont('Helvetica');
    textSize(18);
    text(guessed.join(" "),200,100);
    for(i=0; i<word.length; i++){
      if(letter == word.charAt(i).toLowerCase())
      {
        revealed++;
        x = i*25+10
        if(word.charAt(i)==="-"){

        }
        else{
          textSize(18);
          textFont('Helvetica');
          text(word.charAt(i), x+7, 220);
        }
      }    
    }
  }

  if(revealed === word.length){
    
    tries.html(`You Won!`);
    inp.remove();
    g.remove();

    if(def.length) createP(`${word}: ${wordType}, ${def}`);
  }
  
}