// JavaScript Document

//choose genderSelected

var selectedGender = "null";
var activeStep = 1;
var spinnerDateActiveItemIndex = 1;
var spinnerTimeActiveItemIndex = 1;
var isTimeSpinnerOpened = false;
var isDateSpinnerOpened = false;
var timewtf = false;
var datewtf = false;
var isDiscountOpened = false;
var payMethode = 0;
var choosDistrictState = false;
var isServiceChoosed = false;
var choosedService = 0;

var actualInnerWidth = $("body").prop("clientWidth"); // El. width minus scrollbar width

var actualInnerWidthScroll = $("body").prop("scrollWidth"); // El. width minus scrollbar width


var services = [];
var wholeOrder = {services: services};
var total = 0;
var phone = '000000';

//
//function getOS() {
//  var userAgent = window.navigator.userAgent,
//      platform = window.navigator.platform,
//      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
//      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
//      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
//      os = null;
//
//  if (macosPlatforms.indexOf(platform) !== -1) {
//    os = 'Mac OS';
//  } else if (iosPlatforms.indexOf(platform) !== -1) {
//    os = 'iOS';
//  } else if (windowsPlatforms.indexOf(platform) !== -1) {
//    os = 'Windows';
//  } else if (/Android/.test(userAgent)) {
//    os = 'Android';
//  } else if (!os && /Linux/.test(platform)) {
//    os = 'Linux';
//  }
//
//  return os;
//
//}



function updatePhone() {
    var phoneInput = document.getElementById('phone').value;
    if (phoneInput.length > 6) {
        phone = phoneInput;
        wholeOrder.phone = phone;
    }
}
updatePhone();


//alert(actualInnerWidth + "    " + window.innerWidth);

function genderManager(x) {

    selectedGender = x;

    clearSelectedGender(selectedGender);

    setTimeout(function () {

        document.getElementById(x).classList.add("selectedGender");

    }, 200);

}



function clearSelectedGender(x) {

    if (x == "male") {

        document.getElementById("female").classList.remove("selectedGender");

    } else if (x == "female") {

        document.getElementById("male").classList.remove("selectedGender");

    } else if (x == "null") {

        return;

    }

}



//# generate a token for the sale

var phoneSign = phone.substr(phone.length - 4);

function Generator() {}
;

Generator.prototype.rand = Math.floor(Math.random() * 26) + Date.now();

Generator.prototype.getId = function () {

    return phoneSign + this.rand++;

};

var idGen = new Generator();

var token = idGen.getId();

if (token != 0) {
    document.getElementById("submit_form").action = 'https://www.cario.ir/app/send.php?token=' + token;
}

wholeOrder.token = token;




//make car brand list for ui test

var brandBox = "";

var brandLenght = 0;

var brandIndex = 1;

function makeBrandList(x) {

    brandLenght = x;

    brandBox = "<div id='brand" + brandIndex + "' class='brandBox relative easeMedium'>";

    brandBox += "<div id='brandIcon" + brandIndex + "' class='brandIcon abs centerAbs'></div>";

    brandBox += "<div class='brandName abs centerAbsHorizontal padding816 centerTexts easeLong'>برند" + brandIndex + "</div></div>";

    $("#chooseCar").append(brandBox);

    setTimeout(function () {

        document.getElementById("brand" + brandIndex).style.opacity = '1';

    }, 64);

    setTimeout(function () {

        if (brandIndex < x) {

            brandIndex++;

            makeBrandList(brandLenght);

        } else {

            brandLenght = 0;

            brandIndex = 0;

        }

    }, 128);

}



// change login n register pages (login, verify, ...)

var selectedPage = "login";

function managePage(elId) {

    // این تابع رو به عنوان ورودی بهش آی دی اون دیو ک باید ظاهر بشه رو بدی همه کار رو خودش می کنه

    // تابع های دیگه هم کمکی واسه این تابع اصلی هستن

    hidePage(selectedPage);

    selectedPage = elId;

    setTimeout(function () {

        showPage(elId);

    }, 405);

}



