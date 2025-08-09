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

# Update fixtures for run-destroy
rm -r "tests/fixtures/run-destroy/output"
cp -r "tests/fixtures/run-destroy/input" "tests/fixtures/run-destroy/output"

./dist/bin/blueprints-v2-addon.js \
  destroy component my-component/glimmer \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  destroy component my-component/template-only \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  destroy helper my-helper/class \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  destroy helper my-helper/function \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  destroy modifier my-modifier/class \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  destroy modifier my-modifier/function \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  destroy service my-service/class \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  destroy util my-util/function \
  --root "tests/fixtures/run-destroy/output/packages/ui/form" \
  --test-app-location "../../../test-app"

# Update fixtures for run-generate
rm -r "tests/fixtures/run-generate/output"
cp -r "tests/fixtures/run-generate/input" "tests/fixtures/run-generate/output"

./dist/bin/blueprints-v2-addon.js \
  generate component my-component/glimmer \
  --blueprint "glimmer" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  generate component my-component/template-only \
  --blueprint "template-only" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  generate helper my-helper/class \
  --blueprint "class" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  generate helper my-helper/function \
  --blueprint "function" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  generate modifier my-modifier/class \
  --blueprint "class" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  generate modifier my-modifier/function \
  --blueprint "function" \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  generate service my-service/class \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"

./dist/bin/blueprints-v2-addon.js \
  generate util my-util/function \
  --root "tests/fixtures/run-generate/output/packages/ui/form" \
  --test-app-location "../../../test-app"
