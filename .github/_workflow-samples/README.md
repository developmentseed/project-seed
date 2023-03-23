# `deploy-s3-yml`
A workflow that builds the site and deploys it to S3.

This workflow gets triggered with every push to the main branch, and doesn't verify if the checks were successful. It relies on branch protection to do so.

## First-time setup
- create a bucket on S3 and enable 'Static website hosting' with both the Index and Error document set to `index.html`. To do this programmatically:
  ```
  aws s3 mb [BUCKET NAME]
  aws s3 website [BUCKET NAME] --index-document index.html --error-document index.html
  aws s3api put-bucket-tagging --bucket [BUCKET NAME] --tagging 'TagSet=[{Key=Project,Value=[PROJECT TAG]}]'
  ```
- create an IAM with a policy that provides it with programmatic access to the bucket
- add the AWS Access Key and Secret from the IAM [as encrypted secrets to the project repository](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository). Use `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY`
- add the bucket name as an evironemnt variable (`DEPLOY_BUCKET`) to the deploy workflow. Omit `s3://` from the bucket name.

## Serving site from sub-path
This workflow assumes that the site is served from the root of the URL (eg. devseed.com). To support a URL served from a sub-path (eg. devseed.com/explorer), replace the `yarn build` step in the build job with the following steps:

```
      - name: Build
        run: PUBLIC_URL="https://devseed.com/explorer" yarn build

      - name: Serve site from subpath
        run: |
          cd dist
          mkdir explorer
          mv assets explorer/assets
          cp index.html explorer
```

# `deploy-surge-yml`
A workflow that builds the site and deploys it to Surge.

This workflow gets triggered with every push to the main branch, and doesn't verify if the checks were successful. It relies on branch protection to do so.

## First-time setup
- create a user on Surge
- add the secret token from Surge as [an encrypted secret to the project repository](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository). Use `SURGE_TOKEN`
- add `SURGE_DOMAIN` to the `deploy.yml`. This ensure the app is deployed to the same domain every time.
