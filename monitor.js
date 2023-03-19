import Web3 from "web3";

const endpoint = 'wss://mainnet.infura.io/ws/v3/d892c4a30e8f4ecd83e87177dbad41e5';

const web3 = new Web3(endpoint);

const subscriptionFinalized = web3.eth.subscribe('newBlockHeaders', (err, res) => {
    if (err) console.error(err);
})

const init1 = () => {
    subscriptionFinalized.on('data', (res) => {
        const number = res.number;
        web3.eth.getBlock(number).then(block => {
            block.transactions.map(async txHash => {
                const tx = await web3.eth.getTransaction(txHash);
                console.log(tx);
            })
        })
    })
}

// web3.eth.clearSubscriptions();

// monitor mempool
const subscriptionPending = web3.eth.subscribe('pendingTransactions', (err, res) => {
    if (err) console.error(err);
});

const init2 = () => {
    subscriptionPending.on('data', (txHash) => {
        setTimeout(async () => {
            try {
                const tx = await web3.eth.getTransaction(txHash);
                // can be null - check and make sure!
                console.log(tx);
            } catch (err) {
                console.error(err);
            }
        });
    });
};

init1();
init2();

// monitor with delayed amount of blocks