"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("@src/services/storage-backend/util");
const M = __importStar(require("@src/model"));
function loadLanguage(service, defaultValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const v = new util_1.PersistentValue('language', util_1.Conv.jsonConvWithValidator(M.Language.check), service);
        yield v.load(() => defaultValue);
        return v;
    });
}
function loadBoolean(backend, key, defaultValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const v = new util_1.PersistentValue(key, util_1.Conv.jsonConvWithValidator(x => typeof x === 'boolean'), backend);
        yield v.load(() => defaultValue);
        return v;
    });
}
class PersistentStorageService {
    constructor(backend) {
        this.backend = backend;
    }
    get language() { return this.language_; }
    get notificationEnabled() { return this.notificationEnabled_; }
    loadInternal(defaultValues) {
        return __awaiter(this, void 0, void 0, function* () {
            this.language_ = yield loadLanguage(this.backend, defaultValues.language);
            this.notificationEnabled_ = yield loadBoolean(this.backend, 'notificationEnabled', defaultValues.notificationEnabled);
        });
    }
    static load(backend, defaultValues) {
        return __awaiter(this, void 0, void 0, function* () {
            const thiz = new PersistentStorageService(backend);
            yield thiz.loadInternal(defaultValues);
            return thiz;
        });
    }
}
exports.PersistentStorageService = PersistentStorageService;
