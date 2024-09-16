<!-- 管理员 dashboard 组件 -->
<template>
  <div class="dashboard-admin-container">
    <!-- 右上角 GitHub 角标 -->
    <github-corner class="github-corner" />
    <!-- 第一行：项目选择面板卡片 -->
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <!-- 第二行：折线图 随上方面板变化而变化 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <!-- 第三行：雷达图 饼图 柱状图 -->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <!-- 第四行：Todo list 等 -->
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <transaction-table />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <todo-list />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartDataAll = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartDataAll.newVisitis // 初始展示数据
    }
  },
  methods: {
    // 设置折线图数据源
    handleSetLineChartData(type) {
      this.lineChartData = lineChartDataAll[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }

  .card-panel-col {
    margin-bottom: 32px;
  }

  // 当页面宽度小于 1200px 时，改变图表的 padding 值
  @media (max-width:1200px) {
    .chart-wrapper {
      padding: 8px 8px 0;
    }
  }
}
</style>
