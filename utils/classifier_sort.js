const priorities = {
  lc_classifier: 1,
  lc_classifier_top: 2,
  stamp_classifier: 3,
}

export function filterSortClassifiers(classifiers) {
  return classifiers
    .filter((classifier) => classifier.name in priorities)
    .sort((a, b) => priorities[a] - priorities[b])
}
