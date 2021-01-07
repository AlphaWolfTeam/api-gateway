## Friends API Gateway

An API Gateway for Friends.
All requests require a Spike Oauth token using `code` grant-type. 
The is enforced by using [Spike Proxy Service (Incoming)](https://gitlab.com/yesodot/rnd/terminal-rabaz/shared/spike-proxy-service). 

## API Endpoints

| Method                    | Scope | Verb   | Route                   | Params |
|---------------------------|-------|--------|-------------------------|--------|
| Get group by ID           | read  | GET    | /groups/:id             |        |
| Get groups of user        | read  | GET    | /users/:id/groups       |        |
| Search Group              | read  | GET    | /groups                 |        |
| Update Group              | write | PATCH  | /groups/:id             |        |
| Delete Group              | write | DELETE | /groups/:id             |        |
| Add tag to group          | write | PUT    | /groups/:id/tags/:label |        |
| Remove tag from group     | write | DELETE | /groups/:id/tags/:label |        |
| Add user to group         | write | POST   | /groups/:id/users       |        |
| Update user role in group | write | PATCH  | /groups/:id/users:id    |        |
| Remove user from group    | write | DELETE | /groups/:id/users:id    |        |
| Get user by ID            | read  | GET    | /users/:id              |        |
| Find user by partial name | read  | GET    | /users                  |        |
