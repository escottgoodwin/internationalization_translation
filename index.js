import fs from 'fs'
import gTranslate from '@google-cloud/translate';
const {Translate} = gTranslate.v2;

// be sure to set the environment variable with the path the service account json file
// and the service account is authorized to use the google translate api

// export GOOGLE_APPLICATION_CREDENTIALS='/path/to/google/service/account/file'

// if you are running this in a google environment 
// with an account authorized for the google translate api, 
// you don't need to set the environment variable

const targetLang = '' // to language
const sourceFilePath = '' // source file
const destinationFilePath = '' // location to save generated file
const googleProjectId = ''

const translate = new Translate({googleProjectId});

function importSourceFile(sourceTranslation){
    return JSON.parse(fs.readFileSync(sourceTranslation).toString());
}

const translateValue = async (value, targetLang) => {
    const [translation] = await translate.translate(value, targetLang);
    return translation;
}

const recursiveObjectPromiseAll = (jsonSourceObj, targetLang, destinationFilePath) => {
    const keys = Object.keys(jsonSourceObj);
    return Promise.all(keys.map(async key => {
      const value = jsonSourceObj[key];
      if (typeof value === 'object' && !value.then) {
        return recursiveObjectPromiseAll(value, targetLang);
      }
      return await translateValue(value, targetLang);
    }))
      .then(result => zipObject(keys, result))
      .then(data => toJsonFile(data, targetLang, destinationFilePath));
  };

const zipObject = (keys = [], values = []) => {
    return keys.reduce((accumulator, key, index) => {
      accumulator[key] = values[index]
      return accumulator
    }, {})
  }

function toJsonFile(trans, targetLang, destinationFilePath){
    const jsonfile = JSON.stringify(trans)
    const path = `${destinationFilePath}/${targetLang}.json`
    fs.writeFile(path, jsonfile, 'utf8', () => console.log(`wrote ${path}`));
}

export async function generateInternationalizationFile(){
    const jsonSourceObj = importSourceFile(sourceFilePath)
    recursiveObjectPromiseAll(
        jsonSourceObj, // js obj imported from filex - must contain object name 'const trans'
        targetLang, 
        destinationFilePath// language translating to 
    ) 
}

generateInternationalizationFile()