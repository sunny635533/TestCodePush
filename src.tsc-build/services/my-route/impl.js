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
const B = __importStar(require("@src/web-api"));
const alwaysSucceed = B.Impl.alwaysSucceedD;
const DRIVER_HOST = 'http://sj.redlion56.com/gwsj/';
const CHE_ZHU_HOST = 'http://cz.redlion56.com/gwcz/';
class MyRouteServiceImpl {
    constructor(webService, userRole, env) {
        this.webService = webService;
        this.userRole = userRole;
        this.env = env;
        if ('sj' === userRole) {
            this.host = DRIVER_HOST;
        }
        else {
            this.host = CHE_ZHU_HOST;
        }
        this.apiConfig = M.getApiConfig(env.host);
    }
    getRouteList() {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = M.getApiConfig(this.host).routeList;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, {}, alwaysSucceed));
            return data;
        });
    }
    deleteRoute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = M.getApiConfig(this.host).routeDelete;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, params, alwaysSucceed));
            return data;
        });
    }
    getCityInfoList() {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.apiConfig.queryCityInfo;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, {}, alwaysSucceed));
            return data;
        });
    }
    getGoodTypesList() {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.apiConfig.findGoodsType;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, {}, alwaysSucceed));
            return data;
        });
    }
    addRoute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.apiConfig.routeCreate;
            const data = B.Impl.okOrThrow(yield B.Impl.postJson(this.webService, uri, params, alwaysSucceed));
            return data;
        });
    }
}
exports.MyRouteServiceImpl = MyRouteServiceImpl;
