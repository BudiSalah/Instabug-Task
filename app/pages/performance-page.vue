<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <DateRange />
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component />
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from "../components/vue-components/performance-chart.vue";
import DateRange from "../components/vue-components/DateRange.vue";
export default {
  name: "AboutPageComponent",
  components: {
    PerformanceChartComponent,
    DateRange,
  },
};
</script>
