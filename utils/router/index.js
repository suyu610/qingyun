const router = require('mp-router/index.js');
const routes = require('routes.js');
/* 
 * 封装了一层路由
 * 使用说明
 * const { router } = require('../../router/index.js');
 * router.push({
 *   name: 'a',
 *   data: {
 *     id: '123',
 *     type: 1,
 *   },
 * });
 *
 */
router.init({
  routes,
});

module.exports = router;
