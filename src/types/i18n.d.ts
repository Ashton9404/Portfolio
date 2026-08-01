import 'vue-i18n'

import type { MessageSchema } from '@/i18n'

/*
  Declaring the schema globally means every t('...') call in every component is
  key-checked and auto-completed, without passing type parameters to useI18n().
*/
declare module 'vue-i18n' {
  // The empty body is the point: this is interface merging, not a new type.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends MessageSchema {}
}
