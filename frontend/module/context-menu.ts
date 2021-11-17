import {
  WorkPackageAction,
} from 'core-app/features/work-packages/components/wp-table/context-menu-helper/wp-context-menu-helper.service';

const action:WorkPackageAction = {
    text: 'Create Kittens',
    key: 'newactionkey',
    link: '/angular_kittens',
}

export const menuItem = {
  class: undefined as string|undefined,
  disabled: false,
  linkText: action.text,
  href: action.href,
  icon: action.icon != null ? action.icon : `icon-${action.key}`,
  onClick: (_:JQuery.TriggeredEvent) => {
    // do something
    window.location.href=action.link!
    return true;
  },
}
