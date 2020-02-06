window.COM_TIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
window.COM_TIMEFORMAT2 = 'YYYY-MM-DDTHH:mm:ss';
window.COM_TIMEFORMAT3 = 'DD/MM/YYYY HH:mm:ss';

const API_DOMIAN1 = "https://api.m2mglobaltech.com/QuikTrak/V1/";
const API_DOMIAN2 = "https://api.m2mglobaltech.com/Quikloc8/V1/";
const API_DOMIAN3 = "https://api.m2mglobaltech.com/QuikProtect/V1/Client/";


const API_DOMIAN6 = "https://nomad.sinopacific.com.ua/";
const API_DOMIAN7 = "https://nominatim.sinopacific.com.ua/";
const API_DOMIAN8 = "https://nominatim.openstreetmap.org/";
const API_DOMIAN9 = "https://upload.quiktrak.co/";


//let API_DOMIAN1 = "https://api.m2mglobaltech.com/QuikProtect/V1/Client/";
//let API_DOMIAN2 = "https://api.m2mglobaltech.com/QuikTrak/V1/";
//let API_DOMIAN3 = "https://quiktrak.co/webapp/QuikProtect/Api2/";
//let API_DOMIAN4 = "https://api.m2mglobaltech.com/Quikloc8/V1/";
//let API_DOMIAN5 = "https://api.m2mglobaltech.com/Common/V1/Activation/";
//let API_DOMIAN6 = "https://nomad.sinopacific.com.ua/";
const API_URL = {};

API_URL.LOGIN = API_DOMIAN2 + "user/Auth2";
API_URL.LOGOUT = API_DOMIAN3 + "Logoff";
API_URL.GET_ALL_POSITIONS = API_DOMIAN1 + "Device/GetPosInfos2";
API_URL.PHOTO_UPLOAD = API_DOMIAN9 + "image/Upload";
API_URL.EDIT_DEVICE = API_DOMIAN1 + "Device/Edit";

API_URL.SET_ALARM_LOC8 = API_DOMIAN2 + "asset/AlarmOptions";
API_URL.SET_ALARM_PROTECT = API_DOMIAN3 + "AlarmOptions2";
API_URL.GET_ALERT_CONFIG = API_DOMIAN1 + "Device/GetAlertConfigure";
API_URL.SET_ALERT_CONFIG = API_DOMIAN1 + "Device/AlertConfigureEdit";

API_URL.GET_GEOFENCE_LIST = API_DOMIAN1 + "Device/GetFenceList";
API_URL.GEOFENCE_ADD = API_DOMIAN1 + "Device/FenceAdd";
API_URL.GEOFENCE_EDIT = API_DOMIAN1 + "Device/FenceEdit";
API_URL.GEOFENCE_DELETE = API_DOMIAN1 + "Device/FenceDelete";

API_URL.URL_ROUTE = "https://www.google.com/maps/dir/?api=1&destination={0},{1}";
API_URL.URL_ROUTE_IOS = "maps://maps.apple.com/maps?daddr={0},{1}";
API_URL.URL_SUPPORT = "https://support.quiktrak.eu/";
API_URL.URL_REPORT_THEFT = "https://forms.quiktrak.com.au/report-theft/";
API_URL.URL_UPGRADE = "https://app.quikprotect.co/activation2/";

API_URL.GET_BALANCE = API_DOMIAN3 + "Balance";
API_URL.EDIT_ACCOUNT = API_DOMIAN3 + "AccountEdit";
API_URL.RESET_PASSWORD = API_DOMIAN1 + "User/Password";

API_URL.GET_CONTACT_USERS_LIST = API_DOMIAN1 + "User/GetList";
API_URL.CONTACT_USER_ADD = API_DOMIAN1 + "User/Add";
API_URL.CONTACT_USER_EDIT = API_DOMIAN1 + "User/Edit";
API_URL.CONTACT_USER_DELETE = API_DOMIAN1 + "User/Delete";

API_URL.GET_PLAYBACK_ARR = API_DOMIAN1 + "Device/GetHisPosArray2";
API_URL.GET_PLAYBACK_ARR_OPTIMISED = "https://osrm.sinopacific.com.ua/playback/v2";
API_URL.GET_ADDRESSES_FROM_ARRAY = "https://ss.sinopacific.com.ua/geocode/reverse/v1/";
API_URL.GET_PLAYBACK_REPORT_ON_MAIL = API_DOMIAN6 + "api/v2/reports/Playback";

API_URL.GET_REPORT_TRIP = API_DOMIAN1 + "Report/GetTripReport";

//let VirtualAssetListMain = false;
let UpdateAssetsPosInfoTimer = false;
let UpdateNotificationsTimer = false;
let POSINFOASSETLIST = {};
let StreetViewService = false;


// Create another event bus
const AssetUpdateEvents = new Framework7.Events();
const LoginEvents = new Framework7.Events();

// Dom7
const $$ = Dom7;

let htmlTemplate = $$('script#loginScreenTemplate').html();
let compiledTemplate = Template7.compile(htmlTemplate);
$$('#app').append(compiledTemplate());

