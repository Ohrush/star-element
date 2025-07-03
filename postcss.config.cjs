/*
 * @Author: 依旧 1127740739@qq.com
 * @Date: 2025-07-04 02:26:47
 * @LastEditors: 依旧 1127740739@qq.com
 * @LastEditTime: 2025-07-04 02:27:44
 * @FilePath: \star-element\postcss.config.cjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-env node */
module.exports = {
  plugins: [
    require("postcss-nested"),
    require("postcss-each-variables"),
    require("postcss-each")({
      plugins: {
        beforeEach: [require("postcss-for"), require("postcss-color-mix")],
      },
    }),
  ],
};