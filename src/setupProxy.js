import proxy from 'http-proxy-middleware';

export default function(app){
    app.use(proxy('/api/', 
    { 
        target : 'https://apiv3-test.ghn.vn',
        secure : false,
        changeOrigin: true
    }
    ))
}