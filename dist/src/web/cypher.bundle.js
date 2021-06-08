/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/web/domain/encryption.ts":
/*!**************************************!*\
  !*** ./src/web/domain/encryption.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decryptFile = exports.encryptFile = void 0;
function readFile(file) {
    return new Promise((resolve, reject) => {
        var fr = new FileReader();
        fr.onload = () => {
            if (!fr.result || typeof fr.result === "string") {
                return reject();
            }
            resolve(fr.result);
        };
        fr.readAsArrayBuffer(file);
    });
}
async function encryptFile(objFile, encPassPhrase) {
    const plainTextBytes = new Uint8Array(await readFile(objFile));
    const pbkdf2iterations = 10000;
    const passPhraseBytes = new TextEncoder().encode(encPassPhrase);
    const pbkdf2salt = crypto.getRandomValues(new Uint8Array(8));
    const passPhraseKey = await crypto.subtle.importKey("raw", passPhraseBytes, { name: "PBKDF2" }, false, ["deriveBits"]);
    console.log("passphrasekey imported");
    const pbkdf2bytes = new Uint8Array(await crypto.subtle.deriveBits({
        name: "PBKDF2",
        salt: pbkdf2salt,
        iterations: pbkdf2iterations,
        hash: "SHA-256",
    }, passPhraseKey, 384));
    console.log("pbkdf2bytes derived");
    const keyBytes = pbkdf2bytes.slice(0, 32);
    const ivBytes = pbkdf2bytes.slice(32);
    const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC", length: 256 }, false, ["encrypt"]);
    console.log("key imported");
    const cipherBytes = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-CBC", iv: ivBytes }, key, plainTextBytes));
    console.log("plaintext encrypted");
    const resultBytes = new Uint8Array(cipherBytes.length + 16);
    resultBytes.set(new TextEncoder().encode("Salted__"));
    resultBytes.set(pbkdf2salt, 8);
    resultBytes.set(cipherBytes, 16);
    const blob = new Blob([resultBytes], { type: "application/download" });
    return blob;
}
exports.encryptFile = encryptFile;
async function decryptFile(objFile, decPassPhrase) {
    const cipherBytesA = new Uint8Array(await readFile(objFile));
    const pbkdf2iterations = 10000;
    const passPhraseBytes = new TextEncoder().encode(decPassPhrase);
    const pbkdf2salt = cipherBytesA.slice(8, 16);
    const passPhraseKey = await crypto.subtle.importKey("raw", passPhraseBytes, { name: "PBKDF2" }, false, ["deriveBits"]);
    console.log("passphrasekey imported");
    const pbkdf2bytes = new Uint8Array(await crypto.subtle.deriveBits({
        name: "PBKDF2",
        salt: pbkdf2salt,
        iterations: pbkdf2iterations,
        hash: "SHA-256",
    }, passPhraseKey, 384));
    console.log("pbkdf2bytes derived");
    const keyBytes = pbkdf2bytes.slice(0, 32);
    const ivBytes = pbkdf2bytes.slice(32);
    const cipherBytes = cipherBytesA.slice(16);
    const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC", length: 256 }, false, ["decrypt"]);
    console.log("key imported");
    const plainTextBytes = new Uint8Array(await crypto.subtle.decrypt({ name: "AES-CBC", iv: ivBytes }, key, cipherBytes));
    console.log("ciphertext decrypted");
    return new Blob([plainTextBytes], { type: "application/download" });
}
exports.decryptFile = decryptFile;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./src/web/workers/cypher.ts ***!
  \***********************************/
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const encryption_1 = __webpack_require__(/*! ../domain/encryption */ "./src/web/domain/encryption.ts");
onmessage = async function (e) {
    console.log('Worker: Message received from main script');
    const msg = e.data;
    console.log(e);
    if (msg.cmd === 'encrypt') {
        const encryptedFile = await encryption_1.encryptFile(msg.file, msg.password);
        // @ts-ignore
        postMessage({ encryptedFile, name: msg.file.name, password: msg.password });
    }
    else {
        const decryptedFile = await encryption_1.decryptFile(msg.file, msg.password);
        // @ts-ignore
        postMessage(decryptedFile);
    }
};

})();

/******/ })()
;
//# sourceMappingURL=cypher.bundle.js.map