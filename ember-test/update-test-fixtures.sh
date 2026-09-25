#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
cp -r "tests/fixtures/my-app/input" "tests/fixtures/my-app/output"

./dist/bin/ember-test.js \
  --root "tests/fixtures/my-app/output"
