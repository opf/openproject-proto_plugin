// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2018 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.

/**
 * This file will be symlinked into the angular compiler project
 * at the OpenProject core frontend folder.
 *
 * From here, you can work with anything angular related just in the core.
 * When developing, we recommend you run the script `./bin/setup_dev` in the OpenProject
 * core first, and then develop the frontend in the frontend/src/app/modules/plugins/linked/ folder.
 *
 * This will allow your IDE to pick up the angular project and provide import assistance and so on.
 */

import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {KittenComponent} from "core-app/features/plugins/linked/openproject-proto_plugin/kitten-component/kitten.component";
import {HookService} from "core-app/features/plugins/hook-service";

import './global_scripts'
import {KITTEN_ROUTES} from 'core-app/features/plugins/linked/openproject-proto_plugin/kitten.routes';
import {UIRouterModule} from '@uirouter/angular';
import {KittenPageComponent} from 'core-app/features/plugins/linked/openproject-proto_plugin/kitten-page/kitten-page.component';

export function initializeProtoPlugin(injector:Injector) {
  return () => {
    const hookService = injector.get(HookService);

    // Explicitly bootstrap the kitten component in the DOM if it is found
    // Angular would otherwise only bootstrap the global entry point bootstrap from the core
    // preventing us from using components like this kitten component
    hookService.register('openProjectAngularBootstrap', () => {
      return [
        { selector: 'kitten-component', cls: KittenComponent }
      ];
    });
  };
}

@NgModule({
  imports: [
    CommonModule,
    UIRouterModule.forChild({ states: KITTEN_ROUTES })
  ],
  providers: [],
  declarations: [
    // Declare the component for angular to use
    KittenComponent,
    KittenPageComponent,
  ],
})

export class PluginModule {
  constructor(injector:Injector) {
    initializeProtoPlugin(injector);
  }
}
