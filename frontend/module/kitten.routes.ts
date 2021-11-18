import { Ng2StateDeclaration } from '@uirouter/angular';
import { KittenPageComponent } from 'core-app/features/plugins/linked/openproject-proto_plugin/kitten-page/kitten-page.component';

export const KITTEN_ROUTES:Ng2StateDeclaration[] = [
  {
    name: 'kittens',
    url: '/angular_kittens',
    component: KittenPageComponent,
  },
];