"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18n = void 0;
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const context_1 = require("./context");
const pluralize_1 = require("./pluralize");
const tabelize_1 = require("./tabelize");
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
const compile = require('compile-template');
class I18n {
    constructor(config = {}) {
        Object.defineProperty(this, "repository", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = {
            defaultLanguage: 'en',
            sessionName: 'session',
            allowMissing: true,
            templateData: {
                pluralize: pluralize_1.pluralize,
            },
            ...config,
        };
        if (this.config.directory) {
            this.loadLocales(this.config.directory);
        }
    }
    loadLocales(directory) {
        if (!fs.existsSync(directory)) {
            throw new Error(`Locales directory '${directory}' not found`);
        }
        const files = fs.readdirSync(directory);
        for (const fileName of files) {
            const extension = path.extname(fileName);
            const languageCode = path.basename(fileName, extension).toLowerCase();
            const fileContent = fs.readFileSync(path.resolve(directory, fileName), 'utf8');
            if (extension === '.yaml' || extension === '.yml') {
                const data = yaml.load(fileContent);
                this.loadLocale(languageCode, (0, tabelize_1.tableize)(data));
            }
            else if (extension === '.json') {
                const data = JSON.parse(fileContent);
                this.loadLocale(languageCode, (0, tabelize_1.tableize)(data));
            }
        }
    }
    loadLocale(languageCode, i18nData) {
        const tableized = (0, tabelize_1.tableize)(i18nData);
        const ensureStringData = {};
        for (const [key, value] of Object.entries(tableized)) {
            ensureStringData[key] = String(value);
        }
        const language = languageCode.toLowerCase();
        this.repository[language] = {
            ...this.repository[language],
            ...compileTemplates(ensureStringData),
        };
    }
    resetLocale(languageCode) {
        if (languageCode) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete this.repository[languageCode.toLowerCase()];
        }
        else {
            this.repository = {};
        }
    }
    availableLocales() {
        return Object.keys(this.repository);
    }
    resourceKeys(languageCode) {
        var _a;
        const language = languageCode.toLowerCase();
        return Object.keys((_a = this.repository[language]) !== null && _a !== void 0 ? _a : {});
    }
    missingKeys(languageOfInterest, referenceLanguage = this.config.defaultLanguage) {
        const interest = this.resourceKeys(languageOfInterest);
        const reference = this.resourceKeys(referenceLanguage);
        return reference.filter(ref => !interest.includes(ref));
    }
    overspecifiedKeys(languageOfInterest, referenceLanguage = this.config.defaultLanguage) {
        return this.missingKeys(referenceLanguage, languageOfInterest);
    }
    translationProgress(languageOfInterest, referenceLanguage = this.config.defaultLanguage) {
        const reference = this.resourceKeys(referenceLanguage).length;
        const missing = this.missingKeys(languageOfInterest, referenceLanguage).length;
        return (reference - missing) / reference;
    }
    createContext(languageCode, templateData) {
        return new context_1.I18nContext(this.repository, this.config, languageCode, templateData);
    }
    middleware() {
        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        return async (ctx, next) => {
            var _a, _b, _c;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const session = await (this.config.useSession && ctx[this.config.sessionName]);
            const languageCode = (_c = (_a = session === null || session === void 0 ? void 0 : session.__language_code) !== null && _a !== void 0 ? _a : (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.language_code) !== null && _c !== void 0 ? _c : this.config.defaultLanguage;
            // @ts-expect-error writing to readonly property
            ctx.i18n = new context_1.I18nContext(this.repository, this.config, languageCode, {
                from: ctx.from,
                chat: ctx.chat,
            });
            await next();
            if (session) {
                session.__language_code = ctx.i18n.locale();
            }
        };
    }
    t(languageCode, resourceKey, templateData = {}) {
        return this.createContext(languageCode, templateData).t(resourceKey);
    }
}
exports.I18n = I18n;
function compileTemplates(root) {
    const result = {};
    for (const [key, value] of Object.entries(root)) {
        if (value.includes('${')) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            result[key] = compile(value);
        }
        else {
            result[key] = () => value;
        }
    }
    return result;
}
