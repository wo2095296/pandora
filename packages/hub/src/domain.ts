import {MessengerClient} from 'pandora-messenger';
import {ServiceConsumer} from './service/ServiceConsumer';

export interface Location {
  initialization?: boolean;
  appName?: string;
  processName?: string;
  pid?: string;
  clientId?: string;
}

export interface Selector extends Location {
  serviceName?: string;
  tag?: string;
}

export const selectorSchema  = [
  'clientId',
  'appName',
  'processName',
  'pid',
  'serviceName',
  'tag'
];

export interface ServiceMessage extends HubMessage {
  propertyName: string;
}

export interface HubMessage extends MessagePackage {
  action: string;
}

export interface MessagePackage {
  needReply?: boolean;
  broadcast?: boolean;
  host?: Selector;
  remote?: Selector;
  data?: any;
}

export interface ReplyPackage extends MessagePackage {
  success?: boolean;
  error?: any;
  batchReply?: Array<ReplyPackage>;
}

export interface PublishPackage extends MessagePackage {
  broadcast?: null;
  remote?: null;
  data: {
    selector: Selector
  };
}

export interface LookupPackage extends MessagePackage {
  broadcast?: null;
  remote?: null;
  data: {
    selector: Selector
  };
}

export interface ForceReplyFn {
  (ReplyPackage): void;
}

export interface SelectedInfo {
  client: MessengerClient;
  selector: Selector;
}

export interface DispatchHandler {
  dispatch(message: HubMessage): Promise<any> | any
}

export interface ServiceDescription {
  name: string;
  tag?: string;
}

export interface ServiceObjectSpecial {
  new?();
  serviceName?: string;
  serviceTag?: string;
  getProxy?(autoBuild): any;
}

export interface Introspection {
  properties: Array<{
    name: string;
    type: string;
  }>;
  methods: Array<{
    name: string;
    length: number;
  }>;
}

export interface ServiceProxyBehaviour {
  host: {
    invoke (host: any, method: string, params: any[]): Promise<any>;
    getProperty (host: any, name: string): Promise<any>;
    introspect(host: any): Introspection;
  };
  proxy: {
    invoke (proxy: any, consumer: ServiceConsumer, method: string, params: any[]): Promise<any>
    getProperty (proxy: any, consumer: ServiceConsumer, name: string): Promise<any>;
  };
}

export interface ClientOptions {
  location: Location;
  logger?: any;
}

export interface FacadeSetupOptions extends ClientOptions {
}
