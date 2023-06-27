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

---

Reviews - работа с отзывами

        -ADD
        POST /api/reviews/
          body:
                  {
                     rating: {
                     type: Number,
                      enum: [1, 2, 3, 4, 5],
                     default: 5,
                    required: true,
                            },
                 review: {
                    type: String,
                   required: true,
                    minlength: 10,
                    maxlength: 300,
                        }
                  }
                  res: {
                          "owner": {
                              name: String,
                              avatarURL: String,
                              id: String,
                                  },
                         "rating": number,
                          "review": "",
                          "_id": "dddddddddddddddddddddddddddddddd",
                         "createdAt": "2023-06-26T17:22:52.601Z",
                          "updatedAt": "2023-06-26T17:22:52.601Z"
                      }

      -EDIT
            PATCH /api/reviews/:id
              body: {
                review: {
                    type: String,
                    required: true,
                    minlength: 10,
                    maxlength: 300,
                }
                rating: {
                    type: Number,
                    enum: [1, 2, 3, 4, 5],
                    default: 5,
                    required: true,
                },
              }
              res: {
                "owner": {
                    name: String,
                    avatarURL: String,
                    id: String,
                },
                "rating": number,
                "review": "",
                "_id": "dddddddddddddddddddddddddddddddd",
                "createdAt": "2023-06-26T17:22:52.601Z",
                "updatedAt": "2023-06-26T17:22:52.601Z"
                }

-DELETE
DELETE /api/reviews/:id
res: {
message: "review deleted"
}

-GET
GET /api/reviews/

                 res: {
                          "owner": {
                              name: String,
                              avatarURL: String,
                              id: String,
                                  },
                         "rating": number,
                          "review": "",
                          "_id": "dddddddddddddddddddddddddddddddd",
                         "createdAt": "2023-06-26T17:22:52.601Z",
                          "updatedAt": "2023-06-26T17:22:52.601Z"
                      }

-GET ONE Review
GET /api/reviews/:id

                 res: {
                          "owner": {
                              name: String,
                              avatarURL: String,
                              id: String,
                                  },
                         "rating": number,
                          "review": "",
                          "_id": "dddddddddddddddddddddddddddddddd",
                         "createdAt": "2023-06-26T17:22:52.601Z",
                          "updatedAt": "2023-06-26T17:22:52.601Z"
                      }
