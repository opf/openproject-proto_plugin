# OpenProject Prototype Plugin

In this plugin we try to give you an idea on how to write an OpenProject plugin. Examples of doing the most common things a plugin may want to do are included.

To get started quickly you may just copy this plugin, remove the bits you don't need and modify/add the features you want.


## Pre-requisites

In order to be able to continue, you will first have to have the following items installed:

* Ruby 2.x
* Ruby on Rails 5.x
* Node 6.x, npm 4.x and bundle

We are assuming that you understand how to develop Ruby on Rails applications and are familiar with controllers, views, asset management, hooks and engines.

The frontend can be written using plain-vanilla JavaScript, but if you choose to integrate directly with the OpenProject frontend then you will have to understand the AngularJS framework.


## Getting started

To include this plugin, you need to create a file called `Gemfile.plugins` in your OpenProject directory with the following contents:

```
group :opf_plugins do
  gem "openproject-proto_plugin", git: "git@github.com:opf/openproject-proto_plugin.git", branch: "master"
end
```

As you may want to play around with and modify the plugin locally, you may want to check it out and use the following instead:

```
group :opf_plugins do
  gem "openproject-proto_plugin", path: "/path/to/openproject-proto_plugin"
end
```

If you already have a `Gemfile.plugins` just add the line "gem" line to it inside the `:opf_plugins` group.

Once you've done that run:

```
$ bundle install
$ bundle exec rails db:migrate # creates the models from the plugin
$ bundle exec rails db:seed # creates default data from the plugin's seeder (`app/seeders`)
$ bundle exec rails assets:webpack
```

Start the server using:

```
$ bundle exec rails s
```

In order to verify that the plugin has been installed correctly, go to the Administration Plugins Page at `/admin/plugins` and you should be able to find your plugin in the list.

![](images/admin-plugins-page.png?raw=true | width=400)

In the following sections we will explain some common features that you may want to use in your own plugin. This plugin has already been setup with the basic framework to illustrate all these features.

Each section will list the relevant files you may want to look at and explain the features. Beyond that there are also code comments in the respective files which provide further details.

### Rails generators

The plugin comes with an executable `bin/rails` which you can use when calling rails generators for generating everything. You will have to define `OPENPROJECT_ROOT` in your environment for it to work unfortunately, because the plugin requires the core to load.

By `core` we mean the directory under which you originally checked out the OpenProject repository:

```
$ git clone https://github.com/opf/openproject.git ~/dev/openproject/core
$ git checkout dev
```

So for example, should the core be located under under `~/dev/openproject/core` you can set it like this, for instance in your `.bashrc`:

```
export OPENPROJECT_ROOT=~/dev/openproject/core
```

or you can just prepend the relevant rails commands like this:

```
$ OPENPROJECT_ROOT=~/dev/openproject/core rails generate ...
```

Once you've set that up you can use the rails generators as usual.

For instance this is how you could **generate a model**:

```
$ bundle exec rails generate model Kitten name:string --no-test-framework
      invoke  active_record
      create    db/migrate/20170116125942_create_kittens.rb
      create    app/models/application_record.rb
      create    app/models/kitten.rb
```

As you can see a file `application_record.rb` is generated, too. This is new and came with Rails 5. The core should define this class itself. However, it doesn't yet which is an oversight. Once that is fixed you can delete that file. For the time being though you can leave it.

Finally, don't forget to run the migration from the core directory:

```
$ cd $OPENPROJECT_ROOT
$ bundle exec rails db:migrate
```

Now let's double-check that our Kittens table as been seeded:

```$ rails c
Loading development environment (Rails 5.0.1)

Frame number: 0/5
[1] pry(main)> Kitten.pluck(:name)
   (0.3ms)  SELECT `kittens`.`name` FROM `kittens`
=> ["Klaus", "Herbert", "Felix"]
```

Make sure that the application is running (`bundle exec rails s`) and go to `http://localhost:3000/kittens`. You should see something like this:

