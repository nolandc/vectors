<template>
  <div id="visualization">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
  #visualization {
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 800px) {
      flex-direction: column;
    }
  }
</style>