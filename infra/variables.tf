#### SECRETS - Replaced by process environment variables ####
variable "vercel_api_token" {
  description = "API token for Vercel account"
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
