<template>
  <div id="app">
		<router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	html,body{
		height: 100%;
		font-size: 14px;
	}
	ul,li{
		list-style: none;
	}
	i{
    font-style: normal;
	}
	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  font-size: 14px;
	  height: 100%;
	  overflow: hidden;
	}
</style>
