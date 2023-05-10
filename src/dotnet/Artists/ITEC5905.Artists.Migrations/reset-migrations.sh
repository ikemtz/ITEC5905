#!/bin/bash
set -ex

rm -rfv ./Migrations || true
export DbConnectionString="server=localhost;user=mysql;port=3306;"
dotnet ef migrations add Initial --context DatabaseContext
dotnet ef migrations script --context DatabaseContext --idempotent --output ../ITEC5905.Artists.Db/migration.sql
