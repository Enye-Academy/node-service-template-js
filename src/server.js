import { ServiceBroker } from 'moleculer';

// TODO finish service class logic
class Service extends ServiceBroker {
	constructor(props) {
		super(props)

		const { actions, name } = props;

		this.actions = actions;
		this.name = name;
	}

	init() {
		const { actions, name } = this;

		super.createService({ actions, name })
	}
	start() {
		super.start();
	}
}

export default Service;
