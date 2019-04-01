import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/testdemo/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/testdemo',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/testdemo/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/testdemo/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/testdemo',
    method: 'put',
    data: obj
  })
}
