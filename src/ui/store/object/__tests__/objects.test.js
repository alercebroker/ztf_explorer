import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { getModule } from 'nuxt-property-decorator'
import { mockObjectsData } from '@app/object/domain'
import { HttpError } from '@shared/http'
import { ParseError } from '@shared/error'
import ObjectsStore from './objects'

const Vue = createLocalVue()
Vue.use(Vuex)

describe('ObjectsStore', () => {
  const factory = (execute) => {
    const store = new Vuex.Store({
      modules: {
        objects: ObjectsStore,
      },
    })
    store.$services = {
      objects: {
        getMany: { execute },
      },
    }
    return getModule(ObjectsStore, store)
  }

  it('has to get a store instance', (done) => {
    const store = factory()
    expect(store).toBeInstanceOf(Object)
    done()
  })
  describe('mutations', () => {
    describe('setObjectList', () => {
      it('should set object with value', () => {
        const store = factory()
        store.setObjectList(mockObjectsData())
        expect(store.objectList).toStrictEqual(mockObjectsData())
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
    describe('getObjectList', () => {
      it('should use service and set object on success', async () => {
        const mockObj = mockObjectsData()
        const store = factory(
          jest.fn((oid, callbacks) => {
            callbacks.returnSuccess(mockObj)
          })
        )
        await store.getObjectList({})
        expect(store.objectList).toStrictEqual(mockObj)
        expect(store.error).toBeNull()
        expect(store.loading).toBeFalsy()
      })
      it('should use service  and set error on client error', async () => {
        const store = factory(
          jest.fn((oid, callbacks) => {
            callbacks.returnClientError(new HttpError(404, 'not found'))
          })
        )
        await store.getObjectList({})
        expect(store.error).toBe('not found')
        expect(store.objectList).toStrictEqual([])
        expect(store.loading).toBeFalsy()
      })
      it('should use service  and set error on server error', async () => {
        const store = factory(
          jest.fn((oid, callbacks) => {
            callbacks.returnClientError(new HttpError(500, 'server error'))
          })
        )
        await store.getObjectList({})
        expect(store.error).toBe('server error')
        expect(store.objectList).toStrictEqual([])
        expect(store.loading).toBeFalsy()
      })
      it('should use service  and set error on parse error', async () => {
        const store = factory(
          jest.fn((oid, callbacks) => {
            callbacks.returnClientError(new ParseError('error'))
          })
        )
        await store.getObjectList({})
        expect(store.error).toBe('error')
        expect(store.objectList).toStrictEqual([])
        expect(store.loading).toBeFalsy()
      })
    })
  })
})
