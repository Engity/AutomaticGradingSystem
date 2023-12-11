const express = require('express')
const router = express.Router()
const translationController = require('../controllers/translationController')

/**
 * @swagger
 * /translation:
 *   get:
 *     summary: Get all translation records
 *     tags: [Translations]
 *     description: Retrieve all translation records from database
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              [
 *              {
 *               _id: '65658eb6f38c223421f763be',
 *               username: 'kokinh11',
 *               languageFrom: 'en',
 *               languageTo: 'fr',
 *               requestedText: 'Hello, how are you?',
 *               translatedText: 'Bonjour, comment ça va?'
 *              },
 *              {
 *               _id: '65658eb6f38c223421f763bf',
 *               username: 'kokinh12',
 *               languageFrom: 'es',
 *               languageTo: 'de',
 *               requestedText: 'Hola, ¿cómo estás?',
 *               translatedText: 'Hallo, wie geht es dir?'
 *              },
 *              {
 *               _id: '6565b0b363dace3221c79759',
 *               username: 'judgeTest01',
 *               languageFrom: 'en',
 *               languageTo: 'fr',
 *               requestedText: 'Hello, how are you?',
 *               translatedText: 'Bonjour, comment ça va?'
 *              }
 *              ]
 *       404:
 *         description: Error response
 *         content:
 *           application/json:
 *             example:
 *               message: 'No translation records found'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Error fetching translation records'
 */
// Get all translation
// Full URI: http://localhost:port/translation/
// Required field in request body:
router.route('/').get(translationController.getAllTranslations)


/**
 * @swagger
 * /translation:
 *   post:
 *     summary: Create a new traslation
 *     tags: [Translations]
 *     description:
 *          Add a new translation record to the database.
 *     parameters:
 *       - in: body
 *         username: Username of the user requesting translation
 *         text: Text to be translated
 *         source: Language ID to be translated from
 *         target: Language ID to be translated to
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             text:
 *               type: string
 *             source:
 *               type: string
 *             target:
 *               type: string
 *     responses:
 *       201:
 *         description: Successful Request
 *         content:
 *           application/json:
 *             example:
 *               message: 'New translation record for the user kokinh11 created'
 *               translation: 'Hello'
 *       402:
 *         description: Missing fields
 *         content:
 *           application/json:
 *             example:
 *               error: 'Missing all required fields.'
 *       404:
 *         description: Invalid translation
 *         content:
 *           application/json:
 *             example:
 *               error: 'Invalid data received'  
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: 'Cannot connect to Google API to translate, please try again later'
 */
// Requesting a translation
// Full URI: http://localhost:port/translation/
// Required field in request body:
//      'username': username of the user requesting translation
//      'text': Text to be translated, 
//      'source': Language ID to translate from, 
//      'target': Language ID to translate to
router.route('/').post(translationController.createTranslation)

/**
 * @swagger
 * /translation/username/{username}:
 *   get:
 *     summary: Get translation records by specificed username 
 *     tags: [Translations]
 *     description: 
 *              Get translation records by specificed username.
 *     parameters:
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *                  [
 *                  {
 *                    - _id: '65658eb6f38c223421f763be',
 *                    user: 'kokinh11',
 *                    languageFrom: 'en',
 *                    languageTo: 'fr',
 *                    requestedText: 'Hello, how are you?',
 *                    translatedText: 'Bonjour, comment ça va?'
 *                  }, 
 *                  {
 *                    - _id: '657733325e17010555686791',
 *                    user: 'kokinh11',
 *                    languageFrom: 'vi',
 *                    languageTo: 'en',
 *                    requestedText: 'Xin chao',
 *                    translatedText: 'Hello' 
 *                  }
 *                  ]
 *       404:
 *         description: No records found
 *         content:
 *           application/json:
 *             example:
 *               message: 'No translation records found'
 */
//Get translation records by username
// Full URI: http://localhost:port/translation/username/:username
// Required field in request body:
router.route('/username/:username').get(translationController.getTranslationsByUsername);

/**
 * @swagger
 * /translation/id/{id}:
 *   get:
 *     summary: Get translation records by specificed id 
 *     tags: [Translations]
 *     description: 
 *              Get translation records by specificed id.
 *     parameters:
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *                  {
 *                    - _id: '657733325e17010555686791',
 *                    user: 'kokinh11',
 *                    languageFrom: 'vi',
 *                    languageTo: 'en',
 *                    requestedText: 'Xin chao',
 *                    translatedText: 'Hello' 
 *                  }
 *       404:
 *         description: No records found
 *         content:
 *           application/json:
 *             example:
 *               message: 'No translation records found'
 */
