import { BigInt } from "@graphprotocol/graph-ts"
import {
  GrantCreated,
  GrantUpdated
} from "../generated/GrantRegistry/GrantRegistry"
import { Grant, MetaPtr } from "../generated/schema"

export function handleGrantCreated(event: GrantCreated): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = Grant.load(event.params.id.toHex())
    let metaPtr = MetaPtr.load(event.params.id.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new Grant(event.params.id.toHex())
    }
    if (metaPtr == null) {
        metaPtr = new MetaPtr(event.params.id.toHex())
    }
    
    // Entity fields can be set based on event parameters
    metaPtr.protocol = event.params.metaPtr.protocol
    metaPtr.pointer = event.params.metaPtr.pointer

    // Entity fields can be set based on event parameters
    entity.id = event.params.id.toHex()
    entity.metaPtr = metaPtr.id
    entity.owner = event.params.owner
    entity.payee = event.params.payee
    entity.lastUpdatedBlockNumber = event.block.number
    entity.lastUpdatedTimestamp = event.block.timestamp
    entity.createdAtTimestamp =
        entity.createdAtTimestamp != new BigInt(0) ? entity.createdAtTimestamp : event.block.timestamp

    // Entities can be written to the store with `.save()`
    entity.save()
}

export function handleGrantUpdated(event: GrantUpdated): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = Grant.load(event.params.id.toHex())
    let metaPtr = MetaPtr.load(event.params.id.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new Grant(event.params.id.toHex())
    }
    if (metaPtr == null) {
        metaPtr = new MetaPtr(event.params.id.toHex())
    }

    // Entity fields can be set based on event parameters
    metaPtr.protocol = event.params.metaPtr.protocol
    metaPtr.pointer = event.params.metaPtr.pointer
    
    // Entity fields can be set based on event parameters
    entity.id = event.params.id.toHex()
    entity.metaPtr = metaPtr.id
    entity.owner = event.params.owner
    entity.payee = event.params.payee
    entity.lastUpdatedBlockNumber = event.block.number
    entity.lastUpdatedTimestamp = event.block.timestamp
    entity.createdAtTimestamp =
        entity.createdAtTimestamp != new BigInt(0) ? entity.createdAtTimestamp : event.block.timestamp

    // Entities can be written to the store with `.save()`
    entity.save()
}
