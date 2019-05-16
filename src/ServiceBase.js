import { ServiceBroker } from 'moleculer';

import config from './config';

// TODO finish service class logic
// https://gitlab.pixsystem.net/PIX-services/pix-svc-framework-js/blob/master/lib/PIXService.js
// TODO: Pull this logic into its own repo and deploy as NPM module
class Service {
	constructor() {

		// connect logger to sumo
		// add correlation id and chain
		// connect messenger to Rabbit MQ
		this.broker = new ServiceBroker();
		this.broker.createService(config);
	}

	beforeStart() {}

	afterStart() {}

	async start() {
		await Promise.resolve(this.beforeStart());
		await this.broker.start();
		await Promise.resolve(this.afterStart());
	}

	stop() {
		if (this.logger) {
			this.logger.info('Shutting down service ' + this._name);
		}
		this.broker.stop();
		// this.server.close();
		// process.exit();
	}

	get logger() {
		return this._logger;
	}

	get messenger() {
		return this.messenger;
	}

	get auth() {
		return this._auth;
	}

	get metrics() {
		return this._metrics;
	}
}

export default Service;
