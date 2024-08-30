<template>
  <div id="details">
    <slot/>
  </div>
</template>

<style lang="scss">
 #details {
  box-sizing: border-box;
    width: 400px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;  
 }
</style>