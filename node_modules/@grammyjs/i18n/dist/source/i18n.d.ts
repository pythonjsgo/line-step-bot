import { Config, LanguageCode, Repository, TemplateData } from './types';
import { I18nContext } from './context';
interface MinimalMiddlewareContext {
    readonly from?: {
        readonly language_code?: string;
    } | undefined;
    readonly chat: unknown;
    readonly i18n: I18nContext;
}
export declare class I18n {
    repository: Repository;
    readonly config: Config;
    constructor(config?: Partial<Config>);
    loadLocales(directory: string): void;
    loadLocale(languageCode: LanguageCode, i18nData: Readonly<Record<string, unknown>>): void;
    resetLocale(languageCode?: LanguageCode): void;
    availableLocales(): LanguageCode[];
    resourceKeys(languageCode: LanguageCode): string[];
    missingKeys(languageOfInterest: LanguageCode, referenceLanguage?: string): string[];
    overspecifiedKeys(languageOfInterest: LanguageCode, referenceLanguage?: string): string[];
    translationProgress(languageOfInterest: LanguageCode, referenceLanguage?: string): number;
    createContext(languageCode: LanguageCode, templateData: Readonly<TemplateData>): I18nContext;
    middleware(): (ctx: MinimalMiddlewareContext, next: () => Promise<void>) => Promise<void>;
    t(languageCode: LanguageCode, resourceKey: string, templateData?: Readonly<TemplateData>): string;
}
export {};
