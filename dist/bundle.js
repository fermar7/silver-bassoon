/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/html_parser.js":
/*!****************************!*\
  !*** ./src/html_parser.js ***!
  \****************************/
/*! exports provided: parseHtml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseHtml\", function() { return parseHtml; });\nconst openAb = '<';\r\nconst closeAb = '>';\r\nconst equas = '=';\r\nconst apostroph = '\"';\r\nconst asterisk = '*';\r\nconst space = ' ';\r\nconst special = [ openAb, closeAb, equas, apostroph, asterisk, space ];\r\n\r\n\r\nfunction parseHtml(html) {\r\n    let rootToken = new Token('root', undefined);\r\n\r\n    let currentToken = rootToken;\r\n    for (let index = 0; index < html.length; index++) {\r\n        let currentChar = html.charAt(index);\r\n        if (currentChar == openAb) {\r\n            debugger;\r\n            let nameInfo = inspectTag(html, index + 1);\r\n            if (nameInfo.closing) {\r\n                let matchingToken = currentToken.parent.tokens.find((elem) => elem.name == nameInfo.name && elem.open);\r\n                if (matchingToken) {\r\n                    matchingToken.open = false;\r\n                    currentToken = currentToken.parent;\r\n                }\r\n                else if (currentToken.parent.parent) {\r\n                    let matchingParentToken = currentToken.parent.parent.tokens.find((elem) => elem.name == nameInfo.name && elem.open);\r\n                    if (matchingParentToken) {\r\n                        matchingParentToken.open = false;\r\n                        currentToken = matchingParentToken.parent;\r\n                    }\r\n                }\r\n                else {\r\n                    let newToken = new Token(nameInfo.name, currentToken);\r\n                    newToken.open = false;\r\n                    currentToken.addToken(newToken);\r\n                }\r\n            }\r\n            else {\r\n                let newToken = new Token(nameInfo.name, currentToken);\r\n                currentToken.addToken(newToken);\r\n                currentToken = newToken;\r\n            }\r\n            index = nameInfo.index;\r\n        }\r\n    }\r\n    console.log(rootToken);\r\n}\r\n\r\nfunction inspectTag(html, index) {\r\n    let result = { name: name, index: index, closing: false };\r\n    let recordingName = true;\r\n    for (; result.index < html.length; result.index++) {\r\n        const element = html[result.index];\r\n        if (element == \"/\") {\r\n            result.closing = true;\r\n            continue;\r\n        }\r\n\r\n        if (special.indexOf(element) != -1) {\r\n            recordingName = false;\r\n        }\r\n\r\n        if (recordingName) {\r\n            result.name += element;\r\n        }\r\n\r\n        if (element == closeAb) {\r\n            return result;\r\n        }\r\n    }\r\n}\r\n\r\nclass Token {\r\n    constructor(name, parent) {\r\n        this.tokens = [];\r\n        this.name = name;\r\n        this.parent = parent;\r\n        this.open = true;\r\n    }\r\n\r\n    addToken(token) {\r\n        this.tokens.push(token);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/html_parser.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _html_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html_parser */ \"./src/html_parser.js\");\n\r\n\r\nwindow.onload = function() {\r\n    var components = [\r\n        { selector: 'app-root', render: AppRootComponent, bootstrap: true },\r\n        { selector: 'hello-world', render: HelloWorldComponent }\r\n    ];\r\n\r\n    let appRootComponent = getBootstrapComponent(components);\r\n    let html = appRootComponent.render();\r\n    console.log('HTML: ');\r\n    Object(_html_parser__WEBPACK_IMPORTED_MODULE_0__[\"parseHtml\"])(html);\r\n\r\n    let appRoot = document.querySelector(appRootComponent.selector);\r\n    appRoot.innerHTML = appRootComponent.render();\r\n}\r\n\r\nfunction getBootstrapComponent(components) {\r\n    for (const iterator of components) {\r\n        if (iterator.bootstrap) {\r\n            return iterator;\r\n        }\r\n    }\r\n}\r\n\r\nfunction AppRootComponent() {\r\n    return `\r\n        <div>\r\n            <h1>App Component</h1>\r\n            <hello-world></hello-world>\r\n            <input />\r\n        </div>\r\n    `;\r\n}\r\n\r\nfunction HelloWorldComponent() {\r\n    return `\r\n        <h3>Hello, world!</h3>\r\n    `;\r\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });