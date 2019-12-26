import { setProperties, get } from '@ember/object';
import Ember from 'ember';
import * as appMethods from '../utils/bugsnag';

function getContext(router) {
	return `${router.currentRouteName} (${router.currentURL})`;
}

export function initialize(instance) {
	const owner = instance.lookup ? instance : instance.container;
	const client = owner.lookup('bugsnag:main');

	if (client && client.config.notifyReleaseStages.includes(client.config.releaseStage)) {
		const routerService = owner.lookup('service:router');
		const router = owner.lookup('router:main');

		if (routerService && routerService.on) {
			routerService.on('routeDidChange', this.didTransition.bind(this));
		} else {
			router.on('didTransition', this.didTransition.bind(this));
		}

		setProperties(this, {
			owner,
			router,
			client
		});

		Ember.onerror = this._onError.bind(this);
	}
}

export default {
	name: 'bugsnag-error-service',

	initialize,

	didTransition() {
		const client = get(this, 'client');

		client.refresh();
	},

	_onError(error) {
		if (!error || typeof error !== 'object' || !error.name || !error.message) {
			return;
		}

		this._setContext();
		this._setUser();
		this._notify(error);

		// eslint-disable-next-line no-console
		console.error(error.stack);

		if (Ember.testing) {
			throw error;
		}
	},

	_setUser() {
		const owner = get(this, 'owner');
		const client = get(this, 'client');
		const user = appMethods.getUser && appMethods.getUser(owner);

		client.user = user;
	},

	_setContext() {
		const router = get(this, 'router');
		const client = get(this, 'client');
		const context = getContext(router);

		client.context = context;
	},

	async _notify(error) {
		const owner = get(this, 'owner');
		const client = get(this, 'client');
		const metaData = appMethods.getMetaData ? await appMethods.getMetaData(error, owner) : {};

		client.notify(error, { metaData });
	}
};
