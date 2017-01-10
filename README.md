# OpenProject Proto Plugin

In this plugin we try to give you an idea on how to write an OpenProject plugin.
Examples of doing the most common things a plugin may want to do are included.

To get started quickly you may just copy this plugin and remove the bits you don't need.

## Controllers

Relevant files:

* `app/controllers/kittens_controller.rb`
* `app/views/kittens/index.html.erb`

## Assets

Relevant files:

* `lib/open_project/engine.rb` - assets statement at the end of the engine
* `lib/open_project/hooks.rb` - The Javascript and Stylesheet are included through here.
* `app/javascripts/proto_plugin/main.js`
* `app/stylesheets/proto_plugin/main.scss`
* `app/assets/images/kitty.png`

## Menu Items

Relevant files:

* `lib/open_project/engine.rb` - `proto_plugin.menu_items` initializer

## Homescreen Blocks

Relevant files:

* `lib/open_project/engine.rb` - `proto_plugin.homescreen_blocks` initializer
* `app/views/homescreen/blocks/_homescreen_block.html.erb`

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
