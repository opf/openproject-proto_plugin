// Plain Javascript goes here. This is outside the angular application context.
// The file has to be included into the page first via
//
//   <%= javascript_include_tag 'proto_plugin/main', plugin: :openproject_proto_plugin %>
//
// For this example plugin the file is included into every page through the
// :header_tags view hook (see `lib/open_project/proto_plugin/hooks.rb`).

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

      console.log(I18n.t('proto_plugin_name') + ' OK');
    });
})(jQuery);
