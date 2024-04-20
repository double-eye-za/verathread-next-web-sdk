import {InjectionToken, ModuleWithProviders, NgModule, NgZone} from "@angular/core";
import {Apollo, APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {InMemoryCache} from '@apollo/client/cache';
import type {ApolloClientOptions} from "@apollo/client/core";

export const GRAPHQL_CONFIG = new InjectionToken<GraphQLConfiguration>('graphql.config');

export interface GraphQLConfiguration {
  url: string;
}

const apolloFactory = (httpLink: HttpLink, cfg: GraphQLConfiguration) => {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    authorization: token ? `Bearer ${token}` : "",
  });

  return {
    link: httpLink.create({
      uri: cfg.url,
      headers,
      withCredentials: false
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    }
  };
}

const apolloOptions = (httpLink: HttpLink, cfg: GraphQLConfiguration): ApolloClientOptions<any> => {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    authorization: token ? `Bearer ${token}` : "",
  });

  return {
    link: httpLink.create({
      uri: cfg.url,
      headers,
      withCredentials: false
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
    }
  };
}

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
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
            return new Apollo(zone, apolloOptions(httpLink, config))
          }, deps: [HttpLink]
        },
        Apollo
      ]
    }
  }

  static apolloFactory(): Function {
    return apolloFactory
  }

  constructor(apollo: Apollo) {
  }
}
