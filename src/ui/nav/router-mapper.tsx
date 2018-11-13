import * as React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { autobind } from 'core-decorators';
import { Rating } from 'react-native-ratings';

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
          <Rating
            // ref={(ref: Rating) => this.rating = ref}
            type='custom'
            ratingCount={5}
            imageSize={15}
            ratingColor={'#cc3333'}
            ratingBackgroundColor={'#8e8e8e'}
            startingValue={5}
            fractions={2}
          />
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