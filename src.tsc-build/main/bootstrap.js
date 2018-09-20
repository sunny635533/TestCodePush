"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const core_decorators_1 = require("core-decorators");
const util_1 = require("@src/util");
const EnvConfig = __importStar(require("@src/model/env-config"));
const load_1 = require("@src/ui/load");
const impl_1 = require("@src/services/app-lifecycle/impl");
const impl_2 = require("@src/services/code-push/impl");
const container_1 = require("@src/ui/nav/container");
const colors_1 = require("@src/ui/colors");
const react_native_easy_toast_1 = __importDefault(require("react-native-easy-toast"));
let Bootstrap = class Bootstrap extends React.Component {
    constructor(props) {
        super(props);
        this.lifecycle = new impl_1.FilteredAppLifecycle(f => react_native_1.AppState.addEventListener('change', f), react_native_1.AppState.currentState);
        this.codePushService = new impl_2.CodePushServiceImpl();
        this.state = {};
    }
    checkForHotpatch() {
        this.codePushService.checkForHotpatch(this.env.codePushDeploymentKey, this);
    }
    onAppResume() {
        this.checkForHotpatch();
    }
    initEverything() {
        return __awaiter(this, void 0, void 0, function* () {
            const { env } = this;
            this.checkForHotpatch();
            this.lifecycle.attachListener(x => {
                if (x === 'active') {
                    this.onAppResume();
                }
                return Promise.resolve(undefined);
            });
        });
    }
    get env() {
        return EnvConfig.envFrom(this.props.envName);
    }
    componentWillMount() {
        this.initEverything();
    }
    componentWillUnmount() {
        if (this.toastListener) {
            this.toastListener.remove();
        }
    }
    componentDidMount() {
        this.toastListener = react_native_1.DeviceEventEmitter.addListener('showToast', (text) => {
            this.toastRef.show(text);
        });
    }
    onHotpatchDownloadStart() {
        console.log('==== code-push onHotpatchDownloadStart! ===');
        this.setState({ hotpatching: true });
    }
    onHotpatchDownloadProgress(done, total) {
        console.log(`code-push onHotpatchDownloadProgress done is ${done},total is ${total}`);
        this.setState({ progress: this.codePushService.renderHotpatchDownloadingMessage(done * 1.0 / total) });
    }
    onHotpatchDownloadFinish() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('===== code-push onHotpatchDownloadFinish! ====');
            yield util_1.delay(2000);
            this.setState({ hotpatching: false });
            this.codePushService.allowReStart();
        });
    }
    render() {
        const { hotpatching } = this.state;
        return (React.createElement(react_native_1.SafeAreaView, { style: styles.flex },
            React.createElement(container_1.AppNavigator, { ref: (r) => this.navigatorRef = r }),
            React.createElement(react_native_easy_toast_1.default, { ref: (r) => this.toastRef = r, style: styles.toastBg, textStyle: styles.toastText }),
            hotpatching && React.createElement(load_1.BlockerOverlayLoading, { opts: { text: this.state.progress } })));
    }
    renderMotd() {
        const { motd } = this.state;
        if (!motd) {
            return null;
        }
        else {
            if (motd.length > 15) {
                const afterComma = motd.indexOf('，') + 1;
                if (afterComma !== 0) {
                    const fst = motd.substring(0, afterComma);
                    const snd = motd.substring(afterComma);
                    return [
                        React.createElement(react_native_1.Text, null, fst),
                        React.createElement(react_native_1.Text, null, snd)
                    ];
                }
            }
            return React.createElement(react_native_1.Text, null, motd);
        }
    }
};
Bootstrap = __decorate([
    core_decorators_1.autobind
], Bootstrap);
exports.Bootstrap = Bootstrap;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: colors_1.ThemeRed.GNavBgColor,
    },
    toastBg: {
        backgroundColor: '#333333',
        opacity: 0.8
    },
    toastText: {
        fontSize: 16,
        color: 'white',
    }
});
