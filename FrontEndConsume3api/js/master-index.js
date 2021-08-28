var Datos;

function accessSale () {
    location.replace('pages/sale.html');
}

$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyCj-dMPf_eE8h3mSh2L1Oa3aa9OvSmV5uI",
        authDomain: "smarthomepa-8f3e5.firebaseapp.com",
        databaseURL: "https://smarthomepa-8f3e5-default-rtdb.firebaseio.com",
        projectId: "smarthomepa-8f3e5",
        storageBucket: "smarthomepa-8f3e5.appspot.com",
        messagingSenderId: "1079642436426",
        appId: "1:1079642436426:web:4eea47f2fa51ef7f3207b3",
        measurementId: "G-QKP0F5C557"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();
    const auth = firebase.auth();
    /*$('#log-google').click(function (e) {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(googleProvider)
                .then((result) => {
                    console.log(result);
                    var html = "<div class=\"card-header\">" +
                            "<h3> Inicio con: Google </h3>" +
                            "</div><div class=\"card-body\">" +
                            "<div class=\"input-group form-group\">" +
                            "<label for=\"name\" style=\" color: white;\" >USUARIO: </label>" +
                            "<input id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"USUARIO: \" value=\"" + result.user.displayName + "\"/>" +
                            "</div>" +
                            "<div class=\"input-group form-group\">" +
                            "<label for=\"name\" style=\" color: white;\" >EMAIL: </label>" +
                            "<input id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"EMAIL: \" value=\"" + result.user.email + "\"/>" +
                            "</div>" +
                            "<div class=\"input-group form-group\">" +
                            "<img src=\"" + result.user.photoURL + "\" alt=\"IMAGEN\" width=\"100\" height=\"100\">" +
                            "</div>" +
                            "</div>";
                    $('.card').html(html);
                })
                .catch(error => {
                    console.log(error);
                });
    });*/
    $('#log-facebook').click(function (e) {
        var provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                var html = "<div class=\"card-header\">" +
                    "<h3> Inicio con: Facebook </h3>" +
                    "</div><div class=\"card-body\">" +
                    "<div class=\"input-group form-group\">" +
                    "<label for=\"name\" style=\" color: white;\" >USUARIO: </label>" +
                    "<input id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"USUARIO: \" value=\"" + result.user.displayName + "\"/>" +
                    "</div>" +
                    "<div class=\"input-group form-group\">" +
                    "<label for=\"name\" style=\" color: white;\" >EMAIL: </label>" +
                    "<input id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"EMAIL: \" value=\"" + result.user.email + "\"/>" +
                    "</div>" +
                    "<div class=\"input-group form-group\">" +
                    "<img src=\"" + result.user.photoURL + "\" alt=\"IMAGEN\" width=\"100\" height=\"100\">" +
                    "</div>" +
                    "<button type='button' class='btn btn-danger' onclick='accessSale()'>Acceder</button>" +
                    "</div>";
                $('.card').html(html);
                location.href('pages/sale.html');
            })
            .catch(error => {
                console.log(error);
            });
    });
    $('#log-github').click(function (e) {
        var provider = new firebase.auth.GithubAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                var html = "<div class=\"card-header\">" +
                    "<h3> Inicio con: GitHub </h3>" +
                    "</div><div class=\"card-body\">" +
                    "<div class=\"input-group form-group\">" +
                    "<label for=\"name\" style=\" color: white;\" >USUARIO: </label>" +
                    "<input id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"USUARIO: \" value=\"" + result.user.displayName + "\"/>" +
                    "</div>" +
                    "<div class=\"input-group form-group\">" +
                    "<label for=\"name\" style=\" color: white;\" >EMAIL: </label>" +
                    "<input id=\"email\" type=\"text\" class=\"form-control\" placeholder=\"EMAIL: \" value=\"" + result.user.email + "\"/>" +
                    "</div>" +
                    "<div class=\"form-group\">" +
                    "<img src=\"" + result.user.photoURL + "\" alt=\"IMAGEN\" width=\"100\" height=\"100\">" +
                    "</div>" +
                    "<button type='button' class='btn btn-danger' onclick='accessSale()'>Acceder</button>" +
                    "</div>";
                $('.card').html(html);
            })
            .catch(error => {
                console.log(error);
            });
    });
    $('#log-twitter').click(function (e) {
        var provider = new firebase.auth.TwitterAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                console.log(result);
                var html = "<div class=\"card-header\">" +
                    "<h3> Inicio con: Twitter </h3>" +
                    "</div><div class=\"card-body\">" +
                    "<div class=\"input-group form-group\">" +
                    "<label for=\"name\" style=\" color: white;\">USUARIO: </label>" +
                    "<input id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"USUARIO: \" value=\"" + result.user.displayName + "\"/>" +
                    "</div>" +
                    "<div class=\"input-group form-group\">" +
                    "<label for=\"name\" style=\" color: white;\" >EMAIL: </label>" +
                    "<input id=\"name\" type=\"text\" class=\"form-control\" placeholder=\"EMAIL: \" value=\"" + result.user.email + "\"/>" +
                    "</div>" +
                    "<div class=\"input-group form-group\">" +
                    "<img src=\"" + result.user.photoURL + "\" alt=\"IMAGEN\" width=\"100\" height=\"100\">" +
                    "</div>" +
                    "<button type='button' class='btn btn-danger' onclick='accessSale()'>Acceder</button>" +
                    "</div>";
                $('.card').html(html);
                location.href('pages/sale.html');
            })
            .catch(error => {
                console.log(error);
            });
    });
});