
import { View } from './view.js';

export class CartMessageView extends View<string> {

  protected template(model: string, alertType: string): string {
    return `
            <p class="alert ${alertType}">${model}</p>
        `
  }
}