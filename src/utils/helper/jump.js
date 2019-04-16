import router from '@/router'

const Jump = {
  applicationsId: (id) => {
    router.push({
      path: `/develop/applications/${id}/setting`
    })
  },

  productsId: (id) => {
    router.push({
      path: `/develop/products/${id}`
    })
  }
}

export default Jump
