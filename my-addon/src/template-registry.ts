import type NavigationMenuComponent from './components/navigation-menu.gts';
import type UiPageComponent from './components/ui/page.gts';

export default interface MyAddonRegistry {
  NavigationMenu: typeof NavigationMenuComponent;
  'Ui::Page': typeof UiPageComponent;
}
