import { IHttpParamDeserializerRegistry, IHttpParamStyleDeserializer } from './types';

export class HttpParamDeserializerRegistry<
  D extends IHttpParamStyleDeserializer<T>,
  T extends Function
> implements IHttpParamDeserializerRegistry<T> {
  constructor(private deserializers: D[]) {}

  public get(style: string): T | undefined {
    const deserializer = this.deserializers.find(d => d.supports(style));

    if (!deserializer) {
      return;
    }

    return deserializer.deserialize.bind(deserializer);
  }
}
