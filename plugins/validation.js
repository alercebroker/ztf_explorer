import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
extend('ndet', {
  validate: (value) => {
    return value.ndet[0] != null || value.ndet[1] != null
      ? value.ndet[0] <= value.ndet[1]
      : true
  },
  message: "Min value can't be greater than max",
})

extend('class', {
  validate: (value) => {
    if (value.selectedClassifier != null) {
      return 'selectedClass' in value && value.selectedClass != null
    }
    return true
  },
  message: 'Select a class if you want to filter by classifier',
})

extend('oidFormat', {
  validate: (value) => {
    let valid = true
    const re = /(ZTF)\d{2,}\w+|[S,s]upernova/
    value.oid.forEach((oid) => {
      if (!re.test(oid)) {
        valid = false
      }
    })
    return valid
  },
  message: 'Oid format is: /(ZTF)d{2,}w+/',
})
extend('oidLength', {
  validate: (value) => {
    return value.oid.length <= 200
  },
  message: 'You can only query for 200 object ids',
})

extend('date', {
  validate: (value) => {
    return value.minMjd <= value.maxMjd
  },
  message: "Min MJD can't be lower than max MJD",
})

extend('conesearch', {
  validate: (value) => {
    if (value.ra || value.dec || value.radius) {
      return (
        value.ra !== '' &&
        value.dec !== '' &&
        value.radius !== '' &&
        !isNaN(value.ra) &&
        !isNaN(value.dec) &&
        !isNaN(value.radius)
      )
    }
    return true
  },
  message: 'You need to provide these parameters for conesearch',
})

extend('radiusPositive', {
  validate: (value) => {
    return value.radius ? value.radius >= 0 : true
  },
  message: "Radius can't be negative",
})
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
