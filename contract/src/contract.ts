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

class Egg {
  token_id: number;
  owner_id: AccountId;
  name: string;
  tribe :string;
  class: string;
  media_uri: string;
  issued_at : number;

}
class Zoan {
  token_id: number;
  owner_id: AccountId;
  name: string;
  rare: string;
  tribe :string;
  class: string;
  exp : number;
  media_uri: string;
  level: number;
  issued_at : number;

}

@NearBindgen({})
class Contract {
  owner_id: AccountId;
  token_id: number;
  constructor() {
    this.token_id = 0;
    this.owner_id = "";

  }

  @initialize({})
  init({ owner_id }: { owner_id: AccountId }) {
    this.token_id = 0;
    this.owner_id = owner_id;
  }

  @call({}) // token_id = 0
  mint_egg({ token_owner_id, name, tribe,class, media_uri, issued_at }) {

    let token = new Egg(
      this.token_id,
      token_owner_id,
      name,
      tribe,
      class,
      media_uri,
      issued_at

    );


    this.token_id++;

    return token;
  }

  

  @view({})
  get_supply_tokens() {
    return this.token_id;
  }
}