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

import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {KittenComponent} from "core-app/modules/plugins/linked/openproject-proto_plugin/kitten-component/kitten.component";
import {HookService} from "core-app/modules/plugins/hook-service";

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
  ],
  providers: [
    // This initializer gets called when the Angular frontend is being loaded by the core
    // use it to hook up global listeners or bootstrap components
    { provide: APP_INITIALIZER, useFactory: initializeProtoPlugin, deps: [Injector], multi: true },
  ],
  declarations: [
    // Declare the component for angular to use
    KittenComponent
  ],
  entryComponents: [
    // Special case: Declare the component also as a bootstrap component
    // as it is being rendered from Rails.
    KittenComponent
  ]
})
export class PluginModule {
}



