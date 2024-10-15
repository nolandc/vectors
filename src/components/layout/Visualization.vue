
<template>
  <div id="visualization">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
  #visualization {
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media screen and (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
    }
  }
</style>