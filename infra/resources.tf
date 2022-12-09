resource "vercel_project" "whosagoodboy_site" {
  name      = "whosagoodboy"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "ryanachten/whosagoodboy"
  }
}

resource "vercel_project_environment_variable" "unsplash_access_key" {
  project_id = vercel_project.whosagoodboy_site.id
  target     = ["preview", "development", "production"]
  key        = "UNSPLASH_ACCESS_KEY"
  value      = var.unsplash_access_key
}

resource "vercel_project_environment_variable" "unsplash_secret_key" {
  project_id = vercel_project.whosagoodboy_site.id
  target     = ["preview", "development", "production"]
  key        = "UNSPLASH_SECRET_KEY"
  value      = var.unsplash_secret_key
}
