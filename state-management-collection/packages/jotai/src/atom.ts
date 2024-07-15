export type Getter = <Value>(atom: ReadableAtom<Value>) => Value

export type Setter = <Value, Args extends unknown[], Result>(
  atom: WritableAtom<Value, Args, Result>,
  ...args: Args
) => Result

type Read<Value> = (get: Getter) => Value
type Write<Args extends unknown[], Result> = (
  get: Getter,
  set: Setter,
  ...args: Args
) => Result

// Read-only atom (只读原子)
export type ReadableAtom<Value> = {
  read: Read<Value>
  debugLabel: string
}
// Read-Write atom (读写原子)
export type WritableAtom<Value, Args extends unknown[], Result> = {
  write: Write<Args, Result>
  debugLabel: string
} & ReadableAtom<Value>

type SetStateAction<Value> = Value | ((prev: Value) => Value)
// Primitive atom (原始原子)
export type PrimitiveAtom<Value> = WritableAtom<
  Value,
  [SetStateAction<Value>],
  void
>

export function atom<Value, Args extends unknown[], Result>(
  read: Value | Read<Value>,
  write?: Write<Args, Result>,
) {
  const config = {} as WritableAtom<Value, Args, Result> & { init?: Value }
  if (typeof read === 'function') {
    config.read = read as Read<Value>
  } else {
    config.init = read
    config.read = (get) => get(config)
    config.write = (get: Getter, set: Setter, arg: SetStateAction<Value>) =>
      set(
        config as unknown as PrimitiveAtom<Value>,
        typeof arg === 'function'
          ? (arg as (prev: Value) => Value)(get(config))
          : arg,
      )
  }
  if (write) {
    config.write = write
  }
  return config
}
