package com.hongsi;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.hongsi.bridge.NativeBridgePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.microsoft.codepush.react.CodePush;
import com.react.rnspinkit.RNSpinkitPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {


  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

//  static boolean isInDevEnvironment() {
//    return "Dev".equalsIgnoreCase(BuildConfig.FLAVOR);
//  }


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
//      return BuildConfig.DEBUG;
      // Only Debug+PreProd build uses developer support. This allows us
      // to have Debug-Staging builds that don't use RN's developer support, which
      // eases debugging (i.e., we can set breakpoints in it).
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSpinkitPackage(),
            new NativeBridgePackage(),
      new CodePush(null, MainApplication.this, BuildConfig.DEBUG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }


}
