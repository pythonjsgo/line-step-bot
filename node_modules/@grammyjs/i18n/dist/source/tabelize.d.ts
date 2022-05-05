/*!
 * This is adapted from:
 *
 * tableize-object (https://github.com/jonschlinkert/tableize-object)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/**
 * Tableize `obj` by flattening its keys into dot-notation.
 * Example: {a: {b: value}} -> {'a.b': value}
 */
export declare function tableize(object: Record<string, unknown>): Record<string, string | number | bigint | boolean>;
