import React, { PureComponent } from 'react';

import './styles.css';

export default class Main extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			offers: null,
			sortByName: null,
			sortByCashBack: null
		};
	}

	componentDidMount() {
		this.loadOffers();
	}

	loadOffers = async () => {
		let offers = await fetch('/api/v1/offers');
		offers = await offers.json();
		this.setState({ offers });
	};

	rows = offers => offers.map((offer) => (
		<div key={offer.offer_id} className="table-body">
			<div className="table-body-row">
				<div className="table-cell">{offer.name}</div>
				<div className="table-cell">{offer.cash_back}</div>
				<div className="table-cell"><img src={offer.image_url} /></div>
			</div>
		</div>
	));

	sortByName = () => {
		const { offers, sortByName } = this.state;
		if(!sortByName || sortByName === 'desc') {
			this.setState({
				offers: offers.sort((a, b) => a.name.localeCompare(b.name)),
				sortByName: 'asc',
				sortByCashBack: null
			});
		} else {
			this.setState({ 
				offers: offers.sort((a, b) => b.name.localeCompare(a.name)),
				sortByName: 'desc',
				sortByCashBack: null
			});
		}
	};

	sortByCashBack = () => {
		const { offers, sortByCashBack } = this.state;
		if(!sortByCashBack || sortByCashBack === 'desc') {
			this.setState({
				offers: offers.sort((a, b) => a.cash_back - b.cash_back),
				sortByName: null,
				sortByCashBack: 'asc'
			});
		} else {
			this.setState({ 
				offers: offers.sort((a, b) => b.cash_back - a.cash_back),
				sortByName: null,
				sortByCashBack: 'desc'
			});
		}
	};

	render() {
		const { offers, sortByName, sortByCashBack } = this.state;
		if(!offers) return <div>Loading...</div>;

		const Rows = () => this.rows(offers);

		return (
			<div className="table">
				<div className="table-header">
					<div 
						className={`table-header-cell ${sortByName}`}
						onClick={this.sortByName}
					>Name</div>
					<div
						className={`table-header-cell ${sortByCashBack}`}
						onClick={this.sortByCashBack}
					>Cash back</div>
					<div className="table-header-cell">Image</div>
				</div>
				<Rows />
			</div>
		);
	}
}