import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEn from './locales/en/translationEn.json'
import translationRu from './locales/ru/translationRu.json'

const resources = {
	en: {
		translation: translationEn
	},
	ru: {
		translation: translationRu
	}
}

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		debug: true,
		interpolation: {
			escapeValue: false
		}
	})

export default i18n
