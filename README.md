# firestore-batch

> A Firestore batch with no document limit

## Install

```bash
npm i firestore-batch
```

## Import

```javascript
const { Batch } = require('firestore-batch')

import Batch from 'firestore-batch'
```

## Docs

```typescript
/**
 * Create a new `Batch`.
 * 
 * @param firestore The firestore admin instance that has already been initialized.
 * @param operations Initialize this batch with some operations. This is not necessary.
 */
constructor(firestore: any, operations?: BatchOperation[])
```

```typescript
/**
 * Adds a `Create` operation to this `Batch`.
 * 
 * @param ref The document reference you are creating.
 * @param data The data to be inserted into the document.
 * 
 * @returns This `Batch` instance.
 */
create(ref: any, data: Record<string, any>): Batch
```

```typescript
/**
 * Adds a `Set` operation to this `Batch`.
 * 
 * @param ref The document reference you are setting.
 * @param data The data to be inserted into the document.
 * 
 * @returns This `Batch` instance.
 */
set(ref: any, data: Record<string, any>): Batch
```

```typescript
/**
 * Adds an `Update` operation to this `Batch`.
 * 
 * @param ref The document reference you are updating.
 * @param data The data to be inserted into the document.
 * 
 * @returns This `Batch` instance.
 */
update(ref: any, data: Record<string, any>): Batch
```

```typescript
/**
 * Adds a `Delete` operation to this `Batch`.
 * 
 * @param ref The document reference you are deleting.
 * 
 * @returns This `Batch` instance.
 */
delete(ref: any): Batch
```

```typescript
/**
 * Executes all of the operations on this `Batch`.
 * No changes will take effect if this method is not called.
 * 
 * @returns A new `Promise`.
 */
commit(): Promise<void>
```
