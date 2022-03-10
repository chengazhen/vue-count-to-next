# vue-count-to-vite

一个用 vite 打包的 vue 插件 vue3.0 组件

### How to use?

```bash
npm install vue-count-to-vite
```

### Example

```vue
<template>
  <countTo :startVal="startVal" :endVal="endVal" :duration="3000"></countTo>
</template>

<script>
import countTo from 'vue-count-to-vite'
export default {
  components: { countTo },
  setup() {
    return {
      startVal: 0,
      endVal: 2017
    }
  }
}
</script>
```

### cdn 使用方式(在 demo 文件夹里面使用 live server 启动就可以了)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.min.js"></script>
    <script src="../dist/index.umd.js"></script>
    <div id="app">
      <count-to :end-value="200"></count-to>
    </div>
    <script>
      const app = Vue.createApp({
        setup(props) {}
      })
      app.component('CountTo', CountTo)
      app.mount('#app')
    </script>
  </body>
</html>
```

demo:

![demo](https://github.com/PanJiaChen/vue-countTo/blob/master/countDemo.gif)

### Options

| Property  | Description                          |   type   | default |
| --------- | ------------------------------------ | :------: | :-----: |
| startVal  | the value you want to begin at       |  Number  |    0    |
| endVal    | the value you want to arrive at      |  Number  |  2017   |
| duration  | duration in millisecond              |  Number  |  3000   |
| autoplay  | when mounted autoplay                | Boolean  |  true   |
| decimals  | the number of decimal places to show |  Number  |    0    |
| decimal   | the split decimal                    |  String  |    .    |
| separator | the separator                        |  String  |    ,    |
| prefix    | the prefix                           |  String  |   ''    |
| suffix    | the suffix                           |  String  |   ''    |
| useEasing | is use easing function               | Boolean  |  true   |
| easingFn  | the easing function                  | Function |    —    |

** notes: when autoplay:true , it will auto start when startVal or endVal change **

### Functions

|  Function Name  | Description                            |
| :-------------: | -------------------------------------- |
| mountedCallback | when mounted will emit mountedCallback |
|      start      | start the countTo                      |
|      pause      | pause the countTo                      |
|     resume      | resume the countTo                     |
|      reset      | reset the countTo                      |
|   pauseResume   | auto pause/resume the countTo          |
