(function (global) {
    var app = global.app = global.app || {};

    coa_settingViewModel = kendo.data.ObservableObject.extend({
        imageClick: "",
        imageSrc_cover: "",
        imageSrc_user: "",
        newImage: "",
        to_userName: "",
        fontSize: 16,
        fontSize_demo: "16px",
        fontSize_time: "",
        selectFont: function () {
            var that = app.coa_settingService.viewModel;
            var index = this.current().index();
            var fontSize;

            if (index == 0) fontSize = 14;
            if (index == 1) fontSize = 16;
            if (index == 2) fontSize = 18;
            that.set("fontSize", fontSize);
            that.set("fontSize_demo", fontSize + "px");
        },
        selectMax: 100,
        loadData: function () {
            var times = (new Date()).getTime();
            this.set("to_userName", localStorage.getItem("USERNAME"));
            this.set("imageSrc_cover", localStorage.getItem("PROFILE_COVER") + "?" + times);
            this.set("imageSrc_user", localStorage.getItem("PROFILE_IMG") + "?" + times);
            localStorage.setItem("PROFILE_COVER", localStorage.getItem("PROFILE_COVER") + "?" + times);
            localStorage.setItem("PROFILE_IMG", localStorage.getItem("PROFILE_IMG") + "?" + times);
            console.log(this.imageSrc_cover);
            console.log(this.imageSrc_user);
        },
        onSuccess: function (imageURI) {
            console.log('==================onSuccess');
            var that = app.coa_settingService.viewModel;
            var options = new FileUploadOptions();
            var imageSize = localStorage.getItem("imageSize");
            var imageSize_new = 0;

            
            window.resolveLocalFileSystemURI(imageURI, function (fileEntry) {
                fileEntry.file(function (fileObj) {
                    imageSize_new = fileObj.size;
                    console.log('imageSize_new :: ' + imageSize_new + ':: imageSize :: ' + imageSize + ':: imageSize_new / 1024::' + imageSize_new / 1024);
                    
                               console.log('IMAGE_FILE_TYPE ::::::: ' + localStorage.getItem("imageType"));
                    if (imageSize_new / 1024 > imageSize) {
                        app.application.hideLoading();
                        app.coa_boxService.viewModel.setWarning(1, 'Maximum file size must be less than ' + imageSize + ' KB.');
                        return false;
                    }
                    
                    

                        that.newImage = imageURI;

                        options.fileKey = "file";
                        if (that.imageClick == "PHOTO") {
                            options.fileName = localStorage.getItem("USER_ID") + '.png';
                        } else {
                            options.fileName = localStorage.getItem("USER_ID") + '_cover.png';
                        }
                        options.mimeType = "image/jpeg";
                        options.httpMethod = "POST";
                        
                               
                        var ft = new FileTransfer();
                        ft.upload(imageURI, encodeURI(app.configService.fileServiceUrl + "api/FileUpload"), that.win, that.fail, options, true);
                   
                }, function () {
                    app.application.hideLoading();
                    app.coa_boxService.viewModel.setWarning(1, 'File type is invalid.');
                });
            });
            
        },
        onFail: function (message) {
            app.application.hideLoading();
            if (message != "Selection cancelled." && message != "null data from photo library" && message != "no image selected") {
                alert(message);
            }
        },
        onChooseLibrary: function (e) {
            console.log('===================onChooseLibrary');
            var that = app.coa_settingService.viewModel;
            var img = e.context;
            that.set('imageClick', img);
            //alert('Choose ' + img + ' from Library');
            app.application.showLoading();
            navigator.camera.getPicture(that.onSuccess, that.onFail, {
                quality: 10,
                //targetWidth: 100,
                //targetHeight: 100,
                correctOrientation: false,
                destinationType: navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            });
        },

        uploadPhoto: function (imageURI) {

        },

        win: function (r) {
            var that = app.coa_settingService.viewModel;
            console.log("=========================win");
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            app.application.hideLoading();
            app.coa_boxService.viewModel.setComplete('Success');

            if (that.imageClick == "PHOTO") {
                //var newN = that.newImage;
                var newN = app.configService.defaultImage_url + localStorage.getItem("USER_ID") + '.png?' + (new Date()).getTime();
                that.set("imageSrc_user", newN);
                localStorage.setItem("PROFILE_IMG", newN);
                console.log('newN: ' + newN);
            } else {
                //var newN = that.newImage;
                var newN = app.configService.defaultImage_url + localStorage.getItem("USER_ID") + '_cover.png?' + (new Date()).getTime();
                that.set("imageSrc_cover", newN);
                localStorage.setItem("PROFILE_COVER", newN);
                console.log('newN: ' + newN);
            }
        },

        fail: function (error) {
            app.application.hideLoading();
            //if (error.code == 1) {
            //    app.coa_boxService.viewModel.setWarning(1, 'Can not upload.');
            //} else {
            //    app.coa_boxService.viewModel.setWarning(1, error.code);
            //}
            app.coa_boxService.viewModel.setWarning(1, error.code);
        },
        onDelete: function (e) {
            app.application.showLoading();
            var that = app.coa_settingService.viewModel;
            var pType = "";
            if (e.context == "PHOTO") {
                pType = "IMAGE";
            } else {
                pType = "COVER";
            }
            //call service setDefault_image
            var dataValue = {
                "DELETE_TYPE": pType,
                "TOKEN": localStorage.getItem("TOKEN"),
                "USER_ID": localStorage.getItem("USER_ID"),
                "VERSION": localStorage.getItem("VERSION")
            };
            $.ajax({
                beforeSend: app.loginService.viewModel.checkOnline,
                url: app.configService.serviceUrl + "api/SetDefaultImage",
                type: "POST",
                data: JSON.stringify(dataValue),
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                success: function (response) {
                    app.application.hideLoading();
                    if (response.RESPONSE_CODE == "0000") {
                        if (e.context == "PHOTO") {
                            var url = app.configService.defaultImage_url +  'user_image.png';
                            that.set("imageSrc_user", url);
                            localStorage.setItem("PROFILE_IMG", url);
                        } else {
                            var url = app.configService.defaultImage_url + 'cover_image.png';
                            that.set("imageSrc_cover", url);
                            localStorage.setItem("PROFILE_COVER", url);
                        }
                        app.coa_boxService.viewModel.setComplete('success');
                    
                    } else {
                        app.coa_boxService.viewModel.setWarning(1, response.RESPONSE_MSG);
                    }
                },
                error: function (xhr, error) {
                    app.application.hideLoading();
                    console.log(error + ' :code[' + xhr.status + '] ' + xhr.statusText + ' :: ' + xhr.responseText);
                    app.coa_boxService.viewModel.setWarning(xhr.status, xhr.responseText);
                }
            });
            
            
        }
        //----------------------------------------- end viewModel -----------------------------------------

    });

    app.coa_settingService = {
        init: function () {

        },
        show: function () {
            app.coa_settingService.viewModel.set("fontSize_demo", 16 + "px");
            app.coa_settingService.viewModel.loadData();
        },
        hide: function () {

        },
        viewModel: new coa_settingViewModel()
    }


})(window);