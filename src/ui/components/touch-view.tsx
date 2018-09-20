
import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  ImageStyle,
  ImageURISource,
  StyleProp,
} from 'react-native';
import { autobind } from 'core-decorators';
import Assets from '@src/main/assets';

export interface ChooseBean {
  onPress: (index: number) => void;
  beanIndex?: number;
  imageUri?: ImageURISource;
  text?: string;
}
interface ChooseGroupProps {
  beanList: ChooseBean[];
  selectIndex?: number;
  style?: StyleProp<ViewStyle>;
  selectImageStyle?: StyleProp<ImageStyle>;
  unSelectImageStyle?: StyleProp<ImageStyle>;
  selectTextStyle?: StyleProp<TextStyle>;
  unSelectTextStyle?: StyleProp<TextStyle>;
  selectTouchStyle?: StyleProp<ViewStyle>;
  unSelectTouchStyle?: StyleProp<ViewStyle>;
  cancelChoose?: boolean; // 是否可以取消选择
}

interface ChooseGroupState {
  selectIndex: number;
}

@autobind
export class ChooseGroup extends React.Component<ChooseGroupProps, ChooseGroupState> {

  constructor(props: ChooseGroupProps) {
    super(props);
    this.state = {
      selectIndex: this.props.selectIndex ? this.props.selectIndex : 0
    };
  }

  // componentWillReceiveProps(newProps: ChooseGroupProps) {
  //   if (newProps.selectIndex && (newProps.selectIndex !== this.state.selectIndex)) {
  //     this.setState({ selectIndex: newProps.selectIndex });
  //   }
  // }

  render() {
    return (<View style={this.props.style}>
      {this.props.beanList.map((bean, i) => {
        const actualIndex = bean.beanIndex ? bean.beanIndex : i;

        let textStyle = this.props.unSelectTextStyle;
        let imageStyle = this.props.unSelectImageStyle;
        let touchStyle = this.props.unSelectTouchStyle;
        if (this.state.selectIndex === actualIndex) {
          textStyle = this.props.selectTextStyle;
          imageStyle = this.props.selectImageStyle;
          touchStyle = this.props.selectTouchStyle;
        }

        return (
          <TouchImageWithText
            key={i}
            index={actualIndex}
            imageUri={bean.imageUri}
            text={bean.text}
            onPress={() => this.onPress(actualIndex, bean.onPress)}
            imageStyle={imageStyle}
            textStyle={textStyle}
            touchStyle={touchStyle}
          />);
      })}
    </View>);
  }

  onPress(index: number, press: (index: number) => void) {
    let actualIndex = index;
    if (this.props.cancelChoose && (this.state.selectIndex === index)) {
      actualIndex = -1;
    }
    this.setState({
      selectIndex: actualIndex
    });
    if (press) {
      press(actualIndex);
    }
  }
}

interface ChooseImageWithTextProps extends TouchImageWithTextProps {
  select: boolean;
  selectText?: string;
  selectImageUri?: ImageURISource;
}
export function ChooseImageWithText(props: ChooseImageWithTextProps): JSX.Element {
  const { imageUri, selectImageUri, onPress, text, touchStyle,
    textStyle, imageStyle, selectText, select } = props;
  let image = imageUri;
  let title = text;
  if (select) {
    image = selectImageUri ? selectImageUri : image;
    title = selectText ? selectText : text;
  }
  return (<TouchImageWithText
    onPress={onPress}
    imageUri={image}
    text={title}
    imageStyle={imageStyle}
    textStyle={textStyle}
    touchStyle={touchStyle}
  />);
}

export interface TouchImageWithTextProps {
  onPress: (index?: number) => void;
  index?: number;
  imageUri?: ImageURISource;
  text?: string;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  touchStyle?: StyleProp<ViewStyle>;
}
export function TouchImageWithText(ps: TouchImageWithTextProps) {
  return <TouchableOpacity
    activeOpacity={1}
    style={[styles.center, ps.touchStyle]}
    onPress={() => ps.onPress(ps.index)}>
    {ps.imageUri && <Image source={ps.imageUri} style={ps.imageStyle} />}
    {ps.text && <Text style={ps.textStyle}>{ps.text}</Text>}
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});