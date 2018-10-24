import offers from '../data/offers';

export const getOffers = (req, res) => {
	try {
		res.json(offers.offers);
	} catch(e) {
		res.status(500).send('Not today!');
	}
};