<template>
  <div class="block">
    <span class="demonstration">Filter By Date!</span>
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      class="date-picker date-picker--450"
    >
    </el-date-picker>
  </div>
</template>

<script>
import { DatePicker } from "element-ui";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
locale.use(lang);

export default {
  name: "DateRange",

  components: { "el-date-picker": DatePicker },

  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "Last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "Last 3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dateRange: "",
    };
  },

  watch: {
    dateRange(dateArr) {
      this.$store.dispatch("performance/set_dateRange", dateArr);
    },
  },

  beforeDestroy() {
    this.$store.dispatch("performance/set_dateRange", []);
  },
};
</script>

<style scoped lang="scss">
.date-picker {
  &--450 {
    min-width: 450px;
  }
}
</style>
