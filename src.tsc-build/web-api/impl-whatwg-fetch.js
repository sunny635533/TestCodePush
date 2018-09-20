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
const type_level_1 = require("@src/util/type-level");
const promises_1 = require("@src/util/promises");
const U = __importStar(require("@src/web-api/util"));
const xml2js = __importStar(require("xml2js"));
class FetchService {
    constructor(timeoutMs, successCheck, sessionId) {
        this.timeoutMs = timeoutMs;
        this.successCheck = successCheck;
        this.sessionId = sessionId;
    }
    withTimeout(timeoutMs) {
        return new FetchService(timeoutMs);
    }
    updateSessionToken(sessionId) {
        this.sessionId = sessionId;
    }
    request(uri, request, processResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp;
            const timeoutMs = this.timeoutMs || U.kDefaultTimeout;
            try {
                const respP = fetch(uri, request);
                const mbTimedOut = yield promises_1.timeout(timeoutMs, respP);
                if (mbTimedOut.isLeft()) {
                    return type_level_1.Left.ofAny(U.buildTimeoutError(timeoutMs));
                }
                else {
                    resp = mbTimedOut.right;
                }
            }
            catch (e) {
                return type_level_1.Left.ofAny(U.buildRequestError(e));
            }
            if (resp.ok) {
                return yield processResponse(resp);
            }
            else {
                return type_level_1.Left.ofAny(U.buildResponseNotOk(resp));
            }
        });
    }
    requestAndDeserializeJson(uri, request, deserializer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.headers && this.sessionId) {
                request.headers = Object.assign(request.headers, { 'sessionId': this.sessionId });
            }
            return this.request(uri, request, (resp) => __awaiter(this, void 0, void 0, function* () {
                let respJson;
                try {
                    if (this.successCheck) {
                        respJson = this.successCheck(yield resp.json());
                        console.log('=========== url: ' + uri);
                        console.log('   ======== params: ' + JSON.stringify(request.body));
                        console.log('   ======== result: ' + JSON.stringify(respJson));
                        return U.tryDeserialize(resp, respJson, deserializer);
                    }
                    else {
                        return U.tryDeserialize(resp, yield resp.json(), deserializer);
                    }
                }
                catch (e) {
                    return type_level_1.Left.ofAny(U.buildCannotDeserialize(e, resp));
                }
            }));
        });
    }
    requestAndDeserializeXml(uri, request, deserializer) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(uri, request, (resp) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const text = yield resp.text();
                    const respXml = yield new Promise((k, ek) => {
                        xml2js.parseString(text, (err, resp) => {
                            if (err) {
                                ek(err);
                            }
                            else {
                                k(resp);
                            }
                        });
                    });
                    return U.tryDeserialize(resp, respXml, deserializer);
                }
                catch (e) {
                    return type_level_1.Left.ofAny(U.buildCannotDeserialize(e, resp));
                }
            }));
        });
    }
}
exports.FetchService = FetchService;
