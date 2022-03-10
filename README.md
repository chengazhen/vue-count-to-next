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
