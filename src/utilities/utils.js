import _ from "lodash";

export function numberToArray(number) {
  return _.range(1, number + 1);
}

export function readJsonObject(jsonObject, tag) {
  return _.get(jsonObject, tag);
}

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export function sort(items, column, order) {
  return _.orderBy(items, [column], order);
}
