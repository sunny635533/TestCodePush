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
var ErrorKind;
(function (ErrorKind) {
    ErrorKind[ErrorKind["CannotDeserializeResponseBody"] = 0] = "CannotDeserializeResponseBody";
    ErrorKind[ErrorKind["ResponseNotOk"] = 1] = "ResponseNotOk";
    ErrorKind[ErrorKind["PossiblyTimedOut"] = 2] = "PossiblyTimedOut";
    ErrorKind[ErrorKind["RequestError"] = 3] = "RequestError";
})(ErrorKind = exports.ErrorKind || (exports.ErrorKind = {}));
var ErrorKinds;
(function (ErrorKinds) {
    function requestPossiblySent(e) {
        switch (e) {
            case 0:
            case 1:
            case 2:
                return true;
            case 3:
                return false;
        }
    }
    ErrorKinds.requestPossiblySent = requestPossiblySent;
    function show(e) {
        switch (e) {
            case 0:
                return 'CannotDeserializeResponseBody';
            case 1:
                return 'ResponseNotOk';
            case 2:
                return 'PossiblyTimedOut';
            case 3:
                return 'RequestError';
        }
    }
    ErrorKinds.show = show;
})(ErrorKinds = exports.ErrorKinds || (exports.ErrorKinds = {}));
class Exception {
    constructor(kind, rawResponse) {
        this.kind = kind;
        this.rawResponse = rawResponse;
    }
    toString() {
        return `ApiResponse.Exception: kind = ${this.kind}, rawResponse = ${JSON.stringify(this.rawResponse)}`;
    }
}
exports.Exception = Exception;
function isException(e) {
    return e instanceof Exception;
}
exports.isException = isException;
function isNonfatalNetworkException(anyE) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isException(anyE)) {
            const e = anyE;
            if (ErrorKinds.requestPossiblySent(e.kind)) {
                return true;
            }
        }
        return false;
    });
}
exports.isNonfatalNetworkException = isNonfatalNetworkException;