//Get translation records by id
// Full URI: http://localhost:port/translation/id/:id
// Required field in request body:
router.route('/id/:id').get(translationController.getTranslationsByID);
/**
 * @swagger
 * /translation/languages:
 *   get:
 *     summary: Get all supported translation languages
 *     tags: [Translations]
 *     description: |- 
 *        Retrieve all supported translation languages.
 * 
 *        _Notes: Must have Google Translate API in order for a successful request_    
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *              [
 *               {language: 'af', name: 'Afrikaans' },
 *               {language: 'sq', name: 'Albanian' },
 *               {language: 'am', name: 'Amharic' },
 *               {language: 'ar', name: 'Arabic' },
 *               {language: 'hy', name: 'Armenian' },
 *               {language: 'as', name: 'Assamese' },
 *               {language: 'ay', name: 'Aymara' },
 *               {language: 'az', name: 'Azerbaijani' },
 *               {language: 'bm', name: 'Bambara' },
 *               {language: 'eu', name: 'Basque' },
 *               {language: 'be', name: 'Belarusian' },
 *               {language: 'bn', name: 'Bengali' },
 *               {language: 'bho', name: 'Bhojpuri' },
 *               {language: 'bs', name: 'Bosnian' },
 *               {language: 'bg', name: 'Bulgarian' },
 *               {language: 'ca', name: 'Catalan' },
 *               {language: 'ceb', name: 'Cebuano' },
 *               {language: 'ny', name: 'Chichewa' },
 *               {language: 'zh', name: 'Chinese (Simplified)' },
 *               {language: 'zh-TW', name: 'Chinese (Traditional)' },
 *               {language: 'co', name: 'Corsican' },
 *               {language: 'hr', name: 'Croatian' },
 *               {language: 'cs', name: 'Czech' },
 *               {language: 'da', name: 'Danish' },
 *               {language: 'dv', name: 'Divehi' },
 *               {language: 'doi', name: 'Dogri' },
 *               {language: 'nl', name: 'Dutch' },
 *               {language: 'en', name: 'English' },
 *               {language: 'eo', name: 'Esperanto' },
 *               {language: 'et', name: 'Estonian' },
 *               {language: 'ee', name: 'Ewe' },
 *               {language: 'tl', name: 'Filipino' },
 *               {language: 'fi', name: 'Finnish' },
 *               {language: 'fr', name: 'French' },
 *               {language: 'fy', name: 'Frisian' },
 *               {language: 'gl', name: 'Galician' },
 *               {language: 'lg', name: 'Ganda' },
 *               {language: 'ka', name: 'Georgian' },
 *               {language: 'de', name: 'German' },
 *               {language: 'el', name: 'Greek' },
 *               {language: 'gn', name: 'Guarani' },
 *               {language: 'gu', name: 'Gujarati' },
 *               {language: 'ht', name: 'Haitian Creole' },
 *               {language: 'ha', name: 'Hausa' },
 *               {language: 'haw', name: 'Hawaiian' },
 *               {language: 'iw', name: 'Hebrew' },
 *               {language: 'hi', name: 'Hindi' },
 *               {language: 'hmn', name: 'Hmong' },
 *               {language: 'hu', name: 'Hungarian' },
 *               {language: 'is', name: 'Icelandic' },
 *               {language: 'ig', name: 'Igbo' },
 *               {language: 'ilo', name: 'Iloko' },
 *               {language: 'id', name: 'Indonesian' },
 *               {language: 'ga', name: 'Irish Gaelic' },
 *               {language: 'it', name: 'Italian' },
 *               {language: 'ja', name: 'Japanese' },
 *               {language: 'jw', name: 'Javanese' },
 *               {language: 'kn', name: 'Kannada' },
 *               {language: 'kk', name: 'Kazakh' },
 *               {language: 'km', name: 'Khmer' },
 *               {language: 'rw', name: 'Kinyarwanda' },
 *               {language: 'gom', name: 'Konkani' },
 *               {language: 'ko', name: 'Korean' },
 *               {language: 'kri', name: 'Krio' },
 *               {language: 'ku', name: 'Kurdish (Kurmanji)' },
 *               {language: 'ckb', name: 'Kurdish (Sorani)' },
 *               {language: 'ky', name: 'Kyrgyz' },
 *               {language: 'lo', name: 'Lao' },
 *               {language: 'la', name: 'Latin' },
 *               {language: 'lv', name: 'Latvian' },
 *               {language: 'ln', name: 'Lingala' },
 *               {language: 'lt', name: 'Lithuanian' },
 *               {language: 'lb', name: 'Luxembourgish' },
 *               {language: 'mk', name: 'Macedonian' },
 *               {language: 'mai', name: 'Maithili' },
 *               {language: 'mg', name: 'Malagasy' },
 *               {language: 'ms', name: 'Malay' },
 *               {language: 'ml', name: 'Malayalam' },
 *               {language: 'mt', name: 'Maltese' }, 
 *               {language: 'mi', name: 'Maori' },
 *               {language: 'mr', name: 'Marathi' },
 *               {language: 'mni-Mtei', name: 'Meiteilon (Manipuri)' },
 *               {language: 'lus', name: 'Mizo' },
 *               {language: 'mn', name: 'Mongolian' },
 *               {language: 'my', name: 'Myanmar (Burmese)' },
 *               {language: 'ne', name: 'Nepali' },
 *               {language: 'nso', name: 'Northern Sotho' },
 *               {language: 'no', name: 'Norwegian' },
 *               {language: 'or', name: 'Odia (Oriya)' },
 *               {language: 'om', name: 'Oromo' },
 *               {language: 'ps', name: 'Pashto' },
 *               {language: 'fa', name: 'Persian' },
 *               {language: 'pl', name: 'Polish' },
 *               {language: 'pt', name: 'Portuguese' },
 *               {language: 'pa', name: 'Punjabi' },
 *               {language: 'qu', name: 'Quechua' },
 *               {language: 'ro', name: 'Romanian' },
 *               {language: 'ru', name: 'Russian' },
 *               {language: 'sm', name: 'Samoan' },
 *               {language: 'sa', name: 'Sanskrit' },
 *               {language: 'gd', name: 'Scots Gaelic' },
 *               {language: 'sr', name: 'Serbian' },
 *               {language: 'st', name: 'Sesotho' },
 *               {language: 'sn', name: 'Shona' },
 *               {language: 'sd', name: 'Sindhi' },
 *               {language: 'si', name: 'Sinhala' },
 *               {language: 'sk', name: 'Slovak' },
 *               {language: 'sl', name: 'Slovenian' },
 *               {language: 'so', name: 'Somali' },
 *               {language: 'es', name: 'Spanish' },
 *               {language: 'su', name: 'Sundanese' },
 *               {language: 'sw', name: 'Swahili' },
 *               {language: 'sv', name: 'Swedish' },
 *               {language: 'tg', name: 'Tajik' },
 *               {language: 'ta', name: 'Tamil' },
 *               {language: 'tt', name: 'Tatar' },
 *               {language: 'te', name: 'Telugu' },
 *               {language: 'th', name: 'Thai' },
 *               {language: 'ti', name: 'Tigrinya' },
 *               {language: 'ts', name: 'Tsonga' },
 *               {language: 'tr', name: 'Turkish' },
 *               {language: 'tk', name: 'Turkmen' },
 *               {language: 'ak', name: 'Twi' },
 *               {language: 'uk', name: 'Ukrainian' },
 *               {language: 'ur', name: 'Urdu' },
 *               {language: 'ug', name: 'Uyghur' },
 *               {language: 'uz', name: 'Uzbek' },
 *               {language: 'vi', name: 'Vietnamese' },
 *               {language: 'cy', name: 'Welsh' },
 *               {language: 'xh', name: 'Xhosa' },
 *               {language: 'yi', name: 'Yiddish' },
 *               {language: 'yo', name: 'Yoruba' },
 *               {language: 'zu', name: 'Zulu' },
 *               {language: 'he', name: 'Hebrew' },
 *               {language: 'jv', name: 'Javanese' },
 *               {language: 'zh-CN', name: 'Chinese (Simplified)' }
 *              ]
 *       500:
 *         description: API problem
 *         content:
 *           application/json:
 *             example:
 *               message: 'Cannot connect to Google API, please try again later.'
 * 
 */
// Getting all supported languages
// Full URI: http://localhost:port/translation/languages/
// Required field in body: 
router.route('/languages').get(translationController.getAllLanguages);

module.exports = router