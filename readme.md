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
                          "avatarURL",
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
                          "avatarURL",
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
                      "avatarURL",
                  }
                  
          - UPDATE:
          
                  PATCH api/auth/update
                  header:
                    Authorization: Bearer <token>
                  form data: 
                    avatar: jpg, png,
                    email: string,
                    name: string, min 3, max 30,
                    birthday: string, min 10, max 10, формат: YYYY-MM-DD
                    phone: string, min 10,
                    skype: string, min 3,

                  res:
                  {
                    "email",
                    "name",
                    "birthday",
                    "phone",
                    "skype",
                    "avatarURL",
                  }
                  
          - TOGGLE THEMES:
          
                  PATCH /api/auth/toggle-theme
                  header:
                    Authorization: Bearer <token>

                  res:
                  {
                    "themeInterface",
                  }
                  
  
    
