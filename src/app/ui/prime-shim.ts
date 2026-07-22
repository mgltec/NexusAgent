/**
 * Compatibility shim that replaces the `primeng/api` import surface the app
 * relied on. Only the types/services actually used by this project are kept.
 * This lets us uninstall PrimeNG without touching every consumer.
 */
export { MessageService, type Message } from './message.service';

/** Minimal TreeNode contract (subset of PrimeNG's). */
export interface TreeNode<T = any> {
  label?: string;
  data?: T;
  icon?: string;
  expandedIcon?: string;
  collapsedIcon?: string;
  children?: TreeNode<T>[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: TreeNode<T>;
  key?: string;
  selectable?: boolean;
  styleClass?: string;
  [klass: string]: any;
}

/** Minimal MenuItem contract (subset of PrimeNG's). */
export interface MenuItem {
  label?: string;
  icon?: string;
  routerLink?: any;
  url?: string;
  command?: (event?: any) => void;
  items?: MenuItem[];
  disabled?: boolean;
  visible?: boolean;
  expanded?: boolean;
  separator?: boolean;
  styleClass?: string;
  [key: string]: any;
}

/** Minimal SortEvent contract. */
export interface SortEvent {
  data?: any[];
  mode?: string;
  field?: string;
  order?: number;
  multiSortMeta?: any[];
}
