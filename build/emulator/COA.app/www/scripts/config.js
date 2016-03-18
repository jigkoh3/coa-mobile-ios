(function (global) {
 app = global.app = global.app || {};
 
 app.configService = {
     
 //defaultImage_url: 'https://test-cpe.ais.co.th/coa/usr/user_image/', //@AIS
 //imageUrl: 'https://test-cpe.ais.co.th/coa', //@AIS
 //serviceUrl: 'https://test-cpe.ais.co.th/coa/', //@AIS
 //fileServiceUrl: 'https://test-cpe.ais.co.th/coa/', //@AIS

     defaultImage_url: 'https://cpe.ais.co.th/coa/usr/', //@AIS
     imageUrl: 'https://cpe.ais.co.th/coa', //@AIS
     serviceUrl: 'https://cpe.ais.co.th/coa/', //@AIS
     fileServiceUrl: 'https://cpe.ais.co.th/coa/', //@AIS

     //serviceUrl: '',
     pageSize: 20,
     
    //fingerprint: 'E5 32 A9 68 C6 E2 51 54 3B 6A E9 5D 1C 34 22 8D 51 DD 56 B3',//TTSDEV
	version: "1.0"
 };
 })(window);