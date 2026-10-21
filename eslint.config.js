export default [
  { ignores: ['dist/**', '.parcel-cache/**', 'script/**', 'semantic-commits.js', 'cypress.config.js'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        jest: 'readonly',
        beforeEach: 'readonly',
        require: 'readonly',
        module: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        cy: 'readonly',
        expect: 'readonly',
        document: 'readonly',
        window: 'readonly',
        Cypress: 'readonly',
        sessionStorage: 'readonly',
        localStorage: 'readonly',
      },
    },
    rules: {
      quotes: ['error', 'single'], // comillas simples
      semi: ['error', 'always'], // ; al final de cada linea
      'object-curly-spacing': ['error', 'always'], // espacio entre llaves
      'array-bracket-spacing': ['error', 'never'], // sin espacios dentro de corchetes
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true, argsIgnorePattern: '^_' }], // no permite variables sin usar
      'no-undef': 'error', // no permite el uso de variables no definidas
      'no-var': 'error', // exige el uso de `let` y `const` en vez de `var`
      'prefer-const': 'error', // prioriza el uso de `const` cuando es posible
      'no-shadow': 'error', // no permite variables con el mismo nombre en distintos contextos (shadowing)
      'consistent-return': 'error', // fuerza consistencia en los valores retornados en una funcion
      curly: ['error', 'all'], // requiere llaves para todas las declaraciones if/else/for/while
      eqeqeq: ['error', 'always'], // prioriza el uso de `===` en lugar de `==`
      'no-console': 'warn', // muestra una advertencia en caso usar `console.log`
      'no-multi-spaces': 'error', // no permite espacios multiples en una línea
      'no-trailing-spaces': 'error', // no permite espacios al final de las lineas
      'no-whitespace-before-property': 'error', // no permite espacios en blanco antes de las propiedades
    },
  },
];