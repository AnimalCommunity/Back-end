import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AdopcionRegistrado } from '../../../domain/events/adopcion-registrado.event';

@EventsHandler(AdopcionRegistrado)
export class AdopcionRegisteredHandler implements IEventHandler<AdopcionRegistrado> {
  constructor() {}

  handle(event: AdopcionRegistrado) {
    //something after the registration
    console.log(event);
  }
}