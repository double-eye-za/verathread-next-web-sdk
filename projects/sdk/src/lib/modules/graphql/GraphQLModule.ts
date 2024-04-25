import {InjectionToken, ModuleWithProviders, NgModule, NgZone} from "@angular/core";
import {Apollo, APOLLO_OPTIONS} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {InMemoryCache} from '@apollo/client/cache';
import {ApolloClientOptions, ApolloLink, from, Operation, split} from "@apollo/client/core";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";
import {OperationDefinitionNode} from "graphql/language/ast";
import {RetryLink} from "@apollo/client/link/retry";

export const GRAPHQL_CONFIG = new InjectionToken<GraphQLConfiguration>('graphql.config');

export interface GraphQLConfiguration {
  url: string;
  wsUrl: string
}

function setTokenInHeader(operation: Operation) {
  if (localStorage.getItem('token')) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'charset=utf-8',
      },
    });
  }
}

const apolloFactory = (httpLink: HttpLink, cfg: GraphQLConfiguration): ApolloClientOptions<any> => {
  console.info('initializing apollo', cfg.url, cfg.wsUrl);

  const auth = new ApolloLink((operation, forward) => {
    setTokenInHeader(operation);
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        };
      },
    },
  });

  const http = httpLink.create({
    uri: cfg.url,
  })

  const link = from([
    auth,
    new RetryLink({
      delay: {
        initial: 300,
        max: 5000,
        jitter: true,
      },
      attempts: {
        max: 3,
        retryIf: (error, _operation) => !!error,
      },
    }),
    split(
      ({ query }) => {
        const data = getMainDefinition(query);
        return data.kind === 'OperationDefinition' && data.operation === 'subscription';
      },
      ws,
      http
    ),
  ]);

  return {
    cache: new InMemoryCache(),
    link: link,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
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
          deps: [HttpLink, GRAPHQL_CONFIG],
        },
        {
          provide: Apollo, useFactory: (zone: NgZone, httpLink: HttpLink) => {
            console.info('initializing apollo client')
            return new Apollo(zone, apolloFactory(httpLink, config))
          }, deps: [NgZone, HttpLink]
        },
      ]
    }
  }

  static apolloFactory(): Function {
    return apolloFactory
  }

  constructor(apollo: Apollo) {
  }
}
