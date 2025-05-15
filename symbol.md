# 🧠 JavaScript Symbols: Complete Overview

---

## 🧱 What is a Symbol?

* A **primitive type** introduced in ES6.
* Created using `Symbol([description])`.
* Always **unique**, even if the description is the same.

```js
const a = Symbol('id');
const b = Symbol('id');
a === b; // false
```

---

## 📌 Use Cases for Symbols

### 1. 🔒 Unique Object Property Keys

* Prevents naming collisions.
* Often used for internal metadata or library-level logic.

```js
const id = Symbol();
const obj = {
  [id]: 123,
  name: 'Alice'
};
```

### 2. 🙈 Hidden (Non-enumerable) Properties

* Symbol-keyed properties are not visible in:

  * `for...in`
  * `Object.keys()`
  * `JSON.stringify`
* Accessible via:

  * `Object.getOwnPropertySymbols(obj)`
  * `Reflect.ownKeys(obj)`

### 3. 🧩 Metaprogramming with Well-known Symbols

JavaScript includes built-in symbols that let you override or extend native behavior:

| Symbol                      | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| `Symbol.iterator`           | Makes objects iterable                    |
| `Symbol.toPrimitive`        | Custom type coercion                      |
| `Symbol.toStringTag`        | Custom `[object Type]` output             |
| `Symbol.hasInstance`        | Custom `instanceof` behavior              |
| `Symbol.match`, etc.        | Custom RegExp behavior                    |
| `Symbol.isConcatSpreadable` | Controls array-like spread                |
| `Symbol.species`            | Controls constructor return in subclasses |
| `Symbol.unscopables`        | Excludes keys from `with` scope           |

Example:

```js
const obj = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
  },
};

[...obj]; // [1, 2]
```

---

## 🔄 Global Symbol Registry

### `Symbol.for(key)`

* Retrieves or creates a globally shared symbol.

### `Symbol.keyFor(symbol)`

* Gets the key for a global symbol.

```js
const globalId = Symbol.for('id');
const sameId = Symbol.for('id');
globalId === sameId; // true
Symbol.keyFor(globalId); // 'id'
```

---

## 🔥 Caveats & Gotchas

| Feature           | Symbol Behavior                                      |
| ----------------- | ---------------------------------------------------- |
| Not auto-boxed    | `Symbol()` is not automatically wrapped like strings |
| Not JSON-safe     | `JSON.stringify({ [Symbol()]: 'x' })` → `{}`         |
| Not truly private | Hidden, but accessible via `getOwnPropertySymbols()` |
| `new Symbol()`    | ❌ Throws error (cannot be used as constructor)       |

---

## ✅ When to Use Symbols

* To add non-colliding keys.
* For internal state or meta-properties.
* In polyfills and libraries.
* To use or customize JS language features (via well-known symbols).

---

## ❌ When Not to Use Symbols

* When keys should be visible or enumerable.
* If you need JSON serialization.
* For real privacy — use `#privateFields` in classes.

---

## 🔍 Symbol Descriptions

```js
const sym = Symbol('debug');
console.log(sym.description); // 'debug'
```

* Description is just for debugging/labeling; doesn’t affect uniqueness.

---

## 🧠 Using Symbols in Custom `call` Implementation

```js
Function.prototype.myCall = function (thisArg, ...argArray) {
  const sym = Symbol();
  const wrapperObj = Object(thisArg);

  Object.defineProperty(wrapperObj, sym, {
    enumerable: false,
    value: this,
  });

  const result = wrapperObj[sym](...argArray);
  delete wrapperObj[sym];
  return result;
};
```

### Why Use a Symbol?

* To avoid property name collisions.
* Ensures uniqueness and safety.

### Why `Object(thisArg)`?

* Boxes primitives (like `'hello'`, `42`) into objects.
* Avoids TypeError from assigning properties to non-objects.

### Why `Object.defineProperty`?

* Hides the temp method (non-enumerable).
* More faithful to native behavior.

---

## 🧾 Bracket Notation `[]` with Symbols

### Why You Must Use `[]`:

* Dot notation can’t access symbols: `obj.sym` treats it as a string.
* Bracket notation evaluates the expression and uses the **actual symbol**.

```js
const sym = Symbol();
const obj = {
  [sym]: 'secret'
};

obj[sym]; // 'secret'
```

| Syntax       | Result                  |
| ------------ | ----------------------- |
| `obj.key`    | Uses string `'key'`     |
| `obj['key']` | Also string `'key'`     |
| `obj[sym]`   | ✅ Uses the symbol value |

---

## ✨ Final Summary

> **Symbols provide a safe, unique way to define object properties, power advanced language features, and write cleaner, more collision-resistant code.**

Use them wisely in libraries, framework internals, and custom behavior hooks — and always use bracket notation to work with them!
