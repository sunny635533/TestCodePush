"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const base_component_1 = require("@src/ui/base-component");
const header_1 = require("@src/ui/nav/header");
const native_modules_1 = require("@src/util/native-modules");
const container_1 = require("@src/ui/nav/container");
const impl_1 = require("@src/services/my-route/impl");
const colors_1 = require("@src/ui/colors");
const core_decorators_1 = require("core-decorators");
const components_1 = require("@src/ui/my-route/components");
let MyRouteScreen = class MyRouteScreen extends base_component_1.BaseComponent {
    constructor(props) {
        super(props);
        this.deleteRouteId = '';
        this.myRouteService = new impl_1.MyRouteServiceImpl(this.appContext.app.webService, this.appContext.app.userRole, this.appContext.app.env);
        this.state = {
            routeList: [],
            showDeleteModal: false,
        };
    }
    componentDidMount() {
        this.getRouteList();
    }
    getRouteList() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.appContext.app.interaction.blockAndWaitFor(this.myRouteService.getRouteList(), { kind: 0 });
            if (result.success) {
                const myRouteList = result.body;
                if (myRouteList && myRouteList.length > 0) {
                    this.setState({
                        routeList: myRouteList,
                    });
                }
            }
        });
    }
    deleteRoute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.appContext.app.interaction.blockAndWaitFor(this.myRouteService.deleteRoute({ id }), { kind: 2 });
            if (result.success) {
                const delteRouteIndex = this.state.routeList.findIndex(r => r.id === id);
                this.state.routeList.splice(delteRouteIndex, 1);
                if (this.state.routeList.length <= 0) {
                    this.setState({
                        routeList: []
                    });
                }
            }
            else {
            }
            this.setState({ showDeleteModal: false });
        });
    }
    render() {
        return (React.createElement(react_native_1.View, { style: styles.flex },
            React.createElement(header_1.NavHeaderWithBack, { backAction: this.backToNative, title: '我的路线', rightButtons: [{
                        action: () => this.props.navigation.navigate(container_1.Constants.ROUTE_ADD_ROUTE, { listener: this }),
                        title: '添加'
                    }] }),
            this.getRouteListView(),
            this.deleteModal()));
    }
    getRouteListView() {
        if (this.state.routeList.length <= 0) {
            return React.createElement(components_1.EmptyRouteView, { addRoute: () => { this.props.navigation.navigate(container_1.Constants.ROUTE_ADD_ROUTE, { listener: this }); } });
        }
        else {
            return React.createElement(react_native_1.FlatList, { style: { flex: 1, paddingTop: 10 }, contentContainerStyle: {}, data: this.state.routeList, renderItem: this.renderItem, keyExtractor: (item) => item.id, horizontal: false });
        }
    }
    backToNative() {
        return __awaiter(this, void 0, void 0, function* () {
            if (react_native_1.Platform.OS === 'ios') {
                const nativeBridge = native_modules_1.loadNativeBridge();
                return yield nativeBridge.comeBackNativeController();
            }
            else {
                react_native_1.BackHandler.exitApp();
            }
        });
    }
    renderItem(info) {
        const route = info.item;
        return (React.createElement(react_native_1.TouchableOpacity, { key: route.id, style: styles.renderRow, activeOpacity: 0.7, onLongPress: () => {
                this.setState({
                    showDeleteModal: true
                });
                this.deleteRouteId = route.id;
            } },
            React.createElement(react_native_1.View, { style: styles.greenLine }),
            this.renderAdddress(route.senderCity, route.senderDistrict),
            React.createElement(react_native_1.View, { style: styles.grayLineContainer },
                React.createElement(react_native_1.View, { style: styles.grayLine })),
            this.renderAdddress(route.recipientCity, route.recipientDistrict),
            React.createElement(react_native_1.Text, { style: styles.goodsName }, route.goodsTypeName)));
    }
    renderAdddress(city, district) {
        return (React.createElement(react_native_1.View, null,
            React.createElement(react_native_1.Text, { style: styles.city }, city),
            React.createElement(react_native_1.Text, { style: styles.district }, district)));
    }
    deleteModal() {
        return React.createElement(react_native_1.Modal, { transparent: true, visible: this.state.showDeleteModal, onRequestClose: () => { } },
            React.createElement(react_native_1.TouchableOpacity, { style: styles.modalBg, onPress: () => {
                    this.setState({ showDeleteModal: false });
                } },
                React.createElement(react_native_1.View, null,
                    this.renderDeleteItem('确定要删除路线吗？', undefined, { fontSize: 16 }, { marginBottom: 1 }),
                    this.renderDeleteItem('确定', () => { this.deleteRoute(this.deleteRouteId); }, { color: 'black' }, { marginBottom: 5 }),
                    this.renderDeleteItem('取消', () => { this.setState({ showDeleteModal: false }); }, { color: 'red' }))));
    }
    renderDeleteItem(title, action, titleStyle, touchStyle) {
        return (React.createElement(react_native_1.TouchableOpacity, { style: [styles.deleteItem, touchStyle], onPress: action },
            React.createElement(react_native_1.Text, { style: [styles.deleteItemText, titleStyle] }, title)));
    }
};
MyRouteScreen = __decorate([
    core_decorators_1.autobind
], MyRouteScreen);
exports.MyRouteScreen = MyRouteScreen;
const styles = react_native_1.StyleSheet.create({
    flex: {
        flex: 1,
    },
    renderRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    greenLine: {
        width: 4,
        height: 55,
        backgroundColor: colors_1.ThemeRed.GLightGreen,
        marginRight: 10,
    },
    city: {
        color: '#333333',
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center'
    },
    district: {
        color: '#666666',
        fontSize: 12,
        textAlign: 'center'
    },
    grayLineContainer: {
        flex: 1,
        alignItems: 'center'
    },
    grayLine: {
        width: 30,
        height: 1,
        backgroundColor: '#aaaaaa'
    },
    goodsName: {
        flex: 2,
        fontSize: 18,
        color: '#333333',
        textAlign: 'center'
    },
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'flex-end'
    },
    deleteItem: {
        backgroundColor: 'white',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteItemText: {
        fontSize: 18,
        color: '#999999',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
});
