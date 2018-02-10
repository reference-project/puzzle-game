<template>
    <div class="year-loading-wrapper">
        <div class="mask"></div>
        <div class="year-dota-loading"><span /><span /><span /><span /><span /></div>
    </div>
    </template>

<style lang="scss">
    .year-loading-wrapper{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items:center;
        justify-items: center;
        .mask{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: #000;
            opacity:0.1;
            z-index: 1;
        }
    }
    .year-dota-loading{
        position: relative;
        width: 100%;
        text-align: center;
        z-index: 2;
    }
    .year-dota-loading span{
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        border-radius: 50%;
        background: #170303;
        -webkit-animation: load 1.04s ease infinite;
    }
    .year-dota-loading span:last-child{
        margin-right: 0px;
    }
    @-webkit-keyframes load{
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    .year-dota-loading span:nth-child(1){
        -webkit-animation-delay:0.13s;
    }
    .year-dota-loading span:nth-child(2){
        -webkit-animation-delay:0.26s;
    }
    .year-dota-loading span:nth-child(3){
        -webkit-animation-delay:0.39s;
    }
    .year-dota-loading span:nth-child(4){
        -webkit-animation-delay:0.52s;
    }
    .year-dota-loading span:nth-child(5){
        -webkit-animation-delay:0.65s;
}
</style>
