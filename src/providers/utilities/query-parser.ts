import { ParserOptions } from "./";

export const queryParser = (opt: ParserOptions): Record<string, any> => {
  if (typeof opt.query != "object") throw Error("Query is not in Object Form");
  let query = opt.query;
  Object.keys(query).forEach((key) => {
    if (!opt.keys.includes(key)) delete query[key];

    if (opt.parseToIntKeys.includes(key)) query[key] = +query[key];
  });

  return query;
};
