import express from 'express';

const configurationsController = express.Router();

let configurations = [
    {
        id: 1,
        address: 234213
    },
    {
        id: 2,
        walletAddress: '3425234x'
    },
    {
        id: 3,
        transactionTime: {
            from: 234,
            to: 453
        }
    }
];

configurationsController
    .get('/configurations', (req, res) => {
        res.json(configurations);
    })

    .get('/configurations/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const configuration = configurations.find(c => c.id === id);

        if (configuration) {
            res.json(configuration);
        } else {
            res.status(404).json({
                message: `Configuration with id ${id} does not exist.`
            });
        }
    })

    .post('/configurations', (req, res) => {
        const configuration = req.body;
        configuration.id = configurations.length + 1;
        configurations.push(configuration);
        res.json(configuration);
    })

    .put('/configurations/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = configurations.findIndex(c => c.id === id);

        if (index !== -1) {
            const configuration = req.body;
            configuration.id = id;
            configurations[index] = configuration;
            res.json(configuration);
        } else {
            res.status(404).json({
                message: `Configuration with id ${id} does not exist.`
            });
        }
    })

    .delete('/configurations/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = configurations.findIndex(c => c.id === id);

        if (index !== -1) {
            configurations.splice(index, 1);
            res.sendStatus(204);
        } else {
            res.status(404).json({
                message: `Configuration with id ${id} does not exist.`
            });
        }
    })

export default configurationsController;