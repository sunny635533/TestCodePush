import * as RN from 'react-native';
import * as M from '@src/model';

export interface TFNativeBridge {
  readLegacyAppStorage(): Promise<LegacyAppStorage | undefined>;
  comeBackNativeController(): Promise<void>;
  processResponseError(response: M.BaseResponse<any>): Promise<string>;
  updateSessionId(sessionId: string): Promise<string>;
}

interface LegacyAppStorage {
  appConfig?: {
    language: string,
    notificationEnabled: boolean,
  };
}

export function loadNativeBridge() {
  // if (RN) {
  //   return RN.NativeModules.TFNativeBridge;
  // } else {
  //   throw new Error('Not running in the RN environment');
  // }
}