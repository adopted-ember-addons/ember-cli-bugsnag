'use strict';

const readEnvironmentConfig = require('./lib/environment-config').read;
const fastbootTransform = require('fastboot-transform');

module.exports = {
	name: require('./package').name,

	options: {
		nodeAssets: {
			'bugsnag-js': {
				vendor: {
					srcDir: 'dist',
					destDir: 'bugsnag-js',
					include: ['bugsnag*.js'],
					processTree(input) {
						return fastbootTransform(input);
					}
				}
			}
		}
	},

	config() {
		return {
			bugsnag: readEnvironmentConfig(process.env)
		};
	},

	treeForAddon() {
		if (this._includeBugsnag) {
			return this._super.treeForAddon.apply(this, arguments);
		}

		return null;
	},

	treeForApp() {
		if (this._includeBugsnag) {
			return this._super.treeForApp.apply(this, arguments);
		}

		return null;
	},

	included(app) {
		this._includeBugsnag = this.isDevelopingAddon() || process.env.EMBER_ENV !== 'test';

		this._super.included.apply(this, arguments);

		if (this._includeBugsnag) {
			app.import({
				development: 'vendor/bugsnag-js/bugsnag.js',
				production: 'vendor/bugsnag-js/bugsnag.min.js'
			});

			app.import('vendor/bugsnag/shim.js', {
				type: 'vendor',
				exports: {
					bugsnag: ['default']
				}
			});
		}
	}
};
