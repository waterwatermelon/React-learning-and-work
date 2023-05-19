package com.hello_native_module;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.provider.AlarmClock;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class MySendIntent extends ReactContextBaseJavaModule {
    final String TAG = "[MySendIntent]";
    final String MODULE_NAME = "MySendIntent";
   
    public MySendIntent(ReactApplicationContext context) {
        super(context);
        Log.d(TAG, "create");
    }
   
    @ReactMethod
    public void send(String message) {
        Log.d(TAG, "send:" + message);
        Uri number = Uri.parse("srs://goods");
        Intent myIntent = new Intent(Intent.ACTION_VIEW, number);
        myIntent.putExtra(Intent.EXTRA_TEXT, message);
        Activity activity = getCurrentActivity();
        try {
            activity.startActivity(myIntent);

        }catch (ActivityNotFoundException e){
            Log.e(TAG, "e", e);
        }
    }


    @ReactMethod
    public void createAlarm(int hour, int minutes, String message){
        Intent intent = new Intent(AlarmClock.ACTION_SET_ALARM);
        intent.putExtra(AlarmClock.EXTRA_HOUR, hour);
        intent.putExtra(AlarmClock.EXTRA_MINUTES, minutes);
        intent.putExtra(AlarmClock.EXTRA_MESSAGE, message);
        Activity activity = getCurrentActivity();

        if(intent.resolveActivity(activity.getPackageManager()) != null) {
            activity.startActivity(intent);
        } else {
            Log.e(TAG, "no activity");
        }
    }
    
    @ReactMethod
    public void getModuleName(Promise promise) {
        promise.resolve(MODULE_NAME);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }
}
