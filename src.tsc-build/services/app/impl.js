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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const impl_1 = require("@src/services/interaction/impl");
const T = __importStar(require("@src/services/app/types"));
const impl_whatwg_fetch_1 = require("@src/web-api/impl-whatwg-fetch");
const M = __importStar(require("@src/model"));
const util_1 = require("@src/util");
const native_modules_1 = require("@src/util/native-modules");
const util_2 = require("@src/services/storage/util");
const impl_2 = require("@src/services/storage/impl");
const impl_3 = require("@src/services/storage-backend/impl");
const react_native_code_push_1 = __importDefault(require("react-native-code-push"));
const perf = util_1.PerfTracer.enterAsync;
class DefaultAppServiceImpl {
    constructor(env_, init_) {
        this.env_ = env_;
        this.init_ = init_;
        this.webService_ = new impl_whatwg_fetch_1.FetchService;
    }
    static load(env, init) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = new DefaultAppServiceImpl(env, init);
            const storageState = yield perf('app.init.loadStorageNative', () => util_2.buildDefaultStorageStateFromNative(native_modules_1.loadNativeBridge()));
            app.storage_ = yield perf('app.init.loadAsyncStorage', () => impl_2.PersistentStorageService.load(impl_3.asyncStorageBackend(), storageState));
            app.interaction_ = new impl_1.InteractionServiceImpl(init.activity);
            app.versionLabel_ = '';
            react_native_code_push_1.default.getUpdateMetadata().then((pkg) => {
                console.log('========== getUpdateMetadata =======' + JSON.stringify(pkg));
                if (pkg && pkg.label) {
                    app.versionLabel_ = pkg.label;
                }
            });
            app.webService_ = new impl_whatwg_fetch_1.FetchService(10000, init.initProps.successCheck, init.initProps.sessionId);
            app.userRole_ = init.initProps.userRole ? init.initProps.userRole : '';
            app.userId_ = init.initProps.userId ? init.initProps.userId : '';
            app.routeName_ = init.initProps.routeName;
            return app;
        });
    }
    get storage() {
        return this.storage_;
    }
    get interaction() {
        return this.interaction_;
    }
    get env() {
        return this.env_;
    }
    get lang() {
        return this.storage_.language;
    }
    get localizedStrings() {
        return M.Language.choose(this.storage.language.value, T.strings);
    }
    get lifecycle() {
        return this.init_.lifecycle;
    }
    get versionLabel() {
        return this.versionLabel_;
    }
    get webService() {
        return this.webService_;
    }
    get userRole() {
        return this.userRole_;
    }
    get userId() {
        return this.userId_;
    }
    get routeName() {
        return this.routeName_;
    }
}
exports.DefaultAppServiceImpl = DefaultAppServiceImpl;
