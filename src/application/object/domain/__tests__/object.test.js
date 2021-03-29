import { Object_ } from '../object'
import { mockObjectsData } from './object.mock'

describe('Object', () => {
  describe('constructor', () => {
    it('should instantiate', () => {
      const entity1 = new Object_({
        ...mockObjectsData()[0],
        oid: 'oid',
      })

      expect(entity1.oid).toBe('oid')
    })
  })
})
