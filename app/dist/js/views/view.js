export class View {
    constructor(seletor) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique`);
        }
    }
    update(model, messageType) {
        let template = this.template(model, messageType);
        this.elemento.innerHTML = template;
    }
    clear() {
        this.elemento.innerHTML = "";
    }
}