function hidePage(elId) {

    document.getElementById(elId).style.opacity = '0';

    setTimeout(function () {

        document.getElementById(elId).style.display = 'none';

    }, 400);

}



function showPage(elId) {

    var elementID = elId;

    //alert("want to show "+elementID);

    document.getElementById(elementID).style.display = 'block';

    setTimeout(function () {

        document.getElementById(elId).style.opacity = '1';

    }, 10);

}



/*تابع مدیریت تب های صفحه

 تابع activeStepManager تو اچ تی ام ال فراخوانی میشه سه تا تابع هم توی این تابع اصلی اجرا میشه*/

function activeStepManager(x) {

    if (x != activeStep) {

        if (isServiceChoosed) {

            deactiveStepperTab(activeStep);

            activeStepperTab(x);

            changePage(x);

            activeStep = x;

            //alert(activeStep);

        } else {

            Materialize.toast("لطفاً سرویس مورد نظر را انتخاب کنید", 3000, 'rounded') // 'rounded' is the class I'm applying to the toast


        }

    }

}



function deactiveStepperTab(x) {

    switch (x) {
        case 1:
        {
            $("#step" + x).removeClass("activeStep");

            $("#stepIcon" + x).addClass("opacityHalf");

            $("#stepLabel" + x).removeClass("activeText");

            break;
        }

        case 2:
        {
            $("#step" + x).removeClass("activeStep");

            $("#stepIcon" + x).addClass("opacityHalf");

            $("#stepLabel" + x).removeClass("activeText");

            break;
        }

    }



}



function activeStepperTab(x) {

    switch (x) {
        case 1:
        {

            $("#step" + x).addClass("activeStep");
            //alert($("#stepIcon"+x).hasClass("activeStepperService"));
            $("#stepIcon" + x).removeClass("opacityHalf");

            $("#stepLabel" + x).addClass("activeText");

            break;
        }

        case 2:
        {

            $("#step" + x).addClass("activeStep");

            $("#stepIcon" + x).removeClass("opacityHalf");

            $("#stepLabel" + x).addClass("activeText");

            break;
        }

    }



}



function changePage(x) {

    //مرحله ایکسم از ثبت سفارش، 1 برای انتخاب سرویس و 2 برای بقیه گزینه های ثبت سفارش

    if (x == 1) {

        $("#stepChooseType").removeClass("off");

        $("#stepChooseProduct").addClass("off");

    } else if (x == 2) {

        $("#stepChooseType").addClass("off");

        $("#stepChooseProduct").removeClass("off");

    }

}



//تابع مدیریت اسپینرها

//تابع بازکردن اسپینر

//

//			$("#timeSpinner").addClass("spinnerListOpened");

function openSpinner(x) {

    //console.log("open");

    //if x = 1 -> dateSpinner

    if (x == 1) {

        if (datewtf) {

            datewtf = false;

            return;

        }

        if (!isDateSpinnerOpened) {

            $("#dateSpinner").addClass("spinnerListOpened");

            isDateSpinnerOpened = true;

        }

    } else {//if x = 2 -> timeSpinner

        if (timewtf) {

            timewtf = false;

            return;

        }

        if (!isTimeSpinnerOpened) {

            $("#timeSpinner").addClass("spinnerListOpened");

            isTimeSpinnerOpened = true;

        }

    }

}



function closeSpinner(x) {

    //if x = 1 -> dateSpinner

    //console.log(x);

    if (x == "dateSpinner") {

        if (isDateSpinnerOpened) {

            $("#dateSpinner").removeClass("spinnerListOpened");

            isDateSpinnerOpened = false;

        }

    } else {

        //console.log(x + " is time");

        if (isTimeSpinnerOpened) {

            $("#timeSpinner").removeClass("spinnerListOpened");

            isTimeSpinnerOpened = false;

        }

    }

}



var lastSelectedItemText = "";

