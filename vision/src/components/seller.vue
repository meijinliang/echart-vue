<template>
  <div class="com_container">
    <div class="com_chart"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chart: null,
      allData: null,
      currentPage: 1,
      totalPage: 0,
      timeId: null
    }
  },
  mounted () {
    this.initChart()
    this.getData()
  },
  destroyed () {
    clearInterval(this.timeId)
  },
  methods: {
    //初始化echartInstance对象
    initChart () {
      this.chart = this.$echarts.init(document.querySelector('.com_chart'), 'chalk')
      this.chart.on('mouseover', () => {
        //鼠标移入
        clearInterval(this.timeId)
      })
      this.chart.on('mouseout', () => {
        //鼠标移出
        this.startInterval()
      })
    },
    async getData () {
      //http://127.0.0.1:8888/api/
      const { data: res } = await this.$http.get('seller')
      res.sort((a, b) => {
        return a.value - b.value //从小到大的排序
      })
      this.allData = res
      this.totalPage = Math.ceil(res.length / 5)
      this.updataChart()
      this.startInterval()
    },
    updataChart () {
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      const showData = this.allData.slice(start, end)
      const sellerData = showData.map(item => {
        return item.value
      })
      const yData = showData.map(item => {
        return item.name
      })
      const option = {
        title: {
          text: '商家销售量统计图',
          textStyle: {
            fontSize: 66
          },
          left: 20,
          top: 20
        },
        grid: { //坐标轴的配置
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true //距离是包含坐标上的文字
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: yData
        },
        series: [{
          type: 'bar',
          data: sellerData,
          barWidth: 100 / yData.length + '%',
          label: {
            show: true,
            // position: 'rigth',
            textStyle: {
              color: 'white'
            }
          },
          itemStyle: {
            borderRadius: [0, 33, 33, 0],
            // 指明颜色渐变的方向
            //知名不同百分比之下颜色的值 Z这里颜色渐变的方向是从左往右
            //     color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            //       offset: 0,
            //       color: '#5052EE'
            //     }, {
            //       offset: 100,
            //       color: '#AB6EE5'
            //     }])
          }
        }]
      }
      this.chart.setOption(option)
      const _that = this
      window.onresize = function () {
        _that.chart.resize()
      }
    },
    startInterval () {
      //开启定时器之前先判断有没有定时器打开 防止重复
      if (this.timeId) {
        setInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.updataChart()
      }, 6000)
    }
  }
}
</script>
