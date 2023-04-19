package com.hello_share_to;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

public class ShareActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "shareActivity";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
     * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
     * (aka React 18) with two boolean flags.
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
                this,
                getMainComponentName(),
                // If you opted-in for the New Architecture, we enable the Fabric Renderer.
                DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
                // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
                DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d("===========", "[share_receiver][onCreate]");
        // Get the intent that started this activity
        Intent intent = getIntent();
        String type = intent.getType();
        Log.d("===========", "[share_receiver] type:" + type);
        // 通过scheme过滤的intent,data为intent上uri，datastring为intent上的uri
        Uri uri = intent.getData();
        Log.d("===========", "[share_receiver] uri:" + uri);
        String dataString = intent.getDataString();
        Log.d("===========", "[share_receiver] datastring:" + dataString);
        String scheme = intent.getScheme();
        Log.d("===========", "[share_receiver] scheme:" + scheme);
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d("===========", "[share_receiver][onResume]");
        // Get the intent that started this activity
        Intent intent = getIntent();
        String type = intent.getType();
        Log.d("===========", "[share_receiver] type:" + type);
        // 通过scheme过滤的intent,data为intent上uri，datastring为intent上的uri
        Uri uri = intent.getData();
        Log.d("===========", "[share_receiver] uri:" + uri);
        String dataString = intent.getDataString();
        Log.d("===========", "[share_receiver] datastring:" + dataString);
        String scheme = intent.getScheme();
        Log.d("===========", "[share_receiver] scheme:" + scheme);
    }
}
