import {InjectionToken, ModuleWithProviders, NgModule, NgZone} from "@angular/core";
import {Apollo, APOLLO_OPTIONS} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {HttpClientModule} from "@angular/common/http";
import {InMemoryCache} from '@apollo/client/cache';
import {ApolloClientOptions, ApolloLink, from, Operation, split} from "@apollo/client/core";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition, offsetLimitPagination} from "@apollo/client/utilities";
import {GqlService} from "./graphql.service";
import {Logger} from "../logging/logger.service";

export const GRAPHQL_CONFIG = new InjectionToken<GraphQLConfiguration>('graphql.config');

export interface GraphQLConfiguration {
  url: string;
  wsUrl: string;
  tokenLocalStorageToken: string;
}

function setTokenInHeader(operation: Operation, cfg: GraphQLConfiguration) {
  if (localStorage.getItem(cfg.tokenLocalStorageToken)) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${localStorage.getItem(cfg.tokenLocalStorageToken)}`,
        Accept: 'charset=utf-8',
      },
    });
  }
}

const apolloFactory = (httpLink: HttpLink, cfg: GraphQLConfiguration, cache: InMemoryCache, svc: GqlService, log: Logger): ApolloClientOptions<any> => {
  log.debug('initializing apollo', cfg.url, cfg.wsUrl);

  const auth = new ApolloLink((operation, forward) => {
    setTokenInHeader(operation, cfg);
    return forward(operation);
  });

  // Create a WebSocket link:
  const ws = new WebSocketLink({
    uri: cfg.wsUrl,
    options: {
      lazy: true,
      reconnect: true,
      timeout: 30000,
      minTimeout: 10000,
      connectionParams: async () => {
        return {
          Authorization: `Bearer ${localStorage.getItem(cfg.tokenLocalStorageToken)}`,
        };
      },
      connectionCallback: (error, result) => {
        if (error) {
          svc.onConnectionError(error)
          log.error('ws connection error', error);
        }
      }
    },
  });

  const http = httpLink.create({
    uri: cfg.url,
  })

  const link = from([
    auth,
    split(
      ({query}) => {
        const data = getMainDefinition(query);
        return data.kind === 'OperationDefinition' && data.operation === 'subscription';
      },
      ws,
      http
    ),
  ]);

  return {
    connectToDevTools: true,
    assumeImmutableResults: true,
    cache: cache,
    link: link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  }
}

@NgModule({
  imports: [HttpClientModule],
  exports: [],
})
export class GraphQLModule {
  static forRoot(config: GraphQLConfiguration): ModuleWithProviders<GraphQLModule> {
    return {
      ngModule: GraphQLModule,
      providers: [
        {
          provide: GRAPHQL_CONFIG,
          useValue: config
        },
        {
          provide: APOLLO_OPTIONS, useFactory: apolloFactory,
          deps: [HttpLink, GRAPHQL_CONFIG, InMemoryCache],
        },
        {
          provide: Apollo, useFactory: (zone: NgZone, httpLink: HttpLink, cache: InMemoryCache, svc: GqlService, log: Logger) => {
            log.debug('initializing apollo client')
            return new Apollo(zone, apolloFactory(httpLink, config, cache, svc, log))
          }, deps: [NgZone, HttpLink, InMemoryCache, GqlService, Logger]
        },
        {
          provide: InMemoryCache, useValue: new InMemoryCache({
            typePolicies: {
              traders: offsetLimitPagination(['where', 'sort', 'page'])
            }
          })
        },
        {
          provide: GqlService, useClass: GqlService
        }
      ]
    }
  }

  static apolloFactory(): Function {
    return apolloFactory
  }

  constructor(apollo: Apollo) {
  }
}
