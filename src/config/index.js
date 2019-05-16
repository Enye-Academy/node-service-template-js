import ApiService from 'moleculer-web'

import actions from './actions';
import settings from './settings';
import { name } from '../../package.json';

const config = {
	actions,
	mixins: ApiService,
	name,
	settings,
}

export default config;
