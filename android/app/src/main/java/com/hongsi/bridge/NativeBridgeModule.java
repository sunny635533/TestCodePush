package com.hongsi.bridge;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;
import android.view.ViewTreeObserver;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.Map;

/**
 * Created by user on 2017/2/22.
 */
public class NativeBridgeModule extends ReactContextBaseJavaModule {

    private static final String TAG = NativeBridgeModule.class.getName();
    public static final String PREFERENCE_KEY = "BCPreferenceKey"; // 跟原生的key一样
    private int mNavigationBarColor;
    private int mStatusBarColor;
    private boolean needHidenav;

    public NativeBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);


    }

    @Override
    public String getName() {
        return "TFNativeBridge";
    }

    @ReactMethod
    public void readLegacyAppStorage(Promise p) {
        try {
            WritableMap m = Arguments.createMap();
            LegacyAppConfig conf = LegacyAppConfig.load(getReactApplicationContext());
            m.putMap("appConfig", conf == null ? null : conf.toReactFFI());
            p.resolve(m);
        } catch (Throwable e) {
            // XXX: What to do?
            Log.w(TAG, "readLegacyAppStorage", e);
            p.resolve(null);
        }
    }

    @ReactMethod
    public void getItem(String key, ReadableMap options, Promise pm) {

        String name = sharedPreferences(options);

        String value = prefs(name).getString(key, null);

        pm.resolve(value);
    }

    @ReactMethod
    public void setItem(String key, String value, ReadableMap options, Promise pm) {

        String name = sharedPreferences(options);

        try {
            putExtra(key, value, prefs(name));
            pm.resolve(value);
        } catch (Exception e) {
            Log.d("RNSensitiveInfo", e.getCause().getMessage());
            pm.reject(e);
        }
    }

    @ReactMethod
    public void deleteItem(String key, ReadableMap options, Promise pm) {

        String name = sharedPreferences(options);

        SharedPreferences.Editor editor = prefs(name).edit();

        editor.remove(key).apply();

        pm.resolve(null);
    }

    @ReactMethod
    public void getLoginInfos(ReadableMap readableMap, ReadableMap options, Promise pm) {
        String name = sharedPreferences(options);

        WritableMap resultData = new WritableNativeMap();

        Map<String, ?> map = readableMap.toHashMap();

        for (Map.Entry<String, ?> entry : map.entrySet()) {
            String nativeKey = entry.getValue().toString();
            String value = prefs(name).getString(nativeKey, null);

            resultData.putString(entry.getKey(), value);
        }
        pm.resolve(resultData);
    }

    @ReactMethod
    public void getAllItems(ReadableMap options, Promise pm) {

        String name = sharedPreferences(options);

        Map<String, ?> allEntries = prefs(name).getAll();
        WritableMap resultData = new WritableNativeMap();

        for (Map.Entry<String, ?> entry : allEntries.entrySet()) {
            String value = entry.getValue().toString();
            resultData.putString(entry.getKey(), value);
        }
        pm.resolve(resultData);
    }

    private SharedPreferences prefs(String name) {
        return getReactApplicationContext().getSharedPreferences(name, Context.MODE_PRIVATE);
    }

    @NonNull
    private String sharedPreferences(ReadableMap options) {
        String name = options.hasKey("sharedPreferencesName") ? options.getString("sharedPreferencesName") : PREFERENCE_KEY;
        if (name == null) {
            name = PREFERENCE_KEY;
        }
        return name;
    }

    @ReactMethod
    public void doListenerSystemUI() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) return;
        final View decorView = currentActivity.getWindow().getDecorView();
