import http from 'http';
import path from 'path';
import express from 'express';

import api from './api';
import config from './config/config.json';

let app = express();
app.server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, '../..', 'client/dist')));
app.use('/api/v1', api);

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Now listening on ${app.server.address().port}`);
});

export default app;