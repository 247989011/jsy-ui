# jsy-ui

## 说明

> 基于vue+element的后台管理系统的前端项目。

> 包括权限管理、用户管理、菜单管理、角色管理等功能。


## 技术选型

技术 | 说明 | 官网
----|----|----
Vue | 前端框架 | [https://vuejs.org/](https://vuejs.org/)
Vue-router | 路由框架 | [https://router.vuejs.org/](https://router.vuejs.org/)
Vuex | 全局状态管理框架 | [https://vuex.vuejs.org/](https://vuex.vuejs.org/)
Element | 前端UI框架 | [https://element.eleme.io/](https://element.eleme.io/)
Axios | 前端HTTP框架 | [https://github.com/axios/axios](https://github.com/axios/axios)
v-charts | 基于Echarts的图表框架 | [https://v-charts.js.org/](https://v-charts.js.org/)
Js-cookie | cookie管理工具 | [https://github.com/js-cookie/js-cookie](https://github.com/js-cookie/js-cookie)
nprogress | 进度条控件 | [https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress)

### 项目布局

``` lua
config -- 配置
src -- 源码目录
├── api -- axios网络请求定义
├── assets -- 静态图片资源文件
├── components -- 通用组件封装
├── config --  受环境影响的通用变量
├── const --  封装变量
├── directive --  
├── docker --  dockerfile
├── filters --  过滤器
├── mixins --  
├── mock --  模拟数据
├── page --  框架vue页面
├── router -- vue-router路由配置
├── store -- vuex的状态管理
├── styles -- 全局css样式
├── util -- 工具类
├── vendor -- 插件
└── views -- 前端页面
    ├── home -- 首页
    ├── layout -- 通用页面加载框架
    ├── login -- 登录页
    ├── oms -- 订单模块页面
    ├── pms -- 商品模块页面
    └── sms -- 营销模块页面
```

## 搭建步骤

- 下载node并安装：[https://nodejs.org/dist/v8.9.4/node-v8.9.4-x64.msi](https://nodejs.org/dist/v8.9.4/node-v8.9.4-x64.msi)；
- 该项目为前后端分离项目，访问本地访问接口需搭建后台环境，搭建请参考后端项目[传送门](https://github.com/macrozheng/mall);
- 访问在线接口无需搭建后台环境，只需将config/dev.env.js文件中的BASE_API改为[http://39.98.69.210:8080](http://localhost:39.98.69.210:8080)即可；
- 克隆源代码到本地，使用IDEA打开，并完成编译;
- 在IDEA命令行中运行命令： `npm run dev`,访问地址：[http://localhost:8090](http://localhost:8090) 即可打开后台管理系统页面；
- 如果遇到无法运行该命令，需要配置npm的环境变量，如在path变量中添加：C:\Users\zhenghong\AppData\Roaming\npm；
- 如果遇到IDEA下载项目后没有自动完成编译，需先运行`npm install` 命令。


## 登录详解

1. 用户登录成功时调用——loginByUsername方法会返回token
2. 将返回的token存到cookie里面，在src/store/modules/user.js——LoginByUsername方法
3. 在调用同js文件里的SET_TOKEN方法，将token存到score里
```
mutations: {
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
```
4. 在ajax拦截器里，将token携带到header里，服务器就会接受token，来区分那个用户，有那些权限

  `src/router /axios.js`


## 自定义返回处理
HTTPresponse拦截:response ,并处理公共异常
 `axios.interceptors.response` 

## 按钮权限控制

在后台菜单管理中给指定菜单添加 按钮节点 需要指定 权限标志

```
//按钮v-if使用
<el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="sys_user_upd" size="small" type="success" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="sys_user_del" size="small" type="danger" @click="deletes(scope.row)">删除
          </el-button>
        </template>
  </el-table-column>
  
  // 变量初始化
  created() {
    this.getList();
    this.sys_user_add = this.permissions["sys_user_add"];
    this.sys_user_upd = this.permissions["sys_user_upd"];
    this.sys_user_del = this.permissions["sys_user_del"];
  },
  
  // 从vuex 获取保存的permissions
  computed: {
    ...mapGetters(["permissions"])
  }
  
  //permissions获取
  getUserInfo(state.token).then(response => {
    commit('SET_PERMISSIONS', data.permissions)
})

```

## 图标引入

步骤 1 :先去阿里巴巴图标库注册一个账号
[阿里巴巴图标库](https://www.iconfont.cn/)

步骤 2 :完后选择自己喜欢的图标加入到项目中，点击生成在线链接  

步骤 3 :图标的加载
将红色框中的部分复制项目中，也就是‘617295_eq4dlr8rl7peqaor’在

`/src/config/env.js`

的`iconfontVersion` 的数组中

`let iconfontVersion = ['567566_sch40o867ogk3xr','617295_eq4dlr8rl7peqaor'];`


步骤 4 :图标的调用
输入在图标库中图标的名称即可

`<i class="icon-bofangqi-suoping"></i>`
- ps，如果点击更新URL，更新env.js
- 阿里巴巴图标库的调用必须是有网情况

