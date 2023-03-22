const cols = 150;
const mem_size = 1000;
const memory = [];
for (i = 0; i < mem_size; i++){
  memory.push(0);
}
let pointer = 0;

newBfCodeInput(true);

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
}

function run(event) {
  if (event.key == "Enter") {
    const textarea = document.getElementsByClassName("terminal-lines")[document.getElementsByClassName("terminal-lines").length - 1];
    textarea.autofocus = false;
    textarea.blur();
    textarea.setAttribute("rows", Math.floor(textarea.value.length / (cols + 5)));
    textarea.disabled = true;
    readCode(textarea.value);
  }
}


function readCode(code) {
  code.split("").forEach(e => interpret(e));
  newBfCodeInput(false);
}

function interpret(char){
  switch(char){
    case ">":
      pointer += 1;
      break;
    case "<":
      pointer -= 1;
      break;
    case ".":
      writeTerminal("<p>" + memory[pointer] + "</p>");
      break;
    case ",":
      break;
    case "+":
      memory[pointer] += 1;
      break;
    case "-":
      memory[pointer] -= 1;
      break;
    case "[":
      break;
    case "]":
      break;
    default:
      console.info("Skipped an unknown char.");
      break;
  }
}

function writeTerminal(string) {
  try{
    document.getElementById("terminal").children.item(document.getElementById("terminal").children.length - 1).insertAdjacentHTML("afterend", string);
  }catch(error){
    document.getElementById("terminal").innerHTML += string;
  }
}