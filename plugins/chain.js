import { ethers } from 'ethers';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  function getChainName(chainId) {
    if (chainId === 137) {
      return "Polygon";
    } else if (chainId === 1) {
      return "Ethereum";
    } else if (chainId === 10) {
      return "Optimism";
    } else if (chainId === 56) {
      return "BNB Smart Chain";
    } else if (chainId === 69) {
      return "Optimism Testnet";
    } else if (chainId === 77) {
      return "Gnosis Testnet";
    } else if (chainId === 100) {
      return "Gnosis Chain";
    } else if (chainId === 137) {
      return "Polygon";
    } else if (chainId === 42161) {
      return "Arbitrum";
    } else if (chainId === 421611) {
      return "Arbitrum Testnet";
    } else if (chainId === 80001) {
      return "Polygon Testnet";
    } else if (chainId === 3) {
      return "Ropsten";
    } else if (chainId === 4) {
      return "Rinkeby";
    } else if (chainId === 1313161555) {
      return "Aurora Testnet";
    } else {
      return "Unsupported Network";
    }
  }

  function getFallbackProvider(chainId) {
    let urls;

      if (chainId === 1) {
        // Ethereum
        urls = [
          "https://eth-mainnet.g.alchemy.com/v2/" + config.alchemyEthereumKey
        ];
      } else if (chainId === 137) {
        // Polygon PoS Chain
        urls = [
          "https://polygon-rpc.com/", 
          "https://polygon-mainnet.g.alchemy.com/v2/" + config.alchemyPolygonKey
        ];
      } else if (chainId === 80001) {
        // Mumbai testnet (Polygon testnet)
        urls = [
          "https://matic-mumbai.chainstacklabs.com",
          "https://polygon-mumbai.g.alchemy.com/v2/" + config.alchemyMumbaiKey
        ]
      } else if (chainId === 10) {
        // Optimism
        urls = [
          "https://mainnet.optimism.io",
          "https://opt-mainnet.g.alchemy.com/v2/" + config.alchemyOptimismKey
        ]; 
      } else if (chainId === 56) {
        // BSC mainnet
        urls = [
          "https://bscrpc.com"
        ];
      } else if (chainId === 77) {
        // Gnosis Chain testnet (Sokol)
        urls = [
          "https://sokol.poa.network"
        ];
      } else if (chainId === 100) {
        // Gnosis Chain
        urls = [
          "https://rpc.xdaichain.com",
          "https://rpc.gnosischain.com"
        ];
      } else if (chainId === 42161) {
        // Arbitrum
        urls = [
          "https://arb1.arbitrum.io/rpc",
          "https://arb-mainnet.g.alchemy.com/v2/" + config.alchemyArbitrumKey
        ];
      } else if (chainId === 421611) {
        // Arbitrum testnet
        urls = [
          "https://rinkeby.arbitrum.io/rpc"
        ];
      } else if (chainId === 1313161555) {
        // Aurora testnet
        urls = [
          "https://testnet.aurora.dev"
        ];
      }

      if (urls) {
        const providers = urls.map(url => new ethers.providers.JsonRpcProvider(url));
        return new ethers.providers.FallbackProvider(providers, 1); // return fallback provider
      } else {
        return null;
      }
  }

  function switchChain(chainName) {
    let method;
    let params;

    if (chainName == "Ethereum") {
      method = "wallet_switchEthereumChain"
      params = [{ chainId: "0x1" }] 
    } else if (chainName == "Ropsten") {
      method = "wallet_switchEthereumChain"
      params = [{ chainId: "0x3" }] 
    } else if (chainName == "Rinkeby") {
      method = "wallet_switchEthereumChain"
      params = [{ chainId: "0x4" }] 
    } else if (chainName == "Polygon Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://mumbai.polygonscan.com" ],
        chainId: "0x13881",
        chainName: "Mumbai Testnet",
        nativeCurrency: { decimals: 18, name: "Matic", symbol: "MATIC" }, 
        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"]
      }] 
    } else if (chainName == "Arbitrum Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.arbiscan.io" ],
        chainId: "0x66EEB",
        chainName: "Arbitrum Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://rinkeby.arbitrum.io/rpc"]
      }] 
    } else if (chainName == "Arbitrum") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://arbiscan.io" ],
        chainId: "0xA4B1",
        chainName: "Arbitrum One",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://arb1.arbitrum.io/rpc"]
      }] 
    } else if (chainName == "Optimism") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://optimistic.etherscan.io/" ],
        chainId: "0xA",
        chainName: "Optimism",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://mainnet.optimism.io"]
      }] 
    } else if (chainName == "Optimism Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://kovan-optimistic.etherscan.io/" ],
        chainId: "0x45",
        chainName: "Optimism Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://kovan.optimism.io"]
      }] 
    } else if (chainName == "Polygon") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://polygonscan.com" ],
        chainId: "0x89",
        chainName: "Polygon PoS Chain",
        nativeCurrency: { decimals: 18, name: "MATIC", symbol: "MATIC" }, 
        rpcUrls: ["https://polygon-rpc.com/"]
      }] 
    } else if (chainName == "Gnosis Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://blockscout.com/poa/sokol" ],
        chainId: "0x4D",
        chainName: "Gnosis Testnet",
        nativeCurrency: { decimals: 18, name: "SPOA", symbol: "SPOA" }, 
        rpcUrls: ["https://sokol.poa.network"]
      }] 
    } else if (chainName == "Gnosis Chain") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://blockscout.com/xdai/mainnet" ],
        chainId: "0x64",
        chainName: "Gnosis Chain",
        nativeCurrency: { decimals: 18, name: "XDAI", symbol: "XDAI" }, 
        rpcUrls: ["https://rpc.gnosischain.com"]
      }] 
    } else if (chainName == "BNB Smart Chain") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://bscscan.com/" ],
        chainId: "0x38",
        chainName: "BNB Smart Chain",
        nativeCurrency: { decimals: 18, name: "BNB", symbol: "BNB" }, 
        rpcUrls: ["https://bscrpc.com"]
      }] 
    } else if (chainName == "Aurora Testnet") {
      method = "wallet_addEthereumChain"
      params = [{ 
        blockExplorerUrls: [ "https://testnet.aurorascan.dev/" ],
        chainId: "0x4E454153",
        chainName: "Aurora Testnet",
        nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" }, 
        rpcUrls: ["https://testnet.aurora.dev"]
      }] 
    }

    return { 
      method: method, 
      params: params
    }
  }

  return {
    provide: {
      getChainName: (chainId) => getChainName(chainId),
      getFallbackProvider: (chainId) => getFallbackProvider(chainId),
      switchChain: (chainName) => switchChain(chainName)
    }
  }
});

