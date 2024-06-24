# proj-trojan-action

pg_dump/restore across DBs

## Create base64 string of SSL Cert

```shell
cat name-of-cert-file.pem | base64
```

## Roles

The default superuser role when you setup RDS is `postgres`. Make sure the Neon dev database also has a role named `postgres` generate a new password for this role and be sure to use that role with the connectionString / GitHub secrets.
