<template>
	<view class="index">
		<musicHead title="网易云音乐" :iconShow="false"></musicHead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleToSearch">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
				<m-for-skeleton
				        :avatarSize="200"
				        :row="3"
				        :loading="loading"
				        isarc="square"
								title="false"
								titleStyle="{}"
								v-if="isLoading">
				</m-for-skeleton>
				<view class="index-list" v-else>
					<view class="index-list-item" v-for="(item,index) in topList" :key="index"
						@tap="handleToList(item.id)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{ item.updateFrequency }}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(musicItem,index) in item.tracks" :key="index">
								{{ index + 1 }}.{{ musicItem.first }} - {{ musicItem.second }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		topList
	} from "@/common/api.js"
	export default {
		data() {
			return {
				topList: [],
				isLoading:true
			}
		},
		onLoad() {
			this.isLoading=true
			topList().then((res) => {
				if (res.length) {
					this.topList = res
					this.isLoading = false
				}
			})
		},
		methods: {
			handleToList(listId) {
				uni.navigateTo({
					url: '/pages/list/list?listId=' + listId
				})
			},
			handleToSearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>

<style scoped>
	.index {}

	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 30rpx;
		margin-top: 70rpx;
		background: #f7f7f7;
		border-radius: 50rpx;
	}

	.index-search text {
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}

	.index-search input {
		font-size: 28rpx;
		flex: 1;
	}

	.index-list {
		margin: 0 30rpx;
	}

	.index-list-item {
		display: flex;
		margin-bottom: 35rpx;
	}

	.index-list-img {
		width: 212rpx;
		height: 212rpx;
		margin-right: 20rpx;
		border-radius: 15rpx;
		overflow: hidden;
		position: relative;
	}

	.index-list-img image {
		width: 100%;
		height: 100%;
	}

	.index-list-img text {
		position: absolute;
		font-size: 22rpx;
		color: white;
		bottom: 15rpx;
		left: 15rpx;
	}

	.index-list-text {
		flex: 1;
		font-size: 24rpx;
		line-height: 68rpx;
	}

	.index-list-text view {
		width: 60vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
