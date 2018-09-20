declare module 'react-native-easy-toast' {
    import * as React from 'react';
    import {
        ViewStyle,
        TextStyle
    } from 'react-native';

    export interface ToastProps extends React.Props<Toast> {
        style?: ViewStyle;
        position?: string;
        positionValue?: number;
        fadeInDuration?: number;
        fadeOutDuration?: number;
        opacity?: number;
        textStyle?: TextStyle
    }

    export default class Toast extends React.Component<ToastProps> {
        show(text: string, duration?: number, callback?: () => void): void;
        close(): void;
        show(view: JSX.Element);
    }


    export const DURATION = {
        LENGTH_SHORT: 500,
        FOREVER: 0,
    };

}