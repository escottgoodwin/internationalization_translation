import fs from 'fs'
import gTranslate from '@google-cloud/translate';
const {Translate} = gTranslate.v2;

const projectId = 'langolearn'

// export GOOGLE_APPLICATION_CREDENTIALS='langolearn-13a7ee811a3f.json'
const translate = new Translate({projectId});

const translateValue = async (value, to) => {
    const [translation] = await translate.translate(value, to);
    return translation;
}

const recursiveObjectPromiseAll = (jsonSourceObj, to, destinationFilePath) => {
    const keys = Object.keys(jsonSourceObj);
    return Promise.all(keys.map(async key => {
      const value = jsonSourceObj[key];
      if (typeof value === 'object' && !value.then) {
        return recursiveObjectPromiseAll(value, to);
      }
      return await translateValue(value, to);
    }))
      .then(result => zipObject(keys, result))
      .then(data => toJsonFile(data, to, destinationFilePath));
  };

const zipObject = (keys = [], values = []) => {
    return keys.reduce((accumulator, key, index) => {
      accumulator[key] = values[index]
      return accumulator
    }, {})
  }

function importSourceFile(sourceTranslation){
    return JSON.parse(fs.readFileSync(sourceTranslation).toString());
}

function toJsonFile(trans, to, destinationFilePath){
    const jsonfile = JSON.stringify(trans)
    const path = `${destinationFilePath}/${to}.json`
    fs.writeFile(path, jsonfile, 'utf8', () => {
        console.log(`wrote${path}`)
    });
}

export async function generateInternationalizationFile(
    to,
    sourceFilePath,
    destinationFilePath, // path of intl source file containing object 
){
    const jsonSourceObj = importSourceFile(sourceFilePath)
    recursiveObjectPromiseAll(
        jsonSourceObj, // js obj imported from filex - must contain object name 'const trans'
        to, 
        destinationFilePath// language translating to 
    ) 
}