function onItemClick(spinner, itemIndex) {

    //console.log("spinnerItem"+itemIndex);

    if (spinner == "timeSpinner") {

        timewtf = !timewtf;

        $("#selectedItemShowHere").html(document.getElementById("spinnerItem" + itemIndex).innerHTML);

        wholeOrder.choosenTime = itemIndex;

    } else {

        datewtf = !datewtf;

        $("#timeSelectedItemShowHere").html(document.getElementById("dspinnerItem" + itemIndex).innerHTML);

        wholeOrder.choosenDate = itemIndex;

    }

    //alert(lastSelectedItemText);

    closeSpinner(spinner);

}



// baz o baste kardane boxe takhfif

function discountBoxManager() {

    if (isDiscountOpened) {

        $("#discountHolder").removeClass("discountOpened");

        isDiscountOpened = false;

    } else {

        $("#discountHolder").addClass("discountOpened");

        isDiscountOpened = true;

    }

}





// manage kardane button haye nahveye pardakht (payMethode)

function payMethodeChanger(x) {

    //x == 1 ->  ba etebar  *****   x == 2 -> pardakht ba kart

    //alert("in");

    if (x == 1) {

        //alert("x == 1");

        if (payMethode != 1) {

            //alert("payMethode = " + payMethode);

            $("#payBtnCredit").addClass("green");

            $("#payCreditLabel").addClass("white-text");

            if ($("#payBtnCart").hasClass("green") && $("#payCartLabel").hasClass("white-text")) {

                //alert("payMethodeCartHasNot");

                $("#payBtnCart").removeClass("green");

                $("#payCartLabel").removeClass("white-text");

                //alert("done");

            }

            payMethode = 1;

        }

    } else if (x == 2) {

        //alert("x == 2");

        if (payMethode != 2) {

            //alert("payMethode = " + payMethode);

            $("#payBtnCart").addClass("green");

            $("#payCartLabel").addClass("white-text");

            if ($("#payBtnCredit").hasClass("green") && $("#payCreditLabel").hasClass("white-text")) {

                //alert("payMethodeCreditHasNot");

                $("#payBtnCredit").removeClass("green");

                $("#payCreditLabel").removeClass("white-text");

                //alert("done");

            }

            payMethode = 2;

        }

    }

    $("#registerBtn").addClass("green");

    $("#registerBtn").addClass("white-text");

    wholeOrder.paymentMethode = payMethode;

}



function whatServiceIsChoosed(serviceIndex) {

    //alert("service with index "+serviceIndex + " choosed");



    //# serviceIndex is being added to the order object

    wholeOrder.serviceIndex = serviceIndex;

    //alert(choosedService);

    $("#service" + choosedService).removeClass("choosedService");

    $("#service" + wholeOrder.serviceIndex).addClass("choosedService");

    //alert("remove from service"+choosedService + " and add to service"+wholeOrder.serviceIndex);

    isServiceChoosed = true;

    activeStep = 2;

    choosedService = serviceIndex;


    switch (wholeOrder.serviceIndex) {
        case 1:
        {
            document.getElementById("choosedServiceIcon").style.backgroundImage = "url(img/services/services_carwash.svg)";
            document.getElementById("choosedServiceName").innerHTML = "کارواش";
            document.getElementById("dspinnerItem2").style.display = "block";
            break;
        }
        case 2:
        {
            document.getElementById("choosedServiceIcon").style.backgroundImage = "url(img/services/services_oil.svg)";
            document.getElementById("choosedServiceName").innerHTML = "تعویض روغن";
            document.getElementById("dspinnerItem2").style.display = "none";
            break;
        }
        case 3:
        {
            document.getElementById("choosedServiceIcon").style.backgroundImage = "url(img/services/services_battery.svg)";
            document.getElementById("choosedServiceName").innerHTML = "تعویض باتری";
            document.getElementById("dspinnerItem2").style.display = "none";
            break;
        }
        case 4:
        {
            document.getElementById("choosedServiceIcon").style.backgroundImage = "url(img/services/services_karshenas.svg)";
            document.getElementById("choosedServiceName").innerHTML = "کارشناسی خودرو";
            document.getElementById("dspinnerItem2").style.display = "block";
            break;
        }
        case 5:
        {
            document.getElementById("choosedServiceIcon").style.backgroundImage = "url(img/services/services_feul.svg)";
            document.getElementById("choosedServiceName").innerHTML = "سوخت در محل";
            document.getElementById("dspinnerItem2").style.display = "block";
            break;
        }
    }



    //alert(serviceIndex);

    $('.service-tab').removeClass('show');

    $('#services_tab_' + serviceIndex).addClass('show');



    $(".serviceHolder").removeClass("choosedService");

    isServiceChoosed = true;

    $(".activeStep").removeClass("activeStep");
    $(".stepLabel").removeClass("activeText");

    $("#step2").addClass("activeStep");
    $("#stepLabel2").addClass("activeText");


    activeStepManager(2);

    changePage(2);
}



