import type NavigationMenuComponent from './components/navigation-menu.gts';
import type UiPageComponent from './components/ui/page.gts';

export default interface MyAddonRegistry {
  'navigation-menu': typeof NavigationMenuComponent;
  NavigationMenu: typeof NavigationMenuComponent;
  'Ui::Page': typeof UiPageComponent;
  'ui/page': typeof UiPageComponent;
}
