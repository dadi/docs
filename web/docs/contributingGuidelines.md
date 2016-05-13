## Contributing Guidelines

### Developer documentation

Work is currently underway to ensure all DADI products have sufficient developer documentation.

We are using [JSDoc](http://usejsdoc.org/) to parse inline code comments and generate more useful documentation.

Please add comments to code where possible, following the guidelines at http://usejsdoc.org

For example:
```
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {

}
```

### Unit Tests

All products should have a set of unit and/or acceptance tests in a `test` folder at the root of the repository.

We use `mocha` and `should.js` as our testing libraries. See existing tests for guidance.

Be sure to provide instructions in the README for running tests.

### Bugs

#### Bug reporting

All bugs should be raised as issues with the label `Bug`. Unless you are going to tackle the bug yourself, please refrain from assigning it. The core engineering team at DADI will handle it.

> **Before you submit a new issue**

> Please ensure your new issue conforms to NPM's [Contributing   Guidelines](https://github.com/npm/npm/wiki/Contributing-Guidelines). Because they're pretty sensible.


#### Bug Fixes

Create a `fix` branch off `master`. If you're fixing a [raised issue](https://github.com/dadi/web/issues) please include the issue number in the branch name:

```sh
$ git checkout master
$ git pull origin master
$ git checkout -b fix/132-short-issue-description
```

When you've finished developing, create a pull request. Your `fix` branch will be merged into `master`.

### New Features

#### Feature requests

All feature requests should be raised as issues with the label `Feature request`. Unless you are going to tackle the feature request yourself, please refrain from assigning it. The core engineering team at DADI will handle it.

#### Feature development

Create a `feature` branch off `master`.  If you're implementing a [raised issue](https://github.com/dadi/web/issues) please include the issue number in the branch name:

```sh
$ git checkout master
$ git pull origin master
$ git checkout -b feature/007-my-new-feature
```

When you've finished developing, create a pull request. Your `feature` branch will be merged into `master`.

### Releases

When we decide to release new version `vN.0.0`, the following steps are followed:

1. Create a new branch off master named after the release version: `vN.0.0`

  ```sh
  $ git checkout master
  $ git pull origin master
  $ git checkout -b vN.0.0
  ```

2. Tag the HEAD revision as a release candidate with `vN.0.0-rc.1`

  ```sh
  $ git tag -a vN.0.0-rc.1 -m "Version N.0.0 RC 1"
  ```

3. Test thoroughly

  4. If testing reveals some more work is required, push commits to the `vN.0.0` branch.
  When all fixes are in, create a new `vN.0.0-rc.x` tag

    ```sh
    $ git tag -a vN.0.0-rc.x -m "Version N.0.0 RC x"
    ```

  5. If all tests pass and the release is considered ready, we tag it `vN.0.0` and merge it back to master

    ```sh
    $ git tag -a vN.0.0 -m "Version N.0.0"
    $ git checkout vN.0.0
    $ git rebase master
    $ git checkout master
    $ git merge vN.0.0
    ```

### Commits

#### One change per commit

A commit should contain exactly one logical change. A logical change includes adding a new feature, fixing a specific bug, etc. If it's not possible to describe the high level change in a few words, it is most likely too complex for a single commit. The diff itself should be as concise as reasonably possibly and it's almost always better to err on the side of too many patches than too few. As a rule of thumb, given only the commit message, another developer should be able to implement the same patch in a reasonable amount of time.

Please don't include more than one change in each patch. If your commit message requires an "and" in the middle, it's likely you need separate commits.

#### Commit messages

Please use a short one-line summary of the change. After the one-line summary, an empty line, then multiple paragraphs explaining the patch in detail (if required). Don't describe the code, describe the intent and the approach.

Please don't add lazy commit messages such as "misc fixes and cleanups".
