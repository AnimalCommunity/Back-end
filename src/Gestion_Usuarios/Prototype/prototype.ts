import {UsuarioModule} from "../usuario.module";

export class Prototype {
    public primitive: number;
    public component: object;
    public UsuarioReference: UsuarioModule;

    private clone(): this {
        const clone = Object.create(this);
        clone.component = Object.create(this.component);
        clone.UsuarioReference = {
            ...this.UsuarioReference,
            prototype: { ...this },
        };
        return clone;
    }

    public shallowCopy(): this {
        return Object.create(this);
    }

    public deepCopy(): this {
        return this.clone();
    }
}