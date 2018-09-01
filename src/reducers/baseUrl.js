const basicUrl = {
  server: 'https://api.youthol.cn/api',
  localhost: 'http://localhost:5000/api',
  test: 'http://localhost/youthAPI/public/api'
};

export default (state = basicUrl.server) => state;
