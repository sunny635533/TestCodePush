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
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const base_component_1 = require("@src/ui/base-component");
const header_1 = require("@src/ui/nav/header");
const native_modules_1 = require("@src/util/native-modules");
class TransportAccountScreen extends base_component_1.BaseComponent {
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: this.backToNative }),
            React.createElement(react_native_1.ScrollView, null),
            React.createElement(react_native_1.Text, null, "This is TransportAccountScreen!")));
    }
    backToNative() {
        return __awaiter(this, void 0, void 0, function* () {
            if (react_native_1.Platform.OS === 'ios') {
                const nativeBridge = native_modules_1.loadNativeBridge();
                return yield nativeBridge.comeBackNativeController();
            }
            else {
                react_native_1.BackHandler.exitApp();
            }
        });
    }
}
exports.TransportAccountScreen = TransportAccountScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
