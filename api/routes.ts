/* tslint:disable */
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { LocationsController } from './controllers/locations-controller';
import { OrdersController } from './controllers/orders-controller';
import { ShiftsController } from './controllers/shifts-controller';
import { UsersController } from './controllers/users-controller';
import * as express from 'express';

const models: TsoaRoute.Models = {
  "Location": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "createdAt": { "dataType": "datetime", "required": true },
      "latitude": { "dataType": "double", "required": true },
      "longitude": { "dataType": "double", "required": true },
      "speed": { "dataType": "double", "required": true },
      "userId": { "dataType": "string", "required": true },
      "isMoving": { "dataType": "boolean", "required": true },
      "activityType": { "dataType": "string", "required": true },
      "batteryLevel": { "dataType": "double", "required": true },
    },
  },
  "ILocationStats": {
    "properties": {
      "average": { "dataType": "double", "required": true },
      "count": { "dataType": "double", "required": true },
      "sum": { "dataType": "double", "required": true },
      "min": { "dataType": "object", "required": true },
      "max": { "dataType": "object", "required": true },
    },
  },
  "IUserStats": {
    "additionalProperties": { "ref": "ILocationStats" },
  },
  "Order": {
    "properties": {
      "id": { "dataType": "string", "required": true },
      "runnerId": { "dataType": "string", "required": true },
      "pickedUpAt": { "dataType": "datetime", "required": true },
      "dropoffTime": { "dataType": "datetime", "required": true },
    },
  },
  "Shift": {
    "properties": {
      "id": { "dataType": "string", "required": true },
      "start": { "dataType": "datetime", "required": true },
      "stop": { "dataType": "datetime", "required": true },
      "userId": { "dataType": "string", "required": true },
      "role": { "dataType": "string", "required": true },
    },
  },
  "User": {
    "properties": {
      "id": { "dataType": "string", "required": true },
      "signupDate": { "dataType": "datetime", "required": true },
      "firstName": { "dataType": "string", "required": true },
      "lastName": { "dataType": "string", "required": true },
      "phoneBrand": { "dataType": "string", "required": true },
      "phoneCarrier": { "dataType": "string", "required": true },
      "phoneModel": { "dataType": "string", "required": true },
      "transportMode": { "dataType": "string", "required": true },
    },
  },
};
const validationService = new ValidationService(models);

export function RegisterRoutes(app: express.Express) {
  app.get('/api/locations',
    function(request: any, response: any, next: any) {
      const args = {
        limit: { "in": "query", "name": "limit", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new LocationsController();


      const promise = controller.Get.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/locations/stats',
    function(request: any, response: any, next: any) {
      const args = {
        userIds: { "in": "query", "name": "userIds", "required": true, "dataType": "array", "array": { "dataType": "string" } },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new LocationsController();


      const promise = controller.GetStatsByUsers.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/locations/:userId/stats',
    function(request: any, response: any, next: any) {
      const args = {
        userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new LocationsController();


      const promise = controller.GetStatsByUser.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/locations/:userId/:shiftId/stats',
    function(request: any, response: any, next: any) {
      const args = {
        userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
        shiftId: { "in": "path", "name": "shiftId", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new LocationsController();


      const promise = controller.GetStatsByUserShift.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/orders',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new OrdersController();


      const promise = controller.Get.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/orders/:userId',
    function(request: any, response: any, next: any) {
      const args = {
        userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new OrdersController();


      const promise = controller.GetByUser.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/shifts',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ShiftsController();


      const promise = controller.Get.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/shifts/:shiftId',
    function(request: any, response: any, next: any) {
      const args = {
        shiftId: { "in": "path", "name": "shiftId", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ShiftsController();


      const promise = controller.GetById.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/users',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UsersController();


      const promise = controller.Get.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/users/:userId/shifts',
    function(request: any, response: any, next: any) {
      const args = {
        userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UsersController();


      const promise = controller.GetUserShifts.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/users/:userId',
    function(request: any, response: any, next: any) {
      const args = {
        userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UsersController();


      const promise = controller.GetUser.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, next);
    });


  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode;
        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
          });

          statusCode = controllerObj.getStatus();
        }

        if (data || data === false) { // === false allows boolean result
          response.status(statusCode || 200).json(data);
        } else {
          response.status(statusCode || 204).end();
        }
      })
      .catch((error: any) => next(error));
  }

  function getValidatedArgs(args: any, request: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors);
        case 'path':
          return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors);
        case 'header':
          return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors);
        case 'body':
          return validationService.ValidateParam(args[key], request.body, name, fieldErrors, name + '.');
        case 'body-prop':
          return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.');
      }
    });
    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }
}
