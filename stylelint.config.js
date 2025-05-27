module.exports = {
	plugins: ["stylelint-prettier", "stylelint-scss"],
	rules: {
		"prettier/prettier": true,
		"no-invalid-position-at-import-rule": null,
		"font-family-no-missing-generic-family-keyword": null,
		"no-descending-specificity": null,
		"scss/dollar-variable-pattern": /^[a-z][a-zA-Z0-9]+$/,
		"declaration-block-no-redundant-longhand-properties": [
			true,
			{
				severity: "warning",
			},
		],
		"block-no-empty": [
			true,
			{
				severity: "warning",
			},
		],
		"color-function-notation": null,
		"alpha-value-notation": "number",
	},
	extends: ["stylelint-config-standard-scss", "stylelint-config-prettier-scss"],
};
