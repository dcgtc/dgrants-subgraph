import { Address, BigDecimal, Bytes } from "@graphprotocol/graph-ts"
import {
    GrantDonation as GrantDonationFilter,
    GrantRoundCreated as GrantRoundCreatedFilter,
} from "../generated/GrantRoundManager/GrantRoundManager"
import { GrantDonation, GrantRound } from "../generated/schema"
  
  export function handleGrantDonation(event: GrantDonationFilter): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = GrantDonation.load(event.params.grantId.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new GrantDonation(event.params.grantId.toHex())
    }

    // Written like this to force compiler to accept it
    const rounds: Bytes[] = []
    for (let i = 0; i++; i < event.params.rounds.length) {
        rounds.push(event.params.rounds[i]);
    }

    // Entity fields can be set based on event parameters
    entity.id = event.params.grantId.toHex()
    entity.grantId = event.params.grantId
    entity.donationAmount = new BigDecimal(event.params.donationAmount)
    entity.tokenIn = event.params.tokenIn
    entity.from = event.transaction.from
    entity.blockNumber = event.block.number
    entity.rounds = rounds

    // Entities can be written to the store with `.save()`
    entity.save()
  }

  export function handleGrantRoundCreated(event: GrantRoundCreatedFilter): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = GrantRound.load(event.params.grantRound.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new GrantRound(event.params.grantRound.toHex())
    }

    // Entity fields can be set based on event parameters
    entity.id = event.params.grantRound.toHex()
    entity.address = event.params.grantRound

    // Entities can be written to the store with `.save()`
    entity.save()
}