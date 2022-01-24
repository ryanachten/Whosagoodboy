# Running Whosagoodboy infrastructure
- Install Terraform (using `v1.1.4` at the time of writing)
- Set environment variables:
```
$env:TF_VAR_heroku_api_key="key created in Heroku"
$env:TF_VAR_heroku_email="email associated with Heroku account"

```
- Initialise TF: `terraform init`
- Run TF plan to ensure resources to be created are correct: `terraform plan`
- Execute TF plan to create resources: `terraform apply`