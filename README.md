[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-collmex-scraper/build?label=build&logo=mocha)](https://github.com/kaskadi/action-collmex-scraper/actions?query=workflow%3Abuild)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/action-collmex-scraper/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/action-collmex-scraper/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-collmex-scraper?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scraper)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-collmex-scraper?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scraper)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-collmex-scraper?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-collmex-scraper/?mode=list)

****

# What is this action for?

This action scrape the CSV mapping from Collmex documentation. This mapping is for example used in [`collmex-client`](https://github.com/kaskadi/collmex-client) to parse the response from Collmex API.

# How to use it?

You can use the following code as a new _GitHub Actions Workflow_:

```yaml
name: {YOUR-ACTION-NAME}
on: [{YOUR-ACTION-EVENT}]
jobs:
  {YOUR-JOB-NAME}:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: {YOUR-STEP-NAME}
      uses: kaskadi/action-collmex-scraper@master
      env:
        CMX_USER: {CMX_USER-VALUE}
        CMX_PWD: {CMX_PWD-VALUE}
        CMX_CUST_ID: {CMX_CUST_ID-VALUE}
        SATZARTEN_PATH: {SATZARTEN_PATH-VALUE}
```

**Note:** everything contained in single curly brackets (`{ }`) needs to be replaced by your desired values

**Outputs:**
|     Output     | Description                                                                                                                                                       |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATA_CHANGED` | Tracks if the CSV mapping data has changed. Defined as `Boolean` but you may need to check it against its  `String` version if you are working with conditionals. |

**Environment variables:**
|     Variable     | Required | Description                                                                                                                                                                                                                                                                |
| :--------------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    `CMX_USER`    |  `true`  | Collmex user name to use for authentication. **Recommend storing this in your repository secrets!**                                                                                                                                                                        |
|     `CMX_PWD`    |  `true`  | Collmex password to use for authentication. **Recommend storing this in your repository secrets!**                                                                                                                                                                         |
|   `CMX_CUST_ID`  |  `true`  | Collmex customer ID. **Recommend storing this in your repository secrets!**                                                                                                                                                                                                |
| `SATZARTEN_PATH` |  `true`  | Relative path from the root of your repository to the file where the data generated by this action will be stored. **If the file already exists:** the action will automatically back it up by appending `.backup` to the file name and duplicating it before updating it. |

**In order to sign the commit made by this action when generating the new CSV mapping**: add the following `step` before the one using `action-collmex-scraper`:
```yaml
    - name: Import GPG key
      uses: crazy-max/ghaction-import-gpg@v2
      with:
        git_user_signingkey: true
        git_commit_gpgsign: true
      env:
        GPG_PRIVATE_KEY: ${{ secrets.{YOUR-GPG-PRIVATE-KEY} }}
        PASSPHRASE: ${{ secrets.{YOUR-GPG-PRIVATE-KEY-PASSPHRASE} }}
```

**If you do not need to sign via GPG**: simply replace the `Import GPG key` step of the job by:
```yaml
    - name: Configure GitHub user
      run: |
        git config --global user.name $GH_USER_NAME
        git config --global user.email $GH_USER_EMAIL
      env:
        GH_USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        GH_USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```