export default {
  "flashCards": "homePage",
  "navigation": {
    "currentPage": "home",
    "path": [
      {
        "name": "Home",
        "url": "/"
      },
      {
        "name": "cards",
        "url": ["/cards", "/cards/:id", "/cards/:id/edit", "/cards/:id/delete"]
      },
      {
        "name": "users",
        "url": ["/users", "/users/:id", "/users/:id/edit", "/users/:id/delete"]
      },
      {
        "name": "login",
        "url": ["/login", "/register"]
      }
    ]
  }
}