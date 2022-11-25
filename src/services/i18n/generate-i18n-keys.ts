#!/usr/bin/env ts-node

import { DEFAULT_LANGUAGE } from './i18n.constants';
import { Language } from './i18n.types';
import { execSync } from 'child_process';
import { generateKeysAndClean, transformObjectToKeys } from './i18n.utils';
import { en as translations } from './locales';
import fs from 'fs';
import path from 'path';

const KEYS_FILE_EXPORT_NAME = 'i18nKeys';
const KEYS_FILE_PATH = './keys.ts';
const LOCALES_BASE_PATH = './locales';
const TRANSLATIONS_FILE_PATH = `${LOCALES_BASE_PATH}/en.json`;

const targetPaths = Object.values(Language)
  .filter((s) => s !== DEFAULT_LANGUAGE)
  .map((target) => `${LOCALES_BASE_PATH}/${target}.json`);

// generate targets json files and remove properties unused in origin file
targetPaths.forEach((targetPath) =>
  generateKeysAndClean(targetPath, TRANSLATIONS_FILE_PATH)
);

// generate keys.ts
const translationsKeysRaw = Object.keys(translations);
const translationKeys = transformObjectToKeys(translationsKeysRaw);
const printableTranslationKeys = JSON.stringify(translationKeys, null, 2)
  .replace(
    /:\s?"(.*)",?\s/g,
    (string, groupMatching) => `: '${groupMatching}',\n`
  )
  // regex: don't replace character if look-ahead/behind match on a dash
  .replace(/"(?<!.*-.*)(?!.*-.*)/g, '')
  .replace(/,\s*?}/g, '}');

const fileToWrite = path.resolve(__dirname, KEYS_FILE_PATH);
const comment =
  '// This file is auto-generated, manual edits in this file will be overwritten!\n\n';

// write result to file
fs.writeFileSync(
  fileToWrite,
  `${comment}export const ${KEYS_FILE_EXPORT_NAME} = ${printableTranslationKeys};`,
  'utf-8'
);

// format files
execSync('prettier --write ./');

process.exit(0);
