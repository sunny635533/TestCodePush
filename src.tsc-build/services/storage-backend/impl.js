"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
function inMemoryBackend() {
    const store = {};
    return {
        setItem: (key, value) => __awaiter(this, void 0, void 0, function* () {
            store[key] = value;
        }),
        getItem: (key) => __awaiter(this, void 0, void 0, function* () {
            return store[key];
        }),
        removeItem: (key) => __awaiter(this, void 0, void 0, function* () {
            delete store[key];
        }),
    };
}
exports.inMemoryBackend = inMemoryBackend;
function asyncStorageBackend() {
    return {
        setItem: (key, value) => __awaiter(this, void 0, void 0, function* () {
            yield react_native_1.AsyncStorage.setItem(key, value);
        }),
        getItem: (key) => __awaiter(this, void 0, void 0, function* () {
            return yield react_native_1.AsyncStorage.getItem(key);
        }),
        removeItem: (key) => __awaiter(this, void 0, void 0, function* () {
            yield react_native_1.AsyncStorage.removeItem(key);
        }),
    };
}
exports.asyncStorageBackend = asyncStorageBackend;
