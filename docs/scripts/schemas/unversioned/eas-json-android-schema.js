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
      'The source of credentials used to sign build artifacts. If you want to provide your own `credentials.json` file, set this to `local` ([learn more on this here](/app-signing/local-credentials)). If you want to use the credentials managed by EAS, choose `remote` (this is the default option).'
    ],
  },
  {
    name: 'withoutCredentials',
    type: 'boolean',
    description: [
      "when set to `true`, EAS CLI won't require you to configure credentials when building the app. This comes in handy when you want to build debug binaries and the debug keystore is checked in to the repository. The default is `false`.",
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
    enum: [ 'store', 'internal' ],
    description: [ 'The method of distributing your app.',
      '- `internal` - with this option you\'ll be able to share your build URLs with anyone, and they will be able to install the builds to their devices straight from the Expo website. When using `internal`, make sure the `gradleCommand` produces an APK file (e.g. `gradleCommand: ":app:assembleRelease"` or `buildType: "apk"` ). Otherwise, the sharable URL will be useless. [Learn more about internal distribution](../internal-distribution).',
      ' - `store` - creates builds intended for store upload, your build URLs won\'t be sharable.'
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
    name: 'ndk',
    type: 'string',
    description: [ 'version of Android NDK.' ],
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
      }
    ]
  },
  {
    name: 'buildType',
    enum: ['app-bundle', 'apk', 'development-client'],
    description: [
      'Type of the artifact you want to build. It controls what Gradle task will be used, can be overridden by `gradleCommand` option.',
      ' - `app-bundle` - `:app:bundleRelease`',
      ' - `apk` - `:app:assembleRelease`',
      ' - `development-client` - `:app:assembleDebug`',
    ],
  },
  {
    name: 'gradleCommand',
    type: 'string',
    description: [
      'Gradle task that will be used to build your project, e.g. `:app:assembleDebug` to build a debug binary.',
      "It's not recommended unless you need to run a task that `buildType` does not support, it will overide buildType behaviour if both are specified.",
    ],
  },
  {
    name: 'artifactPath',
    type: 'string',
    description: [
      'Path (or pattern) where EAS Build is going to look for the build artifacts. EAS Build uses the `fast-glob` npm package for pattern matching ([see their README to learn more about the syntax you can use](https://github.com/mrmlnc/fast-glob#pattern-syntax)). The default value is `android/app/build/outputs/**/*.{apk,aab}`.'
    ],
  },
]
