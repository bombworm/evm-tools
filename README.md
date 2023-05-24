## New features
- 🕵 enable call view function with blockTag for validating history data
- 🦉 enable force static call for write functions to fetch data
- 🩺 get TransparentUpgradeableProxy implementation address
- 🛠 decode function input data 


## Features by eth95

- 🤙 Call any contract function as long as you have the ABI
- 🔌 Connect via localhost:8545, MetaMask, or a custom node URL
- ⚡ Watches your artifacts folder and automatically updates the UI
- 🔢 Encode your calls for a proxy to call on your behalf
- ⚙️ Set a custom signer or a custom contract address
- 📜 Built-in log for easy visibility

## build & run

1. install dependencies
```shell
yarn
```

2. build frontend app:
```shell
vite build
```

3. start server:
```shell
ts-node src/server/index.ts
```