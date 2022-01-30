variable "heroku_app_name" {
  description = "Heroku app name (lower case)"
  type        = string
  default     = "thatsagoodboy"
}

#### SECRETS - Replaced by process environment variables ####
variable "heroku_email" {
  description = "Email address of Heroku account"
  type        = string
}

variable "heroku_api_key" {
  description = "API key for Heroku account"
  type        = string
  sensitive   = true
}

variable "unsplash_access_key" {
  description = "Access key for Unsplash"
  type        = string
  sensitive   = true
}

variable "unsplash_secret_key" {
  description = "Secret key for Unsplash"
  type        = string
  sensitive   = true
}