import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export class SwaggerDocs {
  private static apiVersion: string = "v1";
  private static apiPrefix: string = `/${SwaggerDocs.apiVersion}`;
  private static apiUrl: string = `http://localhost:3000`;
  public static init(app: Application): void {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Qullect API Documentation",
          version: "v1",
        },
        servers: [
          {
            url: `${SwaggerDocs.apiUrl}${SwaggerDocs.apiPrefix}`,
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
              description:
                "JWT token obtained from login endpoint. Format: Bearer {token}",
            },
            cookieAuth: {
              type: "apiKey",
              in: "cookie",
              name: "access_token",
              description: "JWT token stored in httpOnly cookie",
            },
          },
          schemas: {
            ApiResponse: {
              type: "object",
              properties: {
                status: {
                  type: "boolean",
                  description: "Indicates if the request was successful",
                },
                responseCode: {
                  type: "string",
                  description: "Response code (00 for success)",
                },
                message: {
                  type: "string",
                  description: "Response message",
                },
                data: {
                  description: "Response data (varies by endpoint)",
                },
              },
              required: ["status", "message"],
            },
            ErrorResponse: {
              type: "object",
              properties: {
                status: {
                  type: "boolean",
                  example: false,
                },
                error: {
                  type: "boolean",
                  example: true,
                },
                statusCode: {
                  type: "string",
                  description: "HTTP status code as string",
                },
                message: {
                  type: "string",
                  description: "Error message",
                },
              },
              required: ["status", "error", "statusCode", "message"],
            },

            // Auth schemas
            LoginRequest: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  description: "User's email address",
                  example: "user@example.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  description: "User's password",
                  example: "SecurePass123!",
                },
              },
              required: ["email", "password"],
            },
            RegisterRequest: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  description: "User's email address",
                  example: "newuser@example.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  minLength: 8,
                  description:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                  example: "SecurePass123!",
                },
              },
              required: ["email", "password"],
            },
            ChangePasswordRequest: {
              type: "object",
              properties: {
                oldPassword: {
                  type: "string",
                  format: "password",
                  description: "Current password",
                  example: "OldPass123!",
                },
                newPassword: {
                  type: "string",
                  format: "password",
                  minLength: 8,
                  description:
                    "New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                  example: "NewSecurePass123!",
                },
                confirmPassword: {
                  type: "string",
                  format: "password",
                  description: "Must match the new password",
                  example: "NewSecurePass123!",
                },
              },
              required: ["oldPassword", "newPassword", "confirmPassword"],
            },

            // User schemas
            UserProfile: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "Unique user identifier",
                  example: "cuid123456789",
                },
                firstName: {
                  type: "string",
                  description: "User's first name",
                  example: "John",
                },
                lastName: {
                  type: "string",
                  description: "User's last name",
                  example: "Doe",
                },
                otherNames: {
                  type: "string",
                  nullable: true,
                  description: "User's other names",
                  example: "Michael",
                },
                phoneNumber: {
                  type: "string",
                  nullable: true,
                  description: "User's phone number",
                  example: "+1234567890",
                },
                title: {
                  type: "string",
                  description: "User's title",
                  example: "Mr.",
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                  description: "Account creation timestamp",
                  example: "2024-01-15T10:30:00.000Z",
                },
                updatedAt: {
                  type: "string",
                  format: "date-time",
                  description: "Last update timestamp",
                  example: "2024-01-20T14:45:00.000Z",
                },
              },
              required: [
                "id",
                "firstName",
                "lastName",
                "title",
                "createdAt",
                "updatedAt",
              ],
            },
            UpdateProfileRequest: {
              type: "object",
              properties: {
                firstName: {
                  type: "string",
                  minLength: 2,
                  maxLength: 50,
                  description: "User's first name",
                  example: "John",
                },
                lastName: {
                  type: "string",
                  minLength: 2,
                  maxLength: 50,
                  description: "User's last name",
                  example: "Doe",
                },
                otherNames: {
                  type: "string",
                  maxLength: 100,
                  description: "User's other names (optional)",
                  example: "Michael",
                },
                phoneNumber: {
                  type: "string",
                  pattern: "^\\+?[1-9]\\d{1,14}$",
                  description: "User's phone number in international format",
                  example: "+1234567890",
                },
                title: {
                  type: "string",
                  maxLength: 20,
                  description: "User's title (Mr., Mrs., Dr., etc.)",
                  example: "Mr.",
                },
              },
              minProperties: 1,
              additionalProperties: false,
            },
          },
          responses: {
            BadRequest: {
              description:
                "Bad request - Validation errors or malformed request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                  examples: {
                    validationError: {
                      summary: "Validation error",
                      value: {
                        status: false,
                        error: true,
                        statusCode: "400",
                        message: "Validation failed",
                      },
                    },
                  },
                },
              },
            },
            Unauthorized: {
              description:
                "Unauthorized - Invalid or missing authentication token",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                  examples: {
                    missingToken: {
                      summary: "Missing authentication token",
                      value: {
                        status: false,
                        error: true,
                        statusCode: "401",
                        message: "Token not found in request",
                      },
                    },
                    invalidToken: {
                      summary: "Invalid authentication token",
                      value: {
                        status: false,
                        error: true,
                        statusCode: "401",
                        message: "Invalid or expired token",
                      },
                    },
                  },
                },
              },
            },
            NotFound: {
              description: "Resource not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                  examples: {
                    resourceNotFound: {
                      summary: "Resource not found",
                      value: {
                        status: false,
                        error: true,
                        statusCode: "404",
                        message: "Resource not found",
                      },
                    },
                  },
                },
              },
            },
            InternalServerError: {
              description: "Internal server error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                  examples: {
                    serverError: {
                      summary: "Internal server error",
                      value: {
                        status: false,
                        error: true,
                        statusCode: "500",
                        message: "Something went wrong",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        tags: [
          {
            name: "Authentication",
            description: "Authentication and authorization endpoints",
          },
          {
            name: "User Management",
            description: "User profile and account management endpoints",
          },
          {
            name: "Business",
            description: "Business endpoints",
          },
        ],
      },
      apis: [
        "./src/Modules/**/*.routes.ts",
        "./src/Modules/**/routes/api-spec.routes.ts",
      ], // Path to the API docs
    };

    const swaggerSpec = swaggerJSDoc(options);
    console.info(swaggerSpec);

    const swaggerUiOptions = {
      explorer: true,
      swaggerOptions: {
        docExpansion: "list",
        filter: true,
        showRequestHeaders: true,
        showCommonExtensions: true,
        tryItOutEnabled: true,
      },
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Qullect API Documentation",
    };

    if (process.env.NODE_ENV === "development") {
      console.info("Swagger documentation initialized");
      console.info(
        `Documentation available at: ${SwaggerDocs.apiUrl}${SwaggerDocs.apiPrefix}/docs`
      );
    }

    app.use(
      `${SwaggerDocs.apiPrefix}/docs`,
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, swaggerUiOptions)
    );
  }
}
