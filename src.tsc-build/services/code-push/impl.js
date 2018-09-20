"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
const react_native_code_push_1 = __importDefault(require("react-native-code-push"));
class CodePushServiceImpl {
    renderHotpatchDownloadingMessage(percent) {
        let extra = '';
        if (percent && (percent >= 0 || percent <= 1)) {
            extra = `(${Math.ceil(percent * 100)} %)`;
        }
        return `正在更新 ${extra}`;
    }
    checkForHotpatch(deploymentKey, delegate) {
        react_native_code_push_1.default.disallowRestart();
        react_native_code_push_1.default.sync({
            deploymentKey: deploymentKey,
            installMode: react_native_code_push_1.default.InstallMode.IMMEDIATE
        }, (status) => {
            switch (status) {
                case react_native_code_push_1.default.SyncStatus.DOWNLOADING_PACKAGE:
                    delegate.onHotpatchDownloadStart();
                    break;
                case react_native_code_push_1.default.SyncStatus.UPDATE_INSTALLED:
                case react_native_code_push_1.default.SyncStatus.UNKNOWN_ERROR:
                    delegate.onHotpatchDownloadFinish();
                    break;
            }
        }, (progress) => {
            delegate.onHotpatchDownloadProgress(progress.receivedBytes, progress.totalBytes);
        });
    }
    mkAlert(metadata, strings) {
        react_native_2.Alert.alert(strings.lbl_force_upgrade, metadata.message, [{
                text: strings.btn_force_upgrade,
                onPress: () => {
                    this.doUpgrade(metadata.uri);
                    this.mkAlert(metadata, strings);
                }
            }]);
    }
    doUpgrade(updateUri) {
        react_native_1.Linking.openURL(updateUri);
    }
    allowReStart() {
        react_native_code_push_1.default.allowRestart();
    }
}
exports.CodePushServiceImpl = CodePushServiceImpl;
