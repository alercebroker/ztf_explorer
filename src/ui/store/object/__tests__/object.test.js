import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { getModule } from 'nuxt-property-decorator'
import { mockObjects } from '@app/object/domain'
import { HttpError } from '@shared/http'
import { ParseError } from '@shared/error'
import ObjectStore from './object'

const Vue = createLocalVue()
Vue.use(Vuex)

describe('ObjectStore', () => {
  const factory = (execute) => {
    const store = new Vuex.Store({
      modules: {
        object: ObjectStore,
      },
    })
    store.$services = {
      objects: {
        getOne: { execute },
      },
    }
    return getModule(ObjectStore, store)
  }

  it('has to get a store instance', (done) => {
    const store = factory()
    expect(store).toBeInstanceOf(Object)
    done()
  })
  describe('mutations', () => {
    describe('setObject', () => {
      it('should set object with value', () => {
        const store = factory()
        store.setObject(mockObjects()[0])
        expect(store.object).toStrictEqual(mockObjects()[0])
      })
    })
    describe('setError', () => {
      it('should set error with value', () => {
        const store = factory()
        store.setError('error')
        expect(store.error).toBe('error')
      })
    })
    describe('setLoading', () => {
      it('should set loading with value', () => {
        const store = factory()
        store.setLoading(false)
        expect(store.loading).toBeFalsy()
      })
    })
  })
  describe('actions', () => {
    describe('getObject', () => {
      it('should use service and set object on success', async () => {
        const mockObj = mockObjects()[0]
        const store = factory(
          jest.fn((oid, callbacks) => {
            callbacks.returnSuccess(mockObjects()[0])
          })
        )
        await store.getObject(mockObj.oid)
        expect(store.object).toStrictEqual(mockObj)
        expect(store.error).toBeNull()
        expect(store.loading).toBeFalsy()
      })
      it('should use service  and set error on client error', async () => {
        const store = factory(
          jest.fn((oid, callbacks) => {
            callbacks.returnClientError(new HttpError(404, 'not found'))
          })
        )
        await store.getObject('some oid')
        expect(store.error).toBe('not found')
        expect(store.object).toBeNull()
        expect(store.loading).toBeFalsy()
      })
      it('should use service  and set error on server error', async () => {
        const store = factory(
          jest.fn((oid, callbacks) => {
            callbacks.returnClientError(new HttpError(500, 'server error'))
          })
        )
        await store.getObject('some oid')
        expect(store.error).toBe('server error')
        expect(store.object).toBeNull()
        expect(store.loading).toBeFalsy()
      })
      it('should use service  and set error on parse error', async () => {
        const store = factory(
          jest.fn((oid, callbacks) => {
            callbacks.returnClientError(new ParseError('error'))
          })
        )
        await store.getObject('some oid')
        expect(store.error).toBe('error')
        expect(store.object).toBeNull()
        expect(store.loading).toBeFalsy()
      })
    })
  })
})
