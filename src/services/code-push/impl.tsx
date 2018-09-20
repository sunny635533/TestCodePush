import { CodePushService, HotpatchDelegate, } from '@src/services/code-push/types';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { LocalizedStrings } from '@src/main/strings';
import CodePush from 'react-native-code-push'; 


interface DownloadProgress {
  totalBytes: number;
  receivedBytes: number;
}

interface Metadata {
  required: string;
  message: string;
  uri: string;
}

export class CodePushServiceImpl implements CodePushService {

  renderHotpatchDownloadingMessage( percent?: number): string {
    let extra = '';
    if (percent && (percent >= 0 || percent <= 1)) {
      extra = `(${Math.ceil(percent * 100)} %)`;
    }
   
    return `正在更新 ${extra}`;
  }

  checkForHotpatch(deploymentKey: string, delegate: HotpatchDelegate) {
    CodePush.disallowRestart();
    CodePush.sync({
      deploymentKey: deploymentKey,
      installMode: CodePush.InstallMode.IMMEDIATE
    }, (status: number) => {
      switch (status) {
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          delegate.onHotpatchDownloadStart();
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          delegate.onHotpatchDownloadFinish();
          break;
      }
    }, (progress: DownloadProgress) => {
      delegate.onHotpatchDownloadProgress(progress.receivedBytes, progress.totalBytes);
    });
  }

  mkAlert(metadata: Metadata, strings: LocalizedStrings) {
    Alert.alert(strings.lbl_force_upgrade, metadata.message, [{
      text: strings.btn_force_upgrade,
      onPress: () => {
        this.doUpgrade(metadata.uri);
        // Make sure the alert dialog doesn't fall off.
        this.mkAlert(metadata, strings);
      }
    }]);
  }

  doUpgrade(updateUri: string) {
    Linking.openURL(updateUri);
  }

  allowReStart(): void {
    CodePush.allowRestart();
  }

}