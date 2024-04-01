import process from "process";

type FulfillReaction<T> = (value: T) => void;
type RejectReaction = (reason: Error) => void;

type Executor<T> = (
  resolve: FulfillReaction<T>,
  reject?: RejectReaction
) => void;

enum State {
  pending = "pending",
  fulfilled = "fulfilled",
  rejected = "rejected",
}

class MyPromise<T = any> {
  #state: State = State.pending;

  #fulfillReactions: FulfillReaction<T>[] = [];
  #rejectReactions: RejectReaction[] = [];

  #result: T | Error | undefined = undefined;

  constructor(executor: Executor<T>) {
    if ("function" !== typeof executor) {
      throw TypeError("Promise executor is not a function");
    }

    executor(
      (value: T) => {
        this.#result = value;
        this.#state = State.fulfilled;
        process.nextTick(() => {
          this.#fulfillReactions.forEach((reaction) => reaction(value));
        });
      },
      (reason: Error) => {
        this.#result = reason;
        this.#state = State.rejected;
        process.nextTick(() => {
          this.#rejectReactions.forEach((reaction) => reaction(reason));
        });
      }
    );
  }

  public then(
    fulfillReaction?: FulfillReaction<T>,
    rejectReaction?: RejectReaction
  ): MyPromise<T> {
    if (this.#state === State.pending) {
      return new MyPromise<T>((resolve, reject) => {
        const tempFulfillReaction = (value: T) => {
          fulfillReaction?.(value);
          resolve(value);
        };
        this.#fulfillReactions.push(tempFulfillReaction);
        const tempRejectReaction = (reason: Error) => {
          rejectReaction?.(reason);
          reject?.(reason);
        };
        this.#rejectReactions.push(tempRejectReaction);
      });
    }
    if (this.#state === State.fulfilled) {
      return new MyPromise<T>((resolve) => {
        resolve(this.#result as T);
      });
    }
    if (this.#state === State.rejected) {
      return new MyPromise<T>((resolve, reject) => {
        reject?.(this.#result as Error);
      });
    }
    return new MyPromise(() => {});
  }

  public catch(rejectReaction?: RejectReaction): MyPromise<T> {
    return this.then(undefined, rejectReaction);
  }
}

new MyPromise((resolve) => {
  resolve(1);
})
  .then((result) => {
    throw Error(`${result}`);
  })
  .catch((err) => console.log(err));

Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let fulfilledCount = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((result) => {
        results[i] = result;
        fulfilledCount += 1;
        if (fulfilledCount === promises.length) {
          resolve(results);
        }
      }, reject);
    }
  });
};

Promise.any = (promises) => {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let rejectedCount = 0;
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve, (result) => {
        results[i] = result;
        rejectedCount += 1;
        if (rejectedCount === promises.length) {
          reject(AggregateError(results));
        }
      });
    }
  });
};

Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve, reject);
    }
  });
};
