import assignWith from 'lodash.assignwith';
import fs from 'fs';
import path from 'path';
import setWith from 'lodash.setwith';

export const transformObjectToKeys = (input: string[]) => {
  return input.reduce<Record<string, unknown>>((acc, it) => {
    return setWith(acc, it, it, Object);
  }, {});
};

export const generateKeysAndClean = (target: string, filePath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const targetData: Record<string, unknown> = require(target);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const origin: Record<string, string> = require(filePath);
  console.log(`Generating missing keys in json for: ${target}`);

  const data = addMissingKeysToTargetedLanguages(targetData, origin);
  const cleanData = removeWildKeys(data, origin);
  const printableData = JSON.stringify(cleanData, null);

  const fileToWrite = path.resolve(__dirname, target);

  fs.writeFileSync(fileToWrite, printableData, 'utf-8');
};

const addMissingKeysToTargetedLanguages = (
  data: Record<string, unknown>,
  origin: Record<string, string>
) => {
  return assignWith(data, origin, (objValue, srcValue) => {
    const transformedValue = `${srcValue}!MISSING!`;
    return !objValue ||
      (objValue.endsWith('!MISSING!') && transformedValue !== objValue)
      ? transformedValue
      : objValue;
  });
};

const removeWildKeys = (
  data: Record<string, unknown>,
  origin: Record<string, string>
) => {
  Object.keys(data).forEach((key) => {
    if (Object.keys(origin).includes(key)) {
      return;
    }
    console.log(`\t > Remove ${key}`);
    delete data[key];
  });
  return data;
};
