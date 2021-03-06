
# changelogx - Changelog
## v5.0.6
- **Bug Fixes**
  - features should also use the issueIDURL as function - [d17ccbd]( https://github.com/royriojas/changelogx/commit/d17ccbd ), [Roy Riojas](https://github.com/Roy Riojas), 27/09/2019 11:33:36

    
## v5.0.5
- **Bug Fixes**
  - Add option to process the tags before generating the log file - [315b6d2]( https://github.com/royriojas/changelogx/commit/315b6d2 ), [Roy Riojas](https://github.com/Roy Riojas), 27/09/2019 03:22:04

    
## v5.0.4
- **Bug Fixes**
  - remove source from call to opts.issueIDURL - [484e0bd]( https://github.com/royriojas/changelogx/commit/484e0bd ), [royriojas](https://github.com/royriojas), 12/07/2019 14:55:33

    
## v5.0.3
- **Bug Fixes**
  - issueIDURL throws when used as a function - [02e797a]( https://github.com/royriojas/changelogx/commit/02e797a ), [royriojas](https://github.com/royriojas), 12/07/2019 14:45:31

    
## v5.0.2
- **Bug Fixes**
  - make issueIDURL to accept a function to handle more complex cases - [1522403]( https://github.com/royriojas/changelogx/commit/1522403 ), [royriojas](https://github.com/royriojas), 12/07/2019 14:37:54

    
## v5.0.1
- **Bug Fixes**
  - Remove snyk as it is not needed as deps were updated - [ea96fd7]( https://github.com/royriojas/changelogx/commit/ea96fd7 ), [Roy Riojas](https://github.com/Roy Riojas), 11/07/2019 16:32:18

    
## v5.0.0
- **Build Scripts Changes**
  - upgrade deps - [eba9cbb]( https://github.com/royriojas/changelogx/commit/eba9cbb ), [Roy Riojas](https://github.com/Roy Riojas), 11/07/2019 16:30:35

    
- **Bug Fixes**
  - .snyk, package.json & package-lock.json to reduce vulnerabilities - [7613ae4]( https://github.com/royriojas/changelogx/commit/7613ae4 ), [snyk-test](https://github.com/snyk-test), 09/07/2019 01:24:30

    The following vulnerabilities are fixed with an upgrade:
    - https://snyk.io/vuln/SNYK-JS-MARKED-451341
    
    
    The following vulnerabilities are fixed with a Snyk patch:
    - https://snyk.io/vuln/SNYK-JS-LODASH-450202
    
## v4.0.0
- **Refactoring**
  - Changelog improvements - [c8b95d4]( https://github.com/royriojas/changelogx/commit/c8b95d4 ), [royriojas](https://github.com/royriojas), 09/07/2019 01:21:07

    Add the ability to specify custom tags using a config file
    
## v3.0.0
- **Refactoring**
  - use git tag --list to obtain the list of tags - [b8cb797]( https://github.com/royriojas/changelogx/commit/b8cb797 ), [Roy Riojas](https://github.com/Roy Riojas), 15/09/2018 13:15:41

    
- **Bug Fixes**
  - package.json & .snyk to reduce vulnerabilities - [fe9de63]( https://github.com/royriojas/changelogx/commit/fe9de63 ), [snyk-bot](https://github.com/snyk-bot), 29/10/2017 23:13:04

    The following vulnerabilities are fixed with a Snyk patch:
    - https://snyk.io/vuln/npm:marked:20170907
    
    Latest report for royriojas/changelogx:
    https://snyk.io/test/github/royriojas/changelogx
## v2.0.1
- **Build Scripts Changes**
  - update clix - [1cece99]( https://github.com/royriojas/changelogx/commit/1cece99 ), [Roy Riojas](https://github.com/Roy Riojas), 31/07/2016 04:17:52

    
## v2.0.0
- **Refactoring**
  - Ugrapde read-file dependency to remove outdated graceful-fs dep - [0febb4a]( https://github.com/royriojas/changelogx/commit/0febb4a ), [Roy Riojas](https://github.com/Roy Riojas), 19/07/2016 02:03:56

    
- **Build Scripts Changes**
  - Clean up template - [2e889b4]( https://github.com/royriojas/changelogx/commit/2e889b4 ), [Roy Riojas](https://github.com/Roy Riojas), 01/06/2016 21:36:05

    
## v1.0.19
- **Bug Fixes**
  - exec uses now maxBuffer=Infinity - [9b279d3]( https://github.com/royriojas/changelogx/commit/9b279d3 ), [royriojas](https://github.com/royriojas), 01/02/2016 18:05:51

    
- **Features**
  - better config inference - [4bd5873]( https://github.com/royriojas/changelogx/commit/4bd5873 ), [royriojas](https://github.com/royriojas), 11/09/2015 18:32:06

    
## v1.0.18
- **Build Scripts Changes**
  - update clix dep to get nicer log output - [c840b41]( https://github.com/royriojas/changelogx/commit/c840b41 ), [royriojas](https://github.com/royriojas), 11/08/2015 19:34:16

    
## v1.0.17
- **Build Scripts Changes**
  - Update to latest clix - [1f83b3e]( https://github.com/royriojas/changelogx/commit/1f83b3e ), [royriojas](https://github.com/royriojas), 11/08/2015 16:32:01

    
## v1.0.16
- **Bug Fixes**
  - properly parse commit messages. Fixes [#7](https://github.com/royriojas/changelogx/issues/7) - [a625acd]( https://github.com/royriojas/changelogx/commit/a625acd ), [royriojas](https://github.com/royriojas), 29/07/2015 20:53:30

    
## v1.0.15
- **Refactoring**
  - Beautify the code with esbeautifier - [d3235cb]( https://github.com/royriojas/changelogx/commit/d3235cb ), [royriojas](https://github.com/royriojas), 13/07/2015 01:26:00

    
- **Build Scripts Changes**
  - Update deps and remove unused files - [1e71bf3]( https://github.com/royriojas/changelogx/commit/1e71bf3 ), [royriojas](https://github.com/royriojas), 13/07/2015 01:25:44

    Add npm script command `do-changelog` to automate the generation/commit
    of the changelog.
    
#### commit-msg hook
- **Bug Fixes**
  - Fix [#6](https://github.com/royriojas/changelogx/issues/6). - [989068b]( https://github.com/royriojas/changelogx/commit/989068b ), [royriojas](https://github.com/royriojas), 13/07/2015 01:19:35

    Commit messages now can contain `:` characters in the subject.
    
## v1.0.14
- **Documentation**
  - Fix the style of the code blocks - [f8ec16f]( https://github.com/royriojas/changelogx/commit/f8ec16f ), [royriojas](https://github.com/royriojas), 12/07/2015 04:11:11

    
## v1.0.13
- **Build Scripts Changes**
  - Update deps - [a049348]( https://github.com/royriojas/changelogx/commit/a049348 ), [royriojas](https://github.com/royriojas), 10/06/2015 06:57:51

    
## v1.0.12
- **Features**
  - Add an option to ignore certain commits from the final changelog. Fixes [#3](https://github.com/royriojas/changelogx/issues/3) - [0d2000f]( https://github.com/royriojas/changelogx/commit/0d2000f ), [royriojas](https://github.com/royriojas), 18/05/2015 03:55:04

    - from the config section
      ```javascript
      "changelogx": {
        "ignoreRegExp": ["BLD: Release", "DOC: Generate Changelog", "Generated Changelog"],
        "issueIDRegExp" : "#(\\d+)",
        "commitURL": "https://github.com/$user$/changelogx/commit/{0}",
        "authorURL": "https://github.com/{0}",
        "issueIDURL": "https://github.com/$user$/changelogx/issues/{0}",
        "projectName": "changelogx"
      }
      ```
    - from the command line (overrides config option)
      ```bash
      # this will exclude all the commits that contain the passed text. the -i option is an array
      # so if passed several times it will populate the array
      changelog -i "DOC: Generate Changelog" -i "BLD: Release" -f markdown -o ./changelog.md
      ```
    
  - Do not complain about automatic messages generated by git for merge and revert. Fixes [#5](https://github.com/royriojas/changelogx/issues/5) - [37ced06]( https://github.com/royriojas/changelogx/commit/37ced06 ), [royriojas](https://github.com/royriojas), 17/05/2015 14:28:58

    
## v1.0.11
#### markdown formatter
- **Bug Fixes**
  - Wrong indentation of the commit body. Fix [#2](https://github.com/royriojas/changelogx/issues/2) - [9b255b2]( https://github.com/royriojas/changelogx/commit/9b255b2 ), [Roy Riojas](https://github.com/Roy Riojas), 24/03/2015 19:41:19

    
- **Documentation**
  - Add changelog - [a847772]( https://github.com/royriojas/changelogx/commit/a847772 ), [Roy Riojas](https://github.com/Roy Riojas), 21/03/2015 04:37:38

    
## v1.0.10
- **Refactoring**
  - Improve log messages - [ecf1132]( https://github.com/royriojas/changelogx/commit/ecf1132 ), [Roy Riojas](https://github.com/Roy Riojas), 21/03/2015 04:36:32

    Keep consistent use of the affordances
    
## v1.0.8
#### configuration
- **Features**
  - infer the configuration if not `changelogx` section found in `package.json` or in a custom config file. Fix [#1](https://github.com/royriojas/changelogx/issues/1) - [5cb6142]( https://github.com/royriojas/changelogx/commit/5cb6142 ), [Roy Riojas](https://github.com/Roy Riojas), 21/03/2015 04:29:46

    This is the configuration that will be used in case no changelogx section found
    
    ```javascript
    'changelogx': {
      'issueIDRegExp': '#(\\d+)',
      'commitURL': '[REPO_URL]/commit/{0}',
      'authorURL': 'https://github.com/{0}',
      'issueIDURL': '[REPO_URL]/issues/{0}',
      'projectName': [PKG_NAME]
    }
    ```
    
- **Other changes**
  - Update README.md - [8769c11]( https://github.com/royriojas/changelogx/commit/8769c11 ), [Roy Riojas](https://github.com/Roy Riojas), 20/03/2015 21:08:10

    
## v1.0.7
#### changelog
- **Build Scripts Changes**
  - Add changelog task - [6b7945e]( https://github.com/royriojas/changelogx/commit/6b7945e ), [Roy Riojas](https://github.com/Roy Riojas), 19/03/2015 02:25:41

    
## v1.0.6
#### options
- **Documentation**
  - minor change in style of the help - [a2c03ec]( https://github.com/royriojas/changelogx/commit/a2c03ec ), [Roy Riojas](https://github.com/Roy Riojas), 19/03/2015 02:23:36

    
- **Documentation**
  - Genereated Readme - [2337bcf]( https://github.com/royriojas/changelogx/commit/2337bcf ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 21:06:19

    
## v1.0.5
- **Documentation**
  - Better documentation - [585d40c]( https://github.com/royriojas/changelogx/commit/585d40c ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 21:04:51

    
- **Other changes**
  - Create README.md - [e652ff8]( https://github.com/royriojas/changelogx/commit/e652ff8 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 20:04:51

    
#### formatters
- **Refactoring**
  - Make code pass validation - [2952a67]( https://github.com/royriojas/changelogx/commit/2952a67 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 19:23:26

    
- **Enhancements**
  - Remove Uncategorized section from the features - [bf549da]( https://github.com/royriojas/changelogx/commit/bf549da ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 19:11:28

    
  - Add proper indentation level for log body - [6069390]( https://github.com/royriojas/changelogx/commit/6069390 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 18:33:28

    
- **Features**
  - markdown formatter added - [5c86637]( https://github.com/royriojas/changelogx/commit/5c86637 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 18:27:54

    Now it is possible to render a mardown version of the changelogx using
    
    ```bash
    changelogx -f markdown > changelog.md
    ```
    
    It is also possible to do:
    
    ```bash
    changelogx -f markdown -outputFile=./changelog.md
    ```
    
## v1.0.4
#### formatters
- **Enhancements**
  - html formatter style improved - [ca469bd]( https://github.com/royriojas/changelogx/commit/ca469bd ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 17:33:43

    
## v1.0.3
#### formatters
- **Features**
  - only print output messages in case of outputFile option especified - [c5e749c]( https://github.com/royriojas/changelogx/commit/c5e749c ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 16:20:43

    - When the option `outputFile` is ommited, then only the output of the formatter will
      be directed to the standard output. is like the option `--quiet, -q` is implicit
    
## v1.0.2
#### formatters
- **Features**
  - HTML formatters - [2c445f6]( https://github.com/royriojas/changelogx/commit/2c445f6 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 14:32:14

    
- **Refactoring**
  - Obtain groups as json from git - [a97e3b4]( https://github.com/royriojas/changelogx/commit/a97e3b4 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 04:21:30

    
## v1.0.1
- **Refactoring**
  - Change color of good commit confirmation - [96d4516]( https://github.com/royriojas/changelogx/commit/96d4516 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 04:11:29

    
  - Add log action - [a097055]( https://github.com/royriojas/changelogx/commit/a097055 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 04:07:13

    
- **Features**
  - commit-msg hook done - [8cb0f0d]( https://github.com/royriojas/changelogx/commit/8cb0f0d ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 03:56:22

    
  - First commit - [dec024a]( https://github.com/royriojas/changelogx/commit/dec024a ), [Roy Riojas](https://github.com/Roy Riojas), 08/03/2015 14:05:35

    
- **Tests Related fixes**
  - Tests for parse-commit passing - [7e3ea32]( https://github.com/royriojas/changelogx/commit/7e3ea32 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 00:24:23

    
