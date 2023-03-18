import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use('/configurations', configurationsController);

app.listen(port, () => {
    // TODO: start monitoring
    console.log(`Server listening on port ${port}`);
});