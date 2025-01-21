Do setup postgresql refer to documentation in ubuntu web

## Access psql command with postgres user & template1 database
- sudo -u postgres psql template1

## Setup new user postgres
- CREATE USER wslubuntu WITH PASSWORD 'wsl-ubuntu'
- Configurate accesing database in pg_hba.conf

## Create database
- CREATE DATABASE tugas_akhir WITH OWNER='wslubuntu'

