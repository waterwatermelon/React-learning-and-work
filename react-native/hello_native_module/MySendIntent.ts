import { NativeModules } from 'react-native';

interface MySendIntentProps {
    send: (message: string) => void;

    createAlarm: (hour: number, minutes: number, message: string) => void;
}
const MySendIntent: MySendIntentProps = NativeModules.MySendIntent;

export { MySendIntent };