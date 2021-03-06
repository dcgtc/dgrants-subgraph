import { Address, BigDecimal, BigInt, Bytes, DataSourceContext } from "@graphprotocol/graph-ts"
import {
    GrantDonation as GrantDonationFilter,
    GrantRoundCreated as GrantRoundCreatedFilter,
} from "../generated/GrantRoundManager/GrantRoundManager"
import { GrantDonation, GrantRound } from "../generated/schema"
import { GrantRound as GrantRoundTemplate } from '../generated/templates'

export function handleGrantDonation(event: GrantDonationFilter): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = GrantDonation.load(`${event.transaction.hash.toHex()}-${event.params.grantId.toHex()}`)

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new GrantDonation(`${event.transaction.hash.toHex()}-${event.params.grantId.toHex()}`)
    }

    // Entity fields can be set based on event parameters
    entity.id = `${event.transaction.hash.toHex()}-${event.params.grantId.toHex()}`
    entity.grantId = event.params.grantId
    entity.donationAmount = new BigDecimal(event.params.donationAmount)
    entity.tokenIn = event.params.tokenIn
    entity.from = event.transaction.from
    entity.hash = event.transaction.hash
    entity.rounds = event.params.rounds.map<Bytes>((roundAddress:Address) => roundAddress as Bytes)
    entity.lastUpdatedBlockNumber = event.block.number
    entity.lastUpdatedTimestamp = event.block.timestamp
    entity.createdAtTimestamp = 
        entity.createdAtTimestamp != new BigInt(0) ? entity.createdAtTimestamp : event.block.timestamp

    // Entities can be written to the store with `.save()`
    entity.save()
}

export function handleGrantRoundCreated(event: GrantRoundCreatedFilter): void {
    // Create a dataSource context to share with the GrantRoundTemplate
    const context = new DataSourceContext()
    // attach the GrantRound address to the context to associate with the donations
    context.setBytes("address", event.params.grantRound)
    // create the GrantRound and start listening for events
    GrantRoundTemplate.createWithContext(event.params.grantRound, context)

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
    entity.lastUpdatedBlockNumber = event.block.number
    entity.lastUpdatedTimestamp = event.block.timestamp
    entity.createdAtTimestamp = 
        entity.createdAtTimestamp != new BigInt(0) ? entity.createdAtTimestamp : event.block.timestamp

    // Entities can be written to the store with `.save()`
    entity.save()
}