# i18n

After adding i18n tags in templates and before commit:

 - $ npm run extract-i18n
 - $ gulp i18n-update:merge
 - edit at least src/i18n/messages.en.xlf to copy source content to target tag for new added i18n
