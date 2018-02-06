/**
 * Data manipulation functional goodies
 *
 */

function mapFilter(alist, mapFunc, filterFunc) {
  /**
   * An implmeneation of lazy filter evaluation
   */
  return alist.reduce((acc, val) => (
    filterFunc(val)
      ? [...acc, mapFunc(val)]
      : [...acc]
  ), []);
}

export {
  mapFilter,
};