function choosedServiceColor(x) {

}

//انتخاب منطقه

function chooseDistrict(x) {

    //alert("منطقه "+x+" انتخاب شد");

    //# area is gets added to the order object now

    wholeOrder.area = x;



    $("#districtHolder").addClass("off");

    document.getElementById("choosedDistrict").innerHTML = "منطقه " + x;

}





function updatePrice() {

    document.getElementById('total').innerHTML = total;

}


document.addEventListener('click', function () {
    updatePhone();
    updatePrice();

});





function chooseDistrictManager() {

    if (choosDistrictState) {

        $("#districtHolder").addClass("off");

        choosDistrictState = false;

    } else {

        $("#districtHolder").removeClass("off");

        choosDistrictState = true;

    }

}





//رجیستر کردن سفارش



function registerOrder() {








    if (wholeOrder.area == "undefined" || wholeOrder.area == null) {
        Materialize.toast('لطفا منطقه خود را انتخاب کنید', 3000, 'rounded');
        return;
    }


    if ($("#address").val() == "") {
        Materialize.toast('لطفا آدرس خود را وارد نمایید', 3000, 'rounded');
        return;
    }

    if (wholeOrder.services.length == 0) {
        Materialize.toast('لطفا سرویس را انتخاب کنید', 3000, 'rounded');
        return;
    }


    if (wholeOrder.choosenDate == "undefined" || wholeOrder.choosenDate == null) {
        Materialize.toast('لطفا تاریخ دریافت سرویس را انتخاب کنید', 3000, 'rounded');
        return;
    }

    if (wholeOrder.choosenTime == "undefined" || wholeOrder.choosenTime == null) {
        Materialize.toast('لطفا ساعت دریافت سرویس را انتخاب کنید', 3000, 'rounded');
        return;
    }






    if (!phonenumber($("#phone").val())) {
        Materialize.toast('لطفا شماره تماس معتبر وارد نمایید', 3000, 'rounded');
        return;
    }




    if (payMethode == 0) {
        Materialize.toast('لطفا شیوه پرداخت را انتخاب نمایید', 3000, 'rounded');

    } else {

        if (payMethode == 1) {

            if ($("#total").html() == "قیمت توافقی") {
                Materialize.toast('لطفا گزینه پرداخت در محل را انتخاب نمایید', 3000, 'rounded');
            } else
                payment("online");

        } else {

            payment("offline");

        }

    }

}




function payment(method) {


    $.ajax({

        type: 'POST',

        data: wholeOrder,

        url: 'https://www.cario.ir/app/insert.php',

        success: function (data) {
            Materialize.toast('سفارش شما با موفقیت ثبت شد', 3000, 'rounded'); // 'rounded' is the class I'm applying to the toast


            if (method == "online") {

                Materialize.toast('در حال اتصال به درگاه بانکی', 3000, 'rounded');// 'rounded' is the class I'm applying to the toast
                //navigator.app.loadUrl('https://www.cario.ir/app/send.php?token=' + token + '&total_amount=' + total + '0', { openExternal:true });

                var ref = window.open(encodeURI('https://www.cario.ir/app/send.php?token=' + token + '&total_amount=' + total + '0'), '_blank', 'location=yes');


            } else {//offline
                Materialize.toast('کاریو با شما در تماس خواهد بود', 3000, 'rounded');
                window.location.href = "success.html";

            }

        }

    });
}

