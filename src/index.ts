import * as _ from 'lodash'

export enum BatchOperationType {
	Create,
	Set,
	Update,
	Delete
}

export interface BatchOperationValue {
	ref: any
	data: Record<string, any> | null
}

export interface BatchOperation {
	type: BatchOperationType
	value: BatchOperationValue
}

export default class Batch {
	private static MAX_CHUNK_SIZE = 500
	
	private firestore: any
	private operations: BatchOperation[]
	
	constructor(firestore: any, operations: BatchOperation[] = []) {
		this.firestore = firestore
		this.operations = operations
	}
	
	private addOperation = (type: BatchOperationType, value: BatchOperationValue) => (
		this.operations.push({ type, value }),
		this
	)
	
	create = (ref: any, data: Record<string, any>) =>
		this.addOperation(BatchOperationType.Create, { ref, data })
	
	set = (ref: any, data: Record<string, any>) =>
		this.addOperation(BatchOperationType.Set, { ref, data })
	
	update = (ref: any, data: Record<string, any>) =>
		this.addOperation(BatchOperationType.Update, { ref, data })
	
	delete = (ref: any) =>
		this.addOperation(BatchOperationType.Delete, { ref, data: null })
	
	private addOperationToBatch = ({ type, value }: BatchOperation, batch: any) => {
		switch (type) {
			case BatchOperationType.Create:
				return batch.create(value.ref, value.data ?? {})
			case BatchOperationType.Set:
				return batch.set(value.ref, value.data ?? {})
			case BatchOperationType.Update:
				return batch.update(value.ref, value.data ?? {})
			case BatchOperationType.Delete:
				return batch.delete(value.ref)
		}
	}
	
	commit = async () => {
		for (const operations of _.chunk(this.operations, Batch.MAX_CHUNK_SIZE)) {
			const batch = this.firestore.batch()
			
			for (const operation of operations)
				this.addOperationToBatch(operation, batch)
			
			await batch.commit()
		}
	}
}

export { Batch }
