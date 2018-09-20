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
class IRef {
    modify(f) {
        return __awaiter(this, void 0, void 0, function* () {
            const old = this.value;
            const [new_, res] = f(old);
            yield this.setValue(new_);
            return res;
        });
    }
    modify_(f) {
        const old = this.value;
        return this.setValue(f(old));
    }
}
exports.IRef = IRef;
class MutRef extends IRef {
    constructor(val) {
        super();
        this.listeners = {};
        this.idGen = 0;
        this.val = val;
    }
    get value() {
        return this.val;
    }
    setValue(val) {
        return __awaiter(this, void 0, void 0, function* () {
            this.val = val;
            for (const k of Object.keys(this.listeners)) {
                yield this.listeners[k](val);
            }
        });
    }
    attachListener(f) {
        const id = String(this.idGen++);
        this.listeners[id] = f;
        return {
            remove: () => {
                this.removeListener(id);
            }
        };
    }
    removeListener(id) {
        delete this.listeners[id];
    }
}
exports.MutRef = MutRef;
