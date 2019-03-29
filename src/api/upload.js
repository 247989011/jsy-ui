import request from '@/router/axios'

export function upload(obj) {
  return request({
    url: '/admin/fdfs/upload',
    method: 'post',
    data: obj
  })
}
