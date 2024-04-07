const settings = {
    "theme": "../Styles/Themes/black.css",
    "htmljs": true
};

const LoadTheme = async function() {
    document.getElementById('theme').innerHTML = await (await fetch(settings.theme)).text();
}

const Start = async function() {
    await LoadTheme();
    UpdateSyntax();
    UpdateHTML();
}

const UpdateSyntax = function() {
    document.getElementById('codeDisplay').innerHTML = hljs.highlight(document.getElementById('htmlInput').value, { language: "xml" }).value.replace(/\n/g, "<br>");
}

const UpdateHTML = function() {
    let html = document.getElementById('htmlInput').value;

    // HTMLJS
    // HTMLJS is implimenting javascript into html
    if(settings.htmljs === true) {
        html = html.replace(/{{([^{}]+)}}/g, (_, code) => {
            return Function(`"use strict"; return ${code}`)();
        });
    }

    document.querySelector('.display').src = 'data:text/html,'+encodeURIComponent(html);
}

// TODO: add this
const Import = function() {
    document.getElementById("ImportDialog").setAttribute("open", true);
}

const Export = function() {
    let html = document.getElementById('htmlInput').value;
    
    // HTMLJS
    // HTMLJS is implimenting javascript into html
    if(settings.htmljs === true) {
        html = html.replace(/{{([^{}]+)}}/g, (_, code) => {
            return Function(`"use strict"; return ${code}`)();
        });
    }

    alert(html);
}

Start();