![](images/kittens-main-page.png?raw=true | width=400)

Great, we're on our way.

### Specs

The relevant files for the specs are:

* `spec/controllers/kittens_controller_spec.rb`

You have to run the specs from within the core. For instance:

```
$ cd $OPENPROJECT_ROOT
$ RAILS_ENV=test bundle exec rspec `bundle show openproject-proto_plugin`/spec/controllers/kittens_controller_spec.rb
```

**Travis CI**

A special `.travis.yml` and `Gemfile.plugins` are included which allow you to have Travis run
the specs for your plugin along with the core specs. This is a good way to test if your plugin
works properly in conjunction with the core.

## Seeders

The relevant files for the seeders are:

* `app/seeders/kittens_seeder.rb` - Creates example records.

You can define so called "Seeders" for your plugin which get called when `rake db:seed` is run in the core. For example:

```
$ cd OPENPROJECT_ROOT
$ rake db:seed
```

The plugin defines a `KittenSeeder` which creates a few example rows to be displayed in the `KittensController`.

A plugin's seeders have to be defined under its namespace within the `BasicData` module, for instance `BasicData::ProtoPlugin::KittensSeeder`.
They will be discovered and invoked by the core automatically.

## Models

The relevant files for the models are:

* `app/models/kitten.rb` - the code for the model where you can add validations etc.
* `app/models/application_record.rb` - auto-generated base record
* `db/migrate/20170116125942_create_kittens.rb` - database migration

The models work as usual in Rails applications.

## Controllers

The relevant files for the controllers are:

* `app/controllers/kittens_controller.rb` - main controller with `:index` entry point
* `app/views/kittens/index.html.erb` - main template for kittens index view

The controllers work as expected for Rails applications.

## Assets

The relevant files for the assets are:

* `lib/open_project/proto_plugin/engine.rb` - assets statement at the end of the engine.
* `lib/open_project/proto_plugin/hooks.rb` - the JavaScript and Stylesheet are included here.
* `app/assets/javascripts/proto_plugin/main.js` - main entry point for plain JavaScript and document ready hook.
* `app/assets/stylesheets/proto_plugin/main.scss` - good ol' Sass stuff.
* `app/assets/images/kitty.png` - a nice kitty image.

Any additional assets you want to use have to be registered for pre-compilation in the engine like this:

```
assets %w(proto_plugin/main.css proto_plugin/main.js kitty.png)
```

You don't technically have to put the assets into a subfolder with the same name as your plugin. But it's highly recommended to do so in order to avoid naming conflicts. For example, if the image `kitty.png` is not scoped, it might conflict with the core if it were also to include another asset named `kitty.png` too.


## Frontend

The relevant files for the frontend are:

* `package.json`
* `frontend/app/openproject-proto_plugin-app.js`
* `frontend/app/controllers/kittens.js`
* `app/views/kittens/index.html.erb`

If you want to work within the frontend's AngularJS app you will need to provide a `package.json`. Take a look at the `frontend` folder to see an example Angular controller which is used in the "kittens" index view.

Any changes made to the frontend require running webpack to update. To do that go to the OpenProject folder (NOT the plugin directory) and execute the following command:

```
$ npm run webpack
```


## Menu Items

The relevant files for the menu items are:

* `lib/open_project/proto_plugin/engine.rb` - register block in the beginning
* `app/controllers/kittens_controller.rb`

Registering new user-defined menu items is easy. For instance, let's assume that you want to add a new item to the project menu. Just add the following to the `engine.rb` file:

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

You are then free to enable the "Kittens module" for a given project by going to that "Project settings" page, for example `/projects/demo-project/settings/modules` and checking the checkbox.

![](images/enable-kittens-module.png?raw=true | width=400)

The menu item will now appear on the top level project page as well as all sub-levels `/projects/demo-project/*`.

![](images/kittens-menu-item.png?raw=true | width=400)

