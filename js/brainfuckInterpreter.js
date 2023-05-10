const cols = 150;
const mem_size = 1000;
let memory = [];
const openedBracketMemoryPosition = {};
const closedBracketMemoryPosition = {};
let pointer = 0;

newBfCodeInput(true);

initMemory();

function initMemory(){
  memory = []
  for (i = 0; i < mem_size; i++){
    memory.push(0);
  }
}

function newBfCodeInput(isFirst) {
  const content = "<p>C:\\> bf -interpreter</p><textarea autofocus=\"true\" class=\"terminal-lines\" autocorrect=\"off\" spellcheck=\"false\" rows=\"100\" cols=\"" + cols + "\"/>";
  
  if(isFirst){
    document.getElementById("terminal").innerHTML += content;
  }else{
    writeTerminal(content);
  }
  let terminalLine = document.getElementsByClassName("terminal-lines")[document.getElementsByClassName("terminal-lines").length - 1];
  terminalLine.focus();
  terminalLine.addEventListener("keydown", run);
  initMemory();
}

function run(event) {
  if (event.key == "Enter") {
    const textarea = document.getElementsByClassName("terminal-lines")[document.getElementsByClassName("terminal-lines").length - 1];
    textarea.autofocus = false;
    textarea.blur();
    textarea.setAttribute("rows", Math.ceil(textarea.value.length / textarea.cols));
    textarea.disabled = true;
    readCode(textarea.value.replace("\n", ""));
  }
}


function readCode(code) {
  for(let i = 0; i < code.length; i++){
    try{
      i = interpret(code[i], i, code);
    }catch(error){
      continue;
    }
  }
  newBfCodeInput(false);
}

function interpret(char, index, code){
  switch(char){
    case ">":
      pointer += 1;
      break;
    case "<":
      pointer -= 1;
      break;
    case ".":
      writeTerminal("<p>" + String.fromCharCode(memory[pointer]) + "</p>");
      break;
    case ",":
      break;
    case "+":
      memory[pointer] = memory[pointer] < 255 ? memory[pointer] + 1 : 0;
      break;
    case "-":
      memory[pointer] = memory[pointer] > 0 ? memory[pointer] - 1 : 255;
      break;
    case "[":
      if(memory[pointer] == 0){
        return findCorrespondingClosedBracket(index, code);
      }
      break;
    case "]":
      if(memory[pointer] != 0){
        return findCorrespondingOpenedBracket(index, code);
      }
      break;
    default:
      console.info("Skipped an unknown char.");
      break;
  }
  return index;
}

function writeTerminal(string) {
  try{
    document.getElementById("terminal").children.item(document.getElementById("terminal").children.length - 1).insertAdjacentHTML("afterend", string);
  }catch(error){
    document.getElementById("terminal").innerHTML += string;
  }
}

function findCorrespondingClosedBracket(position, text){
  let offset = 1;
  let additionalOpenedBracket = 0;
  while(true){
    if(text[position + offset] == "]"){
      if(additionalOpenedBracket == 0){
        return position + offset;
      }else{
        additionalOpenedBracket -= 1;
      }
    }
    if(offset > 1000){
      break; //To stop infinite loop in case of too much char before the corresponding bracket
    }
    if(text[position + offset] == "["){
      additionalOpenedBracket += 1;
    }
    offset += 1;
  }
}

function findCorrespondingOpenedBracket(position, text){
  let offset = 1;
  let additionalClosedBracket = 0;
  while(true){
    if(text[position - offset] == "["){
      if(additionalClosedBracket == 0){
        return position - offset;
      }else{
        additionalClosedBracket -= 1;
      }
    }
    if(text[position - offset] == "]"){
      additionalClosedBracket += 1;
    }
    offset += 1;
  }
}