//module.exports = file => () => import('@/views/' + file + '.vue')

exports = module.exports = file => require('@/pages/' + file + '.vue').default // vue-loader at least v13.0.0+