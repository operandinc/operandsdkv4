# Operand v4 SDK

WIP.

Creating a client:

```tsx
import { OperandV4 } from 'operandsdkv4';

const operand = new OperandV4('API_KEY');
```

Creating a Collection/Object/Searching:

```tsx
// Create a collection
const collection = await operand.upsertObject({
  object_type: ObjectType.OBJECT_TYPE_COLLECTION,
  metadata: {
    collection: {},
  },
  label: 'blue',
});

console.log('Created collection', collection);
// Add a text object to our collection
const textObject = await operand.upsertObject({
  parent_id: collection.object.id,
  object_type: ObjectType.OBJECT_TYPE_TEXT,
  metadata: {
    text: {
      text: 'Hello World',
    },
  },
  properties: {
    properties: {
      color: { text: 'blue' },
    },
  },
});
console.log('Created text object', textObject);

// Search over the collection for everything with size 12
const results = await operand.search({
  query: 'Hello',
  roots: [collection.object.id],
  filter: {
    conditions: [
      {
        property: {
          key: 'color',
          property: {
            text: 'blue',
          },
        },
      },
    ],
  },
});
console.log(results);
```
