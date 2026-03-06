import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export const setupSwagger = (app: Express, port: number) => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Gestão de Fornecedores API",
        version: "1.1.0",
        description: "API para usuários, autenticação e fornecedores",
      },
      servers: [
        {
          url: `http://localhost:${port}`,
          description: "Servidor de desenvolvimento",
        },
      ],

      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          LoginRequest: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string", format: "email" },
              password: { type: "string" },
            },
          },
          LoginResponse: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
          },
          User: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              name: { type: "string" },
              email: { type: "string", format: "email" },
              role: { type: "string" },
              active: { type: "boolean" },
              createdAt: { type: "string", format: "date-time" },
            },
          },
          Supplier: {
            type: "object",
            properties: {
              id: { type: "string", format: "uuid" },
              companyName: { type: "string" },
              tradingName: { type: "string", nullable: true },
              cnpj: { type: "string" },
              email: { type: "string", format: "email" },
              phone: { type: "string" },
              active: { type: "boolean" },
              createdAt: { type: "string", format: "date-time" },
            },
          },
        },
      },

      paths: {
        "/api/v1/auth/login": {
          post: {
            summary: "Login de usuário",
            tags: ["Auth"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LoginRequest" },
                },
              },
            },
            responses: {
              200: {
                description: "Login realizado",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/LoginResponse" },
                  },
                },
              },
              401: { description: "Email ou senha inválidos" },
            },
          },
        },

        "/supplier/auth/login": {
          post: {
            summary: "Login de fornecedor",
            tags: ["Supplier Auth"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LoginRequest" },
                },
              },
            },
            responses: {
              200: {
                description: "Login realizado",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/LoginResponse" },
                  },
                },
              },
              401: { description: "Email ou senha inválidos" },
            },
          },
        },

        "/api/v1/users": {
          get: {
            summary: "Listar usuários",
            tags: ["Users"],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: "Lista de usuários",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: "Criar usuário",
            tags: ["Users"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                      name: { type: "string" },
                      email: { type: "string", format: "email" },
                      password: { type: "string" },
                    },
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Usuário criado",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
        },

        "/api/v1/users/{id}": {
          put: {
            summary: "Atualizar usuário",
            tags: ["Users"],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid" },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      email: { type: "string", format: "email" },
                      password: { type: "string" },
                    },
                  },
                },
              },
            },
            responses: {
              200: { description: "Usuário atualizado" },
              404: { description: "Usuário não encontrado" },
            },
          },
          delete: {
            summary: "Deletar usuário",
            tags: ["Users"],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid" },
              },
            ],
            responses: {
              204: { description: "Usuário deletado" },
              404: { description: "Usuário não encontrado" },
            },
          },
        },

        "/api/v1/suppliers": {
          get: {
            summary: "Listar fornecedores",
            tags: ["Suppliers"],
            security: [{ bearerAuth: [] }],
            responses: {
              200: {
                description: "Lista de fornecedores",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Supplier" },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: "Criar fornecedor",
            tags: ["Suppliers"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["companyName", "email", "password"],
                    properties: {
                      companyName: { type: "string" },
                      email: { type: "string", format: "email" },
                      password: { type: "string" },
                    },
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Fornecedor criado",
                content: {
                  "application/json": {
                    schema: { $ref: "#/components/schemas/Supplier" },
                  },
                },
              },
            },
          },
        },

        "/api/v1/suppliers/{id}": {
          put: {
            summary: "Atualizar fornecedor",
            tags: ["Suppliers"],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid" },
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      companyName: { type: "string" },
                      tradingName: { type: "string" },
                      email: { type: "string", format: "email" },
                      phone: { type: "string" },
                    },
                  },
                },
              },
            },
            responses: {
              200: { description: "Fornecedor atualizado" },
              404: { description: "Fornecedor não encontrado" },
            },
          },
          delete: {
            summary: "Deletar fornecedor",
            tags: ["Suppliers"],
            security: [{ bearerAuth: [] }],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string", format: "uuid" },
              },
            ],
            responses: {
              204: { description: "Fornecedor deletado" },
              404: { description: "Fornecedor não encontrado" },
            },
          },
        },
      },
      "/api/v1/products": {
  get: {
    summary: "Listar produtos",
    tags: ["Products"],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Lista de produtos",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/Product" }
            }
          }
        }
      }
    }
  },
  post: {
    summary: "Criar produto",
    tags: ["Products"],
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "price", "supplierId"],
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              price: { type: "number" },
              supplierId: { type: "string", format: "uuid" }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: "Produto criado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Product" }
          }
        }
      }
    }
  }
},

"/api/v1/products/{id}": {
  get: {
    summary: "Buscar produto por ID",
    tags: ["Products"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" }
      }
    ],
    responses: {
      200: { description: "Produto encontrado" },
      404: { description: "Produto não encontrado" }
    }
  },
  put: {
    summary: "Atualizar produto",
    tags: ["Products"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" }
      }
    ],
    responses: {
      200: { description: "Produto atualizado" }
    }
  },
  delete: {
    summary: "Deletar produto",
    tags: ["Products"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" }
      }
    ],
    responses: {
      204: { description: "Produto deletado" }
    }
  }
},
"/api/v1/quotations": {
  get: {
    summary: "Listar cotações",
    tags: ["Quotations"],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Lista de cotações",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/Quotation" }
            }
          }
        }
      }
    }
  },
  post: {
    summary: "Criar cotação",
    tags: ["Quotations"],
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["supplierId", "status"],
            properties: {
              supplierId: { type: "string", format: "uuid" },
              status: { type: "string" }
            }
          }
        }
      }
    },
    responses: {
      201: {
        description: "Cotação criada",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Quotation" }
          }
        }
      }
    }
  }
},

"/api/v1/quotations/{id}": {
  put: {
    summary: "Atualizar cotação",
    tags: ["Quotations"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" }
      }
    ],
    responses: {
      200: { description: "Cotação atualizada" }
    }
  },
  delete: {
    summary: "Deletar cotação",
    tags: ["Quotations"],
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "string", format: "uuid" }
      }
    ],
    responses: {
      204: { description: "Cotação deletada" }
    }
  }
}

    },
    apis: [],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
