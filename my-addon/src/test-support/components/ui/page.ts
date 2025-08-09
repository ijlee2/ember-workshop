import styles from '../../../components/ui/page.module.css';

type LocalClass = keyof typeof styles;

export function getClassForUiPage(localClass: LocalClass): string {
  return styles[localClass];
}
