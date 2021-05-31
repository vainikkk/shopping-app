export function filterArray(array, filters) {
  const filterKeys = Object.keys(filters);

  return array.filter((item) => {
    return Object.keys(item).every(() => {
      return filterKeys.every((filterKey) => {
        if (!filters[filterKey].length) return true;
        if (!item[filterKey]) return true;
        return getValue(item[filterKey]).includes(getValue(filters[filterKey]));
      });
    });
  });
}

//ignores case-sensitive
const getValue = (value) => (typeof value === "string" ? value.toUpperCase() : value);
