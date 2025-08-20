/// <reference types="vitest" />
/// <reference types="@vue/test-utils" />
/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
