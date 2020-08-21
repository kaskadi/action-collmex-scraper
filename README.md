[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-collmex-scraper/build?label=build&logo=mocha)](https://github.com/kaskadi/action-collmex-scraper/actions?query=workflow%3Abuild)

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-collmex-scraper?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scraper)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-collmex-scraper?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scraper)

****

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
    - name: Import GPG key
      uses: crazy-max/ghaction-import-gpg@v2
      with:
        git_user_signingkey: true
        git_commit_gpgsign: true
      env:
        GPG_PRIVATE_KEY: ${{ secrets.{YOUR-GPG-PRIVATE-KEY} }}
        PASSPHRASE: ${{ secrets.{YOUR-GPG-PRIVATE-KEY-PASSPHRASE} }}
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-collmex-scraper@master
      env:
        CMX_USER: ${{ secrets.{YOUR-COLLMEX-USER} }}
        CMX_PWD: ${{ secrets.{YOUR-COLLMEX-PWD} }}
        CMX_CUST_ID: ${{ secrets.{YOUR-COLLMEX-CUSTOMER-ID} }}
        SATZARTEN_PATH: ${{ secrets.{PATH-TO-YOUR-SATZARTEN-JSON-FILE} }}
```

`SATZARTEN_PATH` should be a relative path from the root of your repository that points to the file where you would like to store the data generated by this action.

**If you do not need to sign your commits via GPG**: simply replace the `Import GPG key` step of the job by:
```
    - name: Configure GitHub user
      run: |
        git config --global user.name $GH_USER_NAME
        git config --global user.email $GH_USER_EMAIL
      env:
        GH_USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        GH_USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```

**If there is already some data at this path:** the action will automatically back them up by appending `.backup` to the file name and duplicating it before updating it.

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values

**Outputs:** `DATA_CHANGED` output is available for reusing into your workflow. This tracks if the CSV mapping data changed. It is defined as boolean in the action but you may need to check it against its `String` version if you are working with conditionals.
