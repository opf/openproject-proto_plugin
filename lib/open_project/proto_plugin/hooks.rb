module OpenProject::ProtoPlugin
  ##
  # Given a hook name as defined in the core the main way to call it is defining
  # a method with the same name in your Hook class (e.g. view_layouts_base_sidebar here).
  #
  # Alternatively you can use the `render_on` helper as shown for the `homescreen_after_links`
  # and the `view_layouts_base_html_head` hooks.
  class Hooks < OpenProject::Hook::ViewListener
    # here we render a partial
    render_on :homescreen_after_links, partial: 'hooks/proto_plugin/homescreen_after_links'

    ##
    # Any string returned by this method will be rendered at the position of
    # the `view_layouts_base_sidebar` hook. Here we want to use a partial
    # which is why we use the controller's `render_to_string` method.
    #
    # You may also just return a string directly, though.
    def view_layouts_base_sidebar(context={})
      context[:controller].send(:render_to_string, {
        :partial => "hooks/proto_plugin/view_layouts_base_sidebar",
        :locals => context
      })
    end

    ##
    # This is a controller hook. It doesn't render anything. Its return value
    # may be used by the callsite of the hook. Though it's not used most of the time.
    def controller_account_success_authentication_after(context={})
      context[:controller].flash[:kittens] = "Yay! Welcome #{context[:user].firstname}!"
    end
  end
end
