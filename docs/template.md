[![Build status](https://img.shields.io/github/workflow/status/kaskadi/action-collmex-scraper/build?label=build&logo=mocha)](https://github.com/kaskadi/action-collmex-scraper/actions?query=workflow%3Abuild)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/action-collmex-scraper?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scraper)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/action-collmex-scraper?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/action-collmex-scraper)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/action-collmex-scraper?label=code%20quality&logo=lgtm)](https://lgtm.com/projects/g/kaskadi/action-collmex-scraper/?mode=list)

****

{{>main}}
**In order to sign the commit made by this action when generating the new CSV mapping**: add the following `step` before the one using `action-collmex-scraper`:
```
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
```
    - name: Configure GitHub user
      run: |
        git config --global user.name $GH_USER_NAME
        git config --global user.email $GH_USER_EMAIL
      env:
        GH_USER_NAME: ${{ secrets.{YOUR-GITHUB-USER-NAME} }}
        GH_USER_EMAIL: ${{ secrets.{YOUR-GITHUB-USER-EMAIL} }}
```