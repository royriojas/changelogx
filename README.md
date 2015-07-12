[![NPM Version](http://img.shields.io/npm/v/changelogx.svg?style=flat)](https://npmjs.org/package/changelogx)
[![Build Status](http://img.shields.io/travis/royriojas/changelogx.svg?style=flat)](https://travis-ci.org/royriojas/changelogx)

# changelogx
> Yet another changelog generator from git commits, based on conventions and with an optional hook to enforce the rules

## Install
```bash
npm i -g changelogx
```

## add to your package.json a section like this:

```javascript
{
  "changelogx": {
    // the text is passed to new RegExp with the flags gi.
    // if a commit matches any of the passed strings it will not be added to the final changelog
    "ignoreRegExp": ["DOC: add changelog", "generated changelog", "BLD: Release"],
    "issueIDRegExp" : "#(\\d+)", // regular expression to match issues found inside the changelog
    "commitURL": "https://github.com/royriojas/changelogx/commit/{0}", //the url for commits
    "authorURL": "https://github.com/{0}", //the url for the authors
    "issueIDURL": "https://github.com/royriojas/changelogx/issues/{0}", //the url for the issues
    "projectName": "changelogx" // the name of the project
  }
}
```

If no configuration file is provided or no `changelogx` configuration is found in the `package.json`, then
The script will try to infer the settings assuming the module is hosted in github. Please verify the inferred
configuration to verify is valid or provide your own configuration

## Usage
```
Usage: changelogx [install-hook] [options]

Options:
  -f, --format One of: html, markdown  Use a specific output format, markdown or html. - default: html
  -p, --tagPrefix String               The tag prefix to filter the tags obtained from git.
  -r, --tagRange String                Filter the commits to only the ones between the given tag range
  -o, --outputFile path::String        Specify file to write the changelog to. If omitted the output will be printed to the stdout. IF this option is set no
                                       other logs will print to stdout (-q is implicit here)
  -m, --maxSubjectLength Number        If the command install-hook is used, this option allows to specify the maximum length for the commit subject -
                                       default: 140
  -i, --ignoreRegExp [String]          A regular expression to match for commits that should be ignored from the changelog
  -h, --help                           Show this help
  -v, --version                        Outputs the version number
  -q, --quiet                          Show only the summary info
  -c, --config String                  Path to your `changelogx` config. By Default will look for a `changelogx` section on your `package.json`

When no configuration is provided, some defaults based on your `package.json` file will be used. For Example:

"changelogx": {
  "ignoreRegExp": ["BLD: Release", "DOC: Generate Changelog", "Generated Changelog"],
  "issueIDRegExp" : "#(\\d+)",
  "commitURL": "https://github.com/$user$/changelogx/commit/{0}",
  "authorURL": "https://github.com/{0}",
  "issueIDURL": "https://github.com/$user$/changelogx/issues/{0}",
  "projectName": "changelogx"
}
```

## Examples

- Generate an html changelog

  ```bash
  # this will create a changelog.html file
  changelogx -o changelog.html
  ```

- Generate a markdown changelog

  ```bash
  # this will create a markdown changelog
  changelog -f markdown -o changelog.md
  ```

- Generate the changelog to stdout

  ```bash
  # this will create a markdown changelog and print it to stdout
  changelog -f markdown
  ```

- Get a changelog between 2 tags

  ```bash
  # this will create a markdown changelog from v0.1.0 to v2.0.0 and print it to stdout
  changelog -f markdown --tagRange=v0.1.0..v2.0.0
  ```

- Only use certain type of tags

  ```bash
  # this will create a markdown changelog from v0.1.0 to v2.0.0 and print it to stdout ignoring other tags that don't start with `v`
  changelog -f markdown --tagRange=v0.1.0..v2.0.0 --tagPrefix=v
  ```

- Exclude certain commits
  ```bash
  # this will exclude all the commits that contain the passed text. the -i option is an array
  # so if passed several times it will populate the array
  changelog -i "DOC: Generate Changelog" -i "BLD: Release" -f markdown -o ./changelog.md
  ```

**Bonus**

Install commit-msg hook, in order to enforce the conventions to follow in order to generate this changelog.

```bash
# install the commit-msg hook setting the maximum subject line length to 160 characters
changelog install-hook -m 160
```

This will enforce the commits to follow the following structure:

```bash
  {TAG}:({FEATURE}) {SHORT_DESCRIPTION} {ISSUE_ID}

  {LONG_DESCRIPTION}
```

Where:
- **TAG**, Any of the following :
  - BLD: change related to build scripts
  - FIX: bugfixes, hotfixes.
  - BUG: alias for bugfixes, hotfixes.
  - DOC: documentation
  - FEAT: features new features
  - ENH: Performance enhancements, not captured in features
  - REF: maintenance commit (refactoring, etc.)
  - STY: style fix (whitespaces, typos)
  - TST: addition or modification of tests

- **FEATURE**. Useful to identify commits related to a given feature. Optional.
- **SHORT_DESCRIPTION**. A very short description for the commit
- **ISSUE_ID** (Optional). Provide one if you have it example, see: #40, #30
- **LONG_DESCRIPTION** (Optional). A longer description of the commit. You can use markdown
  to provide some nice formatting on the body as well. Also if you add here reference to
  issues they will be linked as well

**Important**: Messages starting with `Revert` or `Merge` will be considered valid, as they usually
are created by git itself automatically.

Example:
```
$ git commit
FIX: (Build Issues) Fix Travis Build, This fix #20 and #25

Fix bug on build while installing
```
**In one line**
```bash
$ git commit -m "FIX: (Build Issues) Fix Travis Build. This fix #20 and #25"
```

If a commit does not follow this structure, the commit will be stopped

## [Changelog](./changelog.md)
