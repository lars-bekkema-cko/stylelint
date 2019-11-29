'use strict';

// https://prettier.io/docs/en/options.html
module.exports = {
	arrowParens: 'always',
	bracketSpacing: true,
	printWidth: 100,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	overrides: [
		{
			files: ['package.json', '*.md', '*.css'],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
};
