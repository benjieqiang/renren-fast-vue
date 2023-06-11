/*
 * @Author: benjie
 * @Date: 2023-06-04 23:31:04
 * @LastEditTime: 2023-06-11 13:30:51
 * @LastEditors: benjie
 * @Description: 
 */
/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://localhost:88/api'; //请求网关，网关去找对应服务

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
