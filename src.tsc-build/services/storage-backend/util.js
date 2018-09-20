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
const type_level_1 = require("@src/util/type-level");
const mutref_1 = require("@src/util/mutref");
var Conv;
(function (Conv) {
    function jsonConvWithValidator(validate) {
        return {
            convertLeft: (a) => type_level_1.Right.ofAny(JSON.stringify(a)),
            convertRight: (s) => {
                let raw;
                try {
                    raw = JSON.parse(s);
                }
                catch (e) {
                    return type_level_1.Left.ofAny(`jsonConv: ${e}`);
                }
                if (validate(raw)) {
                    return type_level_1.Right.ofAny(raw);
                }
                else {
                    return type_level_1.Left.ofAny('jsonConv: invalid');
                }
            },
        };
    }
    Conv.jsonConvWithValidator = jsonConvWithValidator;
})(Conv = exports.Conv || (exports.Conv = {}));
class PersistentValue extends mutref_1.IRef {
    constructor(storageKey, conv, backend) {
        super();
        this.storageKey = storageKey;
        this.conv = conv;
        this.backend = backend;
        this.storageKey = storageKey;
        this.conv = conv;
        this.backend = backend;
    }
    get value() {
        return this.cached.value;
    }
    setValue(val) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldVal = this.cached.value;
            yield this.cached.setValue(val);
            try {
                const serialized = this.conv.convertLeft(val);
                if (serialized.isRight()) {
                    yield this.backend.setItem(this.storageKey, serialized.right);
                    return;
                }
            }
            catch (e) {
                console.error('storage/impl-persistent: cannot setItem', e);
            }
            yield this.cached.setValue(oldVal);
        });
    }
    attachListener(f) {
        return this.cached.attachListener(f);
    }
    load(defaultValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storedValue = this.conv.convertRight(yield this.backend.getItem(this.storageKey));
                if (storedValue.isRight()) {
                    const value = storedValue.right;
                    this.cached = new mutref_1.MutRef(value);
                    return true;
                }
            }
            catch (e) {
            }
            this.cached = new mutref_1.MutRef(defaultValue());
            return false;
        });
    }
}
exports.PersistentValue = PersistentValue;
