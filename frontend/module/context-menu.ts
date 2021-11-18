import { WorkPackageAction } from "core-app/features/work-packages/components/wp-table/context-menu-helper/wp-context-menu-helper.service";
import { WorkPackageResource } from "core-app/features/hal/resources/work-package-resource";

/*  
  USAGE: import kittenAction into OpenProject core in thw wp-context-menu-directive file
  in the buildItems function edit the following line to include the plugins actions
  
  const items = this.permittedActions.map((action:WorkPackageAction) => ({
  
  to

  const items = this.permittedActions.concat([kittenAction]).map((action:WorkPackageAction) => ({
*/

type WorkPackagesHandler = (workPackages: WorkPackageResource[]) => void;

// TODO handle not logged in
// icons are located in /vendor/openproject-icon-font/src/icon.svg
// if no icon is defined, then the key name is used to match an icon.
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
