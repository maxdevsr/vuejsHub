<template>
  <div class="total">
    <RouterView />
  </div>
</template>

<script></script>

<style>
.total {
  display: flex;
  width: 100vw;
  height: 100vw;

  align-items: flex-start;
  justify-content: center;
}
#app {
  background: #070e39;
  background: -moz-linear-gradient(left, #070e39 0%, #160ea4 50%, #000000 100%);
  background: -webkit-linear-gradient(
    left,
    #070e39 0%,
    #160ea4 50%,
    #000000 100%
  );
  background: linear-gradient(to right, #070e39 0%, #160ea4 50%, #000000 100%);
}
</style>
