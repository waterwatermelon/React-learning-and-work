import React, { Component } from 'react';
import { ScrollView, } from 'react-native';
import { Assets, Colors, View, Button, Text, Incubator } from 'react-native-ui-lib';

const { Toast } = Incubator;

const TOAST_ACTIONS = {
  label: { label: 'Undo', onPress: () => console.warn('undo') },
};

const TOAST_MESSAGES = {
  general: 'La formule Pass VIP illimité 5 mois est masquée',
  success: 'The action completed successfully.',
  failure: 'The action could not be completed.',
  offline: 'Check Your Internet Connection'
};

export default class ToastsScreen extends Component {
  showToast = false; // keep this state in class instance for immediate response
  state = {
    visible: false,
    toastPosition: 'bottom',
    isCustomContent: false,
    showLoader: false,
    selectedAction: '',
    hasAttachment: false,
    selectedPreset: 'general',
  };

  toggleVisibility = () => {
    // Im using this for storing toast visible since setState is async and takes time to response
    this.showToast = !this.showToast;
    this.setState({
      visible: this.showToast
    });
  };



  renderAboveToast = () => {
    return (
      <View flex bottom right paddingB-50 paddingR-20 pointerEvents={'box-none'}>
        <Button iconSource={Assets.icons.demo.dashboard} color={Colors.white} style={{ height: 50, width: 50 }} />
      </View>
    );
  };

  renderBelowToast = () => {
    return <Text>Attachment below toast</Text>;
  };


  getAction = () => {
    const { selectedAction } = this.state;
    return TOAST_ACTIONS[selectedAction];
  };

  getMessage = () => {
    const { selectedPreset } = this.state;

    return TOAST_MESSAGES[selectedPreset] || TOAST_MESSAGES.general;
  };

  renderToast = () => {
    const { visible, toastPosition, showLoader, } = this.state;

    return (
      <Toast
        key={`${toastPosition} `}
        visible={visible}
        position={'top'}
        message={'this.getMessage()'}
        showLoader={showLoader}
        action={{ label: 'action' }}
        preset={'general'}
        swipeable={true}
        onDismiss={this.toggleVisibility}
        autoDismiss={3500}
      >


      </Toast>
    );
  };

  renderToggleButton = () => {
    return (
      <View centerH >
        <Button
          testID={`uilib.showToast`}
          marginT-10
          marginB-10
          label={'Toggle toast'}
          onPress={this.toggleVisibility}
        />
      </View>
    );
  };

  render() {
    return (
      <View flex padding-page>

        <View flex >
          <ScrollView>
            {this.renderToggleButton()}
          </ScrollView>
        </View>
        {this.renderToast()}
      </View>
    );
  }
}

