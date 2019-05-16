import isuuid from 'isuuid';
import uuid from 'uuid';

import { name, version } from '../../package.json';

const addServiceHeader = (req, res, next) => {
	res.setHeader('Service', `${name}/${version}`);

	next();
};

const handleCorrelationHeaders = (req, res, next) => {
	let chain = req.headers['Correlation-Chain'];
	let id = req.headers['Correlation-Id'];

	if (!id || !isuuid(id)) {
		id = uuid.v4();
	}

	if (!chain) {
		chain = name;
	} else {
		chain = `${chain},${name}`;
	}

	res.setHeader('Correlation-Id', id);
	res.setHeader('Correlation-Chain', chain);

	next()
};

// _requestLogger(req, res, next) {
// 	const start = new Date().getTime();
// 	onFinished(res, (err, res) => {
// 		const end = new Date().getTime();
// 		const duration = end - start;
// 		// TODO: Add mode logging metadata for the request/response
// 		var level = res.statusCode >= 400 ? PIXLogger.LEVELS.ERROR : PIXLogger.LEVELS.INFO;
// 		this.logger.log(level, `${req.method} ${req.path} ${res.statusCode}`, {
// 			method: req.method,
// 			status: res.statusCode,
// 			length: res.length,
// 			path: req.path,
// 			correlation_id: req.pix.correlation.id,
// 			correlation_chain: req.pix.correlation.chain,
// 			content_length: res.get('content-length'),
// 			duration,
// 			request_summary: true,
// 			referrer: req.headers['referer'] || req.headers['referrer'],
// 			requestor: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
// 		});
// 	});
// 	next();
// }


const defaultSettings = {
	path: '/api/v1',
	port: 8080,
	routes: [{
		aliases: {
			'health': `${name}.health`,
			'swagger': `${name}.swagger`,
		},
	}],
	use: [
		addServiceHeader,
		handleCorrelationHeaders,
		// Send log to aggregator whenever we have an api request
	]
};

const settings = {
	...defaultSettings,
	// Add your own service settings
};

export default settings;
