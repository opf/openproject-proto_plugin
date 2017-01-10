// Plain Javascript goes here. This is outside the angular application context.
// The file has to be included into the page first via
//
//   <%= javascript_include_tag 'proto_plugin/main', plugin: :openproject_proto_plugin %>
//
// For this example plugin the file is included into every page through the
// :header_tags view hook (see `lib/open_project/proto_plugin/hooks.rb`).

jQuery(document).ready(function() {
  jQuery("#logo").hover(
    function enter() {
      jQuery(this).attr("style", "border: 3px solid red;");
    },
    function leave() {
      jQuery(this).removeAttr("style");
    }
  );
});
