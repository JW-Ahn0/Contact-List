//타입 가드 함수
export function asssertType<T>(value: unknown | null): asserts value is T {
  if (!value) {
    throw new Error(`the value : ${value} was not T type`);
  }
}