function phonenumber(inputtxt)
{
    var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if ((inputtxt.match(phoneno)))
    {
        return true;
    } else
    {
        return false;
    }
}



//splash va intro



var introState = 1;



//کد های اینترو

function introNext() {
    if (introState <= 3) {
        //alert("okeye");
        introState++;
        document.getElementById("sliderHolder").style.right = (-1 * ((introState - 1) * 100)) + '%';
    } else {
        introOnSkip();
    }
    introManager();

}

function introBack() {
    if (introState > 1) {
        //alert("okeye");
        introState--;
        document.getElementById("sliderHolder").style.right = (-1 * ((introState - 1) * 100)) + '%';
    } else {

    }
    introManager();
}


function introOnSkip() {
    if (introState < 3) {
        storeIntro();
    }
}

function introManager() {

    switch (introState) {
        case 1:
        {
            document.getElementById("backIntro").style.opacity = '0';
            document.getElementById("nextIntro").innerHTML = 'چه خوب! بعدی...';
            document.getElementById("skipIntro").style.opacity = '1';
            break;
        }
        case 2:
        {
            document.getElementById("backIntro").style.opacity = '1';
            document.getElementById("nextIntro").innerHTML = ' بعدی...';
            document.getElementById("skipIntro").style.opacity = '1';
            break;
        }
        case 3:
        {
            document.getElementById("backIntro").style.opacity = '1';
            document.getElementById("nextIntro").innerHTML = 'حله، بزن بریم!';
            document.getElementById("skipIntro").style.opacity = '0';
            break;
        }
        case 4:
        {
            storeIntro();
            break;
        }

    }
}


function storeIntro() {
    $("#intro").fadeOut(500);

    if (typeof (Storage) !== "undefined")
        localStorage.intro = "done";

}


function checkIntroState() {



    if (typeof (Storage) !== "undefined") {
        if (localStorage.intro == "done") {
            $("#intro").fadeOut(0);
        }
    } else {
        $("#intro").fadeOut(0);
    }
}



let deferredPrompt;


function request_debug(paramdata) {

    //  document.getElementById('splash').innerHTML += '<BR>'+ paramdata;

}
request_debug('serviceWorker  in navigator');
window.addEventListener('load', function () {


    if ('serviceWorker' in navigator) {

        request_debug('serviceWorker  in navigator');

        navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
            console.log('Service worker  registrado com sucesso:', registration);
            request_debug(registration);

        }).catch(function (error) {
            console.log('Falha ao Registrar o Service Worker:', error);
            request_debug("error" + error.toString());

        });

        var isTooSoon = true;
        window.addEventListener('beforeinstallprompt', function (e) {

            console.log("beforeinstallprompt");

            // Prevent Chrome 67 and earlier from automatically showing the prompt
            // e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;

            // e.preventDefault();
            e.prompt();
            //promptEvent = e;
            request_debug(' window.addEventListener beforeinstallprompt fired!')

            if (isTooSoon) {
                //e.preventDefault(); // Prevents prompt display
                // Prompt later instead:
                setTimeout(function () {
                    isTooSoon = false;
                    e.prompt(); // Throws if called more than once or default not prevented
                }, 4000);
            }

        });

    } else {

        console.log('serviceWorker not in navigator');
        request_debug('serviceWorker not in navigator');

    }


});





function add() {
    console.log("onClick btnAdd");
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                //deferredPrompt = null;
            });
}




