//'use strict';

var MX = MX || {};

// Variable de la URL que se encuentra en Gruntfile.js para obtener la URl segun ambiente.
MX.root ='https://framework-gb.cdn.gob.mx/';
MX.emailService = '//www.gob.mx/subscribe';
MX.trackingID = '';


MX.comscore = 'gobmx';
MX.path = MX.root + 'assets/';
MX.imagesPath = MX.path + 'images/';
MX.scriptsPath = MX.path + 'scripts/';
MX.stylesPath = MX.path + 'styles/';

MX.gobmxPath = 'https://www.gob.mx/';

/**
 * [getParse URL parse current URL]
 * @return {[string]} [url ID]
 */
var getParseURL = function() {
    var urlHost     = window.location.host,
        urlPath     = window.location.pathname,
        host        = urlHost.toLowerCase().split( '.' ),
        path        = urlPath.toLowerCase(),
        hostClean   = host.slice( 0, 2 ).join( '.' ),
        pathClean;

    if ( !isNaN( host[ 0 ] ) ) hostClean = urlHost;

    if ( path.indexOf( '.' ) !== -1 ) {
        var _end = path.indexOf( '.' );
        path = path.substring( 0, _end );
    }

    if ( path.indexOf( '#' ) !== -1 ) {
        var _end = path.indexOf( '#' );
        path = path.substring( 0, _end );
    }

    if ( path.indexOf( '?' ) !== -1 ) {
        var _end = path.indexOf( '?' );
        path = path.substring( 0, _end );
    }

    if ( path === '/' ) path = '/index';

    pathClean = path.replace(/\//g, ".");

    return hostClean + pathClean;
}

MX.trackingID = getParseURL();

MX.isMetaHelper = function() {
  var metas = document.getElementsByTagName('meta');

  function isMeta() {
    for (var i = 0; i < metas.length; i++) {
      if ( metas[i].getAttribute('property') === 'gobmxhelper') {
        return metas[i].getAttribute('content');
      }
    }
  }
  if( isMeta() === 'no plugins') { return true; } else { return false; }
}

if( !MX.isMetaHelper() ) {
  var WebFontConfig = {
    google: { families: [ 'Open+Sans:300italic,400italic,400,300,600,700:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
}


MX.secBuilder = function () {
	var body = $('body');

	var navBar =
	'<header>'+
		'<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">'+
			'<div class="container">'+
			  '<div class="navbar-header">'+
			    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarMainCollapse">'+
			      '<span class="sr-only">Interruptor de Navegaci&oacute;n</span>'+
			      '<span class="icon-bar"></span>'+
			      '<span class="icon-bar"></span>'+
			      '<span class="icon-bar"></span>'+
			    '</button>'+
			    '<a class="navbar-brand" href="' + MX.gobmxPath + '">'+
            '<img src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg" width="128" height="48" alt="Página de inicio, Gobierno de México">'+
			      // '<img src="' + MX.imagesPath + 'gobmxlogo-3.svg" width="75" height="23" alt="Página de inicio, Gobierno de México">'+
			    '</a>'+
			  '</div>'+
			  '<div class="collapse navbar-collapse" id="navbarMainCollapse">'+
			    '<ul class="nav navbar-nav navbar-right">'+
			      '<li><a href="' + MX.gobmxPath + 'tramites">Tr&aacute;mites</a></li>'+
			      '<li><a href="' + MX.gobmxPath + 'gobierno">Gobierno</a></li>'+
			      '<li><a href="' + MX.gobmxPath + 'busqueda"><span class="sr-only">B&uacute;squeda</span><i class="icon-search"></i></a></li>'+            
			    '</ul>'+
			  '</div>'+
			'</div>'+
		'</nav>'+
	'</header>';

  var footer =
  '<footer class="main-footer">'+
    '<div class="list-info">'+
      '<div class="container">'+
        '<div class="row">'+
          '<div class="col-sm-3">'+
            '<img data-v-9e928f9a="" src="https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg" href="/" alt="logo gobierno de méxico" class="logo_footer" style="max-width: 90%;">'+ 
          '</div>'+
          '<div class="col-sm-3">'+
            '<h5>Enlaces</h5>'+
            '<ul>'+
              '<li><a href="https://participa.gob.mx" target="_blank" rel="noopener" title="Enlace abre en ventana nueva">Participa</a></li>' +
              '<li><a href="https://www.gob.mx/publicaciones" target="_blank" rel="noopener" title="Enlace abre en ventana nueva">Publicaciones Oficiales</a></li>' +
              '<li><a href="http://www.ordenjuridico.gob.mx" target="_blank" rel="noopener" title="Enlace abre en ventana nueva">Marco Jurídico</a></li>'+
              '<li><a href="https://consultapublicamx.inai.org.mx/vut-web/" target="_blank" rel="noopener" title="Enlace abre en ventana nueva">Plataforma Nacional de Transparencia</a></li>'+
            '</ul>'+
          '</div>'+
          '<div class="col-sm-3">'+
            '<h5>&iquest;Qu&eacute; es gob.mx?</h5>'+
            '<p>Es el portal &uacute;nico de tr&aacute;mites, informaci&oacute;n y participaci&oacute;n ciudadana. <a href="' + MX.gobmxPath + 'que-es-gobmx">Leer m&aacute;s</a></p>'+
              '<ul>'+
                '<li><a href="https://datos.gob.mx">Portal de datos abiertos</a></li>'+
                '<li><a href="' + MX.gobmxPath + 'accesibilidad">Declaración de accesibilidad</a></li>'+
                '<li><a href="' + MX.gobmxPath + 'privacidadintegral">Aviso de privacidad integral</a></li>'+
                '<li><a href="' + MX.gobmxPath + 'privacidadsimplificado">Aviso de privacidad simplificado</a></li>'+
                '<li><a href="' + MX.gobmxPath + 'terminos">T&eacute;rminos y Condiciones</a></li>'+
                '<li><a href="' + MX.gobmxPath + 'terminos#medidas-seguridad-informacion">Política de seguridad</a></li>'+
                '<li><a href="' + MX.gobmxPath + 'sitemap">Mapa de sitio</a></li>'+
              '</ul>'+
          '</div>'+
          '<div class="col-sm-3">'+
            '<h5><a href="' + MX.gobmxPath + 'tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54">Denuncia contra servidores públicos</a></h5>'+
            '<h5>S&iacute;guenos en</h5>'+
            '<ul class="list-inline">'+
              '<li><a class="social-icon facebook" target="_blank" rel="noopener" title="Enlace abre en ventana nueva" href="https://www.facebook.com/gobmexico" aria-label="Facebook de presidencia"></a></li>'+
              '<li><a class="social-icon twitter" target="_blank" rel="noopener" title="Enlace abre en ventana nueva" href="https://twitter.com/GobiernoMX" aria-label="Twitter de presidencia"></a></li>'+
            '</ul>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="container-fluid footer-pleca">'+
      '<div class="row">'+
        '<div class="col">'+
          '<br>'+
          '<br>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</footer>';

	body.prepend(navBar);
	body.append(footer);

  /* --- boton de suscribete --- */

  $('body').on( 'click', '#subscribe', function(e){
    e.preventDefault();

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var dataString = $('#email').serialize();
    var email = $('#email').val();
    var url = MX.emailService;
    var successMessage = 'Agradecemos tu registro dentro de gob.mx. De esta manera estar&aacute;s informado sobre las principales acciones y decisiones del Gobierno de la Rep&uacute;blica.<br><br>Gracias por tu inter&eacute;s y colaboraci&oacute;n. Juntos construimos <a href="/">gob.mx</a>';
    var registeredMessage = 'Este correo electr&oacute;nico ya ha sido registrado.';
    var failMessage = 'No se pudo registrar el correo electr&oacute;nico.';
    var validEmail = 'Ingrese un email v&aacute;lido';

    if($.trim(email).length == 0 || re.test(email) === false) {
        $('.message-subscribe').removeClass("hidden").html(validEmail);
        return false;
    } else {
        $('.message-subscribe').addClass("hidden").html();

        $.ajax({
            type: 'POST',
            data: "email="+ $('#email').val(),
            dataType: 'json',
            url: url
        }).done( function( data ) {
            if( data.status == 'error') {
              $('.message-subscribe').removeClass("hidden").html(registeredMessage);
            } else {
              $('#email').val('');
              $('#email').prop('disabled', true);
              $('.message-subscribe').removeClass("hidden").html(successMessage);
            }
        }).fail( function() {
            $('.message-subscribe').removeClass("hidden").html(failMessage);
        });
    }
    return false;
  });

};

$(function(){
	MX.secBuilder();
  if (!Modernizr.svg) {
      var imgs = document.getElementsByTagName('img');
      var svgExtension = /.*\.svg$/;
      var l = imgs.length;
      for(var i = 0; i < l; i++) {
          if(imgs[i].src.match(svgExtension)) {
              imgs[i].src = imgs[i].src.slice(0, -3) + 'png';
          }
      }
  }

  /**
   * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
   */
  function reposition() {
    var modal = $(this),
        dialog = modal.find('.modal-dialog');
    modal.css('display', 'block');

    // Dividing by two centers the modal exactly, but dividing by three
    // or four works better for larger screens.
    dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
  }

  // Reposition when a modal is shown
  $('.modal').on('show.bs.modal', reposition);

  // Reposition when the window is resized
  $(window).on('resize', function() {
    $('.modal:visible').each(reposition);
  });

});

