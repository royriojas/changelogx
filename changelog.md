
# changelogx - Changelog
## v1.0.5
- **Build Scripts Changes**
  - Release v1.0.5 - [6258a8e]( https://github.com/royriojas/changelogx/commit/6258a8e ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 19:05:39
    
- **Documentation**
  - Better documentation - [585d40c]( https://github.com/royriojas/changelogx/commit/585d40c ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 19:04:51
    
- **Other changes**
  - Create README.md - [e652ff8]( https://github.com/royriojas/changelogx/commit/e652ff8 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 18:04:51
    
#### formatters
- **Refactoring**
  - Make code pass validation - [2952a67]( https://github.com/royriojas/changelogx/commit/2952a67 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 17:23:26
    
- **Enhancements**
  - Remove Uncategorized section from the features - [bf549da]( https://github.com/royriojas/changelogx/commit/bf549da ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 17:11:28
    
  - Add proper indentation level for log body - [6069390]( https://github.com/royriojas/changelogx/commit/6069390 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 16:33:28
    
- **Features**
  - markdown formatter added - [5c86637]( https://github.com/royriojas/changelogx/commit/5c86637 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 16:27:54
    Now it is possible to render a mardown version of the changelogx using
   
   ```bash
   changelogx -f markdown > changelog.md
   ```
   
   It is also possible to do:
   
   ```bash
   changelogx -f markdown -outputFile=./changelog.md
   ```
   
## v1.0.4
- **Build Scripts Changes**
  - Release v1.0.4 - [fb45618]( https://github.com/royriojas/changelogx/commit/fb45618 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 15:33:55
    
#### formatters
- **Enhancements**
  - html formatter style improved - [ca469bd]( https://github.com/royriojas/changelogx/commit/ca469bd ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 15:33:43
    
## v1.0.3
- **Build Scripts Changes**
  - Release v1.0.3 - [92ef7d2]( https://github.com/royriojas/changelogx/commit/92ef7d2 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 14:22:51
    
#### formatters
- **Features**
  - only print output messages in case of outputFile option especified - [c5e749c]( https://github.com/royriojas/changelogx/commit/c5e749c ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 14:20:43
    - When the option `outputFile` is ommited, then only the output of the formatter will
     be directed to the standard output. is like the option `--quiet, -q` is implicit
   
## v1.0.2
- **Build Scripts Changes**
  - Release v1.0.2 - [bf44657]( https://github.com/royriojas/changelogx/commit/bf44657 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 12:33:39
    
- **Refactoring**
  - Obtain groups as json from git - [a97e3b4]( https://github.com/royriojas/changelogx/commit/a97e3b4 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 02:21:30
    
#### formatters
- **Features**
  - HTML formatters - [2c445f6]( https://github.com/royriojas/changelogx/commit/2c445f6 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 12:32:14
    
## v1.0.1
- **Build Scripts Changes**
  - Release v1.0.1 - [d6f8cbb]( https://github.com/royriojas/changelogx/commit/d6f8cbb ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 02:11:38
    
- **Refactoring**
  - Change color of good commit confirmation - [96d4516]( https://github.com/royriojas/changelogx/commit/96d4516 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 02:11:29
    
  - Add log action - [a097055]( https://github.com/royriojas/changelogx/commit/a097055 ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 02:07:13
    
- **Features**
  - commit-msg hook done - [8cb0f0d]( https://github.com/royriojas/changelogx/commit/8cb0f0d ), [Roy Riojas](https://github.com/Roy Riojas), 16/03/2015 01:56:22
    
  - First commit - [dec024a]( https://github.com/royriojas/changelogx/commit/dec024a ), [Roy Riojas](https://github.com/Roy Riojas), 08/03/2015 12:05:35
    
- **Tests Related fixes**
  - Tests for parse-commit passing - [7e3ea32]( https://github.com/royriojas/changelogx/commit/7e3ea32 ), [Roy Riojas](https://github.com/Roy Riojas), 15/03/2015 22:24:23
    
