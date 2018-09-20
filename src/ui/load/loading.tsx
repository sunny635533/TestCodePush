import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { ThemeYellow } from '@src/ui/colors';
import Spinner from 'react-native-spinkit';

export function FullscreenLoadingView(props: { children?: any }): JSX.Element {
  return (
    <View style={styles.container}>
      <Spinner type='ThreeBounce' size={78} color={'#ff7832'} />
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
});
