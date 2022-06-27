import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsuarioRegistrado } from '../../../domain/events/usuario-registrado.event';

@EventsHandler(UsuarioRegistrado)
export class UsuarioRegisteredHandler implements IEventHandler<UsuarioRegistrado> {
  constructor() {}

  handle(event: UsuarioRegistrado) {
    //something after the registration
    console.log(event);
  }
}