// Init App
const app = new Framework7({
    id: 'com.sinopacific.quiktrak',
    name: 'QuikTrak',
    root: '#app',
    theme: Framework7.device.ios ? 'ios' : 'md',
    view: {
        //stackPages: true,
    },
    input: {
        scrollIntoViewOnFocus: true,
        scrollIntoViewCentered: true,
    },
    notification:{
        //title: self.name,
        icon: '<img src="resources/images/favicon.png" class="icon-notification" alt="" />',
        closeTimeout: 3000,
    },
    data: function () {
        let maxPopupWidth = 280;
        if (this.device.desktop) {
            maxPopupWidth = 300;
        }
        return {
            logo: 'resources/images/logo.svg',
            logoBlack: 'resources/images/logo-black.svg',
            logoModal: 'resources/images/logo-black.svg',
            MaxMapPopupWidth: maxPopupWidth,
            PolygonCustomization: {
                color: '#AA5959',
                fillColor: '#FF0000',
                fillOpacity: 0.25,
            },
            PolylineCustomization: {
                mainBg: {
                    //color: '#f44336',
                    color: '#039ac5',
                    weight: 6,
                    opacity: 1,
                },
                main: {
                    //color: '#f96868',
                    color: '#00b9ee',
                    weight: 3,
                    opacity: 1,
                },
                droppedBg: {
                    //color: '#b50000',     //red
                    color: '#b47605',   //orange
                    weight: 6,
                    opacity: 0.7,
                },
                dropped: {
                    //color: '#fc0405',
                    color: '#fd9a08',   //orange
                    weight: 3,
                    opacity: 0.7,
                },
                boundariesBg: {
                    color: '#6199CC',
                    weight: 6,
                    opacity: 0.4,
                },
                boundaries: {
                    color: '#00B1FC',
                    weight: 3,
                    opacity: 0.4,
                },
            },
            AppDetails: {
                name: 'QuikTrak-app',
                code: 23,
                supportCode: 3,
                appId: '',
                appleId: '1079168431',
            },
            UTCOFFSET: moment().utcOffset(),
            AccountSolutionArray: [],
            CustomerType: '',
        };
    },
    on: {
        routerAjaxStart: function () {
            this.progressbar.show('custom');
        },
        routerAjaxComplete: function () {
            this.progressbar.hide();
        },
        connection: function(isOnline){
            let self = this;
            if (isOnline) {
                self.notification.create({
                    title: self.name, // 'Connection established',
                    //subtitle: 'Connection established',
                    text: 'Connection established',
                    closeOnClick: true,
                }).open();
            } else {
                self.notification.create({
                    title: self.name,// 'Lost connection',
                    text: 'Lost connection',
                    closeOnClick: true,
                }).open();
            }
        },
        init: function () {
            let self = this;

            if(window.hasOwnProperty("cordova")){
                if (BuildInfo){
                    self.data.AppDetails.appId = BuildInfo.packageName;
                }
                //fix app images and text size
                if (window.MobileAccessibility) {
                    window.MobileAccessibility.usePreferredTextZoom(false);
                }
                if (StatusBar) {
                    StatusBar.styleDefault();
                }
                document.addEventListener("backbutton", self.methods.backFix, false);
                //document.addEventListener("resume", onAppResume, false);
                //document.addEventListener("pause", onAppPause, false);
            }

            if(localStorage.ACCOUNT && localStorage.PASSWORD) {
                self.methods.login();
            }
            else {
                self.methods.logout();
            }
        }
    },
    methods: {
        capitalize: function(s) {
            if (typeof s !== 'string') return '';
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        isJsonString: function(str){
            try{let ret=JSON.parse(str);}catch(e){return false;}return ret;
        },
        findObjectByKey: function(array, key, value) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][key] == value) {
                    return array[i];
                }
            }
            return null;
        },
        reverseArry: function(arry){
            let newArry = [];
            let i = null;
            for (i = arry.length - 1; i >= 0; i -= 1)
            {
                newArry.push(arry[i]);
            }
            return newArry;
        },
        isObjEmpty: function(obj) {
            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)    return false;
            if (obj.length === 0)  return true;

            // If it isn't an object at this point
            // it is empty, but it can't be anything *but* empty
            // Is it empty?  Depends on your application.
            if (typeof obj !== "object") return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (let key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        },
        convertTimZoneValToZZformat: function(val){
            let ret = '';
            val >= 0 ? ret='+' : ret='-';
            if (val < 10 && val >= 0 ||
                val < 0 && val > -10){
                ret+='0';
            }

            val = Math.abs(val);
            if(Number.isInteger(val)){
                ret += val;
            }else{
                ret += parseInt(val);
                ret += parseInt(val.toString().split('.')[1]) / 100 * 60;
            }
            ret = ret.padEnd(5,'0');

            return ret;
        },
        findTimeZoneNameByOffset: function(offset){
            let ret = '';
            let index = moment.tz.names().findIndex(timezoneName => moment.tz(timezoneName).format('ZZ') === offset);
            if (index !== -1){
                ret = moment.tz.names()[index];
            }
            return ret;
        },
        hideKeyboard: function() {
            document.activeElement.blur();
            $$("input").blur();
        },
        clearUserInfo: function(){
            let self = this;

            let deviceToken = localStorage.PUSH_DEVICE_TOKEN;
            let mobileToken = localStorage.PUSH_MOBILE_TOKEN;
            let notifications = self.methods.getFromStorage('notifications');
            let mapSettings = self.methods.getFromStorage('mapSettings');

            localStorage.clear();
            POSINFOASSETLIST = {};

            if (notifications) {
                localStorage.setItem("COM.QUIKTRAK.NEW.NOTIFICATIONS", JSON.stringify(notifications));
            }
            if (mapSettings) {
                self.methods.setInStorage({ name: 'mapSettings', data: mapSettings });
            }
            if (deviceToken) {
                localStorage.PUSH_DEVICE_TOKEN = deviceToken;
            }
            if (mobileToken) {
                localStorage.PUSH_MOBILE_TOKEN = mobileToken;
            }

            if (UpdateAssetsPosInfoTimer) {
                clearInterval(UpdateAssetsPosInfoTimer);
            }
            if (UpdateNotificationsTimer) {
                clearInterval(UpdateNotificationsTimer);
            }

            let data = {
                MinorToken: self.data.MinorToken,
                deviceToken: deviceToken,
                mobileToken: mobileToken,
            };
            self.request.promise.get(API_URL.LOGOUT, data, 'json')
                .then(function (result) {
                    console.log(result);
                });

            self.utils.nextTick(()=>{
                LoginEvents.emit('signedOut');
                mainView.router.back('/',{force: true});
            }, 1000);

        },
        logout: function(){
            let self = this;
            if (localStorage.ACCOUNT) {
                $$("input[name='username']").val(localStorage.ACCOUNT);
            }


            self.methods.clearUserInfo();
            self.loginScreen.open('.login-screen');

        },
        login: function(form){
            let self = this;
            //self.methods.getPlusInfo();

            let account = $$("input[name='username']");
            let password = $$("input[name='password']");

            let data = {
                //username: account.val() ? account.val() : localStorage.ACCOUNT,
                //password: password.val() ? password.val() : localStorage.PASSWORD,
                account: account.val() ? account.val() : localStorage.ACCOUNT,
                password: password.val() ? password.val() : localStorage.PASSWORD,

                /*appKey: localStorage.PUSH_APP_KEY,
                mobileToken: localStorage.PUSH_MOBILE_TOKEN,
                deviceToken: localStorage.PUSH_DEVICE_TOKEN,
                deviceType: localStorage.DEVICE_TYPE,*/
            };

            self.dialog.progress();
            self.request.promise.get(API_URL.LOGIN, data, 'json')
                .then(function (result) {
                    if(result.data && result.data.MajorCode === '000') {
                        if(account.val()) {
                            localStorage.ACCOUNT = account.val().trim().toLowerCase();
                            localStorage.PASSWORD = password.val();
                        }
                        password.val(null);

                        self.methods.setInStorage({
                            name: 'userInfo',
                            data: result.data.Data.UserInfo
                        });

                        self.data.MinorToken = result.data.Data.MinorToken;
                        self.data.MajorToken = result.data.Data.MajorToken;

                        self.methods.setInStorage({name:'contactList', data:result.data.Data.ContactList });
                        self.methods.setInStorage({name:'solutions', data:result.data.Data.Solutions });
                        self.methods.setInStorage({name:'assetTypes', data:result.data.Data.AssetTypes });
                        let assetListObj = self.methods.setAssetList({list: result.data.Data.AssetArray});

                        self.methods.setAccountSolutions(assetListObj);


                        self.data.NewImageTimestamp = new Date().getTime();

                        UpdateAssetsPosInfoTimer = setInterval(function(){
                            self.methods.getAssetListPosInfo(assetListObj, 1);  // '1' - means update
                        }, 30*1000);

                        self.utils.nextFrame(()=>{
                            self.methods.getAssetListPosInfo(assetListObj);
                            self.loginScreen.close();
                        });

                    }else {
                        self.utils.nextFrame(()=>{
                            self.dialog.close();
                            self.dialog.alert(LANGUAGE.PROMPT_MSG001);
                            self.loginScreen.open('.login-screen');
                        });
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    self.dialog.close();
                    self.loginScreen.open('.login-screen');
                    if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }
                });
        },
        getAssetListPosInfo: function(listObj, update= false, callback = false){
            let self = this;
            //console.log(self)
            let codes = '';
            let keys = Object.keys(listObj);
            let assetList = [];
            for (const key of keys) {
                codes += listObj[key].Id+',';
                assetList.push(listObj[key]);
            }
            if (codes) {
                codes = codes.slice(0, -1);
            }


            let url = self.utils.serializeObject({MinorToken: self.data.MinorToken, MajorToken: self.data.MajorToken});

            url = API_URL.GET_ALL_POSITIONS + '?' + url;

            let data = {
                codes: codes,
            };
            self.request.promise.post(url, data, 'json')
                .then(function (result) {
                    if(result.data.MajorCode === '000') {
                        if (!self.methods.isObjEmpty(result.data.Data)) {
                            let posData = '';
                            let imei = '';
                            let protocolClass = '';
                            let deviceInfo = '';

                            if (!update) {
                                for (let i = result.data.Data.length - 1; i >= 0; i--) {
                                    posData = result.data.Data[i];
                                    imei = posData[1];
                                    protocolClass = posData[2];
                                    deviceInfo = listObj[imei];

                                    if (!self.methods.isObjEmpty(deviceInfo) && deviceInfo.IMEI === imei){
                                        POSINFOASSETLIST[imei] = Protocol.ClassManager.get(protocolClass, deviceInfo);
                                        POSINFOASSETLIST[imei].initPosInfo(posData);
                                    }
                                }

                                assetList = self.methods.sortAssetList(assetList, 'state', 'asc');

                                //VirtualAssetListMain.replaceAllItems(sortedList);
                            }else{
                                for (let i = result.data.Data.length - 1; i >= 0; i--) {
                                    posData = result.data.Data[i];
                                    imei = posData[1];

                                    if (!self.methods.isObjEmpty(POSINFOASSETLIST[imei]) && !POSINFOASSETLIST[imei].posInfo.positionTime || !self.methods.isObjEmpty(POSINFOASSETLIST[imei]) && posData[5] >= POSINFOASSETLIST[imei].posInfo.positionTime._i ) {
                                        POSINFOASSETLIST[imei].initPosInfo(posData);
                                    }
                                }
                                AssetUpdateEvents.emit('updateReceived');
                            }
                        }
                    }
                    if (!update) {
                        self.dialog.close();
                        LoginEvents.emit('signedIn', assetList);
                    }
                    if (callback instanceof Function) {
                        callback();
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    /*if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }*/
                });
        },
        getGeofenceList: function(callback){
            let self = this;
            self.request.promise.post(API_URL.GET_GEOFENCE_LIST, {MajorToken: self.data.MajorToken, MinorToken: self.data.MinorToken}, 'json')
                .then(function (result) {
                    if(result.data.MajorCode === '000' ) {
                        self.methods.setInStorage({name: 'geofenceList', data: result.data.Data});
                        if (callback instanceof Function){
                            callback(result.data.Data);
                        }
                    }else{
                        self.$app.dialog.alert(LANGUAGE.PROMPT_MSG023 + `<br>MajorCode: ${result.data.MajorCode}<br>MinorCode: ${result.data.MinorCode}<br>${result.data.Data}`);
                        if (callback instanceof Function){
                            callback({});
                        }
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    if (callback instanceof Function){
                        callback({});
                    }
                    if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }
                });
        },
        getFromStorage: function(name){
            let ret = [];
            let str = '';
            if (name) {
                switch (name){
                    case 'userInfo':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.USERINFO");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'assetList':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.ASSETLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'geofenceList':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.GEOFENCELIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }else{
                            ret = {};
                        }
                        break;

                    case 'mapSettings':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.MAPSETTINGS");
                        if(str) {
                            ret = JSON.parse(str);
                        }else{
                            ret = {};
                        }
                        break;

                    case 'contactList':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.CONTACTLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'notifications':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.NOTIFICATIONS");
                        if(str) {
                            ret = JSON.parse(str);
                        }else{
                            ret = {};
                        }
                        break;
                    case 'solutions':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.SOLUTIONS");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'assetTypes':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.ASSETTYPES");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;
                    case 'historyArray':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.HISTORYARRAY");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'historyEvents':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.EVENTSARRAY");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                   /* case 'groupList':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.GROUPLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'usersList':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.USERSLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;






                    case 'intervalRemindersList':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.INTERVALREMINDERS");
                        if(str) {
                            ret = JSON.parse(str);
                        }else{
                            ret = {};
                        }
                        break;





                    case 'reportData':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.REPORTDATA");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'dashboard':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.DASHBOARD");
                        if(str) {
                            ret = JSON.parse(str);
                        }else{
                            ret = {};
                        }
                        break;



                    case 'alertList':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.ALERTLIST");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    case 'scheduledReportList':
                        str = localStorage.getItem("COM.QUIKTRAK.NEW.SCHEDULEDREPORTS");
                        if(str) {
                            ret = JSON.parse(str);
                        }
                        break;

                    */


                    default:
                        self.dialog.alert('There is no item saved with such name - '+name);
                }
            }else{
                self.dialog.alert('Wrong query parameters!');
                console.log(name);
            }
            return ret;
        },
        setInStorage: function(params){
            let self = this;
            if (typeof(params) == 'object' && params.name && params.data) {
                switch (params.name){
                    case 'userInfo':
                        localStorage.setItem("COM.QUIKTRAK.NEW.USERINFO", JSON.stringify(params.data));
                        break;

                    case 'geofenceList':
                        localStorage.setItem("COM.QUIKTRAK.NEW.GEOFENCELIST", JSON.stringify(params.data));
                        break;

                    case 'mapSettings':
                        localStorage.setItem("COM.QUIKTRAK.NEW.MAPSETTINGS", JSON.stringify(params.data));
                        break;

                    case 'contactList':
                        localStorage.setItem("COM.QUIKTRAK.NEW.CONTACTLIST", JSON.stringify(params.data));
                        break;

                    case 'assetTypes':
                        localStorage.setItem("COM.QUIKTRAK.NEW.ASSETTYPES", JSON.stringify(params.data));
                        break;
                    case 'solutions':
                        localStorage.setItem("COM.QUIKTRAK.NEW.SOLUTIONS", JSON.stringify(params.data));
                        break;
                    case 'historyArray':
                        let HistoryArray = self.methods.parsePlaybackHystoryArr(params.data);

                        localStorage.setItem("COM.QUIKTRAK.NEW.HISTORYARRAY", JSON.stringify(HistoryArray));
                        break;

                    case 'historyEvents':
                        let EventsArray = self.methods.parsePlaybackEventsArr(params.data);

                        localStorage.setItem("COM.QUIKTRAK.NEW.EVENTSARRAY", JSON.stringify(EventsArray));
                        break;

                    /*case 'groupList':
                        localStorage.setItem("COM.QUIKTRAK.NEW.GROUPLIST", JSON.stringify(params.data));
                        break;



                    case 'usersList':
                        localStorage.setItem("COM.QUIKTRAK.NEW.USERSLIST", JSON.stringify(params.data));
                        break;



                    case 'intervalRemindersList':
                        localStorage.setItem("COM.QUIKTRAK.NEW.INTERVALREMINDERS", JSON.stringify(params.data));
                        break;




                    case 'reportData':
                        localStorage.setItem("COM.QUIKTRAK.NEW.REPORTDATA", JSON.stringify(params.data));
                        break;

                    case 'dashboard':
                        localStorage.setItem("COM.QUIKTRAK.NEW.DASHBOARD", JSON.stringify(params.data));
                        break;

                    case 'solutions':
                        localStorage.setItem("COM.QUIKTRAK.NEW.SOLUTIONS", JSON.stringify(params.data));
                        break;

                    case 'alertList':
                        localStorage.setItem("COM.QUIKTRAK.NEW.ALERTLIST", JSON.stringify(params.data));
                        break;

                    case 'scheduledReportList':
                        localStorage.setItem("COM.QUIKTRAK.NEW.SCHEDULEDREPORTS", JSON.stringify(params.data));
                        break;

                   */


                    default:
                        self.dialog.alert('There is no function associated with this name - '+params.name);
                }
            }else{
                self.dialog.alert('Wrong query parameters!');
                console.log(params);
            }
        },
        setAssetList: function(params={}){
            let self = this;
            let ret = '';

            if (params.list && params.list.length) {
                let ary = {};
                for(let i = 0; i < params.list.length; i++) {
                    let index = 0;
                    ary[params.list[i][1]] = {
                        Id: params.list[i][index++],
                        IMEI: params.list[i][index++],
                        Name: params.list[i][index++],
                        TagName: params.list[i][index++],
                        Icon: params.list[i][index++],
                        Unit: params.list[i][index++],
                        InitMileage: params.list[i][index++],
                        InitAcconHours: params.list[i][index++],
                        State: params.list[i][index++],
                        ActivateDate: params.list[i][index++],
                        PayPlanName: params.list[i][index++],
                        PRDTName: params.list[i][index++],
                        PRDTFeatures: params.list[i][index++],
                        PRDTAlerts: params.list[i][index++],
                        Describe1: params.list[i][index++],
                        Describe2: params.list[i][index++],
                        Describe3: params.list[i][index++],
                        Describe4: params.list[i][index++],
                        Describe5: params.list[i][index++],
                        _FIELD_FLOAT1: params.list[i][index++],
                        _FIELD_FLOAT2: params.list[i][index++],
                        _FIELD_FLOAT7: params.list[i][index++],
                        Describe7: params.list[i][index++],
                        AlarmOptions: params.list[i][index++],
                        StatusNew: params.list[i][index++],
                        _FIELD_FLOAT8: params.list[i][index++],
                        IMSI: params.list[i][index++],
                        _FIELD_INT2: params.list[i][index++],
                        GroupCode: params.list[i][index++],
                        SolutionType: params.list[i][index++],
                        Registration: params.list[i][index++],
                        StockNumber: params.list[i][index++],
                        MaxSpeed: params.list[i][index++],
                        MaxSpeedAlertMode: params.list[i][index++],
                        DaysInInventory: moment.utc().diff(moment.utc(params.list[i][index],window.COM_TIMEFORMAT),'days'),
                        StorageTime: params.list[i][index++],
                        ActivationTime: params.list[i][index++],
                        BusinessExpense: params.list[i][index++],
                        FuelEconomy: params.list[i][index++],
                        EngineCapacity: params.list[i][index++],
                        OffroadTaxCredit: params.list[i][index++],
                        AssetType: params.list[i][index++],

                    };
                    /*if (POSINFOASSETLIST && POSINFOASSETLIST[params[i][1]]) {
                        POSINFOASSETLIST[params[i][1]].StatusNew =  ary[params[i][1]].StatusNew;
                    }  */
                }
                ret = ary;
                localStorage.setItem("COM.QUIKTRAK.NEW.ASSETLIST", JSON.stringify(ary));
            }else if(params.device){
                let list = self.methods.getFromStorage('assetList');

                if (POSINFOASSETLIST[params.device.IMEI]) {
                    POSINFOASSETLIST[params.device.IMEI].Name = list[params.device.IMEI].Name = params.device.name;
                    POSINFOASSETLIST[params.device.IMEI].TagName = list[params.device.IMEI].TagName = params.device.tag;
                    POSINFOASSETLIST[params.device.IMEI].Registration = list[params.device.IMEI].Registration = params.device.registration;
                    POSINFOASSETLIST[params.device.IMEI].Unit = list[params.device.IMEI].Unit = params.device.speedUnit;
                    POSINFOASSETLIST[params.device.IMEI].InitMileage = list[params.device.IMEI].InitMileage = params.device.initMileage;
                    POSINFOASSETLIST[params.device.IMEI].InitAcconHours = list[params.device.IMEI].InitAcconHours = params.device.initAccHours;
                    POSINFOASSETLIST[params.device.IMEI].Describe1 = list[params.device.IMEI].Describe1 = params.device.attr1;
                    POSINFOASSETLIST[params.device.IMEI].Describe2 = list[params.device.IMEI].Describe2 = params.device.attr2;
                    POSINFOASSETLIST[params.device.IMEI].Describe3 = list[params.device.IMEI].Describe3 = params.device.attr3;
                    POSINFOASSETLIST[params.device.IMEI].Describe4 = list[params.device.IMEI].Describe4 = params.device.attr4;
                    POSINFOASSETLIST[params.device.IMEI].GroupCode = list[params.device.IMEI].GroupCode = params.device.groupCode;

                    if (params.device.stockNumber) {
                        POSINFOASSETLIST[params.device.IMEI].StockNumber = list[params.device.IMEI].StockNumber = params.device.stockNumber;
                    }
                    if (params.device.icon) {
                        POSINFOASSETLIST[params.device.IMEI].Icon = list[params.device.IMEI].Icon = params.device.icon;
                    }
                    if (params.device.MaxSpeed) {
                        POSINFOASSETLIST[params.device.IMEI].MaxSpeed = list[params.device.IMEI].MaxSpeed = params.device.MaxSpeed;
                    }
                    if (params.device.BusinessExpense) {
                        POSINFOASSETLIST[params.device.IMEI].BusinessExpense = list[params.device.IMEI].BusinessExpense = params.device.BusinessExpense;
                    }
                    if (params.device.FuelEconomy) {
                        POSINFOASSETLIST[params.device.IMEI].FuelEconomy = list[params.device.IMEI].FuelEconomy = params.device.FuelEconomy;
                    }
                    if (params.device.EngineCapacity) {
                        POSINFOASSETLIST[params.device.IMEI].EngineCapacity = list[params.device.IMEI].EngineCapacity = params.device.EngineCapacity;
                    }
                    if (params.device.OffroadTaxCredit) {
                        POSINFOASSETLIST[params.device.IMEI].OffroadTaxCredit = list[params.device.IMEI].OffroadTaxCredit = params.device.OffroadTaxCredit;
                    }
                    if (params.device.AssetType) {
                        POSINFOASSETLIST[params.device.IMEI].AssetType = list[params.device.IMEI].AssetType = params.device.AssetType;
                    }

                    ret = list[params.device.IMEI];
                }else{
                    list[params.device.IMEI].Name = params.device.name;
                    list[params.device.IMEI].TagName = params.device.tag;
                    list[params.device.IMEI].Registration = params.device.registration;
                    list[params.device.IMEI].Unit = params.device.speedUnit;
                    list[params.device.IMEI].InitMileage = params.device.initMileage;
                    list[params.device.IMEI].InitAcconHours = params.device.initAccHours;
                    list[params.device.IMEI].Describe1 = params.device.attr1;
                    list[params.device.IMEI].Describe2 = params.device.attr2;
                    list[params.device.IMEI].Describe3 = params.device.attr3;
                    list[params.device.IMEI].Describe4 = params.device.attr4;
                    list[params.device.IMEI].GroupCode = params.device.groupCode;

                    if (params.device.stockNumber) {
                        list[params.device.IMEI].StockNumber = params.device.stockNumber;
                    }
                    if (params.device.icon) {
                        list[params.device.IMEI].Icon = params.device.icon;
                    }
                    if (params.device.MaxSpeed) {
                        list[params.device.IMEI].MaxSpeed = params.device.MaxSpeed;
                    }
                    if (params.device.BusinessExpense) {
                        list[params.device.IMEI].BusinessExpense = params.device.BusinessExpense;
                    }
                    if (params.device.FuelEconomy) {
                        list[params.device.IMEI].FuelEconomy = params.device.FuelEconomy;
                    }
                    if (params.device.EngineCapacity) {
                        list[params.device.IMEI].EngineCapacity = params.device.EngineCapacity;
                    }
                    if (params.device.OffroadTaxCredit) {
                        list[params.device.IMEI].OffroadTaxCredit = params.device.OffroadTaxCredit;
                    }
                    if (params.device.AssetType) {
                        list[params.device.IMEI].AssetType = params.device.AssetType;
                    }
                }

                localStorage.setItem("COM.QUIKTRAK.NEW.ASSETLIST", JSON.stringify(list));

            }else if(params.objects){
                localStorage.setItem("COM.QUIKTRAK.NEW.ASSETLIST", JSON.stringify(params.objects));
            }

            //console.log(ary);
            return ret;
        },
        parsePlaybackHystoryArr: function(arry){
            let self = this;
            let newArry = [];
            if (arry && arry.length) {
                for (let i = arry.length - 1; i >= 0; i--) {
                    if ( JSON.stringify(arry[i]) !== JSON.stringify(arry[i-1]) ) {
                        let index = 0;
                        let point = {
                            positionTime: arry[i][index++],
                            lat: arry[i][index++],
                            lng: arry[i][index++],
                            direct: arry[i][index++],
                            speed: arry[i][index++],
                            timeSpan: arry[i][index++],
                            mileage: arry[i][index++],
                            alerts: arry[i][index++],
                            status: arry[i][index++],
                        };
                        newArry.push(point);
                    }
                }
                newArry = self.methods.reverseArry(newArry);
            }
            return newArry;
        },
        parsePlaybackEventsArr: function(arry){
            let self = this;
            let newArry = [];
            if (arry && arry.length) {
                for (let i = arry.length - 1; i >= 0; i--) {
                    if ( JSON.stringify(arry[i]) !== JSON.stringify(arry[i-1]) ) {
                        let index = 0;
                        let point = {
                            assetID: arry[i][index++],
                            eventClass: arry[i][index++],
                            eventType: arry[i][index++],
                            state: arry[i][index++],
                            otherCode: arry[i][index++],
                            otherCode2: arry[i][index++],
                            contactCode: arry[i][index++],
                            beginTime: arry[i][index++],
                            endTime: arry[i][index++],
                            positionType: arry[i][index++],
                            lat: arry[i][index++],
                            lng: arry[i][index++],
                            alt: arry[i][index++],
                            alerts: arry[i][index++],
                            status: arry[i][index++],
                            content: arry[i][index++],
                        };
                        newArry.push(point);
                    }
                }
                newArry = self.methods.reverseArry(newArry);
            }
            return newArry;
        },
        setAccountSolutions: function(assetList){
            let self = this;
            let solutions = [];
            const keys = Object.keys(assetList);
            for (const key of keys) {
                if (assetList[key].SolutionType) {
                    let solution = assetList[key].SolutionType.toLowerCase();
                    let index = solutions.indexOf(solution);
                    if (index == -1 && solution.toLowerCase() !== 'deactivate') {
                        solutions.push(solution);
                    }
                }
            }
            solutions.sort();
            solutions.reverse();
            self.data.AccountSolutionArray = solutions;
        },
        checkBalance: function(alert){
            let self = this;

            let data = {
                MajorToken: self.data.MajorToken,
                MinorToken: self.data.MinorToken,
            };
            self.progressbar.show();
            self.request.promise.post(API_URL.GET_BALANCE, data, 'json')
                .then(function (result) {
                    console.log(result);
                    if (result.data && result.data.MajorCode === '000') {
                        let userInfo = self.methods.getFromStorage('userInfo');
                        userInfo.SMSTimes = result.data.Data.SMSTimes;
                        self.methods.setInStorage({name:'userInfo', data:userInfo });

                        if (alert) {
                            self.methods.customDialog({text: LANGUAGE.COM_MSG003+': '+result.data.Data.SMSTimes});
                        }
                    }
                    self.progressbar.hide();
                })
                .catch(function (err) {
                    console.log(err);
                    self.progressbar.hide();
                    if (err && err.status === 404){
                        self.dialog.alert(LANGUAGE.PROMPT_MSG002);
                    }else{
                        self.dialog.alert(LANGUAGE.PROMPT_MSG003);
                    }
                });
        },
        getPlaybackFilterEventsList: function(){
            return [
                {
                    Name: LANGUAGE.ASSET_ALARM_MSG11,  //Ignition On
                    Value: '1',
                    IconBg: 'bg-color-green',
                    Icon: 'icon-live-acc text-color-green f7-icons',
                    IconColor: 'text-color-green',
                    /*IconHTML:   `<div class='icon-container text-align-center text-color-white bg-color-green display-flex align-items-center justify-content-center'>
                                    <i class='f7-icons size-16 line-height-icon-fix icon-live-acc '></i> 
                                </div>`,*/
                },
                {
                    Name: LANGUAGE.ASSET_TRACK_MSG15,  //Stopped
                    Value: '2',
                    IconBg: 'bg-color-gray',
                    Icon: 'icon-live-stopped text-color-gray f7-icons',
                    IconColor: 'text-color-gray',
                    /*IconHTML:   `<div class='icon-container text-align-center text-color-white bg-color-gray display-flex align-items-center justify-content-center'>
                                    <i class='f7-icons size-16 line-height-icon-fix icon-live-stopped '></i> 
                                </div>`,*/
                },
                {
                    Name: LANGUAGE.ASSET_ALARM_MSG12,  //Enter Geofence
                    Value: '3',
                    IconBg: 'bg-color-green',
                    Icon: 'icon-menu-geofence text-color-green f7-icons',
                    IconColor: 'text-color-green',
                    /*IconHTML:   `<div class='icon-container text-align-center text-color-white bg-color-green display-flex align-items-center justify-content-center'>
                                    <i class='f7-icons size-16 line-height-icon-fix icon-menu-geofence '></i> 
                                </div>`,*/
                },
                {
                    Name: LANGUAGE.ASSET_ALARM_MSG13,  //Leave Geofence
                    Value: '4',
                    IconBg: 'bg-color-red',
                    Icon: 'icon-menu-geofence text-color-red f7-icons',
                    IconColor: 'text-color-red',
                    /*IconHTML:   `<div class='icon-container text-align-center text-color-white bg-color-red display-flex align-items-center justify-content-center'>
                                    <i class='f7-icons size-16 line-height-icon-fix icon-menu-geofence '></i> 
                                </div>`,*/
                },
                {
                    Name: LANGUAGE.ASSET_ALARM_MSG36,  //Other Alarms
                    Value: '5',
                    IconBg: 'bg-color-red',
                    Icon: 'icon-header-alarm text-color-red f7-icons',
                    IconColor: 'text-color-red',
                    /*IconHTML:   `<div class='icon-container text-align-center text-color-white bg-color-red display-flex align-items-center justify-content-center'>
                                    <i class='f7-icons size-16 line-height-icon-fix icon-header-alarm '></i> 
                                </div>`,*/
                },
            ];
        },
        getMarkerIcon: function(params){
            let ret = Protocol.MarkerIcon[0];

            if (params && params.type){
                params.type = params.type.toLowerCase()
            }
            if(params.asset){
                switch (params.type) {
                    case 'track':
                        ret = Protocol.MarkerIcon[0];
                        break;
                    case 'watch':
                        ret = Protocol.MarkerIcon[1];
                        break;
                    case 'loc8':
                        ret = Protocol.MarkerIcon[2];
                        break;
                    case 'protect':
                        ret = Protocol.MarkerIcon[3];
                        break;
                }
            }else{
                switch (params.type) {
                    case 'acc-on':
                        ret = Protocol.MarkerIcon[5];
                        break;
                    case 'acc-off':
                        ret = Protocol.MarkerIcon[4];
                        break;
                    case 'moving':
                        ret = Protocol.MarkerIcon[8];
                        break;
                    case 'stopped':
                        ret = Protocol.MarkerIcon[7];
                        break;
                    default:
                        ret = Protocol.MarkerIcon[6];
                }
            }
            return ret;
        },
        getAssetImg: function(params, imgFor){
            let self = this;
            let assetImg = '';
            let pattern = /^IMEI_/i;
            let pattern2 = 'ic_';
            let regex = /_/gi;
            let regex2 = /\.[^/.]+$/; //remove extension (.png, .jpg etc)
            let splitted = '';

            if (params && imgFor.assetList) {
                if (params.Icon && pattern.test(params.Icon)) {
                    assetImg = `<img class="user-img" src="${API_DOMIAN9}Attachment/images/${params.Icon}?${ self.data.NewImageTimestamp }" alt="">`;
                }else if(params.Icon && params.Icon.substring(0,3) == pattern2){
                    assetImg = '<div class="user-img bg-color-custom display-flex justify-content-center align-items-center"><div class="text-align-center vertical-center size-28 "><i class="icon text-color-white asset-icon-'+params.Icon.replace(regex, '-').replace(regex2, '')+'"></i></div></div>';

                }else if (params.Name) {
                    params.Name = $.trim(params.Name);
                    splitted = params.Name.split(' ');
                    if (splitted.length > 1) {
                        let one = '';
                        let two = '';
                        for (let i = 0; i < splitted.length; i++) {
                            if (splitted[i] && splitted[i][0]) {
                                if (!one || !two) {
                                    if (!one) {
                                        one = splitted[i][0];
                                    }else{
                                        two = splitted[i][0];
                                        break;
                                    }
                                }
                            }
                        }
                        assetImg = '<div class="user-img bg-color-custom text-color-white display-flex justify-content-center align-items-center"><span class="size-24">'+one+two+'</span></div>';
                    }else{
                        assetImg = '<div class="user-img bg-color-custom text-color-white display-flex justify-content-center align-items-center"><span class="size-24">'+params.Name[0]+params.Name[1]+'</span></div>';
                    }

                }else if(params.IMEI){
                    assetImg = '<div class="user-img bg-color-custom text-color-white display-flex justify-content-center align-items-center"><span class="size-24">'+params.IMEI[0]+params.IMEI[1]+'</span></div>';
                }
            }else if (params && imgFor.assetEdit) {
                if (params.Icon && pattern.test(params.Icon)) {
                    assetImg = `<img class="user-img" data-name="${params.Icon}" src="${API_DOMIAN9}Attachment/images/${params.Icon+'?'+ self.data.NewImageTimestamp}" alt="">`;
                }else if(params.Icon && params.Icon.substring(0,3) == pattern2){
                    assetImg = '<div class="user-img bg-color-custom display-flex justify-content-center align-items-center"><div class="text-align-center vertical-center size-75 "><i class="icon text-color-white asset-icon-'+params.Icon.replace(regex, '-').replace(regex2, '')+'"></i></div></div>';
                }else{
                    assetImg = `<img class="user-img" src="resources/images/no-photo.svg" alt="">`;
                }

            }else{
                assetImg = false;
            }
            //console.log(assetImg);
            return assetImg;
        },
        getMarkerDataTable: function (asset, positionDetails){
            let self = this;
            //console.log(asset);
            let markerData = '';
            let customAddress = LANGUAGE.COM_MSG08;

            if (positionDetails) {
                customAddress = !positionDetails.address ? LANGUAGE.COM_MSG08 : positionDetails.address;
                markerData += '<table cellpadding="0" cellspacing="0" border="0" class="marker-data-table">';
                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG01+'</td>';
                markerData +=       '<td class="marker-data-value">'+positionDetails.AssetName+'</td>';
                markerData +=   '</tr>';

                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG03+'</td>';
                markerData +=       '<td class="marker-data-value">'+positionDetails.PositionTime+'</td>';
                markerData +=   '</tr>';

                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG05+'</td>';
                markerData +=       '<td class="marker-data-value">'+positionDetails.Speed+'</td>';
                markerData +=   '</tr>';
                if (positionDetails.Direction) {
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG10+'</td>';
                    markerData +=       '<td class="marker-data-value">'+positionDetails.Direction+'</td>';
                    markerData +=   '</tr>';
                }
                if (positionDetails.Mileage) {
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG04+'</td>';
                    markerData +=       '<td class="marker-data-value">'+positionDetails.Mileage+'</td>';
                    markerData +=   '</tr>';
                }
                if (positionDetails.Acc) {
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG06+'</td>';
                    markerData +=       '<td class="marker-data-value">'+positionDetails.Acc+'</td>';
                    markerData +=   '</tr>';
                }
                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG11+'</td>';
                markerData +=       '<td class="marker-data-value ">'+ Protocol.Helper.convertDMS(positionDetails.Lat, positionDetails.Lng) +'</td>';
                markerData +=   '</tr>';
                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG12+'</td>';
                markerData +=       '<td class="marker-data-value address-'+positionDetails.Imei+'">'+ customAddress + '</td>';
                markerData +=   '</tr>';
                markerData += '</table>';
            }else if (asset ) {
                let assetFeaturesStatus = Protocol.Helper.getAssetStateInfo(asset);
                if (assetFeaturesStatus && assetFeaturesStatus.stats) {
                    let speed = 0;
                    let mileage = '-';
                    let launchHours = '';
                    let positionType = Protocol.Helper.getPositionType(parseInt(asset.posInfo.positionType));
                    deirectionCardinal = Protocol.Helper.getDirectionCardinal(asset.posInfo.direct);
                    if (typeof asset.Unit !== "undefined" && typeof asset.posInfo.speed !== "undefined") {
                        speed = Protocol.Helper.getSpeedValue(asset.Unit, asset.posInfo.speed) + ' ' + Protocol.Helper.getSpeedUnit(asset.Unit);
                    }
                    if (typeof asset.Unit !== "undefined" && typeof asset.posInfo.mileage !== "undefined" && asset.posInfo.mileage != '-') {
                        mileage = Protocol.Helper.getMileage(asset, asset.posInfo.mileage);
                    }
                    if (typeof asset.posInfo.launchHours !== "undefined") {
                        launchHours = Protocol.Helper.getEngineHours(asset, asset.posInfo.launchHours);
                    }
                    customAddress = !asset.lastQueryPosinfo || !asset.lastQueryPosinfo.address ? LANGUAGE.COM_MSG08 : asset.lastQueryPosinfo.address;

                    markerData += '<table cellpadding="0" cellspacing="0" border="0" class="marker-data-table">';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG01+'</td>';
                    markerData +=       '<td class="marker-data-value">'+asset.Name+'</td>';
                    markerData +=   '</tr>';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG02+'</td>';
                    markerData +=       '<td class="marker-data-value">'+self.methods.capitalize(assetFeaturesStatus.status.value)+'</td>';
                    markerData +=   '</tr>';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG03+'</td>';
                    markerData +=       '<td class="marker-data-value">'+asset.posInfo.positionTime.format(window.COM_TIMEFORMAT)+'</td>';
                    markerData +=   '</tr>';
                    if (assetFeaturesStatus.stopped) {
                        markerData +=   '<tr>';
                        markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG18+'</td>';
                        markerData +=       '<td class="marker-data-value">'+assetFeaturesStatus.stopped.duration+'</td>';
                        markerData +=   '</tr>';
                    }
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG04+'</td>';
                    markerData +=       '<td class="marker-data-value">'+mileage+'</td>';
                    markerData +=   '</tr>';
                    if (launchHours) {
                        markerData +=   '<tr>';
                        markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG19+'</td>';
                        markerData +=       '<td class="marker-data-value">'+launchHours+'</td>';
                        markerData +=   '</tr>';
                    }
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG05+'</td>';
                    markerData +=       '<td class="marker-data-value">'+speed+'</td>';
                    markerData +=   '</tr>';
                    if (assetFeaturesStatus.acc) {
                        markerData +=   '<tr>';
                        markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG06+'</td>';
                        markerData +=       '<td class="marker-data-value">'+assetFeaturesStatus.acc.value+'</td>';
                        markerData +=   '</tr>';
                    }
                    if (assetFeaturesStatus.battery) {
                        markerData +=   '<tr>';
                        markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG07+'</td>';
                        markerData +=       '<td class="marker-data-value">'+assetFeaturesStatus.battery.value+'</td>';
                        markerData +=   '</tr>';
                    }
                    if (assetFeaturesStatus.power) {
                        markerData +=   '<tr>';
                        markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG08+'</td>';
                        markerData +=       '<td class="marker-data-value">'+assetFeaturesStatus.power.value+'</td>';
                        markerData +=   '</tr>';
                    }
                    if (assetFeaturesStatus.fuel) {
                        markerData +=   '<tr>';
                        markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG09+'</td>';
                        markerData +=       '<td class="marker-data-value">'+assetFeaturesStatus.fuel.value+'</td>';
                        markerData +=   '</tr>';
                    }
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG10+'</td>';
                    markerData +=       '<td class="marker-data-value">'+deirectionCardinal+' ('+asset.posInfo.direct+'&deg;)</td>';
                    markerData +=   '</tr>';
                    if (positionType) {
                        markerData +=   '<tr>';
                        markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG13+'</td>';
                        markerData +=       '<td class="marker-data-value ">'+positionType+'</td>';
                        markerData +=   '</tr>';
                    }
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG11+'</td>';
                    markerData +=       '<td class="marker-data-value ">'+ Protocol.Helper.convertDMS(asset.posInfo.lat, asset.posInfo.lng) +'</td>';
                    markerData +=   '</tr>';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG12+'</td>';
                    markerData +=       '<td class="marker-data-value address-'+asset.IMEI+'">'+customAddress+'</td>';
                    markerData +=   '</tr>';
                    markerData += '</table>';
                }
            }
            return markerData;
        },
        getMarkerDataTablePB: function (asset, point){
            let markerData = '';
            if (asset) {
                let assetFeaturesStatus = Protocol.Helper.getAssetStateInfo(asset);
                if (assetFeaturesStatus && assetFeaturesStatus.stats) {
                    let speed = 0;
                    let mileage = '-';
                    let direct = point.direct;
                    let deirectionCardinal = Protocol.Helper.getDirectionCardinal(direct);
                    if (typeof asset.Unit !== "undefined" && typeof asset.posInfo.speed !== "undefined") {
                        speed = Protocol.Helper.getSpeedValue(asset.Unit, point.speed) + ' ' + Protocol.Helper.getSpeedUnit(asset.Unit);
                    }
                    if (typeof asset.Unit !== "undefined" && typeof asset.posInfo.mileage !== "undefined" && asset.posInfo.mileage != '-') {
                        mileage = (Protocol.Helper.getMileageValue(asset.Unit, point.mileage) + parseInt(asset.InitMileage) + parseInt(asset._FIELD_FLOAT7)) + '&nbsp;' + Protocol.Helper.getMileageUnit(asset.Unit);
                    }
                    let time = moment(point.positionTime,'X').format(window.COM_TIMEFORMAT);
                    let customAddress = !point.customAddress ? LANGUAGE.COM_MSG004 : point.customAddress;

                    markerData += '<table cellpadding="0" cellspacing="0" border="0" class="marker-data-table">';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG01+'</td>';
                    markerData +=       '<td class="marker-data-value">'+asset.Name+'</td>';
                    markerData +=   '</tr>';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG03+'</td>';
                    markerData +=       '<td class="marker-data-value">'+time+'</td>';
                    markerData +=   '</tr>';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG04+'</td>';
                    markerData +=       '<td class="marker-data-value">'+mileage+'</td>';
                    markerData +=   '</tr>';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG05+'</td>';
                    markerData +=       '<td class="marker-data-value">'+speed+'</td>';
                    markerData +=   '</tr>';
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG10+'</td>';
                    markerData +=       '<td class="marker-data-value">'+deirectionCardinal+' ('+direct+'&deg;)</td>';
                    markerData +=   '</tr>';

                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG12+'</td>';
                    markerData +=       '<td class="marker-data-value marker-address">'+customAddress+'</td>';
                    markerData +=   '</tr>';

                    markerData += '</table>';
                }
            }
            return markerData;
        },
        getPlaybackMarkerDataTableInfoPin: function(point, additionaDataObj = {}){
            let self = this;
            let markerData = '';

            /*let beginTime = moment(point.beginTime).format(window.COM_TIMEFORMAT);
            beginTime = moment.utc(beginTime).toDate();
            beginTime = moment(beginTime).local().format(window.COM_TIMEFORMAT);
            let endTime = moment(point.endTime).format(window.COM_TIMEFORMAT);
            endTime = moment.utc(endTime).toDate();
            endTime = moment(endTime).local().format(window.COM_TIMEFORMAT);*/
            let beginTime = moment(point.beginTime).add(self.data.UTCOFFSET,'minutes').format(window.COM_TIMEFORMAT);
            let endTime = moment(point.endTime).add(self.data.UTCOFFSET,'minutes').format(window.COM_TIMEFORMAT);


            let dateDifference = Protocol.Helper.getDifferenceBTtwoDates(point.beginTime,point.endTime);
            let duration = moment.duration(dateDifference, "milliseconds").format('d[d] h[h] m[m] s[s]');
            let fenceName = '';

            markerData += '<table cellpadding="0" cellspacing="0" border="0" class="marker-data-table">';
            switch (point.eventClass){
                case 1:
                    switch(point.eventType){
                        case 8:
                            markerData +=   '<tr>';
                            markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_PLAYBACK_MSG18+'</td>';
                            markerData +=       '<td class="marker-data-value">'+LANGUAGE.ASSET_ALARM_MSG12+'</td>';
                            markerData +=   '</tr>';
                            if (additionaDataObj.GeofenceList && additionaDataObj.GeofenceList.length) {
                                fenceName = self.methods.getGeofenceName(point.otherCode, additionaDataObj.GeofenceList);
                                if (fenceName) {
                                    markerData +=   '<tr>';
                                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.GEOFENCES_MSG05+'</td>';
                                    markerData +=       '<td class="marker-data-value">'+fenceName+'</td>';
                                    markerData +=   '</tr>';
                                }
                            }
                            break;

                        case 16:
                            markerData +=   '<tr>';
                            markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_PLAYBACK_MSG18+'</td>';
                            markerData +=       '<td class="marker-data-value">'+LANGUAGE.ASSET_ALARM_MSG13+'</td>';
                            markerData +=   '</tr>';
                            if (additionaDataObj.GeofenceList && additionaDataObj.GeofenceList.length) {
                                fenceName = self.methods.getGeofenceName(point.otherCode, additionaDataObj.GeofenceList);
                                if (fenceName) {
                                    markerData +=   '<tr>';
                                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.GEOFENCES_MSG05+'</td>';
                                    markerData +=       '<td class="marker-data-value">'+fenceName+'</td>';
                                    markerData +=   '</tr>';
                                }
                            }
                            break;

                        default:
                            markerData +=   '<tr>';
                            markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_PLAYBACK_MSG18+'</td>';
                            $.each(Protocol.PositionAlerts,function(key,val){
                                if (val === point.eventType) {
                                    markerData +=       '<td class="marker-data-value">'+key+'</td>';
                                }
                            });
                            markerData +=   '</tr>';
                    }
                    break;

                case 2:     // ACC
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG06+'</td>';    //Ignition
                    if (point.eventType === 0) {
                        markerData +=       '<td class="marker-data-value">'+LANGUAGE.COM_MSG050+'</td>'; //off
                    }else{
                        markerData +=       '<td class="marker-data-value">'+LANGUAGE.COM_MSG049+'</td>'; //on
                    }
                    markerData +=   '</tr>';
                    break;

                case 4:     // ACTIVE
                    markerData +=   '<tr>';
                    markerData +=       '<td class="marker-data-caption">'+LANGUAGE.COM_MSG079+'</td>';    //Activity
                    if (point.eventType === 0) {
                        markerData +=       '<td class="marker-data-value">'+LANGUAGE.ASSET_TRACK_MSG15+'</td>';   //Stopped
                    }else{
                        markerData +=       '<td class="marker-data-value">'+LANGUAGE.COM_MSG032+'</td>';  //Move
                    }
                    markerData +=   '</tr>';
                    break;
            }
            if (beginTime === endTime) {
                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_PLAYBACK_MSG19+'</td>';
                markerData +=       '<td class="marker-data-value">'+beginTime+'</td>';
                markerData +=   '</tr>';
            }else{
                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_PLAYBACK_MSG20+'</td>';
                markerData +=       '<td class="marker-data-value">'+beginTime+'</td>';
                markerData +=   '</tr>';
                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_PLAYBACK_MSG21+'</td>';
                markerData +=       '<td class="marker-data-value">'+endTime+'</td>';
                markerData +=   '</tr>';
            }

            if (beginTime !== endTime) {
                markerData +=   '<tr>';
                markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_PLAYBACK_MSG22+'</td>';
                markerData +=       '<td class="marker-data-value">'+duration+'</td>';
                markerData +=   '</tr>';
            }

            markerData +=   '<tr>';
            markerData +=       '<td class="marker-data-caption">'+LANGUAGE.ASSET_TRACK_MSG12+'</td>';
            markerData +=       '<td class="marker-data-value marker-address" data-popupIdAddress="'+point.index+'">'+LANGUAGE.COM_MSG004+'</td>';
            markerData +=   '</tr>';

            markerData += '</table>';

            return markerData;
        },
        getGeofenceDataTable: function(geofence, options){
            let self = this;
            let markerData = '';
            if (geofence) {
                let assignedAssets = '';
                let assetList = self.methods.getFromStorage('assetList');
                let assignedAssetsCount = '0';
                let BeginTime = '';
                let EndTime = '';
                let IgnoreDays = '';

                if (options && options.geogroup) {
                    if (geofence.Assets && geofence.Assets.length) {
                        assignedAssetsCount = geofence.Assets.length;
                        for (let i = geofence.Assets.length - 1; i >= 0; i--) {
                            assignedAssets += geofence.Assets[i].Name + ', ';
                        }
                    }
                }else{
                    if (geofence.SelectedAssetList && geofence.SelectedAssetList.length) {
                        assignedAssetsCount = geofence.SelectedAssetList.length;
                        for (let i = geofence.SelectedAssetList.length - 1; i >= 0; i--) {
                            if (assetList[geofence.SelectedAssetList[i].IMEI]){
                                assignedAssets += assetList[geofence.SelectedAssetList[i].IMEI].Name + ', ';
                            }else{
                                assignedAssets += LANGUAGE.COM_MSG027 + ', ';
                            }
                        }
                    }
                }
                if (assignedAssets) {
                    assignedAssets = assignedAssets.slice(0, -2);
                }else{
                    assignedAssets = LANGUAGE.COM_MSG058;
                }

                if (geofence.Week && geofence.Week.length) {
                    let daysOfWeek = Protocol.Helper.getDaysOffWeekArray();
                    for (let i = 0; i < geofence.Week.length; i++) {
                        IgnoreDays += geofence.Week.length > 2 ? daysOfWeek[geofence.Week[i].Week].displayAs + ', ' : daysOfWeek[geofence.Week[i].Week].name + ', ';
                    }
                    if (IgnoreDays) {
                        IgnoreDays = IgnoreDays.slice(0, -2);
                    }
                    BeginTime = geofence.Week[0].BeginTime ? moment(geofence.Week[0].BeginTime, 'HH:mm:ss').add(self.data.UTCOFFSET, 'minutes').format('HH:mm:ss') : BeginTime;
                    EndTime = geofence.Week[0].EndTime ? moment(geofence.Week[0].EndTime, 'HH:mm:ss').add(self.data.UTCOFFSET, 'minutes').format('HH:mm:ss') : EndTime;
                }


                markerData += `
                <table cellpadding="0" cellspacing="0" border="0" class="marker-data-table">
                    <tr>
                       <td class="marker-data-caption">${ options && options.geogroup ? LANGUAGE.ASSET_TRACK_MSG21 : LANGUAGE.ASSET_TRACK_MSG22}</td>
                       <td class="marker-data-value">${ geofence.Name }</td>
                    </tr>
                    <tr>
                        <td class="marker-data-caption">${ LANGUAGE.ASSET_TRACK_MSG23 }(${ assignedAssetsCount })</td>
                        <td class="marker-data-value">${ assignedAssets }</td>
                    </tr>			
                    `;

                if (options && !options.geogroup) {
                    markerData += `
                    <tr>
                        <td class="marker-data-caption">${ LANGUAGE.ASSET_TRACK_MSG24 }</td>
                        <td class="marker-data-value">${ Protocol.Helper.getGeofenceAlertType(geofence.Alerts) }</td>
                    </tr>
                    <tr>
                       <td class="marker-data-caption">${ LANGUAGE.COM_MSG063 }</td>
                       <td class="marker-data-value">${ geofence.State === 1 ? LANGUAGE.COM_MSG059 : LANGUAGE.COM_MSG060 }</td>
                    </tr>
                    <tr>
                       <td class="marker-data-caption">${ LANGUAGE.ASSET_TRACK_MSG25 }</td>
                       <td class="marker-data-value">${ geofence.Inverse === 1 ? LANGUAGE.COM_MSG059 : LANGUAGE.COM_MSG060 }</td>
                    </tr>
                `;
                    if (geofence.Inverse === 1) {
                        markerData += `
					<tr>
		               <td class="marker-data-caption">${ LANGUAGE.ASSET_TRACK_MSG26 }</td>
		               <td class="marker-data-value">${ BeginTime } - ${ EndTime }</td>
		           	</tr>
		           	<tr>
		               <td class="marker-data-caption">${ LANGUAGE.ASSET_TRACK_MSG27 }</td>
		               <td class="marker-data-value">${ IgnoreDays }</td>
		           	</tr>
           		`;
                    }
                }

                markerData += ` 
                <tr>
                    <td class="marker-data-caption">${ LANGUAGE.ASSET_TRACK_MSG11 }</td>
                    <td class="marker-data-value ">${ Protocol.Helper.convertDMS(geofence.Lat, geofence.Lng) }</td>
                </tr>
                <tr>
                    <td class="marker-data-caption">${ LANGUAGE.ASSET_TRACK_MSG12 }</td>
                    <td class="marker-data-value address-${ geofence.Code }">${ geofence.Address }</td>
                </tr>
            </table>`;
            }
            return markerData;
        },
        sortVirtualAssetList: function (list, sortBy, orderBy) {
            let self = this;
            let filterType = list.$el.data('filter-type');

            let sortedList = self.methods.sortAssetList(list.items, sortBy, orderBy);
            list.replaceAllItems(sortedList);

            /*filter list after sorting, because filter is resetted after sorting*/
            if (filterType !== 'all'){
                let filteredListIndexes = self.methods.filterAssetList(list.items, filterType);
                list.filterItems(filteredListIndexes);
            }

            list.$el.data('sort-by', sortBy);
            list.$el.data('order-by', orderBy);
        },
        sortAssetList: function(list, sortBy, orderBy){
            if (list && list.length) {
                list.sort(function(a, b) {
                    if (a.Name < b.Name) return -1;
                    if (a.Name > b.Name) return 1;
                    return 0;
                });
                if (orderBy === 'desc'){
                    list.reverse();
                }

                switch (sortBy) {
                    case 'state':
                        let oneDay = 1000 * 60 * 60 * 24;
                        let now = moment();
                        let arrayOnline = [];
                        let arrayOffline = [];
                        for (let i = list.length - 1; i >= 0; i--) {
                            if (POSINFOASSETLIST[list[i].IMEI] && POSINFOASSETLIST[list[i].IMEI].posInfo && POSINFOASSETLIST[list[i].IMEI].posInfo.positionTime) {
                                let dateDifference = Protocol.Helper.getDifferenceBTtwoDates(POSINFOASSETLIST[list[i].IMEI].posInfo.positionTime, now);
                                if (dateDifference <= oneDay) {
                                    arrayOnline.push(list[i]);
                                } else {
                                    arrayOffline.push(list[i]);
                                }
                            }else {
                                arrayOffline.push(list[i]);
                            }
                        }

                        if (arrayOnline.length) {
                            arrayOnline.reverse();
                        }
                        if (arrayOffline.length) {
                            arrayOffline.reverse();
                        }
                        list = arrayOnline.concat(arrayOffline);


                        break;
                }

            }
            return list;
        },
        filterVirtualAssetList: function (list, type) {
            let self = this;

            /*if (type === 'all'){
                list.resetFilter();
            }else{*/
                let filteredListIndexes = self.methods.filterAssetList(list.items, type);
                list.filterItems(filteredListIndexes);
            //}

            list.$el.data('filter-type', type);
        },
        filterAssetList: function(list, filterType){
            let itemIndexToShow = [];
            if (list && list.length) {
                switch (filterType){
                    case 'protect': case 'loc8':
                        for (let i = list.length - 1; i >= 0; i--) {
                            if (list[i].SolutionType && list[i].SolutionType.toLowerCase().indexOf(filterType) >= 0)
                            {
                                itemIndexToShow.push(i);
                            }
                        }
                        break;

                    case 'live':
                        for (let i = list.length - 1; i >= 0; i--) {
                            if ( !list[i].SolutionType ){
                                continue;
                            }
                            if ( list[i].SolutionType.toLowerCase().indexOf('track') >= 0 ||
                                 list[i].SolutionType.toLowerCase().indexOf('watch') >= 0 )
                            {
                                itemIndexToShow.push(i);
                            }
                        }
                        break;
                    default: //all
                        for (let i = list.length - 1; i >= 0; i--) {
                            itemIndexToShow.push(i);
                        }
                }
            }
            if (itemIndexToShow.length) {
                itemIndexToShow.reverse();
            }
            return itemIndexToShow;
        },
        sortContactList: function(list){
            let self = this;
            if (list && list.length) {
                for (let i = list.length - 1; i >= 0; i--) {
                    list[i].FullName = list[i].FirstName + ' ' + list[i].SubName;
                    list[i].FullName.trim();
                }
                list.sort(function(a,b){
                    if(a.FullName.toLowerCase() < b.FullName.toLowerCase()) return -1;
                    if(a.FullName.toLowerCase() > b.FullName.toLowerCase()) return 1;
                    return 0;
                });
            }
            return list;
        },
        formatPlaybackData: function(historyData, asset){
            let formattedData = {};
            if (historyData) {
                let deirectionCardinal = Protocol.Helper.getDirectionCardinal(historyData.direct);

                formattedData.Lat = historyData.lat;
                formattedData.Lng = historyData.lng;
                formattedData.Coords = parseFloat(historyData.lat).toFixed(5) + ', ' + parseFloat(historyData.lng).toFixed(5);
                formattedData.DateTime = moment(historyData.positionTime,'X').format(window.COM_TIMEFORMAT);
                formattedData.Speed = Protocol.Helper.getSpeedValue(asset.Unit, historyData.speed) + ' ' + Protocol.Helper.getSpeedUnit(asset.Unit);
                formattedData.Direction = deirectionCardinal+'('+historyData.direct+'&deg)';
                formattedData.Mileage = (Protocol.Helper.getMileageValue(asset.Unit, historyData.mileage) + parseInt(asset.InitMileage) + parseInt(asset._FIELD_FLOAT7)) + '&nbsp;' + Protocol.Helper.getMileageUnit(asset.Unit);

            }else{
                console.log('data object is empty');
            }
            return formattedData;
        },
        formatPlaybackEventData: function(point={}, geofenceList){
            let self = this;
            /*point.BeginTimeLocal = moment(point.beginTime).format(window.COM_TIMEFORMAT);
            point.BeginTimeLocal = moment.utc(point.BeginTimeLocal).toDate();
            point.BeginTimeLocal = moment(point.BeginTimeLocal).local().format(window.COM_TIMEFORMAT);*/
            point.BeginTimeLocal = moment(point.beginTime).add(self.data.UTCOFFSET,'minutes').format(window.COM_TIMEFORMAT);

            switch (point.eventClass){
                case 1:
                    //point.IconBg = 'bg-color-red';
                    point.Icon = 'icon-header-alarm';
                    point.IconColor = 'text-color-orange';

                    switch (point.eventType){
                        case 8:
                            point.EventName = LANGUAGE.ASSET_ALARM_MSG12;
                            //point.IconBg = 'bg-color-green';
                            point.Icon = 'icon-menu-geofence';
                            point.IconColor = 'text-color-green';
                            point.OtherName = self.methods.getGeofenceName(point.otherCode, geofenceList);
                            break;
                        case 16:
                            point.EventName = LANGUAGE.ASSET_ALARM_MSG13;
                            //point.IconBg = 'bg-color-red';
                            point.Icon = 'icon-menu-geofence';
                            point.IconColor = 'text-color-red';
                            point.OtherName = self.methods.getGeofenceName(point.otherCode, geofenceList);
                            break;
                        default:
                            $.each(Protocol.PositionAlerts,function(key,val){
                                if (val === point.eventType) {
                                    point.EventName = key;
                                }
                            });
                    }
                    break;

                case 2:     // ACC
                    point.Icon = 'icon-live-acc';
                    if (point.eventType === 0) {
                        //point.IconBg = 'bg-color-gray';
                        point.EventName = LANGUAGE.ASSET_ALARM_MSG10;
                        point.IconColor = 'text-color-gray';
                    }else{
                        //point.IconBg = 'bg-color-green';
                        point.EventName = LANGUAGE.ASSET_ALARM_MSG11;
                        point.IconColor = 'text-color-green';
                    }
                    break;

                case 4:     // ACTIVE
                    point.Icon = 'icon-live-model';
                    point.Duration = Protocol.Helper.getDifferenceBTtwoDates(point.beginTime,point.endTime);
                    point.Duration = moment.duration(point.Duration, "milliseconds").format('d[d] h[h] m[m] s[s]');
                    if (point.eventType === 0) {
                        //point.IconBg = 'bg-color-gray';
                        point.EventName = LANGUAGE.ASSET_TRACK_MSG15;
                        point.IconColor = 'text-color-gray';
                    }else{
                        //point.IconBg = 'bg-color-green';
                        point.EventName = LANGUAGE.COM_MSG032;
                        point.IconColor = 'text-color-green';
                    }
                    break;
            }

            return point;
        },
        sendReportPlaybackOnEmail: function(data, callbackFunc){
            let self = this;

            self.preloader.show();
            self.request.postJSON(API_URL.GET_PLAYBACK_REPORT_ON_MAIL, data, function (result={}, xhr, status) {
                    self.preloader.hide();
                    console.log(result);

                    callbackFunc();
                },
                function (xhr, status) {
                    self.preloader.hide();

                    if (!xhr){
                        self.dialog.alert('Error occured at Send Report on Email ');
                        return;
                    }
                    switch (xhr.status) {
                        case 202:
                            //self.methods.customNotification({text: LANGUAGE.PROMPT_MSG0109});
                            callbackFunc();
                            //self.DynamicSendOnEmailPopup.close();
                            break;
                        case 204:
                            self.methods.customDialog({title: LANGUAGE.ASSET_PLAYBACK_MSG00, text: LANGUAGE.COM_MSG076});
                            break;

                        default:
                            if (xhr.response){
                                let response = self.methods.isJsonString(xhr.response);
                                if (response && response.code === 500){
                                    let messages = self.methods.isJsonString(response.message);
                                    if(messages && messages.length){
                                        for (let i = 0; i < messages.length; i++) {
                                            if (messages[i].MajorCode === '100' && messages[i].MinorCode === '1002'){
                                                self.methods.customDialog({title:  LANGUAGE.ASSET_PLAYBACK_MSG00, text: LANGUAGE.PROMPT_MSG066});
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                            self.dialog.alert('Error occured at Send Report on Email ');
                    }
                },
                'json');
        },
        countItemsBySolution: function(items){
            let ret = {
                All: 0,
                Live: 0,
                Loc8: 0,
                Protect: 0,
            };
            if(items && items.length){
                for (let i = 0; i < items.length; i++) {
                    let type = items[i].SolutionType ? items[i].SolutionType.toLowerCase() : '';
                    switch (type){
                        case 'protect':
                            ret.Protect++;
                            break;

                        case 'loc8':
                            ret.Loc8++;
                            break;

                        case 'track': case 'watch':
                            ret.Live++;
                            break;
                    }
                }
                ret.All = items.length;
            }
            return ret;
        },
        showToast: function(text){
            this.toast.create({
                position: 'center',
                text: text,
                closeTimeout: 1000,
                destroyOnClose: true,
            }).open();
        },
        customDialog: function(params){
            let self = this;
            let modalTex = '';
            if (params.title) {
                modalTex += '<div class="custom-modal-title text-color-red">'+ params.title +'</div>';
            }
            if (params.text) {
                modalTex += '<div class="custom-modal-text">'+ params.text +'</div>';
            }
            self.dialog.create({
                title: '<div class="custom-modal-logo-wrapper"><img class="custom-modal-logo" src="'+ self.data.logoBlack +'" alt=""/></div>',
                text: modalTex,
                buttons: [
                    {
                        text: LANGUAGE.COM_MSG055,
                    },
                ]
            }).open();
        },
        customDialogNoCredit: function(){
            let self = this;
            let modalTex = '<div class="custom-modal-title text-color-red">'+ LANGUAGE.PROMPT_MSG037 +'</div>' +
                '<div class="custom-modal-text">'+ LANGUAGE.PROMPT_MSG038 +'</div>';
            self.dialog.create({
                title: '<div class="custom-modal-logo-wrapper"><img class="custom-modal-logo" src="'+ self.data.logoBlack +'" alt=""/></div>',
                text: modalTex,
                buttons: [
                    {
                        text: LANGUAGE.COM_MSG056
                    },
                    {
                        text: LANGUAGE.COM_MSG055,
                        //bold: true,
                        onClick: function () {
                            mainView.router.navigate('/credit-recharge/');
                        }
                    },
                ]
            }).open();
        },
        customNotification: function(params){
            let self = this;
            self.notification.create({


                //icon: '<img src="'+self.data.AppDetails.favicon+'" class="icon-notification" alt="" />',
                title: self.name,
                //titleRightText: 'now',
                subtitle: params.title ? params.title : '',
                text: params.text ? params.text : '',
                closeTimeout: params.hold ? params.hold : 3000,
                closeOnClick: true,
                //closeButton: true,
                on: {
                    close: function (notification) {
                        notification.$el.remove();
                    }
                },

            }).open();
        },
        backFix: function (event) {
            if (mainView.router.url === '/') {
                app.dialog.confirm(LANGUAGE.PROMPT_MSG044, function() {
                    navigator.app.exitApp();
                });
            } else {
                mainView.router.back();
            }
        }
    },
    routes: routes,
    popup: {
        closeOnEscape: true,
    },
    sheet: {
        closeOnEscape: true,
    },
    popover: {
        closeOnEscape: true,
    },
    actions: {
        closeOnEscape: true,
    }
});


const mainView = app.views.create('.view-main', {
    //url: app.view.pushStateRoot ? app.view.pushStateRoot : '/',
    url: '/',
    //name: 'view-main',
    //stackPages: true
});

/*document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    app.data.AppDetails.appId = BuildInfo.packageName;

    //fix app images and text size
    if (window.MobileAccessibility) {
        window.MobileAccessibility.usePreferredTextZoom(false);
    }
    if (StatusBar) {
        StatusBar.styleDefault();
    }

    document.addEventListener("backbutton", backFix, false);
    //document.addEventListener("resume", onAppResume, false);
    //document.addEventListener("pause", onAppPause, false);
}

function backFix(event) {
    if (mainView.router.url === '/') {
        app.dialog.confirm(LANGUAGE.PROMPT_MSG044, function() {
            navigator.app.exitApp();
        });
    } else {
        mainView.router.back();
    }
}*/


$$('body').on('submit', '[name="login-form"]', function (e) {
    e.preventDefault();
    //preLogin();
    app.methods.hideKeyboard();
    app.methods.login(this);
    return false;
});

$$('body').on('click', '.password-toggle', function(){
    let password = $$(this).siblings("input");
    if(password.prop("type") === "text"){
        password.prop("type", "password");
    }else{
        password.prop("type", "text");
    }
    $$(this).toggleClass('text-color-gray');
});

$$('body').on('click', '.routeButton', function(){
    let that = $$(this);
    let lat = that.data('lat');
    let lng = that.data('lng');
    if (lat && lng) {
        let href = API_URL.URL_ROUTE;
        if (app.device.ios){
            href = API_URL.URL_ROUTE_IOS;
        }
        href = href.format(encodeURIComponent(lat), encodeURIComponent(lng));

        if (app.device.ios){
            window.open(href, '_blank', 'location=yes');
        }else{
            if (typeof navigator !== "undefined" && navigator.app) {
                navigator.app.loadUrl(href, { openExternal: true });
            } else {
                window.open(href, '_blank');
            }
        }

    }
});