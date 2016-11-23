/**
 * Created by zhangshuwen on 16/8/30.
 */
var BSRequest = function () {

    _sendType = "POST";//数据请求提交方式  GET   POST
    _req = new XMLHttpRequest();
    _sendData = "";
    this.addData = function (key, value) {
        //存储提交的数据
        if (_sendData == "") {
            _sendData += "" + key + "=" + value;
        } else {
            _sendData += "&" + key + "=" + value;
        }
    };
    this.sendHttp = function (address, callFun, errorFun, showloading) {
        //签名
        _sendData += "&signature=" + createSignature(_sendData);

        //显示loading
        if (typeof showloading == 'boolean' && showloading == true || showloading == undefined) {
            $.showIndicator();
        }

        //发送的链接
        var sendURL = SinaSDKTool.sendAddress + address;
        if(address.indexOf("http") != -1){
            sendURL = address;
        }
        if(_sendType == "GET"){
            sendURL = sendURL + "?" + _sendData;
        }

        //HTTP请求主体
        _req.open(_sendType, sendURL, true);
        _req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (typeof callFun == 'function') {
            _req.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    callFun.call(this);
                    if (typeof showloading == 'boolean' && showloading == true || showloading == undefined) {
                        $.hideIndicator();
                    }
                }
            };
        }
        if (typeof errorFun == 'function') {
            _req.onerror = function () {
                errorFun.call(this);

                if (typeof showloading == 'boolean' && showloading == true || showloading == undefined) {
                    $.hideIndicator();
                }
            };
        }

        //发送链接
        if(_sendType == "POST"){
            _req.send(_sendData);
        }else{
            _req.send();
        }
    };
    this.sendHttpWithGet = function (address, callFun, errorFun, showloading) {
        _sendType = "GET";
        this.sendHttp(address, callFun, errorFun, showloading);
    };
    /* 签名验证 */
    createSignature = function (signatureData) {
        var str_B = "2268486964" + GetGameKey();
        var str_C = Encryption.md5(str_B);
        var list_A = signatureData.split("&");

        list_A.sort(function (s1, s2) {
            var s1Chars = null;
            var s2Chars = null;
            var maxLenght = Math.max(s1.length, s2.length);
            for (var i = 0; i < maxLenght; i++) {
                if (i >= s1.length) {
                    return 1;
                }
                else if (i >= s2.length) {
                    return -1;
                } else {
                    var s1Char = s1.charAt(i);
                    var s2Char = s2.charAt(i);
                    if (s1Char < s2Char) {
                        return -1;
                    } else if (s1Char > s2Char) {
                        return 1;
                    }
                }
            }

            return 0;
        });

        var str_A = "";

        for (var i = 0; i < list_A.length; i++) {
            if (i == list_A.length - 1) {
                str_A += list_A[i];
            } else {
                str_A += list_A[i] + "&";
            }
        }

        var str_D = str_A + "|" + str_C;
        var str_E = Encryption.md5(str_D);

        return str_E;

    };

    /* 得到秘钥 */
    GetGameKey = function () {
        if (SinaSDKTool.data.platform == "a") {
            return "F752162D-8667-27E8-E9F1-37B09C2AC0D8";
        } else {
            return "A649E627-97D7-1382-FBFE-FD257EC0BE95";
        }
    };
};