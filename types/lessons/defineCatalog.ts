import type { Catalog } from './catalog';

export const defineCatalog = <T extends Catalog>(catalog: T) => catalog;
