![](https://img.shields.io/github/workflow/status/kaskadi/action-collmex-scrapper/update?label=dependencies%20updated&logo=npm)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-collmex-scrapper?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scrapper)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-collmex-scrapper?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scrapper)
<!-- [![](https://img.shields.io/codeclimate/coverage/kaskadi/action-collmex-scrapper?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scrapper) -->

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-collmex-scrapper?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-collmex-scrapper/?mode=list)

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
      env:
        USER_NR: ${{ secrets.{YOUR-COLLMEX-USER-NR} }}
        USER_ID: ${{ secrets.{YOUR-COLLMEX-USER-ID} }}
        USER_PWD: ${{ secrets.{YOUR-COLLMEX-USER-PWD} }}
        SATZARTEN_PATH: ${{ secrets.{PATH-TO-YOUR-SATZARTEN-JSON-FILE} }}
```

:point_down: **Here goes any extra details on how to use the action (environment variables/inputs description for example)** :point_down:

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values
