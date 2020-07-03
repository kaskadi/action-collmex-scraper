![Dependency update status](https://img.shields.io/github/workflow/status/kaskadi/action-collmex-scrapper/update?label=dependencies%20updated&logo=npm)
![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-collmex-scrapper/build?label=build&logo=mocha)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-collmex-scrapper?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scrapper)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-collmex-scrapper?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scrapper)

****

**This action is updating its dependencies every Sunday at 7AM CET**

# What is this action for?

This action scrape the CSV mapping from Collmex documentation. This mapping is for example used in [`collmex-client`](https://github.com/kaskadi/collmex-client) to parse the response from Collmex API.

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
        USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```

`SATZARTEN_PATH` should be a relative path from the root of your repository that points to the file where you would like to store the data generated by this action.

**If there is already some data at this path:** the action will automatically back them up by appending `.backup` to the file name and duplicating it before updating it.

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values
