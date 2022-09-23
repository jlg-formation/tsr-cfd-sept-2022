import { Config } from "./interfaces/Config";
import { querySelector } from "./utils";

type CallbackFn = (newConfig: Config) => void;

export class Command {
  callback: CallbackFn = () => {};

  constructor(public config: Config) {
    this.render();
    this.setActions();
  }

  onUpdate(callback: CallbackFn) {
    this.callback = callback;
  }

  render() {
    const keys: (keyof Config)[] = ["samples", "multiplicationFactor"];
    for (const key of keys) {
      const elt = querySelector(`div.command label.${key} span`);
      elt.innerHTML = this.config[key] + "";
      const inputElt = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      inputElt.value = this.config[key] + "";
    }
  }

  setActions() {
    const keys: (keyof Config)[] = ["samples", "multiplicationFactor"];
    for (const key of keys) {
      const inputElt = querySelector(
        `div.command label.${key} input`,
        HTMLInputElement
      );
      inputElt.addEventListener("input", () => {
        this.config[key] = +inputElt.value;
        this.render();
        this.callback(this.config);
      });
    }
  }
}
