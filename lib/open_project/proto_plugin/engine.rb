# Prevent load-order problems in case openproject-plugins is listed after a plugin in the Gemfile
# or not at all
require 'open_project/plugins'

module OpenProject::ProtoPlugin
  class Engine < ::Rails::Engine
    engine_name :openproject_proto_plugin

    include OpenProject::Plugins::ActsAsOpEngine

    register 'openproject-proto_plugin',
             :author_url => 'https://openproject.org',
             :requires_openproject => '>= 6.0.0'

    initializer 'proto_plugin.register_hooks' do
      require 'open_project/proto_plugin/hooks'
    end

    initializer 'proto_plugin.menu_items' do
      # TBD
    end

    initializer 'proto_plugin.homescreen_blocks' do
      OpenProject::Static::Homescreen.manage :blocks do |blocks|
        blocks.push(
          { partial: 'homescreen_block', if: Proc.new { true } }
        )
      end
    end

    assets %w(proto_plugin/main.css proto_plugin/main.js kitty.png)
  end
end
