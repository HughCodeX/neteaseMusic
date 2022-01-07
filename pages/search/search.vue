<template>
	<view class="search">
		<musicHead title="搜索" :iconShow="true" :iconBlack="true"></musicHead>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="search-search">
					<text class="iconfont iconsearch"></text>
					<input type="text" placeholder="搜索歌曲" v-model="searchWord" @input="handleToSuggest" @confirm="handleToHistory(searchWord)"/>
					<text class="iconfont iconguanbi" v-show="showType != 1" @tap="handleToClose"></text>
				</view>
				<block v-if="showType == 1">
					<view class="search-history">
						<view class="search-history-head">
							<text>历史记录</text>
							<text class="iconfont iconlajitong" @tap="clearHistory"></text>
						</view>
						<view class="search-history-list">
							<view v-for="(item, index) in searchHistory" :key="index" @click="handleToWord(item)">{{item}}</view>
						</view>
					</view>
					<view class="search-hot">
						<view class="search-hot-head">
							热搜榜
						</view>
						<view class="search-hot-item" v-for="(item, index) in searchHot" :key="index" @tap="handleToWord(item.searchWord)">
							<view class="search-hot-top">{{index+1}}</view>
							<view class="search-hot-word">
								<view class="">
									{{item.searchWord}} <image :src="item.iconUrl" mode="aspectFit"></image>
								</view>
								<view class="">
									{{item.content}}
								</view>
								
							</view>
							<text class="search-hot-count">{{item.score}}</text>
						</view>
					</view>
				</block>
				<block v-else-if="showType == 2 ">
					<view class="search-result">
						<view class="search-result-item" v-for="(item, index) in searchList" :key="index" @tap="handelToDetail(item.id)">
							<view class="search-result-word">
								<view>{{item.name}}</view>
								<view>{{item.artists[0].name}} - {{item.album.name}}</view>
							</view>
							<text class="iconfont iconbofang"></text>
						</view>
					</view>
				</block>
				<block v-else-if="showType == 3">
					<view class="search-suggest">
						<view class="search-suggest-title">
							搜索"{{searchWord}}"
						</view>
						<view class="search-suggest-item" v-for="(item,index) in searchSuggest" :key="index" @tap="handleToWord(item.keyword)">
							<text class="iconfont iconsearch"></text>{{item.keyword}}
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { searchHot, searchWord, searchSuggest } from "@/common/api.js"
	export default {
		data() {
			return {
				searchHot:[],
				searchWord:"",
				searchHistory:[],
				showType:1,
				searchList:[],
				searchSuggest:[],
			}
		},
		onLoad() {
			searchHot().then((res)=>{
				console.log(res);
				if(res[1].data.code == '200'){
					this.searchHot = res[1].data.data
				}
			})
			uni.getStorage({
			    key: 'searchHistory',
			    success: (res)=>{
			        this.searchHistory = res.data
			    }
			});
		},
		methods: {
			handleToWord(searchWord){
				this.searchWord = searchWord
				this.getSearchList(searchWord)
			},
			handleToHistory(searchWord){
				this.getSearchList(searchWord)
				this.searchHistory.unshift(searchWord)
				this.searchHistory = [...new Set(this.searchHistory)]
				uni.setStorage({
					key:"searchHistory",
					data:this.searchHistory
				})
			},
			clearHistory(){
				uni.removeStorage({
				    key: 'searchHistory',
				    success: (res)=>{
				        this.searchHistory = []
				    }
				});
			},
			getSearchList(word){
				searchWord(word).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchList = res[1].data.result.songs
						this.showType = 2
					}
				})
			},
			handleToClose(){
				this.searchWord = ""
				this.showType = 1
			},
			handelToDetail(songId){
				uni.navigateTo({
					url:"/pages/detail/detail?songId="+songId
				})
			},
			handleToSuggest(e){
				let value = e.detail.value
				if(!value){
					this.showType =1
					return
				}
				searchSuggest(value).then((res)=>{
					if(res[1].data.code == '200'){
						this.searchSuggest = res[1].data.result.allMatch
						this.showType = 3
					}
				})
			}
		}
	}
</script>

<style scoped>
	.search-search{ display: flex; background:#f7f7f7; height:73rpx; margin:28rpx 30rpx 30rpx 30rpx; border-radius: 50rpx; align-items: center;}
	.search-search text{ margin:0 27rpx;} 
	.search-search input{ font-size:26rpx; flex:1;}
	
	.search-history{ margin:0 30rpx; font-size:26rpx;}
	.search-history-head{ display: flex; justify-content: space-between;}
	.search-history-list{ display: flex; margin-top:36rpx; flex-wrap: wrap;}
	.search-history-list view{ padding:20rpx 40rpx; background:#f7f7f7; border-radius: 50rpx; margin-right:30rpx; margin-bottom: 20rpx;}
	
	.search-hot{ margin:30rpx 30rpx; font-size:26rpx; color:#bebebe;}
	.search-hot-title{}
	.search-hot-item{ display: flex; align-items: center; margin-top: 40rpx;}
	.search-hot-top{ width:60rpx; color:#fb2221; font-size:34rpx;}
	.search-hot-word{ flex:1;}
	.search-hot-word view:nth-child(1){ font-size:36rpx; color:black;}
	.search-hot-word image{ width:48rpx; height:22rpx; margin-left: 10rpx;}
	.search-hot-count{}
	
	.search-result{ border-top: 2rpx #e5e5e5 solid; padding:30rpx;}
	.search-result-item{ display: flex; align-items: center; border-bottom: 2rpx #e5e5e5 solid; padding-bottom:30rpx; margin-bottom: 30rpx;}
	.search-result-item text{ font-size:50rpx;}
	.search-result-word{ flex:1;}
	.search-result-word view:nth-child(1){ font-size:28rpx; color:#3e6694;}
	.search-result-word view:nth-child(2){ font-size:26rpx;}
	
	.search-suggest{ border-top: 2rpx #e5e5e5 solid; padding:30rpx; font-size:26rpx; }
	.search-suggest-title{ color:#537caa; margin-bottom: 40rpx;}
	.search-suggest-item{ color:#666666; margin-bottom: 70rpx;}
	.search-suggest-item text{ color:#c2c2c2; font-size:26rpx; margin-right:26rpx;}
</style>
