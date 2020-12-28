module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/standard',
    "eslint:recommended"
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "no-console": "off",//在这禁止掉console报错检查
    "no-irregular-whitespace": "off"//这禁止掉 空格报错检查
  },
  // rules: {
  //   // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  //   // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  //   // "no-console": "off",//在这禁止掉console报错检查
  //   // "no-irregular-whitespace": "off",//这禁止掉 空格报错检查
  //   // "space-before-function-paren": 0
  // }
}
