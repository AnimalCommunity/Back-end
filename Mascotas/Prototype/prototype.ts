import {MascotaModule} from "../mascota.module";

export class Prototype {
    public primitive: number;
    public component: object;
    public MascotaReference: MascotaModule;

    private clone(): this {
        const clone = Object.create(this);
        clone.component = Object.create(this.component);
        clone.UsuarioReference = {
            ...this.MascotaReference,
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