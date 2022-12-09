# whosagoodboy - infrastructure

- Install Terraform (using `v1.1.4` at the time of writing)
- Set environment variables:

```
$env:TF_VAR_vercel_api_token="API token created in Vercel"
$env:TF_VAR_unsplash_access_key="Unsplash API access key"
$env:TF_VAR_unsplash_secret_key="Unsplash API secret key"
```

- Initialise TF: `terraform init`
- Run TF plan to ensure resources to be created are correct: `terraform plan`
- Execute TF plan to create resources: `terraform apply`
