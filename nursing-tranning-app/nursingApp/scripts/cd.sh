yarn build
aws s3 sync build s3://nursing-app-bucket
aws cloudfront create-invalidation --distribution-id E10MACVL3OO71P --path '/index.html'
aws cloudfront create-invalidation --distribution-id E10MACVL3OO71P --path '/*'
