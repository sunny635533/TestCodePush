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
const M = __importStar(require("@src/model"));
var DefaultStorageValues;
(function (DefaultStorageValues) {
    function state() {
        return {
            language: M.Language.CN,
            notificationEnabled: true,
        };
    }
    DefaultStorageValues.state = state;
})(DefaultStorageValues = exports.DefaultStorageValues || (exports.DefaultStorageValues = {}));
function buildDefaultStorageStateFromNative(bridge) {
    return __awaiter(this, void 0, void 0, function* () {
        const vs = DefaultStorageValues.state();
        const legacyAppStorage = yield bridge.readLegacyAppStorage();
        if (legacyAppStorage) {
            const { appConfig } = legacyAppStorage;
            if (appConfig) {
                vs.language = appConfig.language.toLowerCase().startsWith('cn')
                    ? M.Language.CN
                    : M.Language.EN;
                vs.notificationEnabled = appConfig.notificationEnabled;
            }
        }
        return vs;
    });
}
exports.buildDefaultStorageStateFromNative = buildDefaultStorageStateFromNative;
