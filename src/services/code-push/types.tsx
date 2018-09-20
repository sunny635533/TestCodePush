export interface HotpatchDelegate {
  onHotpatchDownloadStart(): void;
  onHotpatchDownloadProgress(done: number, total: number): void;
  onHotpatchDownloadFinish(): void;
}

export interface CodePushService {
  renderHotpatchDownloadingMessage( percent?: number): string;
  checkForHotpatch(deploymentKey: string, delegate: HotpatchDelegate): void;
  // shouldForceUpgradeNativeApp(app: AppService): boolean;
  allowReStart(): void;
}