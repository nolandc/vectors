<template>
  <div id="details">
    <slot/>
  </div>
</template>

<style lang="scss">
 #details {
    box-sizing: border-box;
    margin-bottom: 30px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    @media screen and (max-width: 800px) {
      padding: 0;
    }
 }
</style>