# Replaced by secret
variable "heroku_email" {
  description = "Email address of Heroku account"
  type        = string
}

# Replaced by secret
variable "heroku_api_key" {
  description = "API key for Heroku account"
  type        = string
  sensitive   = true
}

variable "heroku_app_name" {
  description = "Heroku app name (lower case)"
  type        = string
  default     = "thatsagoodboy"
}
