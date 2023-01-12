/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */
const CONTRACT_ID = 'dev-1673509114108-25943907946429'

export class Contract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async get_all_zoan() {
    return await this.wallet.viewMethod({
      contractId: CONTRACT_ID,
      method: "get_all_zoan",
    });
  }
  async get_total_zoan() {
    return await this.wallet.viewMethod({
      contractId : CONTRACT_ID,
      method : "get_total_zoan",
    })
  }
  async mint_zoan({zoan_owner_id}) {
    return await this.wallet.callMethod({
      contractId: CONTRACT_ID,
      method: "mint_zoan",
      args: { zoan_owner_id},
    });
  }
}