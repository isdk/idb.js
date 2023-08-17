# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 0.1.0 (2023-08-17)


### ⚠ BREAKING CHANGES

* **Transaction:** change abort() and commit() methods to async; close the stores when transaction finished
* can create store and index by stores option directly

### Features

* add async delete() method and static method to delete database ([e11a8cb](https://github.com/isdk/idb.js/commit/e11a8cbae38416c6fb5ec32acec07fd8194b4926))
* add IDBError ([14777c8](https://github.com/isdk/idb.js/commit/14777c823857102c6bdde73ba56ffb19f802576e))
* can create store and index by stores option directly ([f18ce43](https://github.com/isdk/idb.js/commit/f18ce4389b077c2ce60017bf11e8ca6181a1a1ed))
* **migration:** add index(es) to exists object store ([4be6796](https://github.com/isdk/idb.js/commit/4be67960e68b9fc357a88a744bd75216d2968a88))


### Bug Fixes

* **build:** minor typo ([6bd60c0](https://github.com/isdk/idb.js/commit/6bd60c0b88772ba8aa44789350f3193b2ab7000f))
* **IndexedDBTransaction:** commit should not _close() again ([6950dda](https://github.com/isdk/idb.js/commit/6950ddac33e7312fe7fb2ab9052b29d7ebf69b13))
* **store:** should check _store before operation; add internal method _close(); add opened prop ([b934481](https://github.com/isdk/idb.js/commit/b93448143b75b6c98f028fab89fff2fa51eb8317))
* **Transaction:** change abort() and commit() methods to async; close the stores when transaction finished ([6d13e2b](https://github.com/isdk/idb.js/commit/6d13e2bd72d331c5c9047a560e37c5b4a3926247))


### Refactor

* move transaction to idb-store and rename id-store to idb-store-transaction ([27608b9](https://github.com/isdk/idb.js/commit/27608b968cd06ef5d89e38fd8d6e9a8ba7dfc6f8))
* **test:** refact transaction test ([8949a63](https://github.com/isdk/idb.js/commit/8949a632c8ee33c40f7c3d4eb22495be6ccc7fa8))
