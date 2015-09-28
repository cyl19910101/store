define( function ( require ) {
    "use strict";

    var $ = require( 'jquery' );

    var logoutBtnHTML = '<a id="logoutBtn" class="config-navbar-brand"><span class="glyphicon glyphicon-log-out"></span></a>';
    var manageBtnHTML = '<a href="/manage/admin" class="config-navbar-brand"><span class="glyphicon glyphicon-cog"></span></a>';
    var userBtnHTML   = '<a href="/user" class="config-navbar-brand"><span class="glyphicon glyphicon-user"></span></a>';
    var cartBtnHTML   = '<a href="/cart" class="config-navbar-brand"><span class="glyphicon glyphicon-shopping-cart"></span></a>';

    var logout = function () {
        //set req to server to destroy token
        if ( localStorage.getItem( 'token' ) ) {
            $.ajax( {
                url     : '/api/v1/accessToken',
                method  : 'DELETE',
                success : function () {
                    localStorage.removeItem( 'token' );
                    window.location.href = '/';
                },
                error   : function () {
                    //TODO:
                    alert( '注销失败！' );
                }
            } );
        }
        else {
            alert( '尚未登录！' );
        }
    };

    //config user area, show logout btn etc
    function initAccountAreaUI() {
        if ( authorization.isAuthenticated() ) {
            if ( authorization.getTokenRole() === 'admin' ) {
                $( '#accountArea' ).html( manageBtnHTML + logoutBtnHTML );
                $( '#logoutBtn' ).click( logout );
            }
            else if ( authorization.getTokenRole() === 'customer' ) {
                $( '#accountArea' ).html( userBtnHTML + cartBtnHTML + logoutBtnHTML );
                $( '#logoutBtn' ).click( logout );
            } else if ( authorization.getTokenRole() === 'merchant' ) {
                //TODO:
            } else {
                //TODO:error
            }
        }
        else {
            $( '#accountArea' ).html( userBtnHTML + cartBtnHTML );
        }
    }

    var _a = function () {
    };

    _a.prototype = {
        initAccountAreaUI : initAccountAreaUI
    };
    return new _a();
} );
