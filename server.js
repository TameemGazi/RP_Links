const { createApp1 } = require("./src/contractInteraction");

const main = () => {
    const app1 = createApp1();
    
    const port1 = process.env.PORT2 || 5500;

    app1.listen(port1, () => console.log("App 1 listening on port", port1));
};

main();