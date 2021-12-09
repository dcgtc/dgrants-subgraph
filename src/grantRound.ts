import { BigInt, dataSource } from "@graphprotocol/graph-ts"
import { AddMatchingFunds } from "../generated/templates/GrantRound/GrantRound"
import { GrantRoundDonation } from "../generated/schema"

export function handleAddMatchingFunds(event: AddMatchingFunds): void {
    // extract the grantRounds context
    const context = dataSource.context()

    // extract the GrantRound address from the context used to create the GrantRound template
    const address = context.getBytes("address")

    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    const entity = new GrantRoundDonation(event.transaction.hash.toHex())

    // Entity fields can be set based on event parameters
    entity.id = event.transaction.hash.toHex()
    entity.round = address
    entity.contributor = event.params.contributor
    entity.amount = event.params.amount
    entity.hash = event.transaction.hash
    entity.lastUpdatedBlockNumber = event.block.number
    entity.lastUpdatedTimestamp = event.block.timestamp
    entity.createdAtTimestamp = 
        entity.createdAtTimestamp != new BigInt(0) ? entity.createdAtTimestamp : event.block.timestamp

    // Entities can be written to the store with `.save()`
    entity.save()
}


