import { generateInternationalizationFile } from './generateTranslations.js'

// be sure to set the environment variable with the path the service account json file
// and the service account is authorized to use the google translate api

// export GOOGLE_APPLICATION_CREDENTIALS='/path/to/google/service/account/file'

// if you are running this in a google environment 
// with an account authorized for the google translate api, 
// you don't need to set the environment variable

const targetLang = 'fr' // to language
const sourceFilePath = 'en.json' // source file
const destinationFilePath = '../lmifb/src/translations' // location to save generated file

generateInternationalizationFile(
    targetLang, 
    sourceFilePath, 
    destinationFilePath, 
)


