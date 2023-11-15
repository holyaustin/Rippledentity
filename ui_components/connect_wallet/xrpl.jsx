import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { XrplPrivateKeyProvider, getXRPLChainConfig } from "@web3auth/xrpl-provider";

const web3auth = new Web3Auth({
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
  },
  clientId = "YOUR_WEB3AUTH_CLIENT_ID", // get from https://dashboard.web3auth.io
  web3AuthNetwork = "sapphire_mainnet", // testnet, mainnet, cyan, aqua
});

const xrplProvider = new XrplPrivateKeyProvider({
  config: {
    chainId: "chainId",
    chainConfig: getXRPLChainConfig("testnet"), // devnet, testnet, mainnet
    rpcTarget: "rpc url",
  },
});

const adapter = new OpenloginAdapter({
  privateKeyProvider: xrplProvider, // <-- Injecting the XRPL provider
});
web3AuthInstance.configureAdapter(adapter);

await web3auth.initModal();

const provider = await web3auth.connect();