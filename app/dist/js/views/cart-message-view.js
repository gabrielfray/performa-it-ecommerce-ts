import { View } from './view.js';
export class CartMessageView extends View {
    template(model, alertType) {
        return `
            <p class="alert ${alertType}">${model}</p>
        `;
    }
}
