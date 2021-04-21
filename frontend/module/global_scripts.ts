/**
 * Global scripts that will be executed on every page load
 * We recommend to use angular pages / components instead
 */

import * as jQuery from 'jquery';

(function($) {
  $(document).ready(function() {

    // OpenProject logo gets thick red border on mouse hover.
    $("#logo").hover(
      function enter() {
        $(this).attr("style", "border: 3px solid red;");
      },
      function leave() {
        $(this).removeAttr("style");
      }
    );

    // Widget box emphasized by giving it a nice red border.
    $('#proto-plugin-block').parent().addClass('proto-plugin-widget-box');

    console.log(I18n.t('js.proto_plugin_name') + ' OK');
  });
})(jQuery);
