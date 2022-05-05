"use strict";
/*!
 * This is adapted from:
 *
 * tableize-object (https://github.com/jonschlinkert/tableize-object)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableize = void 0;
/**
 * Tableize `obj` by flattening its keys into dot-notation.
 * Example: {a: {b: value}} -> {'a.b': value}
 */
function tableize(object) {
    const target = {};
    flatten(target, object, '');
    return target;
}
exports.tableize = tableize;
/**
 * Recursively flatten object keys to use dot-notation.
 */
function flatten(target, object, parent) {
    for (const [key, value] of Object.entries(object)) {
        const globalKey = parent + key;
        if (typeof value === 'object' && value !== null) {
            flatten(target, value, globalKey + '.');
        }
        else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint' || typeof value === 'boolean') {
            target[globalKey] = value;
        }
        else {
            throw new TypeError(`Could not parse value of key ${globalKey}. It is a ${typeof value}.`);
        }
    }
}
