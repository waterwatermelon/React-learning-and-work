package com.hello_native_module;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MySendIntent extends ReactContextBaseJavaModule {
    final String TAG = "[MySendIntent]";
    public MySendIntent(ReactApplicationContext context) {
        super(context);
        Log.d(TAG, "create");
    }
    @ReactMethod
    public void send(String message) {
        Log.d(TAG, "send:" + message);
        Uri number = Uri.parse("srs://goods");
        Intent callIntent = new Intent(Intent.ACTION_VIEW, number);
        Activity activity = getCurrentActivity();
        try {

        }catch (e){}
        activity.startActivity(callIntent);
    }
    @Override
    public String getName() {
        return "MySendIntent";
    }
}
