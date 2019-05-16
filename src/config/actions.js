import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const asyncReadFille = promisify(fs.readFile);

const defaultActions = {
	health(ctx) {
		ctx.meta.$responseType = 'application/json';
		const healthStatus = ctx.broker.getHealthStatus();

		return JSON.stringify(healthStatus, null, 2);
	},
	async swagger(ctx) {
		ctx.meta.$responseType = 'text/yaml';
		const swaggerFile = path.resolve(__dirname, '../swagger.yml');
		const data = await asyncReadFille(swaggerFile);

		return data;
	},
};

const actions = {
	...defaultActions,
	// Add the actions for your application here;
};

export default actions;
