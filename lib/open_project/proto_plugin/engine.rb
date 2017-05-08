# Prevent load-order problems in case openproject-plugins is listed after a plugin in the Gemfile
# or not at all
require 'open_project/plugins'

module OpenProject::ProtoPlugin
  class Engine < ::Rails::Engine
    engine_name :openproject_proto_plugin

    include OpenProject::Plugins::ActsAsOpEngine

    register(
      'openproject-proto_plugin',
      :author_url => 'https://openproject.org',
      :requires_openproject => '>= 6.0.0'
    ) do
      # We define a new project module here for our controller including a permission.
      # The permission is necessary for us to be able to add menu items to the project
      # menu. You will not need to add a permission for adding menu items to the `top_menu`
      # or `admin_menu`, however.
      #
      # You may have to enable the project module ("Kittens module") under project
      # settings before you can see the menu entry.
      project_module :kittens_module do
        permission :view_kittens, { kittens: [:index] }
      end

      menu :project_menu,
           :kittens,
           { controller: '/kittens', action: 'index' },
           after: :overview,
           param: :project_id,
           caption: "Kittens",
           icon: 'icon2 icon-bug',
           html: { id: "kittens-menu-item" },
           if: ->(project) { true }
    end

    initializer 'proto_plugin.register_hooks' do
      require 'open_project/proto_plugin/hooks'
    end

    initializer 'proto_plugin.homescreen_blocks' do
      OpenProject::Static::Homescreen.manage :blocks do |blocks|
        blocks.push(
          { partial: 'homescreen_block', if: Proc.new { true } }
        )
      end
    end

    initializer 'proto_plugin.notifications' do
      OpenProject::Notifications.subscribe 'user_invited' do |token|
        user = token.user

        Rails.logger.debug "#{user.mail} invited to OpenProject"
      end
    end

    assets %w(proto_plugin/main.css proto_plugin/main.js kitty.png)
  end
end
