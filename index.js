
const Stomp =require('stompjs') 
function initMq(obj = {}) {
  let MQTT_CONFIG = sessionStorage['MQTT_CONFIG']
  if (MQTT_CONFIG) {
    MQTT_CONFIG = JSON.parse(MQTT_CONFIG)
  }
  const { MQTT_SERVICE_, MQTT_LOGIN_, MQTT_PASSCODE_, MQTT_ROUTEINGKEY_ } = MQTT_CONFIG
  const { MQTT_LOGIN, MQTT_PASSCODE, MQTT_ROUTEINGKEY, MQTT_SERVICE } = obj
  const Client = Stomp.Client(MQTT_SERVICE || MQTT_SERVICE_)
  const onConnected = (frame) => {
    console.log('onConnected-注意mq消息存在 sessionStorage[mq_msg]中的,消费者需要去sessionStorage去取')
    // 订阅频道
    const topic = MQTT_ROUTEINGKEY || MQTT_ROUTEINGKEY_// '/topic/' + routingKey// '/queue/huansi.web.rollcall.*'
    Client.subscribe(topic, responseCallback, onFailed)
  }
  const onFailed = (err) => {
    console.error('onFailed-请注意routing-key的格式,要使用topic交换机: /topic/huansi.web.rollcall.*')
    console.log('----mq-error-------', err)
  }
  const responseCallback = (frame) => {
    sessionStorage.mq_msg = JSON.stringify(frame.body)
  }
  const headers = {
    login: MQTT_LOGIN || MQTT_LOGIN_,
    passcode: MQTT_PASSCODE || MQTT_PASSCODE_
  }
  Client.connect(headers, onConnected, onFailed)
}
function initConfig(obj) {
  console.log('initConfig:routing-key的格式,要使用topic交换机: 例如/topic/huansi.web.rollcall.*')
  sessionStorage['MQTT_CONFIG'] = JSON.stringify(obj)
}
const mq = {
  connect: initMq,
  initConfig: initConfig
}
export default  mq