$(document).ready(function () {

    setTimeout(function () {
        $("#splash").fadeOut(200);
        checkIntroState();
    }, 2650);




    $.get("https://www.cario.ir/app/getServices.php", function (data, status) {
        var json = JSON.parse(data);


        jQuery.each(json, function (index, val) {


            var serviceTab = '<div id="services_tab_' + index + '" class="service-tab"></div>\n';
            var serviceID = '#services_tab_' + index;

            $("#servicesSection").append(serviceTab);

            for (var i = 0; i < val.length; i++) {
                var service = val[i];
                var serviceResponse = '<div class="productHolder relative easeMedium">';
					serviceResponse += '<div class="abs productInfoButton centerAbsTranslates easeMedium myCustomBoxShadow blue-grey infoIcon" onClick="showProductDetail(\''+service.name+'\', \''+service.longDesc+'\')"></div>';
					serviceResponse += '<div class="relative fullWidthRel productBox waves-effect waves-yellow myCustomBoxShadow floatRigh serviceitem" id="' + service.id + '" data-price="' + service.price + '" data-rel="' + service.name + '" data-toggle="off">';
					serviceResponse += '<div class="productIcon abs centerNoRepeatBackContain ' + service.icon + '  easeMedium"></div>';
					serviceResponse += '<div class="productNameDesc abs centerAbsVertical easeMedium">';
					serviceResponse += '<div class="fullWidthRel relative productName"> ' + service.name + ' </div>';
					serviceResponse += '<div class="fullWidthRel relative productDesc blue-grey-text"> ' + service.description + ' </div>';
					serviceResponse += '</div>';
                	serviceResponse += '</div>';
                	serviceResponse += '</div>';

                $(serviceID).append(serviceResponse);
                $(serviceID).append("\n");
            }

        });







//# adding the address to the order object

document.getElementById('address').addEventListener('blur', function () {

    var address = this.value;

    wholeOrder.address = address;

});

document.getElementById('extra_info').addEventListener('blur', function () {

    var extra_info = this.value;

    wholeOrder.extra_info = extra_info;

});

document.getElementById('registerBtn').addEventListener('blur', function () {

    var address = document.getElementById('address').value;

    var extra_info = document.getElementById('extra_info').value;

    wholeOrder.address = address;

    wholeOrder.extra_info = extra_info;

    //console.log(wholeOrder);

});



//# adding choosen services to the order object

$('.serviceitem').click(function (e) {

    //var item = event.target;



    $(".serviceitem").removeClass("choosedService");
    $(this).addClass("choosedService");

    var toggleStatus = this.getAttribute('data-toggle');

    var serviceId = this.getAttribute('id');

    var serviceTitle = $('#' + serviceId).attr('data-rel');

    var servicePrice = parseInt($('#' + serviceId).attr('data-price'));

    if (isNaN(servicePrice)) {

        servicePrice = "قیمت توافقی";
        $("#toman").hide();


    } else {

        $("#toman").show();
    }




    var service_details = {key: serviceId, serviceTitle: serviceTitle, servicePrice: servicePrice};



    if (toggleStatus === 'off') {



        services.push(service_details);

        wholeOrder.services = services;



        // adding the service price to the total price

        total = servicePrice;



        $('#' + serviceId).attr('data-toggle', 'on');

        Materialize.toast('سرویس انتخاب شد', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast


    } else {

        // remove from services object

        var droppedService = wholeOrder.services.find(key => serviceId);

        var index = services.map(function (x) {
            return x.key;
        }).indexOf(serviceId);

        services.splice(index, 1);



        // descreasing the total as much as the service price




        total = servicePrice;



        //services.push(service_details);

        $('#' + serviceId).attr('data-toggle', 'off');

        Materialize.toast('سرویس حذف شد', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast

        $(".serviceitem").removeClass("choosedService");

    }


    if (total == -1)
    {
        // $("#total").html("قیمت توافقی");
        // alert($("#total").html());
    }

    //console.log(wholeOrder);



});



    });

});


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

    document.addEventListener("backbutton", function (e) {

        if(activeStep === 2) {
            activeStepManager(1);
            e.preventDefault();
        }
        else {
            if (navigator.app) {
                navigator.app.exitApp();
            } else if (navigator.device) {
                navigator.device.exitApp();
            } else {
                window.close();
            }
        }
    }, false );
}


//new functions

function showProductDetail(productName, productDetail){
	document.getElementById("productInfoTitle").innerHTML = "جزئیات سرویس "+productName;
	document.getElementById("productInfoText").innerHTML = productDetail;
	document.getElementById("productDetailComplex").classList.remove("off");
}

function closeProductDetail(){
	document.getElementById("productDetailComplex").classList.add("off");
}

