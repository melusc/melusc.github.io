import type {UsableLocale} from '@faker-js/faker';
import {createContext} from 'react';

export const LocaleContext = createContext<UsableLocale>('en');
