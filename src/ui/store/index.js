import { initialiseStores } from '@@/src/ui/utils/store-accessor'
const initializer = (store) => initialiseStores(store)
export const plugins = [initializer]
export * from '@@/src/ui/utils/store-accessor'
