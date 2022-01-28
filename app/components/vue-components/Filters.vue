<template>
  <div class="filters">
    <input
      class="filters__input"
      type="search"
      name="filters"
      placeholder="Filter the employees..."
      v-model="filtersInput"
      @input="filterEmitter"
    />

    <button @click.prevent="resetFiltersInput" class="filters__reset-btn">
      Reset
    </button>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      filtersInput: "",
    };
  },
  methods: {
    resetFiltersInput() {
      this.filtersInput = "";
      this.$emit("emit-filter");
    },
    filterEmitter() {
      this.$emit("emit-filter", this.filtersInput);
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  &__input {
    min-width: 250px;
    border: 1px solid #eee;
    padding: 5px;
    color: #0099ff;
    outline-color: #c2e7ff;
  }

  &__reset-btn {
    color: #fff;
    padding: 5px 12px;
    text-transform: capitalize;
    background-color: #0099ff;
  }
}
</style>
