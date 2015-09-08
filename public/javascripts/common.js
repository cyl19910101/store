require.config({
  baseUrl: 'javascripts',
  shim: {
    '_BS': {deps: ['jquery']},
    '_BS_OFF': {deps: ['jquery', '_BS']},
    '_BS_FI_INPUT': {deps: ['jquery', '_BS']},
    '_BS_FI_INPUT_LAN': {deps: ['jquery', '_BS', '_BS_FI_INPUT']}
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',
    _BS: '../bower_components/bootstrap/dist/js/bootstrap.min',
    _BS_OFF: '../bower_components/bootstrap-offcanvas/dist/js/bootstrap.offcanvas.min',
    _BS_FI_INPUT: '../bower_components/bootstrap-fileinput/js/fileinput.min',
    _BS_FI_INPUT_LAN: '../bower_components/bootstrap-fileinput/js/fileinput_locale_zh'
  }
});
