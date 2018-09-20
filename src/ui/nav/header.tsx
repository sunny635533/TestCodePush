import * as React from 'react';
import {
  View,
  Text,
  TextProperties,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
  ImageURISource,
  ImageStyle,
  ViewStyle,
  StyleProp,
  TextStyle
} from 'react-native';
import Assets from '@src/main/assets';
import * as Util from '@src/util';

export function createTitle(text: string, textProps?: TextProperties, titleStyle?: StyleProp<TextStyle>) {
  return (
    <View style={styles.title}>
      <Text {...textProps} style={[styles.titleText, titleStyle]}>{text}</Text>
    </View>
  );
}

interface NavButtonProps {
  action: () => void;
  image?: ImageURISource;
  imageStyle?: ImageStyle;
  touchStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
}
export function NavButton(ps: { buttons: NavButtonProps[] }): JSX.Element {
  return (
    <View style={styles.flexDirectionRow}>
      {ps.buttons.map((button, i) => {
        return (
          <TouchableOpacity key={i} onPress={() => button.action()} style={[styles.buttonContainer, button.touchStyle]}>
            {button.title && <Text style={[styles.titleText, button.titleStyle]}>{button.title}</Text>}
            {button.image && <Image source={button.image} style={[styles.backImage, button.imageStyle]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


interface NavHeaderProps {
  backAction: () => void;
  backImage?: ImageURISource;
  title?: string;
  rightButtons?: NavButtonProps[];
  middleView?: JSX.Element;
}
export function NavHeaderWithBack(props: NavHeaderProps): JSX.Element {
  return (
    <NavigatorBar
      leftButton={{
        action: props.backAction,
        image: props.backImage ? props.backImage : Assets.chezhu.back,
        imageStyle: styles.backImage,
      }}
      title={props.title}
      middleView={props.middleView}
      rightButtons={props.rightButtons}
    />
  );
}


interface NavigatorBarProps {
  leftButton: NavButtonProps;
  rightButtons?: NavButtonProps[];
  middleView?: JSX.Element;
  backgroundImage?: ImageURISource;
  middleViewStyle?: ViewStyle;
  style?: ViewStyle;
  title?: string;
  titleProperties?: TextProperties;
  titleStyle?: StyleProp<TextStyle>;
}

export class NavigatorBar extends React.Component<NavigatorBarProps, {}> {
  render() {
    if (this.props.backgroundImage) {
      return (
        <ImageBackground
          resizeMode={'stretch'}
          source={this.props.backgroundImage}
          style={[styles.header, this.props.style ? this.props.style : {}]}>
          <NavButton buttons={[this.props.leftButton]} />
          <View style={[styles.flex, this.props.middleViewStyle]}>
            {this.props.title && createTitle(this.props.title, this.props.titleProperties, this.props.titleStyle)}
            {this.props.middleView}
          </View>
          {this.props.rightButtons ? <NavButton buttons={this.props.rightButtons} /> : <View style={styles.buttonContainer} />}
        </ImageBackground>
      );
    } else {
      return (
        <View style={[styles.header, this.props.style]}>
          <NavButton buttons={[this.props.leftButton]} />
          <View style={[styles.flex, this.props.middleViewStyle]}>
            {this.props.title && createTitle(this.props.title, this.props.titleProperties, this.props.titleStyle)}
            {this.props.middleView}
          </View>
          {this.props.rightButtons ? <NavButton buttons={this.props.rightButtons} /> : <View style={styles.buttonContainer} />}
        </View>
      );
    }
  }
}

const top = Platform.select({ ios: Util.isIphoneX() ? 0 : 20 });

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: Platform.select({ ios: 58, android: 50 }),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingTop: top,
    backgroundColor: '#e23f42',
    // borderBottomWidth: 1,
    // borderBottomColor: '#cccccc',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 51,
    paddingHorizontal: 6,
    height: Platform.select({ ios: 58 - top, android: 50 }),
  },
  backImage: {
    width: 51,
    height: 18,
    resizeMode: 'stretch'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  titleText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
  }
});
