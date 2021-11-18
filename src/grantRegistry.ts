import {
  GrantCreated,
  GrantUpdated
} from "../generated/GrantRegistry/GrantRegistry"
import { Grant } from "../generated/schema"

export function handleGrantCreated(event: GrantCreated): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = Grant.load(event.params.id.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new Grant(event.params.id.toHex())
    }

    // Entity fields can be set based on event parameters
    entity.id = event.params.id.toHex()
    entity.owner = event.params.owner
    entity.payee = event.params.payee

    const metaPtr = event.params.metaPtr
    entity.metaPtr = [metaPtr.protocol.toString(), metaPtr.pointer].join('-')

    entity.lastUpdatedBlockNumber = event.block.number
    entity.lastUpdatedTimestamp = event.block.timestamp
    entity.createdAtTimestamp =
        entity.createdAtTimestamp.toString() !== "0" ? entity.createdAtTimestamp : event.block.timestamp

    // Entities can be written to the store with `.save()`
    entity.save()
}

export function handleGrantUpdated(event: GrantUpdated): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = Grant.load(event.params.id.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new Grant(event.params.id.toHex())
    }

    // Entity fields can be set based on event parameters
    entity.id = event.params.id.toHex()
    entity.owner = event.params.owner
    entity.payee = event.params.payee

    const metaPtr = event.params.metaPtr
    entity.metaPtr = [metaPtr.protocol.toString(), metaPtr.pointer].join('-')

    entity.lastUpdatedBlockNumber = event.block.number
    entity.lastUpdatedTimestamp = event.block.timestamp
    entity.createdAtTimestamp =
        entity.createdAtTimestamp.toString() !== "0" ? entity.createdAtTimestamp : event.block.timestamp

    // Entities can be written to the store with `.save()`
    entity.save()
}
