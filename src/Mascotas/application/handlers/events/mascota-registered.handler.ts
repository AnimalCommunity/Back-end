import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MascotaRegistrado } from '../../../domain/events/mascota-registrado.event';

@EventsHandler(MascotaRegistrado)
export class MascotaRegisteredHandler implements IEventHandler<MascotaRegistrado> {
  constructor() {}

  handle(event: MascotaRegistrado) {
    //something after the registration
    console.log(event);
  }
}