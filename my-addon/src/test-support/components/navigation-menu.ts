import styles from '../../components/navigation-menu.module.css';

type LocalClass = keyof typeof styles;

export function getClassForNavigationMenu(localClass: LocalClass): string {
  return styles[localClass];
}
