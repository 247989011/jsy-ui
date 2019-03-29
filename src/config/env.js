/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 * fileUrl : 文件图片查看路径
 */

let baseUrl = ''
let fileUrl = ''
const iconfontVersion = ['567566_r22zi6t8noas8aor', '599693_0b5sleso3f1j1yvi', '667895_xte3dcfrvbo6r', '1023789_prevxv5j9j8']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`
const codeUrl = `/admin/code`
if (process.env.NODE_ENV == 'development') {
  baseUrl = `http://127.0.0.1:8086/`
  fileUrl = 'http://127.0.0.1/portal/mall/file/readImage?imagePath=';
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = `http://39.108.100.113:8086`
  fileUrl = 'http://39.108.100.113/portal/mall/file/readImage?imagePath=';
}

export {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  fileUrl
}
