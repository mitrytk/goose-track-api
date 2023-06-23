Документация:

Base URL: https://goose-track-api-l50t.onrender.com

(USERS) Работа с пользователем:

          - SIGN UP:
          
                  POST /api/auth/register 
                  body: 
                  {
                    "name": string, min 3, max 30, required,
                    "password": string, required,
                    "email": string, min 6, required,
                  }
                  res:
                  {
                      "token",
                      "user": {
                          "email",
                          "name",
                          "birthday": "0000-01-01T00:00:00.000Z" - default при создании (не указано пользователем),
                          "phone": 0 - default при создании (не указано пользователем),
                          "skype",
                      }
                  }
                  
          - LOGIN:
          
                  POST /api/auth/login
                  body: 
                  {
                    "password": string, required,
                    "email": string, min 6, required,
                  }
                  res:
                  {
                      "token",
                      "user": {
                          "email",
                          "name",
                          "birthday": "0000-01-01T00:00:00.000Z" - default при создании (не указано пользователем),
                          "phone": 0 - default при создании (не указано пользователем),
                          "skype",
                      }
                  }
                  
          - LOG OUT:
          
                  POST /api/auth/logout
                  header:
                    Authorization: Bearer <token>
                  res:
                  {
                      "message": "Logout success"
                  }
                  
          - CURRENT:
          
                  GET /api/auth/current
                  header:
                    Authorization: Bearer <token>
                  res:
                  {
                      "email",
                      "name",
                      "birthday",
                      "phone",
                      "skype",
                  }
                  
  
    
