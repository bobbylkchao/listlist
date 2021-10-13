# 组件使用

## Toast

**Desc:** 该组件用于一些不需要用户交互的提示，如密码错误、会话过期等，该组件会以动画方式出现，然后自动消失。

**Import:** import { showToast } from utils; *注意utils的路径*

**Props Interface:**

```ts
interface ToastPropsInterface{
  /**
   * Toast 内容
   */
  message: string,
  /**
  * Toast 类型
  * @default success
  */
  type?: 'success' | 'failed' | 'warning',
  /**
   * Toast 显示时间
   * @default 1000 ms
   */
  time?: number,
}
```

**Usage:**

```ts
import React from "react";
import { View, Button } from 'react-native';
import { showToast } from '../../utils';

const ToastExample = () => {

  return(
    <View style={{ flex: 1 }}>
      <Button
        title="显示toast"
        onPress={() => showToast({message: '登录失败', type: 'failed'})}
      />
    </View>
  );
};

export default ToastExample;
```
