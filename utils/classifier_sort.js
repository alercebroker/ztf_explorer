const priorities = {
  lc_classifier: 0,
  lc_classifier_top: 1,
  stamp_classifier: 2,
  'LC_classifier_ATAT_forced_phot(beta)': 3,
  'LC_classifier_BHRF_forced_phot(beta)': 4,
  stamp_classifier_2025_beta: 5,
}
export function filterSortClassifiers(classifiers) {
  return classifiers
    .filter((classifier) => classifier.name in priorities)
    .sort((a, b) => priorities[a.name] - priorities[b.name])
}
