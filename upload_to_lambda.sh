#!/bin/bash
echo "Lambda files got changed. Going to update lambda function code"
aws ssm get-parameters-by-path --path /myLamda --region ap-south-1
aws ssm get-parameters-by-path --path /myLamda --region ap-south-1 | jq -r '.Parameters | map(.Name+"="+.Value)| join("\n") | sub("/myLamda/"; ""; "g")  ' >.env 
mkdir -p /tmp/myLamda
cat .env 
mv dist/index.zip /tmp/myLamda/index.zip
cp .env /tmp/myLamda/.env
ls /tmp/myLamda
aws s3 cp /tmp/myLamda/index.zip s3://projectscicds/index.zip
aws lambda update-function-code --function-name myLamda --s3-bucket projectscicds --s3-key index.zip