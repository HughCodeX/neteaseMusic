<template>
	<view class="music-head" :style="{color:color}">
		<view class="music-head-icon" v-if="iconShow" :class="{'music-head-iconBlack':iconBlack}">
			<text class="iconfont iconzuojiantou-copy" @tap="handleToBack"></text>
			<text class="music-head-line"> | </text>
			<text class="iconfont iconshouye" @tap="handleToHome"></text>
		</view>
		{{title}}
	</view>
</template>

<script>
	export default {
		name:"musicHead",
		data() {
			return {
				
			};
		},
		props:["title","iconShow","color","iconBlack"],
		methods:{
			handleToBack(){
				uni.navigateBack()
			},
			handleToHome(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		}
	}
</script>

<style scoped>
	.music-head{
		height:75px;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
		color: black;
		position: relative;
	}
	.music-head-line{
		position: absolute;
		bottom: 2px;
		
	}
	.music-head-icon{
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
		width: 97px;
		height: 31px;
		background-color: rgba(0,0,0,0.4);
		color: white;
		line-height: 31px;
		border-radius: 15px;
		display: flex;
		justify-content: space-evenly;
	}
	.music-head-iconBlack{
		color: black;
		border: 1px #eaeaea solid;
		background-color: white;
	}
</style>
