export default [
  {
    name: 'extends',
    type: 'string',
    description: [
      'The name of the build profile that the current one should inherit values from.'
    ],
  },
  {
    name: 'credentialsSource',
    enum: ['local', 'remote'],
    description: [
      'The source of credentials used to sign build artifacts.',
      ' - `local` - if you want to provide your own `credentials.json` file. ([learn more on this here](/app-signing/local-credentials)).',
      ' - `remote` - if you want to use the credentials managed by EAS (this is the default option).'
    ],
  },
  {
    name: 'releaseChannel',
    type: 'string',
    description: [
      'Name of the release channel for the `expo-updates` package ([Learn more about this](../../distribution/release-channels)). If you do not specify a channel, your binary will pull releases from the `default` channel. If you do not use `expo-updates` in your project then this property will have no effect.',
    ]
  },
  {
    name: 'distribution',
    enum: [ 'store', 'internal', 'simulator' ],
    description: [ 'The method of distributing your app.',
      '- `internal` - with this option you\'ll be able to share your build URLs with anyone, and they will be able to install the builds to their devices straight from the Expo website. [Learn more about internal distribution](../internal-distribution).',
      ' - `simulator` - creates build for simulator',
      ' - `store` - creates builds intended for store upload, your build URLs won\'t be sharable.'
    ]
  },
  {
    name: 'enterpriseProvisioning',
    enum: [ 'universal', 'adhoc' ],
    description: [ 'should only be used with `"distribution": "internal"` when you have an Apple account with Apple Developer Enterprise Program membership. You can choose if you want to use `adhoc` or `universal` provisioning. The latter is recommended as it does not require you to register each individual device. If you don\'t provide this option and you still authenticate with an enterprise team, you\'ll be prompted which provisioning to use.',
    ]
  },
  {
    name: 'image',
    type: 'string',
    description: [
      'image with build environment. [Learn more about it here](../../build-reference/infrastructure).',
    ],
  },
  {
    name: 'node',
    type: 'string',
    description: [ 'version of Node.js.' ],
  },
  {
    name: 'yarn',
    type: 'string',
    description: [ 'version of Yarn.' ],
  },
  {
    name: 'bundler',
    type: 'string',
    description: [ 'version of [bundler](https://bundler.io/)' ],
  },
  {
    name: 'fastlane',
    type: 'string',
    description: [ 'version of fastlane' ],
  },
  {
    name: 'cocoapods',
    type: 'string',
    description: [ 'version of CocoaPods' ],
  },
  {
    name: 'expoCli',
    type: 'string',
    description: [
      'version of [expo-cli](https://www.npmjs.com/package/expo-cli) used to [prebuild](../../workflow/expo-cli/#expo-prebuild) your app. It does not affect bare workflow projects.',
    ],
  },
  {
    name: 'env',
    type: 'object',
    description: [
      'environment variables that should be set during the build process (should only be used for values that you would commit to your git repository, i.e. not passwords or secrets).',
    ],
  },
  {
    name: 'cache',
    type: 'object',
    description: [
      'Configuration for caching machanism. This feature is intended for caching values that require a lot of computation, e.g. compilation results (both final binaries and any intermediate files), but it wouldn\'t work well for `node_modules` because the cache is not local to the machine, so a download speed is similar to downloading from the npm registry. '
    ],
    properties: [
      {
        name: 'disabled',
        type: 'boolean',
        description: [ 'Disables caching. Dafults to false.' ],
      },
      {
        name: 'key',
        type: 'string',
        description: [ 'Identifies where cache is saved and restored from. The cache can be invalidated by changing this value.' ],
      },
      {
        name: 'customPaths',
        type: 'array',
        description: [
          'List of the paths that will be saved after sucesfull build and restored at the beging of the next one. Both absolute and relative paths are supported, where relative paths are resolved from the directory with `eas.json`.',
        ]
      },
      {
        name: 'cacheDefaultPaths',
        type: 'boolean',
        description: [
          'Specifies whether recommended set of files should be cached, currently only Podfile.lock is included in that list. Defaults to true.',
        ],
      }
    ]
  },
  {
    name: 'buildType',
    enum: ['release', 'development-client'],
    description: [
      'Type of the artifact you want to build. It controls wich Xcode BuildCOnfiguration will be used, can be overridden by `schemeBuildConfiguration` option.',
      ' - `release` - `Release`',
      ' - `development-client` - `Debug`',
    ],
  },
  {
    name: 'scheme',
    type: 'string',
    description: [
      'Xcode project\'s scheme.',
      ' - managed project have only one scheme and this value should not be defined.',
      ' - bare project',
      '   - If your project has multiple schemes, you should set this value.',
      '   - If the project has only one scheme, it will automatically be detected',
      '   - If multiple schemes exist and this value is **not** set, EAS CLI will prompt you to select one of them.',

    ]
  },
  {
    name: 'schemeBuildConfiguration',
    type: 'string',
    description: [
      'Xcode project\'s Build Configuration.',
      ' - managed projects have only 2 configurations "Debug" and "Release", defaults to "Release"',
      ' - bare projects defaults to value specified in scheme',
    ],
  },
  {
    name: 'artifactPath',
    type: 'string',
    description: [
      'Path (or pattern) where EAS Build is going to look for the build artifacts. EAS Build uses the `fast-glob` npm package for pattern matching, ([see their README to learn more about the syntax you can use](https://github.com/mrmlnc/fast-glob#pattern-syntax)). You should modify that path only if you are using a custom `Gymfile`. The default is `ios/build/Build/Products/*-iphonesimulator/*.app` when building for simulator and `ios/build/*.ipa` in other cases.'
    ],
  },
]
