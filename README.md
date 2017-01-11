# OpenProject Proto Plugin

In this plugin we try to give you an idea on how to write an OpenProject plugin.
Examples of doing the most common things a plugin may want to do are included.

To get started quickly you may just copy this plugin and remove the bits you don't need.

## Controllers

Relevant files:

* `app/controllers/kittens_controller.rb`
* `app/views/kittens/index.html.erb`

Controllers work as usual in Rails applications.

## Assets

Relevant files:

* `lib/open_project/engine.rb` - assets statement at the end of the engine
* `lib/open_project/hooks.rb` - The Javascript and Stylesheet are included through here.
* `app/javascripts/proto_plugin/main.js`
* `app/stylesheets/proto_plugin/main.scss`
* `app/assets/images/kitty.png`

Any assets you want to use have to be registered for pre-compilation in the engine like this:

```
assets %w(proto_plugin/main.css proto_plugin/main.js kitty.png)
```

You don't technically have to put the assets into a subfolder named after your plugin.
But it's recommended to avoid naming conflicts. The image (`kitty.png`) is not scoped and would conflict with the core if it were to include an asset called `kitty.png` too.

## Frontend

Relevant files:

* `package.json`
* `frontend/app/openproject-proto_plugin-app.js`
* `frontend/app/controllers/kittens.js`
* `app/views/kittens/index.html.erb`

If you want to work within the frontend's angular app you will need to provide a `package.json`.
Take a look at the `frontend` folder to see an example Angular controller which is used in the "kittens" index view.

Changes in the frontend require running webpack to update. For that run the following in the OpenProject folder (not the plugin):

```
npm run webpack
```

## Menu Items

Relevant files:

* `lib/open_project/engine.rb` - register block in the beginning
* `app/controllers/kittens_controller.rb`

You can register new menu items. For instance a project menu item like this:

```
menu :project_menu,
     :kittens,
     { controller: '/kittens', action: 'index' },
     after: :overview,
     param: :project_id,
     caption: "Kittens",
     html: { class: 'icon2 icon-bug', id: "kittens-menu-item" },
     if: ->(project) { true }
end
```

You can add nested menu items by passing a `parent` option to the following items.
For instance you could add a child menu item to the menu item shown above by adding
`parent: :kittens` as another option.

Menus:

* top_menu
* account_menu
* application_menu
* my_menu
* admin_menu
* project_menu

_Note: the example menu item registered in this plugin is only visible if you enable
the "Kittens module" in a project under "Project settings"._

## Homescreen Blocks

Relevant files:

* `lib/open_project/engine.rb` - `proto_plugin.homescreen_blocks` initializer
* `app/views/homescreen/blocks/_homescreen_block.html.erb`

You can register additional blocks in OpenProject's homescreen like this:

```
OpenProject::Static::Homescreen.manage :blocks do |blocks|
  blocks.push(
    { partial: 'homescreen_block', if: Proc.new { true } }
  )
end
```

The `if` option being optional.

## OpenProject::Notification listeners

Relevant files:

* `lib/open_project/engine.rb` - `proto_plugin.notifications` initializer

While OpenProject inherited hooks (see next section) from Redmine it also
employs its own mechanism for simple event callbacks. Their return values are discarded.

For example, you can be notified when a user has been invited to OpenProject like this:

```
OpenProject::Notifications.subscribe 'user_invited' do |token|
  user = token.user

  Rails.logger.debug "#{user.email} invited to OpenProject"
end
```

### Events

Currently there are the following events (block parameters in parenthesis_) you can subscribe too:

* user_invited (token)
* user_reinvited (token)
* project_updated (project)
* project_renamed (project)
* project_deletion_imminent (project)
* member_updated (member)
* member_removed (member)
* journal_created (payload)
* watcher_added (payload)

### Setting Events

For each setting an event will be triggered when it's changed. For instance:

* setting.host_name.changed (value, old_value)

Where `host_name` is the name of the setting. You can find out all setting names simply
by inspecting the relevant setting input field in the admin area in your browser or
by listing them all on the rails console through `Setting.pluck(:name)`. And then there's also `config/settings.yml` where all the default values for settings are defined under their name.

## Hooks

Relevant files:

* `lib/open_project/engine.rb` - `proto_plugin.register_hooks` initializer
* `lib/open_project/hooks.rb`
* `app/views/hooks/proto_plugin/_homescreen_after_links.html.erb`
* `app/views/hooks/proto_plugin/_view_layouts_base_sidebar.html.erb`

Hooks can be used to extend views, controllers and models at certain predefined
places. Each hook has a name for which a method has to be defined in your hook
class (see `lib/open_project/proto_plugin/hooks.rb` for further details).

Example:

```
render_on :homescreen_after_links, partial: '/hooks/homescreen_after_links'
```

The given variables are made available as locals in the provided partial
which is rendered for the hook if you use `render_on`. Otherwise they will
be available through the defined hook method's first and only parameter called `context`.

Additionally the following context information is also put into context if available:

* project - current project
* request - Request instance
* controller - current Controller instance
* hook_caller - object that called the hook

### View Hooks

_Note: context variables in parenthesis_

Hooks in the base template:

* :view_layouts_base_html_head
* :view_layouts_base_sidebar
* :view_layouts_base_breadcrumb
* :view_layouts_base_content
* :view_layouts_base_body_bottom

Further hooks:

* :view_account_login_auth_provider
* :view_account_login_top
* :view_account_login_bottom
* :view_account_register_after_basic_information (f) - f being a form helper
* :activity_index_head
* :view_admin_info_top
* :view_admin_info_bottom
* :view_common_error_details (params, project)
* :homescreen_administration_links
* :view_work_package_overview_attributes

Custom field form hooks:

* :view_custom_fields_form_upper_box (custom_field, form)
* :view_custom_fields_form_work_package_custom_field (custom_field, form)
* :view_custom_fields_form_user_custom_field (custom_field, form)
* :view_custom_fields_form_group_custom_field (custom_field, form)
* :view_custom_fields_form_project_custom_field (custom_field, form)
* :view_custom_fields_form_time_entry_activity_custom_field (custom_field, form)
* :view_custom_fields_form_version_custom_field (custom_field, form)
* :view_custom_fields_form_issue_priority_custom_field (custom_field, form)

### Controller Hooks

_Note: context variables in parenthesis_

* :controller_account_success_authentication_after (user)
* :controller_custom_fields_new_after_save (custom_field)
* :controller_custom_fields_new_after_save (custom_field)
* :controller_messages_new_after_save (params, message)
* :controller_messages_reply_after_save (params, message)
* :controller_timelog_available_criterias (available_criterias, project)
* :controller_timelog_time_report_joins (sql)
* :controller_timelog_edit_before_save (params, time_entry)
* :controller_wiki_edit_after_save (params, page)
* :controller_work_packages_bulk_edit_before_save (params, work_package)
* :controller_work_packages_move_before_save (params, work_package, target_project, copy)

### Further Hooks

_Note: context variables in parenthesis_

* :model_changeset_scan_commit_for_issue_ids_pre_issue_update (changeset, issue)
* :copy_project_add_member (new_member, member)
