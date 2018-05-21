const openAb = '<';
const closeAb = '>';
const equas = '=';
const apostroph = '"';
const asterisk = '*';
const space = ' ';
const special = [ openAb, closeAb, equas, apostroph, asterisk, space ];


export function parseHtml(html) {
    let rootToken = new Token('root', undefined);

    let currentToken = rootToken;
    for (let index = 0; index < html.length; index++) {
        let currentChar = html.charAt(index);
        if (currentChar == openAb) {
            let nameInfo = inspectTag(html, index + 1);
            if (nameInfo.closing) {
                let matchingToken = currentToken.parent.tokens.find((elem) => elem.name == nameInfo.name && elem.open);
                if (matchingToken) {
                    matchingToken.open = false;
                    currentToken = currentToken.parent;
                } else if (currentToken.parent.parent) {
                    let matchingParentToken = currentToken.parent.parent.tokens.find((elem) => elem.name == nameInfo.name && elem.open);
                    if (matchingParentToken) {
                        matchingParentToken.open = false;
                        currentToken = matchingParentToken.parent;
                    }
                } else {
                    let newToken = new Token(nameInfo.name, currentToken);
                    newToken.open = false;
                    currentToken.addToken(newToken);
                }
            } else {
                let newToken = new Token(nameInfo.name, currentToken);
                currentToken.addToken(newToken);
                currentToken = newToken;
            }
            index = nameInfo.index;
        }
    }
    console.log(rootToken);
}

function inspectTag(html, index) {
    let result = { name: name, index: index, closing: false };
    let recordingName = true;
    for (; result.index < html.length; result.index++) {
        const element = html[result.index];
        if (element == "/") {
            result.closing = true;
            continue;
        }

        if (special.indexOf(element) != -1) {
            recordingName = false;
        }

        if (recordingName) {
            result.name += element;
        }

        if (element == closeAb) {
            return result;
        }
    }
}

class Token {
    constructor(name, parent) {
        this.tokens = [];
        this.name = name;
        this.parent = parent;
        this.open = true;
    }

    addToken(token) {
        this.tokens.push(token);
    }
}
