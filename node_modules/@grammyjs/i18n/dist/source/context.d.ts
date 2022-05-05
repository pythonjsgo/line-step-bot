import { Config, Repository, TemplateData, Template } from './types';
export interface I18nContextFlavor {
    readonly i18n: I18nContext;
}
export declare class I18nContext {
    readonly config: Config;
    readonly repository: Repository;
    readonly templateData: Readonly<TemplateData>;
    languageCode: string;
    shortLanguageCode: string;
    constructor(repository: Readonly<Repository>, config: Config, languageCode: string, templateData: Readonly<TemplateData>);
    locale(): string;
    locale(languageCode: string): void;
    getTemplate(languageCode: string, resourceKey: string): Template | undefined;
    t(resourceKey: string, templateData?: Readonly<TemplateData>): string;
}
