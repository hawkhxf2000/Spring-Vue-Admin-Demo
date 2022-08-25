# vue-spring-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Echart集成
- npm安装Echart
```
npm i echarts -s
```
- 组件中引入echart
```vue
<template>
  <div class="home">
    <div ref="main" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "home",
  data(){
    return {

    }
  },
  mounted() {
    // Initialize the echarts instance based on the prepared dom
    var myChart = echarts.init(this.$refs.main);

    // Specify the configuration items and data for the chart
    var option = {
      title: {
        text: 'Example'
      },
      tooltip: {},
      legend: {
        data: ['sales']
      },
      xAxis: {
        data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: 'sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };

    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);
  }
}
</script>
```
