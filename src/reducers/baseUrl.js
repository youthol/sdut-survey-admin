const basicUrl = {
  server: 'https://api.youthol.cn',
  localhost: 'http://localhost/youthAPI/public/api',
  test: 'http://192.168.1.104/youthAPI/public/api'
};

export default (state = basicUrl.localhost) => state;
