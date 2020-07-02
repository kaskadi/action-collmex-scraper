![](https://img.shields.io/github/workflow/status/kaskadi/action-collmex-scrapper/update?label=dependencies%20updated&logo=npm)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-collmex-scrapper?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scrapper)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-collmex-scrapper?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scrapper)
<!-- [![](https://img.shields.io/codeclimate/coverage/kaskadi/action-collmex-scrapper?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scrapper) -->

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-collmex-scrapper?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-collmex-scrapper/?mode=list)

****

# :warning: Known issues :warning:

## New element initialization

When creating a new repository based off of this template, a _GitHub Actions_ called `init` should normally run and rename all references of the template name in files to the name of your repository.

It is known that this action sometimes does not run (see [here](https://github.com/kaskadi/template-kaskadi-element/issues/17)).

**Suspected cause:** it seems that `init` is not running in cases where the user would try to manipulate the repository directly after creation. **To minimize risks of bug, please wait a minute or two after your repository creation to make sure that `init` runs.**

**Please report any cases where this happens and detail the steps that led to it.**

**If this happens to you:**
1. `npm i -g kaskadi-cli` (if not installed)
2. `kaskadi init action`

****

# Testing

`mocha`, `chai` & `standard` are available as dev dependencies.

****

**This action is updating its dependencies every Sunday at 7AM CET**

# What is this action for?

:point_right: **Describe here what the action should do** :point_left:

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-collmex-scrapper@master
```

:point_down: **Here goes any extra details on how to use the action (environment variables/inputs description for example)** :point_down:

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values
