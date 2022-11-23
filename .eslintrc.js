module.exports = {
  extends: [
    '@react-native-community',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'sort-imports-es6-autofix',
    'sort-keys-fix',
    'import',
    'jsx-a11y',
    'react-hooks'
  ],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        classes: false,
        functions: false,
        typedefs: false,
        variables: false
      }
    ],
    '@typescript-eslint/no-useless-constructor': 'error',
    'array-callback-return': 'warn',
    curly: 'error',
    'default-case': 'error',
    'dot-location': ['warn', 'property'],
    eqeqeq: ['error', 'smart'],
    'getter-return': 'error',
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'jsx-a11y/accessible-emoji': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        aspects: ['noHref', 'invalidHref']
      }
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',
    'new-parens': 'error',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'no-const-assign': 'error',
    'no-control-regex': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-implied-eval': 'error',
    'no-invalid-regexp': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': [
      'error',
      {
        allowLoop: true,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-mixed-operators': [
      'error',
      {
        allowSamePrecedence: false,
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ]
      }
    ],
    'no-multi-str': 'error',
    'no-native-reassign': 'error',
    'no-negated-in-lhs': 'error',
    'no-nested-ternary': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-redeclare': 'off',
    'no-regex-spaces': 'error',
    'no-restricted-properties': [
      'error',
      {
        message:
          'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
        object: 'require',
        property: 'ensure'
      },
      {
        message:
          'Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting',
        object: 'System',
        property: 'import'
      }
    ],
    'no-restricted-syntax': ['error', 'WithStatement'],
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-this-before-super': 'error',
    'no-throw-literal': 'error',
    'no-undef': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unused-expressions': ['off'],
    'no-unused-labels': 'error',
    'no-unused-vars': ['off'],
    'no-use-before-define': 'off',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreExport: false,
        ignoreImport: false
      }
    ],
    'no-whitespace-before-property': 'error',
    'no-with': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true
      }
    ],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/forbid-foreign-prop-types': [
      'error',
      {
        allowInPropTypes: true
      }
    ],
    'react/jsx-fragments': ['error'],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-no-useless-fragment': ['error'],
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: []
      }
    ],
    'react/jsx-props-no-multi-spaces': ['error'],
    'react/jsx-sort-props': ['error'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-access-state-in-setstate': ['error'],
    'react/no-array-index-key': ['error'],
    'react/no-danger-with-children': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-is-mounted': 'error',
    'react/no-typos': 'error',
    'react/prefer-stateless-function': ['error'],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': ['error'],
    'react/sort-comp': ['error'],
    'react/style-prop-object': 'error',
    'require-await': 'error',
    'require-yield': 'error',
    'rest-spread-spacing': ['error', 'never'],
    'sort-imports-es6-autofix/sort-imports-es6': [
      1,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'sort-keys-fix/sort-keys-fix': 'error',
    strict: ['error', 'never'],
    'unicode-bom': ['error', 'never'],
    'use-isnan': 'error',
    'valid-typeof': 'error'
  }
};
