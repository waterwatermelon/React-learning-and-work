package com.hello_native_module;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.icu.util.Calendar;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class MySendIntent extends ReactContextBaseJavaModule {
    final String TAG = "[MySendIntent]";
    final String MODULE_NAME = "MySendIntent";
   ReactApplicationContext rContext;
    public MySendIntent(ReactApplicationContext context) {
        super(context);
        rContext = context;
        Log.d(TAG, "create");
    }
   
    @ReactMethod
    public void send(String message) {
        Log.d(TAG, "send:" + message);
        Uri uri = Uri.parse("srs://goods");
        Intent myIntent = new Intent(Intent.ACTION_VIEW, uri);
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
        Log.d(TAG, "create alarm 16");
        AlarmManager alarmMgr = (AlarmManager) rContext.getSystemService(Context.ALARM_SERVICE);
        PendingIntent alarmIntent;

        Uri uri = Uri.parse("tel:12345678");
        Intent intent = new Intent(Intent.ACTION_VIEW, uri);
        alarmIntent = PendingIntent.getBroadcast(rContext, 0, intent, 0);

        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.set(Calendar.HOUR_OF_DAY, 12);
        calendar.set(Calendar.MINUTE, 18);

        alarmMgr.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(),
                1000 * 60 * 2, alarmIntent);

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
