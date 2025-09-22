const { ethers } = require("ethers");

// Safe Transaction Service API endpoints for different networks
const SAFE_API_ENDPOINTS = {
  mainnet: "https://safe-transaction-mainnet.safe.global/api/v1",
  optimism: "https://safe-transaction-optimism.safe.global/api/v1",
  arbitrum: "https://safe-transaction-arbitrum.safe.global/api/v1",
  base: "https://safe-transaction-base.safe.global/api/v1",
};

async function findSafesForOwner(ownerAddress, network = "mainnet") {
  const apiUrl = SAFE_API_ENDPOINTS[network];
  if (!apiUrl) {
    throw new Error(`Unsupported network: ${network}`);
  }

  try {
    // Query Safe Transaction Service API for safes where address is owner
    const response = await fetch(`${apiUrl}/owners/${ownerAddress}/safes/`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.safes || [];
  } catch (error) {
    console.error(`Error fetching safes for ${network}:`, error.message);
    return [];
  }
}

async function getSafeDetails(safeAddress, network = "mainnet") {
  const apiUrl = SAFE_API_ENDPOINTS[network];

  try {
    const response = await fetch(`${apiUrl}/safes/${safeAddress}/`);

    if (!response.ok) {
      throw new Error(`Failed to fetch safe details: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching safe details:`, error.message);
    return null;
  }
}

async function main() {
  const targetOwner = "0xYourOwnerAddressHere"; // Replace with the target owner address

  console.log(`\nSearching for Safe multisigs with owner: ${targetOwner}\n`);
  console.log("=".repeat(80));

  // Check across multiple networks
  const networks = ["mainnet", "optimism", "arbitrum", "base"];

  for (const network of networks) {
    console.log(`\nChecking ${network.toUpperCase()}...`);

    const safes = await findSafesForOwner(targetOwner, network);

    if (safes.length > 0) {
      console.log(`Found ${safes.length} Safe(s) on ${network}:`);

      for (const safeAddress of safes) {
        console.log(`\n  Safe Address: ${safeAddress}`);

        // Get additional details about the safe
        const details = await getSafeDetails(safeAddress, network);

        if (details) {
          console.log(
            `    Threshold: ${details.threshold}/${details.owners.length}`
          );
          console.log(`    Nonce: ${details.nonce}`);
          console.log(`    Owners:`);
          details.owners.forEach((owner, index) => {
            const isTarget = owner.toLowerCase() === targetOwner.toLowerCase();
            console.log(
              `      ${index + 1}. ${owner}${isTarget ? " (TARGET)" : ""}`
            );
          });
        }
      }
    } else {
      console.log(`  No Safes found`);
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("Search complete!");
}

// Alternative method using Etherscan API (requires API key)
async function findSafesViaEtherscan(ownerAddress, etherscanApiKey) {
  const ETHERSCAN_API = "https://api.etherscan.io/api";

  try {
    // Get all transactions for the address
    const txResponse = await fetch(
      `${ETHERSCAN_API}?module=account&action=txlist&address=${ownerAddress}&apikey=${etherscanApiKey}`
    );

    const txData = await txResponse.json();

    if (txData.status !== "1") {
      throw new Error("Failed to fetch transactions");
    }

    // Look for Safe-related contract interactions
    const safeContracts = new Set();
    const SAFE_SIGNATURES = [
      "0xa0e67e2b", // getOwners()
      "0x2f54bf6e", // isOwner(address)
      "0xe318b52b", // swapOwner(address,address,address)
      "0x0d582f13", // addOwnerWithThreshold(address,uint256)
    ];

    txData.result.forEach((tx) => {
      if (tx.input && SAFE_SIGNATURES.some((sig) => tx.input.startsWith(sig))) {
        safeContracts.add(tx.to);
      }
    });

    return Array.from(safeContracts);
  } catch (error) {
    console.error("Error with Etherscan method:", error.message);
    return [];
  }
}

// Run the main function
main().catch(console.error);

// Export for use as module
module.exports = { findSafesForOwner, getSafeDetails, findSafesViaEtherscan };
