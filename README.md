#vue前端项目中如何使用hswebmq
- 安装模块stompjs、hswebmq
```
npm i stompjs hswebmq --save-dev
```
- 在src/main.js中引入hswebmq
```
// 引入hswebmq模块
import mq from 'hswebmq'
// 初始化数据
mq.initConfig({
  MQTT_SERVICE: 'ws://47.110.145.204:8140/ws',
  MQTT_LOGIN: 'rollcall',
  MQTT_PASSCODE: 'rollcall',
  MQTT_ROUTEINGKEY: '/topic/huansi.web.testMQSX'
})
// 把mq挂载到全局
Vue.prototype.$hswebmq = mq
```
- 在其他页面使用mq的时候
```
  // 1使用默认参数的时候,就是在main.js mq.initConfig初始化的这个配置,下面就可以不用传数据了
  this.$hswebmq.connect()
  // 2只改变路由key的时候.
   this.$hswebmq.connect({
        MQTT_ROUTEINGKEY: '/topic/huansi.web.testMQSX_1'
   })
  // 总之你想改哪个参数就传哪个参数
```
- 备注
    - 前端连接的交换机类型:topic模式;连接的MQTT_ROUTEINGKEY要以/topic/开头,例如:'/topic/huansi.web.testMQSX_1'
    - mq信息存储在sessionStorage中的mq_msg字段中, sessionStorage['mq_msg']