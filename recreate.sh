#!/usr/bin/env bash
rake db:drop
rake db:create
rake db:migrate
rake db:seed
