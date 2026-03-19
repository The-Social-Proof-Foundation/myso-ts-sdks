/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * You may import it to create a `graphql()` tag function with `gql.tada`
 * by importing it and passing it to `initGraphQLTada<>()`.
 *
 * @example
 * ```
 * import { initGraphQLTada } from 'gql.tada';
 * import type { introspection } from './introspection';
 *
 * export const graphql = initGraphQLTada<{
 *   introspection: typeof introspection;
 *   scalars: {
 *     DateTime: string;
 *     Json: any;
 *   };
 * }>();
 * ```
 */
const introspection = {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "AccumulatorRootCreateTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ActiveJwk",
        "fields": [
          {
            "name": "alg",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "e",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "epoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "iss",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kid",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kty",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "n",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ActiveJwkConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ActiveJwkEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ActiveJwk"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ActiveJwkEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ActiveJwk"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Address",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "addressAt",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "asObject",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "balance",
            "type": {
              "kind": "OBJECT",
              "name": "Balance"
            },
            "args": [
              {
                "name": "coinType",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balances",
            "type": {
              "kind": "OBJECT",
              "name": "BalanceConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicFields",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicFieldConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicObjectField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "multiGetBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Balance"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicObjectFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ObjectFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "transactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "relation",
                "type": {
                  "kind": "ENUM",
                  "name": "AddressTransactionRelationship"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IAddressable"
          },
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AddressAliasStateCreateTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AddressKey",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            }
          },
          {
            "name": "atCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "rootVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "AddressOwner",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "AddressTransactionRelationship",
        "enumValues": [
          {
            "name": "SENT",
            "isDeprecated": false
          },
          {
            "name": "AFFECTED",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AuthenticatorStateCreateTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AuthenticatorStateExpireTransaction",
        "fields": [
          {
            "name": "authenticatorObjInitialSharedVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "minEpoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AuthenticatorStateUpdateTransaction",
        "fields": [
          {
            "name": "authenticatorObjInitialSharedVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "epoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "newActiveJwks",
            "type": {
              "kind": "OBJECT",
              "name": "ActiveJwkConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "round",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AvailableRange",
        "fields": [
          {
            "name": "first",
            "type": {
              "kind": "OBJECT",
              "name": "Checkpoint"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "last",
            "type": {
              "kind": "OBJECT",
              "name": "Checkpoint"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Balance",
        "fields": [
          {
            "name": "addressBalance",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "coinBalance",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "coinType",
            "type": {
              "kind": "OBJECT",
              "name": "MoveType"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalBalance",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BalanceChange",
        "fields": [
          {
            "name": "amount",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "coinType",
            "type": {
              "kind": "OBJECT",
              "name": "MoveType"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BalanceChangeConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "BalanceChangeEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "BalanceChange"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BalanceChangeEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "BalanceChange"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BalanceConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "BalanceEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Balance"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BalanceEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Balance"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BalanceWithdraw",
        "fields": [
          {
            "name": "reservation",
            "type": {
              "kind": "UNION",
              "name": "WithdrawalReservation"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "OBJECT",
              "name": "MoveType"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "withdrawFrom",
            "type": {
              "kind": "ENUM",
              "name": "WithdrawFrom"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Base64"
      },
      {
        "kind": "SCALAR",
        "name": "BigInt"
      },
      {
        "kind": "OBJECT",
        "name": "BlockedPlatformSummary",
        "fields": [
          {
            "name": "blockedBy",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "blockedByProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "platformId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "platformName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BlockedProfileSummary",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "displayName",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "firstBlockedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "lastBlockedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profilePhoto",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "username",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "OBJECT",
        "name": "BridgeCommitteeInitTransaction",
        "fields": [
          {
            "name": "bridgeObjectVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "BridgeStateCreateTransaction",
        "fields": [
          {
            "name": "chainIdentifier",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ChangeEpochTransaction",
        "fields": [
          {
            "name": "computationCharge",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "epoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "epochStartTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nonRefundableStorageFee",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "protocolConfigs",
            "type": {
              "kind": "OBJECT",
              "name": "ProtocolConfigs"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "storageCharge",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "storageRebate",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "systemPackages",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackageConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Checkpoint",
        "fields": [
          {
            "name": "artifactsDigest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "contentBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "contentDigest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "digest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "epoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "networkTotalTransactions",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previousCheckpointDigest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "query",
            "type": {
              "kind": "OBJECT",
              "name": "Query"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "rollingGasSummary",
            "type": {
              "kind": "OBJECT",
              "name": "GasCostSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sequenceNumber",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UInt53"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "summaryBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "validatorSignatures",
            "type": {
              "kind": "OBJECT",
              "name": "ValidatorAggregatedSignature"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CheckpointConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "CheckpointEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Checkpoint"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CheckpointEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Checkpoint"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "CheckpointFilter",
        "inputFields": [
          {
            "name": "afterCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "atCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "atEpoch",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "beforeCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "CoinDenyListStateCreateTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CoinMetadata",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "addressAt",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "allowGlobalPause",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "balance",
            "type": {
              "kind": "OBJECT",
              "name": "Balance"
            },
            "args": [
              {
                "name": "coinType",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balances",
            "type": {
              "kind": "OBJECT",
              "name": "BalanceConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "contents",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "decimals",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "denyCap",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObject"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "digest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "dynamicField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicFields",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicFieldConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicObjectField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "hasPublicTransfer",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "iconUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "moveObjectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "multiGetBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Balance"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicObjectFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectAt",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsAfter",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsBefore",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ObjectFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "UNION",
              "name": "Owner"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previousTransaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "receivedTransactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "regulatedState",
            "type": {
              "kind": "ENUM",
              "name": "RegulatedState"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "storageRebate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "supply",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "supplyState",
            "type": {
              "kind": "ENUM",
              "name": "SupplyState"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "symbol",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IAddressable"
          },
          {
            "kind": "INTERFACE",
            "name": "IMoveObject"
          },
          {
            "kind": "INTERFACE",
            "name": "IObject"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CoinRegistryCreateTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "Command",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MakeMoveVecCommand"
          },
          {
            "kind": "OBJECT",
            "name": "MergeCoinsCommand"
          },
          {
            "kind": "OBJECT",
            "name": "MoveCallCommand"
          },
          {
            "kind": "OBJECT",
            "name": "OtherCommand"
          },
          {
            "kind": "OBJECT",
            "name": "PublishCommand"
          },
          {
            "kind": "OBJECT",
            "name": "SplitCoinsCommand"
          },
          {
            "kind": "OBJECT",
            "name": "TransferObjectsCommand"
          },
          {
            "kind": "OBJECT",
            "name": "UpgradeCommand"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "CommandConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "CommandEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "Command"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CommandEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "Command"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CommandOutput",
        "fields": [
          {
            "name": "argument",
            "type": {
              "kind": "UNION",
              "name": "TransactionArgument"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CommandResult",
        "fields": [
          {
            "name": "mutatedReferences",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "CommandOutput"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "returnValues",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "CommandOutput"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "CommentSummary",
        "fields": [
          {
            "name": "commentCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "commentId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "content",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ownerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "parentCommentId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "postId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reactionCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ConsensusAddressOwner",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "startVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ConsensusCommitPrologueTransaction",
        "fields": [
          {
            "name": "additionalStateDigest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "commitTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "consensusCommitDigest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "epoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "round",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subDagIndex",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "ConsensusObjectCancellationReason",
        "enumValues": [
          {
            "name": "CANCELLED_READ",
            "isDeprecated": false
          },
          {
            "name": "CONGESTED",
            "isDeprecated": false
          },
          {
            "name": "RANDOMNESS_UNAVAILABLE",
            "isDeprecated": false
          },
          {
            "name": "UNKNOWN",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ConsensusObjectCancelled",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "cancellationReason",
            "type": {
              "kind": "ENUM",
              "name": "ConsensusObjectCancellationReason"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ConsensusObjectRead",
        "fields": [
          {
            "name": "object",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "DateTime"
      },
      {
        "kind": "OBJECT",
        "name": "Delegate",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "downvotes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "isActive",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "proposalsReviewed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "proposalsSubmitted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "registryType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "termEnd",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "termStart",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "upvotes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Display",
        "fields": [
          {
            "name": "errors",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "output",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DisplayRegistryCreateTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DynamicField",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "addressAt",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balance",
            "type": {
              "kind": "OBJECT",
              "name": "Balance"
            },
            "args": [
              {
                "name": "coinType",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balances",
            "type": {
              "kind": "OBJECT",
              "name": "BalanceConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "contents",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "digest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "dynamicField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicFields",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicFieldConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicObjectField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "hasPublicTransfer",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "moveObjectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "multiGetBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Balance"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicObjectFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectAt",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsAfter",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsBefore",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ObjectFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "UNION",
              "name": "Owner"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previousTransaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "receivedTransactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "storageRebate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "UNION",
              "name": "DynamicFieldValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IAddressable"
          },
          {
            "kind": "INTERFACE",
            "name": "IMoveObject"
          },
          {
            "kind": "INTERFACE",
            "name": "IObject"
          },
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "DynamicFieldConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DynamicFieldEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "DynamicField"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "DynamicFieldEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "DynamicField"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DynamicFieldName",
        "inputFields": [
          {
            "name": "bcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            }
          },
          {
            "name": "literal",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "UNION",
        "name": "DynamicFieldValue",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MoveObject"
          },
          {
            "kind": "OBJECT",
            "name": "MoveValue"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EndOfEpochTransaction",
        "fields": [
          {
            "name": "transactions",
            "type": {
              "kind": "OBJECT",
              "name": "EndOfEpochTransactionKindConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "EndOfEpochTransactionKind",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "AccumulatorRootCreateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "AddressAliasStateCreateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "AuthenticatorStateCreateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "AuthenticatorStateExpireTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "BridgeCommitteeInitTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "BridgeStateCreateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "ChangeEpochTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "CoinDenyListStateCreateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "CoinRegistryCreateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "DisplayRegistryCreateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "RandomnessStateCreateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "StoreExecutionTimeObservationsTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "WriteAccumulatorStorageCostTransaction"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EndOfEpochTransactionKindConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EndOfEpochTransactionKindEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "EndOfEpochTransactionKind"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EndOfEpochTransactionKindEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "EndOfEpochTransactionKind"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Epoch",
        "fields": [
          {
            "name": "checkpoints",
            "type": {
              "kind": "OBJECT",
              "name": "CheckpointConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "CheckpointFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "coinDenyList",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "endTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "epochId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UInt53"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fundInflow",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fundOutflow",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fundSize",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "liveObjectSetDigest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "netInflow",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "protocolConfigs",
            "type": {
              "kind": "OBJECT",
              "name": "ProtocolConfigs"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "referenceGasPrice",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "startTimestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "systemPackages",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackageConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "systemStakeSubsidy",
            "type": {
              "kind": "OBJECT",
              "name": "StakeSubsidy"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "systemState",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalCheckpoints",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalGasFees",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalStakeRewards",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalStakeSubsidies",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalTransactions",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "validatorSet",
            "type": {
              "kind": "OBJECT",
              "name": "ValidatorSet"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EpochConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EpochEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Epoch"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EpochEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Epoch"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Event",
        "fields": [
          {
            "name": "contents",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "eventBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sender",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sequenceNumber",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UInt53"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactionModule",
            "type": {
              "kind": "OBJECT",
              "name": "MoveModule"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EventConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EventEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Event"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EventEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Event"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EventFilter",
        "inputFields": [
          {
            "name": "afterCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "atCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "beforeCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "module",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "sender",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "ExecutionError",
        "fields": [
          {
            "name": "abortCode",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "constant",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "function",
            "type": {
              "kind": "OBJECT",
              "name": "MoveFunction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "identifier",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "instructionOffset",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "message",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "module",
            "type": {
              "kind": "OBJECT",
              "name": "MoveModule"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sourceLineNumber",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ExecutionResult",
        "fields": [
          {
            "name": "effects",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionEffects"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "errors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "ExecutionStatus",
        "enumValues": [
          {
            "name": "SUCCESS",
            "isDeprecated": false
          },
          {
            "name": "FAILURE",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "FeatureFlag",
        "fields": [
          {
            "name": "key",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Float"
      },
      {
        "kind": "OBJECT",
        "name": "GasCoin",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GasCostSummary",
        "fields": [
          {
            "name": "computationCost",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nonRefundableStorageFee",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "storageCost",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "storageRebate",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GasEffects",
        "fields": [
          {
            "name": "gasObject",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "gasSummary",
            "type": {
              "kind": "OBJECT",
              "name": "GasCostSummary"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GasInput",
        "fields": [
          {
            "name": "gasBudget",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "gasPayment",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "gasPrice",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "gasSponsor",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GenesisTransaction",
        "fields": [
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GovernanceRegistry",
        "fields": [
          {
            "name": "config",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GovernanceRegistryConfig"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "delegateCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "registryId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "registryType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GovernanceRegistryConfig",
        "fields": [
          {
            "name": "delegateTermEpochs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxVotesPerUser",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "proposalSubmissionCost",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "quorumVotes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "votingPeriodMs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INTERFACE",
        "name": "IAddressable",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "addressAt",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balance",
            "type": {
              "kind": "OBJECT",
              "name": "Balance"
            },
            "args": [
              {
                "name": "coinType",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balances",
            "type": {
              "kind": "OBJECT",
              "name": "BalanceConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Balance"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ObjectFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Address"
          },
          {
            "kind": "OBJECT",
            "name": "CoinMetadata"
          },
          {
            "kind": "OBJECT",
            "name": "DynamicField"
          },
          {
            "kind": "OBJECT",
            "name": "MoveObject"
          },
          {
            "kind": "OBJECT",
            "name": "MovePackage"
          },
          {
            "kind": "OBJECT",
            "name": "Object"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "INTERFACE",
        "name": "IMoveDatatype",
        "fields": [
          {
            "name": "abilities",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "MoveAbility"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fullyQualifiedName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "module",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveModule"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "typeParameters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveDatatypeTypeParameter"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "MoveDatatype"
          },
          {
            "kind": "OBJECT",
            "name": "MoveEnum"
          },
          {
            "kind": "OBJECT",
            "name": "MoveStruct"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "IMoveObject",
        "fields": [
          {
            "name": "contents",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "dynamicField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicFields",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicFieldConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicObjectField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "hasPublicTransfer",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "moveObjectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicObjectFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "CoinMetadata"
          },
          {
            "kind": "OBJECT",
            "name": "DynamicField"
          },
          {
            "kind": "OBJECT",
            "name": "MoveObject"
          }
        ]
      },
      {
        "kind": "INTERFACE",
        "name": "IObject",
        "fields": [
          {
            "name": "digest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectAt",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsAfter",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsBefore",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "UNION",
              "name": "Owner"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previousTransaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "receivedTransactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "storageRebate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "CoinMetadata"
          },
          {
            "kind": "OBJECT",
            "name": "DynamicField"
          },
          {
            "kind": "OBJECT",
            "name": "MoveObject"
          },
          {
            "kind": "OBJECT",
            "name": "MovePackage"
          },
          {
            "kind": "OBJECT",
            "name": "Object"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Immutable",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Input",
        "fields": [
          {
            "name": "ix",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "InsurancePolicy",
        "fields": [
          {
            "name": "coveredAmount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "insured",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "marketId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "policyId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "premiumPaid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "InsuranceVault",
        "fields": [
          {
            "name": "capitalBalance",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "underwriter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "vaultId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "SCALAR",
        "name": "JSON"
      },
      {
        "kind": "OBJECT",
        "name": "Linkage",
        "fields": [
          {
            "name": "originalId",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "upgradedId",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MakeMoveVecCommand",
        "fields": [
          {
            "name": "elements",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "UNION",
                  "name": "TransactionArgument"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "OBJECT",
              "name": "MoveType"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MergeCoinsCommand",
        "fields": [
          {
            "name": "coin",
            "type": {
              "kind": "UNION",
              "name": "TransactionArgument"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "coins",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "TransactionArgument"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "MoveAbility",
        "enumValues": [
          {
            "name": "COPY",
            "isDeprecated": false
          },
          {
            "name": "DROP",
            "isDeprecated": false
          },
          {
            "name": "KEY",
            "isDeprecated": false
          },
          {
            "name": "STORE",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MoveCallCommand",
        "fields": [
          {
            "name": "arguments",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "TransactionArgument"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "function",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveFunction"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveDatatype",
        "fields": [
          {
            "name": "abilities",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "MoveAbility"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "asMoveEnum",
            "type": {
              "kind": "OBJECT",
              "name": "MoveEnum"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "asMoveStruct",
            "type": {
              "kind": "OBJECT",
              "name": "MoveStruct"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fullyQualifiedName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "module",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveModule"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "typeParameters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveDatatypeTypeParameter"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IMoveDatatype"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MoveDatatypeConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveDatatypeEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveDatatype"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveDatatypeEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveDatatype"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveDatatypeTypeParameter",
        "fields": [
          {
            "name": "constraints",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "MoveAbility"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "isPhantom",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveEnum",
        "fields": [
          {
            "name": "abilities",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "MoveAbility"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fullyQualifiedName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "module",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveModule"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "typeParameters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveDatatypeTypeParameter"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "variants",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveEnumVariant"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IMoveDatatype"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MoveEnumConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveEnumEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveEnum"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveEnumEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveEnum"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveEnumVariant",
        "fields": [
          {
            "name": "fields",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveField"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveField",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "OBJECT",
              "name": "OpenMoveType"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveFunction",
        "fields": [
          {
            "name": "fullyQualifiedName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "isEntry",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "module",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveModule"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "parameters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "OpenMoveType"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "return",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "OpenMoveType"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "typeParameters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveFunctionTypeParameter"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "visibility",
            "type": {
              "kind": "ENUM",
              "name": "MoveVisibility"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveFunctionConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveFunctionEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveFunction"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveFunctionEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveFunction"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveFunctionTypeParameter",
        "fields": [
          {
            "name": "constraints",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "MoveAbility"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveModule",
        "fields": [
          {
            "name": "bytes",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "datatype",
            "type": {
              "kind": "OBJECT",
              "name": "MoveDatatype"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "datatypes",
            "type": {
              "kind": "OBJECT",
              "name": "MoveDatatypeConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "disassembly",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "enum",
            "type": {
              "kind": "OBJECT",
              "name": "MoveEnum"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "enums",
            "type": {
              "kind": "OBJECT",
              "name": "MoveEnumConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "fileFormatVersion",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "friends",
            "type": {
              "kind": "OBJECT",
              "name": "MoveModuleConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "fullyQualifiedName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "function",
            "type": {
              "kind": "OBJECT",
              "name": "MoveFunction"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "functions",
            "type": {
              "kind": "OBJECT",
              "name": "MoveFunctionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "package",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackage"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "struct",
            "type": {
              "kind": "OBJECT",
              "name": "MoveStruct"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "structs",
            "type": {
              "kind": "OBJECT",
              "name": "MoveStructConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveModuleConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveModuleEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveModule"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveModuleEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveModule"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveObject",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "addressAt",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "asCoinMetadata",
            "type": {
              "kind": "OBJECT",
              "name": "CoinMetadata"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "asDynamicField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "balance",
            "type": {
              "kind": "OBJECT",
              "name": "Balance"
            },
            "args": [
              {
                "name": "coinType",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balances",
            "type": {
              "kind": "OBJECT",
              "name": "BalanceConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "contents",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "digest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "dynamicField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicFields",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicFieldConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicObjectField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "hasPublicTransfer",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "moveObjectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "multiGetBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Balance"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicObjectFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectAt",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsAfter",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsBefore",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ObjectFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "UNION",
              "name": "Owner"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previousTransaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "receivedTransactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "storageRebate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IAddressable"
          },
          {
            "kind": "INTERFACE",
            "name": "IMoveObject"
          },
          {
            "kind": "INTERFACE",
            "name": "IObject"
          },
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MoveObjectConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveObjectEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveObject"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveObjectEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveObject"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MovePackage",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "addressAt",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balance",
            "type": {
              "kind": "OBJECT",
              "name": "Balance"
            },
            "args": [
              {
                "name": "coinType",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balances",
            "type": {
              "kind": "OBJECT",
              "name": "BalanceConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "digest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "linkage",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Linkage"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "module",
            "type": {
              "kind": "OBJECT",
              "name": "MoveModule"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "moduleBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "modules",
            "type": {
              "kind": "OBJECT",
              "name": "MoveModuleConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Balance"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectAt",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsAfter",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsBefore",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ObjectFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "UNION",
              "name": "Owner"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "packageAt",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackage"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "packageBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "packageVersionsAfter",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackageConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "packageVersionsBefore",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackageConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "previousTransaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "receivedTransactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "storageRebate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "typeOrigins",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TypeOrigin"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IAddressable"
          },
          {
            "kind": "INTERFACE",
            "name": "IObject"
          },
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MovePackageConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MovePackageEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MovePackage"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MovePackageEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MovePackage"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveStruct",
        "fields": [
          {
            "name": "abilities",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "MoveAbility"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fields",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveField"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "fullyQualifiedName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "module",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveModule"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "typeParameters",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveDatatypeTypeParameter"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IMoveDatatype"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MoveStructConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveStructEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "MoveStruct"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveStructEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "MoveStruct"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MoveType",
        "fields": [
          {
            "name": "abilities",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "MoveAbility"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "layout",
            "type": {
              "kind": "SCALAR",
              "name": "MoveTypeLayout"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "repr",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "signature",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MoveTypeSignature"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "MoveTypeLayout"
      },
      {
        "kind": "SCALAR",
        "name": "MoveTypeSignature"
      },
      {
        "kind": "OBJECT",
        "name": "MoveValue",
        "fields": [
          {
            "name": "asAddress",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "bcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "display",
            "type": {
              "kind": "OBJECT",
              "name": "Display"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "extract",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [
              {
                "name": "path",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "format",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [
              {
                "name": "format",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "json",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "OBJECT",
              "name": "MoveType"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "MoveVisibility",
        "enumValues": [
          {
            "name": "PUBLIC",
            "isDeprecated": false
          },
          {
            "name": "PRIVATE",
            "isDeprecated": false
          },
          {
            "name": "FRIEND",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "MutateConsensusStreamEnded",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sequenceNumber",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "executeTransaction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ExecutionResult"
              }
            },
            "args": [
              {
                "name": "signatures",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "Base64"
                      }
                    }
                  }
                }
              },
              {
                "name": "transactionDataBcs",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Base64"
                  }
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MyDataPurchase",
        "fields": [
          {
            "name": "buyer",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "buyerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mydataId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "price",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "purchaseTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "purchaseType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "MyDataRecord",
        "fields": [
          {
            "name": "mediaType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mydataId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "oneTimePrice",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ownerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "subscriptionPrice",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "MySoAddress"
      },
      {
        "kind": "INTERFACE",
        "name": "Node",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "Address"
          },
          {
            "kind": "OBJECT",
            "name": "Checkpoint"
          },
          {
            "kind": "OBJECT",
            "name": "DynamicField"
          },
          {
            "kind": "OBJECT",
            "name": "Epoch"
          },
          {
            "kind": "OBJECT",
            "name": "MoveObject"
          },
          {
            "kind": "OBJECT",
            "name": "MovePackage"
          },
          {
            "kind": "OBJECT",
            "name": "Object"
          },
          {
            "kind": "OBJECT",
            "name": "Platform"
          },
          {
            "kind": "OBJECT",
            "name": "Post"
          },
          {
            "kind": "OBJECT",
            "name": "Profile"
          },
          {
            "kind": "OBJECT",
            "name": "Transaction"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Object",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "addressAt",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "asMoveObject",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObject"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "asMovePackage",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackage"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "balance",
            "type": {
              "kind": "OBJECT",
              "name": "Balance"
            },
            "args": [
              {
                "name": "coinType",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balances",
            "type": {
              "kind": "OBJECT",
              "name": "BalanceConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "digest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "dynamicField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicFields",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicFieldConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "dynamicObjectField",
            "type": {
              "kind": "OBJECT",
              "name": "DynamicField"
            },
            "args": [
              {
                "name": "name",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "DynamicFieldName"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "multiGetBalances",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Balance"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetDynamicObjectFields",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "DynamicField"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "DynamicFieldName"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectAt",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [
              {
                "name": "checkpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsAfter",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectVersionsBefore",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "MoveObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ObjectFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "UNION",
              "name": "Owner"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previousTransaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "receivedTransactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "storageRebate",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "IAddressable"
          },
          {
            "kind": "INTERFACE",
            "name": "IObject"
          },
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ObjectChange",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "idCreated",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "idDeleted",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "inputState",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "outputState",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ObjectChangeConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ObjectChangeEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ObjectChange"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ObjectChangeEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ObjectChange"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ObjectConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ObjectEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Object"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ObjectEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Object"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ObjectFilter",
        "inputFields": [
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            }
          },
          {
            "name": "ownerKind",
            "type": {
              "kind": "ENUM",
              "name": "OwnerKind"
            }
          },
          {
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ObjectKey",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            }
          },
          {
            "name": "atCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "rootVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "ObjectOwner",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "OpenMoveType",
        "fields": [
          {
            "name": "repr",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "signature",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "OpenMoveTypeSignature"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "OpenMoveTypeSignature"
      },
      {
        "kind": "OBJECT",
        "name": "OtherCommand",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "OwnedOrImmutable",
        "fields": [
          {
            "name": "object",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "Owner",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "AddressOwner"
          },
          {
            "kind": "OBJECT",
            "name": "ConsensusAddressOwner"
          },
          {
            "kind": "OBJECT",
            "name": "Immutable"
          },
          {
            "kind": "OBJECT",
            "name": "ObjectOwner"
          },
          {
            "kind": "OBJECT",
            "name": "Shared"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "OwnerKind",
        "enumValues": [
          {
            "name": "ADDRESS",
            "isDeprecated": false
          },
          {
            "name": "OBJECT",
            "isDeprecated": false
          },
          {
            "name": "SHARED",
            "isDeprecated": false
          },
          {
            "name": "IMMUTABLE",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PackageCheckpointFilter",
        "inputFields": [
          {
            "name": "afterCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "beforeCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "PackageKey",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            }
          },
          {
            "name": "atCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "version",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "PageInfo",
        "fields": [
          {
            "name": "endCursor",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hasNextPage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hasPreviousPage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "startCursor",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PerEpochConfig",
        "fields": [
          {
            "name": "object",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Platform",
        "fields": [
          {
            "name": "blockedProfiles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PlatformBlockedProfileSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "delegateCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "delegateTermEpochs",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "developerAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "developerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "governanceRegistryId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "isApproved",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "links",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "logo",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxVotesPerUser",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "members",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PlatformMemberSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "minOnChainAgeDays",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "moderators",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PlatformModeratorSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "platformId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "platformNames",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "primaryCategory",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "privacyPolicy",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "proposalSubmissionCost",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "quadraticBaseCost",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "quorumVotes",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "releaseDate",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "secondaryCategory",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "shutdownDate",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "statusText",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tagline",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "termsOfService",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "treasury",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "votingPeriodEpochs",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "wantsDaoGovernance",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PlatformBlockedProfileSummary",
        "fields": [
          {
            "name": "blockedBy",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "walletAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PlatformMemberSummary",
        "fields": [
          {
            "name": "joinedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "walletAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PlatformMembershipSummary",
        "fields": [
          {
            "name": "isApproved",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "joinedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "platformId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PlatformModeratorSummary",
        "fields": [
          {
            "name": "addedBy",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "addedByProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "moderatorAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "moderatorProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Post",
        "fields": [
          {
            "name": "commentCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "comments",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "CommentSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "content",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mediaUrls",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mentions",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ownerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "parentPostId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "postId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "postType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "promotion",
            "type": {
              "kind": "OBJECT",
              "name": "Promotion"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reactionCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reactions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ReactionSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "repostCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reposts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "RepostSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "spotBets",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SpotBet"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "spotRecord",
            "type": {
              "kind": "OBJECT",
              "name": "SpotRecord"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tips",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TipSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "tipsReceived",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transfers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PostTransferSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PostTransferSummary",
        "fields": [
          {
            "name": "newOwner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "newOwnerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previousOwner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "previousOwnerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transferredAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Profile",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badges",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ProfileBadge"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "bio",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "birthdate",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "blockListAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "blockedPlatforms",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "BlockedPlatformSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "blockedProfiles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "BlockedProfileSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "coverPhoto",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "currentLocation",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "displayName",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "education",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "email",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "facebookUsername",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "followers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ProfileSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "followersCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "following",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ProfileSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "followingCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "gender",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "githubUsername",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mastodonUsername",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "minOfferAmount",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mydataRecords",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MyDataRecord"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "phone",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "platformMemberships",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "PlatformMembershipSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "politicalView",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "postCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "primaryLanguage",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profileId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profilePhoto",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "raisedLocation",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "redditUsername",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "relationshipStatus",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "religion",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reservationPoolAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "selectedBadge",
            "type": {
              "kind": "OBJECT",
              "name": "SelectedBadge"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "selectedBadgeId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "selectedEcosystemBadgeId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "socialProofToken",
            "type": {
              "kind": "OBJECT",
              "name": "SocialProofToken"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "socialProofTokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sptHoldings",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SptHolding"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "updatedAt",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "username",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "vestingWallets",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "VestingWallet"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "website",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "xUsername",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ProfileBadge",
        "fields": [
          {
            "name": "assignedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "assignedBy",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "assignedByProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeDescription",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeIconUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeMediaUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "platformId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProfileSummary",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "bio",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "displayName",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "followersCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "followingCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profilePhoto",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reservationPercentage",
            "type": {
              "kind": "SCALAR",
              "name": "Float"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reservationPoolAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "selectedBadge",
            "type": {
              "kind": "OBJECT",
              "name": "SelectedBadge"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "selectedBadgeId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "socialProofToken",
            "type": {
              "kind": "OBJECT",
              "name": "SocialProofToken"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "socialProofTokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "username",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProgrammableSystemTransaction",
        "fields": [
          {
            "name": "commands",
            "type": {
              "kind": "OBJECT",
              "name": "CommandConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "inputs",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionInputConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProgrammableTransaction",
        "fields": [
          {
            "name": "commands",
            "type": {
              "kind": "OBJECT",
              "name": "CommandConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "inputs",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionInputConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Promotion",
        "fields": [
          {
            "name": "budget",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "postId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "promotionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "remainingBudget",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "views",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Proposal",
        "fields": [
          {
            "name": "anonymousVotersCount",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "implementationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "implementedDescription",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "proposalId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "referenceId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "registryType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "rescindTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "rewardPool",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "submissionTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "submitter",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "submitterProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "title",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "votes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProposalVotes"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "votingEndTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "votingStartTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProposalVotes",
        "fields": [
          {
            "name": "communityAgainst",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "communityFor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "delegateAgainst",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "delegateFor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProtocolConfig",
        "fields": [
          {
            "name": "key",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "value",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ProtocolConfigs",
        "fields": [
          {
            "name": "config",
            "type": {
              "kind": "OBJECT",
              "name": "ProtocolConfig"
            },
            "args": [
              {
                "name": "key",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "configs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ProtocolConfig"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "featureFlag",
            "type": {
              "kind": "OBJECT",
              "name": "FeatureFlag"
            },
            "args": [
              {
                "name": "key",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "featureFlags",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "FeatureFlag"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "protocolVersion",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "UInt53"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "PublishCommand",
        "fields": [
          {
            "name": "dependencies",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "MySoAddress"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "modules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Base64"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Pure",
        "fields": [
          {
            "name": "bytes",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "SCALAR",
                  "name": "MySoAddress"
                }
              },
              {
                "name": "atCheckpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "chainIdentifier",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "checkPlatformBlocked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [
              {
                "name": "platform",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              },
              {
                "name": "profile",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "checkProfileBlocked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [
              {
                "name": "blocked",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "blocker",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "checkpoint",
            "type": {
              "kind": "OBJECT",
              "name": "Checkpoint"
            },
            "args": [
              {
                "name": "sequenceNumber",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "checkpoints",
            "type": {
              "kind": "OBJECT",
              "name": "CheckpointConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "CheckpointFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "coinMetadata",
            "type": {
              "kind": "OBJECT",
              "name": "CoinMetadata"
            },
            "args": [
              {
                "name": "coinType",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "comment",
            "type": {
              "kind": "OBJECT",
              "name": "CommentSummary"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delegate",
            "type": {
              "kind": "OBJECT",
              "name": "Delegate"
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "delegates",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Delegate"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "registryType",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "epoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [
              {
                "name": "epochId",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "epochs",
            "type": {
              "kind": "OBJECT",
              "name": "EpochConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "events",
            "type": {
              "kind": "OBJECT",
              "name": "EventConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EventFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "governanceRegistries",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "GovernanceRegistry"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "governanceRegistry",
            "type": {
              "kind": "OBJECT",
              "name": "GovernanceRegistry"
            },
            "args": [
              {
                "name": "platformId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "insurancePolicies",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "InsurancePolicy"
                }
              }
            },
            "args": [
              {
                "name": "insured",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "insurancePolicy",
            "type": {
              "kind": "OBJECT",
              "name": "InsurancePolicy"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "insuranceVaults",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "InsuranceVault"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetAddresses",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Address"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AddressKey"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetCheckpoints",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Checkpoint"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "UInt53"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetEpochs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Epoch"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "UInt53"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetObjects",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Object"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "ObjectKey"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetPackages",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MovePackage"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "PackageKey"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetTransactionEffects",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TransactionEffects"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetTransactions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Transaction"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "multiGetTypes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MoveType"
                }
              }
            },
            "args": [
              {
                "name": "keys",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "SCALAR",
                        "name": "String"
                      }
                    }
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "mydataPurchases",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MyDataPurchase"
                }
              }
            },
            "args": [
              {
                "name": "buyer",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "mydataRecord",
            "type": {
              "kind": "OBJECT",
              "name": "MyDataRecord"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "mydataRecords",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "MyDataRecord"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "owner",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "INTERFACE",
              "name": "Node"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "object",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "atCheckpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "rootVersion",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objectVersions",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "objects",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ObjectFilter"
                  }
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "package",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackage"
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "atCheckpoint",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              },
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "packageVersions",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackageConnection"
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "VersionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "packages",
            "type": {
              "kind": "OBJECT",
              "name": "MovePackageConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "PackageCheckpointFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "platform",
            "type": {
              "kind": "OBJECT",
              "name": "Platform"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "platforms",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Platform"
                }
              }
            },
            "args": [
              {
                "name": "approvedOnly",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "post",
            "type": {
              "kind": "OBJECT",
              "name": "Post"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "posts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Post"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "owner",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "postType",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "profile",
            "type": {
              "kind": "OBJECT",
              "name": "Profile"
            },
            "args": [
              {
                "name": "address",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "profiles",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Profile"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "promotedPosts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Promotion"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "platformId",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "promotion",
            "type": {
              "kind": "OBJECT",
              "name": "Promotion"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "proposal",
            "type": {
              "kind": "OBJECT",
              "name": "Proposal"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "proposals",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Proposal"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "platformId",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "status",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "protocolConfigs",
            "type": {
              "kind": "OBJECT",
              "name": "ProtocolConfigs"
            },
            "args": [
              {
                "name": "version",
                "type": {
                  "kind": "SCALAR",
                  "name": "UInt53"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "reactions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "ReactionSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "postId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "reposts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "RepostSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "postId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "serviceConfig",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ServiceConfig"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "simulateTransaction",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SimulationResult"
              }
            },
            "args": [
              {
                "name": "checksEnabled",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "doGasSelection",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "transaction",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "JSON"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "socialGraphFollowing",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [
              {
                "name": "follower",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "following",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "spotBets",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SpotBet"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "postId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "spotRecord",
            "type": {
              "kind": "OBJECT",
              "name": "SpotRecord"
            },
            "args": [
              {
                "name": "postId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "sptHoldings",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SptHolding"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "profile",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "sptPool",
            "type": {
              "kind": "OBJECT",
              "name": "SptPool"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "sptPriceHistory",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SptPriceHistory"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "poolId",
                "type": {
                  "kind": "SCALAR",
                  "name": "ID"
                }
              },
              {
                "name": "profileAddress",
                "type": {
                  "kind": "SCALAR",
                  "name": "MySoAddress"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "tips",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "TipSummary"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "postId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "transaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [
              {
                "name": "digest",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "transactionEffects",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionEffects"
            },
            "args": [
              {
                "name": "digest",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "transactions",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TransactionFilter"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "OBJECT",
              "name": "MoveType"
            },
            "args": [
              {
                "name": "type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "verifyZkLoginSignature",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ZkLoginVerifyResult"
              }
            },
            "args": [
              {
                "name": "author",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "MySoAddress"
                  }
                }
              },
              {
                "name": "bytes",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Base64"
                  }
                }
              },
              {
                "name": "intentScope",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "ZkLoginIntentScope"
                  }
                }
              },
              {
                "name": "signature",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Base64"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "vestingLeaderboard",
            "type": {
              "kind": "OBJECT",
              "name": "VestingLeaderboardResponse"
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "vestingWallet",
            "type": {
              "kind": "OBJECT",
              "name": "VestingWallet"
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "vestingWallets",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "VestingWallet"
                }
              }
            },
            "args": [
              {
                "name": "activeOnly",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean"
                }
              },
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "owner",
                "type": {
                  "kind": "SCALAR",
                  "name": "MySoAddress"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RandomnessStateCreateTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "RandomnessStateUpdateTransaction",
        "fields": [
          {
            "name": "epoch",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "randomBytes",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "randomnessObjInitialSharedVersion",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "randomnessRound",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ReactionSummary",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reactionText",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "userAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "userProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ReadConsensusStreamEnded",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sequenceNumber",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Receiving",
        "fields": [
          {
            "name": "object",
            "type": {
              "kind": "OBJECT",
              "name": "Object"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "RegulatedState",
        "enumValues": [
          {
            "name": "REGULATED",
            "isDeprecated": false
          },
          {
            "name": "UNREGULATED",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "RepostSummary",
        "fields": [
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "originalPostId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ownerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profileId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "repostId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SelectedBadge",
        "fields": [
          {
            "name": "badgeIconUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeMediaUrl",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "badgeType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "platformId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ServiceConfig",
        "fields": [
          {
            "name": "availableRange",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AvailableRange"
              }
            },
            "args": [
              {
                "name": "field",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "filters",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "SCALAR",
                      "name": "String"
                    }
                  }
                }
              },
              {
                "name": "type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "defaultPageSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [
              {
                "name": "field",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "maxDisassembledModuleSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxDisplayFieldDepth",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxDisplayFormatNodes",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxDisplayObjectLoads",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxDisplayOutputSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxMoveValueBound",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxMoveValueDepth",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxMultiGetSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxOutputNodes",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxPageSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [
              {
                "name": "field",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              },
              {
                "name": "type",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "maxQueryDepth",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxQueryNodes",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxQueryPayloadSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxRichQueries",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxTransactionPayloadSize",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxTypeArgumentDepth",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxTypeArgumentWidth",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxTypeNodes",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mutationTimeoutMs",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "queryTimeoutMs",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Shared",
        "fields": [
          {
            "name": "initialSharedVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SharedInput",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "initialSharedVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "mutable",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SimulationResult",
        "fields": [
          {
            "name": "effects",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionEffects"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "error",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "outputs",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "CommandResult"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SocialProofToken",
        "fields": [
          {
            "name": "isActive",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "poolId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "requiredThreshold",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reservationPercentage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reservationPoolId",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reservationStatus",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tokenAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalReserved",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SplitCoinsCommand",
        "fields": [
          {
            "name": "amounts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "TransactionArgument"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "coin",
            "type": {
              "kind": "UNION",
              "name": "TransactionArgument"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SpotBet",
        "fields": [
          {
            "name": "ammAmount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "betId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "better",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "escrowAmount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "optionLabel",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "outcome",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "placedAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "postId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SpotOptionEscrow",
        "fields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "optionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SpotRecord",
        "fields": [
          {
            "name": "bettingOptions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdEpoch",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "lastResolutionEpoch",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxResolutionWindowEpochs",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "optionEscrow",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SpotOptionEscrow"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "postId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "recordId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "resolution",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "resolutionWindowEpochs",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalEscrow",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SptHolding",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "profile",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProfileSummary"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SptPool",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ownerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "poolId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "price",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "priceHistory",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SptPriceHistory"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "symbol",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tokenType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalSupply",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactions",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "SptTransaction"
                }
              }
            },
            "args": [
              {
                "name": "limit",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SptPriceHistory",
        "fields": [
          {
            "name": "circulatingSupply",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "poolId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "price",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SptTransaction",
        "fields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "to",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "type",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "StakeSubsidy",
        "fields": [
          {
            "name": "apy",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "balance",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "currentApyBps",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "decreaseRate",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "distributionCounter",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "intendedDurationYears",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "maxApyBps",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "minApyBps",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "periodLength",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "StoreExecutionTimeObservationsTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "ENUM",
        "name": "SupplyState",
        "enumValues": [
          {
            "name": "BURN_ONLY",
            "isDeprecated": false
          },
          {
            "name": "FIXED",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TipSummary",
        "fields": [
          {
            "name": "amount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "recipientProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tipper",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "tipperProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Transaction",
        "fields": [
          {
            "name": "digest",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "effects",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionEffects"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "expiration",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "gasInput",
            "type": {
              "kind": "OBJECT",
              "name": "GasInput"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "kind",
            "type": {
              "kind": "UNION",
              "name": "TransactionKind"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "sender",
            "type": {
              "kind": "OBJECT",
              "name": "Address"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "signatures",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UserSignature"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactionBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactionJson",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "UNION",
        "name": "TransactionArgument",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "GasCoin"
          },
          {
            "kind": "OBJECT",
            "name": "Input"
          },
          {
            "kind": "OBJECT",
            "name": "TxResult"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TransactionConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TransactionEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Transaction"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TransactionEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Transaction"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TransactionEffects",
        "fields": [
          {
            "name": "balanceChanges",
            "type": {
              "kind": "OBJECT",
              "name": "BalanceChangeConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "balanceChangesJson",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "checkpoint",
            "type": {
              "kind": "OBJECT",
              "name": "Checkpoint"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "dependencies",
            "type": {
              "kind": "OBJECT",
              "name": "TransactionConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "digest",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "effectsBcs",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "effectsDigest",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "effectsJson",
            "type": {
              "kind": "SCALAR",
              "name": "JSON"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "epoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "events",
            "type": {
              "kind": "OBJECT",
              "name": "EventConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "executionError",
            "type": {
              "kind": "OBJECT",
              "name": "ExecutionError"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "gasEffects",
            "type": {
              "kind": "OBJECT",
              "name": "GasEffects"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "lamportVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "objectChanges",
            "type": {
              "kind": "OBJECT",
              "name": "ObjectChangeConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "ExecutionStatus"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "DateTime"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transaction",
            "type": {
              "kind": "OBJECT",
              "name": "Transaction"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "unchangedConsensusObjects",
            "type": {
              "kind": "OBJECT",
              "name": "UnchangedConsensusObjectConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TransactionFilter",
        "inputFields": [
          {
            "name": "affectedAddress",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            }
          },
          {
            "name": "affectedObject",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            }
          },
          {
            "name": "afterCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "atCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "beforeCheckpoint",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "function",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            }
          },
          {
            "name": "kind",
            "type": {
              "kind": "ENUM",
              "name": "TransactionKindInput"
            }
          },
          {
            "name": "sentAddress",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "UNION",
        "name": "TransactionInput",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "BalanceWithdraw"
          },
          {
            "kind": "OBJECT",
            "name": "MoveValue"
          },
          {
            "kind": "OBJECT",
            "name": "OwnedOrImmutable"
          },
          {
            "kind": "OBJECT",
            "name": "Pure"
          },
          {
            "kind": "OBJECT",
            "name": "Receiving"
          },
          {
            "kind": "OBJECT",
            "name": "SharedInput"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TransactionInputConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TransactionInputEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "TransactionInput"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TransactionInputEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "TransactionInput"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "TransactionKind",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "AuthenticatorStateUpdateTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "ChangeEpochTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "ConsensusCommitPrologueTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "EndOfEpochTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "GenesisTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "ProgrammableSystemTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "ProgrammableTransaction"
          },
          {
            "kind": "OBJECT",
            "name": "RandomnessStateUpdateTransaction"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "TransactionKindInput",
        "enumValues": [
          {
            "name": "SYSTEM_TX",
            "isDeprecated": false
          },
          {
            "name": "PROGRAMMABLE_TX",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TransferObjectsCommand",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "UNION",
              "name": "TransactionArgument"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "inputs",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "TransactionArgument"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TxResult",
        "fields": [
          {
            "name": "cmd",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ix",
            "type": {
              "kind": "SCALAR",
              "name": "Int"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TypeOrigin",
        "fields": [
          {
            "name": "definingId",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "module",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "struct",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "UInt53"
      },
      {
        "kind": "UNION",
        "name": "UnchangedConsensusObject",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "ConsensusObjectCancelled"
          },
          {
            "kind": "OBJECT",
            "name": "ConsensusObjectRead"
          },
          {
            "kind": "OBJECT",
            "name": "MutateConsensusStreamEnded"
          },
          {
            "kind": "OBJECT",
            "name": "PerEpochConfig"
          },
          {
            "kind": "OBJECT",
            "name": "ReadConsensusStreamEnded"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "UnchangedConsensusObjectConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "UnchangedConsensusObjectEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "UNION",
                    "name": "UnchangedConsensusObject"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UnchangedConsensusObjectEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "UNION",
                "name": "UnchangedConsensusObject"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UpgradeCommand",
        "fields": [
          {
            "name": "currentPackage",
            "type": {
              "kind": "SCALAR",
              "name": "MySoAddress"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "dependencies",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "MySoAddress"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "modules",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Base64"
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "upgradeTicket",
            "type": {
              "kind": "UNION",
              "name": "TransactionArgument"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "UserSignature",
        "fields": [
          {
            "name": "signatureBytes",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Validator",
        "fields": [
          {
            "name": "apy",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "atRisk",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "contents",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "reportRecords",
            "type": {
              "kind": "OBJECT",
              "name": "ValidatorConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ValidatorAggregatedSignature",
        "fields": [
          {
            "name": "epoch",
            "type": {
              "kind": "OBJECT",
              "name": "Epoch"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "signature",
            "type": {
              "kind": "SCALAR",
              "name": "Base64"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "signersMap",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ValidatorConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ValidatorEdge"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "nodes",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Validator"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ValidatorEdge",
        "fields": [
          {
            "name": "cursor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Validator"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ValidatorSet",
        "fields": [
          {
            "name": "activeValidators",
            "type": {
              "kind": "OBJECT",
              "name": "ValidatorConnection"
            },
            "args": [
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "String"
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              },
              {
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int"
                }
              }
            ],
            "isDeprecated": false
          },
          {
            "name": "contents",
            "type": {
              "kind": "OBJECT",
              "name": "MoveValue"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "VersionFilter",
        "inputFields": [
          {
            "name": "afterVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          },
          {
            "name": "beforeVersion",
            "type": {
              "kind": "SCALAR",
              "name": "UInt53"
            }
          }
        ],
        "isOneOf": false
      },
      {
        "kind": "OBJECT",
        "name": "VestingLeaderboardEntry",
        "fields": [
          {
            "name": "activeWallets",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "completedWallets",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ownerAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalClaimed",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalVested",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "user",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ProfileSummary"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "VestingLeaderboardResponse",
        "fields": [
          {
            "name": "entries",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "VestingLeaderboardEntry"
                  }
                }
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "total",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "VestingWallet",
        "fields": [
          {
            "name": "claimedAmount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "claimedPercentage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "curveFactor",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "duration",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "endTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hasEnded",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "hasStarted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ownerAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "MySoAddress"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "ownerProfile",
            "type": {
              "kind": "OBJECT",
              "name": "ProfileSummary"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "remainingBalance",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "startTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "totalAmount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "transactionId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "vestingProgress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float"
              }
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "walletId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String"
              }
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "WithdrawFrom",
        "enumValues": [
          {
            "name": "SENDER",
            "isDeprecated": false
          },
          {
            "name": "SPONSOR",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "WithdrawMaxAmountU64",
        "fields": [
          {
            "name": "amount",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "UNION",
        "name": "WithdrawalReservation",
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "WithdrawMaxAmountU64"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "WriteAccumulatorStorageCostTransaction",
        "fields": [
          {
            "name": "_",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "ZkLoginIntentScope",
        "enumValues": [
          {
            "name": "TRANSACTION_DATA",
            "isDeprecated": false
          },
          {
            "name": "PERSONAL_MESSAGE",
            "isDeprecated": false
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ZkLoginVerifyResult",
        "fields": [
          {
            "name": "error",
            "type": {
              "kind": "SCALAR",
              "name": "String"
            },
            "args": [],
            "isDeprecated": false
          },
          {
            "name": "success",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean"
            },
            "args": [],
            "isDeprecated": false
          }
        ],
        "interfaces": []
      }
    ],
    "directives": []
  }
} as const;

export { introspection };