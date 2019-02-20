<template>
    <div class="main-content">
        <slot></slot>
    </div>
</template>

<style scoped>
.main-content {
    padding: 14px;
    -ms-flex: 1;
    flex: 1;
    overflow: auto;
    background-color: #fff;
    position: relative;
    z-index: 1;
    display: flex;
    height: 100px;
}
</style>