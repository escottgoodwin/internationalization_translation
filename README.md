## Clone

Clone and go to the project directory:

`git clone https://github.com/escottgoodwin/internationalization_translation.git`

`cd internationalization_translation`

### Setup

In the index.js file, set your variables 

`const targetLang = '' // language code for file you want to generate - French => 'fr'`

`const sourceFilePath = '' // json internationlization source file path`

`const destinationFilePath = '' // location to save generated file`

`const googleProjectId = '' // google product id that corresponds to the service account you are using`

[List of supported languages and codes](https://cloud.google.com/translate/docs/languages)

### Set up Google Credentials

Set your service account path in the GOOGLE_APPLICATION_CREDENTIALS env var

`export GOOGLE_APPLICATION_CREDENTIALS='/path/to/google/service/account/file'`

If you are running this in a google environment with an account authorized for the google translate api, you don't need to set the environment variable.

Enable [Google Translate and create service key](https://cloud.google.com/translate/docs/setup). 

## Generate Files

Install packages: 

`npm install`

Run: 

`node index.js`

Find generated file. The file should appear in the the destination folder with the langauge code

`/destination/folder/fr.json`


