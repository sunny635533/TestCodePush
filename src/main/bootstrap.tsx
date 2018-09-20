import * as React from 'react';
import {
  StyleSheet,
  Text,
  AppState,
  Platform,
  PushNotificationIOS,
  SafeAreaView,
  DeviceEventEmitter,
  EmitterSubscription
} from 'react-native';
import { autobind } from 'core-decorators';
import {
  copyWith,
  PerfTracer,
  absurd,
  isIphoneX,
  ListenerId,
  withRetry,
  delay
} from '@src/util';
import * as Store from '@src/store';
import * as EnvConfig from '@src/model/env-config';
import { FullscreenLoadingView, BlockerOverlayLoading } from '@src/ui/load';
import { presentExceptionAsAlert, renderSomeException } from '@src/util/user-facing-errors';
import { strings } from '@src/main/strings';
import { FilteredAppLifecycle } from '@src/services/app-lifecycle/impl';
import { CodePushServiceImpl } from '@src/services/code-push/impl';
import { HotpatchDelegate } from '@src/services/code-push/types';
import { AppNavigator, routeNavigate } from '@src/ui/nav/container';
import { ThemeRed } from '@src/ui/colors';
import * as M from '@src/model';
import { loadNativeBridge, TFNativeBridge } from '@src/util/native-modules';
import Toast from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';

interface BootProps {
  envName?: string;
}

interface BootState {
  motd?: string; // 错误提示
  hotpatching?: boolean; // 热更新
  progress?: string;
}


@autobind
export class Bootstrap extends React.Component<BootProps, BootState> implements HotpatchDelegate {
  private storageListener: ListenerId;
  private lifecycle = new FilteredAppLifecycle(f => AppState.addEventListener('change', f), AppState.currentState as any);
  private codePushService = new CodePushServiceImpl();
  private toastListener: EmitterSubscription;
  private toastRef: Toast;
  private navigatorRef: any;

  constructor(props: BootProps) {
    super(props);
    // i.e. App not yet initialized.
    this.state = {
    };
  }

  checkForHotpatch() {
    this.codePushService.checkForHotpatch(this.env.codePushDeploymentKey, this);
  }

  onAppResume() {
    this.checkForHotpatch();
  }

  // XXX: This method is huge.
  async initEverything() {
    const { env } = this;
    // Codepush hotpatching: This should be the first thing to do when the app starts.
    // We can run codepush.sync and app.init in the same time.
    // Comment this because it will be triggered in App resume state
    this.checkForHotpatch();

    this.lifecycle.attachListener(x => {
      if (x === 'active') {
        this.onAppResume();
      }
      return Promise.resolve(undefined);
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
    this.toastListener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.toastRef.show(text);
    });
  }

  onHotpatchDownloadStart() {
    console.log('==== code-push onHotpatchDownloadStart! ===');

    this.setState({ hotpatching: true });

  }

  onHotpatchDownloadProgress(done: number, total: number) {
    console.log(`code-push onHotpatchDownloadProgress done is ${done},total is ${total}`);
    
    this.setState({ progress: this.codePushService.renderHotpatchDownloadingMessage(done * 1.0 / total) });

  }

  async onHotpatchDownloadFinish() {
    console.log('===== code-push onHotpatchDownloadFinish! ====');
    // Before restarting the app to install the update, to avoid surprising the user,
    // we first display a notification to the user for 2 seconds.
    await delay(2000);

    this.setState({ hotpatching: false });
    this.codePushService.allowReStart();
  }


  render() {
    const { hotpatching } = this.state;

    return (
      <SafeAreaView style={styles.flex}>
        <AppNavigator
          ref={(r: any) => this.navigatorRef = r}
        />
        <Toast
          ref={(r: Toast) => this.toastRef = r}
          style={styles.toastBg}
          textStyle={styles.toastText}
        />
        {hotpatching && <BlockerOverlayLoading opts={{ text: this.state.progress }} />}
      </SafeAreaView>
    );

  }

  renderMotd(): null | JSX.Element[] | JSX.Element {
    const { motd } = this.state;
    if (!motd) {
      return null;
    } else {
      if (motd.length > 15) {
        const afterComma = motd.indexOf('，') + 1;
        if (afterComma !== 0) {
          const fst = motd.substring(0, afterComma);
          const snd = motd.substring(afterComma);
          return [
            <Text>{fst}</Text>,
            <Text>{snd}</Text>
          ];
        }
      }
      return <Text>{motd}</Text>;
    }
  }

}


const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: ThemeRed.GNavBgColor,
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

