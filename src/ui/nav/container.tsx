import * as React from 'react';
import {
  Dimensions,
  StatusBar,
  SafeAreaView,
  Text,
  View,
  Button
} from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  NavigationActions
} from 'react-navigation';
import * as Constants from '@src/ui/nav/constant';
import { RouterMapperScreen } from '@src/ui/nav/router-mapper';

export {
  Constants
};

// ============= AppNavigator ================
// export const AppNavigator = createStackNavigator(
//   {
//     [Contants.ROUTE_MY_ROUTE_NAVIGATOR]: {
//       screen: MyRouteNavigator,
//     },
//   }, {
//     initialRouteName: Contants.ROUTE_MY_ROUTE_NAVIGATOR,
//     navigationOptions: {
//       header: null,
//       // Whether you can use gestures to dismiss this screen. Defaults to true on iOS, false on Android.
//       gesturesEnabled: false,
//     },
//     // fix shadow line on Top
//     headerMode: 'none',
//     cardStyle: { shadowColor: 'transparent' },
//   }
// );

export const AppNavigator = createSwitchNavigator(
  {
    [Constants.ROUTE_MAPPER]: {
      screen: RouterMapperScreen
    }
  }, {
    initialRouteName: Constants.ROUTE_MAPPER,
  }
);


export const getRouteName = (router: any): string => {
  if (router.routes) {
    return getRouteName(router.routes[router.index]);
  } else {
    return router.routeName;
  }
};

/** 
 * routeName : from Constant Name
 */
export function routeNavigate(navigatorRef: any,
  routeName: string = Constants.ROUTE_MY_ROUTE_NAVIGATOR,
  params: object = {}) {
  navigatorRef.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
