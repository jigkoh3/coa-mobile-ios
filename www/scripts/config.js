(function (global) {
    app = global.app = global.app || {};

    app.configService = {

        //defaultImage_url: 'https://dev-cpe.ais.co.th/coa/usr/user_image/', //@AIS
        //imageUrl: 'https://dev-cpe.ais.co.th/coa', //@AIS
        //serviceUrl: 'https://dev-cpe.ais.co.th/coa/', //@AIS
        //fileServiceUrl: 'https://cpe.ais.co.th/coa/', //@AIS

/*
        defaultImage_url: 'https://test-cpe.ais.co.th/coa/usr/', //@AIS
        imageUrl: 'https://test-cpe.ais.co.th/coa', //@AIS
        serviceUrl: 'https://test-cpe.ais.co.th/coa/', //@AIS
        fileServiceUrl: 'https://test-cpe.ais.co.th/coa/', //@AIS
        authenUrl: 'http://test-cpe.ais.co.th/coa/', //@AIS
*/

      defaultImage_url: 'https://staging-cpe.ais.co.th/coa/usr/', //@AIS
      imageUrl: 'https://staging-cpe.ais.co.th/coa', //@AIS
      serviceUrl: 'https://staging-cpe.ais.co.th/coa/', //@AIS
      fileServiceUrl: 'https://staging-cpe.ais.co.th/coa/', //@AIS
      authenUrl: 'http://staging-cpe.ais.co.th/coa/', //@AIS

/*
        defaultImage_url: 'https://cpe.ais.co.th/coa/usr/user_image/', //@AIS
        imageUrl: 'https://cpe.ais.co.th/coa', //@AIS
        serviceUrl: 'https://cpe.ais.co.th/coa/', //@AIS
        fileServiceUrl: 'https://cpe.ais.co.th/coa/', //@AIS
        authenUrl: 'http://cpe.ais.co.th/coa/', //@AIS
 */

 //fingerprint: '8C 9C E8 E3 E6 55 5E 09 3F 2B 92 37 25 AE A6 2D 17 77 C2 1F',//dev
 //fingerprint: '8C 9C E8 E3 E6 55 5E 09 3F 2B 92 37 25 AE A6 2D 17 77 C2 1F', //test
 fingerprint: '8C 9C E8 E3 E6 55 5E 09 3F 2B 92 37 25 AE A6 2D 17 77 C2 1F', //staging
 //fingerprint: '8C 9C E8 E3 E6 55 5E 09 3F 2B 92 37 25 AE A6 2D 17 77 C2 1F', //production
 
        pageSize: 20,


        version: "3.1"
 
    };
})(window);


function callbackMessage(message) {
    console.log('callbackMessage :: ' + message)
    //alert(message);

}
