## Friends API Gateway

An API Gateway for Friends.
All requests require a Spike Oauth token using `code` grant-type. 
The is enforced by using [Spike Proxy Service (Incoming)](https://gitlab.com/yesodot/rnd/terminal-rabaz/shared/spike-proxy-service). 


## API Endpoints

| Method | Endpoint                | Description               | [User Header](#user-header) Required   | Scope | Reference                              |
|--------|------------------------ |---------------------------|----------------------------------------| ------| ---------------------------------------|
| GET    | /groups                 | Search Group              | Sometimes                              | read  | [query string params](#search-group)   |
| POST   | /groups                 | Create Group              | **Yes**                                | write | [body params](#create-group)           |
| GET    | /groups/:id             | Get group by ID           | Sometimes                              | read  |                                        |
| PATCH  | /groups/:id             | Update Group              | **Yes**                                | write | [body params](#update-group)           |
| DELETE | /groups/:id             | Delete Group              | **Yes**                                | write |                                        |
| PUT    | /groups/:id/tags/:label | Add tag to group          | **Yes**                                | write |                                        |
| DELETE | /groups/:id/tags/:label | Remove tag from group     | **Yes**                                | write |                                        |
| POST   | /groups/:id/users       | Add user to group         | **Yes**                                | write | [body params](#add-user)               |
| PATCH  | /groups/:id/users:id    | Update user role in group | **Yes**                                | write | [body params](#update-user)            |
| DELETE | /groups/:id/users:id    | Remove user from group    | **Yes**                                | write |                                        |
| GET    | /users                  | Find user by partial name | No                                     | read  | [query string params](#find-user)      |
| GET    | /users/:id              | Get user by ID (up to 20) | No                                     | read  |                                        |
| GET    | /users/:id/groups       | Get groups of user        | Sometimes                              | read  |                                        |

## Roles and Permissions
### User Roles
Each user in a group have a single role which can be one of following:

| Value(number) | Role name | Role Description                                |
|---------------|-----------|-------------------------------------------------|
| 0             | member    | a simple member of the group                    |
| 1             | modifier  | a member who can modify the group in some ways  |
| 2             | manager   | have full control over the group                |

### User Header
Most of the API endpoints require a `requesterID` - the user ID of the requester. The ID should be sent in a header (usually `X-User-ID`).
Endpoints that do not always require a requester may return a `Forbidden` error in some cases where `requesterID` is necessary. Therefore sending a `requesterID` is always advised.

### Permissions
The endpoints that require a `requesterID` validate that the user has permission for the action he requested. The service finds the requester role in the group and then compares it with the required role for that action by the `requiredRole` found in [this file](src/group/user/user.role.ts).

The requester must be in a group in order to make CRUD requests on it unless it's a `GET` on a `public` group.

## Body Payload

### Create Group

| Key         | Optional  | Type    | Description                                                     | 
|-------------|-----------|---------|-----------------------------------------------------------------|
| name        | **No**    | string  | The name of the group                                           |
| description | **No**    | string  | A description of the group                                      | 
| type        | Yes       | string  | The type of the group can be `public` (by default) or `private` | 

### Update Group
| Key         | Optional  | Type    | Required Role | Description                                                     | 
|-------------|-----------|---------|---------------|-----------------------------------------------------------------|
| name        | Yes       | string  | modifier      | The name of the group                                           | 
| description | Yes       | string  | modifier      | A description of the group                                      | 
| type        | Yes       | string  | modifier      | The type of the group | 

### Add User
| Key   | Optional  | Type    | Description                                            | 
|-------|-----------|---------|--------------------------------------------------------|
| id    | **No**    | string  | The user ID to add to the group                        | 
| role  | Yes       | number  | The [role](#user-roles) of the new user in the group   | 

### Update User
| Key   | Optional  | Type    | Description                                         | 
|-------|-----------|---------|-----------------------------------------------------|
| role  | **No**    | number  | The [role](#user-roles)  of the user in the group   | 

## Query Strings

### Search Group

| Key         | Optional  | Type    | Description                                                     | 
|-------------|-----------|---------|-----------------------------------------------------------------|
| partial     | **No**    | string  | A partial string to search by                                   |
| type        | Yes       | string  | The type of the group. (`public` by default)                    | 

### Find User

| Key         | Optional  | Type    | Description                                                     | 
|-------------|-----------|---------|-----------------------------------------------------------------|
| partialName | **No**    | string  | A partial string to search by                                   |

## Http Errors

Error codes and meanings:
* 200 - OK
* 206 - Partial Content
* 400 - Bad Request
* 500 - Internal Server Error
