import {
  NearBindgen,
  near,
  call,
  view,
  initialize,
  LookupMap,
  UnorderedMap,
} from "near-sdk-js";
import { AccountId } from "near-sdk-js/lib/types";

// Zoan is a NFT for game play
class Zoan {
  zoan_id: number;
  owner_id: AccountId;
  name: string;
  rare: number;
  tribe :string;
  exp : number;
  media_uri: string;
  level: number;
  constructor(
    zoan_id: number,
    owner_id: AccountId,
    name: string,
    rare: number,
    tribe :string,
    exp : number,
    media_uri: string,
    level: number
  ) {
    (this.zoan_id = zoan_id),
    (this.owner_id = owner_id),
    (this.name = name),
    (this.rare = rare),
    (this.tribe =tribe),
    (this.exp = exp),
    (this.media_uri = media_uri),
    (this.level = level)

  }
}

@NearBindgen({})
class Contract {
  owner_id: AccountId;
  zoan_id: number;
  owner_by_id: LookupMap<string>; //data zoan on account
  zoan_by_id: LookupMap<Zoan>; //data of Zoans
  approved_account_ids : LookupMap<string>
  total_supply_zoan : number;

  constructor() {
    this.zoan_id = 0;
    this.owner_id = "";
    this.total_supply_zoan = 200000
    this.owner_by_id = new LookupMap("owner_by_id");
    this.zoan_by_id = new LookupMap("zoan_by_id");
    this.approved_account_ids = new LookupMap("approved_account_ids");
  }

  @initialize({})
  init({ owner_id , total_supply_zoan}: { owner_id: AccountId, total_supply_zoan: number}) {
    this.zoan_id = 0;
    this.owner_id = owner_id;
    this.total_supply_zoan = total_supply_zoan;
  }

  @call({}) // zoan_id = 0
  mint_zoan({ zoan_owner_id } : {zoan_owner_id: AccountId}) {
    //@todo get random rare, tribe for make a NFT
    this.owner_by_id.set(this.zoan_id.toString(),zoan_owner_id)
    let rare = 2 ; // must random 1 ~ 6 
    let tribe = "Skyler"; // must random in Skyler, Hydrein, Plasmer,Stonic  ,
    let name = "Zoan"; // must random follow rare and tribe
    let media_uri = "http://" // followed by name

    let zoan = new Zoan(
      this.zoan_id,
      zoan_owner_id,
      name,
      rare,
      tribe,
      0 , //exp = 0
      media_uri,
      0, // level = 0

    );

    this.zoan_by_id.set(this.zoan_id.toString(),zoan) // save zoan to dataZoan
    
    this.zoan_id++;

    return zoan;
  }

  @call({})
  nft_approve({zoan_id, account_id} :{zoan_id : number, account_id :AccountId}){
    this.approved_account_ids.set(zoan_id.toString(), account_id)
  }

  @view({})
  nft_token({zoan_id} :{zoan_id :number}){
    let aproved_id = this.approved_account_ids.get(zoan_id.toString())
    let owner_id = this.owner_by_id.get(zoan_id.toString())
    return {
      "token_id": zoan_id.toString(),
      "owner_id": owner_id,
      "approved_account_ids" : {
        aproved_id
      }
    }
  }

  @view({})
  nft_is_approved({zoan_id, approved_account_id}: {zoan_id : number,approved_account_id: AccountId }){
    let approved_account_id_get = this.approved_account_ids.get(zoan_id.toString());
    if(approved_account_id_get == approved_account_id){
      return true;
    }else{
      return false;
    }

  }
  // @call({})
  // nft_revoke({account_id, zoan_id}: {account_id: AccountId, zoan_id :number}){
  //   this.approved_account_ids.remove(zoan_id.toString(),account_id);
  // }
  // //transfer
  // @call({})
  // nft_transfer({receiver_id, zoan_id}: {receiver_id:string, zoan_id :number}){
  //   if(this.nft_is_approved(zoan_id,)){
  //     this.owner_by_id.remove(zoan_id.toString(),receiver_id)
  //     //@todo set lookup
  //   }
  // }
  @view({})
  get_total_zoan() {
    return this.zoan_id;
  }

  @view({})
  get_total_supply_zoan() {
    return this.total_supply_zoan
}
}