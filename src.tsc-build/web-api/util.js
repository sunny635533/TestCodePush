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
const T = __importStar(require("@src/web-api/types"));
const react_native_1 = require("react-native");
exports.kDefaultTimeout = 15000;
function isDeserializationError(b) {
    return b.kind === 0;
}
exports.isDeserializationError = isDeserializationError;
function isRequestError(b) {
    return b.kind === 3;
}
exports.isRequestError = isRequestError;
function isTimeoutError(b) {
    return b.kind === 2;
}
exports.isTimeoutError = isTimeoutError;
function isResponseNotOk(b) {
    return b.kind === 1;
}
exports.isResponseNotOk = isResponseNotOk;
function okOrThrow(b) {
    if (b.isRight()) {
        return b.right;
    }
    else {
        throw asException(b.left);
    }
}
exports.okOrThrow = okOrThrow;
function anyOkOrThrow(b) {
    if (b.isRight()) {
        return b.right;
    }
    else {
        throw asException(b.left[0]);
    }
}
exports.anyOkOrThrow = anyOkOrThrow;
const kCommonHeaders = {
    'Connection': 'close',
    'Content-Type': react_native_1.Platform.select({ ios: 'application/form-data', android: 'multipart/form-data' }),
};
function getJson(service, uri, deserializer) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.requestAndDeserializeJson(uri, {
            method: 'GET',
            headers: kCommonHeaders,
        }, deserializer);
    });
}
exports.getJson = getJson;
function postJson(service, uri, payload, deserializer) {
    return __awaiter(this, void 0, void 0, function* () {
        return service.requestAndDeserializeJson(uri, {
            method: 'POST',
            headers: kCommonHeaders,
            body: formData(payload)
        }, deserializer);
    });
}
exports.postJson = postJson;
function formData(payload) {
    let data = new FormData();
    if (Object.keys(payload).length > 0) {
        Object.keys(payload).map(key => {
            data.append(key, payload[key]);
        });
    }
    else {
        data.append('test', '123');
    }
    return data;
}
exports.formData = formData;
function deserializationOk(a) {
    return type_level_1.Right.ofAny(a);
}
exports.deserializationOk = deserializationOk;
function deserializationFailed(e) {
    return type_level_1.Left.ofAny(e);
}
exports.deserializationFailed = deserializationFailed;
function buildCannotDeserialize(error, rawResponse) {
    return {
        kind: 0,
        error,
        rawResponse,
    };
}
exports.buildCannotDeserialize = buildCannotDeserialize;
function tryDeserialize(resp, respJson, deserialize) {
    let valueOrError;
    try {
        valueOrError = deserialize(respJson, resp);
    }
    catch (e) {
        return type_level_1.Left.ofAny(buildCannotDeserialize(e, resp));
    }
    return valueOrError.fmapLeft(e => buildCannotDeserialize(e, resp));
}
exports.tryDeserialize = tryDeserialize;
function buildResponseNotOk(rawResponse) {
    return {
        kind: 1,
        rawResponse,
    };
}
exports.buildResponseNotOk = buildResponseNotOk;
function buildTimeoutError(timeoutMs) {
    return {
        kind: 2,
        timeoutMs,
    };
}
exports.buildTimeoutError = buildTimeoutError;
function buildRequestError(error) {
    return {
        kind: 3,
        error,
    };
}
exports.buildRequestError = buildRequestError;
function mkNetworkException() {
    return new T.Exception(3);
}
exports.mkNetworkException = mkNetworkException;
function asException(r) {
    if (isDeserializationError(r) || isResponseNotOk(r)) {
        return new T.Exception(r.kind, r.rawResponse);
    }
    else if (isRequestError(r) || isTimeoutError(r)) {
        return new T.Exception(r.kind);
    }
    else {
        return r;
    }
}
exports.asException = asException;
function getJsonAndRace(service, uris, resultD) {
    function fetchJson(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return getJson(service, uri, resultD);
        });
    }
    return type_level_1.Eithers.racePromises(uris.map(fetchJson));
}
exports.getJsonAndRace = getJsonAndRace;
function alwaysSucceedD(r) {
    return deserializationOk(r);
}
exports.alwaysSucceedD = alwaysSucceedD;
class RequestWrapper {
    constructor(service) {
        this.service = service;
    }
    getJsonAndRace(uris, resultD) {
        return getJsonAndRace(this.service, uris, resultD);
    }
    postJson(uri, payload, deserializer) {
        return postJson(this.service, uri, payload, deserializer);
    }
    getJson(uri, deserializer) {
        return getJson(this.service, uri, deserializer);
    }
}
exports.RequestWrapper = RequestWrapper;
