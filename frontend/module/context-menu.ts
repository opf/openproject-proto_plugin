import { WorkPackageAction } from "core-app/features/work-packages/components/wp-table/context-menu-helper/wp-context-menu-helper.service";
import { WorkPackageResource } from "core-app/features/hal/resources/work-package-resource";

/*  
  USAGE: import kittenAction, kittenActionHandler into OpenProject core in the wp-context-menu-directive file
  
  Step 1: in the buildItems function edit the following line to include the plugins actions
  
  const items = this.permittedActions.map((action:WorkPackageAction) => ({
  to
  const items = this.permittedActions.concat([kittenAction]).map((action:WorkPackageAction) => ({

  Step 2: in the triggerContextMenuAction function add a case for the kitten action

    case (kittenAction as WorkPackageAction).key:
      kittenActionHandler(this.getSelectedWorkPackages());
      break;

  icons are located in /vendor/openproject-icon-font/src/icon.svg
  if no icon is defined, then the key name is used to match an icon.
*/

type WorkPackagesHandler = (workPackages: WorkPackageResource[]) => void;

// TODO? menu item is shown when not logged in. should be hidden?
export const kittenAction: WorkPackageAction = {
  text: "Create Kittens",
  key: "createkittens",
  link: "/angular_kittens",
  href: undefined,
  icon: 'icon-info1',
  indexBy: undefined,
};

export const kittenActionHandler: WorkPackagesHandler = (workPackages: WorkPackageResource[]) => {
  window.location.href = kittenAction.link + '?ids=' + workPackages.map(wp => wp.id).join(',');
};