You can add nested menu items by passing a `parent` option to the following items. For instance you could add a child menu item to the menu item shown above by adding `parent: :kittens` as another option.

There are a number of menus available from which to choose:

* top_menu
* account_menu
* application_menu
* my_menu
* admin_menu
* project_menu


## Homescreen Blocks

By default the homepage contains a number of blocks (widget boxes), namely: "Projects", "Users", "My account", "OpenProject community" and "Administration".

You can easily add your own user-defined block so that it will also appears on the homepage.

The relevant files for homescreen blocks are:

* `lib/open_project/proto_plugin/engine.rb` - `proto_plugin.homescreen_blocks` initializer
* `app/views/homescreen/blocks/_homescreen_block.html.erb`

In the file `engine.rb` you can register additional blocks in OpenProject's homescreen like this:

```
initializer 'proto_plugin.homescreen_blocks' do
  OpenProject::Static::Homescreen.manage :blocks do |blocks|
    blocks.push(
      { partial: 'homescreen_block', if: Proc.new { true } }
    )
  end
end
```

Where the `if` option is optional.

The partial file `_homescreen_block.html.erb` provides the template from which the contents of the block will be generated. Have a look at this file to get a better idea of the possibilities.

This is what you should now see on the homepage:

![](images/kitten-homescreen-block.png?raw=true | width=400)


## OpenProject::Notification listeners

The relevant files for notification listeners are:

* `lib/open_project/proto_plugin/engine.rb` - `proto_plugin.notifications` initializer

Although OpenProject has inherited hooks (see next section) from Redmine, it also employs its own mechanism for simple event callbacks. Their return values are ignored.

For example, you can be notified whenever a user has been invited to OpenProject by subscribing to the `user_invited` event. Add the following to the `engine.rb` file:

```
initializer 'proto_plugin.notifications' do
  OpenProject::Notifications.subscribe 'user_invited' do |token|
    user = token.user

    Rails.logger.debug "#{user.email} invited to OpenProject"
  end
end
```


### Events

Currently the supported events (_block parameters in parenthesis_) to which you can subscribe are:

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

Whenever a given setting changes, an event is triggered passing the previous and new values. For instance:

* `setting.host_name.changed` (value, old_value)

Where `host_name` is the name of the setting. You can find out all setting names simply by inspecting the relevant setting input field in the admin area in your browser or by listing them all on the rails console through `Setting.pluck(:name)`. Also have a look at `config/settings.yml` where all the default values for settings are defined by their name.


## Hooks

The relevant files for hooks are:

* `lib/open_project/engine.rb` - `proto_plugin.register_hooks` initializer
* `lib/open_project/hooks.rb`
* `app/views/hooks/proto_plugin/_homescreen_after_links.html.erb`
* `app/views/hooks/proto_plugin/_view_layouts_base_sidebar.html.erb`

Hooks can be used to extend views, controllers and models at certain predefined places. Each hook has a name for which a method has to be defined in your hook class, see `lib/open_project/proto_plugin/hooks.rb` for more details.

For example:

```
render_on :homescreen_after_links, partial: '/hooks/homescreen_after_links'
```

By using `render_on`, the given variables are made available as locals to the partial for that defined hook. Otherwise they will be available through the defined hook method's first and only parameter named `context`.

Additionally the following context information is put into context if available:

* project - current project
* request - Request instance
* controller - current Controller instance
* hook_caller - object that called the hook


### View Hooks

_Note: context variables placed within (parenthesis)_

Hooks in the base template:

* :view_layouts_base_html_head
* :view_layouts_base_sidebar
* :view_layouts_base_breadcrumb
* :view_layouts_base_content
* :view_layouts_base_body_bottom

More hooks:

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

_Note: context variables placed within (parenthesis)_

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


### More Hooks

_Note: context variables placed within (parenthesis)_

* :model_changeset_scan_commit_for_issue_ids_pre_issue_update (changeset, issue)
* :copy_project_add_member (new_member, member)
