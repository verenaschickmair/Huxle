import type { LetterState } from "@/types/LetterState";

export class KeyType {
  input: string;
  output: string;
  state: LetterState;

  constructor(input: string, output: string, state: LetterState) {
    this.input = input;
    this.output = output;
    this.state = state;
  }

  hasKey(value: string) {
    return (
      value.localeCompare(this.output, undefined, { sensitivity: "base" }) === 0
    );
  }

  canChangeState(newState: LetterState) {
      const currentStateNumber = this.getStateNumber(this.state)
      const newStateNumber = this.getStateNumber(newState)
      return currentStateNumber<newStateNumber

  }

  private getStateNumber(state: LetterState) {
    switch (state) {
      case "empty":
        return 1;
      case "miss":
        return 2;
      case "hint":
        return 3;
      case "found":
        return 4;
    }
  }
}
