"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_navigation_1 = require("react-navigation");
let _navigator;
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}
function navigate(routeName, params) {
    _navigator.dispatch(react_navigation_1.NavigationActions.navigate({
        routeName,
        params,
    }));
}
exports.default = {
    navigate,
    setTopLevelNavigator,
};
