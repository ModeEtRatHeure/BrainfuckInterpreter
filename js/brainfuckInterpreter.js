newBfCodeInput();

function newBfCodeInput(){
    writeTerminal("<p>C:\\> bf -interpreter</p><textarea autofocus=\"true\" class=\"terminal-lines\" autocorrect=\"off\" spellcheck=\"false\" rows=\"100\" cols=\"150\"/>");
    document.getElementsByClassName("terminal-lines")[document.getElementsByClassName("terminal-lines").length - 1].addEventListener("keydown", run);
}

function run(event){
    if(event.key == "Enter"){
        const textarea = document.getElementsByClassName("terminal-lines")[document.getElementsByClassName("terminal-lines").length - 1];
        textarea.autofocus = false;
        textarea.blur();
        textarea.setAttribute("rows", 1);
        interpret(textarea.value);
    }
}

function interpret(code){
    const memory = [];
    code.split("").forEach();
}

function writeTerminal(string){
    document.getElementById("terminal").innerHTML += string;
}