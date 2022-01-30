resource "heroku_app" "app" {
  name   = var.heroku_app_name
  region = "us"

  config_vars = {
    UNSPLASH_ACCESS_KEY = var.unsplash_access_key
    UNSPLASH_SECRET_KEY = var.unsplash_secret_key
  }

  buildpacks = [
    "heroku/nodejs"
  ]
}

resource "heroku_build" "build" {
  app = heroku_app.app.id
  source {
    path = "../app"
  }
}
