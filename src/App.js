import React, { Component } from 'react';
import { View,
    Text,
    StyleSheet,
    Picker,
    AppState,
    Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    picker: {
        width: 100,
    },
});

class App extends Component {
    constructor (props) {
        super(props);
        this.state = { seconds: 5 }
    }

    componentDidMount () {
        PushNotification.configure({
            onNotification: (notification) => {
                console.log( 'NOTIFICATION:', notification );
            }
        });
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (appState) => {
        if (appState === 'background') {
            let date = new Date(Date.now() + (this.state.seconds * 1000));
            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }
            PushNotification.localNotificationSchedule({
                message: 'Notification message',
                date
            });
        }
    };

    handlePickerChange = (seconds) => {
        this.setState({ seconds })
    };

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                  Choose your notification time in seconds.
                </Text>
                <Picker style={styles.picker}
                        selectedValue={this.state.seconds}
                        onValueChange={this.handlePickerChange}>
                  <Picker.Item label="5" value={5} />
                  <Picker.Item label="10" value={10} />
                  <Picker.Item label="15" value={15} />
                </Picker>
            </View>
        );
    }
}

export default App;

