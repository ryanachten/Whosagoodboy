resource "heroku_app" "app" {
  name   = var.heroku_app_name
  region = "us"
}
