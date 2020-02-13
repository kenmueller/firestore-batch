/**
 * The type of operation to perform in a `Batch`
 * 
 * Options:
 * 
 * - `Create`
 * - `Set`
 * - `Update`
 * - `Delete`
 */
export enum BatchOperationType {
	Create,
	Set,
	Update,
	Delete
}

/**
 * **ref**: A document reference. Create this using `firestore.doc('users/{...}')`.
 * **data**: The data to be inserted into the document. Can be `null` if this is a `delete` operation.
 */
export interface BatchOperationValue {
	ref: any
	data: Record<string, any> | null
}

/**
 * An operation to be performed on `batch.commit()`.
 * 
 * Contains a `type` and a `value`.
 */
export interface BatchOperation {
	type: BatchOperationType
	value: BatchOperationValue
}

/**
 * A Firestore batch with no document limit.
 */
export default class Batch {
	/**
	 * Create a new `Batch`.
	 * 
	 * @param firestore The firestore admin instance that has already been initialized.
	 * @param operations Initialize this batch with some operations. This is not necessary.
	 */
	constructor(firestore: any, operations?: BatchOperation[])
	
	/**
	 * Adds a `Create` operation to this `Batch`.
	 * 
	 * @param ref The document reference you are creating.
	 * @param data The data to be inserted into the document.
	 * 
	 * @returns This `Batch` instance.
	 */
	create(ref: any, data: Record<string, any>): Batch
	
	/**
	 * Adds a `Set` operation to this `Batch`.
	 * 
	 * @param ref The document reference you are setting.
	 * @param data The data to be inserted into the document.
	 * 
	 * @returns This `Batch` instance.
	 */
	set(ref: any, data: Record<string, any>): Batch
	
	/**
	 * Adds an `Update` operation to this `Batch`.
	 * 
	 * @param ref The document reference you are updating.
	 * @param data The data to be inserted into the document.
	 * 
	 * @returns This `Batch` instance.
	 */
	update(ref: any, data: Record<string, any>): Batch
	
	/**
	 * Adds a `Delete` operation to this `Batch`.
	 * 
	 * @param ref The document reference you are deleting.
	 * 
	 * @returns This `Batch` instance.
	 */
	delete(ref: any): Batch
	
	/**
	 * Executes all of the operations on this `Batch`.
	 * No changes will take effect if this method is not called.
	 * 
	 * @returns A new `Promise`.
	 */
	commit(): Promise<void>
}

export { Batch }
