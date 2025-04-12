// 管理用户数据相关
import { loginAPI } from "@/apis/user";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', () =>{
    // 1.定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account,password }) => {
        const res = await loginAPI({ account,password })
        userInfo.value = res.result
    }
    // 退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
    }


    // 3. 以对像的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true,
  })




//   import { ref } from 'vue'
//   import { defineStore } from 'pinia'
//   import { getCategoryAPI } from "@/apis/layout";
  
  
//   export const useCategoryStore = defineStore('category', () => {
//     // 导航列表的数据管理
  
//     // state 导航列表数据
//     const categoryList = ref([])
//     // action 获取导航数据的方法
//     const getCategory = async () => {
//       const res = await getCategoryAPI()
//       categoryList.value = res.result
//   }
  
//   return {
//     categoryList,
//     getCategory
//   }
  
//   })