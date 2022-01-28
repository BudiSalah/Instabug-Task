<template>
  <main class="fof">
    <h2 class="fof__code">404</h2>
    <h1 class="fof__text">Page Not Found!</h1>
  </main>
</template>

<script>
export default {
  name: "Fof",
};
</script>

<style lang="scss">
.fof {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  &__code {
    margin-bottom: 0;
  }

  &__text {
    margin-top: 0;
  }
}
</style>