//        ViewTreeObserver.OnWindowFocusChangeListener
        needHidenav = false;
        ViewTreeObserver viewTreeObserver = decorView.getViewTreeObserver();
        viewTreeObserver.addOnWindowFocusChangeListener(new ViewTreeObserver.OnWindowFocusChangeListener() {
            @Override
            public void onWindowFocusChanged(boolean hasFocus) {
                if(needHidenav){
                   if(hasFocus){
                       hideNavSystemUI();
                   }else{
                       showNavSystemUI();
                   }
                }
            }
        });
        decorView.post(new Runnable() {
            @Override
            public void run() {
                decorView.setOnSystemUiVisibilityChangeListener
                        (new View.OnSystemUiVisibilityChangeListener() {
                            @Override
                            public void onSystemUiVisibilityChange(int visibility) {
                                if ((visibility & View.SYSTEM_UI_FLAG_FULLSCREEN) == 0) {
                                    Log.e(TAG, "onSystemUiVisibilityChange: =====visibility=visib==" + visibility);
                                    if (needHidenav) {
                                        hideNavSystemUI();
                                    }
                                } else {
                                    Log.e(TAG, "onSystemUiVisibilityChange: =====visibility=hide==" + visibility);

                                }
                            }
                        });
            }
        });

    }


    @ReactMethod
    public void setSystemUI(ReadableMap options) {
        String hideBarUI = options.hasKey("hideBarUI") ? options.getString("hideBarUI") : null;
        String hideNavUI = options.hasKey("hideNavUI") ? options.getString("hideNavUI") : null;
        Log.e(TAG, "setSystemUI: " + options);
        if (hideNavUI == null) return;
        if (hideNavUI.endsWith("1")) {
            this.hideNavSystemUI();
            needHidenav = true;
        } else {
            this.showNavSystemUI();
            needHidenav = false;
        }

        if (hideBarUI == null) return;
        if (hideBarUI.endsWith("1")) {
            this.hideStableBarvSystemUI();
        } else {
            this.showStableBarSystemUI();
        }

    }

    @ReactMethod
    public void setSystemUIColor(ReadableMap options) {
        String colorCode = options.hasKey("colorCode") ? options.getString("colorCode") : null;

        if (colorCode == null || getCurrentActivity() == null) return;
        getCurrentActivity().getWindow().setNavigationBarColor(Color.parseColor(colorCode));
        getCurrentActivity().getWindow().setStatusBarColor(Color.parseColor(colorCode));

    }

    private void hideNavSystemUI() {
        if(getCurrentActivity()==null||getCurrentActivity().getWindow()==null||getCurrentActivity().getWindow().getDecorView()==null)return;
        getCurrentActivity().getWindow().getDecorView().post(new Runnable() {
            @Override
            public void run() {
                mNavigationBarColor = getCurrentActivity().getWindow().getNavigationBarColor();
                mStatusBarColor = getCurrentActivity().getWindow().getStatusBarColor();
                getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                                | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                                | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                );
            }
        });

    }

    private void showNavSystemUI() {
        if(getCurrentActivity()==null||getCurrentActivity().getWindow()==null||getCurrentActivity().getWindow().getDecorView()==null)return;
        getCurrentActivity().getWindow().getDecorView().post(new Runnable() {
            @Override
            public void run() {
                getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(View.INVISIBLE);

            }
        });

    }

    private void hideStableBarvSystemUI() {
        getCurrentActivity().getWindow().getDecorView().post(new Runnable() {
            @Override
            public void run() {
                getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                                | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                                | View.SYSTEM_UI_FLAG_IMMERSIVE);
            }
        });

    }

    private void showStableBarSystemUI() {
        getCurrentActivity().getWindow().getDecorView().post(new Runnable() {
            @Override
            public void run() {
                getCurrentActivity().getWindow().getDecorView().setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                );
            }
        });
    }


    private void putExtra(String key, Object value, SharedPreferences mSharedPreferences) {
        SharedPreferences.Editor editor = mSharedPreferences.edit();
        if (value instanceof String) {
            editor.putString(key, (String) value).apply();
        } else if (value instanceof Boolean) {
            editor.putBoolean(key, (Boolean) value).apply();
        } else if (value instanceof Integer) {
            editor.putInt(key, (Integer) value).apply();
        } else if (value instanceof Long) {
            editor.putLong(key, (Long) value).apply();
        } else if (value instanceof Float) {
            editor.putFloat(key, (Float) value).apply();
        }
    }


}
