# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

[0.13.0] - 2017-01-11
### Breaking Change
- Exports `ElasticModule` instead of `Elastic`. If upgrading, please update your imports, change `Elastic` to `ElasticModule`:

``` js
import { ElasticModule, ElasticDirective } from 'angular2-elastic';
```

[0.12.0] - 2017-01-11
### Fixed
- Support latest Ionic nightly build.

[0.11.1] - 2016-11-11
### Fixed
- Export Elastic directive so that apps built with `ngc` work properly.

[0.11.0] - 2016-10-15
### Changed
- Moved to angular compiler to support Ionic 2 RC.0 builds.

[0.10.1] - 2016-10-15
### Added
- Responds to window resize event.

[0.10.0] - 2016-10-14
### Changed
- Renamed directive to `fz-elastic`.

0.9.0 - 2016-10-13
### Added
- Initial commit of elastic directive.

[0.13.0]: https://github.com/fiznool/angular2-elastic/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/fiznool/angular2-elastic/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/fiznool/angular2-elastic/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/fiznool/angular2-elastic/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/fiznool/angular2-elastic/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/fiznool/angular2-elastic/compare/v0.9.0...v0.10.0
