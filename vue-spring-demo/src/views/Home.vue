<template>
  <div>
    <div class="is-flex" style="margin-bottom: 20px">
      <el-col :span="5" class="mr-50">
        <el-card shadow="hover">
          <p style="color: #409EFF">用户总数</p>
          <p style="color: #409EFF; text-align: center;font-weight: bold">100</p>
        </el-card>
      </el-col>
      <el-col :span="5" class="mr-50">
        <el-card shadow="hover">
          <p style="color: #409EFF">用户总数</p>
          <p style="color: #409EFF; text-align: center;font-weight: bold">100</p>
        </el-card>
      </el-col>
      <el-col :span="5" class="mr-50">
        <el-card shadow="hover">
          <p style="color: #409EFF">用户总数</p>
          <p style="color: #409EFF; text-align: center;font-weight: bold">100</p>
        </el-card>
      </el-col>
      <el-col :span="5" class="mr-50">
        <el-card shadow="hover">
          <p style="color: #409EFF">用户总数</p>
          <p style="color: #409EFF; text-align: center;font-weight: bold">100</p>
        </el-card>
      </el-col>
    </div>
    <div class="is-flex">
      <div ref="chart1" style="width: 600px; height: 500px; margin-right:100px"></div>
      <div ref="chart2" style="width: 600px;height: 500px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/theme/wonderland'

export default {
  name: "home",
  data() {
    return {}
  },
  mounted() {
    // Initialize the echarts instance based on the prepared dom
    var Chart1 = echarts.init(this.$refs.chart1, 'wonderland');
    var Chart2 = echarts.init(this.$refs.chart2, "wonderland")

    // Specify the configuration items and data for the chart
    let option1 = {
      title: {
        text: 'new user counts by month'
      },
      tooltip: {},
      legend: {
        data: ['user counts']
      },
      xAxis: {
        data: [],
      },
      yAxis: {},
      series: [
        {
          name: 'user counts',
          type: 'line',
          smooth: true,
          data: [],
        },
        {
          name: 'user counts',
          type: 'bar',
          data: []
        }
      ]
    };
    let option2 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          // avoidLabelOverlap: false,
          // itemStyle: {
          //   borderRadius: 10,
          //   borderColor: '#fff',
          //   borderWidth: 2
          // },
          // label: {
          //   show: false,
          //   position: 'center'
          // },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: '40',
          //     fontWeight: 'bold'
          //   }
          // },
          // labelLine: {
          //   show: false
          // },
          data: []
        }
      ]
    };
    // console.log(option2.series[0].data);

    this.request.get("/echarts/getUserCountByMonth").then(res => {
      console.log(res.data)
      option1.xAxis.data = res.data.xaxis;
      option1.series[0].data = res.data.yaxis;
      option1.series[1].data = res.data.yaxis;
      Chart1.setOption(option1);

      for (let i = 0; i < res.data.xaxis.length; i++) {
        let obj = {'value': 0, 'name': ''};
        obj.value = res.data.yaxis[i];
        obj.name = res.data.xaxis[i];
        option2.series[0].data[i] = obj;
      }
      Chart2.setOption(option2);
    })
    // Display the chart using the configuration items and data just specified.

    // Chart2.setOption(option2);

  }
}
</script>

<style scoped>
.is-flex {
  display: flex
}
.data-tabs{width:600px; height: 600px}
.mr-50{margin-left: 50px}
</style>