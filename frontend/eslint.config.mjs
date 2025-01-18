import globals from 'globals'; // Импортирует глобальные переменные, например, для браузера
import pluginJs from '@eslint/js'; // Стандартная конфигурация ESLint для JavaScript
import tseslint from 'typescript-eslint'; // Конфигурация ESLint для TypeScript
import pluginReact from 'eslint-plugin-react'; // Плагин для поддержки правил React в ESLint
import pluginPrettier from 'eslint-plugin-prettier'; // Плагин для интеграции Prettier с ESLint
import configPrettier from 'eslint-config-prettier'; // Конфигурация для отключения конфликтующих с Prettier правил ESLint

/** 
 * @type {import('eslint').Linter.Config[]} 
 * Это массив конфигураций ESLint, который может включать несколько объектов, каждый из которых применяется к определённым файлам.
 */
export default [
  // Первый объект конфигурации, применяемый ко всем файлам с расширениями .js, .mjs, .cjs, .ts, .jsx, .tsx
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // Файлы, к которым применяется эта конфигурация
  },
  
  // Второй объект конфигурации для настройки языка и парсера
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Добавляем глобальные переменные для браузера (например, window, document)
        module: 'readonly', // Добавляем глобальную переменную для модуля, например, в конфигурационных файлах
        describe: 'readonly', // Глобальная переменная для Jest (для определения тестов)
        test: 'readonly', // Глобальная переменная для Jest (для определения тестов)
        expect: 'readonly', // Глобальная переменная для Jest (для утверждений в тестах)
      },
      parserOptions: {
        ecmaVersion: 12, // Устанавливаем версию ECMAScript для синтаксиса (например, ES2021)
        sourceType: 'module', // Указываем, что файлы используют модули ES6
        ecmaFeatures: {
          jsx: true, // Включаем поддержку JSX, если используется React
        },
      },
    },
  },

  // Подключение стандартной конфигурации ESLint для JavaScript
  pluginJs.configs.recommended,

  // Подключение стандартной конфигурации ESLint для TypeScript
  ...tseslint.configs.recommended,

  // Конфигурация для плагина React, включая правила для React
  {
    plugins: {
      react: pluginReact, // Указываем плагин для React
      prettier: pluginPrettier, // Добавляем плагин Prettier для форматирования кода
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Отключаем правило, требующее импорт React в файлы JSX (не нужно для React 17+)
      'react/prop-types': 'off', // Отключаем проверку PropTypes, если не используем
      'prettier/prettier': 'error', // Включаем правило, которое заставляет ESLint сообщать об ошибках, если форматирование не соответствует Prettier
    },
  },

  // Конфигурация для Prettier, отключающая правила ESLint, которые могут конфликтовать с Prettier
  configPrettier,
];
