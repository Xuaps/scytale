"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.decryptFile = exports.encryptFile = void 0;
function readFile(file) {
    return new Promise(function (resolve, reject) {
        var fr = new FileReader();
        fr.onload = function () {
            if (!fr.result || typeof fr.result === "string") {
                return reject();
            }
            resolve(fr.result);
        };
        fr.readAsArrayBuffer(file);
    });
}
function encryptFile(objFile, encPassPhrase) {
    return __awaiter(this, void 0, void 0, function () {
        var plainTextBytes, _a, pbkdf2iterations, passPhraseBytes, pbkdf2salt, passPhraseKey, pbkdf2bytes, _b, keyBytes, ivBytes, key, cipherBytes, _c, resultBytes, blob;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = Uint8Array.bind;
                    return [4 /*yield*/, readFile(objFile)];
                case 1:
                    plainTextBytes = new (_a.apply(Uint8Array, [void 0, _d.sent()]))();
                    pbkdf2iterations = 10000;
                    passPhraseBytes = new TextEncoder().encode(encPassPhrase);
                    pbkdf2salt = window.crypto.getRandomValues(new Uint8Array(8));
                    return [4 /*yield*/, window.crypto.subtle.importKey("raw", passPhraseBytes, { name: "PBKDF2" }, false, ["deriveBits"])];
                case 2:
                    passPhraseKey = _d.sent();
                    console.log("passphrasekey imported");
                    _b = Uint8Array.bind;
                    return [4 /*yield*/, window.crypto.subtle.deriveBits({
                            name: "PBKDF2",
                            salt: pbkdf2salt,
                            iterations: pbkdf2iterations,
                            hash: "SHA-256"
                        }, passPhraseKey, 384)];
                case 3:
                    pbkdf2bytes = new (_b.apply(Uint8Array, [void 0, _d.sent()]))();
                    console.log("pbkdf2bytes derived");
                    keyBytes = pbkdf2bytes.slice(0, 32);
                    ivBytes = pbkdf2bytes.slice(32);
                    return [4 /*yield*/, window.crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC", length: 256 }, false, ["encrypt"])];
                case 4:
                    key = _d.sent();
                    console.log("key imported");
                    _c = Uint8Array.bind;
                    return [4 /*yield*/, window.crypto.subtle.encrypt({ name: "AES-CBC", iv: ivBytes }, key, plainTextBytes)];
                case 5:
                    cipherBytes = new (_c.apply(Uint8Array, [void 0, _d.sent()]))();
                    console.log("plaintext encrypted");
                    resultBytes = new Uint8Array(cipherBytes.length + 16);
                    resultBytes.set(new TextEncoder().encode("Salted__"));
                    resultBytes.set(pbkdf2salt, 8);
                    resultBytes.set(cipherBytes, 16);
                    blob = new Blob([resultBytes], { type: "application/download" });
                    return [2 /*return*/, blob];
            }
        });
    });
}
exports.encryptFile = encryptFile;
function decryptFile(objFile, decPassPhrase) {
    return __awaiter(this, void 0, void 0, function () {
        var cipherBytesA, _a, pbkdf2iterations, passPhraseBytes, pbkdf2salt, passPhraseKey, pbkdf2bytes, _b, keyBytes, ivBytes, cipherBytes, key, plainTextBytes, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = Uint8Array.bind;
                    return [4 /*yield*/, readFile(objFile)];
                case 1:
                    cipherBytesA = new (_a.apply(Uint8Array, [void 0, _d.sent()]))();
                    pbkdf2iterations = 10000;
                    passPhraseBytes = new TextEncoder().encode(decPassPhrase);
                    pbkdf2salt = cipherBytesA.slice(8, 16);
                    return [4 /*yield*/, window.crypto.subtle.importKey("raw", passPhraseBytes, { name: "PBKDF2" }, false, ["deriveBits"])];
                case 2:
                    passPhraseKey = _d.sent();
                    console.log("passphrasekey imported");
                    _b = Uint8Array.bind;
                    return [4 /*yield*/, window.crypto.subtle.deriveBits({
                            name: "PBKDF2",
                            salt: pbkdf2salt,
                            iterations: pbkdf2iterations,
                            hash: "SHA-256"
                        }, passPhraseKey, 384)];
                case 3:
                    pbkdf2bytes = new (_b.apply(Uint8Array, [void 0, _d.sent()]))();
                    console.log("pbkdf2bytes derived");
                    keyBytes = pbkdf2bytes.slice(0, 32);
                    ivBytes = pbkdf2bytes.slice(32);
                    cipherBytes = cipherBytesA.slice(16);
                    return [4 /*yield*/, window.crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC", length: 256 }, false, ["decrypt"])];
                case 4:
                    key = _d.sent();
                    console.log("key imported");
                    _c = Uint8Array.bind;
                    return [4 /*yield*/, window.crypto.subtle.decrypt({ name: "AES-CBC", iv: ivBytes }, key, cipherBytes)];
                case 5:
                    plainTextBytes = new (_c.apply(Uint8Array, [void 0, _d.sent()]))();
                    console.log("ciphertext decrypted");
                    return [2 /*return*/, new Blob([plainTextBytes], { type: "application/download" })];
            }
        });
    });
}
exports.decryptFile = decryptFile;
