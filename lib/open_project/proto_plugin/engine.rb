# Prevent load-order problems in case openproject-plugins is listed after a plugin in the Gemfile
# or not at all
require 'open_project/plugins'

module OpenProject::ProtoPlugin
  class Engine < ::Rails::Engine
    engine_name :openproject_proto_plugin

    include OpenProject::Plugins::ActsAsOpEngine

    register 'openproject-proto_plugin',
             :author_url => 'http://finn.de',
             :requires_openproject => '>= 6.0.0'

  end
end
