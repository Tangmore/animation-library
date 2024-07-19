import { defineStore } from 'pinia'
/**
 * 基础信息信息
 * @methods constant 设置常量类
 */
export const useCommonInfo = defineStore('commonInfo', {
  persist: {
    enabled: true,//开启数据持久化
  }, 
  state: (): any => ({
    enumMap: {},
	}),
	actions: {
		async constant(val : string) {
			this.enumMap = val
		},
	}, 
})