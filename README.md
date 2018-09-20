1、项目下载后，执行：npm install,
在./node_modules/react-native/Libraries/react-native/react-native-implementation.js  目录下注释掉这段代码
// Deprecated
  // get Navigator() {
  //   invariant(
  //     false,
  //     'Navigator is deprecated and has been removed from this package. It can now be installed ' +
  //     'and imported from `react-native-deprecated-custom-components` instead of `react-native`. ' +
  //     'Learn about alternative navigation solutions at http://facebook.github.io/react-native/docs/navigation.html'
  //   );
  // },

否则运行会报navigator的bug。

2、执行：react-native start，启动服务器。
打开另外的窗口执行：tsc -w ，实时把.tsx文件编译成.js文件
