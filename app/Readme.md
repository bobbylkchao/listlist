# ListList App

开发版本, 请勿用于生产环境.

该版本目的为使用React Native重构CBRLife App, 实现高性能、可维护，以及第三方SDK可集成的能力是三个重要指标.

```
2021-09-08: 中间件已增加至架构中, 请配置数据模型, 位置在 src/middleware/model.config.js [Bobby Chao]
```

*Remarks: 本次重构不考虑web端和h5端的适配和兼容性, 仅focus用React Native完成App在IOS和Android端的重构。*

## 技术栈

- Language: ES6, TypeScript, CSS
- JS Library: [React.js](https://reactjs.org/)
- JS Bundler: [Metro](https://facebook.github.io/metro/)
- Cross-Platform: [React Native](https://reactnative.dev/)
- UI Library: [UI-Kitten](https://akveo.github.io/react-native-ui-kitten)
- Router: [React Navigation](https://reactnavigation.org/docs)
- Native All-In-One Library: [Expo](https://expo.dev/)
- Back-End: Node.js, GraphQL
- IOS Dev Tool: Xcode
- Android Dev Tool: Android Studio
- Code Checks: TSLint, Airbnb Rules
- Database: MySQL, SQLite, Redis

## 相关命令

- 安装依赖: `npm install`
- 代码检查: `npm run test`
- 启动expo控制台: `npm run web`
- 直接启动ios模拟器: `npm run ios`
- 直接启动android模拟器: `npm run android`
- 清除缓存: [#expo-cli-and-npm](https://docs.expo.dev/troubleshooting/clear-cache-windows/#expo-cli-and-npm)

## 目录介绍

assets: 存放各种静态的素材文件,如图标、图片等;

doc: 存放各种markdown文档

config: 存放配置文件

src: 代码存放的目录

  ----- components: 存放组件 *(文件名就是组件名, 首字母大写)*

  ----- containers: 存放展示容器组件 *(文件名就是组件名, 首字母大写)*

  ----- icons: 存放全局icon定义

  ----- middleware: 数据模型中间件

  ----- pages: 存放各个页面 *(每个页面创建独立的文件夹, 首字母大写)*

  ----- routes: 存放路由配置
  
  ----- utils: 存放公共方法