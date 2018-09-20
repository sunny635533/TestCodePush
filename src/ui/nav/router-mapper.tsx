import * as React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { autobind } from 'core-decorators';

/**
 * 原生项目侧边栏点击跳转，根据routeName来选择导航器
 */
@autobind
export class RouterMapperScreen extends React.Component<{}, {}> {

  constructor(props: NavigationScreenProps<{}>) {
    super(props);
    // this.bootstrapAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 20, backgroundColor: 'black' }}>
          <Text style={{ fontSize: 20, color: 'green', alignSelf: 'center' }}>welcome to here,测试热更新</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});